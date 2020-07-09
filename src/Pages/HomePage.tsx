import React from 'react';
import Button from '../Components/Shared/Button';
import { signOut } from '../api/firebase';
import { useHistory } from 'react-router-dom';

function HomePage() {

    const routerHistory = useHistory();
    const onClick = async () => {
        try {
            await signOut();
            routerHistory.push({ pathname: '/auth' });
        } catch (e) {
            throw new Error(e);
        }
    };

    return <div>
        hello world!
        <Button isFilled onClick={onClick} type="button">Sign Out</Button>
    </div>;
}

export default HomePage;