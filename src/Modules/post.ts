import { getPostDataFromDatabase, uploadPostDataToDatabase, deletePostDataFromDatabase, updatePostDataOnDatabase } from "../api/firebase";
import { createPostSaga } from "../lib/asyncUtils";
import { takeEvery } from "redux-saga/effects";
import { category } from "../Container/Home/HeaderContainer";

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

const COMMENT_UPDATE = 'post/COMMENT_UPDATE';
const COMMENT_DELETE = 'post/COMMENT_DELETE';

export const uploadPost = (post: PostDataInDatabase) => ({
    type: UPLOAD_POST,
    payload: post,
    meta: post.postId
});
export const getPost = (postId: string) => ({
    type: GET_POST,
    payload: postId,
    meta: postId
});
export const deletePost = (uid: string, postId: string, category: string) => ({
    type: DELETE_POST,
    payload: {
        uid,
        postId,
        category
    },
    meta: postId
});
export const updatePost = (
    post: PostDataInDatabase
) => ({
    type: UPLOAD_POST,
    payload: post,
    meta: post.postId
});
export const updateCommentOnPostState = (comment: comment) => ({
    type: COMMENT_UPDATE,
    payload: comment
});
export const deleteCommentOnPostState = (commentContent: string) => ({
    type: COMMENT_DELETE,
    payload: commentContent
})

///////////////////// state /////////////////////////

export type comment = {
    uid: string;
    nickname: string;
    comment: string;
    time: any;
}

export type PostDataInDatabase = {
    postId: string;
    title: string;
    editorData: string;
    category: string;
    uid: string; //writer uid
    time: any;
    email: string;
    comments: comment[];
}

export type Post = PostDataInDatabase & {
    userData: {
        email: string,
        name: string,
        imgUrl: string,
        phrase: string,
        categories: {
            [category: string]: category
        }
    };
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
    email: '',
    comments: [],
    userData: {
        phrase: '',
        email: '',
        name: '',
        imgUrl: '',
        categories: {}
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

export default function post(state: PostState = initialState, action: any): PostState {
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
                ...initialState,
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
        case DELETE_POST:
            return {
                ...initialState,
                error: undefined
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                error: null
            };
        case DELETE_POST_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UPDATE_POST:
            return {
                ...action.payload,
                error: undefined
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                error: null
            };
        case UPDATE_POST_ERROR:
            return {
                ...initialState,
                error: action.payload
            };
        case COMMENT_UPDATE:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload
                ]
            };
        case COMMENT_DELETE:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.comment !== action.payload)
            };
        default:
            return state;
    }
};