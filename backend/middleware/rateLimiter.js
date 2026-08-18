import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

const standard = {
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  standardHeaders: "draft-7",
  legacyHeaders: false
};

export const generalLimiter = rateLimit({
  ...standard,
  limit: env.RATE_LIMIT_MAX,
  message: { error: "Too many requests. Please try again shortly." }
});

export const authLimiter = rateLimit({
  ...standard,
  limit: env.AUTH_RATE_LIMIT_MAX,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts. Please try again later." }
});

export const leadLimiter = rateLimit({
  ...standard,
  limit: env.LEAD_RATE_LIMIT_MAX,
  message: { error: "Too many enquiries from this connection. Please call GPSPL or try again later." }
});

export const downloadLimiter = rateLimit({
  ...standard,
  windowMs: 60 * 1000, // 1 minute window
  limit: 10, // Max 10 downloads per minute per IP
  message: { error: "Download rate limit exceeded. Please wait a moment before downloading additional files." }
});
