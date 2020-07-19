import React, { useEffect, useState } from 'react';
import { CategoryPostsState } from '../../Modules/categoryPosts';
import './CategoryPostsList.scss';
import { Link } from 'react-router-dom';


type CategoryPostsListProps = {
    categoryPosts: CategoryPostsState;
}

function NoPostWrapper() {

    const [showNoPost, setShowNoPost] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowNoPost(true);
        }, 500)
    })

    return (
        <>
            {
                showNoPost
                ? <div className="no-post-wrapper">
                    <div className="no-post-img">No Post Image</div>
                    <h2>There is no post here!</h2>
                    <h3>Write your post here!</h3>
                </div>
                : false
            }
        </>
    );
}


function CategoryPostsList({ categoryPosts }: CategoryPostsListProps ) {

    return (
        <ul className="category-posts-list">
            {
                categoryPosts.length === 0
                ? <NoPostWrapper />
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