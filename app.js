import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
const { DB_HOST, PORT = 3000 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

// prettier-ignore
mongoose.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Database connection successful on PORT: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error.message);
		process.exit(1);
	});

export default app;
