import React from "react";
import Events from "../components/Events/Events";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../AuthProvider";
import SignUp from "./SignUp/SignUp";

export default function HomePage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <SignUp />;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}
