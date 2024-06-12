import React, { createContext, useState, useEffect } from 'react';
import api from './axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('authToken');
    console.log("Initial token from localStorage:", token);
    return token ? { token, userType: localStorage.getItem('userType') } : {};
  });

  useEffect(() => {
    console.log('Auth state on mount:', auth);

    const fetchUserData = async () => {
      if (auth.token && !auth.userType) {
        try {
          console.log("Fetching user data with token:", auth.token);
          const response = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          const { userType } = response.data;
          setAuth((prev) => ({ ...prev, userType }));
          localStorage.setItem('userType', userType);
          console.log("Fetched user data - UserType:", userType);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();

    if (auth.token) {
      localStorage.setItem('authToken', auth.token);
      console.log('Token set in localStorage:', localStorage.getItem('authToken'));
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      console.log('Token removed from localStorage');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {auth.userType ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthContext;
