import { Router } from "express";
import { publicConfigController } from "../../controllers/config.controller.js";

export const configRoutes = Router();

configRoutes.get("/public", publicConfigController);
