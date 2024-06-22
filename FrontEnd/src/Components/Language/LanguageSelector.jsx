// LanguageSelector.jsx
import "./LanguageSelector.css"
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {

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
        <div className="lang-selector-div">
            <select value={language} onChange={(e) => changeLanguage(e.target.value)} className="lang-select" >
                <option value="en" >English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="ur">اردو</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
