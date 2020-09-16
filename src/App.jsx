import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'
import { QuizGame } from './pages/QuizGame'
import { TagPreview } from './pages/TagPreview';
import './assets/styles/global.scss';

import { QuizDetails} from './pages/QuizDetails';

function App() {
  return (
    <div className="App main-container">
      <Switch>
        <Route component={ QuizGame } path='/game/:quizId'  />
        <Route component={ TagPreview } path='/:tagId' />
        <Route component={ QuizDetails } path='/quiz/:quizId' />
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
