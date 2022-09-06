import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../UseContext/DataContext";
import { AuthContext } from "../nav/AuthContext"


import { Add, Fridge, ListDiv, ListName, RemoveBtn, Search, WhisperDiv, WhisperUl, } from "../styles/MyFridge.styles";
import {RecipeTitle, IngredientDiv, IngredientImg, IngredientName} from "../styles/ItemsToBuy.styles";

export default function ItemsToBuy() {
	const PicUrl = "https://spoonacular.com/cdn/ingredients_100x100/"
	const [query, setQuery] = useState("");
	const [autocomplete, setAutocomplete] = useState([]);
	const [ingredient, setIngredient] = useState("");
	const [ingredientId, setIngredientId] = useState("");
	const [ingredientImage, setIngredientImage] = useState("")
	const [fridgeList, setFridgeList] = useState([]);
	const { fridgeAddFireBase, user, setUser } = useContext(DataContext)
	const { userData, count, isLogin} = useContext(AuthContext);
   const [recipes, setRecipes] = useState([]);
	// console.log("data", userData.data.myfridgeta);
	useEffect(() => {
		const loadIngredients = async () => {
			const response = await axios.get(
				`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_FOODAPIKEY}&query=${query}&metaInformation=true`
			);
			setAutocomplete(response.data);
		};
		loadIngredients();
	}, [query]);

   useEffect(() => {
      // setRecipes([]);
      const recipesList = userData.data.myrecipe;
      let idRecipes = "";
      console.log("fridgeList: ", fridgeList);
      recipesList.forEach((item) => {
         idRecipes = idRecipes + "," + item.id;
      })
      console.log(idRecipes);

      const loadRecipes = async () => {
         const responseRecipes = await axios.get(
            `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_FOODAPIKEY}&ids=${idRecipes}`
         );
         // recipes.push(responseRecipes.data);
         console.log(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_FOODAPIKEY}&ids=${idRecipes}`);
         setRecipes(responseRecipes.data);
         // console.log(responseRecipes.data);
         console.log(recipes);
      };
      loadRecipes();
   }, [userData.data.myrecipe]);

	
	useEffect(() => {
		setFridgeList(userData.data.myfridge)
	}, [userData])
	
	useEffect(() => {
		// console.log("count reset");
		setFridgeList([])
	},[count])
	const handleOnChange = (e) => {
		// e.preventDefault()
		setQuery(e.target.value);
		document.getElementById("whisper").style.display = "block";
	};

	const temporaryList = (id, name, image) => {
		setIngredientId(id);
		setIngredient(name);
		setIngredientImage(image);
		document.getElementById("searchInput").value = name;
		document.getElementById("whisper").style.display = "none";
	};

	const sendToFridgeList = () => {
		// console.log("sending");
		if (ingredientId !== "") {
			fridgeAddFireBase([
				...userData.data.myfridge,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			])
			setUser([
				...userData.data.myfridge,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			])
			setFridgeList([...fridgeList, { id: ingredientId, name: ingredient, image: ingredientImage }])
			setIngredient("");
			setIngredientId("");
			setIngredientImage("");
			document.getElementById("searchInput").value = "";
		}
	};

	const deleteFromFridgeList = (id) => {
		const firebaseFridgeList = userData.data.myfridge.filter((item) => item.id !== id)
		console.log(firebaseFridgeList);
		fridgeAddFireBase([...firebaseFridgeList])
		setFridgeList([...firebaseFridgeList])
	};


	return (
		<Fridge>
			<ListName>Items To Buy</ListName>

         { isLogin && userData ? recipes.map((item) => (
               <div>
                  <RecipeTitle key={item.id}>
                     {item.title}
                  </RecipeTitle>
                  { item.extendedIngredients.map((itemIngredientRecipe) => (
                     !fridgeList.find((fridgeItem) => fridgeItem.id === itemIngredientRecipe.id ) ?
                        <IngredientDiv key={item.id + "-" + itemIngredientRecipe.id}>
                           <IngredientImg
                              alt={itemIngredientRecipe.name}
                              src={
                                 "https://spoonacular.com/cdn/ingredients_100x100/" + itemIngredientRecipe.image
                              }
                           />
                           <IngredientName> {itemIngredientRecipe.name} </IngredientName>
                        </IngredientDiv> : ""
                     
                  ))}
               </div>
               )) : ""}

			<ListDiv>
            {/* {fillItemsToBuy()} */}
            
            
            {/* { console.log("Items to Buy", userData.data.myrecipe.title)} */}

				{/* {isLogin && userData ? (userData.data.myfridge.map((item, i) => (
					<IngredientDiv key={item.id}>
						<IngredientImg
							alt={item.name}
							src={
								"https://spoonacular.com/cdn/ingredients_100x100/" + item.image
							}
						/>
						<IngredientName> {item.name} </IngredientName>
					</IngredientDiv>
				))) : (fridgeList.map((item, i) => (
					<IngredientDiv key={item.id}>
						<IngredientImg
							alt={item.name}
							src={
								"https://spoonacular.com/cdn/ingredients_100x100/" + item.image
							}
						/>
						<IngredientName> {item.name} </IngredientName>
					</IngredientDiv>
				))) } */}
			</ListDiv>
		</Fridge>
	);
}
