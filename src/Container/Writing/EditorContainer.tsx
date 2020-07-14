import React, { useState } from 'react';
import Editor from '../../Components/WritingPage/Editor';
import './EditorContainer.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import { uploadPost } from '../../Modules/post';
import Loader from '../../Components/Shared/Loader';
import { loadDialog } from '../../Modules/dialog';
import { useHistory } from 'react-router-dom';

function EditorContainer() {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    ////////// state //////////////////

    const initialCategory = '';
    const initialData = '';
    const initialTitle = '';

    const [category, setCategory] = useState<string>(initialCategory);
    const [data, setData] = useState<string>(initialData);
    const [title, setTitle] = useState<string>(initialTitle);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeEditor = (event: any, editor: any) => {
        setData(editor.getData());
    }
    const onChangeTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

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

    ////////// click & submit ///////////////

    const onClick = () => {
        if (!user) {
            alert('You have to sign in to upload any post.');
        } else {
            const time = new Date();
            const postId = `${time.toISOString()}_${user.uid}`;

            setIsLoading(true);
    
            try {
                dispatch(
                    uploadPost(
                        {
                            postId,
                            title,
                            editorData: data,
                            category,
                            uid: user.uid ? user.uid : 'no userdata',
                            time,
                            userData: {
                                email: user.email ? user.email : 'no userdata',
                                name: user.name ? user.name : 'no userdata',
                                imgUrl: user.imgUrl ? user.imgUrl : 'no userdata'
                            }
                        }
                    )
                );
                dispatchUploadSuccessDialog();
                setIsLoading(false);
                routerHistory.push({ pathname: `/post/${postId}` });
            } catch (e) {
                console.log(e);
                dispatchUploadWarningDialog();
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <div className="editor-container">
                { isLoading
                ? <Loader />
                : <>
                    <input type="name" value={title} onChange={onChangeTitleInput}/>
                    <Editor onChange={onChangeEditor}/>
                    <button onClick={onClick}>Submit</button>
                </>}
            </div>
        </>
    );
}

export default EditorContainer;