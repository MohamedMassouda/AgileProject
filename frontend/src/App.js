import "./App.css";
import Navbar from "./screens/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
