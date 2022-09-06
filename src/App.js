import "./App.css";
import Recipes from './Components/Recipes';
import MyRecipes from "./Components/RecipeCard/MyRecipesBar(RightSection)/MyRecipes";
import Recipespage from "./Components/RecipeCard/MidSection/Recipespage";
import Test from "./Backend/test";
import { DataContext } from "./Backend/useContext"
import MyFridge from "./Components/MyFridgeList/MyFridge";
import { AuthContextProvider } from './Components/nav/AuthContext';
import Nav from "./Components/nav/Nav"
import {  BrowserRouter as Router,   Routes,   Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Recipes />
      <AuthContextProvider>
        <Router>
          <Nav />
        </Router>
      </AuthContextProvider> 
      {/* <MyRecipes /> */}
      {/* <Test/> */}
      {/* <Recipespage /> */}
      {/* <MyFridge /> */}
    </div>
  );
}

export default App;
