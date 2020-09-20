import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { QuizApp } from './pages/QuizApp'
import { QuizGame } from './pages/QuizGame'
import { TagQuizzes } from './pages/TagQuizzes';
import './assets/styles/global.scss';
import { QuizDetails } from './pages/QuizDetails';
import { Navbar } from './cmps/Navbar';
import { LoginSignup } from './pages/LoginSignup';
import { QuizEdit } from './pages/QuizEdit';
import { Browse } from './pages/Browse';
import { Footer } from './cmps/Footer';
import { Notification } from './cmps/Notification';
function App() {
  return (
    <React.Fragment>

      <Navbar />
      <div className="App main-container">
        <Switch>
          <Route component={QuizGame} path='/game/:quizId' />
          <Route component={QuizEdit} path='/edit/:quizId?' />
          <Route component={QuizDetails} path='/quiz/:quizId' />
          <Route component={LoginSignup} path='/user' />
          <Route component={Browse} path='/browse' />
          <Route component={TagQuizzes} path='/:tag' />
          <Route component={QuizApp} path='/' />
        </Switch>
      </div>
      <Notification/>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
