import axios from 'axios';

const baseURL = window.location.hostname === '7fitclub.com' || window.location.hostname === 'www.7fitclub.com' 
  ? process.env.REACT_APP_API_URL 
  : process.env.REACT_APP_API_URL_IP;

const api = axios.create({
  baseURL: baseURL, // Use the correct base URL based on the hostname
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
