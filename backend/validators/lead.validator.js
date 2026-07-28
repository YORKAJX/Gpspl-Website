import { z } from "zod";

const optionalText = (max = 300) => z.string().trim().max(max).optional().or(z.literal(""));
const weakEmailNames = new Set(["test", "demo", "user", "admin", "mail", "email", "abc", "abcd", "qwerty", "asdf"]);
const genuineEmail = z.string().trim().email().max(180).toLowerCase().refine((email) => {
  const [local = "", domain = ""] = email.split("@");
  const compactLocal = local.replace(/[._%+-]/g, "");
  const hasReadableName = /[a-z]{2,}/i.test(local);
  const hasDomainName = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain);
  const repeatedOnly = /^([a-z0-9])\1+$/i.test(compactLocal);
  const numericHeavy = (local.match(/\d/g) || []).length > Math.max(3, local.length - 2);
  return local.length >= 4 && hasReadableName && hasDomainName && !repeatedOnly && !numericHeavy && !weakEmailNames.has(local);
}, "Please enter a genuine email address");

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email: genuineEmail,
    phone: z.string().trim().min(8).max(30).regex(/^[+()\d\s-]+$/, "Invalid phone number"),
    company: optionalText(160),
    requirement: z.string().trim().min(2).max(180),
    location: optionalText(160),
    message: z.string().trim().min(3).max(3000),
    source: optionalText(180),
    pageUrl: optionalText(600),
    consent: z.boolean().optional().default(true),
    botField: z.literal("").optional().default(""),
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
