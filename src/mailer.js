import nodemailer from "nodemailer";

const from = '"react-webApp" <info@react.com>';

function setup() {
	return nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "47601e8371e81f",
			pass: "0a5e0e01a30d4d"
		}
	});
}
export function sendConfirmationEmail(user) {
	const tranport = setup();
	const email = {
		from,
		to: user.email,
		subject: "Welcome to Bookworm",
		text: `
    Welcome to Bookworm. Please, confirm your email.
    ${user.generateJWTConfirmationUrl()}
    `
	};

	tranport.sendMail(email);
}
