import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Role {
  static Member = "member";
  static Office = "office";
  static Sponsor = "sponsor";

  /**
   * @param {string} role
   * @returns {boolean}
   */
  async createRole(role) {
    await prisma.role.create({
      data: {
        name: role,
      },
    });
  }

  createAllRoles() {
    try {
      this.createRole(Role.Member);
      this.createRole(Role.Office);
      this.createRole(Role.Sponsor);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * @param {string} role
   */
  static async getRole(role) {
    return await prisma.role.findUnique({
      where: {
        name: role,
      },
    });
  }
}
