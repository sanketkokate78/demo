import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Theme.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



const App = () => {
  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
};

export default App;
