# GPSPL Backend

Production-ready Node.js API for GPSPL lead capture, admin access, uploads, analytics configuration and security hardening.

## What It Provides

- Secure Express API under `/api/v1`
- PostgreSQL database access through Prisma
- Admin/user JWT login with refresh tokens
- Argon2 password hashing
- Lead capture with server-side validation, spam scoring and rate limiting
- Optional email notification for new enquiries
- Upload endpoint with file type and size controls
- Security headers through Helmet
- CORS, request sanitization, compression and centralized errors
- Health check at `/health`
- Swagger documentation at `/api-docs`
- Docker Compose for API, PostgreSQL and Redis
- Nginx production reverse-proxy example

## Setup

1. Copy `.env.example` to `.env`.
2. Fill `DATABASE_URL`, JWT secrets, `COOKIE_SECRET`, SMTP details and analytics IDs.
3. Run `npm install`.
4. Run `npm run prisma:generate`.
5. Run `npm run prisma:migrate`.
6. Run `npm run dev`.

## Analytics Environment Variables

- `GA4_MEASUREMENT_ID`
- `GOOGLE_TAG_MANAGER_ID`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION`
- `MICROSOFT_CLARITY_PROJECT_ID`
- `VERCEL_ANALYTICS_ENABLED`

The public endpoint `/api/v1/config/public` exposes safe analytics configuration only. Secrets are never returned.

## Lead Form Destination

New enquiries are stored in PostgreSQL. If SMTP is configured, notifications are sent to `LEAD_NOTIFICATION_EMAILS`.

Recommended production recipients:

```env
LEAD_NOTIFICATION_EMAILS=support@gpspl.co.in,khurana.s@gpspl.co.in,khanna.g@gpspl.co.in
```

## Deployment Notes

- Put the API behind HTTPS.
- Use the Nginx config in `nginx/gpspl.conf` when self-hosting.
- On Vercel/Netlify static hosting, deploy this backend separately or through a server host such as Render, Railway, Fly.io, AWS, Azure or a VPS.
- Update the frontend form action or JavaScript endpoint to call `/api/v1/leads` when this backend is live.
