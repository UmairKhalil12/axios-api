import { useEffect, useState } from 'react'
import './Navbar.css'
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout, userInfo } from '../../store/userSlice';

export default function Navbar() {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const user = useSelector(state => state.user.user);
    const userData = useSelector(state => state.user.userData);

    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(userLogout(false));
        dispatch(userInfo([]));
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 800) {
                setToggleMenu(true);
            } else {
                setToggleMenu(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className={toggleMenu ? 'navbar' : ''}>
                <div className={toggleMenu ? 'navbar-main-responsive' : 'navbar-main'}>
                    <div className={toggleMenu ? 'navbar-main-logo-responsive' : 'navbar-main-logo'}>
                        <h2>BLOGGG</h2>
                    </div>

                    <div className={toggleMenu ? 'navbar-main-link-responsive' : 'navbar-main-link'}>
                        <p onClick={() => navigate('/home')} >Home</p>
                        {/* <p onClick={() => navigate('/about')} >About</p> */}
                        {user ? <p onClick={() => navigate('/adddata')}>Add Data</p> : ''}
                    </div>

                    <div className={toggleMenu ? 'navbar-main-login-responsive' : 'navbar-main-login'}>
                        {user ?
                            (<>
                                <div className='navbar-profile'>
                                    <CgProfile size={30} className='profile-nav' />
                                    <p className='navbar-profile-name' >{userData[0].Name}</p>
                                </div>
                                <button onClick={handleSignout}>signout</button>
                            </>
                            ) :
                            <>
                                <div className='nav-signup-login-btn'>
                                    <button onClick={()=>navigate('/signup')}>Signup</button>
                                    <button onClick={()=>navigate('/login')} >Login</button>
                                </div>
                            </>}
                    </div>

                    <div className='navbar-main-icon' onClick={handleToggleMenu} >

                        {
                            toggleMenu ?
                                <div className='nav-icon'>
                                    <IoCloseSharp size={25} />
                                </div> :

                                <div>
                                    <IoMdMenu size={25} />
                                </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}