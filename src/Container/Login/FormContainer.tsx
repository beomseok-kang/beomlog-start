import React, { useState } from 'react';
import Input from '../../Components/Shared/Input';
import Button from '../../Components/Shared/Button';
import './FormContainer.scss';
import { signIn } from '../../api/firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadDialog } from '../../Modules/dialog';

type FormValue = {
    email: string;
    password: string;
}

function FormContainer() {

    const routerHistory = useHistory();
    const dispatch = useDispatch();

    const dispatchSignInSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Signed In',
                'You are signed in successfully.'
            )
        );
    };
    const dispatchSignInWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Error',
                'There was an error signing you in. Please try again.'
            )
        );
    };

    /////// useState ///////////////////

    const initialValuesState: FormValue = {
        email: '',
        password: ''
    };

    const [values, setValues] = useState<FormValue>(initialValuesState);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    /////// functions /////////////////

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(values.password.length >= 8) {
            setIsValid(true);
            try {
                await signIn(values.email, values.password);
                dispatchSignInSuccessDialog();
                routerHistory.push({ pathname: '/home' });
            } catch (e) {
                dispatchSignInWarningDialog();
            }
        } else {
            setIsValid(false);
            dispatchSignInWarningDialog();
        }
        setValues(initialValuesState);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        });
    }

    return (
    <form onSubmit={onSubmit}>
        <div className="input-container">
            <Input
                id="email"
                onChange={onChange}
                value={values.email}
                type="email"
                placeholder="Email"
                isValid={isValid}
            />
            <Input
                id="password"
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
    </form>
    );
}

export default FormContainer;