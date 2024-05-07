// import "./App.css";
import Navbar from "./screens/nav/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/register/SignUp.jsx";
import Footer from "./screens/footer/Footer.jsx";
import Badge from "./screens/badge/badge.jsx";
import OTPPage from "./screens/confirmation/CodeConfirmation.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/badge" element={<Badge />} />
        <Route path="/confirmation" element={<OTPPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
