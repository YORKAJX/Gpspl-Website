import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" }
  ]
});

prisma.$on("error", (event) => logger.error("Prisma error", { target: event.target, message: event.message }));
prisma.$on("warn", (event) => logger.warn("Prisma warning", { target: event.target, message: event.message }));

export async function connectDatabase() {
  await prisma.$connect();
  logger.info("Database connection ready");
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info("Database connection closed");
}
