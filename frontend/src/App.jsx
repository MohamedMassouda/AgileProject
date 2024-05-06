import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp/SignUp.jsx";
import HomePage from "./screens/HomePage";
import { AuthProvider, useAuth } from "./AuthProvider.jsx";
import EventDescription from "./screens/EventDescriptionPage/EventDescriptionPage.jsx";

function App() {
  const { currentUser } = useAuth();

  const routes = [{ path: "/login", element: <SignUp /> }];

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
