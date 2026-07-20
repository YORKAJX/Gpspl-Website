import { prisma } from "../config/prisma.js";
import { redis } from "../config/redis.js";

export async function healthController(_req, res) {
  const startedAt = Date.now();
  let database = "ok";
  let cache = redis ? "ok" : "not_configured";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = "error";
  }

  if (redis) {
    try {
      await redis.ping();
    } catch {
      cache = "error";
    }
  }

  const healthy = database === "ok" && cache !== "error";
  res.status(healthy ? 200 : 503).json({
    status: healthy ? "ok" : "degraded",
    uptime: process.uptime(),
    checks: { database, cache },
    latencyMs: Date.now() - startedAt
  });
}
