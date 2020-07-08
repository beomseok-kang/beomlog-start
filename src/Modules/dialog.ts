import { createStandardAction, ActionType } from 'typesafe-actions';

/////////////// types //////////////////////

const LOAD_DIALOG = 'dialog/LOAD_DIALOG';
const REMOVE_DIALOG = 'dialog/REMOVE_DIALOG';

let nextId = 1;

export type dialogType = 'warning' | 'success';

/////////////// actions /////////////////////

export const loadDialog = (dialogType: dialogType, title: string, text: string) => ({
    type: LOAD_DIALOG,
    payload: {
        id: nextId ++,
        type: dialogType,
        title,
        text,
    }
})
export const removeDialog = createStandardAction(REMOVE_DIALOG)<number>();

const actions = { loadDialog, removeDialog };
type DialogAction = ActionType<typeof actions>;

////////////// state ///////////////////////

export type Dialog = {
    id: number;
    type: dialogType;
    title: string;
    text: string;
}

type DialogState = Dialog[];

const initialState: DialogState = [];

////////////// reducer ///////////////////////

function dialog (
    state: DialogState = initialState,
    action: any
): DialogState {
    switch(action.type) {
        case LOAD_DIALOG:
            return state.concat(action.payload);
        case REMOVE_DIALOG:
            return state.filter(
                dialog => dialog.id !== action.payload
            );
        default:
            return state;
    }
}

export default dialog;