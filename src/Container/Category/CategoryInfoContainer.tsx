import React from 'react';
import "./CategoryInfoContainer.scss";

type CategoryInfoContainerProps = {
    category: string;
}

function CategoryInfoContainer({ category }: CategoryInfoContainerProps) {
    return (
        <div className="category-info-container">
            <h2>
                {category}
            </h2>
        </div>
    );
}

export default CategoryInfoContainer;