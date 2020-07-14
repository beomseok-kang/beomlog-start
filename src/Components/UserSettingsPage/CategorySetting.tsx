import React from 'react';
import { category } from '../../Container/Home/HeaderContainer';
import Button from '../Shared/Button';

type CategorySettingProps = {
    categories: category[];
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
    return (
        <div className="category-setting-wrapper">
            <ul>
                {
                    categories.map(category => (
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
                <>
                    <input type="name" value={inputValue} onChange={onInputChange}/>
                    <Button onClick={onClickXButton} type="button">X</Button>
                </>
                : null
            }
            <Button onClick={onClickAddButton} type="button">
                {
                    showAddItem
                    ? 'Add Category'
                    : 'New Category'
                }
            </Button>
        </div>
    );
}

export default CategorySetting;