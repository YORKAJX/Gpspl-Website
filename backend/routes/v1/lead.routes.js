import { Router } from "express";
import { createLeadController, listLeadsController, updateLeadStatusController } from "../../controllers/lead.controller.js";
import { authenticate } from "../../middleware/auth.js";
import { leadLimiter } from "../../middleware/rateLimiter.js";
import { requireRole } from "../../middleware/rbac.js";
import { validate } from "../../middleware/validate.js";
import { createLeadSchema, leadListSchema, updateLeadStatusSchema } from "../../validators/lead.validator.js";

export const leadRoutes = Router();

leadRoutes.post("/", leadLimiter, validate(createLeadSchema), createLeadController);
leadRoutes.get("/", authenticate, requireRole("ADMIN"), validate(leadListSchema), listLeadsController);
leadRoutes.patch("/:id/status", authenticate, requireRole("ADMIN"), validate(updateLeadStatusSchema), updateLeadStatusController);
