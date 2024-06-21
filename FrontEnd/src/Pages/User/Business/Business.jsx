import React, { useCallback, useEffect } from 'react'
import "./Business.css"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_STAFF_BY_ID, GET_BUSINESS_BY_ID, GET_STAFF_METHOD } from '../../../Axios/axios';
//import Navbar from "../../../Components/Navbar/Navbar"
import Loader from '../../../Components/Loader/Loader';
import Button from '../../../Components/Button/Button';
import SideNav from '../../../Components/SideNav/SideNav';
import { useTranslation } from 'react-i18next';

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
            const res = await GET_BUSINESS_BY_ID(`IMBusiness/BusinessGetById?Id=${ID}`);
            const res2 = await GET_STAFF_METHOD(`IMUserRegistration/GetAllStaffs?UserID=${ID}`);
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
            await DELETE_STAFF_BY_ID(`IMUserRegistration/DeleteUser?Id=${id}`);
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

    const { t } = useTranslation('business');

    return (
        <>
            <SideNav />
            {loading ? <Loader /> : (
                <div className='business-container'>
                    <h1 className='heading-business'>{t("Business Data")}</h1>
                    {business?.map((value, index) => {
                        return (
                            <div className='business-info-main'>
                                {/* {console.log('business by id', value)} */}
                                <div className='cover-container'>
                                    <img src={value?.BusinessLogo} alt={value?.BusinessName} className='business-cover' />
                                </div>

                                <div>
                                    <br />
                                    <Button text={t("Add Staff")} onClick={() => { navigate(`/addStaff/${businessId}`) }} />
                                    <h1>{value?.BusinessName}</h1>
                                    <div className='business-info'>
                                        <p><span><b>{t("Owner's Name")} : </b></span>{value?.BusinessOwnerName}</p>
                                        <p><span><b>{t('Website')}: </b></span>{value?.WebSite}</p>
                                        <p><span><b>{t('Business Number')} : </b></span>{value?.BusinessNumber}</p>
                                        <p><span><b>{t('Email')} : </b></span>{value?.Email}</p>
                                    </div>
                                    {staff.length > 0 ? <h3>{t("Staffs")}</h3> : ""}
                                    {staff.length > 0 ? (
                                        <div className='staff-table'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{t('Name')}</th>
                                                        <th>{t('Email')}</th>
                                                        <th>{t('Number')}</th>
                                                        <th>{t('Address')}</th>
                                                        <th>{t('Actions')}</th>
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
                                                                        <Button text={t('Edit')} onClick={() => navigate(`/editStaff/${value?.Id}`)} />
                                                                        <Button text={t('Remove')} onClick={() => removeStaff(value?.Id)} />
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
