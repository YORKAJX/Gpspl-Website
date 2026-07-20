import { prisma } from "../config/prisma.js";

export const userRepository = {
  create(data) {
    return prisma.user.create({ data });
  },
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },
  findById(id) {
    return prisma.user.findUnique({ where: { id } });
  },
  updateLastLogin(id) {
    return prisma.user.update({ where: { id }, data: { lastLoginAt: new Date() } });
  }
};
