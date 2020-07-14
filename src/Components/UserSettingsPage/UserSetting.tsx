import React from 'react';
import { UserState } from '../../Modules/user';

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
            <div>{userState.imgUrl}</div>
        </div>
    );
}
export default UserSetting;