import React, { useContext, useEffect, useState } from 'react';
import * as auth from '../helperFunctions/auth';
import { UserContext } from '../context/UserContext';
import { navigate } from '@reach/router';
import './Profile.scss';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  function generatePreviewImgUrl(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = e => callback(reader.result);
  }

  function inputHandler(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    generatePreviewImgUrl(file, previewImgUrl => {
      setAvatar({ previewImgUrl });
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    return;
  }

  return (
    <div className='container'>
      <h1 className='heading'>Hello {user.name} This is your Profile Page</h1>
      <div className='profile'>
        <img
          src={
            avatar === ''
              ? 'https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_5.jpg'
              : avatar.previewImgUrl
          }
          alt='user avatar'
          className='profile-avatar-image'
        />
        <div style={{ height: '20px', width: '100%' }}></div>
        <div className='form-uploader-container'>
          <form onSubmit={submitHandler} className='form-uploader'>
            <label htmlFor='avatar' className='btn btn-large btn-secondary'>
              Select your Profile image
            </label>
            <div style={{ height: '20px', width: '100%' }}></div>
            <input
              name='avatar'
              id='avatar'
              type='file'
              onChange={inputHandler}
              style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', width: '1px', height: '1px' }}
            />
            <div style={{ height: '20px', width: '100%' }}></div>
            <button className='btn'>Save Avatar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
