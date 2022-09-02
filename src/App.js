import MyFridge from "./Components/MyFridgeList/MyFridge";
import Test from "./Backend/test";
import "./App.css";
import Recipes from "./Components/Recipes";
import MyRecipes from "./Components/RecipeCard/MyRecipesBar(RightSection)/MyRecipes";
import Recipespage from "./Components/RecipeCard/MidSection/Recipespage";
import { AuthContextProvider } from "./Components/nav/AuthContext";
import { DataContext } from "./Backend/useContext";
import { DataProvider } from "./Components/UseContext/DataContext";

import Nav from "./Components/nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className='App'>
			<AuthContextProvider>
				{/* <DataContext> */}
					<DataProvider>
						<Router>
							<Nav />
						</Router>
						<MyFridge />
			{/* <Recipes />	 */}
					</DataProvider>
				{/* </DataContext> */}
			</AuthContextProvider>


			{/* <Recipespage /> */}
			{/* <MyRecipes /> */}
			{/* <Test/> */}
			{/* <Recipespage /> */}
		</div>
	);

}

export default App;
