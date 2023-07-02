import Register from "@/layout/welcome/register";
import Login from "@/layout/welcome/login";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Header from "@/layout/header";

const RegistrationPage = () => {
    const { data: session } = useSession();
    const router = useRouter()

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => {
            fetch('/api/clearCache', { 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email })
            })
            .then(() => router.push('/'))
            .catch((error) => console.error('Error:', error));
        });
    }

    if (session) {
        return (
            <>
                <Header />
                <h1>Welcome</h1>
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
