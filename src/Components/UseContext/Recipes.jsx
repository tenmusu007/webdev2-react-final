// import React, { Component } from "react";
// import axios from "axios";
// import Recipe from "./Recipe";

// export default class Recipes extends Component {
//   constructor() {
//     super();
//     this.state = {
//       recipes: [],
//     };
//   }
//   componentDidMount() {
//     axios
//       .get(
//         "https://api.spoonacular.com/recipes/search?apiKey=701e66b5f1a24433ba5dbe2f6fbcee81&query=soup&diet=vegetarian&intolerances=gluten"
//       )
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ recipes: [...response.data.results] });
//       });
//   }

//   render() {
//     const parseRecipeList = this.state.recipes.map((recipes) => (
//       <Recipe recipe={recipes} key={recipes.id} />
//     ));

//     return (
//       <div className="component">
//         <h1>Recipe list</h1>
//         <section
//           style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
//         >
//           {parseRecipeList}
//         </section>
//       </div>
//     );
//   }
// }
