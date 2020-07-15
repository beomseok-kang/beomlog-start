import React, { useState } from 'react';
import Input from '../../Components/Shared/Input';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../api/firebase';
import { loadDialog } from '../../Modules/dialog';
import Button from '../../Components/Shared/Button';
import Loader from '../../Components/Shared/Loader';

type RegisterFormValue = {
    name: string;
    email: string;
    password: string;
    checkPassword: string;

}

const URL_TEMPORARY = 'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=20190629190225005333cf949c6b911045166174.jpg';

function RegisterFormContainer() {
    
    const routerHistory = useHistory();
    const dispatch = useDispatch();

    const dispatchSignUpSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Signed Up',
                'You are singed up successfully.'
            )
        );
    };
    const dispatchSignUpWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Error',
                'There was an error signing you up. Please try again.'
            )
        );
    };

    /////// state /////////////////////////////////////

    const initialValueState: RegisterFormValue = {
        name: '',
        email: '',
        password: '',
        checkPassword: ''
    }

    const [values,setValues] = useState<RegisterFormValue>(initialValueState);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [matchPassword, setMatchPassword] = useState<boolean>(false);

    ///////// functions //////////////////////////////

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'checkPassword') {
            if(event.target.value === values.password) {
                setMatchPassword(true);
            } else {
                setMatchPassword(false);
            }
        }
        setValues({
            ...values,
            [event.target.id]: event.target.value
        });
        
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(values.password.length >= 8
            && values.name.length >= 2
            && matchPassword) {
                setIsValid(true);
                setIsLoading(true);
                try {
                    await signUp(
                        values.email,
                        values.password,
                        {
                            name: values.name,
                            email: values.email,
                            imgUrl: URL_TEMPORARY,
                            categories: {
                                'No Category': {
                                    category: 'No Category',
                                    numOfPosts: 0
                                },
                                'All': {
                                    category: 'All',
                                    numOfPosts: 0
                                }
                            }
                        }
                    );
                    setIsLoading(false);
                    dispatchSignUpSuccessDialog();
                    routerHistory.push({ pathname: '/home' });
                } catch (e) {
                    console.log(e);
                    setIsLoading(false);
                    dispatchSignUpWarningDialog();
                }
                setValues(initialValueState);
        } else {
            setIsValid(false);
            setMatchPassword(false);
            dispatchSignUpWarningDialog();
            setValues(
                {
                    ...values,
                    password: '',
                    checkPassword: ''
                }
            )
        }
    }
    

    return (
        isLoading
        ? <Loader />
        : <form onSubmit={onSubmit}>
            <div className="input-container">
                <Input
                    id="name"
                    onChange={onChange}
                    value={values.name}
                    type="name"
                    placeholder="Nickname"
                    isValid={isValid}
                />
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
                <Input 
                    id="checkPassword"
                    onChange={onChange}
                    value={values.checkPassword}
                    type="password"
                    placeholder="Check Password"
                    isValid={matchPassword}
                />
            </div>
            <div className="button-container">
                <Button type="submit" isFilled>Sign Up</Button>
            </div>
        </form>

    );
}

export default RegisterFormContainer;