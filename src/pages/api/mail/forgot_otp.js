import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export default async function handler(req, res) {
    const generateOTP = () => {
        var digits = "0123456789";
        var otp = "";

        for (var i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }

        return otp;
    };

    if (req.method === "POST") {
        const { to } = req.body;
        const subject = `Forgot Password OTP`;
        const text = `Your otp is ${generateOTP()}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({
                message: `Failed to send email: ${error.message}`,
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
