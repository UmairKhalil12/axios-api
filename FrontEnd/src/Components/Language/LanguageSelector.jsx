// LanguageSelector.jsx
import "./LanguageSelector.css"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {

    const { i18n } = useTranslation();

    const [language, setLanguage] = useState( i18n.language || 'en');

    const changeLanguage = (lng) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <select value={language} onChange={(e) => changeLanguage(e.target.value)} >
                <option value="en" >English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
