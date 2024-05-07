import React from "react";
import Events from "../components/Events/Events";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <Events />
      <Navbar />
      <Footer />
    </div>
  );
}
