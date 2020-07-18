import React from 'react';
import { useHistory } from 'react-router-dom';
import SmallButton from '../../Components/Shared/SmallButton';
import "./UnfoundContainer.scss";

function UnfoundContainer() {

    const routerHistory = useHistory();

    const onClick = () => {
        routerHistory.push({ pathname: '/home' });
    }    

    return (
        <div className="unfound-container">
            <h2>Page Not Found</h2>
            <h3>The Page does not exist!</h3>
            <div className="unfound-page-img">Unfound Page Image</div>
            <SmallButton isFilled color="green" onClick={onClick}>To Home</SmallButton>     
        </div>
    );
}

export default UnfoundContainer;