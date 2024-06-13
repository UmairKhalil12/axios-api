import React, { useEffect, useState } from 'react';
import "./ShowTax.css";
import { DELETE_STAFF_BY_ID, GET_STAFF_METHOD } from '../../../Axios/axios';
import SideNav from '../../../Components/SideNav/SideNav';
import Button from '../../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader/Loader'

export default function ShowTax() {
    const [tax, setTax] = useState([]);

    const userData = useSelector(state => state?.user?.userData);
    const userID = userData[0].UserID;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const getAllTax = async () => {
        try {
            const res = await GET_STAFF_METHOD(`IMGeneralSetup/GetAllTaxSetup`);
            setTax(res);
            setLoading(false)
        } catch (error) {
            console.log("Error fetching all tax", error.message);
            setLoading(false)
        }
    };

    const handleDelete = async (id) => {
        try {
            await DELETE_STAFF_BY_ID(`IMGeneralSetup/SoftDeleteTaxSetup?Id=${id}&ModifyBy=${userID}`);
            window.alert("Tax sucessfully deleted");
            getAllTax();
            setLoading(false)
        } catch (error) {
            console.log("Error deleting tax of id", id, error.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        getAllTax();
    }, []);  // Empty dependency array to run only once

    console.log('show tax', tax);

    return (
        <>
            <SideNav />
            {loading ? <Loader /> : (
                <div className='tax-home'>
                    <div>
                        <h1>Show Tax</h1>
                        <Button text="Add Tax" onClick={() => navigate('/addTax')} />
                        <br />
                        <div>
                            <table className="table-tax">
                                <thead>
                                    <tr>
                                        <th>Tax Name</th>
                                        <th>Tax Rate</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tax?.map((value) => (
                                        <tr key={value?.Id}>
                                            <td>{value?.TaxName}</td>
                                            <td>{value?.TaxRate}</td>
                                            <td>
                                                <Button text='Update' onClick={() => navigate(`/editTax/${value?.Id}`)} />
                                                <Button text="Remove" onClick={() => handleDelete(value?.Id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}
