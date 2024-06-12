//import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Pages/Auth/Login/Login';
import Signup from '../Pages/Auth/Signup/Signup';
import Home from '../Pages/User/Home/Home';
import { useSelector } from 'react-redux';
import InsertData from "../Pages/User/InsertData/InsertData";
import { Navigate } from "react-router-dom";
import Business from "../Pages/User/Business/Business";
import AddStaff from "../Pages/User/AddStaff/AddStaff";
import AddItems from "../Pages/User/AddItems/AddItems";
import AddInvoice from "../Pages/User/AddInvoice/AddInvoice";
import ShowInvoice from "../Pages/User/ShowInvoice/ShowInvoice";

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
                {origUser.user ? (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/adddata' element={<InsertData />} />
                        <Route path='/updatedata/:id' element={<InsertData />} />
                        <Route path='/showBusiness/:id' element={<Business />} />
                        <Route path='/addStaff/:id' element={<AddStaff />} />
                        <Route path = '/editStaff/:id' element = {<AddStaff />} /> 
                        <Route path = '/addItems' element = {<AddItems />} /> 
                        <Route path = '/editItems/:id' element = {<AddItems />} />
                        <Route path = '/showInvoice' element = {<ShowInvoice />} />
                        <Route path ="/addInvoice" element = {<AddInvoice />} /> 
                        <Route path ="/editInvoice/:id" element = {<AddInvoice />} /> 

                    </>
                ) : (
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='*' element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
