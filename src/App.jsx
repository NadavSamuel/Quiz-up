import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { QuizApp } from './pages/QuizApp'
import { TagPreview } from './pages/TagPreview';
import './assets/styles/global.scss';


function App() {
  return (
    <div className="App main-container">
      <Switch>
        <Route component={ TagPreview } path='/:tagId' />
        <Route component={ QuizApp } path='/' />
      </Switch>
    </div>
  );
}

export default App;
