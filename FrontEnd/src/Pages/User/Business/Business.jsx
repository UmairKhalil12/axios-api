import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_BY_ID } from '../../../Axios/axios';

export default function Business() {
    const id = useParams();
    const [business, setBusiness] = useState([]);
    const fetchData = async () => {
        try {
            const res = await GET_BUSINESS_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessGetById?Id=${id}`);
            setBusiness(res);
        }
        catch (error) {
            console.log(`error deleting data of id ${id} `, error.message);
        }
    }
    useEffect(()=>{
        fetchData();
    })
    return (
        <div>
            {business?.map((index, value) => {
                return (
                    <div>
                        <h1>Business Data</h1>
                        <h3>{value?.BusinessName}</h3>
                        <p>{business?.BusinessOwnerName}</p>
                    </div>
                )
            })}

        </div>
    )
}
