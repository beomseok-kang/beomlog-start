import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import EditorContainer from '../Container/Writing/EditorContainer';

type UpdatePageProps = {
    match: any;
}

function UpdatePage({ match }: UpdatePageProps) {

    const { postId } = match.params;

    return (
        <>
            <HeaderContainer />
            <div>{postId}</div>
            <EditorContainer isUpdating/>
        </>
    );
}

export default UpdatePage;