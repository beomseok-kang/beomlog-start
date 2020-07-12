import React from 'react';
import './HamburgerButton.scss';

type HamburgerButtonProps = {
    onClick: () => void;
}

function HamburgerButton ({ onClick }: HamburgerButtonProps) {
    return (
        <div id="menuToggle" onClick={onClick}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default HamburgerButton;