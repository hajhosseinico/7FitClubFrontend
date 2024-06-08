import React from 'react';
import './SharedStyles.css';

const Layout = ({ children }) => {
  return (
    <div className="background-wrapper">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
