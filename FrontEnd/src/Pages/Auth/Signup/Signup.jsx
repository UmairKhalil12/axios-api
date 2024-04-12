import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { GET_POST_METHOD } from '../../../Backend';


export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [showRoom, setShowRoom] = useState('');
    const [identifcation, setIdentification] = useState('');

    const navigate = useNavigate();

    // const [data, setData] = useState({
    //     name: '',
    //     email: '',
    //     phone: '',
    //     pass: '',
    //     address: '',
    //     location: '',
    //     showRoom: '',
    //     identifcation: ''
    // })

    const handleSignForm = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && phone !== '' && pass !== ''
            && address !== '' && location !== '' && showRoom !== '' && identifcation !== '') {

            try {
                await GET_POST_METHOD(
                    `?Name=${name}&Email=${email}&PhoneNo=${phone}&Password=${pass}&Address=${address}&Location=${location}&ShowRoomName=${showRoom}&IdentificationNo=${identifcation}&ParentUserID=1&UserType=0`,
                    {
                        Name: name,
                        Email: email,
                        PhoneNo: phone,
                        Password: pass,
                        Address: address,
                        Location: location,
                        ShowRoomName: showRoom,
                        IdentificationNo: identifcation,
                        ParentUserID: 1,
                        UserType: 0
                    });
                window.alert('User added successfully');
            } catch (error) {
                console.error('Error creating user:', error);
                window.alert('Error creating user');
            }
        }
        else {
            window.alert('All fields are required');
        }
    }


    return (
        <div className='signup-form'>
            <h1>Signup Form</h1>
            <form className='form' onSubmit={handleSignForm}>
                <input
                    placeholder='enter name'
                    value={name}
                    className='input-field'
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder='enter email'
                    value={email}
                    className='input-field'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input

                    placeholder='enter phone number'
                    value={phone}
                    className='input-field'
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder='enter password'
                    value={pass}
                    className='input-field'
                    onChange={(e) => setPass(e.target.value)}
                />

                <input
                    placeholder='enter address'
                    value={address}
                    className='input-field'
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input
                    placeholder='enter location'
                    value={location}
                    className='input-field'
                    onChange={(e) => setLocation(e.target.value)}

                />

                <input
                    placeholder='enter show room name'
                    value={showRoom}
                    className='input-field'
                    onChange={(e) => setShowRoom(e.target.value)}
                />

                <input
                    placeholder='enter identifcation number'
                    value={identifcation}
                    className='input-field'
                    onChange={(e) => setIdentification(e.target.value)}
                />

                <button className='signup-btn' type='submit'>Signup</button>
                <p onClick={() => navigate('/login')}>already have an account? Login.</p>
            </form>

        </div>
    )
}
