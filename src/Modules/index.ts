import { combineReducers } from 'redux';
import dialog from './dialog';

const rootReducer = combineReducers({
    dialog
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>