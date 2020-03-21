import React from 'react';
import { HouseholdContextProvider } from '../context/HouseholdContext';
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
import Members from './Members';
import CreateChallenge from './CreateChallenge';
import TaskForm from './TaskForm';
import InviteMembers from './InviteMembers';
import PostChallenge from './PostChallenge';
import TaskDetailsPage from './TaskDetailsPage';
import JoinHousehold from './JoinHousehold';
import MemberWelcome from './MemberWelcome';

export default function Body() {
  return (
    <div className='body-container'>
      <Nav />
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
            <InviteMembers path='/invite-members' />
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
