import "./AddInvoice.css"
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Input from '../../../Components/Input/Input';
import FormButton from '../../../Components/FormButton/FormButton';
import SideNav from '../../../Components/SideNav/SideNav';
import { GET_BUSINESS_BY_ID, INSERT_STAFF_METHOD, UPDATE_DATA } from '../../../Axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AddInvoice() {
    const [bankInfo, setBankInfo] = useState('');
    const [description, setDescription] = useState('');
    const [qr, setQr] = useState('');
    
    const userData = useSelector(state => state.user.userData);
    console.log(userData);
    const userId = userData[0].UserID;

    const { id } = useParams();

    const navigate = useNavigate();
    
    const getInvoiceById = useCallback( async () => {
        try {
            await GET_BUSINESS_BY_ID(`IMGeneralSetup/PaymentDetailGetById?Id=${id}`)
                .then((res) => {
                    setBankInfo(res[0].BankInfo);
                    setDescription(res[0].OtherDescription);
                    setQr(res[0].QRImage);
                })

        } catch (error) {
            console.log("error getting invoice by id", id, error.message)
        }
    } ,[id])

    const handleForm = async (e) => {
        e.preventDefault();
        if (description !== '' && bankInfo !== '' && qr !== '') {
            if (!id) {
                try {
                    await INSERT_STAFF_METHOD(`IMGeneralSetup/PaymentDetailsOn?BankInfo=${bankInfo}&OtherDescription=${description}&QRImage=${qr}&BusinessId=${''}&CreateBy=${userId}`)
                        .then(() => {
                            window.alert("Invoice data inserted sucessfully");
                            navigate('/showInvoice');
                        })
                } catch (error) {
                    console.log("error getting invoice data", error.message);
                }
            }
            else if (id) {
                try {
                    await UPDATE_DATA(`IMGeneralSetup/PaymentDetailsOn?Id=${id}&BankInfo=${bankInfo}&OtherDescription=${description}&QRImage=${qr}&ModifyBy=${userId}`)
                        .then(() => {
                            window.alert("Invoice data updated sucessfully");
                            navigate("/showInvoice");
                        })
                } catch (error) {
                    console.log("error updating invoice id", id, error.message);
                }
            }

        }

    }

    useEffect(() => {
        getInvoiceById();
    }, [id , getInvoiceById])

    const {t} = useTranslation('invoice'); 


    return (
        <>
            <SideNav />
            <div className='background' >
                <h1 className="heading-items">Add Invoice</h1>
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleForm}>

                        <Input
                            placeholder={t('Bank Info')}
                            value={bankInfo}
                            className='input-field'
                            onChange={(e) => setBankInfo(e.target.value)}
                        />

                        <Input
                            placeholder={t('Description')}
                            value={description}
                            className='input-field'
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Input
                            placeholder={t('QR code')}
                            value={qr}
                            className='input-field'
                            onChange={(e) => setQr(e.target.value)}
                        />

                        <FormButton text={ id ? t("Update Invoice"): t("Add Invoice")} />
                        <p className='form-para-goback' onClick={() => navigate('/showInvoice')} >{t('Go Back')}</p>
                    </form>
                </div>
            </div>
        </>
    )
}
