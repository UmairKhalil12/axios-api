import React, { useEffect } from 'react'
import "./Business.css"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_BY_ID } from '../../../Axios/axios';
import Navbar from "../../../Components/Navbar/Navbar"

export default function Business() {
    const id = useParams();
    const ID = id.id;
    console.log("business id ", ID);
    const [business, setBusiness] = useState([]);
    const fetchData = async () => {
        try {
            const res = await GET_BUSINESS_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessGetById?Id=${ID}`);
            setBusiness(res);
        }
        catch (error) {
            console.log(`error deleting data of id ${id} `, error.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id, business])
    return (
        <>
            <Navbar />
            <div className='business-container'>
                <h1>Business Data</h1>
                {business?.map((value, index) => {
                    return (
                        <div className='business-info-main'>
                            {console.log('business by id', value)}
                            <div className='cover-container'>
                                <img src={value?.BusinessLogo} alt={value?.BusinessName} className='business-cover' />
                            </div>

                            <div>
                                <h1>{value?.BusinessName}</h1>
                                <div className='business-info'>
                                    <p><span><b>Owner's Name : </b></span>{value?.BusinessOwnerName}</p>
                                    <p><span><b>Website : </b></span>{value?.WebSite}</p>
                                    <p><span><b>Business Number : </b></span>{value?.BusinessNumber}</p>
                                    <p><span><b>Email : </b></span>{value?.Email}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}
