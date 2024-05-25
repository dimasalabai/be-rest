import Country from "../models/Country.js";

export const getAllCountriesService = () => Country.find();
