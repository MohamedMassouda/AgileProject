import React from "react";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";
import Logo from "../Navbar/backfree.png";
import Subs from "./Subs";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <img src={Logo} alt="Logo" height={200} width={200} />

        <div className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </div>

        <p className="footer-company-name">
          Horizon School Of DigitAI Technologies © 2024
        </p>
      </div>

      <div className="footer-center">
        <Subs />
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Hammed al Ghazali street ,</span> Sousse
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+216 55 001 002</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:ahmed.massoudi@horizon-tech.tn">
              Contact-GoOut@horizon-tech.tn
            </a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod
          convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className="footer-icons">
          <SocialIcon url="http://www.x.com/" />
          <SocialIcon url="www.facebook.com" />
          <SocialIcon url="https://github.com" />
          <SocialIcon url="https://www.instagram.com" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
