import React from 'react';
import { useHistory } from 'react-router-dom';
import "./UnfoundContainer.scss";
import PageNotFound from '../../Components/UnfoundPage/PageNotFound';

function UnfoundContainer() {

    const routerHistory = useHistory();

    const onClick = () => {
        routerHistory.push({ pathname: '/home' });
    }    

    return <PageNotFound onClick={onClick}/>;
}

export default UnfoundContainer;