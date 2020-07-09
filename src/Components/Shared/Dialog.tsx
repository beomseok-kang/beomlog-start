import React, { useState, useEffect } from 'react';
import { Dialog, removeDialog } from '../../Modules/dialog';
import './Dialog.scss';
import { useDispatch } from 'react-redux';

type DialogProps = Dialog & {
    onClick: (id: number) => void
}

function DialogComponent (
    { id, type, title, text, onClick }: DialogProps
) {

    const className = `dialog ${type}`;
    const handleRemove = () => onClick(id);
    const dispatch = useDispatch();

    const [showComponent, setShowComponent] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(false);
            dispatch(removeDialog(id));
        }, 5000);
        return () => clearTimeout(timer);
    })

    return showComponent ? (
        <li key={id} className={className}>
            <button onClick={handleRemove}>x</button>
            <h2>{title}</h2>
            <p>{text}</p>
        </li>
    ) : null;
}

export default DialogComponent;