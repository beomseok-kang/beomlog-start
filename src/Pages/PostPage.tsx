import React from 'react';
import { useDispatch } from 'react-redux';
import PostContainer from '../Container/Post/PostContainer';
import HeaderContainer from '../Container/Home/HeaderContainer';

function PostPage({ match }: any) {
    
    const { postId } = match.params;
    const dispatch = useDispatch();
    
    return (
        <>
            <HeaderContainer />
            <PostContainer postId={postId} />
        </>
    );

}

export default PostPage;