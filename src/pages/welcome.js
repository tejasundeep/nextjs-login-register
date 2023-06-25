import Register from "@/layout/welcome/register";
import Login from "@/layout/welcome/login";
import { Button } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";

const RegistrationPage = () => {
    const { data: session } = useSession();

    if (session) {;
        return (
            <>
                <h1>welcome</h1>     
                Signed in as {session.user.email} <br />
                <Button variant="primary" onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }else{
        return (
            <>
                <Login />
                <Register />        
            </>
        );
    }
};

export default RegistrationPage;
