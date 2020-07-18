import React, { useEffect, useState } from 'react';
import { PostState, getPost, deletePost, comment, updateCommentOnPostState, deleteCommentOnPostState } from '../../Modules/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import './PostContainer.scss';
import Loader from '../../Components/Shared/Loader';
import { useHistory } from 'react-router-dom';
import { loadDialog } from '../../Modules/dialog';
import { getUserData } from '../../Modules/user';
import SmallButton from '../../Components/Shared/SmallButton';
import { uploadComment, deleteComment } from '../../api/firebase';
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from 'react-icons';

type PostContainerProps = {
    postId: string
}

function PostContainer({ postId }: PostContainerProps) {

    const post: PostState = useSelector((state: RootState) => state.post);
    const user = useSelector((state: RootState) => state.user);
    const loading = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    const [comment, setComment] = useState('');
    const [isUploadingComment, setIsUploadingComment] = useState(false);

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

    const dispatchCommentUploadSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Comment Uploaded',
                'Comment is uploaded.'
            )
        );
    };

    const dispatchCommentUploadWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Comment Upload Failed',
                'There was an error uploading comment. Please try again.'
            )
        )
    }
    const dispatchCommentDeleteSuccessDialog = () => {
        dispatch(
            loadDialog(
                'success',
                'Comment Deleted',
                'Comment is deleted.'
            )
        );
    };

    const dispatchCommentDeleteWarningDialog = () => {
        dispatch(
            loadDialog(
                'warning',
                'Comment Delete Failed',
                'There was an error deleting comment. Please try again.'
            )
        )
    }

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

    const onChangeCommentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    
    }

    const onSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const time = new Date();
        
        if (!user.uid) {
            alert('You have to sign in to leave a comment.');
        } else if (user.uid && user.name) {
            const commentData = {
                comment,
                uid: user.uid,
                nickname: user.name,
                time
            }
            setIsUploadingComment(true);
            try {
                uploadComment(
                    commentData,
                    postId
                );
                dispatch(updateCommentOnPostState(commentData));
                dispatchCommentUploadSuccessDialog();
                setIsUploadingComment(false);
            } catch (e) {
                console.log(e);
                dispatchCommentUploadWarningDialog();
                setIsUploadingComment(false);
            }
        }
    }

    const onClickCommentDeleteButton = (comment: comment) => {
        setIsUploadingComment(true);
        try {
            deleteComment(
                comment,
                postId
            );
            dispatch(deleteCommentOnPostState(comment.comment));
            dispatchCommentDeleteSuccessDialog();
            setIsUploadingComment(false);
        } catch (e) {
            dispatchCommentDeleteWarningDialog();
            setIsUploadingComment(false);
        }
    }

    if (post.error) {
        return <div>There is an error: {post.error}</div>;
    }

    const time = post.time ? post.time.toDate().toString() : null;

    const buildBody = (
        <>
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
                {isWriter
                    ? <div className="buttons-wrapper">
                        <SmallButton onClick={onClickEditButton} color="green">Edit Post</SmallButton>
                        <SmallButton onClick={onClickDeleteButton} color="red">Delete</SmallButton>
                    </div>
                    : null
                }
                <div className="post-user-info-wrapper">
                    <img src={post.userData.imgUrl} alt="profile"/>
                    <div className="user-data">
                        <div className="nickname">{post.userData.name}</div>
                        <div className="email">{post.userData.email}</div>
                        <div className="phrase">{post.userData.phrase}</div>
                    </div>
                </div>
            </section>
            <section className="section--comments">
                <h3>댓글 <strong>({post.comments.length})</strong></h3>
                <ul className="comments-wrapper">
                    {
                        post.comments.map((comment: comment) => (
                            <li>
                                <div className="nickname">{comment.nickname}</div>
                                <div className="comment">{comment.comment}</div>
                                {
                                    user.uid === comment.uid
                                    ? <button className="comment-delete-button" onClick={() => onClickCommentDeleteButton(comment)}>
                                        <MdDeleteForever />
                                    </button>
                                    : null
                                }
                            </li>
                        ))
                    }
                </ul>
                <h3>댓글 달기</h3>
                <form className="comment-form" onSubmit={onSubmitComment}>
                    <textarea
                        rows={5} cols={60}
                        value={comment}
                        onChange={onChangeCommentInput}
                        className="comment-input"
                        maxLength={100}
                    >
                    </textarea>
                    <button className="comment-button" type="submit">Submit</button>
                </form>
            </section>
        </>
    );
    return (
        <div className="post-container inner">
            {
                loading
                ? <Loader />
                : buildBody
            }
        </div>
    );

}

export default PostContainer;