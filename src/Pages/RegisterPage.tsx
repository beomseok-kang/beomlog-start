import React from 'react';
import './LoginPage.scss';
import RegisterFormContainer from '../Container/Register/RegisterFormContainer';
import { Link } from 'react-router-dom';

function RegisterPage () {
    return (
        <div className="login-page">
            <div className="inner">
                <h1>Beomlog</h1>
                <RegisterFormContainer />
                <div className="link-to-container">
                    Already have an account? <Link to="/auth">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;