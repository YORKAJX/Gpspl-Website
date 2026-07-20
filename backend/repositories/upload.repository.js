import { prisma } from "../config/prisma.js";

export const uploadRepository = {
  create(data) {
    return prisma.uploadedFile.create({ data });
  },
  findById(id) {
    return prisma.uploadedFile.findUnique({ where: { id } });
  }
};
