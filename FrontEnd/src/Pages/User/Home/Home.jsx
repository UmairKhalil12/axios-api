import React from 'react'

export default function Home() {
    const handleSignout = () =>{
        let userAuthenticated = localStorage.getItem('user');
        if(userAuthenticated){
            userAuthenticated = false;
            localStorage.setItem('user', userAuthenticated);
        }
    }
  return (
    <div>
      <h3>home page</h3>
      <button onClick={handleSignout}>Signout</button>
    </div>
  )
}
