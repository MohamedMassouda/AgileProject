import { PrismaClient } from "@prisma/client";
import { debugError, missingArgsFromReqBody } from "../utils/utils.js";

const prisma = new PrismaClient();

export const CategoryController = {
  /**
   * @param {string} id
   * @returns {Promise<import("@prisma/client").Category>}
   * */
  async findById(id) {
    return await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
  },

  /**
   * @param {string} name
   * */
  async findByName(name) {
    return await prisma.category.findUnique({
      where: {
        name,
      },
    });
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getCategories(req, res) {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      res.json(categories);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });

      res.json(category);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param{string} name
   * */
  async create(name) {
    let category = null;
    try {
      category = await prisma.category.create({
        data: {
          name,
        },
      });
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }

    return category;
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createCategory(req, res) {
    const missingArgs = missingArgsFromReqBody(req, ["name"]);
    if (missingArgs.length > 0) {
      res.status(400).json({ error: `Missing arguments: ${missingArgs}` });
      return;
    }

    const { name } = req.body;

    if (name.trim().length === 0) {
      res.status(400).json({ error: "Name cannot be empty" });
      return;
    }

    try {
      const category = await CategoryController.create(name);

      res.json(category);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async deleteCategory(req, res) {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: {
          id: id,
        },
      });

      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },
};
