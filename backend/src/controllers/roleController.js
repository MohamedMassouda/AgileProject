import { prisma } from "../utils/utils";

export const RoleController = {
  async findAll() {
    return await prisma.role.findMany();
  },
  async findById(id) {
    return await prisma.role
      .findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
        },
      })
      .then((role) => role.name);
  },

  /**
   * @param {string} name
   * @returns {Promise<import("@prisma/client").Role>}
   * */
  async findByName(name) {
    return await prisma.role.findUnique({
      where: {
        name: name,
      },
    });
  },
};
