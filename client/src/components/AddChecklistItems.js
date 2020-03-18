import React, { useState } from 'react';

export default function AddChecklistItems({ saveTodo }) {
  const [item, setItem] = useState('');

  function handleChange(e) {
    setItem(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveTodo(item);
    setItem('');
  }

  return (
    <div>
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className='signup-form-group'>
          <label htmlFor='checklist_items'>Add checklist items</label>
          <input type='text' name='checklist_items' onChange={handleChange} value={item} required />
          <button type='submit' className='btn btn-small'>
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
