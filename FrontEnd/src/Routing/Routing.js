import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Pages/Auth/Login/Login';
import Signup from '../Pages/Auth/Signup/Signup';

//react-router-dom install karna

export default function routing() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
