import React, { useState } from 'react';
import UserSetting from '../../Components/UserSettingsPage/UserSetting';
import CategorySetting from '../../Components/UserSettingsPage/CategorySetting';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import Button from '../../Components/Shared/Button';
import Loader from '../../Components/Shared/Loader';
import { updateUserData, getUserData } from '../../Modules/user';
import { loadDialog } from '../../Modules/dialog';
import { useHistory } from 'react-router-dom';
import { uploadImgAndUpdateDatabase } from '../../api/firebase';

function UserSettingsContainer() {

    const user = useSelector((state: RootState) => state.user);
    const loading = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();
    const routerHistory = useHistory();
    
    const [nickname, setNickname] = useState(user.name ? user.name : 'no nickname');
    const [showAddItem, setShowAddItem] = useState(false);
    const [imgFile, setImgFile] = useState<null | File>(null);
    const [imgFileDir, setImgFileDir] = useState<any>(null);
    const [categoriesTemp, setCategoriesTemp] = useState(user.categories ? user.categories : {});
    const [categoryInputValue, setCategoryInputValue] = useState('');


    ////// dispatch dialogs ////////////////////////

    const dispatchUpdateSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'User Settings Updated',
                'User settings are updated successfully.'
            )
        );
    };
    const dispatchUpdateWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Error',
                'An error has occured. Please try again.'
            )
        );
    };

    /////// file reader /////////////
    const fr = new FileReader();
    fr.onload = function () {
        setImgFileDir(fr.result);
    }

    ////// onchange/onclick ////////////////////////
    const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };
    const onChangeImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImgFile(event.target.files? event.target.files[0] : null);
        if (event.target.files && event.target.files[0]) fr.readAsDataURL(event.target.files[0]);
    }
    const onClickAddButton = () => {
        if (!showAddItem) {
            setShowAddItem(true);
        } else if (categoryInputValue !== "") {
            setCategoriesTemp(
                Object.assign({}, {
                    [categoryInputValue]: {
                        category: categoryInputValue,
                        numOfPosts: 0
                    }
                }, categoriesTemp
                )
            );
            setCategoryInputValue('');
        } else {
            alert('Please put in any value inside the input!');
        }
    };
    const onClickXButton = () => {
        setShowAddItem(false);
    }
    const onClickSubmitButton = async () => {

        try {
            dispatch(
                updateUserData(
                    {
                        uid: user.uid,
                        name: nickname,
                        imgUrl: user.imgUrl ? user.imgUrl : 'no userdata',
                        email: user.email ? user.email : 'no userdata',
                        categories: categoriesTemp
                    }
                )
            );
            if (imgFileDir) await uploadImgAndUpdateDatabase(user.uid!, imgFile!);
            dispatch(
                getUserData(
                    user.uid
                )
            );
            dispatchUpdateSuccessDialog();
            routerHistory.push({ pathname: '/home' });
        } catch (e) {
            console.log(e);
            dispatchUpdateWarningDialog();
        }
    };
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryInputValue(event.target.value);
    }

    

    return (
        <div className="user-setting-container inner">
            {
                loading
                ? <Loader />
                :
                <>
                    <UserSetting
                        userState={user}
                        nicknameValue={nickname}
                        newImgFileDir={imgFileDir}
                        onChangeNicnameValue={onChangeNickname}
                        onChangeImgFile={onChangeImgFile}
                    />
                    <CategorySetting
                        categories={categoriesTemp}
                        onClickAddButton={onClickAddButton}
                        onClickXButton={onClickXButton}
                        onInputChange={onInputChange}
                        inputValue={categoryInputValue}
                        showAddItem={showAddItem}
                    />
                    <Button type="submit" onClick={onClickSubmitButton}>
                        Submit
                    </Button>
                </>
            }
        </div>
    );
}

export default UserSettingsContainer;