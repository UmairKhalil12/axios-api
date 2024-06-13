//import { useEffect, useState} from 'react';
import { useEffect } from 'react';
import './App.css';
import Routing from './Routing/Routing'
import { useSelector } from 'react-redux';

function App() {
  // const user = useSelector(state => state.user);
  // console.log('user app.js', user.user);

  // const userData = useSelector(state => state.user.userData);
  // console.log('userlogged data app.js', userData);

  //const businessData = useSelector(state => state.user.businessData);
  //console.log('homepage',businessData);

  const color = useSelector(state => state.user.color);

  useEffect(() => {
    document.body.className = color ? 'dark-mode' : 'light-mode';
  }, [color]);
  


  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
