import React from "react";
import MyFridge from "../Components/MyFridgeList/MyFridge";
import { AuthContext } from "../Components/nav/AuthContext";
import Nav from "../Components/nav/Nav";
import Recipespage from "../Components/RecipeCard/MidSection/Recipespage";
import MyRecipes from "../Components/RecipeCard/MyRecipesBar(RightSection)/MyRecipes";
import { DataProvider } from "../Components/UseContext/DataContext";

function Recipe() {
	return (
		<>
			<MyFridge />
			<Recipespage />
			<MyRecipes />
		</>
	);
}

export default Recipe;
