import { $Enums, PrismaClient } from "@prisma/client";
import { UserController, resultSelectUser } from "./userController.js";
import { debugError, missingArgsFromReqBody } from "../utils/utils.js";
import { EventController } from "./eventController.js";

const prisma = new PrismaClient();

export const SponsorController = {
  /**
   * @param {string} id
   * @returns {Promise<import("@prisma/client").Sponsor>}
   * */
  async findById(id) {
    return await prisma.sponsor.findUnique({
      where: {
        userId: id,
      },
      select: {
        user: {
          select: resultSelectUser,
        },
        events: true,
      },
    });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getSponsors(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);

    if (errorMessage.length > 0) {
      return res.status(400).json({ error: errorMessage });
    }

    if (!authorizedRoles().includes(decoded.role)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    try {
      const sponsors = await prisma.sponsor.findMany({
        select: {
          user: {
            select: resultSelectUser,
          },
          events: true,
        },
      });

      res.json(sponsors);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createSponsor(req, res) {
    const missingArgs = missingArgsFromReqBody(req, [
      "name",
      "email",
      "password",
    ]);

    if (missingArgs.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing arguments: ${missingArgs}` });
    }

    const { name, email, password } = req.body;

    try {
      const sponsor = await UserController.create(
        name,
        email,
        password,
        $Enums.Role.SPONSOR,
      );

      res.json(sponsor);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async requestEvent(req, res) {
    await EventController.createEvent(req, res);
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getSelf(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);

    if (errorMessage.length > 0) {
      return res.status(400).json({ error: errorMessage });
    }

    if (decoded.role !== $Enums.Role.SPONSOR) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    try {
      const sponsor = await SponsorController.findById(decoded.id);

      res.json(sponsor);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },
};

const authorizedRoles = () => [$Enums.Role.OFFICE_MEMBER];
