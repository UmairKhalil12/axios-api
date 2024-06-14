import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Import routing components
import { useTranslation } from 'react-i18next';

const DynamicContent = () => {
    const { t } = useTranslation();

    return (
        <Switch>
            <Route path="/page1">
                <div>{t('page1.content')}</div>
            </Route>
            <Route path="/page2">
                <div>{t('page2.content')}</div>
            </Route>
            {/* Add more routes as needed */}
        </Switch>
    );
};

export default DynamicContent;
