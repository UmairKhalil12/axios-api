import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { GET_METHOD } from '../../../Axios/axios';


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    const navigate = useNavigate();

    const handleLoginForm = async() => {
        try {
            const check = await axios.get(`https://n47nds7n-44338.inc1.devtunnels.ms/api/IMUserRegistration/AdminLogin?Email=${email}.com&Password=${pass}`)
       console.log(`URL`,check.data);

        }
        catch(error){
            console.log(error.message , 'error logging ');
        }
       
        // if (email !== '' && pass !== '' && confirmPass !== '') {
        //     if (pass === confirmPass) {
        //         GET_METHOD(`https://n47nds7n-44338.inc1.devtunnels.ms/api/IMUserRegistration/AdminLogin?Email=${email}&Password=${pass}`)
        //     }
        //     else {
        //         window.alert('Pass and confirm pass should be same');
        //     }

        // }
        // else {
        //     window.alert('All fields are required');
        // }
    }


    return (
        <div className='login-form'>
            <h1>Login Form</h1>
           
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

                <button className='login-btn' onClick={handleLoginForm}>Login</button>
                <p onClick={() => navigate('/signup')}>No account? want to create one ?</p>
        </div>
    )
}
