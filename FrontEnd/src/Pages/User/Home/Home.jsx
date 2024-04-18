import React from 'react'
import './Home.css'
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../store/userSlice';

export default function Home() {
  const dispatch = useDispatch();
  const handleSignout = () => {
    // --- FOR LOCALSTORAGE -------- //

    // localStorage.setItem('user', 'false');
    // window.location.reload();

    // ---- FOR REDUX ---------- //
    dispatch(userLogout(false))    
  }
  return (
    <div className='main-home'>
      <div>
        <h1>Home page</h1>
        <button onClick={handleSignout} className='login-btn'>Signout</button>
      </div>
    </div>
  )
}
