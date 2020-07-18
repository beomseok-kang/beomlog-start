import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import HomePostsContainer from '../Container/Home/HomePostsContainer';
import HomeIntroContainer from '../Container/Home/HomeIntroContainer';

function HomePage() {

    return (
        <>
            <HeaderContainer isHome/>
            <HomeIntroContainer />
            <HomePostsContainer />
        </>
    );
}

export default HomePage;