import fakeData from "./fakeData";
import fakeDataFridge from "./fakeDataFridge";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Recipespage.css";
import MyRecipes from "../MyRecipesBar(RightSection)/MyRecipes";
// import { MidPart } from "./Recipespage.styled";

const Recipespage = () => {
  const [cards, setCards] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [checkBox, setCheckBox] = useState();
  const [checkBoxValue, setCheckBoxValue] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const handleCheckbox = (food) => {
    if (!checkBoxValue.includes(food)) {
      setCheckBoxValue((prev) => [...prev, food]);
    }else{
      let newRecipes = checkBoxValue.filter((item, index) => {
        if (item !== food) {
          return item;
        }
      });
      setCheckBoxValue(newRecipes);
    }
  };

  useEffect(() => {
    // console.log(checkBoxValue.toString());
    getData(checkBoxValue.toString())
  }, [checkBoxValue])

  const getData = (checkboxElements) => {
    // console.log(process.env.REACT_APP_APIKEY)
    setCards(fakeData);
    // axios
    //   .get(
    //     `https://api.spoonacular.com/recipes/complexSearch?query=${checkboxElements}&number=50&apiKey=fa8a9d46ee714e2bbd0da09419e280e6`
    //   )
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data.results);
    //     console.log(response.data);
    //     setCards(response.data.results);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  };

  const getFridgeItems = () => {
    setCheckBox(fakeDataFridge);
  };

  useEffect(() => {
    getData();
    getFridgeItems();
  }, []);

  const handleToAdd = (item) => {
    // update to array and add item to array
    if (!recipes.includes(item)) {
      setRecipes((prev) => [...prev, item]);
    }
  };

  const deletingRecipe = (id) => {
    console.log(id);
    let newRecipes = recipes.filter((item, index) => {
      if (item.id !== id) {
        return item;
      }
    });

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
          {/* <form method="post" action="/Tests/Post/">       */}
    {/* <fieldset>      
        <legend>What is Your Favorite Pet?</legend>      
        <input type="checkbox" name="favorite_pet" value="Cats">Cats<br>      
        <input type="checkbox" name="favorite_pet" value="Dogs">Dogs<br>      
        <input type="checkbox" name="favorite_pet" value="Birds">Birds<br>      
        <br>      
        <input type="submit" value="Submit now" />      
    </fieldset>      
</form> */}
          {checkBox &&
            checkBox.map((foods, i) => {
              return (
                <>
                  <input
                    key={i}
                    className="check_boxes"
                    onChange={() => handleCheckbox(foods.name)}
                    type="checkbox"
                    id={foods.name}
                    name={foods.name}
                    value={foods.name}
                  />
                  <label className=".labels" for={foods.name}>
                    {" "}
                    {foods.name}{" "}
                  </label>
                </>
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
        <MyRecipes recipes={recipes} deletingRecipe={deletingRecipe} />
      </div>
      </div>
    </>
  );
};

export default Recipespage;
