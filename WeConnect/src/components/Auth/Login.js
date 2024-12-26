import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import { useAuth } from './AuthContext';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { userId, loggedInUsername } = await AuthService.login(username, password);
            if (userId) {
                login({ userId, username: loggedInUsername });
                navigate('/layout');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed.');
        }
    };

    return (
        <div className="custom-login-page">
          <div className="custom-left-section">
            <div className="custom-left-content">
            <img src="../assets/images/login/2.jpg" className="custom-signin-image" alt="image" />
  <h2 className="custom-slide-title">Connect with the world</h2>
  <p className="custom-slide-description">
    It is a long established fact that a reader will be<br /> distracted by the readable content.
  </p>
            </div>
          </div>
          <div className="custom-right-section">
            <div className="custom-form-container">
              <div className="custom-brand-logo">
              <div
  className="custom-logo-icon"
  style={{
    width: '40px',  // Set the width
    height: '50px', // Set the height
    maxWidth: '60px', // Prevent width from exceeding 60px
    fontSize: '32px',
  }}
>
  W
</div>

                <span className="custom-logo-text">WeConnect</span>
              </div>
              <p className="custom-welcome-message">
                Welcome to WeConnect
              </p>
              <br />
              <form onSubmit={handleLogin}>
                <div className="custom-input-group">
                  <h6 className="custom-form-label">Your Full Name</h6>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="custom-input-field"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="custom-input-group">
                  <h6 className="custom-form-label">Your Password</h6>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input-field"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="custom-login-button">
                  Login
                </button>
                {errorMessage && <p className="custom-error-message">{errorMessage}</p>}
              </form>
              <div className="custom-login-redirect">
                Don't have an account? <a href="/register">Register here</a>
              </div>
            </div>
          </div>
        </div>
      );      
};

export default Login;
