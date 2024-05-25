import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const countrySchema = new Schema(
	{
		сountry: {
			type: String,
			required: [true, "Name is required"],
		},
		city: {
			type: String,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);
countrySchema.post("save", handleSaveError);

countrySchema.pre("findByIdAndUpdate", setUpdateSettings);
countrySchema.post("findByIdAndUpdate", handleSaveError);

const Country = model("country", countrySchema);

export default Country;
