import React, { useContext } from 'react';
import { Link } from '@reach/router';
import Button from '../Button';
import { UserContext } from '../../context/UserContext';
import './SideDrawer.scss';

export default function SideDrawer(props) {
  const { logout } = useContext(UserContext);
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  const btnLogout = {
    label: 'Logout',
    link: null,
    style: 'small-danger',
    onclick: logout,
  };
  return (
    <nav className={drawerClasses} onClick={props.close}>
      <div className='side-drawer-items'>
        <Link className='side-drawer-link' to='/'>
          Home
        </Link>
        <Link className='side-drawer-link' to='/about'>
          About
        </Link>
        <Link className='side-drawer-link' to='/signup'>
          Sign Up
        </Link>
        <Link className='side-drawer-link' to='/login'>
          Login
        </Link>
        <Link className='side-drawer-link' to='/welcome'>
          Welcome
        </Link>
        <Link className='side-drawer-link' to='/profile'>
          Profile
        </Link>
        <Link className='side-drawer-link' to='/create-household'>
          Create a Household
        </Link>
        <Link className='side-drawer-link' to='/members'>
          Household Members
        </Link>
        <Link className='side-drawer-link' to='/create-challenge'>
          Create a Challenge
        </Link>
        <Link className='side-drawer-link' to='/join-household'>
          Join a Household
        </Link>
        <Button btn={btnLogout} />
      </div>
    </nav>
  );
}
