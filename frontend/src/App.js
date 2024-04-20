import './App.css';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Navbar from './screens/Navbar.jsx';



function App() {
  return (
    <div className="App">
      <header className="App-header">
                <style>{'body { background-color: #EC296D; }'}</style>
                <Navbar />
        <SignUp />
      </header>
    </div>
    
  );
}

export default App;
