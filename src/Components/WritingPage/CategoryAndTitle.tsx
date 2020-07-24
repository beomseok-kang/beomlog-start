import React from 'react';
import { UserState } from '../../Modules/user';
import "./CategoryAndTitle.scss";

type CategoryAndTitleProps = {
    isUpdating: boolean;
    categoryValue: string;
    user: UserState;
    title: string;
    onChangeSelectCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CategoryAndTitle({
    isUpdating,
    categoryValue,
    user,
    title,
    onChangeSelectCategory,
    onChangeTitleInput
}: CategoryAndTitleProps) {

    const categoriesToArray = user.categories ? Object.values(user.categories) : [];

    return (
        <>
            <h2>
                {
                    isUpdating
                    ? 'Update Post'
                    : 'Upload Post'
                }
            </h2>
            <div className="category-title-wrapper">
                <select value={categoryValue} onChange={onChangeSelectCategory}>
                    {
                        user.categories
                        ? categoriesToArray.map(category => (category.category !== 'All') && (
                            <option key={category.category} value={category.category}>
                                {category.category}
                            </option>
                        ))
                        : null
                    }
                </select>
                <input
                    maxLength={40}
                    type="name"
                    value={title}
                    onChange={onChangeTitleInput}
                    placeholder="Title"
                />
            </div>
        </>
    );
}

export default React.memo(CategoryAndTitle);