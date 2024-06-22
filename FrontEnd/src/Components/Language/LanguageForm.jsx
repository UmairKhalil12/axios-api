import React, { useState } from 'react'
import './LanguageForm.css'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function LanguageForm() {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language || 'en');

    const changeLanguage = (lng) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language])

    return (
        <div className='lang-buttons'>
            <button className={language === 'en' ? 'lang-btn-active' : 'lang-btn'} onClick={() => changeLanguage('en')} >English</button>
            <button className={language === 'es' ? 'lang-btn-active' : 'lang-btn'} onClick={() => changeLanguage('es')}>Español</button>
            <button className={language === 'fr' ? 'lang-btn-active' : 'lang-btn'} onClick={() => changeLanguage('fr')}>Français</button>
            <button className={language === 'ur' ? 'lang-btn-active' : 'lang-btn'} onClick={() => changeLanguage('ur')}>اردو</button>
        </div>
    )
}
