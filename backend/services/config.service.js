import { env } from "../config/env.js";

export const configService = {
  publicConfig() {
    return {
      siteUrl: env.FRONTEND_URL,
      apiBaseUrl: env.API_BASE_URL,
      ga4MeasurementId: env.GA4_MEASUREMENT_ID || "",
      googleTagManagerId: env.GOOGLE_TAG_MANAGER_ID || "",
      googleSearchConsoleVerification: env.GOOGLE_SEARCH_CONSOLE_VERIFICATION || "",
      microsoftClarityProjectId: env.MICROSOFT_CLARITY_PROJECT_ID || "",
      vercelAnalytics: env.VERCEL_ANALYTICS_ENABLED
    };
  }
};
