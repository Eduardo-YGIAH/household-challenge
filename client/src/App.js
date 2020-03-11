import React from 'react';
import './App.scss';
import Body from './components/Body';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className='background'>
      <Router>
        <Body />
      </Router>
    </div>
  );
}

export default App;
