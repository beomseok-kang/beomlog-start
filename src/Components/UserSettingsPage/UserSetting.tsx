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
            <div>{userState.email}</div>
            <input type="name" value={nicknameValue} onChange={onChangeNicnameValue}/>
            <input type="name" value={phraseValue} onChange={onChangePhraseValue}/>
            
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