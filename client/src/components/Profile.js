import React, { useContext, useEffect } from 'react';
import * as auth from '../helperFunctions/auth';
import { UserContext } from '../context/UserContext';
import { navigate } from '@reach/router';
import useFileUploader from '../customHooks/useFileUploader';
import axios from 'axios';
import './Profile.scss';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { inputHandler, submitHandler, imagePreview } = useFileUploader({
    initialValues: {
      avatar: '',
    },
    onSubmit(values, errors) {
      if (errors) {
        console.log(errors);
      } else {
        const fd = new FormData();
        fd.append('avatar', values.values.avatar.file);
        axios
          .patch('/api/users/me/avatar', fd, {
            headers: {
              'Content-Type': 'form-data',
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(res => {
            if (res.status === 200) {
              const avatar = res.data.avatar;
              setUser({ ...user, avatar });
            } else {
              console.log(res);
            }
          })
          .catch(console.log);
      }
    },
    validate(values) {
      const errors = {};
      if (values.avatar === '') {
        errors.title = 'Please select a file';
      }
      return errors;
    },
  });

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (user.isAuthenticated && auth.isAuthenticated()) {
      localStorage.setItem('userObj', JSON.stringify(user));
    }
  });

  return (
    <div className='container'>
      <h1 className='heading'>Hello {user.name} This is your Profile Page</h1>
      <div className='profile'>
        <img
          src={
            imagePreview.previewImgUrl
              ? imagePreview.previewImgUrl
              : user.avatar
              ? user.avatar
              : 'https://res.cloudinary.com/ygiah/image/upload/v1579778124/Avatars/image_5.jpg'
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
