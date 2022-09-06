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
	// console.log(count);
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
	// console.log("auth", userData);
	const provider = new GoogleAuthProvider();
	const googleSignIn = () => {
		signInWithPopup(auth, provider);
	};

	const logOut = () => {
		setCount(count + 1);
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			// console.log(currentUser);
			if (!currentUser) {
				// console.log("ログインしてへんわ");
				setUser(null);
				setUserData({
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
				// console.log("ログインしてまっせ");
				setUser(currentUser);
				const fetch = async () => {
					const q = query(
						collection(db, "recipe"),
						where("id", "==", currentUser.uid)
					);
					const newArr = [];
					const querySnapshot = await getDocs(q);
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						setUserData({ data: doc.data(), docId: doc.id });
						newArr.push(doc.data());
					});
					if (newArr.length === 0) {
						const docRefRecipe = await addDoc(collection(db, "recipe"), {
							id: currentUser.uid,
							userName: currentUser.displayName,
							itemToBuy: [],
							myfridge: [],
							myrecipe: [],
						});
							const q = query(
								collection(db, "recipe"),
								where("id", "==", currentUser.uid)
							);
						const querySnapshot = await getDocs(q);
						querySnapshot.forEach((doc) => {
							// console.log(doc.data());
							setUserData({ data: doc.data(), docId: doc.id });
							newArr.push(doc.data());
						});
						setCount(count + 1);
					}
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
