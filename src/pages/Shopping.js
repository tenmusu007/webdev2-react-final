import React from "react";
import Nav from "../Components/nav/Nav";
import MyFridge from "../Components/MyFridgeList/MyFridge";
import ShoopinRecipe from "../Components/ShoopingRecipe/ShoopinRecipe";
const Shopping = () => {
	return (
		<>
			<Nav />
			<div style={{display : "flex"}}>
				<MyFridge />
				<ShoopinRecipe />
			</div>
		</>
	);
};

export default Shopping;
