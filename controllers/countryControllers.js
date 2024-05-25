import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { getAllCountriesService } from "../services/countryServices.js";

const getAllCountries = async (req, res) => {
	const countries = await getAllCountriesService();
	if (!countries) {
		throw HttpError(404, `List is empty`);
	}

	res.json({
		countries,

		total: countries.length,
	});
};

export default {
	getAllCountries: ctrlWrapper(getAllCountries),
};
