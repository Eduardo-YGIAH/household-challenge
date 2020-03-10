import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Button from './components/Button';

function App() {
  const btnData = {
    label: 'Sign Up',
    link: '#',
    style: '',
  };
  return (
    <Router>
      <Button btn={btnData} />
    </Router>
  );
}

export default App;
