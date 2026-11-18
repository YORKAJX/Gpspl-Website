# GPSPL search and enquiry audit — 18 November 2026

## Implemented
- 20 existing service pages now explain the information needed for a scoped quotation and link to related services. No duplicate city/keyword pages were created.
- PTZ camera page now includes the existing validated short enquiry component with optional email, Call, WhatsApp, privacy notice and a service-specific requirement.
- Professional audio title describes JBL/professional sound integration rather than narrowing the whole page to gyms.
- Runtime service/product schema uses the visible page title and description.
- Download enquiry handler rejects log-only queued responses as unconfirmed.
- JavaScript responses revalidate instead of remaining fresh for seven days. Previously cached responses may remain until their existing expiry.
- Sitemap modification dates changed only for the 20 edited service pages.

## Checks
- 94 unique indexable canonical sitemap entries: existing crawl audit passed.
- 70 root pages / 83 static JSON-LD blocks: schema audit passed.
- Mocked delivery failures, retries, duplicates and frontend outcomes passed; no live messages sent.
- Production syntax build passed.
- All 20 coverage pages have call, WhatsApp and form paths, valid related links and one H1. Googlebot, OAI-SearchBot and ChatGPT-User are permitted by the current robots rules.
- Coverage inventory: data/lead-vertical-coverage.json.

## Outstanding production verification
Publishing and verified email delivery remain separate from Git push. Earlier live checks still served the form code preceding e574524. Confirm the production deploy includes e574524 and this change; configure the existing Resend provider and verified sender in the correct Netlify project; verify a clearly identified test is received at global@gpspl.co.in before calling delivery restored. Never count clicks or queued responses as genuine enquiries.

No current Google rank, AI recommendation or daily lead volume is guaranteed by these changes. Search Console and received-enquiry records are required to assess performance. Existing numerical project, certification, OEM-authorisation and SLA claims need business evidence before being used as proof in further content.
