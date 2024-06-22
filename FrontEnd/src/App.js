//import { useEffect, useState} from 'react';
import { useEffect } from 'react';
import './App.css';
import Routing from './Routing/Routing'
import { useSelector } from 'react-redux';

function App() {

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
