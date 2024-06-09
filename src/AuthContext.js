import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? { token } : {};
  });

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('authToken', auth.token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
