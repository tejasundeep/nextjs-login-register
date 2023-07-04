import { useEffect, useState } from 'react';

const LoggedinUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/loggedin`)
            .then(response => response.json())
            .then(userData => setUser(userData))
            .catch(error => setError(error));
    }, []);


    return (
        /*
        <>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}        
        </>
        */
       <></>
    );
};

export default LoggedinUser;
