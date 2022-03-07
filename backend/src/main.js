const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./router/index.js');
const errorMiddleware = require("./middleware/error-midleware.js");

require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use("/api-v1", router);
app.use(errorMiddleware);

const startApp = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
		app.listen(process.env.PORT, () => {
			console.log("starting server on PORT", process.env.PORT);
		});
	} catch (e) {
		console.log("Error in startApp func --------------> ", e);
	}
};

startApp();