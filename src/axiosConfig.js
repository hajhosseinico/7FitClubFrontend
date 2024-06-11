import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use the environment variable
  headers: {
    'Content-Type': 'application/json'
  }
});
export default api;
