import express from "express";
import { EventController } from "../controllers/eventController.js";

const eventRouter = express.Router();
const controller = EventController;

eventRouter.get("/", controller.getEvents);

export default eventRouter;
