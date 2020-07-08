import React from 'react';
import './Input.scss';

type InputProps = {
    value: string;
    type: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean | null;
}

function Input({ value, type, placeholder, onChange, isValid }: InputProps) {

    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={isValid === false? "invalid" : ""}
            />
        </div>
    );
    
}

Input.defaultProps = {
    isValid: null
};

export default Input;

