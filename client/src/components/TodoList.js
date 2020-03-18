import React from 'react';

export default function TodoList({ todos, deleteTodo }) {
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index.toString()} className='todo'>
            <div className='todo-container'>
              <p className='todo-description'>{todo}</p>
              <div
                className='icon-small'
                onClick={() => {
                  deleteTodo(index);
                }}
              >
                <i className='fas fa-trash-alt'></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
