import { Router } from "express";
import { csrfProtection, csrfTokenController } from "../../middleware/csrf.js";
import { authRoutes } from "./auth.routes.js";
import { configRoutes } from "./config.routes.js";
import { leadRoutes } from "./lead.routes.js";
import { uploadRoutes } from "./upload.routes.js";

export const v1Routes = Router();

v1Routes.get("/csrf-token", csrfTokenController);
v1Routes.use("/auth", authRoutes);
v1Routes.use("/config", configRoutes);
v1Routes.use("/leads", leadRoutes);
v1Routes.use("/uploads", uploadRoutes);
