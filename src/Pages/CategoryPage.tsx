import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import CategoryPostsContainer from '../Container/Category/CategoryPostsContainer';

function CategoryPage({ match }: any) {

    const { category } = match.params;

    return (
        <>
            <HeaderContainer />
            <CategoryPostsContainer category={category} />
        </>
    );
}

export default CategoryPage;