import React from 'react'
import './Signup.css'

export default function Signup() {
    return (
        <div className='signup-form'>
            <h1>Signup Form</h1>
            <form className='form'>
                <input placeholder='enter name'></input>
                <input placeholder='enter email'></input>
                <input placeholder='enter phone number'></input>
                <input placeholder='enter password'></input>
                <input placeholder='confirm password'></input>
                <input placeholder='enter address'></input>
                <input placeholder='enter location'></input>
                <input placeholder='enter show room name'></input>
                <input placeholder='enter identifcation number'></input>

                <button className='signup-btn'  type='submit'>Signup</button>
            </form>

        </div>
    )
}
