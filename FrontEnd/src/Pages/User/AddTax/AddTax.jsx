import React, { useCallback, useEffect, useState } from 'react';
import "./AddTax.css";
import { GET_BUSINESS_BY_ID, INSERT_DATA, UPDATE_DATA } from '../../../Axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../../Components/SideNav/SideNav';
import { useSelector } from 'react-redux';
import Input from '../../../Components/Input/Input';
import FormButton from '../../../Components/FormButton/FormButton';
import { useTranslation } from 'react-i18next';


export default function AddTax() {
    const [taxName, setTaxName] = useState('');
    const [taxRate, setTaxRate] = useState('');

    const userData = useSelector(state => state.user.userData);
    console.log(userData);
    const userId = userData[0].UserID

    const { id } = useParams();

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        if (taxName !== '' && taxRate !== '') {
            if (!id) {
                try {
                    await INSERT_DATA(`IMGeneralSetup/TaxSetupOn?TaxName=${taxName}&TaxRate=${taxRate}&BusinessId=${''}&CreateBy=${userId}`)
                        .then(() => {
                            window.alert('Tax Added Successfully');
                            navigate("/showTax");
                        })
                } catch (error) {
                    console.log("error adding taxes", error.message);
                }
            }
            else if (id) {
                try {
                    await UPDATE_DATA(`IMGeneralSetup/TaxSetupOn?Id=${id}&TaxName=${taxName}&TaxRate=${taxRate}&ModifyBy=${userId}`)
                        .then(() => {
                            window.alert('Tax Updated Successfully');
                            navigate('/showTax')
                        })
                } catch (error) {
                    console.log("Error updating tax :id", id, error.message)
                }
            }
        }
        else {
            window.alert("All fields are required")
        }
    }

    const getFetchBYId = useCallback(async () => {
        try {
            await GET_BUSINESS_BY_ID(`IMGeneralSetup/TaxSetupGetById?Id=${id}`)
                .then((res) => {
                    setTaxName(res[0].TaxName);
                    setTaxRate(res[0].TaxRate);
                })

        } catch (error) {
            console.log("Error fetching tax by id", id, error.message);
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getFetchBYId();
        }

    }, [id, getFetchBYId])

    const {t} = useTranslation('tax');

    return (
        <>
            <SideNav />
            <div className='background' >
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleForm}>
                        <Input
                            placeholder={t('Tax Name')}
                            value={taxName}
                            className='input-field'
                            onChange={(e) => setTaxName(e.target.value)}
                        />

                        <Input
                            placeholder={t('Tax Rate')}
                            value={taxRate}
                            className='input-field'
                            onChange={(e) => setTaxRate(e.target.value)}
                        />

                        <FormButton text={id ? t("Update Tax") : t("Add Tax")} />
                        <p className='form-para-goback' onClick={() => navigate('/showTax')}>{t('Go Back')}</p>

                    </form >
                </div>
            </div>
        </>
    )
}
