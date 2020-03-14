import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { HouseholdContext } from '../context/HouseholdContext';
import { navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';

export default function Members() {
  const { user, setUser } = useContext(UserContext);
  const { household, setHousehold } = useContext(HouseholdContext);

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (household.owner === '') {
      console.log('NEEDS A DATA FETCHER');
      setHousehold({
        ...household,
        title: 'A dummy title',
        owner: 'this guy',
      });
    }
  });
  return (
    <div>
      <h1>Members</h1>
      <p>from household {household.title}</p>
    </div>
  );
}
