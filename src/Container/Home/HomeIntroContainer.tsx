import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Modules';
import './HomeIntroContainer.scss';

function HomeIntroContainer() {

    const user = useSelector((state: RootState) => state.user);
    const routerHistory = useHistory();

    const onClickHomeIntroButton = () => {
        if (user.uid) {
            routerHistory.push({ pathname: '/upload' });
        } else {
            alert('Please sign in to write any post.');
        }
    };

    return (
        <section className="section--home-intro">
            <button className="new-post-button" onClick={onClickHomeIntroButton}>Write New Post</button>
            <div className="intro-welcome">
                <h1>Welcome to Beomlog!</h1>
                <p>Beomlog is a private blog space which you can write a post with editor freely!</p>
                <p>Sign up and start writing a new post!</p>
            </div>
        </section>
    );
}

export default HomeIntroContainer;