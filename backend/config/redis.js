import Redis from "ioredis";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true
    })
  : null;

if (redis) {
  redis.on("error", (error) => logger.error("Redis error", { message: error.message }));
  redis.on("connect", () => logger.info("Redis connection ready"));
}

export async function connectRedis() {
  if (redis && redis.status === "wait") await redis.connect();
}

export async function disconnectRedis() {
  if (redis) await redis.quit();
}
