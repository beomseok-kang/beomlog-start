import React, { useState, useEffect } from 'react';
import "./InvalidAccess.scss";

function InvalidAccess () {
    const [showInvalid, setShowInvalid] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowInvalid(true);
        }, 500);
    });

    return (
        <>
            {
                showInvalid
                ? <div className="invalid-wrapper">
                    <div className="invalid-img">Invalid Access Image</div>
                    <h2>Invalid Access</h2>
                    <h3>The access is not valid.</h3>
                </div>
                : null
            }
        </>
    );
}

export default InvalidAccess;