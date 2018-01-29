import express from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

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
				res.json({ user: user.toConfirmationJSON() });
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
			user.setResetPasswordToken();
			sendResetPasswordEmail(user);
			user.save().then(() => res.json({}));
		} else {
			res.status(400).json({
				errors: { global: "There is no user with such email" }
			});
		}
	});
});
router.post("/validate_token", (req, res) => {
	jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(401).json({});
		} else {
			User.findOneAndUpdate(
				{ _id: decoded._id },
				{ resetPasswordToken: "" },
				{ new: false }
			).then(user => {
				if (req.body.token === user.resetPasswordToken) {
					res.json({});
				} else {
					res.status(401).json({});
				}
			});
		}
	});
});
router.post("/reset_password", (req, res) => {
	const { password, token } = req.body.data;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(401).json({ errors: { global: "Invalid token" } });
		} else {
			User.findOne({ _id: decoded._id }).then(user => {
				if (user) {
					user.setPassword(password);
					user.save().then(() => res.json({}));
				} else {
					res
						.status(404)
						.json({ errors: { global: "Invalid token" } });
				}
			});
		}
	});
});
export default router;
