import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { IoHomeSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, userLogout } from '../../store/userSlice';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const userData = useSelector(state => state.user.userData);
    const userType = userData.length > 0 ? userData[0].UserType : null;

    const handleSignout = () => {
        dispatch(userLogout(false));
        dispatch(userInfo([]));
    };

    const handleAddDataClick = () => {
        if (userType === 0) {
            navigate('/addData');
        } else {
            navigate('/addItems');
        }
    };

    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>
            <div className='top-menu'>
                <div className="menu-icon-container" onClick={() => setOpen(!open)}>
                    {open ? <span>&#8592; Back</span> : <span>☰ </span>}
                </div>
            </div>

            <ul className="nav-links">
                <li onClick={() => navigate('/home')}>
                    {open ? <span> <IoHomeSharp size={20} /> Home</span> : <IoHomeSharp size={20} />}
                </li>
                <li onClick={handleAddDataClick}>
                    {open ? (
                        <span> <IoMdAdd size={20} /> {userType === 0 ? 'Add Business' : 'Add Items'}</span>
                    ) : (
                        <IoMdAdd size={20} />
                    )}
                </li>
                <li onClick={() => navigate('/home')}>
                    {open ? <span> <FaUser size={20} /> {userData[0].Name}</span> : <FaUser size={20} />}
                </li>


                {userType === 2 ?
                    <li onClick={() => navigate('/showInvoice')}>
                        {open ? <span> <FaFileInvoiceDollar size={20} /> Show Invoice </span> : <FaFileInvoiceDollar size={20} />}
                    </li>
                    : ''
                }

                {userType === 2 ?
                    <li onClick={() => navigate('/addInvoice')}>
                        {open ? <span> <IoBagAdd size={20} /> Add Invoice </span> : <IoBagAdd size={20} />}
                    </li>
                    : ''
                }

                <li onClick={handleSignout}>
                    {open ? <span> <PiSignOutBold size={25} /> Sign Out</span> : <PiSignOutBold size={25} />}
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
