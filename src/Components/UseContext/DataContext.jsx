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
import { db } from "../../Backend/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../nav/AuthContext"

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [data, setData] = useState([]);
  // const [count, setCount] = useState(0);
  const { userData, count, setCount } = useContext(AuthContext);

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

  useEffect(() => {
    // console.log("effect working dataContext");  
    const fetch = async () => {
      const q = query(
        collection(db, "recipe"),
        where("id", "==", userData.docId)
      );
      // console.log(q);
      const newArr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser({ data: doc.data(), docId: doc.id });
        newArr.push(doc.data());
      });
    };

    fetch();
    // fetchUsers();
  }, [userData.docId]);


  const recipeAddFireBase = async (recipe) => {

    try {
      const docRef = await setDoc(doc(db, "recipe", `${userData.docId}`), {
        id: userData.data.id,
        docId: userData.docId,
        userName: userData.data.userName,
        itemToBuy: [...userData.data.itemToBuy],
        myfridge: [...userData.data.myfridge],
        myrecipe: [...recipe],
      });
      await setCount(count + 1)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const fridgeAddFireBase = async (item) => {

    try {
      const docRef = await setDoc(doc(db, "recipe", `${userData.docId}`), {
        id: userData.data.id,
        docId: userData.docId,
        userName: userData.data.userName,
        itemToBuy: [...userData.data.itemToBuy],
        myfridge: [...item],
        myrecipe: [...userData.data.myrecipe],
      });
      await setCount(count + 1)
      // console.log("counted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const toBuyAddFireBase = async (item) => {

    try {
      const docRef = await setDoc(doc(db, "recipe", `${userData.docId}`), {
        id: userData.data.id,
        docId: userData.docId,
        userName: userData.data.userName,
        itemToBuy: [item],
        myfridge: [...userData.data.myfridge],
        myrecipe: [...userData.data.myrecipe],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return <DataContext.Provider value={{ fridgeAddFireBase, recipeAddFireBase, toBuyAddFireBase, user, setUser }}>
    {children}
  </DataContext.Provider>;
};