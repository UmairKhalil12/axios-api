import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { IoHomeSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, userLogout } from '../../store/userSlice';

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(userLogout(false));
        dispatch(userInfo([]));
    };

    const userData = useSelector(state => state.user.userData);


    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>

            <div className='top-menu'>
                <div className="menu-icon-container" onClick={() => setOpen(!open)}>
                    {open ? <span>&#8592; Back</span> : <span>☰ </span>}
                </div>
            </div>

            <ul className="nav-links">
                <li onClick={() => navigate('/home')} >
                    {open ? <span onClick={() => navigate('/home')} > <IoHomeSharp size={20} /> Home</span> : <IoHomeSharp size={20} onClick={() => navigate('/home')} />}
                </li>

                <li onClick={() => navigate('/adddata')}>
                    {open ? <span onClick={() => navigate('/adddata')} > <IoMdAdd size={20} /> Add Task</span> : <IoMdAdd size={20} onClick={() => navigate('/adddata')} />}
                </li>

                <li onClick={() => navigate('/home')}>
                    {open ? <span onClick={() => navigate('/home')}> <FaUser size={20} /> {userData[0].Name} </span> : <FaUser size={20} onClick={() => navigate('/home')} />}
                </li>

                <li onClick={() => { handleSignout() }} >
                    {open ? <span onClick={() => { handleSignout() }} > <PiSignOutBold size={25} /> Sign Out</span> : <PiSignOutBold size={25} onClick={() => { handleSignout() }} />}
                </li>
            </ul>
        </div>
    );
};

const SideNav = () => {
    return (
        <div>
            <Sidebar />
        </div>
    );
};

export default SideNav;
