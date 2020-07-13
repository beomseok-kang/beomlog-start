import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import EditorContainer from '../Container/Writing/EditorContainer';

function CategoryPage({ match }: any) {

    const { category } = match.params;

    return (
        <>
            <HeaderContainer />
            <div>
                Hello world {category}!
            </div>
            <EditorContainer />
        </>
    );
}

export default CategoryPage;