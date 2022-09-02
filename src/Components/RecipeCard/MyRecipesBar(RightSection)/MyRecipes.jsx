import React from "react";

const MyRecipes = ({ recipes, deletingRecipe }) => {

  return (
    <>
      <div>
        <h2>My Recipes</h2>
        <ul>
          {recipes &&
            recipes.map((item, index) => {
              return (
                <>
                  <li key={index}>
                    <p>{item.title}</p>
                    <button onClick={() => deletingRecipe(item.id)}>Del</button>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default MyRecipes;
