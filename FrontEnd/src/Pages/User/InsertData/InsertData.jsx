import React, { useEffect, useState } from 'react'
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import { INSERT_DATA } from '../../../Axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../Components/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_UPDATE_BY_USER } from '../../../Axios/axios';
import { GET_BUSINESS_BY_ID } from '../../../Axios/axios';
import FormButton from '../../../Components/FormButton/FormButton'
import "./InsertData.css"
import SideNav from '../../../Components/SideNav/SideNav';


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
            const res = await GET_BUSINESS_BY_ID(`IMBusiness/BusinessGetById?Id=${id}`)
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
                        await INSERT_DATA(`IMBusiness/BusinessOn?BusinessName=${businessName}&BusinessLogo=${businessLogo}&BusinessOwnerName=${businessOwnerName}&BusinessNumber=${businessNumber}&Email=${email}&PhoneNumber=${phone}&WebSite=${website}&BusinessAddress=${businessAddress}&CreateBy=${UserID}`, dispatch)
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
                        await GET_UPDATE_BY_USER(`IMBusiness/BusinessOn?Id=${id}&BusinessName=${businessName}&BusinessLogo=${businessLogo}&BusinessOwnerName=${businessOwnerName}&BusinessNumber=${businessNumber}&Email=${email}&PhoneNumber=${phone}&WebSite=${website}&BusinessAddress=${businessAddress}&ModifyBy=${UserID}`)
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
        <>
            <SideNav />
            <div className='background' >
                <h1>{id ? 'Update Data' : 'Add Data'}</h1>
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleInsertForm}>
                        <div className='input-div'>
                            <Input
                                placeholder='Busines name'
                                value={businessName}
                                className='input-field'
                                onChange={(e) => setBusinessName(e.target.value)}
                            />

                            <Input
                                placeholder='Business Logo'
                                value={businessLogo}
                                className='input-field'
                                onChange={(e) => setBusinessLogo(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder='Busienss Owner Name'
                                value={businessOwnerName}
                                className='input-field'
                                onChange={(e) => setBusinessOwnerName(e.target.value)}
                            />

                            <Input
                                placeholder='Business Number'
                                value={businessNumber}
                                className='input-field'
                                onChange={(e) => setBusinessNumber(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder='Email'
                                className='input-field'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input
                                placeholder='Phone'
                                value={phone}
                                className='input-field'
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder='Business Website'
                                value={website}
                                className='input-field'
                                onChange={(e) => setWebsite(e.target.value)}

                            />

                            <Input
                                placeholder='Address'
                                value={businessAddress}
                                className='input-field'
                                onChange={(e) => setBusinessAddress(e.target.value)}
                            />
                        </div>
                        <FormButton text={id ? "Update Data " : "Add Data"} />

                        <p className='form-para-goback' onClick={() => navigate('/home')} >Go Back</p>
                    </form>

                </div>
            </div>
        </>
    )
}
