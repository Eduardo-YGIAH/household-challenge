import React, { useContext } from 'react';
import './Login.scss';
import useLoginForm from '../customHooks/useLoginForm';
import { Link, navigate } from '@reach/router';
import { UserContext } from '../App';
import * as auth from '../helperFunctions/auth';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (user.isAuthenticated) {
      navigate('/welcome');
    }
    console.log(user);
  });

  const login = async () => {
    console.log('Got here');

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
    console.log(result.token);
    if (result.token) {
      const userObj = {
        isAuthenticated: true,
        name: result.user.name,
        email: result.user.email,
        token: result.token,
      };
      auth.updateUserStateAndStorage(setUser, userObj);
      navigate('/welcome');
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
