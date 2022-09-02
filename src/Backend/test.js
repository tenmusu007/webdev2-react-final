import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
	collection,
	addDoc,
	updateDoc,
	arrayUnion,
	doc,
	query,
	where,
	getDocs,
	setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
<<<<<<< HEAD
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { dataContext } from "./useContext";
=======
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";
import { async } from "@firebase/util";
>>>>>>> 9a515dc051a7e9ba81242c60386ad936b49ce664

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

const Test = () => {
	const {data} = useContext(dataContext)
	const auth = getAuth();
<<<<<<< HEAD
	const { user, setUser } = useContext(dataContext);
	// const [user, setUser] = useState({
	// 	data:[],
	// 	docId: "",
	// });
	const [getUser, setGetUser] = useState([]);
	const [getRecipe, setGetRecipe] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const q = query(collection(db, "recipe"), where("id", "==", user.id));
			// console.log(q);
			const newArr = [];
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				setUser({ data: doc.data(), docId: doc.id });
				newArr.push(doc.data());
			});
		};
		// const fetchRecipe = async () => {
		// 	const querySnapshot = await getDocs(collection(db, "recipe"));
		// 	const newArr = [];
		// 	querySnapshot.forEach((doc) => {
		// 		newArr.push({ data: doc.data(), docId: doc.id });
		// 	});
		// 	// setGetRecipe(newArr);
		// };
		// fetchRecipe();
		fetch();
		// fetchUsers();
	}, [user]);
	// console.log("userData", getUser);
	// console.log("RecipeData", getRecipe);
	console.log("user", user);
=======
	const [user, setUser] = useState({
		data: [],
		docId: "",
	});
	const [getUser, setGetUser] = useState([]);
	const [getRecipe, setGetRecipe] = useState([]);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			// setUser(currentUser);
			console.log("test", currentUser);
			const fetch = async () => {
				const q = query(
					collection(db, "recipe"),
					where("id", "==", currentUser.uid)
				);
				console.log(q);
				const newArr = [];
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					setUser({ data: doc.data(), docId: doc.id });
					newArr.push(doc.data());
				});
			};
			fetch();
		});
		const fetchRecipe = async () => {
			const querySnapshot = await getDocs(collection(db, "recipe"));
			const newArr = [];
			querySnapshot.forEach((doc) => {
				newArr.push({ data: doc.data(), docId: doc.id });
			});
			setGetRecipe(newArr);
		};
		unsubscribe();
		fetchRecipe();
		// fetchUsers();
	}, []);
	// console.log("userData", getUser);
	// console.log("RecipeData", getRecipe);
	// console.log("user", user);
>>>>>>> 9a515dc051a7e9ba81242c60386ad936b49ce664
	const googleAthu = () => {
		// signInWithRedirect(auth, provider)
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				const user = result.user;
				// console.log(user);
				// setUser(user)
				const fetch = async () => {
					const q = query(
						collection(db, "recipe"),
						where("id", "==", user.uid)
					);
					console.log(q);
					const newArr = [];
					const querySnapshot = await getDocs(q);
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						setUser({ data: doc.data(), docId: doc.id });
						newArr.push(doc.data());
					});
					console.log(newArr);
					if (newArr.length === 0) {
						const docRefRecipe = await addDoc(collection(db, "recipe"), {
							id: user.uid,
							userName: user.displayName,
							itemToBuy: [],
							myfridge: [],
							myrecipe: [],
						});
						setUser({
							id: user.uid,
							userName: user.displayName,
							itemToBuy: [],
							myfridge: [],
							myrecipe: [],
						});
					}
				};
				const addUser = async () => {
					try {
						fetch();
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

<<<<<<< HEAD
	// const [fridge, setFridge] = useState([]);
	// const [recipe, setRecipe] = useState([]);
	// const fridgeRef = useRef("");
	// const recipegeRef = useRef("");
	// const handleSubmitFridge = (e) => {
	// 	e.preventDefault();
	// 	const item = fridgeRef.current.value;
	// 	setFridge([...fridge, item]);
	// 	fridgeAddFireBase(item);

	// };
	// const handleSubmitRecipe = (e) => {
	// 	e.preventDefault();
	// 	const item = recipegeRef.current.value;
	// 	setRecipe([...recipe, item]);
	// 	recipeAddFireBase(item);
	// };
=======
	const [fridge, setFridge] = useState([]);
	const [recipe, setRecipe] = useState([]);
	const fridgeRef = useRef("");
	const recipegeRef = useRef("");
	const handleSubmitFridge = (e) => {
		e.preventDefault();
		const item = fridgeRef.current.value;
		setFridge([...fridge, item]);
		fridgeAddFireBase(item);
	};
	const handleSubmitRecipe = (e) => {
		e.preventDefault();
		const item = recipegeRef.current.value;
		setRecipe([...recipe, item]);
		recipeAddFireBase(item);
	};
>>>>>>> 9a515dc051a7e9ba81242c60386ad936b49ce664

	// const recipeAddFireBase = async (recipe) => {
	// 	console.log("recipe", recipe);
	// 	const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
	// 	console.log(q);
	// 	const querySnapshot = await getDocs(q);
	// 	const newArr = [];
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		newArr.push(doc.data());
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// 	console.log(newArr);
	// 	try {
	// 		const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
	// 			id: user.data.id,
	// 			docId: user.docId,
	// 			userName: user.data.userName,
	// 			itemToBuy: [...user.data.itemToBuy],
	// 			myfridge: [...user.data.myfridge],
	// 			myrecipe: [recipe],
	// 		});
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// };
	// const fridgeAddFireBase = async (item) => {
	// 	const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
	// 	const querySnapshot = await getDocs(q);
	// 	const newArr = [];
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		newArr.push(doc.data());
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// 	try {
	// 		const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
	// 			id: user.data.id,
	// 			docId: user.docId,
	// 			userName: user.data.userName,
	// 			itemToBuy: [...user.data.itemToBuy],
	// 			myfridge: [item],
	// 			myrecipe: [...user.data.myrecipe],
	// 		});
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// };
	// const toBuyAddFireBase = async (item) => {
	// 	const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
	// 	console.log(q);
	// 	const querySnapshot = await getDocs(q);
	// 	const newArr = [];
	// 	querySnapshot.forEach((doc) => {
	// 		newArr.push(doc.data());
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// 	try {
	// 		const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
	// 			id: user.data.id,
	// 			docId: user.docId,
	// 			userName: user.data.userName,
	// 			itemToBuy: [item],
	// 			myfridge: [...user.data.myfridge],
	// 			myrecipe: [...user.data.myrecipe],
	// 		});
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// };
	return (
		<StyledTest>
			<div className='container'>
				<button onClick={googleAthu}>Google</button>
				{/* <div>
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
				</div> */}
			</div>
		</StyledTest>
	);
};

export default Test;

// {
// 	id: recipe.id,
// 	docId: recipe.docId,
// 	userName: recipe.userName,
// 	itemToBuy: [{obj}],
// 	myfridge: [{obj}],
// 	myrecipe: [{obj}],
// 	}
