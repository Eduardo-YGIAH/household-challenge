import React from 'react';
import './App.scss';
import Body from './components/Body';
import { BrowserRouter as Router } from 'react-router-dom';

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const logOutCallback = async () => {};

  React.useEffect(() => {}, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className='background'>
        <Router id='router'>
          <Body />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
