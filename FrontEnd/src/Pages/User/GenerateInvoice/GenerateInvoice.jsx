import React, { useEffect, useState } from 'react';
import "./GenerateInvoice.css";
import SideNav from '../../../Components/SideNav/SideNav';
import { GET_DATA_BY_USER, GET_STAFF_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../../Components/FormButton/FormButton';
import Loader from '../../../Components/Loader/Loader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function GenerateInvoice() {
    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [bank, setBank] = useState([]);
    const [tax, setTax] = useState([]);
    const [terms, setTerms] = useState([]);
    const [date, setDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedTax, setSelectedTax] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedTerms, setSelectedTerms] = useState([]);

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
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Error getting data for generating invoice", error.message);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    // console.log(tax);
    // console.log(terms);
    // console.log(bank);

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

    const handleSelectTax = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedTaxIds = selectedOptions.map(option => parseInt(option.value));
        const selectedTaxObjects = selectedTaxIds.map(id => tax.find(value => value.Id === id));
        setSelectedTax(selectedTaxObjects);
    }

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

    const calculateSubTotal = () => {
        return selectedItems.reduce((total, item) => {
            return total + finalPrice(item.UnitPrice, item.Tax, item.Discount, quantities[item.Id]);
        }, 0);
    };

    const calculateTotalTax = () => {
        const subTotal = calculateSubTotal();
        return selectedTax.reduce((total, tax) => {
            return total + (tax.TaxRate / 100) * subTotal;
        }, 0);
    };

    const subTotal = calculateSubTotal();
    const totalTax = calculateTotalTax();
    const grandTotal = subTotal + totalTax;

    const handleSelectBank = (event) => {
        const bankId = event.target.value;
        console.log('handleSelectBank bankId', bankId);
        const selectedBank = bank.find(bank => bank.Id === parseInt(bankId));
        setSelectedBank(selectedBank);

    };

    console.log('selectedBanks', selectedBank);

    const handleSelectTerms = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedTermIds = selectedOptions.map(option => parseInt(option.value));
        const selectedTermObjects = selectedTermIds.map(id => terms.find(value => value.Id === id));
        setSelectedTerms(selectedTermObjects);
    }


    const handleGeneratePdf = async (event) => {
        event.preventDefault();

        const element = printRef.current;
        element.classList.add('pdf-content', 'no-border', 'no-border-bottom');

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const margin = 10;
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
        pdf.save('download.pdf');

        // Remove the PDF-specific class
        element.classList.remove('pdf-content', 'pdf-content-table', 'pdf-content-td', 'pdf-content-tr');
    };

    const printRef = useRef();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <SideNav />
                        <div className='background'>
                            <h1 className='heading-invoice'>Generate Invoice</h1>
                            <div className='signup-form-2'>
                                <form className='form-log' onSubmit={handleGeneratePdf}>
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

                                    {date && dueDate && (
                                        <div className='select-item-tax'>
                                            <div>
                                                <label htmlFor='items'>Select Items:</label> <br />
                                                <select multiple onChange={handleSelectItems} className='invoice-select' name='items'>
                                                    {items?.map((val) => (
                                                        <option key={val?.Id} value={val?.Id}>
                                                            {val?.ItemName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                {selectedItems.length > 0 && (
                                                    <>
                                                        <label>Select Taxes:</label> <br />
                                                        <select multiple onChange={handleSelectTax} className='invoice-select' name='tax'>
                                                            {tax?.map((val) => (
                                                                <option key={val?.Id} value={val?.Id}>
                                                                    {val?.TaxName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <br />

                                    {selectedItems?.length > 0 || selectedTax?.length > 0 ?

                                        <div className='bank-terms'>
                                            <div>
                                                <label htmlFor='bank'>Select Bank:</label> <br />
                                                <select onChange={handleSelectBank} className='invoice-select' name='bank'>
                                                    {bank?.map((val) => (
                                                        <option key={val?.Id} value={val?.Id}>
                                                            {val?.BankInfo}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor='terms'>Select Terms and Conditions:</label> <br />
                                                <select onChange={handleSelectTerms} className='invoice-select' name='terms' multiple>
                                                    {terms?.map((val) => (
                                                        <option key={val?.Id} value={val?.Id}>
                                                            {val?.TermsCondition}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        : null
                                    }
                                    <div ref={printRef}  className='pdf-content'  >
                                        {selectedItems.length > 0 && (
                                            <div>
                                                <h1>Invoice</h1>
                                                <div>
                                                    <p> <b>Date:</b>  {formatDate(date)}</p>
                                                    <p><b>Due Date:</b> {formatDate(date)}</p>
                                                </div>
                                                {selectedBank || selectedTax.length > 0 ? (
                                                    <div className='bank-term-div'>
                                                        <div className='bank'>
                                                            <h3>Bank Info </h3>
                                                            <p>{selectedBank?.BankInfo}</p>
                                                        </div>

                                                        <div className='term'>
                                                            <h3>Terms and Conditions</h3>
                                                            {selectedTerms.map((value) => {
                                                                return (
                                                                    <>
                                                                        <p>{value?.TermsCondition}</p>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>

                                                ) : null}
                                                <h3>Item Details</h3>
                                                <table className='item-select-table no-border'>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Quantity</th>
                                                            <th>Unit Price</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedItems.map(item => (
                                                            <tr key={item.Id}>
                                                                <td>
                                                                    <p>{item.ItemName}</p>
                                                                    {/* <span style={{ marginLeft: '8px' }} ><i>{item.ItemsDetails}</i></span> */}
                                                                </td>
                                                                <td>
                                                                    <Input
                                                                        type="number"
                                                                        value={quantities[item.Id]}
                                                                        onChange={(e) => handleQuantityChange(item.Id, e)}
                                                                        style={{ width: '150px' }}
                                                                        min="1"
                                                                    />
                                                                </td>

                                                                <td>${item.UnitPrice}</td>

                                                                <td>
                                                                    ${finalPrice(item.UnitPrice, item.Tax, item.Discount, quantities[item.Id])}
                                                                </td>
                                                            </tr>
                                                        ))}

                                                        <tr className='no-border-bottom'>
                                                            <td className='no-border' colSpan='2'></td>
                                                            <th className='no-border'>Sub Total</th>
                                                            <td className='no-border'>${subTotal}</td>
                                                        </tr>

                                                        <tr className='no-border'>
                                                            <td colSpan='2' className='no-border'></td>
                                                            <td className='no-border'>Total Tax</td>
                                                            <td className='no-border'>${totalTax}</td>
                                                        </tr>

                                                        <tr className='no-border'>
                                                            <td className='no-border' colSpan='2'></td>
                                                            <th className='no-border'>GRAND TOTAL</th>
                                                            <td className='no-border'>${grandTotal}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                    <FormButton text="Generate Invoice" />
                                    <p className='form-para-goback' onClick={() => navigate('/home')}>Go Back</p>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}
