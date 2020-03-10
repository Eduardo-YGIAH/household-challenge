import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './Main.scss';
import Button from '../components/Button';

export default function Main() {
  const btnData = {
    label: 'Sign Up',
    link: '#',
    style: '',
  };
  return (
    <div className='main-container'>
      <Router>
        <Button btn={btnData} />
      </Router>
    </div>
  );
}
