import express from "express";
import { EventController } from "../controllers/eventController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import { $Enums } from "@prisma/client";

const eventRouter = express.Router();
const controller = EventController;

function authorizedRoles() {
  return [$Enums.Role.SPONSOR, $Enums.Role.OFFICE_MEMBER];
}

const authenticate = (req, res, next) => {
  authenticateUser(req, res, next, authorizedRoles());
};

const authenticateOfficeMember = (req, res, next) => {
  authenticateUser(req, res, next, [$Enums.Role.OFFICE_MEMBER]);
};

eventRouter.get("/", authenticateUser, controller.getEvents);
eventRouter.get("/all", authenticateOfficeMember, controller.getAllEvents);
eventRouter.get("/:id", authenticateUser, controller.getEventById);

eventRouter.post("/", authenticate, controller.createEvent);

eventRouter.put("/:id/add-attendee", authenticateUser, controller.addAttendee);
eventRouter.put(
  "/:id/remove-attendee",
  authenticateUser,
  controller.removeAttendee,
);
eventRouter.put("/:id", authenticateUser, controller.updateEvent);
eventRouter.put(
  "/:id/approve",
  authenticateOfficeMember,
  controller.approveEvent,
);
eventRouter.put(
  "/:id/reject",
  authenticateOfficeMember,
  controller.rejectEvent,
);

export default eventRouter;
