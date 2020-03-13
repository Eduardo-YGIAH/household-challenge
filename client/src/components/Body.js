import React from 'react';
import { Router } from '@reach/router';
import './Body.scss';
import Nav from './Nav';
import Main from './Main';
import About from './About';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import Profile from './Profile';
import CreateHousehold from './CreateHousehold';
import { UserContext } from '../App';
import { HouseholdContextProvider } from '../context/HouseholdContext';

export default function Body({ value }) {
  return (
    <div className='body-container'>
      <Nav />
      <UserContext.Provider value={value}>
        <HouseholdContextProvider>
          <Router>
            <Main path='/' />
            <About path='/about' />
            <Register path='/register' />
            <Login path='/login' />
            <Welcome path='/welcome' />
            <Profile path='/profile' />
            <CreateHousehold path='/create-household' />
          </Router>
        </HouseholdContextProvider>
      </UserContext.Provider>
    </div>
  );
}
