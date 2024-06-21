import React from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { colorInfo } from '../../store/userSlice';
import "./ColorForm.css"
import { useTranslation } from 'react-i18next';


export default function ColorForm() {
    const dispatch = useDispatch();
    const color = useSelector(state => state.user.color);
    console.log(color);

    const changeColorMode = () => {
        dispatch(colorInfo(!color));
    }
    const { t } = useTranslation('sidenav');
    return (
        <div>
            {color ?
                <div className='form-colorMode' onClick={changeColorMode} >
                    <p > <MdDarkMode size={20} /> {t("Enable Light Mode")}</p>

                </div> :
                <div className='form-colorMode' onClick={changeColorMode}>
                    <p> <MdOutlineDarkMode size={20} /> {t("Enable Dark Mode")} </p>
                </div>
            }
        </div>
    )
}
