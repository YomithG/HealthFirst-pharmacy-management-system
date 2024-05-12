import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config2"; // Import config2.js instead of config.json

axios.defaults.baseURL = 'http://localhost:8070';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const hardcodedCredentials = config.credentials; // Access the credentials from the configuration

      // Check if entered username exists in hardcoded credentials
      if (username in hardcodedCredentials) {
        // Check if entered password matches the corresponding hardcoded password
        if (password === hardcodedCredentials[username]) {
          // Redirect to home page
          navigate("/home");
          return; // Exit function
        }
      }

      // If username or password is incorrect, set error message
      setError("Invalid username or password.");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
