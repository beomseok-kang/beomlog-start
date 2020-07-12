import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';

function CategoryPage({ match }: any) {

    const { category } = match.params;

    return (
        <>
            <HeaderContainer />
            <div>
                Hello world {category}!
            </div>
        </>
    );
}

export default CategoryPage;