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
import { BlackPage } from './cmps/BlackPage';
import { Dashboard } from './pages/Dashboard';
import { Room } from './pages/Room';

function App() {
  return (
    <React.Fragment>

      <Navbar />
        <Switch>
          <Route component={QuizGame} path='/game/:quizId/:onlineId?' />
          <Route component={LoginSignup} path='/user/:quizId?' />
          <Route component={QuizEdit} path='/edit/:quizId?' />
          <Route component={QuizDetails} path='/quiz/:quizId' />
          <Route component={Browse} path='/browse' />
          <Route component={Dashboard} path='/dashboard' />
          <Route component={TagQuizzes} path='/list/:tag/:sort?' />
          <Route component={Room} path='/room/:roomId' />
          <Route component={QuizApp} path='/' />
        </Switch>
      <Notification/>
      <Footer/>
      <BlackPage/>
    </React.Fragment>
  );
}

export default App;
