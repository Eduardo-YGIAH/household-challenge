import React, { useContext, useEffect } from 'react';
import TaskDetailsCard from './TaskDetailsCard';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import './TaskDetailsPage.scss';
import Button from './Button';

export default function TaskDetailsPage() {
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
    const challenges = user.isOwner[0].challenges;
    const challenge = user.isOwner[0].challenges[challenges.length - 1];
    const tasks = user.isOwner[0].challenges[0].tasks;
    const task = user.isOwner[0].challenges[0].tasks[tasks.length - 1];

    const btnCreateMore = {
      link: '/create-task',
      style: '',
      label: 'Create Another Task',
    };

    return (
      <div className='container__task-page'>
        <h1 className='heading'>Task Details</h1>
        <h2 className='sub-heading-task'>
          <span>{task.title}</span>
          <div>
            <span>{task.points}</span>
            <span>Points</span>
          </div>
        </h2>
        <h3 className='task-dates'>
          <span>Available from: {challenge.startDate.substring(0, 10)}</span>
          <span className='spacer__vertical-10'></span>
          <span>Expires: {challenge.endDate.substring(0, 10)}</span>
        </h3>
        <div className='spacer__vertical'></div>
        <TaskDetailsCard task={task} user={user} />
        <div className='spacer__vertical-10'></div>
        <Button btn={btnCreateMore} />
      </div>
    );
  }
  return (
    <div className='signup-form-container'>
      <div className='spacer__vertical'></div>
      <h3>Authenticating...</h3>
    </div>
  );
}
