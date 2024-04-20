import { $Enums, PrismaClient } from "@prisma/client";
import { isEmailValid, missingArgsFromReqBody } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import {
  getSecretToken,
  getTokenFromHeader,
  debugError,
} from "../utils/utils.js";
import { Role } from "../utils/Role.js";

const prisma = new PrismaClient();

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
      const token = getTokenFromHeader(req);

      if (!token) {
        res.status(200).json({ error: "Invalid token" });
        return;
      }

      const decoded = jwt.verify(token, getSecretToken());

      if (!authorizedRoles().includes(decoded.role)) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
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
    const token = getTokenFromHeader(req);

    if (!token) {
      res.status(200).json({ error: "Invalid token" });
      return;
    }

    try {
      const decoded = jwt.verify(token, getSecretToken());

      // Replaced role: true with roleId: true
      // This way I can get the role as a string that contains the name only instead of getting {id: "", name: ""}
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
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
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getUser(req, res) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.json(user);
  },

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<import("@prisma/client").User>}
   * */
  async create(name, email, password, roleName = "member") {
    if (!isEmailValid(email)) {
      throw new Error("Invalid email");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: $Enums.Role[roleName],
      },
    });

    return user;
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * */
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!isEmailValid(email)) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }

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
      res.status(500).json({ error: debugError(error) });
    }

    res.status(200).json({ token: token });
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
    } else if ((await UserController.findByEmail(email)) != null) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    try {
      const user = await UserController.create(name, email, password);

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
};

/**
 * @returns {string[]}
 */
function authorizedRoles() {
  return [$Enums.Role.ADMIN, $Enums.Role.OFFICE];
}
