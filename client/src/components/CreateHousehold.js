import React, { useContext } from 'react';
import { HouseholdContext } from '../context/HouseholdContext';
// import { validate } from '../helperFunctions/validateHousehold';
import { UserContext } from '../App';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';

export default function CreateHousehold() {
  const { user, setUser } = useContext(UserContext);
  const { household, setHousehold } = useContext(HouseholdContext);
  // const [ errors, setErrors ] = useState([])
  // const [ isSubmitting, setSubmitting ] = false;

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    console.log('effect from Create Household', user);
  });

  function handleChange(event) {
    setHousehold({
      ...household,
      title: event.target.value,
    });
    // const validationErrors = validate(values);
    // setErrors(validationErrors);
    // const noErrors = Object.keys(errors).length === 0;
    // if (noErrors) {
    //   setSubmitting(false);
    // }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(user.token);
    const payload = {
      title: household.title,
    };
    console.log(payload);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    axios
      .post('/api/household', payload, config)
      .then(function(response) {
        console.log(response.data);
        if (response.status === 201) {
          setHousehold({ title: response.data.household });
          localStorage.setItem('household', JSON.stringify(household));
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className='signup-form-container'>
      <h1>Create a Household</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-form-group'>
          <label>Household Name</label>
          <input type='text' name='title' onChange={handleChange} value={household.title} required />
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
