import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env.js";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "GPSPL Enterprise API",
      version: "1.0.0",
      description: "Secure REST API for GPSPL leads, admin access, uploads and public configuration."
    },
    servers: [{ url: `${env.API_BASE_URL}/api/v1`, description: env.NODE_ENV }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        LeadInput: {
          type: "object",
          required: ["name", "email", "phone", "requirement", "message"],
          properties: {
            name: { type: "string", example: "Divesh Kumar" },
            email: { type: "string", format: "email", example: "buyer@example.com" },
            phone: { type: "string", example: "+91 9310092963" },
            company: { type: "string", example: "Example Pvt. Ltd." },
            requirement: { type: "string", example: "Conference Room Solutions" },
            location: { type: "string", example: "New Delhi" },
            message: { type: "string", example: "Need VC, audio and display setup for a boardroom." },
            pageUrl: { type: "string", example: "https://gpspl.co.in/conference-room-solutions" }
          }
        }
      }
    },
    paths: {
      "/config/public": {
        get: {
          summary: "Public analytics and website configuration",
          responses: { 200: { description: "Public configuration" } }
        }
      },
      "/leads": {
        post: {
          summary: "Create a website enquiry",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/LeadInput" } } }
          },
          responses: {
            201: { description: "Lead received" },
            422: { description: "Validation failed" },
            429: { description: "Rate limited" }
          }
        },
        get: {
          summary: "List enquiries for admins",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Paginated leads" }, 401: { description: "Authentication required" } }
        }
      },
      "/auth/login": {
        post: {
          summary: "Admin/user login",
          responses: { 200: { description: "JWT access and refresh token" }, 401: { description: "Invalid login" } }
        }
      }
    }
  },
  apis: []
});
