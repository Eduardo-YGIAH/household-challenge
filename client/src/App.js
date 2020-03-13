import React from 'react';
import './App.scss';
import Body from './components/Body';
import * as auth from './helperFunctions/auth';

export const UserContext = React.createContext({ user: {}, setUser: () => {}, logout: () => {} });

function App() {
  const initialState = {
    isAuthenticated: false,
    name: null,
    email: null,
    token: null,
  };

  const [user, setUser] = React.useState(initialState);

  function onLogout() {
    auth.logout(); // FROM AUTH HELPERS
    setUser(initialState);
  }
  return (
    <div className='background'>
      <UserContext.Provider value={{ user, setUser, logout: onLogout }}>
        <Body value={{ user, setUser, logout: onLogout }} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
