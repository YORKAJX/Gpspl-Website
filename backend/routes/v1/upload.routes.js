import { Router } from "express";
import { uploadFilesController } from "../../controllers/upload.controller.js";
import { authenticate } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";

export const uploadRoutes = Router();

uploadRoutes.post("/", authenticate, upload.array("files", 5), uploadFilesController);
