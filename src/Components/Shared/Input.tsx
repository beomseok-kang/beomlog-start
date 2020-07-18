import React from 'react';
import './Input.scss';

type InputProps = {
    id: string;
    value: string;
    type: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean | null;
}

function Input({ id, value, type, placeholder, onChange, isValid }: InputProps) {

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
            />
        </div>
    );
    
}

Input.defaultProps = {
    isValid: null
};

export default Input;

