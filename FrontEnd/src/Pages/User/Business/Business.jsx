import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_BY_ID } from '../../../Axios/axios';

export default function Business() {
    const id = useParams();
    const ID = id.id;
    console.log("business id ",ID);
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
    })
    return (
        <div>
            <h1>Business Data</h1>
            {business?.map((value, index) => {
                return (
                    <div>
                        {console.log('business by id', value)}
                        <h3>{value?.BusinessName}</h3>
                        <p>{index}</p>
                        <p>{value?.BusinessOwnerName}</p>
                    </div>
                )
            })}

        </div>
    )
}
