import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import { removeDialog } from '../../Modules/dialog';
import DialogComponent from '../../Components/Shared/Dialog';
import './DialogContainer.scss';

function DialogContainer () {

    const dialogs = useSelector((state: RootState) => state.dialog);
    const dispatch = useDispatch();

    ////// dispatching actions ////////////

    const onRemove = (id: number) => {
        dispatch(removeDialog(id));
    };

    return (
        <ul className="dialog-container">
            {
                dialogs.map(dialog => (
                    <DialogComponent
                        key={dialog.id}
                        id={dialog.id}
                        type={dialog.type}
                        title={dialog.title}
                        text={dialog.text}
                        onClick={onRemove}
                    />
                ))
            }
        </ul>
    );
}

export default DialogContainer;