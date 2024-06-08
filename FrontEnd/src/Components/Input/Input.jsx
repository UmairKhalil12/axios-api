import './Input.css';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

export default function Input({ label, placeholder, onChange, type, value }) {

    const renderEmail = () => {
        if (type === "email") {
            return <MdOutlineMailOutline size={25} className='email-icn' />
        }
    }

    const renderPass = () => {
        if (type === "password") {
            return <MdLockOutline size={25} className='password-icn' />
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
                className='input'
            />
            {renderEmail()}
            {renderPass()}

        </div>
    )
}

