import React from 'react';
import { UserState } from '../../Modules/user';
import './UserSetting.scss';

type UserSettingProps = {
    userState: UserState;
    nicknameValue: string;
    phraseValue: string;
    newImgFileDir: string | null;
    onChangePhraseValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNicnameValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeImgFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserSetting({ userState, newImgFileDir, nicknameValue, phraseValue, onChangePhraseValue, onChangeNicnameValue, onChangeImgFile }: UserSettingProps) {
    
    
    return (
        <div className="user-setting-wrapper">
            <h3>Email</h3>
            <div>{userState.email}</div>
            <h3>Nickname</h3>
            <input type="name" value={nicknameValue} onChange={onChangeNicnameValue}/>
            <h3>Self-Intro</h3>
            <input type="name" value={phraseValue} onChange={onChangePhraseValue}/>
            <h3>Profile Image</h3>
            <img src={newImgFileDir || userState.imgUrl} alt="profile"/>
            <input
                type="file"
                name="myImage"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={onChangeImgFile}
            />
        </div>
    );
}

UserSetting.defaultProps = {
    newImgFile: null
};

export default UserSetting;