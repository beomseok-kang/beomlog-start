import React from 'react';
import { category } from '../../Container/Home/HeaderContainer';
import "./CategorySetting.scss";
import SmallButton from '../Shared/SmallButton';
import { MdClear } from 'react-icons/md';

type CategorySettingProps = {
    categories: {
        [category: string]: category;
    };
    onClickXButton: () => void;
    onClickAddButton: () => void;
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showAddItem: boolean;
}

function CategorySetting({
    categories,
    onClickXButton,
    onClickAddButton,
    inputValue,
    onInputChange,
    showAddItem
}: CategorySettingProps) {
    const categoriesToArray = Object.values(categories);

    return (
        <div className="category-setting-wrapper">
            <ul className="category-setting-list">
                {
                    categoriesToArray.map(category => (
                        <li>
                            <span>{category.category}</span>
                            <strong>({category.numOfPosts})</strong>
                        </li>
                    ))
                }
            </ul>
            {
                showAddItem
                ? 
                <div className="input-wrapper">
                    <input
                        type="name"
                        value={inputValue}
                        onChange={onInputChange}
                        placeholder="New Category Name"
                    />
                    <button className="close-new-category-btn" onClick={onClickXButton}><MdClear /></button>
                </div>
                : null
            }
            <SmallButton color="green" onClick={onClickAddButton}>
                {
                    showAddItem
                    ? 'Add Category'
                    : 'New Category'
                }
            </SmallButton>
        </div>
    );
}

export default React.memo(CategorySetting);