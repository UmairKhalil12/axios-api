import React, { useCallback, useEffect, useState } from 'react'
import './AddTerms.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GET_BUSINESS_BY_ID, INSERT_DATA, UPDATE_DATA } from '../../../Axios/axios';
import FormButton from '../../../Components/FormButton/FormButton';
import SideNav from '../../../Components/SideNav/SideNav';
import Input from '../../../Components/Input/Input';
import { useTranslation } from 'react-i18next';

export default function AddTerms() {
    const [termsConditions, setTermsConditions] = useState('');
    const userData = useSelector(state => state.user.userData);
    console.log(userData);
    const userId = userData[0].UserID

    const { id } = useParams();

    const navigate = useNavigate();

    const { t } = useTranslation('terms')

    const handleForm = async (e) => {
        e.preventDefault();
        if (termsConditions !== "") {
            if (!id) {
                try {
                    await INSERT_DATA(`IMGeneralSetup/TermsConditionOn?TermsCondition=${termsConditions}&BusinessId=${''}&CreateBy=${userId}`)
                        .then(() => {
                            window.alert("Data inserted sucessfully");
                            navigate('/showTerms');
                        })
                }
                catch (error) {
                    console.log("Error adding terms and conditions", error.message);
                }
            }
            else if (id) {
                try {
                    await UPDATE_DATA(`IMGeneralSetup/TermsConditionOn?Id=${id}&TermsCondition=${termsConditions}&ModifyBy=${userId}`)
                        .then(() => {
                            window.alert("update sucessfull");
                            navigate('/showTerms');
                        })
                }
                catch (error) {
                    console.log("Error updating terms and conditions by id", id, error.message);
                }

            }
        }
        else {
            window.alert("All fields are required");
        }
    }

    const getTermsByID = useCallback(async () => {
        try {
            await GET_BUSINESS_BY_ID(`IMGeneralSetup/TermsConditionGetById?Id=${id}`)
                .then((res) => {
                    setTermsConditions(res[0].TermsCondition);
                })
        }
        catch (error) {
            console.log("Error getting term by id", id, error.message);
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getTermsByID();
        }

    }, [id, getTermsByID])


    return (
        <>
            <SideNav />
            <div className='background' >
                <h1 className='heading-terms' >{id ? t('Update Terms and Conditions') : t('Add Terms and Conditions')} </h1>
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleForm}>

                        <Input
                            placeholder={t('Terms and Conditions')}
                            value={termsConditions}
                            className='input-field'
                            onChange={(e) => setTermsConditions(e.target.value)}
                        />

                        <FormButton text={id ? t('Update Terms and Conditions') : t('Add Terms and Conditions')} />
                        <p className='form-para-goback' onClick={() => navigate('/showTerms')}>{t('Go Back')}</p>
                    </form>
                </div>
            </div>
        </>
    )
}
