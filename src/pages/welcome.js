import Register from "@/layout/welcome/register";
import Login from "@/layout/welcome/login";
import { useSession, signIn, signOut } from "next-auth/react"

const RegistrationPage = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <h1>welcome</h1>     
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
