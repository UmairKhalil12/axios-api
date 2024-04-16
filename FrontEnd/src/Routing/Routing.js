import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../Pages/Auth/Login/Login';
import Signup from '../Pages/Auth/Signup/Signup';
import Home from '../Pages/User/Home/Home';

export default function Routing() {
   
    const user = localStorage.getItem('user') === 'true';
    console.log('routing user', user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
                <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
                <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
