import React from 'react';
import './Register.scss';
import useFormValidation from '../customHooks/useSignUpForm';
import validateAuth from '../helperFunctions/validateAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
};

export default function Register() {
  const [user, setUser] = React.useContext(UserContext);
  const signup = () => {
    const payload = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
    };
    axios
      .post('/api/users', payload)
      .then(function(response) {
        console.log(response.data.user, response.data.token);
        const { user, token } = response.data;
        const isReturningUser = '_HC_user' in localStorage;
        if (!isReturningUser) {
          localStorage.setItem('_HC_user', JSON.stringify(user));
          localStorage.setItem('_HC_token', JSON.stringify(token));
        } else {
          localStorage.removeItem('_HC_user');
          localStorage.removeItem('_HC_token');
          localStorage.setItem('_HC_user', JSON.stringify(user));
          localStorage.setItem('_HC_token', JSON.stringify(token));
        }
        setUser(user);
        Link('/welcome');
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
