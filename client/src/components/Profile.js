import React, { useContext, useEffect } from 'react';
import * as auth from '../helperFunctions/auth';
import { UserContext } from '../App';
import { navigate } from '@reach/router';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    console.log('effect from Profile', user);
  });

  return (
    <div>
      <h1>Hello {user.name} This is your Profile Page</h1>
    </div>
  );
}
