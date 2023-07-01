import Register from "@/layout/welcome/register";
import Login from "@/layout/welcome/login";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const RegistrationPage = () => {
    const { data: session } = useSession();
    const router = useRouter()

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => router.push('/'))
    }

    if (session) {
        return (
            <>
                <h1>welcome</h1>
                Signed in as {session.user.email} <br />
                <Button variant="primary" onClick={handleSignOut}>Sign out</Button>
            </>
        );
    } else {
        return (
            <>
                <Login />
                <Register />
            </>
        );
    }
};

export default RegistrationPage;
