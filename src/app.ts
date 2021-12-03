import express from "express";
import { routes } from "./routes/routes";

const app = express();
app.use(express.json());
app.use(routes);

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Content-Type', 'application/json');
	// @ts-ignore
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});



export {app}
