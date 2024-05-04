import express from "express";
import { OfficeMemberController } from "../controllers/officeController.js";

const officeMemberRouter = express.Router();
const controller = OfficeMemberController;

officeMemberRouter.get("/", controller.getOfficeMembers);

officeMemberRouter.post("/", controller.createOfficeMember);

export default officeMemberRouter;
