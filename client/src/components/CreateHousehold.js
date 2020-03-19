import React, { useContext } from 'react';
// import { HouseholdContext } from '../context/HouseholdContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import useForm from '../customHooks/useForm';

export default function CreateHousehold() {
  const { user, setUser } = useContext(UserContext);
  // const { setHousehold } = useContext(HouseholdContext);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
    },
    onSubmit(values, errors) {
      if (errors) {
        console.log(errors);
      } else {
        const options = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const payload = {
          isOwner: [{ title: values.values.title, owner: user._id, challenges: [] }],
        };
        axios
          .post('/api/household', payload, options)
          .then(res => {
            console.log('Good', res.data.user);
            if (res.status === 201) {
              const token = res.data.token;
              const userObj = {
                isAuthenticated: true,
                ...res.data.user,
                token,
              };
              setUser(userObj);
              localStorage.setItem('userObj', JSON.stringify(userObj));
              // setHousehold(res.data.household);

              navigate('/members');
            } else {
              console.log('ERROR', res);
            }
          })
          .catch(err => {
            console.log(err);
          });
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
    if (!auth.isAuthenticated()) {
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
