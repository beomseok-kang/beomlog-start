import React from 'react';
import HeaderContainer from '../Container/Home/HeaderContainer';
import './HomePage.scss';
import HomePostsContainer from '../Container/Home/HomePostsContainer';
import HomeIntroContainer from '../Container/Home/HomeIntroContainer';

function HomePage() {

    return (
        <>
            <HeaderContainer />
            <section className="inner">
                
                <HomeIntroContainer />
                <h2>
                    Latest posts
                </h2>
                <HomePostsContainer />
            </section>
        </>
    );
}

export default HomePage;