import { useEffect, useState } from 'react';

const SessionDetails = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXTAUTH_URL}/api/user/session`)
            .then(response => response.json())
            .then(sessionData => setSession(sessionData))
            .catch(error => setError(error));
    }, []);

    return (
        /*
        <>
            {session && (
                <>
                    <p>Location: {session.city}, {session.regionName}, {session.country}</p>
                    <p>Operating System: {session.os}</p>
                    <p>Browser: {session.browser}</p>
                </>
            )}
        </>
        */
        <></>
    );
};

export default SessionDetails;
