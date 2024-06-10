import React, { useCallback, useEffect, useState } from 'react'
import "./AddStaff.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import { GET_BUSINESS_BY_ID, INSERT_STAFF_METHOD, UPDATE_DATA } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import FormButton from '../../../Components/FormButton/FormButton';
import Navbar from '../../../Components/Navbar/Navbar';


export default function AddStaff() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BusinessId = id;
    console.log("add staff business id (route)", BusinessId);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [showRoom, setShowRoom] = useState('');
    const [staffById, setStaffById] = useState('');

    const isEditingStaff = window.location.pathname.startsWith('/editStaff');

    const userData = useSelector(state => state.user.userData);
    const userId = () => {
        return userData[0].UserID
    }
    const UserID = userId();

    const handleForm = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== "" && phone !== "" && password !== "" && address !== "" && location !== "" && showRoom !== "") {
            if (isEditingStaff) {
                if (emailValidation(email)) {
                    try {
                        await UPDATE_DATA(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/Registeration?Id=${id}&Name=${name}&Email=${email}&PhoneNo=${phone}&Password=${password}&Address=${address}&Location=0&ShowRoomName=${showRoom}`)
                        window.alert("Staff updated sucessfully");
                        navigate(`/home`);
                    }
                    catch (error) {
                        console.log("error updating staff of id", id, error.message)
                    }
                }
                else {
                    window.alert("Email is not correct");
                }
            }
            if (!isEditingStaff) {
                if (emailValidation(email)) {
                    try {
                        await INSERT_STAFF_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/Registeration?Name=${name}&Email=${email}&PhoneNo=${phone}&Password=${password}&Address=${address}&Location=0&ShowRoomName=${showRoom}&IdentificationNo=0&ParentUserID=${BusinessId}&UserType=2&CreateBy=${UserID}`)
                            .then(() => {
                                window.alert("Staff added sucessfully");
                                navigate(`/showBusiness/${BusinessId}`);
                            })
                    }
                    catch (error) {
                        console.log("Error getting message", error.message);
                    }
                }
                else {
                    window.alert("Email is not correct");
                }
            }
        }

        else {
            window.alert("All fields are required");
        }
    }

    const fetch_staff = useCallback(async () => {
        try {
            const res = await GET_BUSINESS_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/GetById?Id=${id}`)
                .then((res) => {
                    setName(res[0].Name);
                    setEmail(res[0].Email);
                    setPhone(res[0].PhoneNo);
                    setPassword(res[0].Password);
                    setAddress(res[0].Address);
                    setLocation(res[0].Location);
                    setShowRoom(res[0].ShowRoomName);
                })
            setStaffById(res);
        }
        catch (error) {
            console.log("error getting staff by id", id, error.message);
        }
    }, [id])

    console.log("staff by id ", staffById);

    useEffect(() => {
        if (isEditingStaff) {
            fetch_staff()
        }
    }, [fetch_staff, isEditingStaff])

    return (

        <div>
            <Navbar />
            <div className='background' >
                <h1>Add Staff</h1>
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleForm}>
                        <div className='input-div'>
                            <Input
                                placeholder='Name'
                                value={name}
                                className='input-field'
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                placeholder='Email'
                                value={email}
                                className='input-field'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder='Phone'
                                value={phone}
                                className='input-field'
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <Input
                                placeholder='Password'
                                value={password}
                                className='input-field'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder='Address'
                                className='input-field'
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                            />

                            <Input
                                placeholder='Location'
                                value={location}
                                className='input-field'
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <Input
                            placeholder='Show Room'
                            value={showRoom}
                            className='input-field'
                            onChange={(e) => setShowRoom(e.target.value)}

                        />
                        <FormButton text={isEditingStaff ? "Update Staff" : "Add Staff"} />
                    </form>

                </div>
            </div>

        </div>
    )
}
