import { uploadService } from "../services/upload.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadFilesController = asyncHandler(async (req, res) => {
  const files = await Promise.all(
    (req.files || []).map((file) =>
      uploadService.saveUploadedFile(file, {
        purpose: req.body.purpose || "LEAD_ATTACHMENT",
        uploadedById: req.user?.id || null,
        leadId: req.body.leadId || null
      })
    )
  );

  res.status(201).json({ files });
});
