import "./App.css";
import HomePage from "./screens/HomePage";
import EventRequestPage from "./components/RequestPage/RequestPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <EventRequestPage /> 
        {/*<HomePage />*/}
      </header>
    </div>
  );
}

export default App;
