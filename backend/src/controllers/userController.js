import { $Enums } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  debugError,
  getSecretToken,
  getTokenFromHeader,
  isEmailValid,
  missingArgsFromReqBody,
  prisma,
  resultSelectUser,
  sendEmail,
  sendEmailVerification,
} from "../utils/utils.js";

const saltRounds = 10;

export const UserController = {
  /**
   * @param {string} id
   * @returns {Promise<import("@prisma/client").User>}
   * */
  async findById(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: resultSelectUser,
      });

      res.json(users);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getSelf(req, res) {
    try {
      // Replaced role: true with roleId: true
      // This way I can get the role as a string that contains the name only instead of getting {id: "", name: ""}
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          imageUrl: true,
          emailVerified: true,
          events: {
            select: {
              id: true,
            },
          },
        },
      });

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getUser(req, res) {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} roleName
   * @returns {Promise<import("@prisma/client").User>}
   * */
  async create(name, email, password, roleName = $Enums.Role.MEMBER) {
    if (!isEmailValid(email)) {
      throw new Error("Invalid email");
    } else if ((await UserController.findByEmail(email)) != null) {
      throw new Error("Email already exists");
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (err) {
      throw new Error("Error hashing password");
    }

    let user;
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: $Enums.Role[roleName],
          imageUrl: "",
          officeMember:
            roleName === $Enums.Role.OFFICE_MEMBER
              ? {
                  create: {},
                }
              : undefined,
          sponsor:
            roleName === $Enums.Role.SPONSOR ? { create: {} } : undefined,
        },
        select: resultSelectUser,
      });
    } catch (err) {
      console.log(err.message);
      throw new Error("Error creating user");
    }

    return user;
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  async login(req, res) {
    const missingArgs = missingArgsFromReqBody(req, ["email", "password"]);

    if (missingArgs.length > 0) {
      res.status(400).json({ error: `Missing arguments: ${missingArgs}` });
      return;
    }

    const { email, password } = req.body;

    if (!isEmailValid(email)) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    let user;
    try {
      user = await UserController.findByEmail(email);

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(400).json({ error: "Invalid password" });
        return;
      }

      if (!user.emailVerified) {
        res.status(400).json({ error: "Email not verified" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
      return;
    }

    // Send user otp
    sendEmail(user.email, user.id);

    res.json({ message: "OTP sent to email" });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async verifyEmail(req, res) {
    const { id } = req.params;

    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          emailVerified: true,
        },
      });

      res.status(200).json({ message: "Email verified" });
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createUser(req, res) {
    const missingArgs = missingArgsFromReqBody(req, [
      "name",
      "email",
      "password",
    ]);
    if (missingArgs.length > 0) {
      res.status(400).json({ error: `Missing arguments: ${missingArgs}` });
      return;
    }

    const { name, email, password } = req.body;

    if (!isEmailValid(email)) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    try {
      const user = await UserController.create(name, email, password);
      sendEmailVerification(user.email, user.id);

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  async findByName(name) {
    return await prisma.user.findUnique({
      where: {
        name,
      },
    });
  },

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async updateUser(req, res) {
    const { id } = req.params;
    const missingArgs = missingArgsFromReqBody(req, [
      "name",
      "email",
      "password",
    ]);

    if (missingArgs.length > 0) {
      res.status(400).json({ error: `Missing arguments: ${missingArgs}` });
      return;
    }
    const { name, email, password } = req.body;

    try {
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
          password,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @returns {[jwt.JwtPayload | null, string]}
   */
  getUserFromToken(req) {
    const token = getTokenFromHeader(req);

    if (!token) {
      return [null, "Invalid token"];
    }

    try {
      const decoded = jwt.verify(token, getSecretToken());
      return [decoded, ""];
    } catch (error) {
      return [null, debugError(error)]; // Handle invalid token error
    }
  },
};
