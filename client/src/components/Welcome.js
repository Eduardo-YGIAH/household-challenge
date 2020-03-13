import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import Button from './Button';
import { UserContext } from '../App';
import * as auth from '../helperFunctions/auth';

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
    console.log('effect from Welcome', user);
  });

  const btnLogout = {
    label: 'Logout',
    link: null,
    style: 'danger',
    onclick: logout,
  };

  return (
    <div>
      <h1>What would you like to do {user.name}?</h1>
      <Button btn={btnLogout} />
    </div>
  );
}
