import bcrypt from "bcrypt";
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import dbConnect from "@/database";

const passwordValidation = (value, helpers) => {
	const requirements = [
		{
			regex: /[a-zA-Z]/g,
			error: "Password must contain at least two alphabets.",
		},
		{ regex: /\d/g, error: "Password must contain at least two numbers." },
		{
			regex: /[!@#$%^&*(){}[\]<>?/|,.;:`~\-_=+]/g,
			error: "Password must contain at least two symbols.",
		},
	];

	for (let { regex, error } of requirements) {
		if ((value.match(regex) || []).length < 2) {
			return helpers.message({ custom: error });
		}
	}

	if (value.length < 8) {
		return helpers.message({
			custom: "Password length must be exactly 8 characters.",
		});
	}

	return value;
};

const schema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string()
		.custom(passwordValidation, "Password Validation")
		.required(),
});

export default async (req, res) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res
			.status(StatusCodes.METHOD_NOT_ALLOWED)
			.json({ error: `Method ${req.method} Not Allowed` });
	}

	const { error, value } = schema.validate(req.body);
	if (error) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: error.details[0].message });
	}

	try {
		const pool = await dbConnect();
		const [users] = await pool.execute(
			"SELECT * FROM `users` WHERE `email` = ?",
			[value.email]
		);

		if (users.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: "User with same email already exists." });
		}

		const hashedPassword = await bcrypt.hash(value.password, 10);

		await pool.execute(
			"INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)",
			[value.username, value.email, hashedPassword]
		);

		return res
			.status(StatusCodes.OK)
			.json({ message: "User created successfully." });
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: "An error occurred while processing your request.",
		});
	}
};
