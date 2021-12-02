import { Router } from "express";
import {SimioController} from "../controller/SimioController";

const routes = Router();

routes.post("/simian", new SimioController().isSimian)
routes.get("/stats", new SimioController().checarStats)

export { routes };
