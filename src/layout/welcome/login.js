import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
            router.push("/welcome");
        } else {
            // handle error, set the error state
            setError(result.error);
        }
    };

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError("");
            }, 5000); // Clear error after 5 seconds
            return () => clearTimeout(timeout);
        }
    }, [error]);

    return (
        <>
            <h1>Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </>
    );
};

export default Login;
