// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Trainers from './pages/Trainers';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/trainers" component={Trainers} />
      </Switch>
    </Router>
  );
}

export default App;
