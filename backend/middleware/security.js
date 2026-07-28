import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import { env } from "../config/env.js";

export function applySecurity(app) {
  app.disable("x-powered-by");
  app.set("trust proxy", env.TRUST_PROXY);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "base-uri": ["'self'"],
          "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
          "form-action": ["'self'"],
          "frame-ancestors": ["'self'"],
          "frame-src": ["'self'", "https://www.googletagmanager.com"],
          "img-src": ["'self'", "data:", "https:"],
          "object-src": ["'none'"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://cdnjs.cloudflare.com",
            "https://www.googletagmanager.com",
            "https://www.google-analytics.com",
            "https://www.clarity.ms",
            "https://*.clarity.ms",
            "https://va.vercel-scripts.com"
          ],
          "script-src-attr": ["'unsafe-inline'"],
          "style-src": ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
          "connect-src": [
            "'self'",
            env.API_BASE_URL,
            env.FRONTEND_URL,
            ...env.allowedOrigins,
            "https://www.google-analytics.com",
            "https://analytics.google.com",
            "https://region1.google-analytics.com",
            "https://www.googletagmanager.com",
            "https://www.clarity.ms",
            "https://*.clarity.ms",
            "https://places.googleapis.com",
            "https://vitals.vercel-insights.com"
          ],
          "upgrade-insecure-requests": env.isProduction ? [] : null
        }
      },
      hsts: env.isProduction ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" }
    })
  );

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || env.allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin is not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      maxAge: 86400,
      allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Request-Id"]
    })
  );

  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(compression({ threshold: 1024 }));
  app.use(mongoSanitize());
  app.use(hpp());
}
