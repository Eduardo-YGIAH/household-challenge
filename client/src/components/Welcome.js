import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App';

export default function Welcome() {
  const [user, setUser] = React.useContext(UserContext);
  React.useEffect(() => {
    const isReturningUser = '_HC_user' in localStorage;
    const savedUserData = JSON.parse(localStorage.getItem('_HC_user'));
    if (!isReturningUser) {
      return <Redirect from='' to='/login' noThrow />;
    } else {
      setUser(savedUserData);
    }
  }, []);
  return (
    <div>
      <h1>What would you like to do {user.name}?</h1>
    </div>
  );
}
