import React from 'react';
import { UserState } from '../../Modules/user';
import './UserSetting.scss';

type UserSettingProps = {
    userState: UserState;
    nicknameValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function UserSetting({ userState, nicknameValue, onChange }: UserSettingProps) {
    return (
        <div className="user-setting-wrapper">
            <div>{userState.email}</div>
            <input type="name" value={nicknameValue} onChange={onChange}/>
            <img src={userState.imgUrl} alt="profile"/>
        </div>
    );
}
export default UserSetting;