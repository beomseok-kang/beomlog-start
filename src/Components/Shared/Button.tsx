import React from 'react';
import './Button.scss';

type ButtonProps = {
    isFilled: boolean;
    children: React.ReactNode;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
}

function Button ({
    isFilled,
    children,
    onClick,
    type
}: ButtonProps) {

    const className = isFilled ? 'btn filled' : 'btn not-filled';

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    isFilled: false
};

export default Button;

