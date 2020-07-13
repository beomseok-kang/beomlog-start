import { ActionType } from "typesafe-actions";
import { UserData } from "../api/firebase";

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

export const uploadPost = (
    title: string,
    editorData: string,
    category: string,
    userData: UserData,
    time: any,
    uid: string,
    postId: string
) => ({
    type: UPLOAD_POST,
    payload: {
        title,
        editorData,
        category,
        userData,
        time,
        uid,
        postId
    },
    meta: postId
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
    title: string,
    editorData: string,
    category: string,
    time: any,
    postId: string,
    ver: number
) => ({
    type: UPLOAD_POST,
    payload: {
        title,
        editorData,
        category,
        time,
        postId,
        ver
    },
    meta: postId
});

const actions = { uploadPost, getPost, deletePost, updatePost };
type UserAction = ActionType<typeof actions>;
