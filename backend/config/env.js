import "dotenv/config";
import { z } from "zod";

const booleanFromString = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return value;
  return ["true", "1", "yes", "on"].includes(value.toLowerCase());
}, z.boolean());

const numberFromString = z.preprocess((value) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string" || value.trim() === "") return value;
  return Number(value);
}, z.number());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: numberFromString.default(4000),
  API_BASE_URL: z.string().url().default("http://localhost:4000"),
  FRONTEND_URL: z.string().url().default("http://localhost:8082"),
  TRUST_PROXY: numberFromString.default(1),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().url().optional(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
  COOKIE_SECRET: z.string().min(24),
  CSRF_COOKIE_NAME: z.string().default("gpspl_csrf"),
  RATE_LIMIT_WINDOW_MS: numberFromString.default(900000),
  RATE_LIMIT_MAX: numberFromString.default(120),
  AUTH_RATE_LIMIT_MAX: numberFromString.default(20),
  LEAD_RATE_LIMIT_MAX: numberFromString.default(8),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: numberFromString.default(587),
  SMTP_SECURE: booleanFromString.default(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().default("GPSPL Website <no-reply@gpspl.co.in>"),
  LEAD_NOTIFICATION_EMAILS: z.string().default("support@gpspl.co.in"),
  GA4_MEASUREMENT_ID: z.string().optional(),
  GOOGLE_TAG_MANAGER_ID: z.string().optional(),
  GOOGLE_SEARCH_CONSOLE_VERIFICATION: z.string().optional(),
  MICROSOFT_CLARITY_PROJECT_ID: z.string().optional(),
  VERCEL_ANALYTICS_ENABLED: booleanFromString.default(true),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_UPLOAD_MB: numberFromString.default(10),
  ALLOWED_UPLOAD_MIME: z.string().default("image/jpeg,image/png,image/webp,application/pdf"),
  ENABLE_SWAGGER: booleanFromString.default(true)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
  throw new Error(`Invalid backend environment configuration: ${details}`);
}

export const env = Object.freeze({
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === "production",
  isTest: parsed.data.NODE_ENV === "test",
  allowedOrigins: [parsed.data.FRONTEND_URL, parsed.data.API_BASE_URL].filter(Boolean),
  leadNotificationEmails: parsed.data.LEAD_NOTIFICATION_EMAILS.split(",").map((email) => email.trim()).filter(Boolean),
  allowedUploadMimeTypes: parsed.data.ALLOWED_UPLOAD_MIME.split(",").map((type) => type.trim()).filter(Boolean)
});
