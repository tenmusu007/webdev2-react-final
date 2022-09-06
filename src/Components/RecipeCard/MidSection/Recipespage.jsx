import fakeData from "./fakeData";
import fakeDataFridge from "./fakeDataFridge";
import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import "./Recipespage.css";
import { DataContext } from "../../UseContext/DataContext";
import { AuthContext } from "../../nav/AuthContext"
import MyRecipes from "../MyRecipesBar(RightSection)/MyRecipes";
// import { MidPart } from "./Recipespage.styled";

const Recipespage = () => {
  const [cards, setCards] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [checkBox, setCheckBox] = useState();
  const [checkBoxValue, setCheckBoxValue] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { recipeAddFireBase, user, setUser } = useContext(DataContext)
  const { userData, isLogin } = useContext(AuthContext);
  // console.log(userData);
  // console.log(checkBox);
  const handleCheckbox = (food) => {
    // console.log('working');
    if (!checkBoxValue.includes(food)) {
      console.log('入ってない');
      setCheckBoxValue((prev) => [...prev, food]);
    } else {
      // console.log('入ってる');
      let newRecipes = checkBoxValue.filter((item, index) => {
        if (item !== food) {
          return item;
        }
      });
      setCheckBoxValue(newRecipes);
    }
  };
  useEffect(() => {
    setRecipes(userData.data.myrecipe)
    setCheckBox(userData.data.myfridge);
  }, [userData])
  useEffect(() => {
    // console.log(checkBoxValue.toString());
    getData(checkBoxValue.toString())
    // setRecipes(userData.data.myrecipe)
  }, [checkBoxValue])

  const getData = (checkboxElements) => {
    // setCards(fakeData);
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${checkboxElements}&number=50&apiKey=${process.env.REACT_APP_FOODAPIKEY}`
      )
      .then(function (response) {
        // handle success
        // console.log(response.data.results);
        // console.log(response.data);
        setCards(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };



  const handleToAdd = (item) => {

    if (!userData.data.myrecipe.includes(item)) {
      // setRecipes((prev) => [...prev, item]);
      console.log([
        ...userData.data.myrecipe, item
      ]);
      recipeAddFireBase([
        ...userData.data.myrecipe, item
      ])
      setRecipes([...recipes, item])

    }
  };

  const deletingRecipe = (id) => {
    // console.log(id);
    let newRecipes = recipes.filter((item, index) => {
      if (item.id !== id) {
        return item;
      }
    });
    recipeAddFireBase(newRecipes)
    setRecipes(newRecipes);
  };
  return (
    <>
    <div className="all_part_u all_div">
      <div className="all_div">
        <div className="all_div">
          <input
            className="search_bar"
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="all_div">
          <form>
              {isLogin && checkBox &&
            checkBox.map((foods, i) => {
              return (
                <div key={i}>
                  <input
                    key={i}
                    className="check_boxes"
                    onChange={() => handleCheckbox(foods.name)}
                    type="checkbox"
                    id={foods.name}
                    name={foods.name}
                    value={foods.name}
                  />
                  <label className=".labels" htmlFor={foods.name}>
                    {foods.name}
                  </label>
                </div>
              );
            })}
            </form>
        </div>
        <div className="cards all_div">
          {cards &&
            cards
              .filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item, index) => {
                return (
                  <div key={index} className="card all_div">
                    <p>{item.title}</p>
                    <img className="recipe_imgs" src={item.image} alt="" />
                    <div className="all_div">
                      <button className="card_buttons">More</button>
                      <button
                        className="card_buttons"
                        onClick={() => handleToAdd(item)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="right_part_u">
          <MyRecipes recipes={userData} deletingRecipe={deletingRecipe} />
      </div>
      </div>
    </>
  );
};

export default Recipespage;
