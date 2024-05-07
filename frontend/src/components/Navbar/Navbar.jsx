import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import "./Navbar.css";
import Logo from "./backfree.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../AuthProvider.jsx";

const MenuItems = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
  },
  {
    title: "Events",
    url: "/",
    cName: "nav-links",
  },
  {
    title: "About Us",
    url: "/services",
    cName: "nav-links",
  },
];

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  let added = false;
  const { currentUser } = useAuth();

  useEffect(() => {
    if (added) return;

    if (currentUser) {
      if (currentUser.role.toLowerCase() === "admin") {
        MenuItems.push({
          title: "Admin",
          url: "localhost:3001",
          cName: "nav-links",
        });
      }

      MenuItems.push({
        title: "Profile",
        url: "/profile",
        cName: "nav-links",
      });

      MenuItems.push({
        title: "Logout",
        url: "/logout",
        cName: "nav-links",
      });
    } else {
      MenuItems.push({
        title: "Login",
        url: "/login",
        cName: "nav-links",
      });
    }

    added = true;
  }, []);

  return (
    <nav className="NavbarItems">
      <a href="" className="navbar-logo">
        <img src={Logo} alt="Logo" height={80} />
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
    </nav>
  );
};

export default Navbar;
