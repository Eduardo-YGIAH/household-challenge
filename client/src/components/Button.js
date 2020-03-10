import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

export default function Button({ btn }) {
  const style = () => {
    switch (btn.style) {
      case 'small-danger':
        return 'btn btn-danger btn-small';
      case 'danger':
        return 'btn btn-danger';
      case 'large-danger':
        return 'btn btn-large btn-danger';
      case 'small-secondary':
        return 'btn btn-small btn-secondary';
      case 'secondary':
        return 'btn btn-secondary';
      case 'large-secondary':
        return 'btn btn-secondary btn-large';
      case 'small':
        return 'btn btn-small';
      case 'large':
        return 'btn btn-large';
      default:
        return 'btn';
    }
  };
  return (
    <Link to={btn.link}>
      <button className={style()}>{btn.label}</button>
    </Link>
  );
}

//STYLES
//small-danger - 'btn btn-danger btn-small'
//danger - 'btn btn-danger'
//large-danger - "btn btn-large btn-danger"

//small-secondary - "btn btn-small btn-secondary"
//secondary - "btn btn-secondary"
//large-secondary - "btn btn-secondary btn-large"

//small - "btn btn-small"
//large - "btn btn-large"
//default - "btn"

//How to use the buton component:

//import React from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
//import './App.scss';
//import Button from './components/Button';

//function App() {
//  const btnData = {
//   label: 'Clear',
//    link: '#',
//    style: 'small-danger',
//  };
//  return (
//    <Router>
//      <Button btn={btnData} />
//    </Router>
//  );
//}

//export default App;
