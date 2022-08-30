// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// console.log("appId", process.env.REACT_APP_APPID);
const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
	appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
export const db = getFirestore(app);
// const collectionRef = collection(db, "recipe");
// const fetchData = async () => {
// 	const data = await getDocs(collectionRef);
// 	console.log("docs", data);
// };
// fetchData();
