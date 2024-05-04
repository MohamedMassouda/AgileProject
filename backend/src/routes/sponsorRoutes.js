import { $Enums } from "@prisma/client";
import express from "express";
import { SponsorController } from "../controllers/sponsorController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const sponsorRouter = express.Router();
const controller = SponsorController;

const authorizedRoles = () => [$Enums.Role.OFFICE_MEMBER];

const authenticate = (req, res, next) => {
  authenticateUser(req, res, next, authorizedRoles());
};

sponsorRouter.get("/", authenticate, controller.getSponsors);
sponsorRouter.get("/me", authenticateUser, controller.getSelf);

sponsorRouter.post("/", authenticate, controller.createSponsor);

export default sponsorRouter;
