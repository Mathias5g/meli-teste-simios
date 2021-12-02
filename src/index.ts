import express from "express";
import {SimioController} from "./controller/SimioController";

const app = express();
app.use(express.json());

app.post("/simian", new SimioController().isSimian)
app.get("/stats", new SimioController().checarStats)

app.listen(4000);

export {app}
