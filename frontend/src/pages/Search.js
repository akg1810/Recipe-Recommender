import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";
import RecipeModal from "../components/RecipeModal";

const Search = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [additionalRecipes, setAdditionalRecipes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedRecipeName, setSelectedRecipeName] = useState(null);

  const handleCardClick = (recipe, recipeName, cuisine, time, imageUrl, ingredients) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeName(recipeName);
    setSelectedCuisine(cuisine);
    setSelectedTime(time);
    setSelectedPicture(imageUrl);
    setSelectedIngredients(ingredients);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setSelectedIngredients(null);
    setSelectedPicture(null);
    setSelectedTime(null);
    setSelectedCuisine(null);
    setSelectedRecipeName(null);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
    const fetchAdditionalRecipes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch additional recipes");
        }

        const data = await response.json();
        setAdditionalRecipes(data.recommendations2);
      } catch (error) {
        console.error("Error fetching additional recipes:", error);
      }
    };

    fetchAdditionalRecipes();

  }
, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients, user_id: userId }),
    });
    const data = await response.json();
    setRecipes(data.recommendations);
    setAdditionalRecipes(data.recommendations2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };
  return (
    <>
      <nav>
        <div className="navbar flex plus-jakarta-sans-font">
          <h2>EatEasy</h2>
          <div className="navlinks">
            <ul className="flex">
              <li style={{ alignContent: "center" }}>
                <Link to="/">Home</Link>
              </li>
              <li style={{ alignContent: "center" }}>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="logout-button plus-jakarta-sans-font"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="user-page flex plus-jakarta-sans-font">
        <section id="searchbar">
          <h1 style={{ position: "relative", zIndex: "2", fontSize: "60px" }}>
            Recipe Recommender
          </h1>
          <form
            className="search-bar-container"
            onSubmit={handleSubmit}
            style={{ position: "relative", zIndex: "2" }}
          >
            <input
              type="text"
              className="search-input plus-jakarta-sans-font"
              value={ingredients}
              onChange={handleInputChange}
              placeholder="Enter ingredients, separated by commas..."
            />
            <button className="search-button">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                style={{ color: "#545454" }}
                className="icon-hover-effect"
              />
            </button>
          </form>
        </section>
        {recipes.length === 0 && additionalRecipes.length === 0 ? (
          
          <p style={{ fontSize: "50px", textAlign: "center", marginTop: "170px" }}>
            Please enter something
          </p>
        ) : (
        <>
        <div className="recipes flex">
        <h1 style={{paddingLeft:'80px', fontSize:'60px'}}>You can try</h1>
        <div className="cards-area flex">
        {recipes.map((data, index) => (
            <Card
              key={index}
              recipeName={data.name}
              cuisine={data.cuisine}
              time={data.timeTaken}
              imageUrl={data.picture}
              recipe={data.recipe}
              ingredients={data.ingredients}
              onClick={handleCardClick}
            />
          ))}
        </div>
        <RecipeModal 
        recipe={selectedRecipe}
        recipeName={selectedRecipeName} 
        cuisine={selectedCuisine} 
        time={selectedTime} 
        picture={selectedPicture} 
        ingredients={selectedIngredients} 
        onClose={handleCloseModal}
        />
        </div>
        <div className="recipes flex">
        <h1 style={{paddingLeft:'80px', fontSize:'60px'}}>You might also like</h1>
        <div className="cards-area flex">
        {additionalRecipes.map((data, index) => (
            <Card
              key={index}
              recipeName={data.name}
              cuisine={data.cuisine}
              time={data.timeTaken}
              imageUrl={data.picture}
              recipe={data.recipe}
              ingredients={data.ingredients}
              onClick={handleCardClick}
            />
          ))}
        </div>
        <RecipeModal 
        recipe={selectedRecipe}
        recipeName={selectedRecipeName} 
        cuisine={selectedCuisine} 
        time={selectedTime} 
        picture={selectedPicture} 
        ingredients={selectedIngredients} 
        onClose={handleCloseModal}
        />
        </div>
        </>
        )}
      </div>
      
      <footer className="footer plus-jakarta-sans-font flex">
            <div className="footer-up flex">
                <div className="footer-about flex">
                    <h2 style={{fontSize:'32px'}}>About EatEasy</h2>
                    <p style={{wordSpacing:'3px'}}>Simplifying your cooking experience by turning your ingredients into delightful meals.
                    Join us to explore easy and delicious recipes!</p>
                </div>
                <div className="footer-links flex">
                    <h2 style={{fontSize:'32px'}}>Quick Links</h2>
                    <ul>
                        <li style={{marginBottom:'20px'}}><a href="#home">Home</a></li>
                        <li style={{marginBottom:'20px'}}><a href="#about">About</a></li>
                        <li style={{marginBottom:'20px'}}><Link to="/auth">Login</Link></li>
                    </ul>
                </div>
                <div className="footer-contact flex">
                    <h2 style={{fontSize:'32px'}}>Contact info</h2>
                    <p>Email: support@eateasy.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-down">
            <p>&copy; 2024 GMO R&AI. All rights reserved.</p>
            </div>
        </footer>
    </>
  );
};

export default Search;