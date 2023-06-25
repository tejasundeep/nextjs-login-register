import { useState } from "react";

const ContactForm = () => {
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const to = "recipient@example.com";

        try {
            const response = await fetch("/api/mail/forgot_otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ to, subject }),
            });

            if (response.ok) {
                setEmailSent(true);
            } else {
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Send Reset Link</button>
            {emailSent && <p>Email sent successfully!</p>}
        </form>
    );
};

export default ContactForm;
