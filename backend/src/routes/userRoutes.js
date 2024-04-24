import express from "express";
import { UserController } from "../controllers/userController.js";

const userRouter = express.Router();
const controller = UserController;

userRouter.get("/", controller.getUsers);
userRouter.get("/me", controller.getSelf);
userRouter.get("/:id", controller.getUser);

userRouter.post("/", controller.createUser);
userRouter.post("/login", controller.login);

export default userRouter;
