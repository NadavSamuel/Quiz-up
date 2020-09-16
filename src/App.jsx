import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
