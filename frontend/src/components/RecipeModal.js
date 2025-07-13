import React from "react";
import "../styles/RecipeModal.css";

const RecipeModal = ({
  recipeName,
  cuisine,
  time,
  picture,
  ingredients,
  recipe,
  onClose,
}) => {
  if (!recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content flex">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-image">
        <img src={picture} alt={recipeName}  />
        </div>
        
        <div className="modal-info flex">
          <h1 style={{ fontSize: "50px" , color:'#5c3c32'}}>{recipeName}</h1>
          <h3 style={{ fontSize: "25px" }}>Cuisine: {cuisine}</h3>
          <h3 style={{ fontSize: "23px" }}>Time Taken: {time} mins</h3>
          <p style={{ fontSize: "18px", wordSpacing:'5px' }}>
            <strong>Ingredients:</strong> {ingredients}
          </p>
          <p style={{ fontSize: "18px", wordSpacing:'4px' }}>
            <strong>Recipe:</strong> {recipe}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
