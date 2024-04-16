import { useEffect} from 'react';
import './App.css';
import Routing from './Routing/Routing'


function App() {
  let user =  localStorage.setItem("user", false);
  useEffect(() => {
    localStorage.setItem("user", false);
  }, [user])
  
  console.log(localStorage.getItem('user'));


  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
