import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Modules';
import { PostState } from '../Modules/post';

function PostPage({ match }: any) {
    
    const { postId } = match.params;
    const post: PostState = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();

    
    if (post.error) return <div>There is an error: {post.error}</div>;
    
    return (
        <>
            <div>
                <h1>{post.title}</h1>
                <h3>{post.category}</h3>
                <div dangerouslySetInnerHTML={{__html: post.editorData}}></div>
                <div>
                    <span>{post.uid}</span>
                    <span>{post.userData.email}</span>
                    <span>{post.userData.name}</span>
                    <div>{post.time.toString()}</div>
                </div>

            </div>
        </>
    );

}

export default PostPage;