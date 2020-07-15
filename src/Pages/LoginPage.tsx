import React from 'react';
import './LoginPage.scss';
import FormContainer from '../Container/Login/FormContainer';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-container inner">
                <h1>Beomlog</h1>
                <FormContainer />
                <div className="link-to-container">
                    Don't have an account? <Link to="/auth/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;