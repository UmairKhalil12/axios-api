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
import { useTranslation } from 'react-i18next';


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
            let taxTotal = total + (tax.TaxRate / 100) * subTotal;
            return parseFloat(taxTotal.toFixed(2));
        }, 0);
    };

    const subTotal = calculateSubTotal();
    const totalTax = calculateTotalTax();
    const grandTotal = subTotal - totalTax;

    const handleSelectBank = (event) => {
        const bankId = event.target.value;
        console.log('handleSelectBank bankId', bankId);
        const selectedBank = bank.find(bank => bank.Id === parseInt(bankId));
        setSelectedBank(selectedBank);

    };

    // console.log('selectedBanks', selectedBank);

    const handleSelectTerms = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedTermIds = selectedOptions.map(option => parseInt(option.value));
        const selectedTermObjects = selectedTermIds.map(id => terms.find(value => value.Id === id));
        setSelectedTerms(selectedTermObjects);
    }

    const handleGeneratePdf = async (event) => {
        event.preventDefault();
        const element = printRef.current;
        element.classList.add('pdf-content');

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const width = imgWidth * scale;
        const height = imgHeight * scale;

        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        pdf.addImage(imgData, 'PNG', x, y, width, height);
        pdf.save('download.pdf');

        element.classList.remove('pdf-content');
    };

    const printRef = useRef();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const generateRandomInvoiceNumber = () => {
        const randomNumber = Math.random() * 1000000000;
        const invoiceNumber = 'INV' + Math.floor(randomNumber).toString();
        return invoiceNumber;
    };

    const { t } = useTranslation('invoice');

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <SideNav />
                        <div className='background'>
                            <h1 className='heading-invoice'>{t("Generate Invoice")}</h1>
                            <div className='signup-form-2'>
                                <form className='form-log' onSubmit={handleGeneratePdf}>
                                    <div className='input-div'>
                                        <Input
                                            type="date"
                                            placeholder={t("Date")}
                                            value={date}
                                            className='input-field'
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <Input
                                            type="date"
                                            placeholder={t("Due Date")}
                                            value={dueDate}
                                            className='input-field'
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>

                                    {date && dueDate && (
                                        <div className='select-item-tax'>
                                            <div>
                                                <label htmlFor='items'>{t("Select Items")}:</label> <br />
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
                                                        <label>{t("Select Taxes")}:</label> <br />
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
                                                <label htmlFor='bank'>{t("Select Bank")}:</label> <br />
                                                <select onChange={handleSelectBank} className='invoice-select' name='bank'>
                                                    {bank?.map((val) => (
                                                        <option key={val?.Id} value={val?.Id}>
                                                            {val?.BankInfo}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor='terms'>{t("Select Terms and Conditions")}:</label> <br />
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
                                    <div ref={printRef} >
                                        {selectedItems.length > 0 && (
                                            <div>
                                                <h1>{t("Invoice")}</h1>
                                                <p> <b>Invoice no:</b> {generateRandomInvoiceNumber()}</p>
                                                <div className='date-payment-info'>
                                                    <div>
                                                        <h4>{t("Date")}</h4>
                                                        <p> <b>{t("Date")}:</b>  {formatDate(date)}</p>
                                                        <p><b>{t("Due Date")}:</b> {formatDate(dueDate)}</p>
                                                    </div>

                                                    <div className='bank'>
                                                        <h4>{t("Payment Information")}</h4>
                                                        <p>{selectedBank?.BankInfo}</p>
                                                        <p>{selectedBank?.OtherDescription}</p>
                                                    </div>
                                                </div>

                                                <table className='item-select-table' >
                                                    <thead>
                                                        <tr className='no-border-bottom'>
                                                            <th className='no-border-bottom' >{t("Name")}</th>
                                                            <th className='no-border-bottom'>{t("Quantity")}</th>
                                                            <th className='no-border-bottom' >  {t("Unit Price")}</th>
                                                            <th className='no-border-bottom' >{t("Total")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedItems.map(item => (
                                                            <tr key={item.Id} >
                                                                <td className='no-border-bottom' >
                                                                    {item.ItemName}
                                                                </td>
                                                                <td className='no-border-bottom' >
                                                                    <Input
                                                                        type="number"
                                                                        value={quantities[item.Id]}
                                                                        onChange={(e) => handleQuantityChange(item.Id, e)}
                                                                        style={{ width: '150px' }}
                                                                        min="1"
                                                                    />
                                                                </td>

                                                                <td className='no-border-bottom' >${item.UnitPrice}</td>

                                                                <td className='no-border-bottom' >
                                                                    ${finalPrice(item.UnitPrice, item.Tax, item.Discount, quantities[item.Id])}
                                                                </td>
                                                            </tr>
                                                        ))}

                                                        <tr >
                                                            <td className='no-border-bottom' colSpan='2'></td>
                                                            <td className='no-border-bottom' > <b>{t("Sub Total")}</b> </td>
                                                            <td className='no-border-bottom' >${subTotal}</td>
                                                        </tr>

                                                        {selectedTax.map((tax) => {
                                                            return (
                                                                <tr>
                                                                    <td colSpan='2' ></td>
                                                                    <td >{tax?.TaxName}</td>
                                                                    <td >${parseFloat((tax?.TaxRate / 100) * subTotal).toFixed(2)}</td>
                                                                </tr>
                                                            )
                                                        })}

                                                        <tr className='no-border-bottom'>
                                                            <td className='no-border-bottom' colSpan='2' ></td>
                                                            <td className='no-border-bottom' > <b>{t("Total Tax")}</b> </td>
                                                            <td className='no-border-bottom' >${totalTax}</td>
                                                        </tr>

                                                        <tr >
                                                            <td colSpan='2'></td>
                                                            <td > <b>{t("GRAND TOTAL")}</b> </td>
                                                            <td >${grandTotal}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {selectedBank || selectedTax.length > 0 ? (
                                                    <>
                                                        <div className='term'>
                                                            <h4>{t("Terms and Conditions")}</h4>
                                                            {selectedTerms.map((value) => {
                                                                return (
                                                                    <>
                                                                        <p>{value?.TermsCondition}</p>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>

                                    <FormButton text="Generate Invoice" />
                                    <p className='form-para-goback' onClick={() => navigate('/home')}>{t("Go Back")}</p>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}
