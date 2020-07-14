import React, { useEffect, useState } from 'react';
import { PostState, getPost, deletePost } from '../../Modules/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import './PostContainer.scss';
import Loader from '../../Components/Shared/Loader';
import Button from '../../Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import { loadDialog } from '../../Modules/dialog';

type PostContainerProps = {
    postId: string
}

function PostContainer({ postId }: PostContainerProps) {

    const post: PostState = useSelector((state: RootState) => state.post);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const isWriter = user.uid === post.uid;

    useEffect(() => {
        try {
            dispatch(
                getPost(postId)
            );
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }, [dispatch, postId]);


    //////// dispatch messages /////////////

    const dispatchDeleteSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Delete Complete',
                'The post is deleted successfully.'
            )
        );
    };

    const dispatchDeleteWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Delete Failed',
                'An error has occured. Please try again.'
            )
        );
    };

    //////// onclick methods ///////////////

    const onClickDeleteButton = () => {
        setIsLoading(true);
        try {
            dispatch(
                deletePost(postId)
            );
            setIsLoading(false);
            dispatchDeleteSuccessDialog();
            routerHistory.push({ pathname: '/home' });
        } catch (e) {
            setIsLoading(false);
            console.log(e);
            dispatchDeleteWarningDialog();
        }
    };

    const onClickEditButton = () => {
        routerHistory.push({ pathname: `/update/${postId}` })
    }

    if (post.error) {
        return <div>There is an error: {post.error}</div>;
    }

    return (
        <div className="post-container">
            {
                isLoading
                ? <Loader />
                : <>
                    {isWriter
                        ? <>
                            <Button type="button" onClick={onClickEditButton}>
                                Edit Post
                            </Button>
                            <Button isFilled type="button" onClick={onClickDeleteButton}>
                                Delete
                            </Button>
                        </>
                        : null
                    }
                    <div>{postId}</div>
                    <h1>{post.title}</h1>
                    <h3>{post.category}</h3>
                    <div dangerouslySetInnerHTML={{__html: post.editorData}}></div>
                    <div>
                        <span>{post.uid}</span>
                        <span>{post.userData.email}</span>
                        <span>{post.userData.name}</span>
                        <div>{post.time.toString()}</div>
                    </div>
                </>
            }
        </div>
    );
}

export default PostContainer;