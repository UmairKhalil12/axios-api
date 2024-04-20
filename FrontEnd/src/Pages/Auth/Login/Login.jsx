import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { GET_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useDispatch } from 'react-redux';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import Navbar from '../../../Components/Navbar/Navbar'


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginForm = async () => {
        if (email !== '' && pass !== '') {
            if (emailValidation(email)) {
                GET_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/AdminLogin?Email=${email}&Password=${pass}`, dispatch)
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
        <Navbar />
        <div className='login-form'>
            <h1>Login Form</h1>

            <div className='form-log'>
                <Input
                    label='Enter Email'
                    placeholder='abc@email.com'
                    className='input-field'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />

                <Input
                    label='Enter password'
                    placeholder='password'
                    className='input-field'
                    value={pass}
                    onChange={(e) => { setPass(e.target.value) }}
                />

                <button className='login-btn' onClick={handleLoginForm}>Login</button>
                <p style={{ color: 'blue' }} onClick={() => navigate('/signup')}>No account? want to create one ?</p>
            </div>
        </div>
        </>
    )
}
