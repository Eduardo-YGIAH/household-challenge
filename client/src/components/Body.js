import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Body.scss';
import Nav from './Nav';
import Main from './Main';
import About from './About';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';

export default function Body() {
  return (
    <div className='body-container'>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Main />} />
        <Route exact path='/about' render={() => <About />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/welcome' render={() => <Welcome />} />
      </Switch>
    </div>
  );
}
