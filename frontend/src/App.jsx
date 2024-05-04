import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp/SignUp.jsx";
import Footer from "./components/Footer/Footer";
import HomePage from "./screens/HomePage";
import { AuthProvider } from "./AuthProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
