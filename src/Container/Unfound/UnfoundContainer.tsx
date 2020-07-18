import React from 'react';
import { Link } from 'react-router-dom';

function UnfoundContainer() {
    return (
        <div className="unfound-container inner">
            The page does not exist!
            <div>
                <Link to="/home">To Home</Link>
            </div>
        </div>
    );
}

export default UnfoundContainer;