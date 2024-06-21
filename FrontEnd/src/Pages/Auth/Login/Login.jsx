import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { GET_METHOD } from '../../../Axios/axios';
import Input from '../../../Components/Input/Input';
import { useDispatch } from 'react-redux';
import { emailValidation } from '../../../EmailValidation/EmaiValidation';
import FormButton from '../../../Components/FormButton/FormButton';
import user_img from '../../../images/user-icon.png'
import { useTranslation } from 'react-i18next';
import LanguageForm from '../../../Components/Language/LanguageForm';
import ColorForm from '../../../Components/Color/ColorForm';
//import { colorInfo } from '../../../store/userSlice';


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation('form');

    const handleLoginForm = async (e) => {
        e.preventDefault();
        if (email !== '' && pass !== '') {
            if (emailValidation(email)) {
                await GET_METHOD(`IMUserRegistration/AdminLogin?Email=${email}&Password=${pass}`, dispatch)
                    .then(() => {
                        navigate('/home');
                    })
            }
            else {
                window.alert('email is not correct');
            }
        }
        else {
            window.alert('All fields are required');
        }

    }


    return (
        <>
            <div className='form-bg'>
                <div className='login-form'>
                    <form className='form-log' onSubmit={handleLoginForm}>
                        <div>
                            <img src={user_img} alt='user icon png' className='user-icon' />
                        </div>
                        <Input
                            placeholder={t('Email')}
                            className='input-field'
                            value={email}
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <Input
                            placeholder={t('Password')}
                            className='input-field'
                            value={pass}
                            type="password"
                            onChange={(e) => { setPass(e.target.value) }}
                        />

                        <FormButton text={t('Login')} />
                        <p className="signup-para" onClick={() => navigate('/signup')}>{t('No account? Signup')}</p>
                    </form>
                </div>
                <div className='language-btn-container'>
                    <LanguageForm />
                </div>

                <ColorForm />


            </div >
        </>
    )
}
