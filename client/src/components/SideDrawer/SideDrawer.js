import React from 'react';
import { Link } from '@reach/router';
import './SideDrawer.scss';

export default function SideDrawer(props) {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
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
      </div>
    </nav>
  );
}
