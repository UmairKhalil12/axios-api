import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { GET_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useDispatch } from 'react-redux';


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch  = useDispatch();

    const [message, setMessage] = useState(false);

    const emailValidation = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setMessage(true);
        }
        else {
            setMessage(false);
        }
    }

    const navigate = useNavigate();

    const handleLoginForm = async () => {
        emailValidation(email);
        if (email !== '' && pass !== '') {
            if (message) {
                GET_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/AdminLogin?Email=${email}&Password=${pass}` , dispatch)
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
        <div className='login-form'>
            <h1>Login Form</h1>

            <div className='form-log'>
                <Input
                    placeholder='enter email'
                    className='input-field'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />

                <Input
                    placeholder='enter password'
                    className='input-field'
                    value={pass}
                    onChange={(e) => { setPass(e.target.value) }}
                />

                <button className='login-btn' onClick={handleLoginForm}>Login</button>
                <p onClick={() => navigate('/signup')}>No account? want to create one ?</p>
            </div>
        </div>
    )
}
