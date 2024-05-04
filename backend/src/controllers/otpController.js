import {
  debugError,
  getSecretToken,
  missingArgsFromReqBody,
  prisma,
  sendEmail,
} from "../utils/utils.js";
import { UserController } from "./userController.js";
import jwt from "jsonwebtoken";

export const OtpController = {
  async create(otp, userId) {
    await OtpController.deleteOtpByUserId(userId);
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 3);

    await prisma.otpToken.create({
      data: {
        userId,
        token: otp.toString(),
        expiresAt: expirationTime,
      },
    });
  },

  async findOtpByUserId(userId) {
    return await prisma.otpToken.findFirst({
      where: {
        userId: userId,
      },
    });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async validateOtp(req, res) {
    const missing = missingArgsFromReqBody(req, ["otp", "userId"]);

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing ${missing.join(", ")}` });
    }

    const { otp, userId } = req.body;

    if (!otp || otp.length !== 6) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    try {
      const token = await prisma.otpToken.findFirst({
        where: {
          token: otp,
          userId: userId,
        },
      });

      if (!token) {
        res.status(400).json({ error: "Invalid OTP" });
        return;
      }

      if (token.expiresAt < new Date()) {
        res.status(400).json({ error: "OTP expired" });
        return;
      }
    } catch (error) {
      return res.status(400).json({ error: debugError(error) });
    }

    const user = await UserController.findById(userId);

    let token;
    try {
      token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        getSecretToken(),
        {
          expiresIn: "1h",
        },
      );
    } catch (error) {
      return res.status(500).json({ error: debugError(error) });
    }

    res.status(200).json({ token: token });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async resendOtp(req, res) {
    const missingArgs = missingArgsFromReqBody(req, ["userId"]);

    if (missingArgs.length > 0) {
      res.status(400).json({ error: `Missing arguments: ${missingArgs}` });
      return;
    }

    const { userId } = req.body;

    let user;
    try {
      user = await UserController.findById(userId);

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      if (!user.emailVerified) {
        res.status(400).json({ error: "Email not verified" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }

    sendEmail(user.email, user.id);

    res.status(200).json({ message: "OTP sent to email" });
  },

  async deleteOtpByUserId(userId) {
    await prisma.otpToken.deleteMany({
      where: {
        userId: userId,
      },
    });
  },

  /**
   * @returns {number}
   * */
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  },
};
