import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import EditorContainer from '../Container/Writing/EditorContainer';

type UpdatePageProps = {
    match: any;
}

function UpdatePage() {

    return (
        <>
            <HeaderContainer />
            <EditorContainer isUpdating/>
        </>
    );
}

export default UpdatePage;