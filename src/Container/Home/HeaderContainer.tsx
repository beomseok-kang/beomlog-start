import React, { useState } from 'react';
import Logo from '../../Components/Shared/Logo';
import './HeaderContainer.scss';
import { signOut } from '../../api/firebase';
import { useHistory } from 'react-router-dom';
import UserInfoButton from '../../Components/Shared/UserInfoButton';
import HamburgerButton from '../../Components/Shared/HamburgerButton';
import UserInfo from '../../Components/Shared/UserInfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import { loadDialog } from '../../Modules/dialog';
import { removeUserData, getUserData } from '../../Modules/user';
import ToggleMenu from '../../Components/Shared/ToggleMenu';
import Darkener from '../../Components/Shared/Darkener';

export type category = {
    category: string;
    numOfPosts: number;
};

type HeaderContainerProps = {
    isHome: boolean;
}

function HeaderContainer({ isHome }: HeaderContainerProps) {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    //// state ////////////////////////

    const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
    const [showToggleMenu, setShowToggleMenu] = useState<boolean | undefined>(undefined);
    const routerHistory = useHistory();

    const headerClassName = isHome ? "home" : "";

    const dispatchRemoveUserData = () => {
        dispatch(
            removeUserData()
        );
    };
    const dispatchSignOutSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Signed Out',
                'You are signed out successfully.'
            )
        );
    };

    const onClickUserInfoButton = () => {
        setShowUserInfo(!showUserInfo);
        if (showToggleMenu) setShowToggleMenu(false);
    };
    const onClickHamburgerButton = () => {
        setShowToggleMenu(!showToggleMenu);
        if (showUserInfo) setShowUserInfo(false);
    };
    const onClickLoginButton = () => {
        routerHistory.push({ pathname: '/auth' });
    }
    const onClickSignout = async () => {
        try {
            await signOut();
            dispatchRemoveUserData();
            dispatchSignOutSuccessDialog();

        } catch (e) {
            console.log(e);
        }
    };
    const onClickSettingsButton = () => {
        routerHistory.push({ pathname: '/setting' });
    }
    const onClickMenuItem = () => {
        try {
            dispatch(
                getUserData(
                    user.uid
                )
            );
        } catch (e) {
            console.log(e);
        }
        setShowToggleMenu(false);
        setShowUserInfo(false);
    }
    const onClickUpload = () => {
        if (user.uid) {
            routerHistory.push({ pathname: '/upload' });
        } else {
            alert('Please sign in to write any post.');
        }
    }

    /////// some useful consts //////////////
    const categoriesToArray = user.categories ? Object.values(user.categories) : [];

    return (
        <>
            <header className={headerClassName}>
                <ToggleMenu
                    onClickMenuItem={onClickMenuItem}
                    showToggleMenu={showToggleMenu}
                    categories={categoriesToArray}
                    onClickUpload={onClickUpload}
                />
                <HamburgerButton showToggleMenu={showToggleMenu} onClick={onClickHamburgerButton}/>
                <Logo isHome={isHome}/>
                <UserInfoButton imgUrl={user.imgUrl} onClick={onClickUserInfoButton}/>
                <UserInfo
                    userData={
                        user.email && user.name && user.imgUrl
                        ? {
                            email: user.email,
                            name: user.name,
                            imgUrl: user.imgUrl
                        }
                        : undefined
                    }
                    showUserInfo = {showUserInfo}
                    onClickSettingsButton={onClickSettingsButton}
                    onClickSignOutButton={onClickSignout}
                    onClickLoginButton={onClickLoginButton}
                />
            </header>
            <Darkener showToggleMenu={showToggleMenu}/>
            <div className="header-behind"></div>
        </>
    );
}

HeaderContainer.defaultProps = {
    isHome: false
}

export default React.memo(HeaderContainer);