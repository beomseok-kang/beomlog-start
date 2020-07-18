import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

type LogoProps = {
    isHome: boolean;
}

function Logo({ isHome }: LogoProps) {

    const className = isHome ? 'logo home' : 'logo';

    return (
        <Link to="/home" className={className}>
            Beomlog
        </Link>
    );
}

Logo.defaultProps = {
    isHome: false
}

export default React.memo(Logo);