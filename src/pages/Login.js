// src/pages/Login.js
import React, { useState } from 'react';
import api from '../axiosConfig'; // Import the configured Axios instance
import './Login.css';
import logo from '../assets/images/logo.png';
import image1 from '../assets/images/cards.png';
import { login } from '../api';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(phone, password);
      localStorage.setItem('token', response.data.token);
      // Redirect to calendar page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="background-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Fitclub" className="logo" />
          <p>یک اشتراک برای تمامی کلاس ها</p>
        </div>
        <div className="login-cards">
          <img src={image1} alt="Class 2" className="card-image" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <label htmlFor="phone" className="right-aligned">شماره موبایل</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="091********"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="password" className="right-aligned">رمز عبور</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">ورود</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
