import React from 'react';
import { Link } from 'react-router-dom';
import './ToggleMenu.scss';
import { category } from '../../Container/Home/HeaderContainer';

type ToggleMenuProps = {
    showToggleMenu: boolean | undefined;
    onClickMenuItem: () => void;
    onClickUpload: () => void;
    categories: category[];
}

function ToggleMenu({ showToggleMenu, onClickMenuItem, onClickUpload, categories }: ToggleMenuProps) {

    const onOff = showToggleMenu === undefined ? '' : showToggleMenu === true ? ' on' : ' off';
    const divClassName = "toggle-menu-wrapper" + onOff;
    const ulClassName = "category-list" + onOff;

    return (
        <div className={divClassName}>
            <ul className={ulClassName}>
                <li key="home">
                    <Link to="/home" onClick={onClickMenuItem}>
                        Home
                    </Link>
                </li>
                {
                    categories.map(category => (
                        <li key={category.category}>
                            <Link to={`/category/${category.category}`} onClick={onClickMenuItem}>
                                {category.category}
                                <span>
                                    ({category.numOfPosts.toString()})
                                </span>
                            </Link>
                        </li>
                    ))
                }
                <li key="upload" onClick={onClickUpload}>
                    Upload New
                </li>
            </ul>
        </div>
    );
}

export default ToggleMenu;