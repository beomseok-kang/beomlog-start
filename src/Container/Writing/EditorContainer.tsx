import React, { useState } from 'react';
import Editor from '../../Components/WritingPage/Editor';
import './EditorContainer.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import { uploadPost, updatePost } from '../../Modules/post';
import Loader from '../../Components/Shared/Loader';
import { loadDialog } from '../../Modules/dialog';
import { useHistory } from 'react-router-dom';
import { getUserData } from '../../Modules/user';

type EditorContainerProps = {
    isUpdating: boolean;
}

function EditorContainer({ isUpdating }: EditorContainerProps) {

    const user = useSelector((state: RootState) => state.user);
    const post = useSelector((state: RootState) => state.post);
    const loading = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    ////////// state //////////////////

    let initialCategoryLogic = '';
    if (isUpdating) {
        initialCategoryLogic = post ? post.category : ''
    } else if (user.categories) {
        initialCategoryLogic = user.categories['No Category'].category
    } else {
        initialCategoryLogic = '';
    }

    const initialCategoryValue = initialCategoryLogic;
    const initialData = isUpdating ? post.editorData : '';
    const initialTitle = isUpdating ? post.title : '';

    const [categoryValue, setCategoryValue] = useState<string>(initialCategoryValue);
    const [data, setData] = useState<string>(initialData);
    const [title, setTitle] = useState<string>(initialTitle);

    ////////// dialog ///////////////////////

    const dispatchUploadSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Upload Complete',
                'The post is uploaded successfully.'
            )
        );
    };
    const dispatchUploadWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Upload Failed',
                'An error has occured. Please try again.'
            )
        );
    };
    const dispatchUpdateSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Update Complete',
                'The post is updated successfully.'
            )
        );
    };
    const dispatchUpdateWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Update Failed',
                'An error has occured. Please try again.'
            )
        );
    };

    ////////// click & submit & onChange ///////////////

    const onClick = () => {
        const time = new Date();
        if (!user.uid) {
            alert('You have to sign in to upload any post.');
        } else if (isUpdating) {
            try {
                dispatch(
                    updatePost(
                        {
                            postId: post.postId,
                            title,
                            editorData: data,
                            category: categoryValue,
                            uid: post.uid,
                            time,
                            comments: post.comments,
                            email: post.email,
                        }
                    )
                );
                dispatch(
                    getUserData(
                        user.uid
                    )
                );
                dispatchUpdateSuccessDialog();
                routerHistory.push({ pathname: `/post/${post.postId}` });
            } catch (e) {
                console.log(e);
                dispatchUpdateWarningDialog();
            }
        } else {
            const postId = `${time.toUTCString()}_${user.uid}`;

            try {
                dispatch(
                    uploadPost(
                        {
                            postId,
                            title,
                            editorData: data,
                            category: categoryValue,
                            uid: user.uid ? user.uid : 'no userdata',
                            time,
                            comments: [],
                            email: user.email ? user.email : 'no userdata',
                        }
                    )
                );
                console.log(user.uid);
                dispatch(
                    getUserData(
                        user.uid
                    )
                );
                dispatchUploadSuccessDialog();
                routerHistory.push({ pathname: `/post/${postId}` });
            } catch (e) {
                console.log(e);
                dispatchUploadWarningDialog();
            }
        }
    };
    
    const onChangeEditor = (event: any, editor: any) => {
        setData(editor.getData());
    };
    const onChangeTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const onChangeSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryValue(event.target.value);
    };

    /////// some useful consts //////////////
    const categoriesToArray = user.categories ? Object.values(user.categories) : [];

    return (
        <div className="editor-container inner">
            { loading
            ? <Loader />
            : <>
                <select value={categoryValue} onChange={onChangeSelectCategory}>
                    {
                        user.categories
                        ? categoriesToArray.map(category => (category.category !== 'All') && (
                            <option value={category.category}>
                                {category.category}
                            </option>
                        ))
                        : null
                    }
                </select>
                <input type="name" value={title} onChange={onChangeTitleInput}/>
                <Editor data={initialData} onChange={onChangeEditor}/>
                <button onClick={onClick}>Submit</button>
            </>}
        </div>
    );
}

EditorContainer.defaultProps = {
    isUpdating: false
}

export default EditorContainer;