import React from 'react';
import './Main.scss';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';

export default function Main() {
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!auth.isAuthenticated()) {
      return;
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  const btnRegister = {
    label: 'Sign Up',
    link: '/register',
    style: '',
  };
  const btnLogin = {
    label: 'Login',
    link: '/login',
    style: 'secondary',
  };

  const btnChallenge = {
    label: 'Current Challenge',
    link: '/current-challenge',
    style: 'large',
  };

  const loggedInCallToAction = <Button btn={btnChallenge} />;

  const loggedOutCallToAction = (
    <>
      <Button btn={btnRegister} />
      <div className='landing-btn-spacer'></div>
      <Button btn={btnLogin} />
    </>
  );

  return (
    <div className='main-container'>
      <h1 className='landing-heading'>
        Welcome
        <br />
        to the
        <br />
        Household Challenge
      </h1>
      <div className='landing-callToAction'>{user.isAuthenticated ? loggedInCallToAction : loggedOutCallToAction}</div>
    </div>
  );
}
