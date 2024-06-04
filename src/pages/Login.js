import React, { useState } from 'react';
import api from '../axiosConfig'; // Import the configured Axios instance
import './Login.css';
import logo from '../assets/images/logo.png';
import image1 from '../assets/images/cards.png';

const Login = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { phonenumber, password });
      console.log(response.data);
      setMessage('Login successful!');
      // Handle the successful login response (e.g., save the token, redirect)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Login failed. Please check your credentials and try again.');
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
          <img src={image1} alt="Class 2" className="full-width-image" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="phonenumber" className="right-aligned">شماره موبایل</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="091********"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
