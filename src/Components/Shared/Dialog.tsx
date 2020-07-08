import React from 'react';
import { Dialog } from '../../Modules/dialog';
import './Dialog.scss';

type DialogProps = Dialog & {
    onClick: (id: number) => void
}

function DialogComponent (
    { id, type, title, text, onClick }: DialogProps
) {

    const className = `dialog ${type}`;

    const handleRemove = () => onClick(id);

    return (
        <li key={id} className={className}>
            <button onClick={handleRemove}>x</button>
            <h2>{title}</h2>
            <p>{text}</p>
        </li>
    );
}

export default DialogComponent;