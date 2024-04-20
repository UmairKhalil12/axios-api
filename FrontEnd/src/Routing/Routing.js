//import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Pages/Auth/Login/Login';
import Signup from '../Pages/Auth/Signup/Signup';
import Home from '../Pages/User/Home/Home';
import { useSelector } from 'react-redux';
import InsertData from "../Pages/User/InsertData/InsertData";

export default function Routing() {
    const origUser = useSelector(state => state.user);

    // const [user, setUser] = useState();
    // const [origUser, setOrigUser] = useState();

    // useEffect(() => {
    //     const userAuthenticated = localStorage.getItem("user");
    //     setUser(userAuthenticated);

    //     if (user === 'true') {
    //         setOrigUser(true);
    //     }
    //     else {
    //         setOrigUser(false);
    //     }

    // }, [user])

    // console.log('user routing', user);


    return (
        <BrowserRouter>
            <Routes>
                {origUser.user ? <Route path='/' element={<Home />} /> : <Route path='/' element={<Login />} />}
                {origUser.user ? <Route path='/home' element={<Home />} /> : <Route path='/home' element={<Login />} />}
                {origUser.user ? <Route path='/login' element={<Home />} /> : <Route path='/login' element={<Login />} />}
                {origUser.user ? <Route path='/signup' element={<Home />} /> : <Route path='/signup' element={<Signup />} />}
                {origUser.user ? <Route path='/adddata' element={<InsertData />} /> : <Route path='/adddata' element={<Login />} />}
                {origUser.user ? <Route path='/updatedata/:id' element={<InsertData/>} /> : <Route path='/adddata' element={<Login />} />}

            </Routes>
        </BrowserRouter>
    );
}
