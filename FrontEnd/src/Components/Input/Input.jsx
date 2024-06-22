import { useTranslation } from 'react-i18next';
import './Input.css';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";


export default function Input({ label, placeholder, onChange, type, value }) {

    const {i18n} = useTranslation(); 
    const lang = i18n.language;
    // console.log('input component',lang);

    const renderEmail = () => {
        if (type === "email") {
            return <MdOutlineMailOutline size={25} className={ lang === 'ur' ? "email-icn-ur" : 'email-icn'} />
        }
    }

    const renderPass = () => {
        if (type === "password") {
            return <MdLockOutline size={25} className={lang === 'ur' ? "password-icn-ur" : 'password-icn'} />
        }
    }



    return (
        <div>
            <label className='label'>{label}</label>
            <br />
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={ lang === 'ur' ? "input-ur" : 'input'}
            />
            {renderEmail()}
            {renderPass()}

        </div>
    )
}

