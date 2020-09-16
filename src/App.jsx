import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'
import { QuizGame } from './pages/QuizGame'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={ QuizGame } path='/game/:quizId'  />
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
