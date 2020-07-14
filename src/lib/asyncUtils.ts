import { call, put } from 'redux-saga/effects';

export const createUserSaga = (promiseCreator: any) => {
    return function* saga(action: any) {
        const uid = action.meta;
        try {
            const result = yield call(promiseCreator, uid);
            yield put({
                type: 'user/SET_USERDATA',
                payload: result
            });
        } catch (e) {
            yield console.log(e);
        }
    };
}

export const createPostSaga = (type: string, promiseCreator: any) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    
    return function* saga(action: any) {
        const postId = action.meta;

        try {
            const result = yield call(promiseCreator, action.payload);
            yield put({
                type: SUCCESS,
                payload: result,
                meta: postId
            })
        } catch (e) {
            yield put({
                type: ERROR,
                payload: e,
                error: true,
                meta: postId
            })
        }
    }
};

