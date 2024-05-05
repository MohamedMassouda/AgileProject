import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import Button from "./button.js";
import "./Navbar.css";
import Logo from  "./backfree.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <nav className="NavbarItems">
      <a href="" className="navbar-logo">
        <img src={Logo}alt="Logo" height={150} />
      </a>

      <div className="menu-icon" onClick={() => setClicked(!clicked)}>
        {clicked ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <Button>Sign Up</Button>
    </nav>
    
  );
};

export default Navbar;