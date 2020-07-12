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