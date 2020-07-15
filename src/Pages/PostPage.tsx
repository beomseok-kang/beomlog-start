import React from 'react';
import PostContainer from '../Container/Post/PostContainer';
import HeaderContainer from '../Container/Home/HeaderContainer';

function PostPage({ match }: any) {
    
    const { postId } = match.params;
    
    return (
        <>
            <HeaderContainer />
            <PostContainer postId={postId} />
        </>
    );

}

export default PostPage;