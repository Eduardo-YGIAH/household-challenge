import React, { useContext } from 'react';
import { Link } from '@reach/router';
import './Nav.scss';
import { UserContext } from '../App';

export default function Nav() {
  const { user } = useContext(UserContext);
  React.useEffect(() => {
    console.log('re-render NAV with useEffect', user);
  }, [user]);

  if (user.isAuthenticated) {
    return (
      <div className='nav-container'>
        <div className='nav-container-links'>
          <div className='burger'>
            <div className='burger-line1'></div>
            <div className='burger-line2'></div>
            <div className='burger-line3'></div>
          </div>
          <div className='avatar'>
            <Link to='/profile'>
              <img
                src='https://res.cloudinary.com/ygiah/image/upload/v1579778125/Avatars/image_11.jpg'
                alt='user avatar'
                className='avatar-image'
              />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
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
}
