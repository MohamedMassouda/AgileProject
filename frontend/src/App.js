import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp/SignUp.jsx";
import Footer from "./components/Footer/Footer";
import HomePage from "./screens/HomePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<SignUp />} />
				<Route path="/footer" element={<Footer />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
