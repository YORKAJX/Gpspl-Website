import { prisma } from "../config/prisma.js";

export const leadRepository = {
  create(data) {
    return prisma.lead.create({ data });
  },
  findById(id) {
    return prisma.lead.findUnique({ where: { id }, include: { attachments: true } });
  },
  updateStatus(id, status) {
    return prisma.lead.update({ where: { id }, data: { status } });
  },
  async list({ page, limit, status, search }) {
    const where = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
              { requirement: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    };

    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.lead.count({ where })
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }
};
