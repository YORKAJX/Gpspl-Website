import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";
import { env } from "./env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, "../logs");

const redact = winston.format((info) => {
  const blocked = ["password", "token", "authorization", "cookie", "jwt", "secret"];
  for (const key of Object.keys(info)) {
    if (blocked.some((term) => key.toLowerCase().includes(term))) info[key] = "[REDACTED]";
  }
  return info;
});

export const logger = winston.createLogger({
  level: env.isProduction ? "info" : "debug",
  defaultMeta: { service: "gpspl-backend", environment: env.NODE_ENV },
  format: winston.format.combine(
    redact(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: env.isProduction
        ? winston.format.json()
        : winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    new winston.transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logsDir, "combined.log") })
  ],
  exceptionHandlers: [new winston.transports.File({ filename: path.join(logsDir, "exceptions.log") })],
  rejectionHandlers: [new winston.transports.File({ filename: path.join(logsDir, "rejections.log") })]
});
