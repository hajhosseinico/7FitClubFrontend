// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = (phone, password) => {
  return api.post('/auth/login', { phone, password });
};

export const getTrainers = (token) => {
  return api.get('/trainers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addTrainer = (token, trainerData) => {
  return api.post('/trainers', trainerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
