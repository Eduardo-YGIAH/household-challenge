import React, { useState } from 'react';
import { HouseholdContextProvider } from '../context/HouseholdContext';
import { Router } from '@reach/router';
import './Body.scss';
import Nav from './Nav';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop';
import Main from './Main';
import About from './About';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import Profile from './Profile';
import CreateHousehold from './CreateHousehold';
import Members from './Members';
import CreateChallenge from './CreateChallenge';
import TaskForm from './TaskForm';
import PostChallenge from './PostChallenge';
import TaskDetailsPage from './TaskDetailsPage';
import JoinHousehold from './JoinHousehold';
import MemberWelcome from './MemberWelcome';

export default function Body() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  // let sideDrawer;
  let backdrop;

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevState => !prevState.sideDrawerOpen);
  };

  const sideDrawerClose = () => {
    setSideDrawerOpen(false);
  };

  if (sideDrawerOpen) {
    // sideDrawer = <SideDrawer show={sideDrawerOpen} />;
    backdrop = <Backdrop click={sideDrawerClose} />;
  }
  return (
    <div className='body-container'>
      <Nav drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDrawerOpen} close={sideDrawerClose} />
      {backdrop}
      <HouseholdContextProvider>
        <div className='scroll'>
          <Router>
            <Main path='/' />
            <About path='/about' />
            <Register path='/register' />
            <Login path='/login' />
            <Welcome path='/welcome' />
            <Profile path='/profile' />
            <CreateHousehold path='/create-household' />
            <Members path='/members' />
            <CreateChallenge path='/create-challenge' />
            <TaskForm path='/create-task' />
            <PostChallenge path='/post-challenge' />
            <TaskDetailsPage path='/task-details' />
            <JoinHousehold path='/join-household' />
            <MemberWelcome path='/member-welcome' />
          </Router>
        </div>
      </HouseholdContextProvider>
    </div>
  );
}
