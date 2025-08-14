🍲 EatEasy – Recipe Recommender Application
EatEasy is an intelligent recipe recommendation web application that helps users discover dishes they can make with the ingredients they already have.
It uses cosine similarity to match user-provided ingredients with a recipe database, returning the top 5 best matches. 

📌 Features
Ingredient-based Recipe Search – Enter available ingredients and get the top 5 best-matching recipes.
Detailed Recipe View – Includes preparation time, step-by-step instructions, and extra tips.
Personalized Recommendations – Signed-up users get additional dish suggestions based on their search history.
User Authentication – Secure login and sign-up system.

🛠 Tech Stack
Frontend:
React.js

Backend:
Flask (Python)
Cosine Similarity Algorithm

Database:
MongoDB

Other Tools & Libraries:
scikit-learn (for cosine similarity)
Axios (for API requests)
HTML, CSS, JavaScript

⚙ How It Works
User enters ingredients they currently have.
Backend processes request:
- Ingredients are vectorized.
- Cosine similarity is calculated between user input and recipe dataset.
Top 5 recipes with the highest similarity scores are returned.
If logged in, the system also considers user’s past searches to make personalized suggestions.

How does it look like ? 

<img width="720" height="405" alt="image" src="https://github.com/user-attachments/assets/c429c0c4-5b0d-4a00-bc0d-07836800d301" />

<img width="720" height="405" alt="image" src="https://github.com/user-attachments/assets/151aecc6-3ad9-43e0-8e39-61f93c1f77fc" />

<img width="720" height="405" alt="image" src="https://github.com/user-attachments/assets/b8e8a57b-b2f4-405d-9a0a-9668eb1719e3" />

<img width="720" height="405" alt="image" src="https://github.com/user-attachments/assets/1538bf95-fb7a-46bc-9432-9c41a5b9be71" />

<img width="720" height="405" alt="image" src="https://github.com/user-attachments/assets/e7ebffb5-058f-4242-bf4e-ea673ce3226c" />




