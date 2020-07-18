import React from 'react';
import "./Darkener.scss";

type DarkenerProps = {
    showToggleMenu: boolean | undefined;
}

function Darkener ({ showToggleMenu }: DarkenerProps) {

    const onOff = showToggleMenu === undefined ? '' : showToggleMenu === true ? ' on' : ' off';
    
    const className = "darkener" + onOff

    return <div className={className}></div>
}

export default Darkener