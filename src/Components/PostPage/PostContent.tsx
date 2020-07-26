import React from 'react';
import { Post } from '../../Modules/post';
import SmallButton from '../Shared/SmallButton';
import "./PostContent.scss";

type PostContentProps = {
    post: Post;
    isWriter: boolean;
    onClickEditButton: () => void;
    onClickDeleteButton: () => void;
}

function PostContent({ post, isWriter, onClickDeleteButton, onClickEditButton }: PostContentProps) {

    const writtenTime = post.time.toDate().toString();

    return (
        <>
            <div className="category">{post.category}</div>
            <h1>
                {post.title}
                <div className="written-time">{writtenTime}</div>
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
        </>
    );
}

export default React.memo(PostContent);