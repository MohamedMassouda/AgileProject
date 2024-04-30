import express from "express";
import { EventController } from "../controllers/eventController.js";

const eventRouter = express.Router();
const controller = EventController;

eventRouter.get("/", controller.getEvents);
eventRouter.get("/all", controller.getAllEvents);
eventRouter.get("/:id", controller.getEventById);

eventRouter.post("/", controller.createEvent);

export default eventRouter;
