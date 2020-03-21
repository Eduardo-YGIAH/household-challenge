import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import MemberCard from './MemberCard';
import Button from './Button';
import './Members.scss';

export default function Members() {
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });

  const btnInvite = {
    label: 'Invite Member',
    link: '/invite-members',
    onclick: () => {},
    style: 'secondary',
  };

  const btnCreateChallenge = {
    label: 'Create Challenge',
    link: '/create-challenge',
    onclick: () => {},
    style: 'large',
  };

  if (user.isAuthenticated) {
    console.log(user);
    if (user.isOwner.length > 0) {
      const i = user.isOwner.length - 1;
      const household = user.isOwner[i];
      const householdName = household.title;
      const membersArr = user.isOwner[0].members;
      return (
        <div>
          <h1>Members</h1>
          <p>{householdName}</p>
          {membersArr.map(member => (
            <MemberCard key={membersArr.indexOf(member)} name={member.name} email={member.email} />
          ))}
          <div className='line__seperator'></div>
          <div className='spacer__vertical'></div>
          <Button btn={btnInvite} />
          <div className='spacer__vertical'></div>
          <Button btn={btnCreateChallenge} />
        </div>
      );
    } else if (user.isMemberOf.length > 0) {
      const i = user.isMemberOf.length - 1;
      const household = user.isMemberOf[i];
      const householdName = household.title;
      const membersArr = household.members;
      return (
        <div>
          <h1>Members</h1>
          <p>{householdName}</p>

          {membersArr.map(member => (
            <>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </>
          ))}
        </div>
      );
    } else {
      setTimeout(() => {
        navigate('/welcome');
      }, 4000);
    }
  }
  return <div>You are not authenticated</div>;
}
