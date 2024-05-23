import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import sendEmail from "../helpers/sendEmail.js";

import emailFile from "../constants/email-constant.js";

const { GMAIL_SEND_TO } = process.env;

const needHelp = async (req, res) => {
	const { name, message, email } = req.body;
	const mailToUs = {
		to: GMAIL_SEND_TO,
		subject: "Need Help",
		html: `<h1>From: ${name}</h1>
				<h2>Contact email: ${email}</h2>
				<p>${message}</p>`,
	};
	const mailToUser = {
		to: email,
		subject: "BeRest",
		html: `${emailFile}`,
	};

	await sendEmail(mailToUs);
	await sendEmail(mailToUser);

	res.status(200).json({ message: "Success" });
};

export default {
	needHelp: ctrlWrapper(needHelp),
};
