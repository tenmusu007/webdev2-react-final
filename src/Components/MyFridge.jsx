import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'






export default function MyFridge() {

    const [query, setQuery] = useState("")

    const [fridge, setFridge] = useState([]);  
    useEffect(() => {
        const loadIngredients = async () => {
            const response = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=88749994321f4e4eaa03a853e6edf42c&query=${query}&metaInformation=true`);
            console.log(response.data);
            setFridge(response.data);
        }
        loadIngredients();
    }, [query])

    const handleOnChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
      }

  return (
    <div>
        <h2>My Fridge</h2>
        <form action="">
            <input type="text" list="pol" placeholder="Search" onChange={(e) => handleOnChange(e)} />
            <datalist id="pol">
            {fridge.map((item, i) => <option>{ item.name }</option>)} 
            </datalist>
            <input type="submit" value="Add" />
        </form>
        <div>
        <ul>  </ul>
        <button>X</button>
        </div>
    </div>
  )
}
