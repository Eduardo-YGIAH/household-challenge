import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import MemberCard from './MemberCard';
import Button from './Button';
import './Members.scss';
// import Axios from 'axios';

export default function Members() {
  const { user, setUser } = useContext(UserContext);
  const userLocal = JSON.parse(localStorage.getItem('userObj'));
  const token = userLocal.token;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (user.isAuthenticated) {
      function getMembersData() {
        const id = user.isOwner[0]._id;
        fetch
          .get(`/api/household/members/list/${id}`, options)
          .then(res => res.json())
          .then(res => console.log(res));
      }
      getMembersData();
    }
  });

  const btnInvite = {
    label: 'Invite Member',
    link: '#',
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
    if (!user.isOwner) {
      navigate('/welcome');
    }
    if (!user.isOwner[0]) {
      navigate('/create-household');
    }
    if (user.isOwner.length > 0) {
      const i = user.isOwner.length - 1;
      const household = user.isOwner[i];
      const householdName = household.title;
      const membersArr = user.isOwner[i].members;
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
      const membersArr = user.isMemberOf[i].members;
      return (
        <div>
          <h1>Members</h1>
          <p>{householdName}</p>
          {membersArr.map(member => (
            <MemberCard key={membersArr.indexOf(member)} name={member.name} email={member.email} />
          ))}
        </div>
      );
    }
  } else {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  }
  return (
    <div>
      Loading...! <br /> Authenticating...!
    </div>
  );
}
