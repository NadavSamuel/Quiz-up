import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'
import { QuizDetails } from './pages/QuizDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={ QuizDetails } path='/quiz/:quizId' />
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
