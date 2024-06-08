import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { GET_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useDispatch } from 'react-redux';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import FormButton from '../../../Components/FormButton/FormButton';
import user_img from '../../../images/user-icon.png'

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();
        if (email !== '' && pass !== '') {
            if (emailValidation(email)) {
                await GET_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/AdminLogin?Email=${email}&Password=${pass}`, dispatch)
                    .then(() => {
                        navigate('/home');
                    })
            }
            else {
                window.alert('email is not correct');
            }
        }
        else {
            window.alert('All fields are required');
        }

    }

    return (
        <>
            <div className='login-form'>
                <form className='form-log' onSubmit={handleLoginForm}>
                    <div>
                        <img src={user_img} alt='user icon png' className='user-icon' />
                    </div>
                    <Input
                        placeholder='Email'
                        className='input-field'
                        value={email}
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <Input
                        placeholder='Password'
                        className='input-field'
                        value={pass}
                        type="password"
                        onChange={(e) => { setPass(e.target.value) }}
                    />

                    <FormButton text="Login" />
                    <p className="signup-para" onClick={() => navigate('/signup')}>No account? Signup.</p>

                </form>
            </div>
        </>
    )
}
