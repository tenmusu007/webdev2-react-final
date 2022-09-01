import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

const ItemToBuyStyled = styled.section``;
const ItemToBuy = () => {
	// useEffect(() => {
	// //   axios.get(
	// // 		`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=ad433e56654b42b18907ebc52c8d8474&query=apple&metaInformation=true`
	// //   )
	//   // axios.get(
	// 	// 	`https://api.spoonacular.com/recipes/complexSearch?apiKey=ad433e56654b42b18907ebc52c8d8474&cuisine=&metaInformation=true`
	//   // )
	//   // axios.get(
	// 	// 	`https://api.spoonacular.com/recipes/716429/information?apiKey=${REACT_APP_APIKEY}&includeNutrition=false`
	//   // )
	//   .then(res=>console.log(res))
	// },[])
	return (
		<ItemToBuyStyled>
			<h3>Item To Buy</h3>
			<ul>
				<li>item</li>
			</ul>
		</ItemToBuyStyled>
	);
};

export default ItemToBuy;
