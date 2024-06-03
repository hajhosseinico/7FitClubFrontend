// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../assets/images/logo.png';
import image1 from '../assets/images/cards.png';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://your-ec2-public-ip:3000/auth/login', {
                phone,
                password,
            });
            console.log(response.data); // Handle the response as needed
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="background-wrapper">
            <div className="login-container">
                <img src={logo} alt="Fitclub" className="logo" />
                <img src={image1} alt="Class 1" className="full-width-image" />
                <div className="login-header">
                    <p>یک اشتراک برای تمامی کلاس ها</p>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
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
                    
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-button">ورود</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
