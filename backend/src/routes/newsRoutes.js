import express from "express";
import { NewsController } from "../controllers/newsController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import { $Enums } from "@prisma/client";

const newsRouter = express.Router();
const controller = NewsController;

const authenticate = (req, res, next) => {
  authenticateUser(req, res, next, [$Enums.Role.OFFICE_MEMBER]);
};

newsRouter.get("/", authenticateUser, controller.getNews);

newsRouter.post("/", authenticate, controller.createNews);

export default newsRouter;
