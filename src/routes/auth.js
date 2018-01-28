import express from "express";
import User from "../models/User";

import { sendResetPasswordEmail } from "../mailer";

const router = express.Router();

router.post("/", (req, res) => {
	const { credentials } = req.body;
	User.findOne({ email: credentials.email }).then(user => {
		if (user && user.isValidPassword(credentials.password)) {
			res.json({ user: user.toAuthJSON() });
		} else {
			res.status(400).json({ errors: { global: "Invalid credentials" } });
		}
	});
});
router.post("/confirmation", (req, res) => {
	const token = req.body.token;
	User.findOneAndUpdate(
		{ confirmationToken: token },
		{ confirmed: true },
		{ new: false }
	).then(user => {
		if (user) {
			if (!user.confirmed) {
				res.json({ user: user.toAuthJSON() });
			} else if (user.confirmed) {
				res.status(400).json({
					errors: {
						global: "This email has already been validate"
					}
				});
			}
		} else {
			res
				.status(400)
				.json({ errors: { global: "This token seems to be Invalid" } });
		}
	});
});
router.post("/reset_password_request", (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			sendResetPasswordEmail(user);
			res.json({});
		} else {
			res.status(400).json({
				errors: { global: "There is no user with such email" }
			});
		}
	});
});
export default router;
