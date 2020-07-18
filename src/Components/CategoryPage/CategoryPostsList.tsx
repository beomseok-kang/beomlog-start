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
                categoryPosts.length === 0
                ? <div>There are no posts.</div>
                : categoryPosts.map(post => (
                    <li key={post.postId}>
                        <Link to={`/post/${post.postId}`}>
                            <div className="list-category-container">{post.category}</div>
                            <div className="list-postdata-container">
                                <h3>{post.title}</h3>
                                <p dangerouslySetInnerHTML={{__html: post.editorData}}></p>
                            </div>
                            <div className="list-userdata-container">
                                <div className="position-fixer">
                                    <img src={post.userData.imgUrl} alt="profile img"/>
                                    <div>{post.userData.name}</div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default CategoryPostsList;