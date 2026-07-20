import { Router } from "express";
import {
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController
} from "../../controllers/auth.controller.js";
import { authenticate } from "../../middleware/auth.js";
import { authLimiter } from "../../middleware/rateLimiter.js";
import { requireRole } from "../../middleware/rbac.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, refreshSchema, registerSchema } from "../../validators/auth.validator.js";

export const authRoutes = Router();

authRoutes.post("/login", authLimiter, validate(loginSchema), loginController);
authRoutes.post("/refresh", validate(refreshSchema), refreshController);
authRoutes.post("/logout", validate(refreshSchema), logoutController);
authRoutes.get("/me", authenticate, meController);
authRoutes.post("/users", authenticate, requireRole("ADMIN"), validate(registerSchema), registerController);
