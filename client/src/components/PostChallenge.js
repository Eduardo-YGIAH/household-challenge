import React, { useEffect, useContext } from 'react';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import { UserContext } from '../context/UserContext';
import Button from './Button';
import './PostChallenge.scss';

export default function PostChallenge() {
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

  if (user.isAuthenticated) {
    if (!user.isOwner) {
      navigate('/welcome');
    }
    if (!user.isOwner[0]) {
      navigate('/create-household');
    }
    if (!user.isOwner[0].challenges[0]) {
      navigate('/create-challenge');
    }
    if (!user.isOwner[0].challenges[0].tasks[0]) {
      navigate('/TaskForm');
    }
    const path = user.isOwner[0].challenges[0];
    const startDate = path.startDate.substring(0, 10);
    const endDate = path.endDate.substring(0, 10);

    // const btnCalendar = {
    //   label: <i className='far fa-calendar-alt'> Edit</i>,
    //   link: '#',
    //   onclick: () => {},
    //   style: '',
    // };

    const btnTaskLink = {
      label: 'See Task',
      link: '/task-details',
      onclick: () => {},
      style: 'small-secondary',
    };

    const btnCreateMoreTask = {
      label: 'Create Another Task',
      link: '/create-task',
      onclick: () => {},
      style: 'secondary',
    };
    const btnPostChallenge = {
      label: 'PostChallenge',
      link: '#',
      onclick: () => {},
      style: 'large',
    };

    return (
      <div>
        <div className='spacer__vertical-10'></div>
        <h1>Post Challenge</h1>
        <div className='spacer__vertical'></div>
        <h3 className='sub-heading'>Chosen Dates</h3>
        <div className='line__seperator'></div>
        <div className='spacer__vertical-10'></div>
        <div className='spacer__vertical'></div>
        <h4 className='dates'>
          <div className='date-container'>
            <p>Start Date: {startDate}</p>
            <div className='spacer__vertical-10'></div>
            <p>End Date: {endDate}</p>
          </div>
          {/* <div className='spacer__vertical-10'></div>
          <Button btn={btnCalendar} /> */}
        </h4>
        <div className='spacer__vertical'></div>
        <h3>Tasks:</h3>
        <div className='line__seperator'></div>
        <div className='spacer__vertical-10'></div>
        <ul>
          {path.tasks.map(task => (
            <li key={task._id} className='list__item-task'>
              <p className='list__item-task-name'>{task.title}</p>
              <Button btn={btnTaskLink} />
            </li>
          ))}
        </ul>
        <div className='spacer__vertical'></div>
        <div className='line__seperator'></div>
        <div className='spacer__vertical-10'></div>
        <Button btn={btnCreateMoreTask} />
        <div className='spacer__vertical'></div>
        <Button btn={btnPostChallenge} />
      </div>
    );
  } else if (!user.isAuthenticated) {
    return (
      <div className='signup-form-container'>
        <div className='spacer__vertical'></div>
        <h3>Authenticating....</h3>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  }

  return (
    <div className='signup-form-container'>
      <div className='spacer__vertical'></div>
      <h3>
        Sorry! <br />
        There are some steps you need to complete before this.
      </h3>
    </div>
  );
}
