import { describe, expect, it } from "vitest";
import { createLeadSchema } from "../validators/lead.validator.js";

describe("lead validation", () => {
  it("accepts a valid GPSPL enquiry", () => {
    const result = createLeadSchema.safeParse({
      body: {
        name: "Divesh Kumar",
        email: "divesh@example.com",
        phone: "+91 9310092963",
        requirement: "Conference Room Solutions",
        message: "Need display, audio and VC setup."
      }
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    const result = createLeadSchema.safeParse({
      body: {
        name: "Divesh Kumar",
        email: "divesh@example.com",
        phone: "bad-phone<script>",
        requirement: "Conference Room Solutions",
        message: "Need display, audio and VC setup."
      }
    });

    expect(result.success).toBe(false);
  });
});
