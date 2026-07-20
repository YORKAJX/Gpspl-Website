import { z } from "zod";

const optionalText = (max = 300) => z.string().trim().max(max).optional().or(z.literal(""));

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180).toLowerCase(),
    phone: z.string().trim().min(8).max(30).regex(/^[+()\d\s-]+$/, "Invalid phone number"),
    company: optionalText(160),
    requirement: z.string().trim().min(2).max(180),
    location: optionalText(160),
    message: z.string().trim().min(3).max(3000),
    source: optionalText(180),
    pageUrl: optionalText(600),
    consent: z.boolean().optional().default(true),
    botField: optionalText(100),
    utmSource: optionalText(120),
    utmMedium: optionalText(120),
    utmCampaign: optionalText(160),
    utmTerm: optionalText(160),
    utmContent: optionalText(160)
  })
});

export const updateLeadStatusSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST", "SPAM"]) })
});

export const leadListSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST", "SPAM"]).optional(),
    search: z.string().trim().max(120).optional()
  })
});
