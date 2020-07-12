import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

function Logo() {

    return (
        <Link to="/home" className="logo">
            Beomlog
        </Link>
    );
}

export default Logo;