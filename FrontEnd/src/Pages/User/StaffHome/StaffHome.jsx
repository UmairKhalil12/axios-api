import React, { useCallback, useEffect, useState } from 'react';
import "./StaffHome.css";
import { DELETE_STAFF_BY_ID, GET_DATA_BY_USER } from '../../../Axios/axios';
import Button from '../../../Components/Button/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function StaffHome() {

    const [items, setItems] = useState([]);

    const userData = useSelector(state => state?.user?.userData);
    const userID = userData[0].UserID;

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        console.log('delete id', id);
        try {
            await DELETE_STAFF_BY_ID(`https://ilivesolutions.azurewebsites.net/api/IMItemSetup/ItemSetupSoftDelete?Id=${id}&ModifyBy=${userID}`)
                .then(() => {
                    window.alert("Item deleted sucessfully");
                })
        }
        catch (error) {
            console.log("error deleting item with id", id, error.message);
        }
    }


    const getItem = useCallback(async () => {
        try {
            const res = await GET_DATA_BY_USER(`https://ilivesolutions.azurewebsites.net/api/IMItemSetup/GetAllItemSetup`);
            setItems(res);
            console.log('getItem res', res);
        }
        catch (error) {
            console.log("error getting items", error.message);
        }
    }, []);


    useEffect(() => {
        getItem();
    }, [getItem, handleDelete])

    const finalPrice = (origPrice, tax, discount) => {
        let totalTax = tax / 100 * origPrice;
        let totalDiscount = discount / 100 * origPrice;
        let finalPrice = origPrice - (totalTax + totalDiscount);
        return finalPrice;
    }

    return (
        <div className='staff-home'>
            <div className='staff-home-2'>
                <h1>Staff Home</h1>
                <p>Welcome to the staff home page!</p>
                {items.length > 0 ? <h3>Items</h3> : ''}
                {items.length > 0 ? (
                    <div className='table-div'>
                        <table className='item-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Final Price</th>
                                    <th>Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((value, index) => {
                                    console.log('staffHome', value);
                                    return (
                                        <tr >
                                            <td>{value?.ItemName}</td>
                                            <td>{value?.UnitType}</td>
                                            <td>{value?.UnitPrice}</td>
                                            <td>{value?.Discount}%</td>
                                            <td>{value?.Tax}%</td>
                                            <td>{finalPrice(value?.UnitPrice, value?.Tax, value?.Discount)}</td>
                                            <td>{value?.ItemsDetails} </td>
                                            <td>
                                                <Button text="Update" onClick={() => navigate(`/editItems/${value?.Id}`)} />
                                                <Button text="Remove" onClick={() => handleDelete(value?.Id)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) :
                    ''}

            </div>
        </div >
    )
}
