import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [household, setHousehold] = useState({
    title: '',
    author: '',
  });
  const [message, setMessage] = useState(null);

  const handleInputChange = event => {
    event.persist();
    setHousehold(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  const payload = household;
  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
      axios
        .post('/users/api/test', payload)
        .then(response => {
          console.log(response);
          setMessage(`${response.data.title} was saved with id of ${response.data._id}`);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {message !== null ? <div>{message}</div> : ''}
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>title</label>
          <input name='title' type='text' onChange={handleInputChange} />
          <label htmlFor='author'>author</label>
          <input name='author' id='author' type='text' onChange={handleInputChange} />
          <button type='submit'>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
