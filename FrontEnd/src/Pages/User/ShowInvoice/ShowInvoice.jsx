import "./ShowInvoice.css"
import React, { useEffect, useState } from 'react'
//import { useNavigate } from 'react-router-dom';
import { DELETE_STAFF_BY_ID, GET_STAFF_METHOD } from '../../../Axios/axios';
import { useSelector } from 'react-redux';
import SideNav from "../../../Components/SideNav/SideNav";
import Button from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";


export default function ShowInvoice() {
    const [invoice, setInvoice] = useState([]);
    const userData = useSelector(state => state?.user?.userData);
    const userID = userData[0].UserID;


    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await DELETE_STAFF_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMGeneralSetup/SoftDeletePaymentDetail?Id=${id}&ModifyBy=${userID}`)
                .then(() => {
                    window.alert("Invoice deleted sucessfully");
                })
        }
        catch (error) {
            console.log("Error deleting invoice :id", id, error.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GET_STAFF_METHOD(`https://ilivesolutions.azurewebsites.net/api/IMGeneralSetup/GetAllPaymentDetails`);
                setInvoice(res);
            }
            catch (error) {
                console.log("error fetching data", error.message);
            }
        }
        fetchData();
    }, [handleDelete])

    console.log("show invoice", invoice);

    return (
        <>
            <SideNav />
            <div className="show-invoice-main" >
                <div>
                    <h1>Invoice Data</h1>
                    <Button text="Add Invoice" onClick={()=>navigate('/addInvoice')} />
                        <br /> 
                    <div>
                        <table className="table-invoice">
                            <thead>
                                <th>Bank Info</th>
                                <th>Description</th>
                                <th>Qr</th>
                                <th>Actions</th>
                            </thead>
                            {invoice?.map((value, index) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{value?.BankInfo}</td>
                                            <td>{value?.OtherDescription}</td>
                                            <td>{value?.QRImage}</td>
                                            <td>
                                                <Button text='Update' onClick={() => navigate(`/editInvoice/${value?.Id}`)} />
                                                <Button text="Remove" onClick={() => handleDelete(value?.Id)} />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}
