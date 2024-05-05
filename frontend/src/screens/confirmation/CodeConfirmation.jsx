import React, { useState } from 'react';
import './Code.css';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState(null);

  const handleOtpChange = (index) => (e) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      setError('Please enter all 6 digits');
    } else {
      // Verify OTP logic here
      console.log('OTP verified successfully!');
    }
  };

  return (
    <div className="otp-page">
      <h1>Enter Your OTP</h1>
      <p>We have sent an OTP to your registered mobile number</p>
      <form onSubmit={handleSubmit}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            value={digit}
            onChange={handleOtpChange(index)}
            maxLength={1}
            className="otp-input"
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