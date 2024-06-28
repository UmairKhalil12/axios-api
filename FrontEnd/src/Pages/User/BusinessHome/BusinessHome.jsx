import "./BusinessHome.css"
import React, { useCallback, useEffect, useState } from 'react'
import { FiMail, FiPhone, FiLink, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../../Components/Accordian/Accordian';
import Button from '../../../Components/Button/Button';
import { GET_DATA_BY_USER, GET_DELETE_BY_ID } from '../../../Axios/axios';
//import bg from '../../../images/bg.jpg'
import Loader from '../../../Components/Loader/Loader';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

export default function BusinessHome() {
    const [businessData, setBusinessData] = useState([]);
    const userData = useSelector(state => state?.user?.userData);
    const userID = userData[0].UserID;

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleDelete = async (index) => {
        try {
            await GET_DELETE_BY_ID(`IMBusiness/DeleteBusiness?Id=${index}`);
            window.alert("Deleted sucessfully");
        }
        catch (error) {
            console.log(`error deleting data of id ${index} `, error.message);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID) {
                    const data = await GET_DATA_BY_USER(`IMBusiness/GetById?CreateBy=${userID}`);
                    setBusinessData(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [userID, handleDelete]);

    const { t } = useTranslation('business');


    return (
        <>
            {loading ? <Loader /> : (
                <div className='main-home'>
                    <div>
                        <h1 className='home-heading' >{t("Businesses")}</h1>
                        <div className='accordion-container'>
                            {businessData?.map((business, index) => (
                                <Accordion key={index} title={business.BusinessName}>
                                    <div className='accordion-content' >
                                        <div onClick={() => navigate(`/showBusiness/${business?.Id}`)}>
                                            <p><FiUser /> <strong>{t("Owner Name")}:</strong> {business.BusinessOwnerName}</p>
                                            <p><FiLink /> <strong>{t("Website")}:</strong> {business.WebSite}</p>
                                            <p><FiMail /> <strong>{t("Email")}:</strong> {business.Email}</p>
                                            <p><FiPhone /> <strong>{t("Phone")}:</strong> {business.BusinessNumber}</p>
                                        </div>
                                        <div className='accordion-actions'>
                                            <Button onClick={() => navigate(`/updatedata/${business?.Id}`)} text={t("Edit")} />
                                            <Button onClick={() => handleDelete(business?.Id)} text={t("Delete")} />
                                        </div>
                                    </div>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
