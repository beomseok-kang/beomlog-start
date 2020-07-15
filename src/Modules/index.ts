import { combineReducers } from 'redux';
import dialog from './dialog';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';
import categoryPosts, { categoryPostsSaga } from './categoryPosts'

const rootReducer = combineReducers({
    dialog,
    user,
    post,
    categoryPosts
});

export function* rootSaga() {
    yield all([userSaga(), postSaga(), categoryPostsSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>