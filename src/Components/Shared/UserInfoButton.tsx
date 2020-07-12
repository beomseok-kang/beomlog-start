import React from 'react';
import './UserInfoButton.scss';

type UserInfoButtonProps = {
    imgUrl: string;
    onClick: () => void;
};

function UserInfoButton({ imgUrl, onClick }: UserInfoButtonProps ) {
    return (
        <div className="user-info" onClick={onClick}>
            <img src={imgUrl} alt="User"/>
        </div>
    );
}

UserInfoButton.defaultProps = {
    imgUrl: "https://ssl.pstatic.net/static/common/myarea/myInfo.gif"
}

export default UserInfoButton;