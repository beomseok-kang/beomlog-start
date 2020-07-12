import { ActionType } from "typesafe-actions";
import { UserData, getUserDataFromDatabase } from "../api/firebase";
import { createUserSaga } from "../lib/asyncUtils";
import { takeEvery } from "redux-saga/effects";

const SET_USERDATA = 'user/SET_USERDATA';

const GET_USERDATA = 'user/GET_USERDATA';

const REMOVE_USERDATA = 'user/REMOVE_USERDATA';

export const getUserData = (uid: string | undefined) => ({
    type: GET_USERDATA,
    payload: {uid},
    meta: uid
});
export const setUserData = (userData: UserData) => ({
    type: SET_USERDATA,
    payload: userData,
    meta: undefined
});
export const removeUserData = () => ({
    type: REMOVE_USERDATA,
    payload: {},
    meta: undefined
});

const actions = { getUserData, setUserData, removeUserData };
type UserAction = ActionType<typeof actions>;

///////////////// state /////////////////////////////////

type UserState = {
    uid?: string;
    name?: string;
    email?: string;
    imgUrl?: string;
}
const initialState = {}

////////////// saga //////////////////////////////////////

const getUserSaga = createUserSaga(getUserDataFromDatabase);

export function* userSaga() {
    yield takeEvery(GET_USERDATA, getUserSaga);
}


////////////// reducer ///////////////////////////////////

function user (
    state: UserState = initialState,
    action: UserAction
): UserState {
    switch(action.type) {
        case GET_USERDATA:
            return {
                ...state,
                uid: action.meta
            };
        case SET_USERDATA:
            return {
                ...state,
                ...action.payload
            };
        case REMOVE_USERDATA:
            return initialState;
        default:
            return state;
    }
}

export default user;