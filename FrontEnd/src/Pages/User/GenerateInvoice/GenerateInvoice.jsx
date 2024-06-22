import React, { useEffect, useState } from 'react';
import "./GenerateInvoice.css";
import { GET_DATA_BY_USER, GET_STAFF_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Components/FormButton/FormButton';

export default function GenerateInvoice() {
    const [items, setItems] = useState([]);
    const [bank, setBank] = useState([]);
    const [tax, setTax] = useState([]);
    const [terms, setTerms] = useState([]);
    const [date, setDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    
    const navigate = useNavigate();

    const getAll = async () => {
        try {
            const res1 = await GET_DATA_BY_USER(`IMItemSetup/GetAllItemSetup`);
            const res2 = await GET_STAFF_METHOD(`IMGeneralSetup/GetAllPaymentDetails`);
            const res3 = await GET_STAFF_METHOD(`IMGeneralSetup/GetAllTaxSetup`);
            const res4 = await GET_STAFF_METHOD(`IMGeneralSetup/GetAllTermsCondition`);
            setItems(res1);
            setBank(res2);
            setTax(res3);
            setTerms(res4);
        } catch (error) {
            console.log("Error getting data for generating invoice", error.message);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const handleSelectItems = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedItemIds = selectedOptions.map(option => parseInt(option.value));
        const selectedItemObjects = selectedItemIds.map(id => items.find(item => item.Id === id));
        setSelectedItems(selectedItemObjects);
        
        const newQuantities = { ...quantities };
        selectedItemObjects.forEach(item => {
            if (!newQuantities[item.Id]) {
                newQuantities[item.Id] = 1;
            }
        });
        setQuantities(newQuantities);
    };

    const handleQuantityChange = (itemId, event) => {
        const newQuantities = { ...quantities, [itemId]: event.target.value };
        setQuantities(newQuantities);
    };

    const finalPrice = (origPrice, tax, discount, quantity) => {
        let totalTax = (tax / 100) * origPrice;
        let totalDiscount = (discount / 100) * origPrice;
        let finalPrice = (origPrice + totalTax) - totalDiscount;
        return finalPrice * quantity;
    };

    return (
        <>
            <div className='background'>
                <h1 className='heading-invoice'>Generate Invoice</h1>
                <div className='signup-form-2'>
                    <form className='form-log'>
                        <div className='input-div'>
                            <Input
                                type="date"
                                placeholder='Date'
                                value={date}
                                className='input-field'
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <Input
                                type="date"
                                placeholder='Due Date'
                                value={dueDate}
                                className='input-field'
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>

                        <select multiple onChange={handleSelectItems} className='select-item'>
                            {items.map((val) => (
                                <option key={val?.Id} value={val?.Id}>
                                    {val?.ItemName}
                                </option>
                            ))}
                        </select>

                        {selectedItems.length > 0 && (
                            <div>
                                <h2>Item Details</h2>
                                <table className='item-select-table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedItems.map(item => (
                                            <tr key={item.Id}>
                                                <td>
                                                    {item.ItemName}
                                                    <p>{item.ItemsDetails}</p>
                                                </td>
                                                <td>
                                                    <Input
                                                        type="number"
                                                        value={quantities[item.Id]}
                                                        onChange={(e) => handleQuantityChange(item.Id, e)}
                                                        min="1"
                                                    />
                                                </td>
                                                <td>
                                                    {finalPrice(item.UnitPrice, item.Tax, item.Discount, quantities[item.Id])}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <FormButton text="Generate Invoice" />
                        <p className='form-para-goback' onClick={() => navigate('/home')}>Go Back</p>
                    </form>
                </div>
            </div>
        </>
    );
}
