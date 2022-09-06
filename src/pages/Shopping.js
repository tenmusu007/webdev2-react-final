import React from "react";
import Nav from "../Components/nav/Nav";
import MyFridge from "../Components/MyFridgeList/MyFridge";
import ShoopinRecipe from "../Components/ShoopingRecipe/ShoopinRecipe";
import ItemsToBuy from "../Components/ItemsToBuy/ItemsToBuy";
const Shopping = () => {
	return (
		<>
			<Nav />
			<div style={{display : "flex"}}>
				<MyFridge />
				<ShoopinRecipe />
				<ItemsToBuy />
			</div>
		</>
	);
};

export default Shopping;
