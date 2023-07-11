import React from "react";

function Card({ meal }) {
  return (
    <div>
      <div className="card_indiv">
        <img src={meal.strMealThumb} alt="img_plat" />
        <div className="container_text_plat">
          <h1>{meal.strMeal}</h1>
          <p className="container_origine">Origine : {meal.strArea} </p>
          <p className="container_resume">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
