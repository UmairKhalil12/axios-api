import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { GET_POST_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import Navbar from '../../../Components/Navbar/Navbar';


export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [showRoom, setShowRoom] = useState('');
    const [identifcation, setIdentification] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const navigate = useNavigate();

    const handleSignForm = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && phone !== '' && pass !== ''
            && address !== '' && location !== '' && showRoom !== '' && identifcation !== '') {
            if (emailValidation(email)) {
                if (pass === confirmPass) {
                    try {
                        await GET_POST_METHOD(
                            `https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/Registeration?Name=${name}&Email=${email}&PhoneNo=${phone}&Password=${pass}&Address=${address}&Location=${location}&ShowRoomName=${showRoom}&IdentificationNo=${identifcation}&ParentUserID=${'1'}&UserType=${'0'}`);
                    } catch (error) {
                        console.error('Error creating user:', error);
                        window.alert('Error creating user');
                    }
                }
                else {
                    window.alert('Password and confirm password should be same');
                }
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
            <div className='signup-form'>
                <h1>Signup Form</h1>
                <div className='form-log'>
                    <div className='input-div'>
                        <Input
                            label='Enter name'
                            placeholder='john'
                            value={name}
                            className='input-field'
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            label='Enter Email'
                            placeholder='john@gmail.com'
                            value={email}
                            className='input-field'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            label='Enter Phone Number'
                            placeholder='0213471154'
                            value={phone}
                            className='input-field'
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <Input
                            label='Enter Password'
                            placeholder='password'
                            value={pass}
                            className='input-field'
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input

                            label='Confirm Password'
                            placeholder='confirm password'
                            className='input-field'
                            value={confirmPass}
                            onChange={(e) => { setConfirmPass(e.target.value) }}
                        />

                        <Input
                            label='Enter Address'
                            placeholder='address'
                            value={address}
                            className='input-field'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            label='Enter Location'
                            placeholder='20'
                            value={location}
                            className='input-field'
                            onChange={(e) => setLocation(e.target.value)}

                        />

                        <Input
                            label='Enter Show Room '
                            placeholder='showroom'
                            value={showRoom}
                            className='input-field'
                            onChange={(e) => setShowRoom(e.target.value)}
                        />
                    </div>

                    <Input
                        label='Enter Identifcation Number'
                        placeholder='42'
                        value={identifcation}
                        className='input-field'
                        onChange={(e) => setIdentification(e.target.value)}
                    />

                    <button className='login-btn' type='submit' onClick={handleSignForm}>Signup</button>
                    <p style={{ color: 'blue' }} onClick={() => navigate('/login')}>already have an account? Login.</p>
                </div>

            </div>
        </>
    )
}
