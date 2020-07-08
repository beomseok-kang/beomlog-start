import React, { useState } from 'react';
import Input from '../../Components/Shared/Input';
import Button from '../../Components/Shared/Button';
import './FormContainer.scss';
import { useDispatch } from 'react-redux';
import { loadDialog } from '../../Modules/dialog'

type FormValue = {
    email: string;
    password: string;
}

function FormContainer() {

    /////// reducerState ///////////////

    const dispatch = useDispatch();

    /////// useState ///////////////////

    const initialValuesState: FormValue = {
        email: '',
        password: ''
    };

    const [values, setValues] = useState<FormValue>(initialValuesState);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    /////// functions /////////////////

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(values.password.length >= 8) {
            setIsValid(true);
            console.log(values);
            dispatch(
                loadDialog(
                    'success',
                    'Signed In',
                    'You are signed in successfully.'
                )
            );
        } else {
            setIsValid(false);
            console.log('wrong input');
            dispatch(
                loadDialog(
                    'warning',
                    'Error',
                    'There was an error signing you in. Please try again.'
                )
            );
        }
        setValues(initialValuesState);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.type]: event.target.value
        });
    }

    return (
    <form onSubmit={onSubmit}>
        <div className="input-container">
            <Input
                onChange={onChange}
                value={values.email}
                type="email"
                placeholder="Email"
                isValid={isValid}
            />
            <Input
                onChange={onChange}
                value={values.password}
                type="password"
                placeholder="Password"
                isValid={isValid}
            />
        </div>
        <div className="button-container">
            <Button type="submit" isFilled>Sign In</Button>
        </div>
        <div className="button-container">
            <Button type="button">Sign Up</Button>
        </div>
    </form>
    );
}

export default FormContainer;