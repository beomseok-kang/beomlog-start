import React from 'react';
import './Input.scss';

type InputProps = {
    id: string;
    value: string;
    type: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean | null;
    autoFocus: boolean;
}

function Input({ id, value, type, placeholder, onChange, isValid, autoFocus }: InputProps) {

    const className = isValid === false? "text-input invalid" : "text-input";

    return (
        <div>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={className}
                autoFocus={autoFocus}
            />
        </div>
    );
    
}

Input.defaultProps = {
    isValid: null,
    autoFocus: false
};

export default Input;

