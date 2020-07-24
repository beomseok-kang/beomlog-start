import React from 'react';
import SmallButton from '../Shared/SmallButton';

type PageNotFoundProps = {
    onClick: () => void;
}

function PageNotFound({ onClick }: PageNotFoundProps) {
    return (
        <div className="unfound-container">
            <h2>Page Not Found</h2>
            <h3>The Page does not exist!</h3>
            <div className="unfound-page-img">Unfound Page Image</div>
            <SmallButton isFilled color="green" onClick={onClick}>To Home</SmallButton>     
        </div>
    );
}

export default PageNotFound;