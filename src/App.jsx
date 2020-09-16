import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { CarApp } from './pages/CarApp'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={ CarApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
