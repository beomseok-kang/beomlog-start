import React from 'react';
import './HamburgerButton.scss';

type HamburgerButtonProps = {
    showToggleMenu: boolean | undefined;
    onClick: () => void;
}

function HamburgerButton ({ showToggleMenu, onClick }: HamburgerButtonProps) {
    return (
        <div id="menuToggle" onClick={onClick}>
            <input type="checkbox" checked={showToggleMenu}/>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default React.memo(HamburgerButton);