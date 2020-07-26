import React, { useState, useEffect } from 'react';
import "./NoPostWrapper.scss";

function NoPostWrapper() {
    const [showNoPost, setShowNoPost] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowNoPost(true);
        }, 500);
    });

    return (
        <>
            {
                showNoPost
                ? <div className="no-postdata-wrapper">
                    <div className="no-postdata-img">No Postdata Image</div>
                    <h2>The post does not exist!</h2>
                    <h3>Please check the postId!</h3>
                </div>
                : null
            }
        </>
    );    
}

export default React.memo(NoPostWrapper);