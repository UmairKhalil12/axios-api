import React, { useCallback, useEffect } from 'react'
import "./Business.css"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_STAFF_BY_ID, GET_BUSINESS_BY_ID, GET_STAFF_METHOD } from '../../../Axios/axios';
import Navbar from "../../../Components/Navbar/Navbar"
import Loader from '../../../Components/Loader/Loader';
import Button from '../../../Components/Button/Button';

export default function Business() {
    const id = useParams();
    const ID = id.id;
    //console.log("business id ", ID);
    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [businessId, setBusinessId] = useState("");
    const [staff, setStaff] = useState([]);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const res = await GET_BUSINESS_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/BusinessGetById?Id=${ID}`);
            const res2 = await GET_STAFF_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/GetAllStaffs?UserID=${ID}`);
            setBusiness(res);
            if (res2) {
                setStaff(res2);
            }
            setLoading(false);
        }
        catch (error) {
            console.log(`error deleting data of id ${id} `, error.message);
            setLoading(false);
        }
    }, [ID, id])

    const removeStaff = useCallback(async (id) => {
        try {
            await DELETE_STAFF_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/DeleteUser?Id=${id}`);
            window.alert("Staff Deleted Sucessfully");
        }
        catch (error) {
            console.log("Error deleting staff", error.message);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [id, business, fetchData, removeStaff])

    useEffect(() => {
        if (business.length > 0) {
            setBusinessId(business[0]?.Id);
        }
    }, [business]);


    //console.log("staff business jsx", staff);

    // console.log("business", business);

    return (
        <>
            <Navbar />
            {loading ? <Loader /> : (
                <div className='business-container'>
                    <h1>Business Data</h1>
                    {business?.map((value, index) => {
                        return (
                            <div className='business-info-main'>
                                {/* {console.log('business by id', value)} */}
                                <div className='cover-container'>
                                    <img src={value?.BusinessLogo} alt={value?.BusinessName} className='business-cover' />
                                </div>

                                <div>
                                    <br />
                                    <Button text="Add Staff" onClick={() => { navigate(`/addStaff/${businessId}`) }} />
                                    <h1>{value?.BusinessName}</h1>
                                    <div className='business-info'>
                                        <p><span><b>Owner's Name : </b></span>{value?.BusinessOwnerName}</p>
                                        <p><span><b>Website : </b></span>{value?.WebSite}</p>
                                        <p><span><b>Business Number : </b></span>{value?.BusinessNumber}</p>
                                        <p><span><b>Email : </b></span>{value?.Email}</p>
                                    </div>
                                    {staff.length > 0 ? <h3>Staffs</h3> : ""}
                                    {staff.length > 0 ? (
                                        <div className='staff-table'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Number</th>
                                                        <th>Address</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {staff?.map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{value?.Name}</td>
                                                                <td>{value?.Email}</td>
                                                                <td>{value?.PhoneNo}</td>
                                                                <td>{value?.Address}</td>
                                                                <td>
                                                                    <div>
                                                                        <Button text="Edit" onClick={() => navigate(`/editStaff/${value?.Id}`)} />
                                                                        <Button text="Remove" onClick={() => removeStaff(value?.Id)} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : ""}

                                </div>
                            </div>
                        )
                    })}

                </div>
            )}

        </>
    )
}
