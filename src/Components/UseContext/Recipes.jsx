import React, { useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import { useState } from "react";

export default function Recipes() {
  const [recipeList, setRecipeList] = useState({
    list: [],
  });
  let test = [];
  const aux = "701e66b5f1a24433ba5dbe2f6fbcee81";
  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/search?apiKey=${aux}&query=soup&diet=vegetarian&intolerances=gluten`
      )
      .then((response) => {
        console.log(response.data.results);
        test = response.data.results.map((doc) => ({
          id: doc.id,
          title: doc.title,
        }));

        console.log("trace: " + test);
        setRecipeList({ list: test });

        console.log("list: " + test[0].id);
      });

    //.catch((error) => console.log("error", error.data));
  }, []);

  const parseRecipeList = test.map((recipe) => (
    <Recipe recipe={recipe.title} key={recipe.id} />
  ));

  return (
    <div className="component">
      <h1>Recipe List</h1>
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {parseRecipeList}
      </section>
    </div>
  );
}
