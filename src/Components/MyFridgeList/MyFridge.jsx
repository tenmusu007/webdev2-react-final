import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../UseContext/DataContext";
import { AuthContext } from "../nav/AuthContext"


import { Add, Fridge, IngredientDiv, IngredientImg, IngredientName, ListDiv, ListName, RemoveBtn, Search, WhisperDiv, WhisperUl, } from "../styles/MyFridge.styles";

export default function MyFridge() {
	const PicUrl = "https://spoonacular.com/cdn/ingredients_100x100/"
	const [query, setQuery] = useState("");
	const [autocomplete, setAutocomplete] = useState([]);
	const [ingredient, setIngredient] = useState("");
	const [ingredientId, setIngredientId] = useState("");
	const [ingredientImage, setIngredientImage] = useState("")
	const [fridgeList, setFridgeList] = useState([]);
	const { fridgeAddFireBase, user, setUser } = useContext(DataContext)
	const { userData, count, isLogin} = useContext(AuthContext);
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

	
	// useEffect(() => {
	// 	console.log("useeffect 動いてもうてるがな");
	// 	setFridgeList(userData.data.myfridge)
	// 	console.log("effect firdge", userData);
	// }, [userData])
	
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
			<ListName>My Fridge</ListName>
			<form>
				<Search
					type="text"
					id="searchInput"
					list="pol"
					autoComplete="off"
					placeholder="Search"
					onChange={(e) => handleOnChange(e)}
				/>
				<Add type="button" value="Add" onClick={() => sendToFridgeList()} />
				<WhisperUl b={autocomplete.length ? 1 : 0} id="whisper">
					{autocomplete.map((item, i) => (
						<WhisperDiv
							onClick={() => temporaryList(item.id, item.name, item.image)}
							key={item.id}
						>
							{item.name}
						</WhisperDiv>
					))}
				</WhisperUl>
			</form>
			<ListDiv>
				{isLogin && userData ? (userData.data.myfridge.map((item, i) => (
					<IngredientDiv key={item.id}>
						<IngredientImg
							alt={item.name}
							src={
								"https://spoonacular.com/cdn/ingredients_100x100/" + item.image
							}
						/>
						<IngredientName> {item.name} </IngredientName>
						<RemoveBtn onClick={() => deleteFromFridgeList(item.id)}>
							{" "}
							Remove{" "}
						</RemoveBtn>
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
						<RemoveBtn onClick={() => deleteFromFridgeList(item.id)}>
							{" "}
							Remove{" "}
						</RemoveBtn>
					</IngredientDiv>
				))) }
			</ListDiv>
		</Fridge>
	);
}
