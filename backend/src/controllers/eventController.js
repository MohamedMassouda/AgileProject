import { $Enums, PrismaClient } from "@prisma/client";
import { getTokenFromHeader, missingArgsFromReqBody } from "../utils/utils.js";
import { UserController } from "./userController.js";

const prisma = new PrismaClient();

export const EventController = {
  /**
   * @param {string} id
   * @returns {Promise<import("@prisma/client").Event>}
   * */
  async findById(id) {
    return await prisma.event.findUnique({
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
  async getEvents(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);

    if (errorMessage.length > 0) {
      return res.status(400).json({ error: errorMessage });
    }

    try {
      const events = await prisma.event.findMany({
        where: {
          isApproved: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          location: true,
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      res.json(events);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getEventById(req, res) {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: {
          id: id,
        },
      });

      res.json(event);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createEvent(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);
    if (errorMessage !== "") {
      return res.status(400).json({ error: errorMessage });
    }

    if (!authorizedRoles().includes(decoded.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const missing = missingArgsFromReqBody(req.body, [
      "title",
      "description",
      "date",
      "location",
      "categoriesId",
    ]);

    if (missing.length > 0)
      return res.status(400).json({ error: `Missing arguments: ${missing}` });

    try {
      const { title, description, date, location, categoriesId } = req.body;

      /*
       * Events are created as unapproved by default.
       * An admin will have to approve the event before it is displayed.
       */
      const event = await prisma.event.create({
        data: {
          title,
          description,
          date,
          location,
          categoriesId,
          isApproved: false,
        },
      });

      res.json(event);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
};

function authorizedRoles() {
  return [$Enums.Role.SPONSOR, $Enums.Role.OFFICE_MEMBER];
}
