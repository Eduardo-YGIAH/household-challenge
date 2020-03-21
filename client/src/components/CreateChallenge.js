import React, { useEffect, useContext, useState } from 'react';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import DateRangeSelector from './DateRangeSelector';
import Axios from 'axios';

export default function CreateChallenge() {
  const { user, setUser } = useContext(UserContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  const btnCreateChallenge = {
    label: 'Create Challenge And Add Tasks',

    onclick: () => {
      if (state[0].startDate < Date.now()) {
        let errors = {};
        errors.past = "You can't set a challenge to be in the past";
        alert(errors.past);
        errors = {};
        return;
      }
      const options = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { startDate, endDate } = state[0];
      const payload = {
        startDate,
        endDate,
      };

      Axios.post('/api/challenge', payload, options)
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

            navigate('/create-task');
          } else {
            console.log('ERROR', res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    style: 'large',
  };

  return (
    <div className='container'>
      <h1>Create a Challenge</h1>
      <h3>Set Up the Start and End Date</h3>
      <DateRangeSelector state={state} setState={setState} />
      <Button btn={btnCreateChallenge} />
    </div>
  );
}
