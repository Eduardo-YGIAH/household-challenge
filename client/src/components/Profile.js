import React from 'react';
import { isAuthenticated } from '../helperFunctions/auth';
import { Redirect } from '@reach/router';

export default function Profile() {
  const user = isAuthenticated();
  if (user) {
    return (
      <div>
        <h1>Hello {user.name} This is your Profile Page</h1>
      </div>
    );
  } else {
    return <Redirect from='' to='/login' noThrow />;
  }
}
