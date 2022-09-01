import './App.css';
import Test from './Backend/test';
import ItemToBuy from './Components/ItemToBuy/ItemToBuy';
import MyFridge from './Components/MyFridgeList/MyFridge';

function App() {
  return (
    <div className="App">
      {/* <Test/> */}
      {/* <MyFridge/> */}
      <ItemToBuy/>
    </div>
  );
}

export default App;
