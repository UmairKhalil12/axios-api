import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className='login-form'>
            <h1>Login Form</h1>
            <form className='form'>
                <input placeholder='enter email'></input>
                <input placeholder='enter password'></input>
                <input placeholder='confirm password'></input>

                <button className='login-btn'>Login</button>
            </form>
        </div>
    )
}
