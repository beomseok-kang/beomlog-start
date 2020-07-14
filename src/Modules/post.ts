import { ActionType } from "typesafe-actions";
import { UserData, getPostDataFromDatabase, uploadPostDataToDatabase, deletePostDataFromDatabase, updatePostDataOnDatabase } from "../api/firebase";
import { createPostSaga } from "../lib/asyncUtils";
import { takeEvery, takeLeading } from "redux-saga/effects";

const UPLOAD_POST = 'post/UPLOAD_POST';
const UPLOAD_POST_SUCCESS = 'post/UPLOAD_POST_SUCCESS';
const UPLOAD_POST_ERROR = 'post/UPLOAD_POST_ERROR';

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_ERROR = 'post/GET_POST_ERROR';

const DELETE_POST = 'post/DELETE_POST';
const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
const DELETE_POST_ERROR = 'post/DELETE_POST_ERROR';

const UPDATE_POST = 'post/UPDATE_POST';
const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS';
const UPDATE_POST_ERROR = 'post/UPDATE_POST_ERROR';

export const uploadPost = (post: Post) => ({
    type: UPLOAD_POST,
    payload: post,
    meta: post.postId
});
export const getPost = (postId: string) => ({
    type: GET_POST,
    payload: postId,
    meta: postId
});
export const deletePost = (postId: string) => ({
    type: DELETE_POST,
    payload: postId,
    meta: postId
});
export const updatePost = (
    post: Post
) => ({
    type: UPLOAD_POST,
    payload: post,
    meta: post.postId
});

const actions = { uploadPost, getPost, deletePost, updatePost };

///////////////////// state /////////////////////////

export type Post = {
    postId: string;
    title: string;
    editorData: string;
    category: string;
    uid: string; //writer uid
    time: any;
    userData: UserData;
};

export type PostState = Post & {
    error: any | null | undefined;
};
const initialState: PostState = {
    postId: '',
    title: '',
    editorData: '',
    category: '',
    uid: '',
    time: '',
    userData: {
        email: '',
        name: '',
        imgUrl: ''
    },
    error: undefined
}

//////////////// saga /////////////////////////////////

const getPostSaga = createPostSaga(GET_POST, getPostDataFromDatabase);
const uploadPostSaga = createPostSaga(UPLOAD_POST, uploadPostDataToDatabase);
const deletePostSaga = createPostSaga(DELETE_POST, deletePostDataFromDatabase);
const updatePostSaga = createPostSaga(UPDATE_POST, updatePostDataOnDatabase);

export function* postSaga() {
    yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(UPLOAD_POST, uploadPostSaga);
    yield takeEvery(DELETE_POST, deletePostSaga);
    yield takeEvery(UPDATE_POST, updatePostSaga);
}

/////////////// reducer /////////////////////////////////

export default function post(state: PostState = initialState, action: any) {
    switch(action.type) {
        case GET_POST:
            return {
                ...initialState,
                postId: action.meta
            };
        case GET_POST_SUCCESS:
            return {
                ...action.payload,
                error: null
            };
        case GET_POST_ERROR:
            return {
                ...initialState,
                error: action.payload
            };
        case UPLOAD_POST:
            return {
                ...action.payload,
                error: undefined
            };
        case UPLOAD_POST_SUCCESS:
            return {
                ...state,
                error: null
            };
        case UPLOAD_POST_ERROR:
            return {
                ...initialState,
                error: action.payload
            };
        default:
            return state;
    }
};