import MyFridge from "./Components/MyFridgeList/MyFridge";
import Test from "./Backend/test";
import "./App.css";
import MyRecipes from "./Components/RecipeCard/MyRecipesBar(RightSection)/MyRecipes";
import Recipespage from "./Components/RecipeCard/MidSection/Recipespage";
import { AuthContextProvider } from "./Components/nav/AuthContext";
import { DataContext } from "./Backend/useContext";
import { DataProvider } from "./Components/UseContext/DataContext";

import Nav from "./Components/nav/Nav";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe";
import Shopping from "./pages/Shopping";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<AuthContextProvider>
					<DataProvider>
						<Routes>
							<Route path='/' element={<Recipe />} />
							<Route path='MyshoppingList' element={<Shopping />} />
						</Routes>
					</DataProvider>
				</AuthContextProvider>
			</BrowserRouter>

			{/* <DataContext> */}
			{/* </DataContext> */}
			{/* <MyFridge /> */}
			{/* <Recipes />	 */}

			{/* <Recipespage /> */}
			{/* <MyRecipes /> */}
			{/* <Test/> */}
			{/* <Recipespage /> */}
		</div>
	);
}

export default App;
