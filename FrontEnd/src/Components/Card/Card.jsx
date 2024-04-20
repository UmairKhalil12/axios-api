import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
import { GET_DELETE_BY_ID } from '../../Axios/axios';

export default function Card({ name, ownerName, website, phone, email, address, image, index }) {

    const handleDelete = async () => {
        try {
            await GET_DELETE_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/DeleteBusiness?Id=${index}`);
        }
        catch (error) {
            console.log(`error deleting data of id ${index} `, error.message);
        }

    }

    const navigate = useNavigate();
    return (
        <div className='main-card'>
            <h1>{name}</h1>
            <img src={image} alt={name} className='card-img' />
            <div className='card-2'>
                <p>{ownerName}</p>
                <p>{email}</p>
            </div>
            <div className='card-2'>
                <p>{website}</p>
                <p>{phone}</p>
                <p>{address}</p>
            </div>

            <div className='card-2'>
                <button onClick={() => navigate(`/updatedata/${index}`)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>

        </div>
    )
}
