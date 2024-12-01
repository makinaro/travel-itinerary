import React, { useState } from 'react';
import './Login.css';
import logoImage from '../assets/Images/logo.png'; // Ensure the path is correct
import loginBG from '../assets/Images/loginBG.jpeg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set the error message
    }
  };

  return (
    <>
      <div className="logo-container">
        <Link to="/home" className="logo">
          <img src={logoImage} alt="Logo" className="logo-icon" />
          GRAND LINE
        </Link>
      </div>

      <div
        className="login-container"
        style={{
          backgroundImage: `url(${loginBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="login-content">
          <h2 className="welcome-text">Good to see you again!</h2>
          <div className="login-box">
            <h2 className="login-title">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="form-input"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
              <div className="form-footer">
                <Link to="/register" className="form-link">
                  Don't have an account?
                </Link>
                <Link to="/forgot-password" className="form-link">
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
