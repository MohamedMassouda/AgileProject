import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp/SignUp.jsx";
import HomePage from "./screens/HomePage";
import { AuthProvider, useAuth } from "./AuthProvider.jsx";
import EventDescription from "./screens/EventDescriptionPage/EventDescriptionPage.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  const routes = [
    { path: "/login", element: <SignUp /> },

    { path: "/admin", element: <Users /> },
  ];

  if (currentUser && currentUser.emailVerified) {
    routes.push({ path: "/", element: <HomePage /> });
    routes.push({ path: "/events/:id", element: <EventDescription /> });
  } else {
    routes.push({ path: "/", element: <SignUp /> });
  }

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
