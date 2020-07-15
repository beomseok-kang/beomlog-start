import React, { useEffect } from 'react';
import Loader from '../../Components/Shared/Loader';
import CategoryPostsList from '../../Components/CategoryPage/CategoryPostsList';
import { CategoryPostsState, getHomePosts } from '../../Modules/categoryPosts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';


function HomePostsContainer() {

    const homePosts: CategoryPostsState = useSelector((state: RootState) => state.categoryPosts);
    const loading = useSelector((state: RootState) => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(
                getHomePosts()
            );
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);

    return (
        <div className="home-posts-container inner">
            {
                loading
                ? <Loader />
                : <CategoryPostsList categoryPosts={homePosts}/>
            }
        </div>
    );
}

export default HomePostsContainer;