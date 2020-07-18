import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Modules';
import './HomeIntroContainer.scss';
import NewPostButton from '../../Components/HomePage/NewPostButton';
import Intro from '../../Components/HomePage/Intro';

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
            <Intro />
            <NewPostButton onClick={onClickHomeIntroButton}/>
        </section>
    );
}

export default HomeIntroContainer;