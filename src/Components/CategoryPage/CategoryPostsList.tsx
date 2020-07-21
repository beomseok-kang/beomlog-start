import React, { useEffect, useState } from 'react';
import { CategoryPostsState } from '../../Modules/categoryPosts';
import './CategoryPostsList.scss';
import { Link } from 'react-router-dom';
import { category } from '../../Container/Home/HeaderContainer';
import { removeTagsFromEditorData } from '../../lib/funcUtils';


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
                    <CategoryListItem
                        postId={post.postId}
                        category={post.category}
                        title={post.title}
                        editorData={post.editorData}
                        userData={post.userData}
                    />
                ))
            }
        </ul>
    );
}

type CategoryListItemProps = {
    postId: string;
    category: string;
    title: string;
    editorData: string;
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

function CategoryListItem ({ postId, category, title, editorData, userData }: CategoryListItemProps) {

    const postContent = removeTagsFromEditorData(editorData);

    return (
        <li key={postId}>
            <Link to={`/post/${postId}`}>
                <div className="list-category-container">{category}</div>
                <div className="list-postdata-container">
                    <h3>{title}</h3>
                    <p>{postContent}</p>
                </div>
                <div className="list-userdata-container">
                    <div className="position-fixer">
                        <img src={userData.imgUrl} alt="profile img"/>
                        <div>{userData.name}</div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default CategoryPostsList;