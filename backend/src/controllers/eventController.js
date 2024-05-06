import { $Enums } from "@prisma/client";
import {
  debugError,
  makeDateBetter,
  missingArgsFromReqBody,
  prisma,
  resultSelectEvent,
} from "../utils/utils.js";
import { CategoryController } from "./categoryController.js";

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
        where: {
          date: {
            gte: new Date(),
          },
        },
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
              date: {
                gte: new Date(),
              },
            },
            select: resultSelectEvent,
          });

      events.map((event) => {
        event.date = makeDateBetter(event.date);
      });

      return events;
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: debugError(error) });
    }

    return [];
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getEvents(req, res) {
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
          date: new Date(date),
          location,
          host: {
            connect: {
              userId: req.user.id,
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
    const { id } = req.params;

    try {
      const { title, description, date, location, categories } = req.body;

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
    const { id } = req.params;
    try {
      const event = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          isApproved: true,
          status: $Enums.EventStatus.APPROVED,
          approvedBy: {
            connect: {
              userId: req.user.id,
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

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async rejectEvent(req, res) {
    const { id } = req.params;
    try {
      const event = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          isApproved: false,
          status: $Enums.EventStatus.REJECTED,
          approvedBy: {
            connect: {
              userId: req.user.id,
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

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async addAttendee(req, res) {
    const { id } = req.params;
    try {
      if ((await EventController.findById(id)) === null) {
        return res.status(404).json({ error: "Event not found" });
      }

      const isAttending = await prisma.event.findFirst({
        where: {
          id: id,
        },
        select: {
          attendees: {
            where: {
              userId: req.user.id,
            },
          },
        },
      });

      if (isAttending.attendees.length > 0) {
        return res.status(400).json({ error: "User is already attending" });
      }

      const event = await prisma.event.update({
        where: {
          id: id,
          isApproved: true,
        },
        data: {
          attendees: {
            connect: {
              userId: req.user.id,
            },
          },
          attendeeCount: {
            increment: 1,
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
  async removeAttendee(req, res) {
    const { id } = req.params;
    try {
      if ((await EventController.findById(id)) === null) {
        return res.status(404).json({ error: "Event not found" });
      }

      const isAttending = await prisma.event.findFirst({
        where: {
          id: id,
        },
        select: {
          attendees: {
            where: {
              userId: req.user.id,
            },
          },
        },
      });

      if (isAttending.attendees.length === 0) {
        return res.status(400).json({ error: "User is not attending" });
      }

      const event = await prisma.event.update({
        where: {
          id: id,
          isApproved: true,
        },
        data: {
          attendees: {
            disconnect: {
              userId: req.user.id,
            },
          },
          attendeeCount: {
            decrement: 1,
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
