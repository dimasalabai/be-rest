import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
	const { email, password } = req.body;

	const user = await authServices.findUser({ email });
	if (user) {
		throw HttpError(409, "Email already in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await authServices.signup({
		...req.body,
		password: hashPassword,
	});

	res.status(201).json({
		user: { email: newUser.email, name: newUser.name },
	});
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	const user = await authServices.findUser({ email });
	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}
	console.log("user", user);

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}

	const { _id: id } = user;
	const payload = {
		id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await authServices.updateUser({ _id: id }, { token });

	res.json({
		token,
		user: {
			email,
			name: user.name,
		},
	});
};

const getCurrent = async (req, res) => {
	const { email, name } = req.user;
	console.log(req.user);

	res.json({
		email,
		name,
	});
};

const signout = async (req, res) => {
	const { _id } = req.user;
	await authServices.updateUser({ _id }, { token: "" });

	res.status(204).json();
};

const getFavoriteCountries = async (req, res) => {
	const { _id } = req.user;
	const currentUser = await authServices.findUser({ _id }).populate({
		path: "favoriteCountries",
		slelect: {
			_id: 1,
			country: 1,
			city: 1,
			image: 1,
		},
	});
	console.log(currentUser);
	res.json({
		user: currentUser,
	});
};

const addFavoriteCountry = async (req, res) => {
	const { _id } = req.user;

	const favoriteCountry = req.body;

	const currentUser = await User.findById({ _id });

	currentUser.favoriteCountries.push(favoriteCountry.id);
	await currentUser.save();

	res.status(201).json(currentUser);
};

const deleteFavoriteCountry = async (req, res) => {
	const { _id } = req.user;

	const favoriteCountry = req.body;
	const { id } = favoriteCountry;
	const currentUser = await User.findById({ _id });

	const deletedCountryId = currentUser.favoriteCountries.findIndex(
		(favoriteCountryId) => favoriteCountryId.toString() === id.toString()
	);

	if (deletedCountryId === -1) {
		throw HttpError(404, `Country with id = ${id} not found`);
	}

	currentUser.favoriteCountries.splice(deletedCountryId, 1);

	await currentUser.save();

	res.status(201).json(currentUser);
};

export default {
	signup: ctrlWrapper(signup),
	signin: ctrlWrapper(signin),
	getCurrent: ctrlWrapper(getCurrent),
	signout: ctrlWrapper(signout),
	getFavoriteCountries: ctrlWrapper(getFavoriteCountries),
	addFavoriteCountry: ctrlWrapper(addFavoriteCountry),
	deleteFavoriteCountry: ctrlWrapper(deleteFavoriteCountry),
};
