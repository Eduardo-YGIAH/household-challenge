import React, { useContext } from 'react';
import { HouseholdContext } from '../context/HouseholdContext';
import { UserContext } from '../context/UserContext';
import axios from '../helperFunctions/axios.config';
import { Link, navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import useForm from '../customHooks/useForm';

export default function CreateHousehold() {
  const { user, setUser } = useContext(UserContext);
  const { setHousehold } = useContext(HouseholdContext);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      avatar: '',
    },
    onSubmit(values, errors) {
      if (errors) {
        console.log(errors);
      } else {
        axios
          .post('/api/household', { title: values.values.title })
          .then(res => {
            if (res.status === 201) {
              setHousehold(res.data.household);
              navigate('/members');
            } else {
              console.log(res);
            }
          })
          .catch(console.log);
      }
    },
    validate(values) {
      const errors = {};
      if (values.title === '') {
        errors.title = 'Please enter a name';
      }
      return errors;
    },
  });

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  return (
    <div className='signup-form-container'>
      <h1>Create a Household</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-form-group'>
          <label htmlFor='title'>Household Name</label>
          <input type='text' name='title' onChange={handleChange} value={values.title} required />
        </div>
        <button className='btn' type='submit'>
          Create
        </button>
      </form>
      <div className='link'>
        <Link to='../'>Cancel</Link>
      </div>
    </div>
  );
}
