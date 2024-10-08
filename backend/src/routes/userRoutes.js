import { $Enums } from "@prisma/client";
import express from "express";
import { UserController } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import { OtpController } from "../controllers/otpController.js";

const userRouter = express.Router();
const controller = UserController;

/**
 * @returns {string[]}
 */
function authorizedRoles() {
  return [$Enums.Role.OFFICE_MEMBER];
}

const authenticate = (req, res, next) => {
  authenticateUser(req, res, next, authorizedRoles());
};

userRouter.get("/validate-otp", OtpController.validateOtp);
userRouter.get("/verify-email/:id", controller.verifyEmail);
userRouter.get("/resend-otp", OtpController.resendOtp);

userRouter.get("/", authenticate, controller.getUsers);
userRouter.get("/me", authenticateUser, controller.getSelf);
userRouter.get("/:id", authenticate, controller.getUser);

userRouter.post("/", controller.createUser);
userRouter.post("/login", controller.login);

userRouter.delete("/:id", authenticate, controller.deleteUser);

export default userRouter;
