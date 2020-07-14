import { combineReducers } from 'redux';
import dialog from './dialog';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    dialog,
    user,
    post
});

export function* rootSaga() {
    yield all([userSaga(), postSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>