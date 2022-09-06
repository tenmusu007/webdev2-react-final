// import React, { useEffect } from "react";
// import axios from "axios";
// import Recipe from "./Recipe";
// import { useState } from "react";

// export default function Recipes() {
//   const [recipeList, setRecipeList] = useState([]);


//   useEffect(() => {
//     axios
//       .get(
//         "https://api.spoonacular.com/recipes/search?apiKey=701e66b5f1a24433ba5dbe2f6fbcee81&query=soup&diet=vegetarian&intolerances=gluten"
//       )
//       .then((response) => {
//         console.log(response.data);
//         setRecipeList({ recipes: [...response.data.results] });
//       });
//   }, []);

//   const parseRecipeList = recipeList
//     ? recipeList.map((recipes) => <Recipe recipe={recipes.title} key={recipes.id} />)
//     : [];

//   return (
//     <div className="component">
//       <h1>Recipe list</h1>
//       <section
//         style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
//       >
//         {parseRecipeList}
//       </section>
//     </div>
//   );
// }
