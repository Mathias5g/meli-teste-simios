import express from "express";
import {SimioController} from "./controller/SimioController";

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Content-Type', 'application/json');
	// @ts-ignore
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.post("/simian", new SimioController().isSimian)
app.get("/stats", new SimioController().checarStats)

app.listen(4000);

export {app}
