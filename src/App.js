import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Login from './pages/Login';
import Calendar from './pages/Calendar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
