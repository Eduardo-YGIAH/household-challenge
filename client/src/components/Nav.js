import React, { useContext } from 'react';
import { Link } from '@reach/router';
import './Nav.scss';
import { UserContext } from '../context/UserContext';
import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

export default function Nav(props) {
  const { user } = useContext(UserContext);
  React.useEffect(() => {
    return;
  }, [user]);

  if (user.isAuthenticated) {
    return (
      <div className='nav-container'>
        <div className='nav-container-links'>
          <div className='drawer-toggle-button__container'>
            <DrawerToggleButton click={props.drawerClickHandler} />
          </div>
          <div className='avatar'>
            <Link to='/profile'>
              <img
                src={
                  !user.avatar || user.avatar === ''
                    ? 'https://res.cloudinary.com/ygiah/image/upload/v1579778125/Avatars/image_11.jpg'
                    : user.avatar
                }
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
