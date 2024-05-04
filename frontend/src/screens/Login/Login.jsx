import React, { useState } from "react";
import "./Login.css";
import { AuthProvider, useAuth } from "../../AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const [currentUser, login] = useAuth();

    login(email, password);
  };

  return (
    <div className="login-container">
      <h2> Login </h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <span>Show Password</span>
        <br />

        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

export default Login;
