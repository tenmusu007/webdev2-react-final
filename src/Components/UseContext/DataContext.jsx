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

export const DataProvider = ({children}) => {
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

  // const Test = () => {
  // const auth = getAuth();
  // const [getUser, setGetUser] = useState([]);
  // const [getRecipe, setGetRecipe] = useState([]);
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
    // const fetchRecipe = async () => {
    //   const querySnapshot = await getDocs(collection(db, "recipe"));
    //   const newArr = [];
    //   querySnapshot.forEach((doc) => {
    //     newArr.push({ data: doc.data(), docId: doc.id });
    //   });
    //   // setGetRecipe(newArr);
    // };
    // fetchRecipe();
    fetch();
    // fetchUsers();
  }, [userData.docId]);
  // console.log("userData", getUser);
  // console.log("RecipeData", getRecipe);
  // console.log("effect", user);
  // const [fridge, setFridge] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  // const fridgeRef = useRef("");
  // const recipegeRef = useRef("");
  // const handleSubmitFridge = (e) => {
  //   e.preventDefault();
  //   const item = fridgeRef.current.value;
  //   setFridge([...fridge, item]);
  //   fridgeAddFireBase(item);
  // };
  // const handleSubmitRecipe = (e) => {
  //   e.preventDefault();
  //   const item = recipegeRef.current.value;
  //   setRecipe([...recipe, item]);
  //   recipeAddFireBase(item);
  // };

  const recipeAddFireBase = async (recipe) => {
    console.log("recipe", recipe);
    // const q = query(collection(db, "recipe"), where("id", "==", userData.data.id));
    // // console.log(q);
    // const querySnapshot = await getDocs(q);
    // const newArr = [];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   newArr.push(doc.data());
    //   // console.log(doc.id, " => ", doc.data());
    // });
    // // console.log(newArr);
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
    // console.log("contxt",item);
    // const q = query(collection(db, "recipe"), where("id", "==", userData.data.id));
    // const querySnapshot = await getDocs(q);
    // const newArr = [];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   newArr.push(doc.data());
    //   console.log(doc.id, " => ", doc.data());
    // });
    try {
      const docRef = await setDoc(doc(db, "recipe", `${userData.docId}`), {
        id: userData.data.id,
        docId: userData.docId,
        userName: userData.data.userName,
        itemToBuy: [...userData.data.itemToBuy],
        myfridge: [...item],
        myrecipe: [...userData.data.myrecipe],
      });
      await   setCount(count + 1)
      // console.log("counted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const toBuyAddFireBase = async (item) => {
    // const q = query(collection(db, "recipe"), where("id", "==", userData.data.id));
    // console.log(q);
    // const querySnapshot = await getDocs(q);
    // const newArr = [];
    // querySnapshot.forEach((doc) => {
    //   newArr.push(doc.data());
    //   console.log(doc.id, " => ", doc.data());
    // });
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
  return <DataContext.Provider value={{ fridgeAddFireBase, recipeAddFireBase, toBuyAddFireBase, user, setUser}}>
    {children}
  </DataContext.Provider>;
};
