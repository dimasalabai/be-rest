import express from "express";

import countryControllers from "../controllers/countryControllers.js";

const countryRouter = express.Router();

countryRouter.get("/", countryControllers.getAllCountries);

export default countryRouter;
