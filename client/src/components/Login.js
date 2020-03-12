import React from 'react';
import './Login.scss';
import useLoginForm from '../customHooks/useLoginForm';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Welcome from './Welcome';

export default function Login() {
  const [user, setUser] = React.useContext(UserContext);
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
    console.log(result);
    if (result.token) {
      setUser({
        name: result.user.name,
        email: result.user.email,
      });
      const isReturningUser = '_HC_user' in localStorage;
      if (isReturningUser) {
        localStorage.removeItem('_HC_user');
      }
      const localUser = localStorage.setItem('_HC_user', JSON.stringify(user));
      console.log('Saved now to Local storage:' + localUser);
    } else {
      console.log(result.error);
    }
  };

  React.useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem('_HC_user'));
    console.log('User from UseContext:' + user, 'Got from LocalStorage:' + savedUserData);
  }, [user]);

  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(INITIAL_STATE, login);
  if (user) {
    return <Welcome />;
  } else {
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
}
