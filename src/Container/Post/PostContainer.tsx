import React, { useEffect } from 'react';
import { PostState, getPost, deletePost } from '../../Modules/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import './PostContainer.scss';
import Loader from '../../Components/Shared/Loader';
import Button from '../../Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import { loadDialog } from '../../Modules/dialog';
import { getUserData } from '../../Modules/user';
import { timeStamp, time } from 'console';

type PostContainerProps = {
    postId: string
}

function PostContainer({ postId }: PostContainerProps) {

    const post: PostState = useSelector((state: RootState) => state.post);
    const user = useSelector((state: RootState) => state.user);
    const loading = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    const isWriter = user.uid === post.uid;

    useEffect(() => {
        try {
            dispatch(
                getPost(postId)
            );
        } catch (e) {
            console.log(e);
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
        try {
            dispatch(
                deletePost(
                    user.uid?user.uid:'',
                    postId,
                    post.category
                )
            );
            dispatch(
                getUserData(
                    user.uid
                )
            );
            dispatchDeleteSuccessDialog();
            routerHistory.push({ pathname: '/home' });
        } catch (e) {
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

    const time = post.time ? post.time.toDate().toString() : null;

    return (
        <div className="post-container inner">
            {
                loading
                ? <Loader />
                : <>
                    <div className="category">{post.category}</div>
                    <h1>
                        {post.title}
                        <div className="written-time">{time}</div>
                    </h1>
                    <section className="section--content">
                        <div 
                            className="content-wrapper"
                            dangerouslySetInnerHTML={{__html: post.editorData}}
                        >
                        </div>
                        <div className="post-user-info-wrapper">
                            <img src={post.userData.imgUrl} alt="profile"/>
                            <div className="user-data">
                                <div>{post.userData.name}</div>
                                <div>{post.userData.email}</div>
                            </div>
                        </div>
                    </section>
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
                </>
            }
        </div>
    );
}

export default PostContainer;