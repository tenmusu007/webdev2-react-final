import React, { Component } from "react";

export default class Recipe extends Component {
  render() {
    const recipe = this.props.recipe;
    return (
      <div className="component">
        <h1>{recipe.title}</h1>
        <img
          src={"https://spoonacular.com/recipeImages/" + recipe.image}
          alt=""
          style={{ width: "100%", height: "300px" }}
        />
        <h2>Ready in : {recipe.readyInMinutes} + minutes</h2>
        <p>{recipe.sourceUrl}</p>
      </div>
    );
  }
}
