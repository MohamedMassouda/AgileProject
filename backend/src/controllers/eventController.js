import { $Enums, PrismaClient } from "@prisma/client";
import {
  debugError,
  getTokenFromHeader,
  missingArgsFromReqBody,
} from "../utils/utils.js";
import { UserController, resultSelectUser } from "./userController.js";
import { CategoryController } from "./categoryController.js";

const prisma = new PrismaClient();

const resultSelectEvent = {
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

  host: {
    select: {
      user: {
        select: resultSelectUser,
      },
    },
  },
};

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

  async getEventsFromDB(hostId, showAll = false, showUnapproved = false) {
    const getAllEvents = async () => {
      return await prisma.event.findMany({
        select: resultSelectEvent,
      });
    };

    try {
      const events = showAll
        ? await getAllEvents()
        : await prisma.event.findMany({
            where: {
              isApproved: showUnapproved ? false : true,
              hostId: hostId,
            },
            select: resultSelectEvent,
          });

      return events;
    } catch (error) {
      console.error(error.message);
    }

    return [];
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
      const events = await EventController.getEventsFromDB();

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

    const missing = missingArgsFromReqBody(req, [
      "title",
      "description",
      "date",
      "location",
      "categories",
    ]);

    if (missing.length > 0)
      return res.status(400).json({ error: `Missing arguments: ${missing}` });
    else if (typeof req.body.categories !== "object")
      return res.status(400).json({ error: "Invalid categories" });

    try {
      const { title, description, date, location, categories } = req.body;

      const categoriesId =
        await CategoryController.categoriedIdFromRequest(categories);

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
          host: {
            connect: {
              userId: decoded.id,
            },
          },
          isApproved: false,
          categories: {
            connect: categoriesId.map((id) => ({ id })),
          },
        },
      });

      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getAllEvents(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);
    if (errorMessage !== "") {
      return res.status(400).json({ error: errorMessage });
    }

    if (decoded.role !== $Enums.Role.OFFICE_MEMBER) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    try {
      const events = await EventController.getEventsFromDB(null, true);

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
  async updateEvent(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);
    if (errorMessage !== "") {
      return res.status(400).json({ error: errorMessage });
    }

    if (!authorizedRoles().includes(decoded.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const missing = missingArgsFromReqBody(req, ["id"]);
    if (missing.length > 0)
      return res.status(400).json({ error: `Missing arguments: ${missing}` });

    try {
      const { id, title, description, date, location, categories } = req.body;

      const categoriesId =
        await CategoryController.categoriedIdFromRequest(categories);

      const event = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          date,
          location,
          categories: {
            set: categoriesId.map((id) => ({ id })),
          },
        },
      });

      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async approveEvent(req, res) {
    const [decoded, errorMessage] = UserController.getUserFromToken(req);
    if (errorMessage !== "") {
      return res.status(400).json({ error: errorMessage });
    }

    if (decoded.role !== $Enums.Role.OFFICE_MEMBER) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    try {
      const event = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          isApproved: true,
          approvedBy: {
            connect: {
              userId: decoded.id,
            },
          },
        },
      });

      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: debugError(error) });
    }
  },
};

function authorizedRoles() {
  return [$Enums.Role.SPONSOR, $Enums.Role.OFFICE_MEMBER];
}
