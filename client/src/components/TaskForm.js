import React, { useState, useContext } from 'react';
import './TaskForm.scss';
import AddChecklistItems from './AddChecklistItems';
import TodoList from './TodoList';
import useForm from '../customHooks/useForm';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';

export default function TaskForm() {
  const { user, setUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      description: '',
      points: '',
    },
    onSubmit(values, errors) {
      if (errors) {
        alert(JSON.stringify({ values, errors }, null, 2));
      } else {
        const options = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const payload = {
          todos: todos,
          title: values.values.title,
          description: values.values.description,
          points: Number(values.values.points),
        };
        axios
          .post('/api/task', payload, options)
          .then(res => {
            if (res.status === 201) {
              console.log('USER', res.data.user);
              const token = res.data.token;
              const userObj = {
                isAuthenticated: true,
                ...res.data.user,
                token,
              };
              setUser(userObj);
              localStorage.setItem('userObj', JSON.stringify(userObj));

              navigate('/about');
            } else {
              console.log('ERROR', res);
            }
          })
          .catch(err => {
            console.log('FROM FORM', err);
          });
      }
    },
    validate(values) {
      const errors = {};
      if (values.title === '') {
        errors.title = 'Please enter a name for this task';
      }
      if (values.description === '') {
        errors.description = 'Please enter a description';
      }
      if (values.points === '') {
        errors.points = 'Please a points value from 1 - 20';
      }
      if (values.points < 1 || values.points > 20) {
        errors.points = 'Points must be between 1 and 20';
      }
      return errors;
    },
  });

  const deleteTodo = todoIndex => {
    const newTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(newTodos);
  };
  if (user.isAuthenticated) {
    return (
      <div className='signup-form-container'>
        <h1 className='heading'>Create a Task</h1>
        <div>
          <AddChecklistItems
            saveTodo={todoText => {
              const trimmedText = todoText.trim();
              if (trimmedText.length > 0) {
                setTodos([...todos, trimmedText]);
              }
            }}
          />
          <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
        <div className='spacer__vertical'></div>
        <h3 className='sub-heading no-margin'>Now add a Name and Description</h3>
        <form onSubmit={handleSubmit} className='signup-form'>
          <div className='signup-form-group'>
            <label htmlFor='title'>Task Name</label>
            <input type='text' name='title' onChange={handleChange} value={values.title} required />
          </div>
          <div className='signup-form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              rows='4'
              cols='50'
              className='task-description'
              name='description'
              onChange={handleChange}
              value={values.description}
              required
            />
          </div>
          <div className='signup-form-group'>
            <label htmlFor='points'>Task Points 1 - 20</label>
            <input
              type='number'
              min='1'
              max='20'
              name='points'
              onChange={handleChange}
              value={values.points}
              required
            />
          </div>
          <button className='btn' type='submit'>
            Create Task
          </button>
        </form>
        <div className='link'>
          <Link to='../'>Cancel</Link>
        </div>
      </div>
    );
  }
  return <h2 className='sub-heading'>Authenticating...</h2>;
}
