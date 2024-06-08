import { useState } from 'react';
import './Navbar.css';
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout, userInfo } from '../../store/userSlice';
import Button from '../Button/Button';

export default function Navbar() {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(userLogout(false));
        dispatch(userInfo([]));
    };

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    // useEffect(() => {
    //     const handleResize = () => {
    //         setToggleMenu(window.innerWidth <= 800);
    //     };

    //     handleResize();
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className={`navbar ${toggleMenu ? 'navbar-open' : ''}`}>
            <div className={`navbar-main ${toggleMenu ? 'navbar-main-open' : ''}`}>
                <div className="navbar-main-logo">
                    <h2 onClick={() => navigate('/home')}>BUSINESSES</h2>
                </div>
                {toggleMenu ? (
                    <div className="navbar-main-links">
                        <div>
                            {user && <p onClick={() => navigate('/home')}>Home</p>}
                            {user && <p onClick={() => navigate('/adddata')}>Add Data</p>}
                        </div>
                        {user && (
                            <div className="navbar-profile" onClick={() => navigate('/home')}>
                                <CgProfile size={30} className="profile-nav" />
                                <p className="navbar-profile-name">{userData[0].Name}</p>
                            </div>
                        )}
                        {!user && (
                            <div className="nav-signup-login-btn">
                                <Button onClick={() => navigate('/signup')} text="Signup" />
                                <Button onClick={() => navigate('/login')} text="Login" />
                            </div>
                        )}
                        {user ? <Button text="Signout" onClick={() => { handleSignout() }} /> : ""}
                    </div>
                ) : (
                    <div className='navbar-links'>
                        <div className="navbar-main-links-open">
                            {user && <p onClick={() => navigate('/home')}>Home</p>}
                            {user && <p onClick={() => navigate('/adddata')}>Add Data</p>}
                        </div>
                        <div>
                            {user && (
                                <div className="navbar-profile" onClick={() => navigate('/home')}>
                                    <CgProfile size={30} className="profile-nav" />
                                    <p className="navbar-profile-name">{userData[0].Name}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            {!user && (
                                <div className="nav-signup-login-btn-off">
                                    <Button onClick={() => navigate('/signup')} text="Signup" />
                                    <Button onClick={() => navigate('/login')} text="Login" />
                                </div>
                            )}
                        </div>
                        <div className='navbar-signout-btn'>
                            {user ? <Button text="Signout" onClick={() => { handleSignout() }} /> : ""}
                        </div>
                    </div>
                )
                }

                <div className="navbar-main-icon" onClick={handleToggleMenu}>
                    {toggleMenu ? <IoCloseSharp size={25} /> : <IoMdMenu size={25} />}
                </div>
            </div>
        </div>
    );
}
