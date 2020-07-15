import React from 'react';
import { CategoryPostsState } from '../../Modules/categoryPosts';
import './CategoryPostsList.scss';
import { Link } from 'react-router-dom';


type CategoryPostsListProps = {
    categoryPosts: CategoryPostsState;
}



function CategoryPostsList({ categoryPosts }: CategoryPostsListProps ) {
    return (
        <ul className="category-posts-list">
            {
                categoryPosts.map(post => (
                    <li key={post.postId}>
                        <Link to={`/post/${post.postId}`}>
                            <span>{post.title}</span>
                            <span>{post.editorData}</span>
                            <div>{post.category}</div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default CategoryPostsList;