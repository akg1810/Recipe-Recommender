import React from "react";
import "../styles/Card.css"; 

const Card = ({ recipeName, cuisine, time, imageUrl, recipe, ingredients, onClick}) => {

  return (
    <div className="card" onClick={() => onClick(recipe, recipeName, cuisine, time, imageUrl, ingredients)} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt="Recipe" class="card-image" />
      <div className="card-content flex">
        <h3>{recipeName}</h3>
        <h4>Cuisine : {cuisine}</h4>
        <h4>Time Taken : {time} mins</h4>
      </div>
    </div>
  );
};

export default Card;
