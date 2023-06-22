import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (!result.error) {
            // handle successful login, e.g. redirect
            router.push("/dashboard");
        } else {
            // handle error, e.g. show message to user
            alert(result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Log in</button>
        </form>
    );
};

export default LoginForm;
