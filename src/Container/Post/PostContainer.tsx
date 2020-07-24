import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PostState, getPost, deletePost, comment, updateCommentOnPostState, deleteCommentOnPostState } from '../../Modules/post';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import './PostContainer.scss';
import Loader from '../../Components/Shared/Loader';
import { useHistory } from 'react-router-dom';
import { loadDialog } from '../../Modules/dialog';
import { getUserData } from '../../Modules/user';
import { uploadComment, deleteComment } from '../../api/firebase';
import NoPostWrapper from '../../Components/PostPage/NoPostWrapper';
import CommentSection from '../../Components/PostPage/CommentSection';
import PostContent from '../../Components/PostPage/PostContent';

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

    const isWriter = user && (user.uid === post.uid);

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
        routerHistory.push({ pathname: '/update' })
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
                setComment('');
                setIsUploadingComment(false);
            } catch (e) {
                console.log(e);
                dispatchCommentUploadWarningDialog();
                setComment('');
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

    const buildBody = (
        <>
            <PostContent 
                post={post}
                isWriter={isWriter}
                onClickEditButton={onClickEditButton}
                onClickDeleteButton={onClickDeleteButton}
            />
            <CommentSection 
                isUploadingComment={isUploadingComment}
                comments={post.comments}
                user={user}
                onSubmitComment={onSubmitComment}
                onChangeCommentInput={onChangeCommentInput}
                onClickCommentDeleteButton={onClickCommentDeleteButton}
                commentValue={comment}
            />
        </>
    );

    return (
        <div className="post-container inner">
            {
                loading
                ? <Loader />
                : (
                    post.uid
                    ? buildBody
                    : <NoPostWrapper />
                )
            }
        </div>
    );

}

export default PostContainer;