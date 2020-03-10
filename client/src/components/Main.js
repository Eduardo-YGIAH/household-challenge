import React from 'react';
import './Main.scss';
import Button from './Button';

export default function Main() {
  const btnRegister = {
    label: 'Sign Up',
    link: '#',
    style: '',
  };
  const btnLogin = {
    label: 'Login',
    link: '#',
    style: 'secondary',
  };
  return (
    <div className='main-container'>
      <h1 className='landing-heading'>
        Welcome
        <br />
        to the
        <br />
        Household Challenge
      </h1>
      <div className='landing-callToAction'>
        <Button btn={btnRegister} />
        <div className='landing-btn-spacer'></div>
        <Button btn={btnLogin} />
      </div>
    </div>
  );
}
