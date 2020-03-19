import React from 'react';
import Button from './Button';
import './TaskDetailsCard.scss';

export default function TaskDetailsCard({ user, task }) {
  const { title, points, todos, description, status } = task;

  console.log(user);
  const btnNext = {
    label: user.isOwner[0] ? 'Edit Task' : 'Pick Task',
    link: '#',
    onclick: () => {},
    style: 'small-danger',
  };

  return (
    <div className='card__task'>
      <div className='card__task-body'>
        <div className='card__task-heading-container'>
          <h2 className='card__task-heading'>{title}</h2>
          <h3 className='card__task-points'>{points} Points</h3>
        </div>
        <h4 className='card__task-status'>{status}</h4>
        <ul className='card__task-todos'>
          {todos.map((todo, index) => (
            <li key={index} className='todo-item'>
              <label className='checkbox-container'>
                {todo}
                <input type='checkbox' checked='checked' readOnly />
                <span className='checkbox-checkmark'></span>
              </label>
            </li>
          ))}
        </ul>
        <p className='card__task-description'>{description}</p>
      </div>
      <Button btn={btnNext} />
    </div>
  );
}
