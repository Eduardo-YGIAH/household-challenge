import React from 'react';
import './Login.scss';
import useLoginForm from '../customHooks/useLoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  const login = () => {
    alert(`User Authenticated!
        Email: ${inputs.email}`);
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
