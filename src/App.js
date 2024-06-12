import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import './fonts.css';
import AddCalendarRecord from './pages/AddCalendarRecord';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/add-calendar-record" element={<AddCalendarRecord />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
