import { ZodError } from "zod";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, req, res, _next) {
  const isZod = error instanceof ZodError;
  const statusCode = error.statusCode || (isZod ? 422 : 500);
  const isSafe = error.isOperational || statusCode < 500 || isZod;

  logger.error("Request failed", {
    requestId: req.id,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message: error.message,
    stack: isSafe ? undefined : error.stack
  });

  res.status(statusCode).json({
    error: isSafe ? error.message : "Internal server error",
    requestId: req.id,
    ...(error.details ? { details: error.details } : {}),
    ...(isZod ? { details: error.issues } : {})
  });
}
