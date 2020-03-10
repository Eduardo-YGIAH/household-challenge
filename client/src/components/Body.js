import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './Body.scss';
import Nav from './Nav';
import Main from './Main';

export default function Body() {
  return (
    <div className='body-container'>
      <Router>
        <Nav />
        <Main />
      </Router>
    </div>
  );
}
