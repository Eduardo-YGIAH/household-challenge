import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
  return (
    <div className='nav-container'>
      <div className='nav-container-links'>
        <div className='logo'>
          <Link to='/'>
            <img
              src='https://res.cloudinary.com/ygiah/image/upload/v1583849791/Household-Challenge/icon.png'
              alt='logo'
              className='logo-img'
            />
          </Link>
        </div>
        <div className='nav-link'>
          <Link to='/about'>About</Link>
        </div>
      </div>
    </div>
  );
}
