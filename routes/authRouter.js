import express from "express";

import authControllers from "../controllers/authControllers.js";

import { userSignInSchema, userSignUpSchema } from "../schemas/usersSchemas.js";
import { favoriteCountrySchema } from "../schemas/countriesSchemas.js";
import validateBody from "../helpers/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

// Registartion
authRouter.post(
	"/register",
	validateBody(userSignUpSchema),
	authControllers.signup
);

authRouter.post(
	"/login",
	validateBody(userSignInSchema),
	authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.get("/favorite", authenticate, authControllers.getFavoriteCountries);

authRouter.post(
	"/addFavorite",
	authenticate,
	validateBody(favoriteCountrySchema),
	authControllers.addFavoriteCountry
);

authRouter.delete(
	"/deleteFavorite",
	authenticate,
	validateBody(favoriteCountrySchema),
	authControllers.deleteFavoriteCountry
);

export default authRouter;
