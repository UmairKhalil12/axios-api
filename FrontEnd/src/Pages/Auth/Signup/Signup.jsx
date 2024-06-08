import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { GET_POST_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import FormButton from "../../../Components/FormButton/FormButton"
//import Navbar from '../../../Components/Navbar/Navbar';


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
            <div className='signup-form'>
                <div className='form-log'>
                    <div className='input-div'>
                        <Input
                            placeholder='Name'
                            value={name}
                            className='input-field'
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder='Enter Email'
                            value={email}
                            className='input-field'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            placeholder='Enter Phone Number'
                            value={phone}
                            className='input-field'
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <Input
                            placeholder='Enter Password'
                            value={pass}
                            className='input-field'
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            placeholder='Confirm Password'
                            className='input-field'
                            value={confirmPass}
                            onChange={(e) => { setConfirmPass(e.target.value) }}
                        />

                        <Input
                            placeholder='Enter Address'
                            value={address}
                            className='input-field'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            placeholder='Enter Location'
                            value={location}
                            className='input-field'
                            onChange={(e) => setLocation(e.target.value)}

                        />

                        <Input
                            placeholder='Enter Show Room'
                            value={showRoom}
                            className='input-field'
                            onChange={(e) => setShowRoom(e.target.value)}
                        />
                    </div>

                    <Input
                        placeholder='Enter Identifcation Number'
                        value={identifcation}
                        className='input-field'
                        onChange={(e) => setIdentification(e.target.value)}
                    />

                    <FormButton text="Signup" onClick={() => handleSignForm} />
                    <p className='signup-para' onClick={() => navigate('/login')}>already have an account? Login.</p>
                </div>

            </div>
        </>
    )
}
