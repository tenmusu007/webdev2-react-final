import React from "react";
import { Recipes_list, Del_btn, Right_part_uu } from "../../styles/Recipespage.styled";

const MyRecipes = ({ recipes, deletingRecipe }) => {
  return (
    <>
      <Right_part_uu>
        <h2>My Recipes</h2>

        <ul>
          {recipes &&
            recipes.map((item, index) => {
              return (
                <>
                  <Recipes_list key={index}>
                    <p>{item.title}</p>
                    <Del_btn onClick={() => deletingRecipe(item.id)}>
                      Del
                    </Del_btn>
                  </Recipes_list>
                </>
              );
            })}
        </ul>
      </Right_part_uu>
    </>
  );
};

export default MyRecipes;
