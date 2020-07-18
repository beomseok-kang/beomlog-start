import { getUserDataFromDatabase, updateUserDataOnDatabase } from "../api/firebase";
import { createUserSaga } from "../lib/asyncUtils";
import { takeEvery } from "redux-saga/effects";
import { category } from "../Container/Home/HeaderContainer";

const GET_USERDATA = 'user/GET_USERDATA';
const GET_USERDATA_SUCCESS = 'user/GET_USERDATA_SUCCESS';
const GET_USERDATA_ERROR = 'user/GET_USERDATA_ERROR';
const REMOVE_USERDATA = 'user/REMOVE_USERDATA';
const UPDATE_USERDATA = 'user/UPDATE_USERDATA';
const UPDATE_USERDATA_SUCCESS = 'user/UPDATE_USERDATA_SUCCESS';
const UPDATE_USERDATA_ERROR = 'user/UPDATE_USERDATA_ERROR';

export const getUserData = (uid: string | undefined) => ({
    type: GET_USERDATA,
    payload: uid,
    meta: uid
});
export const removeUserData = () => ({
    type: REMOVE_USERDATA,
    payload: {},
    meta: undefined
});
export const updateUserData = (userData: UserState) => ({
    type: UPDATE_USERDATA,
    payload: userData,
    meta: undefined
})

///////////////// state /////////////////////////////////

export type UserState = {
    uid?: string;
    name?: string;
    email?: string;
    imgUrl?: string;
    phrase?: string;
    categories?: {
        [category: string]: category
    }
}
const initialState = {}

////////////// saga //////////////////////////////////////

const getUserSaga = createUserSaga(GET_USERDATA ,getUserDataFromDatabase);
const updateUserSaga = createUserSaga(UPDATE_USERDATA, updateUserDataOnDatabase);

export function* userSaga() {
    yield takeEvery(GET_USERDATA, getUserSaga);
    yield takeEvery(UPDATE_USERDATA, updateUserSaga);
}


////////////// reducer ///////////////////////////////////

function user (
    state: UserState = initialState,
    action: any
): UserState {
    switch(action.type) {
        case GET_USERDATA:
            return {
                ...state,
                uid: action.meta
            };
        case GET_USERDATA_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_USERDATA_ERROR:
            return state;
        case REMOVE_USERDATA:
            return initialState;
        case UPDATE_USERDATA:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_USERDATA_SUCCESS:
            return state;
        case UPDATE_USERDATA_ERROR:
            return state;
        default:
            return state;
    }
}

export default user;