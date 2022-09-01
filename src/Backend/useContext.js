import React, {
	useContext,
	useEffect,
	useRef,
	useState,
	createContext,
} from "react";
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export const dataContext = createContext();
// const provider = new GoogleAuthProvider();

export const DataContext = ({ children }) => {
	const [data, setData] = useState([]);
	const [user, setUser] = useState({
		data: {
			docId: "",
			id: "",
			itemToBuy: [],
			myfridge: [],
			myrecipe: [],
		},
		docId: "",
	});

	// const Test = () => {
	const auth = getAuth();
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
		const fetchRecipe = async () => {
			const querySnapshot = await getDocs(collection(db, "recipe"));
			const newArr = [];
			querySnapshot.forEach((doc) => {
				newArr.push({ data: doc.data(), docId: doc.id });
			});
			setGetRecipe(newArr);
		};
		fetchRecipe();
		fetch();
		// fetchUsers();
	}, [user]);
	// console.log("userData", getUser);
	console.log("RecipeData", getRecipe);
	console.log("Contextuser", user);
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

	const recipeAddFireBase = async (recipe) => {
		console.log("recipe", recipe);
		const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
		console.log(q);
		const querySnapshot = await getDocs(q);
		const newArr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			newArr.push(doc.data());
			console.log(doc.id, " => ", doc.data());
		});
		console.log(newArr);
		try {
			const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
				id: user.data.id,
				docId: user.docId,
				userName: user.data.userName,
				itemToBuy: [...user.data.itemToBuy],
				myfridge: [...user.data.myfridge],
				myrecipe: [recipe],
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const fridgeAddFireBase = async (item) => {
		console.log(item);

		const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
		const querySnapshot = await getDocs(q);
		const newArr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			newArr.push(doc.data());
			console.log(doc.id, " => ", doc.data());
		});
		try {
			const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
				id: user.data.id,
				docId: user.docId,
				userName: user.data.userName,
				itemToBuy: [...user.data.itemToBuy],
				myfridge: [...item],
				myrecipe: [...user.data.myrecipe],
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	const toBuyAddFireBase = async (item) => {
		const q = query(collection(db, "recipe"), where("id", "==", user.data.id));
		console.log(q);
		const querySnapshot = await getDocs(q);
		const newArr = [];
		querySnapshot.forEach((doc) => {
			newArr.push(doc.data());
			console.log(doc.id, " => ", doc.data());
		});
		try {
			const docRef = await setDoc(doc(db, "recipe", `${user.docId}`), {
				id: user.data.id,
				docId: user.docId,
				userName: user.data.userName,
				itemToBuy: [item],
				myfridge: [...user.data.myfridge],
				myrecipe: [...user.data.myrecipe],
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	// };
	return (
		<dataContext.Provider
			value={{ data, setData, user, setUser, fridgeAddFireBase }}
		>
			{children}
		</dataContext.Provider>
	);
};
