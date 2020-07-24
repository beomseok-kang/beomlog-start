import React from 'react';
import Loader from '../Shared/Loader';
import { comment } from '../../Modules/post';
import { UserState } from '../../Modules/user';
import { MdDeleteForever } from 'react-icons/md';
import "./CommentSection.scss";

type CommentSectionProps = {
    isUploadingComment: boolean;
    comments: comment[];
    user: UserState;
    onSubmitComment: (event: React.FormEvent<HTMLFormElement>) => void;
    onChangeCommentInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickCommentDeleteButton: (comment: comment) => void;
    commentValue: string;
}

function CommentSection({
    isUploadingComment,
    comments,
    user,
    onSubmitComment,
    commentValue,
    onClickCommentDeleteButton,
    onChangeCommentInput
}: CommentSectionProps) {
    return isUploadingComment ? <Loader /> : (
        <section className="section--comments">
            <h3>댓글 <strong>({comments.length})</strong></h3>
            <ul className="comments-wrapper">
                {
                    comments.map((comment: comment) => (
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
                    value={commentValue}
                    onChange={onChangeCommentInput}
                    className="comment-input"
                    maxLength={100}
                >
                </textarea>
                <button className="comment-button" type="submit">Submit</button>
            </form>
        </section>
    );
}

export default React.memo(CommentSection);