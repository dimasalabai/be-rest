import Joi from "joi";

export const favoriteCountrySchema = Joi.object({
	id: Joi.string().required(),
});
