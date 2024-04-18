//import { useEffect, useState} from 'react';
import './App.css';
import Routing from './Routing/Routing'
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector(state => state.user);
  console.log('user app.js', user);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
