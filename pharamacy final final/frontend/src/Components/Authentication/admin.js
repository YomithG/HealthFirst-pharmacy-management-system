import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Admin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    // Hardcoded username and password for demonstration
    if (username === 'admin' && password === '12345678') {
      navigate('/admin-dashboard')
      
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center mt-10">
        <div className="col-md-12">
          
            <div className="text-center">
              <h3>Login</h3>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Admin;
