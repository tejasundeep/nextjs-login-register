import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";

const createNewUser = async (username, email, password) => {
    const response = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    return response.json();
};

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await createNewUser(username, email, password);

            if (data.error) {
                setMessage({ type: "danger", text: data.error });
                startMessageTimeout();
                return;
            }

            setMessage({ type: "success", text: "Registration successful!" });
            startMessageTimeout();

            const result = await signIn("credentials", { redirect: false, username, password });

            if (result.error) {
                setMessage({ type: "danger", text: result.error });
                startMessageTimeout();
                return;
            }

            router.push("/");
        } catch (error) {
            setMessage({ type: "danger", text: "An error occurred. Please try again." });
            startMessageTimeout();
        }
    };

    const startMessageTimeout = () => {
        setTimeout(() => {
            setMessage({ type: "", text: "" });
        }, 2000); // This will remove the message after 5 seconds
    };

    return (
        <div>
            <h1>Registration</h1>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}
