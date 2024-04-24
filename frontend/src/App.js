import "./App.css";
import Navbar from "./screens/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp.jsx";
import Footer from "./screens/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
