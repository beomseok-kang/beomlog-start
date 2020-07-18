import React from 'react';
import "./NewPostButton.scss";

type NewPostButtonProps = {
    onClick: () => void;
};

function NewPostButton({ onClick }: NewPostButtonProps) {

    return (
        <div className="new-post-button-wrapper inner">
            <button className="new-post-button" onClick={onClick}>
                Write New Post
            </button>
        </div>
    );
            
}

export default NewPostButton;