import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { GET_METHOD } from '../../../Backend/index';


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [data, setData] = useState({
        email: '',
        pass: ''
    });

    const navigate = useNavigate();

    const handleLoginForm = (e) => {
        e.preventDefault();
        if (email !== '' && pass !== '' && confirmPass !== '') {
            if (pass === confirmPass) {
                setData({
                    email: email,
                    pass: pass
                })
                GET_METHOD(`?Email=${email}&Password=${pass}`)
            }
            else {
                window.alert('Pass and confirm pass should be same');
            }

        }
        else {
            window.alert('All fields are required');
        }
    }


    return (
        <div className='login-form'>
            <h1>Login Form</h1>
            <form className='form' onSubmit={handleLoginForm}>
                <input
                    placeholder='enter email'
                    className='input-field'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />

                <input
                    placeholder='enter password'
                    className='input-field'
                    value={pass}
                    onChange={(e) => { setPass(e.target.value) }}
                />

                <input
                    placeholder='confirm password'
                    className='input-field'
                    value={confirmPass}
                    onChange={(e) => { setConfirmPass(e.target.value) }}
                />

                <button className='login-btn' >Login</button>
                <p onClick={() => navigate('/signup')}>No account? want to create one ?</p>
            </form>
        </div>
    )
}
