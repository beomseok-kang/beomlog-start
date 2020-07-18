import React from 'react';
import "./CategoryInfoContainer.scss";
import SmallButton from '../../Components/Shared/SmallButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Modules';

type CategoryInfoContainerProps = {
    category: string;
}

function CategoryInfoContainer({ category }: CategoryInfoContainerProps) {

    const routerHistory = useHistory();
    const user = useSelector((state: RootState) => state.user);

    const onClick = () => {
        if (user.uid) {
            alert('Please sign in to write any post.');
        } else {
            routerHistory.push({ pathname: '/upload' });
        }
    }

    return (
        <div className="category-info-container">
            <h2>
                {category}
            </h2>
            <SmallButton isFilled onClick={onClick} color="green">New Post</SmallButton>
        </div>
    );
}

export default CategoryInfoContainer;