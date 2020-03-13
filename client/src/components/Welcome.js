import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import Button from './Button';
import { UserContext } from '../App';

export default function Welcome() {
  const { user, logout } = useContext(UserContext);
  React.useEffect(() => {
    console.log('re-render NAV with useEffect from Welcome', user);
  }, [user]);

  const btnLogout = {
    label: 'Logout',
    link: null,
    style: 'danger',
    onclick: logout,
  };

  if (!user.isAuthenticated) {
    return <Redirect from='/welcome' to='/login' noThrow />;
  }
  return (
    <div>
      <h1>What would you like to do {user.name}?</h1>
      <Button btn={btnLogout} />
    </div>
  );
}
