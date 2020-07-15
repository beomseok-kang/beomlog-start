import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import './HomePage.scss';
import HomePostsContainer from '../Container/Home/HomePostsContainer';

function HomePage() {

    return (
        <>
            <HeaderContainer />
            <HomePostsContainer />
        </>
    );
}

export default HomePage;