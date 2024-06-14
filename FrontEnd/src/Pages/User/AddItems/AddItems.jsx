import React, { useCallback, useEffect, useState } from 'react'
import FormButton from '../../../Components/FormButton/FormButton';
import Input from '../../../Components/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../../Components/SideNav/SideNav';
import { GET_BUSINESS_BY_ID, INSERT_DATA, UPDATE_DATA } from '../../../Axios/axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function AddItems() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemType, setItemType] = useState('');
    const [tax, setTax] = useState('');
    const [discount, setDiscount] = useState('');
    const [itemDetails, setItemDetails] = useState('');

    const{t} = useTranslation(); 

    const userData = useSelector(state => state.user.userData);
    console.log(userData);
    const userId = userData[0].UserID

    const navigate = useNavigate();
    const { id } = useParams();
    console.log('Add items by id ', id)

    const handleForm = async (e) => {
        e.preventDefault();
        if (itemName !== '' && itemPrice !== '' && itemType !== '' && itemDetails !== '' && discount !== '') {
            if (!id) {
                try {
                    await INSERT_DATA(`IMItemSetup/ItemSetupOn?ItemName=${itemName}&UnitPrice=${itemPrice}&UnitType=${itemType}&Tax=${tax}&Discount=${discount}&DiscountType=${true}&ItemDetails=${itemDetails}&CreateBy=${userId}`)
                        .then(() => {
                            window.alert('Item inserted sucessfully');
                            navigate('/home');
                        })
                }
                catch (error) {
                    console.log("Error inserting items", error.message);
                }
            }

            if (id) {
                try {
                    await UPDATE_DATA(`IMItemSetup/ItemSetupOn?Id=${id}&ItemName=${itemName}&UnitPrice=${itemPrice}&UnitType=${itemType}&Tax=${tax}&Discount=${discount}&DiscountType=${true}&ItemDetails=${itemDetails}&CreateBy=${userId}`)
                    .then(()=>{
                        window.alert("updated data sucessfully");
                        navigate('/home');
                    });
                }
                catch (error) {
                    console.log("Error updating item of id", id, error.message);
                }
            }

        }
        else {
            window.alert("All fields are required");
        }
    }

    const getItemById = useCallback(async () => {
        try {
            await GET_BUSINESS_BY_ID(`IMItemSetup/ItemSetupGetById?Id=${id}`)
                .then((res) => {
                    //console.log('res get item by id', res);
                    setItemName(res[0].ItemName);
                    setItemPrice(res[0].UnitPrice);
                    setItemDetails(res[0].ItemsDetails);
                    setItemType(res[0].UnitType);
                    setTax(res[0].Tax);
                    setDiscount(res[0].Discount);
                })
        }
        catch (error) {
            console.log("Error getting item by id", id, error.message);
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getItemById();
        }
    }, [id, getItemById])

    return (
        <>
            <SideNav />
            <div className='background' >
                <h1 style={{textAlign : 'center'}}>{t("Add Items")}</h1>
                <div className='signup-form-2'>
                    <form className='form-log' onSubmit={handleForm}>
                        <div className='input-div'>
                            <Input
                                placeholder={t('Item Name')}
                                value={itemName}
                                className='input-field'
                                onChange={(e) => setItemName(e.target.value)}
                            />

                            <Input
                                placeholder={t('Item Price')}
                                value={itemPrice}
                                className='input-field'
                                onChange={(e) => setItemPrice(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder={t('Item Type')}
                                value={itemType}
                                className='input-field'
                                onChange={(e) => setItemType(e.target.value)}
                            />

                            <Input
                                placeholder={t('Tax')}
                                value={tax}
                                className='input-field'
                                onChange={(e) => setTax(e.target.value)}
                            />
                        </div>

                        <div className='input-div'>
                            <Input
                                placeholder={t('Discount')}
                                className='input-field'
                                value={discount}
                                onChange={(e) => { setDiscount(e.target.value) }}
                            />

                            <Input
                                placeholder={t('Item Details')}
                                value={itemDetails}
                                className='input-field'
                                onChange={(e) => setItemDetails(e.target.value)}
                            />
                        </div>
                        <FormButton text={id ? t("Update Item") : t("Add Item")} />
                        <p className='form-para-goback' onClick={() => navigate('/home')} >{t('Go Back')}</p>
                    </form>
                </div>
            </div>
        </>
    )
}
