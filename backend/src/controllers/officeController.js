import { $Enums, PrismaClient } from "@prisma/client";
import { UserController, resultSelectUser } from "./userController.js";
import { prisma, debugError, missingArgsFromReqBody } from "../utils/utils.js";

export const OfficeMemberController = {
  /**
   * @param {string} id
   * @returns {Promise<import("@prisma/client").Office>}
   * */
  async findById(id) {
    return await prisma.office.findUnique({
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
  async getOfficeMembers(req, res) {
    try {
      const [decoded, errorMessage] = UserController.getUserFromToken(req);

      if (errorMessage !== "") {
        res.status(400).json({ error: errorMessage });
        return;
      }

      if (!authorizedRoles().includes(decoded.role)) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const officeMembers = await prisma.officeMember.findMany({
        select: {
          user: {
            select: resultSelectUser,
          },
          approvedEvents: true,
        },
      });

      res.json(officeMembers);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {Promise<void>}
   * */
  async createOfficeMember(req, res) {
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

    const [decoded, errorMessage] = UserController.getUserFromToken(req);

    if (errorMessage !== "") {
      res.status(400).json({ error: errorMessage });
      return;
    }

    if (!authorizedRoles().includes(decoded.role)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    try {
      const officeMember = await UserController.create(
        name,
        email,
        password,
        $Enums.Role.OFFICE_MEMBER,
      );

      res.json(officeMember);
    } catch (error) {
      res.status(400).json({ error: debugError(error) });
    }
  },
};

const authorizedRoles = () => [$Enums.Role.OFFICE_MEMBER];
