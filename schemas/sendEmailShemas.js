import Joi from "joi";

import { emailRegepxp } from "../constants/user-constants.js";

export const userSignUpSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegepxp).required(),
	message: Joi.string(),
});
