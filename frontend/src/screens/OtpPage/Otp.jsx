import React, { useState } from "react";
import "./Otp.css";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const OTPPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(null);

  const goToNextInput = (index) => {
    if (index < otp.length - 1) {
      document.getElementsByClassName(`input-${index + 1}`)[0].focus();
    }
  };

  const handleOtpChange = (index) => (e) => {
    if (isNaN(e.target.value)) {
      return false;
    }

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "") {
      goToNextInput(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      await auth.validateOtp(otp.join(""));
    } catch (error) {}

    navigate("/");
  };

  return (
    <div className="otp-page">
      <h1>Enter Your OTP</h1>
      <p>We have sent an OTP to your email</p>
      <form onSubmit={handleSubmit}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={handleOtpChange(index)}
            min={0}
            minLength={1}
            maxLength={1}
            className={`otp-input input-${index}`}
          />
        ))}
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPPage;
