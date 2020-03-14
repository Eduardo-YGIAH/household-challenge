import React, { useState, createContext } from 'react';
import * as auth from '../helperFunctions/auth';

const UserContext = createContext({ user: {}, setUser: () => {}, logout: () => {} });

const UserContextProvider = props => {
  const initialState = {
    isAuthenticated: false,
    _id: null,
    name: null,
    email: null,
    token: null,
  };

  function onLogout() {
    auth.logout(); // FROM AUTH HELPERS
    setUser(initialState);
  }

  const [user, setUser] = useState(initialState);
  const value = { user, setUser, logout: onLogout };
  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };
