import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';

export default function MemberWelcome() {
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
  });

  if (!user.isAuthenticated) {
    return (
      <div>
        <div className='spacer__vertical'></div>
        <div>Authenticating...</div>
      </div>
    );
  }

  if (user.isAuthenticated) {
    return (
      <div>
        <h1>{user.isMemberOf[0].title}</h1>
        <div className='spacer__vertical'></div>
        <h2>{user.name}</h2>
      </div>
    );
  }
}
