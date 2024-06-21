import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import { IoHomeSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { colorInfo, userInfo, userLogout } from '../../store/userSlice';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { MdAssignmentAdd } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import LanguageSelector from '../Language/LanguageSelector';
import { useTranslation } from 'react-i18next';


const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const userData = useSelector(state => state.user.userData);
    const userType = userData.length > 0 ? userData[0].UserType : null;

    const color = useSelector(state => state.user.color);
    console.log(color);

    const changeColorMode = () => {
        dispatch(colorInfo(!color));
    }

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

    const { t } = useTranslation('sidenav');

    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>
            <div className='top-menu'>
                <div className="menu-icon-container" onClick={() => setOpen(!open)}>
                    {open ? <span>&#8592; {t("Back")}</span> : <span>☰ </span>}
                </div>
            </div>

            <ul className="nav-links">

                <li onClick={() => navigate('/home')}>
                    {open ? <p> <IoHomeSharp size={20} /> {t("Home")} </p> : <IoHomeSharp size={20} />}
                </li>
                <li onClick={handleAddDataClick}>
                    {open ? (
                        <p> <IoMdAdd size={20} /> {userType === 0 ? t('Add Business') : t('Add Items')}</p>
                    ) : (
                        <IoMdAdd size={20} />
                    )}
                </li>
                <li onClick={() => navigate('/home')}>
                    {open ? <p> <FaUser size={20} /> {userData[0].Name}</p> : <FaUser size={20} />}
                </li>


                {userType === 2 ?
                    <li onClick={() => navigate('/showInvoice')}>
                        {open ? <p> <FaFileInvoiceDollar size={20} /> {t("Show Invoice")} </p> : <FaFileInvoiceDollar size={20} />}
                    </li>
                    : ''
                }

                {userType === 2 ?
                    <li onClick={() => navigate('/addInvoice')}>
                        {open ? <p> <MdAssignmentAdd size={20} /> {t("Add Invoice")} </p> : <MdAssignmentAdd size={20} />}
                    </li>
                    : ''
                }

                {userType === 2 ?
                    <li onClick={() => navigate('/showTax')}>
                        {open ? <p> <TbZoomMoneyFilled size={20} /> {t("Show Taxes")} </p> : <TbZoomMoneyFilled size={20} />}
                    </li>
                    : ''
                }

                {userType === 2 ?
                    <li onClick={() => navigate('/addTax')}>
                        {open ? <p> <IoBagAdd size={20} /> {t("Add Taxes")} </p> : <IoBagAdd size={20} />}
                    </li>
                    : ''
                }

                {userType === 2 ?
                    <li onClick={() => navigate('/showTerms')}>
                        {open ? <p> <FaClipboardList size={20} /> {t("Show Terms")} </p> : <FaClipboardList size={20} />}
                    </li>
                    : ''
                }
                {userType === 2 ?
                    <li onClick={() => navigate('/addTerms')}>
                        {open ? <p> <MdAddTask size={20} /> {t("Add Terms")} </p> : <MdAddTask size={20} />}
                    </li>
                    : ''
                }


                <li onClick={handleSignout}>
                    {open ? <p> <PiSignOutBold size={25} /> {t("Sign Out")}</p> : <PiSignOutBold size={25} />}
                </li>

                {color ?
                    <li onClick={changeColorMode}>
                        {open ? <p> <MdDarkMode size={20} /> {t("Enable Light Mode")} </p> : <MdDarkMode size={20} />}
                    </li>
                    :
                    <li onClick={changeColorMode}>
                        {open ? <p> <MdOutlineDarkMode size={20} /> {t("Enable Dark Mode")} </p> : <MdOutlineDarkMode size={20} />}
                    </li>
                }

                <li >
                    {open ? <p> <LanguageSelector />  </p> : <LanguageSelector />}
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
