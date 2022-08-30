import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
	collection,
	addDoc,
	updateDoc,
	arrayUnion,
	doc,
	getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const StyledTest = styled.section`
	text-align: center;
	.container {
		width: 80%;
		margin: 200px auto;
		display: flex;
		justify-content: space-evenly;
		li {
			list-style: none;
		}
	}
`;

// getRecipe {
// docId: "QBTs4fsmVNfGxif325hs"
// id: "7wCJf43l65R7TuXnUa5jLBzA6lZ2"
// itemToBuy: []
// myfridge: []
// myrecipe: []
// userName: ""
// }
const Test = () => {
	const auth = getAuth();
	const [user, setUser] = useState();
	const [getUser, setGetUser] = useState([]);
	const [getRecipe, setGetRecipe] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const querySnapshot = await getDocs(collection(db, "users"));
			const newArr = [];
			querySnapshot.forEach((doc) => {
				newArr.push(doc.data());
			});
			setGetUser(newArr);
		};
		const fetchRecipe = async () => {
			const querySnapshot = await getDocs(collection(db, "recipe"));
			const newArr = [];
			querySnapshot.forEach((doc) => {
				newArr.push({ data :doc.data(), docId: doc.id });
			});
			setGetRecipe(newArr);
		};
		fetchRecipe();
		fetchUsers();
	}, [user]);
	console.log("userData",getUser);
	console.log("RecipeData", getRecipe);
	const googleAthu = () => {
		// signInWithRedirect(auth, provider)
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				const user = result.user;
				console.log(user);
				setUser({ userName: user.displayName, userId: user.uid });
				const addUser = async () => {
					try {
						console.log(getUser);
						if (getUser.length === 0) {
							const docRef = await addDoc(collection(db, "users"), {
								userName: user.displayName,
								userId: user.uid,
							});
							const docRefRecipe = await addDoc(collection(db, "recipe"), {
								id: user.uid,
								userName: user.displayName,
								itemToBuy: [],
								myfridge: [],
								myrecipe: [],
							});
						} else if (getUser.length > 0) {
							console.log("else");
							const filtered = getUser.map((value) => {
								return value.userId;
							});
							console.log("filtered",filtered, "id", user.uid);
							const checkedId = await filtered.find((value) => value === user.uid);
							console.log("checking", checkedId);
							if (checkedId === undefined) {
								const docRef = await addDoc(collection(db, "users"), {
									userName: user.displayName,
									userId: user.uid,
								});
								const docRefRecipe = await addDoc(collection(db, "recipe"), {
									id: user.uid,
									userName: user.displayName,
									itemToBuy: [],
									myfridge: [],
									myrecipe: [],
								});
							} else {
								console.log("account exists");
							}
						}
					} catch (e) {
						console.error("Error adding document: ", e);
					}
				};
				addUser();
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	const [fridge, setFridge] = useState([]);
	const [recipe, setRecipe] = useState([]);
	const fridgeRef = useRef("");
	const recipegeRef = useRef("");
	const handleSubmitFridge = (e) => {
		e.preventDefault();
		const item = fridgeRef.current.value;
		setFridge([...fridge, item]);
		fridgeAddFireBase({
			id: getUser[0].id,
			userName: getUser[0].userName,
			itemToBuy: [],
			myfridge: [item],
			myrecipe: [],
		});
	};
	const handleSubmitRecipe = (e) => {
		e.preventDefault();
		const item = recipegeRef.current.value;
		setRecipe([...recipe, item]);
		recipeAddFireBase({
			id: getUser[0].userId,
			docId : getRecipe[0].docId,
			userName: getUser[0].userName,
			itemToBuy: [],
			myfridge: [],
			myrecipe: [item],
		});
	};

	const recipeAddFireBase = async (recipe) => {
		console.log("recipe", recipe);
		try {
			const docRef = await updateDoc(doc(db, "recipe", `${recipe.docId}`), {
				myrecipe: arrayUnion(recipe.myrecipe[recipe.myrecipe.length - 1]),
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const fridgeAddFireBase = async (item) => {
		console.log("add fridge", item);
		try {
			const docRef = await updateDoc(
				doc(db, "recipe", "UFdoqj1eJHHM5bWrju1g"),
				{
					myfridge: arrayUnion(item),
				}
			);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const toBuyAddFireBase = async (item) => {
		console.log(item);

		try {
			const docRef = await updateDoc(
				doc(db, "recipe", "UFdoqj1eJHHM5bWrju1g"),
				{
					myfridge: arrayUnion(item),
				}
			);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	return (
		<StyledTest>
			<div className='container'>
				<button onClick={googleAthu}>Google</button>
				<div>
					<h2>fridge list</h2>
					{fridge.map((value, index) => {
						return <li key={index}>{value}</li>;
					})}
				</div>
				<div>
					<h2>My recipe</h2>
					{recipe.map((value, index) => {
						return <li key={index}>{value}</li>;
					})}
				</div>
				<div>
					<form onSubmit={handleSubmitFridge}>
						<input type='text' ref={fridgeRef} />
						<button>fridge</button>
					</form>
					<form onSubmit={handleSubmitRecipe}>
						<input type='text' ref={recipegeRef} />
						<button>recipe</button>
					</form>
				</div>
			</div>
		</StyledTest>
	);
};

export default Test;
