import { category } from "../Container/Home/HeaderContainer";
import { createCategoryPostsSaga } from "../lib/asyncUtils";
import { takeEvery } from "redux-saga/effects";
import { getCategoryPostsFromDatabase, getHomePostsFromDatabase } from "../api/firebase";


const GET_POSTS = 'categoryPosts/GET_POSTS';
const GET_POSTS_SUCCESS = 'categoryPosts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'categoryPosts/GET_POSTS_ERROR';

const GET_HOME_POSTS = 'categoryPosts/GET_HOME_POSTS';
const GET_HOME_POSTS_SUCCESS = 'categoryPosts/GET_HOME_POSTS_SUCCESS';
const GET_HOME_POSTS_ERROR = 'categoryPosts/GET_HOME_POSTS_ERROR';

const DELETE_POSTS = 'categoryPosts/DELETE_POSTS';

export type getCategoryPostsParams = {
    uid: string,
    category: string
};
export const getCategoryPosts = (params: getCategoryPostsParams) => ({
    type: GET_POSTS,
    payload: params
});
export const getHomePosts = () => ({
    type: GET_HOME_POSTS
});
export const deleteCategoryPosts = () => ({
    type: DELETE_POSTS
})

////////// state ////////////////////
type categoryPost = {
    category: string;
    editorData: string;
    postId: string;
    time: any;
    title: string;
    userData: {
        email: string,
        name: string,
        imgUrl: string,
        phrase: string,
        categories: {
            [category: string]: category
        }
    };
}
export type CategoryPostsState = categoryPost[]
const initialState: CategoryPostsState = [];

//////////// saga ////////////////////////////

const getCategoryPostsSaga = createCategoryPostsSaga(GET_POSTS, getCategoryPostsFromDatabase);
const getHomePostsSaga = createCategoryPostsSaga(GET_HOME_POSTS, getHomePostsFromDatabase);

export function* categoryPostsSaga() {
    yield takeEvery(GET_POSTS, getCategoryPostsSaga);
    yield takeEvery(GET_HOME_POSTS, getHomePostsSaga);
}

////////// reducer ////////////////////////////


export default function categoryPosts(state: CategoryPostsState = initialState, action: any): CategoryPostsState {
    switch(action.type) {
        case GET_POSTS:
            return initialState;
        case GET_POSTS_SUCCESS:
            return action.payload;
        case GET_POSTS_ERROR:
            return initialState;
        case GET_HOME_POSTS:
            return initialState;
        case GET_HOME_POSTS_SUCCESS:
            return action.payload;
        case GET_HOME_POSTS_ERROR:
            return initialState;
        case DELETE_POSTS:
            return initialState;
        default:
            return state;
    }
}