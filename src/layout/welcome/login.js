import { useState, useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Alert, Button, Form } from "react-bootstrap";

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const { username, password } = credentials;

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (!result.error) {
            router.push("/welcome");
        } else {
            setError(result.error);
        }
    }, [credentials, router]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }, []);

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError("");
            }, 2000);

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
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        autoComplete="off"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        autoComplete="off"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </>
    );
}

export default Login;
