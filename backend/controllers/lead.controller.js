import { leadService } from "../services/lead.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRequestMeta } from "../middleware/requestContext.js";

export const createLeadController = asyncHandler(async (req, res) => {
  const lead = await leadService.createLead(req.body, getRequestMeta(req));
  res.status(201).json({
    id: lead.id,
    status: "received",
    message: "Thank you. GPSPL will review your enquiry and contact you shortly."
  });
});

export const listLeadsController = asyncHandler(async (req, res) => {
  const result = await leadService.listLeads(req.query);
  res.json(result);
});

export const updateLeadStatusController = asyncHandler(async (req, res) => {
  const lead = await leadService.updateStatus(req.params.id, req.body.status);
  res.json({ lead });
});
