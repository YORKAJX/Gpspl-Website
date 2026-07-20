import validator from "validator";
import { emailService } from "./email.service.js";
import { leadRepository } from "../repositories/lead.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { sanitizeObject } from "../utils/sanitize.js";

function scoreSpam(input) {
  let score = 0;
  if (input.botField) score += 10;
  if ((input.message.match(/https?:\/\//gi) || []).length > 2) score += 3;
  if (input.name && validator.isEmail(input.name)) score += 2;
  if (/crypto|casino|loan|viagra|telegram/i.test(input.message)) score += 3;
  return score;
}

export const leadService = {
  async createLead(input, reqMeta) {
    const spamScore = scoreSpam(input);
    if (spamScore >= 10) throw new ApiError(400, "The enquiry could not be accepted");

    const clean = sanitizeObject(input);
    const lead = await leadRepository.create({
      name: clean.name,
      email: clean.email,
      phone: clean.phone,
      company: clean.company || null,
      requirement: clean.requirement,
      location: clean.location || null,
      message: clean.message,
      source: clean.source || "website",
      pageUrl: clean.pageUrl || null,
      consent: clean.consent !== false,
      spamScore,
      ipAddress: reqMeta.ipAddress,
      userAgent: reqMeta.userAgent,
      referrer: reqMeta.referrer,
      utmSource: clean.utmSource || null,
      utmMedium: clean.utmMedium || null,
      utmCampaign: clean.utmCampaign || null,
      utmTerm: clean.utmTerm || null,
      utmContent: clean.utmContent || null,
      status: spamScore >= 5 ? "SPAM" : "NEW"
    });

    if (lead.status !== "SPAM") await emailService.sendLeadNotification(lead);
    return lead;
  },

  listLeads(filters) {
    return leadRepository.list(filters);
  },

  updateStatus(id, status) {
    return leadRepository.updateStatus(id, status);
  }
};
