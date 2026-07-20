import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

let transporter;

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
    });
  }
  return transporter;
}

export const emailService = {
  async sendLeadNotification(lead) {
    const mailer = getTransporter();
    if (!mailer) {
      logger.warn("SMTP is not configured; lead saved without email notification", { leadId: lead.id });
      return { sent: false, reason: "smtp_not_configured" };
    }

    const subject = `New GPSPL enquiry: ${lead.requirement}`;
    const text = [
      "New website enquiry received.",
      "",
      `Name: ${lead.name}`,
      `Company: ${lead.company || "-"}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Requirement: ${lead.requirement}`,
      `Location: ${lead.location || "-"}`,
      `Page: ${lead.pageUrl || "-"}`,
      `Source: ${lead.source || "website"}`,
      "",
      "Message:",
      lead.message
    ].join("\n");

    await mailer.sendMail({
      from: env.MAIL_FROM,
      to: env.leadNotificationEmails,
      replyTo: lead.email,
      subject,
      text
    });

    return { sent: true };
  }
};
