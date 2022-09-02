import { useContext, createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
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
import { db } from "../../Backend/firebase";
import { auth } from "../../Backend/firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [isLogin, setIsLogin] = useState(false);
	const [count, setCount] = useState(0);
	const [fridgeList, setFridgeList] = useState({
		data: {
			docId: "",
			id: "",
			itemToBuy: [],
			myfridge: [],
			myrecipe: [],
		},
		docId: "",
	});

	const [userData, setUserData] = useState({
		data: {
			docId: "",
			id: "",
			itemToBuy: [],
			myfridge: [],
			myrecipe: [],
		},
		docId: "",
	});
	// console.log(user);
	const provider = new GoogleAuthProvider();
	const googleSignIn = () => {
		// setIsLogin(!isLogin);
		signInWithPopup(auth, provider);
	};

	const logOut = () => {
		setCount(count + 1);
		setFridgeList({
			data: {
				docId: "",
				id: "",
				itemToBuy: [],
				myfridge: [],
				myrecipe: [],
			},
			docId: "",
		});
		// setIsLogin(!isLogin);
		signOut(auth);
	};

	useEffect(() => {
		console.log("effect working AuthContext");
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				setUser(null);
				setFridgeList({
					data: {
						docId: "",
						id: "",
						itemToBuy: [],
						myfridge: [],
						myrecipe: [],
					},
					docId: "",
				});
			} else {
				setUser(currentUser);
				const fetch = async () => {
					const q = query(
						collection(db, "recipe"),
						where("id", "==", currentUser.uid)
					);
					// setIsLogin(!isLogin);
					// console.log(q);
					const newArr = [];
					const querySnapshot = await getDocs(q);
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						setUserData({ data: doc.data(), docId: doc.id });
						setFridgeList({ data: doc.data(), docId: doc.id });
						newArr.push(doc.data());
					});
				};
				fetch();
			}
		});
		return () => {
			unsubscribe();
		};
	}, [count]);
	return (
		<AuthContext.Provider
			value={{
				googleSignIn,
				logOut,
				user,
				userData,
				count,
				setCount,
				fridgeList,
				setFridgeList,
				isLogin,
				setIsLogin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
