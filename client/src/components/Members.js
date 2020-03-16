import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { HouseholdContext } from '../context/HouseholdContext';
import { navigate } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import useDataFetcher from '../customHooks/useDataFetcher';

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
  });
  const { data, isLoading, error } = useDataFetcher('/api/household');
  if (!household) {
    setHousehold(data[0]);
  } else if (Object.keys(household).length <= 3) {
    setHousehold(data[0]);
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading members...</p>;
  }

  return (
    <div>
      <h1>Members</h1>
      <p>from household {household.title}</p>

      {/* {data.data.members.map(member => (
        <>
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </>
      ))} */}
    </div>
  );
}
