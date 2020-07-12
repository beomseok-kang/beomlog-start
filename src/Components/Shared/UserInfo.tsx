import React from 'react';
import './UserInfo.scss';
import { UserData } from '../../api/firebase';

type UserInfoProps = {
    userData?: UserData;
    showUserInfo: boolean;
    onClickSignOutButton: () => void;
    onClickLoginButton: () => void;
};

function UserInfo({
    userData,
    showUserInfo,
    onClickSignOutButton,
    onClickLoginButton
}: UserInfoProps) {

    return (
        <div className={"user-info-wrapper " + (showUserInfo? "on" : "off")}>
            <h3>{userData ? userData.name : null}</h3>
            <p>{userData ? userData.email : null}</p>
            <div className="user-info-button-wrapper">
                {
                    userData
                    ? <button onClick={onClickSignOutButton}>Sign Out</button>
                    : <button onClick={onClickLoginButton}>Sign In</button>
                }
            </div>
        </div>
    );

}

export default UserInfo;