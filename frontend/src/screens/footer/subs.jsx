import React from "react";
import "./footer.css";


const Subs = () => {
  return (
    <div className="box">
      <div>
      <p className="txt">
        <i className="fas fa-envelope"></i>Sign Up For NewsLetters
      </p>
      </div>
      <form className="frm" action="">
      <div>
        <input type="text" placeholder="enter your email address" />
        </div>
        <div>
        <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  );
};

export default Subs;
