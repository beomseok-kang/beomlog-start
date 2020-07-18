import React from 'react';
import './UserInfo.scss';
import Button from './Button';

type UserData = {
    email: string;
    name: string;
    imgUrl: string;
}

type UserInfoProps = {
    userData?: UserData;
    showUserInfo: boolean;
    onClickSignOutButton: () => void;
    onClickLoginButton: () => void;
    onClickSettingsButton: () => void;
};

function UserInfo({
    userData,
    showUserInfo,
    onClickSignOutButton,
    onClickLoginButton,
    onClickSettingsButton
}: UserInfoProps) {
    
    return (
        <div className={"user-info-wrapper " + (showUserInfo? "on" : "off")}>
            <h3>{userData ? userData.name : null}</h3>
            <p>{userData ? userData.email : null}</p>
            <div className="user-info-button-wrapper">
                {
                    userData
                    ? 
                    <>
                        <button onClick={onClickSettingsButton}>Settings</button>
                        <button className="sign-out" onClick={onClickSignOutButton}>Sign Out</button>
                    </>
                    : <button onClick={onClickLoginButton}>Sign In</button>
                }
            </div>
        </div>
    );

}

export default UserInfo;