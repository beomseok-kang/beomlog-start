import React from 'react';
import "./SmallButton.scss"

type SmallButtonProps = {
    isFilled: boolean;
    onClick: () => void;
    children: React.ReactNode;
    color: "red" | "green"
}

function SmallButton ({ isFilled, onClick, color, children }: SmallButtonProps) {
    const className = isFilled ? "small-btn filled " + color : "small-btn " + color;
    return <button type="button" onClick={onClick} className={className}>{children}</button>;
}

SmallButton.defaultProps = {
    isFilled: false
};

export default React.memo(SmallButton);