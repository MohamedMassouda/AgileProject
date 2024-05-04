import {
  debugError,
  makeDateBetter,
  missingArgsFromReqBody,
  prisma,
} from "../utils/utils.js";

export const NewsController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async getNews(req, res) {
    try {
      const news = await prisma.news.findMany({
        orderBy: {
          date: "desc",
        },
      });

      news.map((n) => {
        n.date = makeDateBetter(n.date);
      });

      res.status(200).json(news);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createNews(req, res) {
    const missing = missingArgsFromReqBody(req, ["title", "content"]);

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing ${missing.join(", ")}` });
    }

    try {
      const news = await prisma.news.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          writerId: req.user.id,
        },
      });

      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async updateNews(req, res) {
    const { id } = req.params;
    const missing = missingArgsFromReqBody(req, ["title", "content"]);

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing ${missing.join(", ")}` });
    }

    try {
      const news = await prisma.news.update({
        where: {
          id: id,
        },
        data: {
          title: req.body.title,
          content: req.body.content,
        },
      });

      res.json(news);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async deleteNews(req, res) {
    const { id } = req.params;

    try {
      await prisma.news.delete({
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
