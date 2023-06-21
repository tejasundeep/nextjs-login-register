import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const RegistrationForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("api/user/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (response.ok) {
				setSuccess(true);
				setError(null);

				setTimeout(() => {
					setSuccess(false);
				}, 2000); // Reset success after 2 seconds
			} else {
				const data = await response.json();
				setError(data.error);
				setSuccess(false);

				setTimeout(() => {
					setError(null);
				}, 2000); // Reset error after 2 seconds
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
			setSuccess(false);

			setTimeout(() => {
				setError(null);
			}, 2000); // Reset error after 2 seconds
		}
	};

	return (
		<div>
			<h1>Registration Form</h1>
			{success && (
				<Alert variant="success">
					Registration successful! You can now log in.
				</Alert>
			)}
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</div>
	);
};

export default RegistrationForm;
