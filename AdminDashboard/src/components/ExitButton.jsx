import React from "react";
import "./ExitButton.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Exit = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <div className="close">
        <h1>Are you sure you want to exit?</h1>
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      //onClick={onClick}
      type={type}
      onClick={() => { window.location.href = "http://localhost:3000"; }}
    >
        Exit
      {children}
    </button>
    </div>
  );
};

export default Exit;