// import fakeData from "./fakeData";
import fakeDataFridge from "./fakeDataFridge";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyRecipes from "../MyRecipesBar(RightSection)/MyRecipes";
// import styled from "styled-components";

import {
  All_part_u,
  All_div,
  Search_bar,
  Check_boxes,
  Labels,
  Cards,
  Card,
  Recipe_imgs,
  Card_buttons,
  Right_part_u
} from "../../styles/Recipespage.styled";

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
    } else {
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
    getData(checkBoxValue.toString());
  }, [checkBoxValue]);

  const getData = (checkboxElements) => {
    // console.log(process.env.REACT_APP_APIKEY)
    // setCards(fakeData);
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${checkboxElements}&number=50&apiKey=${process.env.REACT_APP_APIKEY_SPOONCULAR}`
      )
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        console.log(response.data);
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
      <All_part_u>
        <All_div>
          <All_div>
            <Search_bar
              className="search_bar"
              type="text"
              placeholder="Search.."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </All_div>
          <All_div>
            <form>
              {checkBox &&
                checkBox.map((foods, i) => {
                  return (
                    <>
                      <Check_boxes
                        className="check_boxes"
                        onChange={() => handleCheckbox(foods.name)}
                        type="checkbox"
                        id={foods.name}
                        name={foods.name}
                        value={foods.name}
                      />
                      <Labels className="labels" for={foods.name}>
                        {" "}
                        {foods.name}{" "}
                      </Labels>
                    </>
                  );
                })}
            </form>
          </All_div>
          <Cards>
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
                    <Card key={index}>
                      <p>{item.title}</p>
                      <Recipe_imgs src={item.image} alt="" />
                      <All_div>
                        <Card_buttons>More</Card_buttons>
                        <Card_buttons onClick={() => handleToAdd(item)}>
                          Add
                        </Card_buttons>
                      </All_div>
                    </Card>
                  );
                })}
          </Cards>
        </All_div>
        <Right_part_u>
          <MyRecipes recipes={recipes} deletingRecipe={deletingRecipe} />
        </Right_part_u>
      </All_part_u>
    </>
  );
};

export default Recipespage;
