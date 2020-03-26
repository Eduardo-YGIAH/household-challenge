import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import MemberCard from './MemberCard';
import Button from './Button';
import './Members.scss';

export default function Members() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log('rendering useEffect on Members');
    function checkAuth() {
      if (!user.isAuthenticated && !auth.isAuthenticated()) {
        navigate('/login');
      }
      if (!user.isAuthenticated && auth.isAuthenticated()) {
        const persistUser = auth.isAuthenticated();
        setUser(prevUser => {
          return { ...prevUser, ...persistUser };
        });
      }
      if (user.isAuthenticated) {
        if (user.isMemberOf.length > 0) {
          navigate('/member-welcome');
        }
        if (user.isOwner.length === 0) {
          navigate('/create-household');
        }
      }
    }
    checkAuth();
  });

  const btnInvite = {
    label: 'Invite Member',
    link: '/invite-members',
    style: 'secondary',
  };

  const btnCreateChallenge = {
    label: 'Create Challenge',
    link: '/create-challenge',
    style: 'large',
  };

  if (user.isAuthenticated) {
    const i = user.isOwner.length - 1;
    const household = user.isOwner[i];
    const householdId = household._id;
    const url = `/api/household/members/list/${householdId}`;
    const householdName = household.title;
    const membersArr = user.isOwner[i].members;
    return (
      <div>
        <h1>Members</h1>
        <h2>{householdName}</h2>
        <div className='spacer__vertical'></div>
        <MemberCard members={membersArr} url={url} id={householdId} />
        <div className='line__seperator'></div>
        <div className='spacer__vertical'></div>
        <Button btn={btnInvite} />
        <div className='spacer__vertical'></div>
        <Button btn={btnCreateChallenge} />
      </div>
    );
  }
  return (
    <div>
      Loading...! <br /> Authenticating...!
    </div>
  );
}
