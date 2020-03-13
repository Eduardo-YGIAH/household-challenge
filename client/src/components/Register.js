import React, { useContext } from 'react';
import './Register.scss';
import useFormValidation from '../customHooks/useSignUpForm';
import validateAuth from '../helperFunctions/validateAuth';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import Welcome from './Welcome';
import * as auth from '../helperFunctions/auth';
import { UserContext } from '../App';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
};

export default function Register() {
  const { user, setUser } = useContext(UserContext);

  const signup = () => {
    const payload = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
    };
    axios
      .post('/api/users', payload)
      .then(function(response) {
        console.log(response.data);
        if (response.status === 201) {
          const userObj = {
            isAuthenticated: true,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token,
          };
          auth.updateUserStateAndStorage(setUser, userObj);
        }
        user.isAuthenticated ? navigate('/welcome') : navigate('/login');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateAuth,
    signup,
  );

  if (user.isAuthenticated) {
    return <Welcome />;
  } else {
    return (
      <div className='signup-form-container'>
        <h1>Signup Page</h1>
        <form onSubmit={handleSubmit} className='signup-form'>
          <div className='signup-form-group'>
            <label>First Name</label>
            {errors.firstName && <p className='error-text'>{errors.firstName}</p>}
            <input
              className={errors.firstName && 'error-input'}
              type='text'
              name='firstName'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
            />
            <label>Last Name</label>
            {errors.lastName && <p className='error-text'>{errors.lastName}</p>}
            <input
              className={errors.lastName && 'error-input'}
              type='text'
              name='lastName'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />
          </div>
          <div className='signup-form-group'>
            <label>Email Address</label>
            {errors.email && <p className='error-text'>{errors.email}</p>}
            <input
              autoComplete='off'
              className={errors.email && 'error-input'}
              type='email'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
          </div>

          <div className='signup-form-group'>
            <label>Password</label>
            {errors.password && <p className='error-text'>{errors.password}</p>}
            <input
              type='password'
              name='password'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              autoComplete='off'
              className={errors.password && 'error-input'}
            />
          </div>

          <div className='signup-form-group'>
            <label>Re-enter Password</label>
            {errors.password2 && <p className='error-text'>{errors.password2}</p>}
            <input
              autoComplete='off'
              type='password'
              name='password2'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password2}
              className={errors.password2 && 'error-input'}
            />
          </div>
          <button disabled={isSubmitting} className='btn' type='submit'>
            Sign Up
          </button>
        </form>
        <div className='link'>
          <Link to='/login'>Login instead</Link>
        </div>
      </div>
    );
  }
}
