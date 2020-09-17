import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'
import { QuizGame } from './pages/QuizGame'
import { TagPreview } from './pages/TagPreview';
import './assets/styles/global.scss';

import { QuizDetails} from './pages/QuizDetails';
import { Navbar } from './cmps/Navbar';
import { QuizEdit } from './pages/QuizEdit';

function App() {
  return (
    <React.Fragment>

      <Navbar/>
    <div className="App main-container">
      <Switch>
        <Route component={ QuizGame } path='/game/:quizId'  />
        <Route component={ QuizEdit } path='/edit/:quizId?'  />
        <Route component={ QuizDetails } path='/quiz/:quizId' />
        <Route component={ TagPreview } path='/:tagId' />
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
    </React.Fragment>
  );
}

export default App;
