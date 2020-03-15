import React, { useEffect, useContext } from 'react';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import DateRangeSelector from './DateRangeSelector';

export default function CreateChallenge() {
  const { user, setUser } = useContext(UserContext);
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
    label: 'Create Challenge',
    link: '#',
    onclick: () => {},
    style: 'large',
  };
  const btnCreateTask = {
    label: 'Create Task',
    link: '#',
    onclick: () => {},
    style: 'btn',
  };

  return (
    <div className='container'>
      <h1>Create a Challenge</h1>
      <h3>Set Up the Start and End Date</h3>
      <DateRangeSelector />
      <h2 className='sub-heading'>Tasks:</h2>
      <Button btn={btnCreateTask} />
      <Button btn={btnCreateChallenge} />
    </div>
  );
}
