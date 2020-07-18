import React from 'react';
import "./Intro.scss";

type IntroProps = {
    
};

function Intro() {
    return (
        <div className="intro-welcome">
            <div className="inner">
                <div className="inner-left">
                    <h1>Welcome to Beomlog!</h1>
                    <p>Create an account and</p>
                    <p><strong>Start writing a post!</strong></p>
                </div>
                <div className="inner-right">
                </div>
            </div>
        </div>
    );
}

export default Intro;