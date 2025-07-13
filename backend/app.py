from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta, timezone
from flask_bcrypt import Bcrypt
import jwt
import config

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config.from_object(config)

# Load and preprocess the dataset
df = pd.read_csv('Recipes.csv', encoding='ISO-8859-1')
df['Cleaned-Ingredients'] = df['Cleaned-Ingredients'].str.replace('(', ',')
df['Cleaned-Ingredients'] = df['Cleaned-Ingredients'].str.replace(')', '')
df['Cleaned-Ingredients'] = df['Cleaned-Ingredients'].apply(lambda x: x.lower())

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
ingredient_vectors = vectorizer.fit_transform(df['Cleaned-Ingredients'])

client = MongoClient('mongodb://localhost:27017/')
print('db connected')
db = client['recipes']
collection = db['ingredients']
collection2 = db['users']

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = {
        'username': data['username'],
        'email': data['email'],
        'password': hashed_password
    }
    try:
        if collection2.find_one({'email': data['email']}) or collection2.find_one({'username': data['username']}):
            return jsonify({'error': 'User already exists'}), 400
        collection2.insert_one(new_user)
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email_or_username = data.get('emailOrUsername')
    password = data.get('password')

    user = collection2.find_one({
        '$or': [{'email': email_or_username}, {'username': email_or_username}]
    })

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 400

    token = jwt.encode(
        {'id': str(user['_id']), 'exp': datetime.now(timezone.utc) + timedelta(hours=1)},
        app.config['SECRET_KEY'],
        algorithm='HS256')
    return jsonify({'token': token})

@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_ingredients = data.get('ingredients', '')
    user_id = data.get('user_id')

    if user_id:
        collection.insert_one({
        "user_id": user_id,
        "search_input": user_ingredients,
        "timestamp": datetime.now(timezone.utc)
    })
    
    # Keep only the last 3 searches for each user
    searches = list(collection.find({"user_id": user_id}).sort("timestamp", -1))
    if len(searches) > 4:
        for search in searches[4:]:
            collection.delete_one({"_id": search["_id"]})
    
    #searches = collection.find({"user_id": user_id}).sort("timestamp", -1).limit(3)
    searches = searches[1:4] if len(searches) >= 4 else []
    combined_ingredients = set()
    for search in searches:
        ingredients = [ingredient.strip() for ingredient in search["search_input"].split(',')]
        combined_ingredients.update(ingredients)
        
    combined_ingredients_str = ', '.join(combined_ingredients)
    # Vectorize the user ingredients
    user_vector = vectorizer.transform([user_ingredients])
    user_vector2 = vectorizer.transform([combined_ingredients_str]) if searches else None
    # Calculate cosine similarities
    similarities = cosine_similarity(user_vector, ingredient_vectors).flatten()
    similarities2 = cosine_similarity(user_vector2, ingredient_vectors).flatten() if user_vector2 is not None else []

    N = 6
    top_n_indices = similarities.argsort()[::-1]
    top_n_indices2 = similarities2.argsort()[::-1] if len(similarities2) > 0 else []

    top_recipes = df.iloc[top_n_indices[:N]]
    top_recipes2 = df.iloc[top_n_indices2[:10]] if len(top_n_indices2) > 0 else pd.DataFrame()

    recommendations = [
        {
            "name": recipe['TranslatedRecipeName'],
            "cuisine": recipe['Cuisine'],
            "timeTaken": recipe['TotalTimeInMins'],
            "picture": recipe['image-url'],
            "recipe": recipe['TranslatedInstructions'],
            "ingredients": recipe['TranslatedIngredients'],
            "similarity": similarities[top_n_indices[idx]]
        }
        for idx, recipe in top_recipes.iterrows()
    ]
    recommendations2 = [
        {
            "name": recipe['TranslatedRecipeName'],
            "cuisine": recipe['Cuisine'],
            "timeTaken": recipe['TotalTimeInMins'],
            "picture": recipe['image-url'], # Always use brackets for column names with hyphens
            "recipe": recipe['TranslatedInstructions'],
            "ingredients": recipe['TranslatedIngredients'],
            "similarity": similarities[top_n_indices2[idx]]
        }
        for idx, recipe in top_recipes2.iterrows()
    ] if len(searches) >= 3 else []
    response = {
        "recommendations": recommendations,
        "recommendations2": recommendations2
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)