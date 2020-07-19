import React from 'react';
import './UserInfo.scss';
import SmallButton from './SmallButton';

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
                        <SmallButton color="green" isFilled onClick={onClickSettingsButton}>Setting</SmallButton>
                        <SmallButton color="red" isFilled onClick={onClickSignOutButton}>Sign Out</SmallButton>
                    </>
                    : <SmallButton color="green" isFilled onClick={onClickLoginButton}>Sign In</SmallButton>
                }
            </div>
        </div>
    );

}

export default UserInfo;