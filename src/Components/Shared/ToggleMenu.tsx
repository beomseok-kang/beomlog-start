import React from 'react';
import { Link } from 'react-router-dom';
import './ToggleMenu.scss';
import { category } from '../../Container/Home/HeaderContainer';

type ToggleMenuProps = {
    showToggleMenu: boolean;
    onClick: () => void;
    categories: category[];
}

function ToggleMenu({ showToggleMenu, onClick, categories }: ToggleMenuProps) {

    const divClassName = "toggle-menu-wrapper" + (showToggleMenu ? ' on': ' off');
    const ulClassName = "category-list" + (showToggleMenu ? ' on': ' off');

    return (
        <div className={divClassName}>
            <ul className={ulClassName}>
                <li key="home">
                    <Link to="/home" onClick={onClick}>
                        Home
                    </Link>
                </li>
                {
                    categories.map(category => (
                        <li key={category.category}>
                            <Link to={`/category/${category.category}`} onClick={onClick}>
                                {category.category}
                                <span>
                                    ({category.numOfPosts.toString()})
                                </span>
                            </Link>
                        </li>
                    ))
                }
                <li key="upload">
                    <Link to="/upload" onClick={onClick}>
                        Upload
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default ToggleMenu;