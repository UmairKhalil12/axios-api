import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { GET_POST_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';


export default function Signup() {

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
        emailValidation(email);
        if (name !== '' && email !== '' && phone !== '' && pass !== ''
            && address !== '' && location !== '' && showRoom !== '' && identifcation !== '') {
            if (message) {
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
        <div className='signup-form'>
            <h1>Signup Form</h1>
            <div className='form-log'>
                <div className='input-div'>
                    <Input
                        placeholder='enter name'
                        value={name}
                        className='input-field'
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder='enter email'
                        value={email}
                        className='input-field'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='input-div'>
                    <Input
                        placeholder='enter phone number'
                        value={phone}
                        className='input-field'
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                        placeholder='enter password'
                        value={pass}
                        className='input-field'
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                <div className='input-div'>
                    <Input
                        placeholder='confirm password'
                        className='input-field'
                        value={confirmPass}
                        onChange={(e) => { setConfirmPass(e.target.value) }}
                    />

                    <Input
                        placeholder='enter address'
                        value={address}
                        className='input-field'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className='input-div'>
                    <Input
                        placeholder='enter location'
                        value={location}
                        className='input-field'
                        onChange={(e) => setLocation(e.target.value)}

                    />

                    <Input
                        placeholder='enter show room name'
                        value={showRoom}
                        className='input-field'
                        onChange={(e) => setShowRoom(e.target.value)}
                    />
                </div>

                <Input
                    placeholder='enter identifcation number'
                    value={identifcation}
                    className='input-field'
                    onChange={(e) => setIdentification(e.target.value)}
                />

                <button className='login-btn' type='submit' onClick={handleSignForm}>Signup</button>
                <p onClick={() => navigate('/login')}>already have an account? Login.</p>
            </div>

        </div>
    )
}
