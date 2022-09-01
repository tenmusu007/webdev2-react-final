import './App.css';
import MyFridge from './Components/MyFridegList/MyFridge';
import Test from './Backend/test';
import "./App.css";
import MyRecipes from "./Components/RecipeCard/MyRecipesBar(RightSection)/MyRecipes";
import Recipespage from "./Components/RecipeCard/MidSection/Recipespage";
import { AuthContextProvider } from './Components/nav/AuthContext';
import Nav from "./Components/nav/Nav"
import {  BrowserRouter as Router,   Routes,   Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">


      <AuthContextProvider>
        <Router>
          <Nav />
        </Router>
      </AuthContextProvider>

      {/* <Recipespage /> */}
      {/* <MyRecipes /> */}
      {/* <Test/> */}
      {/* <Recipespage /> */}
      {/* <MyFridge /> */}
    </div>
  );
}

export default App;
