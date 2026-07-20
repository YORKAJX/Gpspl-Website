import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { swaggerSpec } from "./config/swagger.js";
import { healthController } from "./controllers/health.controller.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { requestContext } from "./middleware/requestContext.js";
import { applySecurity } from "./middleware/security.js";
import { v1Routes } from "./routes/v1/index.js";

export function createApp() {
  const app = express();

  applySecurity(app);
  app.use(requestContext);
  app.use(generalLimiter);
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) },
      skip: () => env.isTest
    })
  );

  app.get("/health", healthController);
  app.use("/api/v1", v1Routes);

  if (env.ENABLE_SWAGGER) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  }

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

export const app = createApp();
