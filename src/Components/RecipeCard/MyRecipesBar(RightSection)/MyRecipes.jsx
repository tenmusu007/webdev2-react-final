import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../nav/AuthContext"
import "./MyRecipes.css";

const MyRecipes = ({ recipes, deletingRecipe }) => {
  const { userData, isLogin } = useContext(AuthContext);
  const [Lecipes, setLecipes] = useState([])
  // useEffect(() => {
  //   setLecipes(userData.data.myrecipe)
  // }, [userData.data.myrecipe])
  return (
    <>
      <div className="right_part_uu">
        <h2>My Recipes</h2>
        <ul>
          {isLogin && userData ?
            (userData.data.myrecipe.map((item, index) => {
              return (
                <li className="recipes_list" key={index}>
                  <p>{item.title}</p>
                  <i onClick={() => deletingRecipe(item.id)} className="fa-solid fa-trash-can"></i>
                </li>
              );
            })) : (Lecipes.map((item, index) => {
              return (
                <li className="recipes_list" key={index}>
                  <p>{item.title}</p>
                  <i onClick={() => deletingRecipe(item.id)} className="fa-solid fa-trash-can"></i>
                </li>
              );
            }))}
        </ul>
      </div>
    </>
  );
};

export default MyRecipes;
