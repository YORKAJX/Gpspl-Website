import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { connectDatabase, disconnectDatabase } from "./config/prisma.js";
import { connectRedis, disconnectRedis } from "./config/redis.js";
import { app } from "./app.js";

let server;

async function start() {
  await connectDatabase();
  await connectRedis();

  server = app.listen(env.PORT, () => {
    logger.info("GPSPL API server started", { port: env.PORT, environment: env.NODE_ENV });
  });
}

async function shutdown(signal) {
  logger.info("Shutting down API server", { signal });
  if (server) {
    server.close(async () => {
      await disconnectRedis();
      await disconnectDatabase();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  }
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

start().catch((error) => {
  logger.error("API server failed to start", { error: error.message, stack: error.stack });
  process.exit(1);
});
