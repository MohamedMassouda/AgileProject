import express from "express";
import { SponsorController } from "../controllers/sponsorController.js";
import { EventController } from "../controllers/eventController.js";

const sponsorRouter = express.Router();
const controller = SponsorController;

sponsorRouter.get("/", controller.getSponsors);
sponsorRouter.get("/me", controller.getSelf);

sponsorRouter.post("/", controller.createSponsor);
sponsorRouter.post("/request-event", EventController.createEvent);

export default sponsorRouter;
