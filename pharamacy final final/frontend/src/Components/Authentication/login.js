import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config2"; // Import config2.js instead of config.json

axios.defaults.baseURL = 'http://localhost:8070';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // State to control the visibility of success modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const allowedUsernames = [
        "Sajith", "ddd", "wicki", "batman", "yomith", 
        "qwert", "sathyajith", "shanika_b", "rohanf", "nadeeshap"
      ];

      if (allowedUsernames.includes(username) && password === '123') {
        // If the username and password match, set showSuccess to true
        setShowSuccess(true);
        return;
      }

      // If the username or password is incorrect, set error message
      setError("Invalid username or password.");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleOk = () => {
    // Redirect to home page
    navigate("/home");
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
      {/* Login Success Modal */}
      {showSuccess && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Success</h5>
                <button type="button" className="close" onClick={handleOk}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>You have successfully logged in.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Login Success Modal */}
    </div>
  );
};

export default Login;
