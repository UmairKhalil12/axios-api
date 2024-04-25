import React, { useEffect, useState } from 'react'
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import { INSERT_DATA } from '../../../Axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../Components/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_UPDATE_BY_USER } from '../../../Axios/axios';
import Navbar from '../../../Components/Navbar/Navbar';
import { GET_BUSINESS_BY_ID } from '../../../Axios/axios';


export default function InsertData() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [businessName, setBusinessName] = useState('');
    const [businessLogo, setBusinessLogo] = useState('');
    const [businessOwnerName, setBusinessOwnerName] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');

    const [idBusiness, setIdBusiness] = useState();

    const dispatch = useDispatch();

    const userData = useSelector(state => state.user.userData);
    const userId = () => {
        return userData[0].UserID
    }
    const UserID = userId();

    useEffect(() => {
        const fetchData = async () => {
            const res = await GET_BUSINESS_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessGetById?Id=${id}`)
                .then((res) => {
                    setBusinessName(res[0].BusinessName);
                    setBusinessLogo(res[0].BusinessLogo);
                    setBusinessOwnerName(res[0].BusinessOwnerName);
                    setBusinessNumber(res[0].BusinessNumber);
                    setEmail(res[0].Email);
                    setPhone(res[0].PhoneNumber);
                    setWebsite(res[0].WebSite);
                    setBusinessAddress(res[0].BusinessAddress);
                })
            setIdBusiness(res);
        }

        if (id) {
            fetchData();
        }
    }, [id])

    console.log('id business', idBusiness);


    const handleInsertForm = async (e) => {
        e.preventDefault();
        if (!id) {
            if (businessName !== '' && businessLogo !== '' && businessOwnerName !== '' && businessNumber !== ''
                && email !== '' && phone !== '' && website !== '' && businessAddress !== '') {
                if (emailValidation(email)) {
                    try {
                        await INSERT_DATA(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessOn?BusinessName=${businessName}&BusinessLogo=${businessLogo}&BusinessOwnerName=${businessOwnerName}&BusinessNumber=${businessNumber}&Email=${email}&PhoneNumber=${phone}&WebSite=${website}&BusinessAddress=${businessAddress}&CreateBy=${UserID}`, dispatch)
                            .then(() => {
                                window.alert('Data Inserted Successfully');
                                navigate('/home')
                            })
                    } catch (error) {
                        console.error('Error creating user:', error);
                        window.alert('Error creating user');
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
        else {
            if (businessName !== '' && businessLogo !== '' && businessOwnerName !== '' && businessNumber !== ''
                && email !== '' && phone !== '' && website !== '' && businessAddress !== '') {
                if (emailValidation(email)) {
                    try {
                        await GET_UPDATE_BY_USER(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessOn?Id=${id}&BusinessName=${businessName}&BusinessLogo=${businessLogo}&BusinessOwnerName=${businessOwnerName}&BusinessNumber=${businessNumber}&Email=${email}&PhoneNumber=${phone}&WebSite=${website}&BusinessAddress=${businessAddress}&ModifyBy=${UserID}`)
                            .then(() => {
                                window.alert('data update sucessfully');
                                navigate('/home');
                            })
                    }
                    catch (error) {
                        console.log('error updating data', error.message);
                        console.log('error updating data', error);
                    }
                }
                else {
                    window.alert("email is not correct");
                }

            }
            else {
                window.alert("All fields are required");
            }
        }
    }


    return (
        <div>
            <Navbar />
            <div className='signup-form'>
                <h1>{id ? 'Update Data' : 'Add Data'}</h1>
                <div className='form-log'>
                    <div className='input-div'>
                        <Input
                            label='Enter Business Name'
                            placeholder='busines'
                            value={businessName}
                            className='input-field'
                            onChange={(e) => setBusinessName(e.target.value)}
                        />

                        <Input
                            label='Enter Buisness Logo Link'
                            placeholder='img.com'
                            value={businessLogo}
                            className='input-field'
                            onChange={(e) => setBusinessLogo(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            label='Enter Business owner name'
                            placeholder='john'
                            value={businessOwnerName}
                            className='input-field'
                            onChange={(e) => setBusinessOwnerName(e.target.value)}
                        />

                        <Input
                            label='Enter Business number'
                            placeholder='+92'
                            value={businessNumber}
                            className='input-field'
                            onChange={(e) => setBusinessNumber(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input

                            label='Enter Email'
                            placeholder='abc@email.com'
                            className='input-field'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <Input
                            label='Enter Phone '
                            placeholder='phone'
                            value={phone}
                            className='input-field'
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className='input-div'>
                        <Input
                            label='Enter website'
                            placeholder='business.com'
                            value={website}
                            className='input-field'
                            onChange={(e) => setWebsite(e.target.value)}

                        />

                        <Input
                            label='Enter Business Address'
                            placeholder='address'
                            value={businessAddress}
                            className='input-field'
                            onChange={(e) => setBusinessAddress(e.target.value)}
                        />
                    </div>

                    <button className='login-btn' type='submit' onClick={handleInsertForm}>{id ? 'Update Data' : 'Add Data'}</button>
                </div>

            </div>
        </div>
    )
}
