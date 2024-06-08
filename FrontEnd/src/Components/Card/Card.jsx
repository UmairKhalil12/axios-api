import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
import { GET_DELETE_BY_ID } from '../../Axios/axios';
import Button from '../Button/Button';
import { TiWorldOutline } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

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
        <div className='main-card' onClick={()=>navigate(`/showBusiness/${index}`)}>
            <div className='card-1'>
                <p className='heading-card'>{name}</p>
                <img src={image} alt={name} className='card-img' />

                <p className='ownername' >{ownerName}</p>

                <div className='card-2'>
                    <MdOutlineEmail className='card-icon' />
                    <p>{email}</p>
                </div>
                <div className='card-2'>
                    {/* <p>{website}</p> */}
                    <FaPhoneAlt className='card-icon' />
                    <p>{phone}</p>
                    {/* <p>{address}</p> */}
                </div>

                <div className='card-2'>
                    <TiWorldOutline className='card-icon' />
                    <p>{website}</p>
                </div>

                <div className='card-edit-delete-button'>
                    <Button onClick={() => navigate(`/updatedata/${index}`)} text='Edit' />
                    <Button onClick={handleDelete} text='Delete' />
                </div>
            </div>
        </div>
    )
}
