import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import EditorContainer from '../Container/Writing/EditorContainer';

function WritingPage() {
    return (
        <>
            <HeaderContainer />
            <EditorContainer isUpdating={false}/>
        </>
    );
}

export default WritingPage;