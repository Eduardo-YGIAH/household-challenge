import React, { useContext } from 'react';
import './Login.scss';
import useLoginForm from '../customHooks/useLoginForm';
import { Link, navigate } from '@reach/router';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (user.isAuthenticated) {
      if (user.isOwner.length > 0) {
        navigate('/members');
      } else if (user.isMemberOf.length > 0) {
        navigate('/member-welcome');
      } else {
        navigate('/welcome');
      }
    }
  });

  const login = async () => {
    const result = await (
      await fetch('/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      })
    ).json();
    console.log(result);
    if (result.token) {
      const userObj = {
        isAuthenticated: true,
        _id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        token: result.token,
        avatar: result.user.avatar || '',
        isOwner: result.user.isOwner,
        isMemberOf: result.user.isMemberOf,
      };
      auth.updateUserStateAndStorage(setUser, userObj);
      if (user.isAuthenticated) {
        if (user.isOwner.length > 0) {
          navigate('/members');
        } else if (user.isMemberOf.length > 0) {
          navigate('/portfolio');
        } else {
          navigate('/welcome');
        }
      }
    } else {
      console.log(result.error);
    }
  };

  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(INITIAL_STATE, login);

  return (
    <div className='signup-form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-form-group'>
          <label>Email Address</label>
          <input type='email' name='email' onChange={handleInputChange} value={inputs.email} required />
        </div>
        <div className='signup-form-group'>
          <label>Password</label>
          <input type='password' name='password' onChange={handleInputChange} value={inputs.password} />
        </div>
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
      <div className='link'>
        <Link to='/register'>Sign Up instead</Link>
      </div>
    </div>
  );
}
