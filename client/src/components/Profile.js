import React, { useContext, useEffect } from 'react';
import * as auth from '../helperFunctions/auth';
import { UserContext } from '../App';
import { navigate } from '@reach/router';
import './Profile.scss';

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
    <div className='container'>
      <h1 className='heading'>Hello {user.name} This is your Profile Page</h1>
      <div className='profile'>
        <img
          src='https://res.cloudinary.com/ygiah/image/upload/v1579778125/Avatars/image_11.jpg'
          alt='user avatar'
          className='profile-avatar-image'
        />
      </div>
    </div>
  );
}
