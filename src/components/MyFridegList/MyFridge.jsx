import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MyFridge() {
	const [query, setQuery] = useState("");
	const [autocomplete, setAutocomplete] = useState([]);
	const [ingredient, setIngredient] = useState("");
	const [ingredientId, setIngredientId] = useState("");
	const [ingredientImage, setIngredientImage] = useState("");
	const [fridgeList, setFridgeList] = useState([]);

	useEffect(() => {
		const loadIngredients = async () => {
			const response = await axios.get(
				`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=88749994321f4e4eaa03a853e6edf42c&query=${query}&metaInformation=true`
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
		if (ingredientId != "") {
			setFridgeList((oldArray) => [
				...oldArray,
				{ id: ingredientId, name: ingredient, image: ingredientImage },
			]);
			setIngredient("");
			setIngredientId("");
			setIngredientImage("");
			document.getElementById("searchInput").value = "";
		}
	};

	const deleteFromFridgeList = (id) => {
		setFridgeList((oldArray) => oldArray.filter((item) => item.id !== id));
	};

	const imgStyle = {
		width: "3%",
		height: "3%",
	};

	const listStyle = {
		display: "flex",
		flexDirection: "column",
	};

	return (
		<div>
			<h2>My Fridge</h2>
			<form>
				<input
					type="text"
					id="searchInput"
					list="pol"
					autoComplete="off"
					placeholder="Search"
					onChange={(e) => handleOnChange(e)}
				/>
				<input type="button" value="Add" onClick={() => sendToFridgeList()} />
				<ul id="whisper">
					{autocomplete.map((item, i) => (
						<div
							onClick={() => temporaryList(item.id, item.name, item.image)}
							key={item.id}
						>
							{item.name}
						</div>
					))}
				</ul>
			</form>
			<div style={listStyle}>
				{fridgeList.map((item, i) => (
					<div key={item.id}>
						<img
							style={imgStyle}
							src={
								"https://spoonacular.com/cdn/ingredients_100x100/" + item.image
							}
						/>
						<span> {item.name} </span>
						<button onClick={() => deleteFromFridgeList(item.id)}>
							{" "}
							Remove{" "}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
