import React from "react";
import "./footer.css";


const Subs = () => {
  return (
    <div className="box">
      <p className="txt">
        <i className="fas fa-envelope"></i>Sign Up For NewsLetters
      </p>
      <form className="frm" action="">
        <input type="text" placeholder="enter your email address" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default Subs;
