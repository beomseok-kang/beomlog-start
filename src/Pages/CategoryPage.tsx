import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import CategoryPostsContainer from '../Container/Category/CategoryPostsContainer';
import CategoryInfoContainer from '../Container/Category/CategoryInfoContainer';

function CategoryPage({ match }: any) {

    const { category } = match.params;

    return (
        <>
            <HeaderContainer />
            <div className="inner">
                <CategoryInfoContainer category={category}/>
                <CategoryPostsContainer category={category} />
            </div>
        </>
    );
}

export default CategoryPage;