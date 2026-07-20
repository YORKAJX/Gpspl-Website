import path from "node:path";
import { uploadRepository } from "../repositories/upload.repository.js";

export const uploadService = {
  async saveUploadedFile(file, { purpose = "LEAD_ATTACHMENT", uploadedById = null, leadId = null } = {}) {
    return uploadRepository.create({
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      storagePath: path.normalize(file.path),
      purpose,
      uploadedById,
      leadId
    });
  }
};
