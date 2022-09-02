import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { dataContext } from "../../Backend/useContext";
import { AuthContext } from "../nav/AuthContext"


import { Add, Fridge, IngredientDiv, IngredientImg, IngredientName, ListDiv, ListName, RemoveBtn, Search, WhisperDiv, WhisperUl, } from "../styles/MyFridge.styles";

export default function MyFridge() {
	const PicUrl = "https://spoonacular.com/cdn/ingredients_100x100/"
	const [query, setQuery] = useState("");
	const [autocomplete, setAutocomplete] = useState([]);
	const [ingredient, setIngredient] = useState("");
	const [ingredientId, setIngredientId] = useState("");
	const [ingredientImage, setIngredientImage] = useState("");
	const [fridgeList, setFridgeList] = useState([]);
	const { fridgeAddFireBase, user, setUser } = useContext(dataContext)
	const { userData } = useContext(AuthContext);

	console.log("fridgeList", fridgeList);
	console.log("data", userData);
	// console.log("data", autocomplete);
	useEffect(() => {
		const loadIngredients = async () => {
			const response = await axios.get(
				`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_FOODAPIKEY}&query=${query}&metaInformation=true`
			);
			setAutocomplete(response.data);
		};
		loadIngredients();
	}, [query]);



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
		console.log("sending");
		if (ingredientId !== "") {
			setFridgeList((oldArray) => [
				...oldArray,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			]);
			fridgeAddFireBase([
				...userData.data.myfridge,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			])
			setUser([
				...userData.data.myfridge,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			])
			setIngredient("");
			setIngredientId("");
			setIngredientImage("");
			document.getElementById("searchInput").value = "";
		}
	};

	const deleteFromFridgeList = (id) => {
		setFridgeList((oldArray) => oldArray.filter((item) => item.id !== id));
		const firebaseFridgeList = fridgeList.filter((item) => item.id !== id)
		fridgeAddFireBase([...firebaseFridgeList])
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
				<WhisperUl id="whisper">
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
			<ListDiv >
				<IngredientDiv>
					{userData.data.myfridge.map((item, i) => (
						<div key={item.id}>
							<IngredientImg
								// style={imgStyle}
								src={PicUrl+`${item.image}`}
								alt="food Img"
							/>
							<IngredientName> {item.name} </IngredientName>
							<RemoveBtn onClick={() => deleteFromFridgeList(item.id)}>
								{" "}
								Remove{" "}
							</RemoveBtn>
						</div>
					))}
				</IngredientDiv>
			</ListDiv>
		</Fridge>
	);
}
