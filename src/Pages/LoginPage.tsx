import React from 'react';
import './LoginPage.scss';
import FormContainer from '../Container/Login/FormContainer';

function LoginPage() {
    return (
        <div className="login-page">
            <div className="inner">
                <h1>Beomlog</h1>
                <FormContainer />
            </div>
        </div>
    );
}

export default LoginPage;