import "./App.css";

import Recipespage from "./Components/RecipeCard/MidSection/Recipespage";
import Test from "./Backend/test";
import { DataContext } from "./Backend/useContext"
import MyFridge from "./Components/MyFridgeList/MyFridge";

function App() {
  return (
		<div className='App'>
      {/* <useDataContext> */}
      <DataContext>
				{/* <Recipespage /> */}
				<Test />
				<MyFridge />
      </DataContext>
			{/* </useDataContext> */}
		</div>
	);
}

export default App;
