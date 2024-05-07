import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthProvider.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import HomePage from "./screens/HomePage";
import SignUp from "./screens/SignUp/SignUp.jsx";
import EventDescription from "./screens/EventDescriptionPage/EventDescriptionPage.jsx";

function App() {
  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/events/:id", element: <EventDescription /> },
    { path: "/login", element: <SignUp /> },
    { path: "/admin", element: <Users /> },
  ];

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
