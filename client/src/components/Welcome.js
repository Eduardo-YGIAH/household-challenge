import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';
import './Welcome.scss';

export default function Welcome() {
  const { user, setUser, logout } = useContext(UserContext);
  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  const btnLogout = {
    label: 'Logout',
    link: null,
    style: 'danger',
    onclick: logout,
  };
  const btnJoinHousehold = {
    label: 'Join',
    link: '/join-household',
    style: '',
    onclick: null,
  };
  const btnCreateHousehold = {
    label: 'Create',
    link: '/create-household',
    style: '',
    onclick: null,
  };

  return (
    <div className='container'>
      <h1 className='heading'>What would you like to do {user.name}?</h1>
      <h3 className='heading'>Join an existing Household or create a new one?</h3>
      <div className='landing-callToAction'>
        <Button btn={btnJoinHousehold} />
        <div className='landing-btn-spacer'></div>
        <Button btn={btnCreateHousehold} />
      </div>
      <Button btn={btnLogout} />
    </div>
  );
}
