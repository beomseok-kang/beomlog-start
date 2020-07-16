import { call, put } from 'redux-saga/effects';
import { setLoading, finishLoading } from '../Modules/loading';

export const createUserSaga = (type: string, promiseCreator: any) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return function* saga(action: any) {
        try {
            yield put(setLoading());
            const result = yield call(promiseCreator, action.payload);
            yield put({
                type: SUCCESS,
                payload: result
            });
            yield put(finishLoading());
        } catch (e) {
            yield put({
                type: ERROR,
                payload: e
            })
            yield put(finishLoading());
        }
    };
}

export const createPostSaga = (type: string, promiseCreator: any) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    
    return function* saga(action: any) {
        const postId = action.meta;

        try {
            yield put(setLoading());
            const result = yield call(promiseCreator, action.payload);
            yield put({
                type: SUCCESS,
                payload: result,
                meta: postId
            });
            yield put(finishLoading());
        } catch (e) {
            yield put({
                type: ERROR,
                payload: e,
                error: true,
                meta: postId
            });
            yield put(finishLoading());
        }
    }
};

export const createCategoryPostsSaga = (type: string, promiseCreator: any) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return function* saga(action: any) {
        try {
            yield put(setLoading());
            const result = yield call(promiseCreator, action.payload);
            yield put({
                type: SUCCESS,
                payload: result,
            });
            yield put(finishLoading());
        } catch (e) {
            yield put({
                type: ERROR,
                payload: e
            });
            yield put(finishLoading());
        }
    }
};

