import express from "express";

import emailControllers from "../controllers/emailControllers.js";

const emailRouter = express.Router();

emailRouter.patch("/need-help", emailControllers.needHelp);

export default emailRouter;
