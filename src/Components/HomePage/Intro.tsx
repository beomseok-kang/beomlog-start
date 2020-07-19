import React from 'react';
import "./Intro.scss";

type IntroProps = {
    isSignedIn: boolean;
    name?: string;
};

function Intro({ isSignedIn, name }: IntroProps) {

    const h1Content = !isSignedIn ? 'Welcome to Beomlog!' : `Welcome, ${name}`;
    const pContent = !isSignedIn ? 'Create an accound and' : 'Click the button below and';

    return (
        <div className="intro-welcome">
            <div className="inner">
                <div className="inner-left">
                    <h1>{h1Content}</h1>
                    <p>{pContent}</p>
                    <p><strong>Start writing a post!</strong></p>
                </div>
                <div className="inner-right">
                </div>
            </div>
        </div>
    );
}

Intro.defaultProps = {
    isSignedIn: false
}

export default Intro;