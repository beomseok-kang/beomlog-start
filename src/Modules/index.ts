import { combineReducers } from 'redux';
import dialog from './dialog';
import user, { userSaga } from './user';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    dialog,
    user
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>