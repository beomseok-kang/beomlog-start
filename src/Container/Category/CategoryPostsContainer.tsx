import React, { useEffect } from 'react';
import { CategoryPostsState, getCategoryPosts } from '../../Modules/categoryPosts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Modules';
import { UserState } from '../../Modules/user';
import CategoryPostsList from '../../Components/CategoryPage/CategoryPostsList';

type CategoryPostsContainerProps = {
    category: string;
}

function CategoryPostsContainer({
    category
}: CategoryPostsContainerProps) {

    const categoryPosts: CategoryPostsState = useSelector((state: RootState) => state.categoryPosts);
    const user: UserState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(
                getCategoryPosts(
                    {
                        uid: user.uid!,
                        category: category
                    }
                )
            );
        } catch (e) {
            console.log(e);
        }
    }, [dispatch, category, user.uid]);

    return (
        <div className="category-posts-container inner">
            <CategoryPostsList categoryPosts={categoryPosts}/>
        </div>
    );
}

export default CategoryPostsContainer;