# GPSPL live lead diagnostic — 8 October 2026

User reports no enquiries for three days, traffic also declining, and publishing an update on Friday. If this means the most recent Friday, the update date is 2 October; confirm against deployment history.

## Verified public observations

- Live homepage and contact page load. Both declare index/follow and correct canonical URLs. Public robots.txt allows crawling, and sitemap.xml returns HTTP 200. This does not prove Google has indexed every page or that rankings are unchanged.
- Primary call and WhatsApp links point to +91 8920830377. Link destinations were inspected; receiving calls and WhatsApp messages was not tested.
- Public enquiry function URLs respond with HTTP 405 to GET, consistent with POST-only functions. Email delivery was not tested.
- Live analytics.js initializes GA4 G-DWG4ZQNV0W as its fallback. Missing site-config.js on the homepage alone therefore does not establish broken GA4. Actual event receipt needs GA4 Realtime/DebugView verification.

## Confirmed delivery defects in live frontend code

1. `JS/form-validation.js` converts a failed network request into `{ok:true}` (downloaded copy line 223). It races delivery against a two-second timeout (lines 251–269), then can redirect to the thank-you page without confirmed delivery. No keepalive is set on this request. A visitor can therefore see apparent success despite a failed request, and navigation can interrupt unfinished delivery.
2. `JS/studio-interactive.js` posts hero enquiries in the background, ignores response status, and immediately says "Inquiry recorded". LocalStorage saves a copy on the visitor's device; it is not a reliable business inbox or central lead store.
3. Several BOQ/universal lead paths also ignore HTTP errors. Their visual completion does not establish that GPSPL received the enquiry.

These defects can explain missing form emails. They do not establish the cause of reduced visitors or the simultaneous loss of calls and WhatsApp enquiries.

## Checks needed to identify the traffic cause

Compare 5–7 October with the preceding matched weekdays, then inspect daily data around the deployment:

- Search Console: clicks, impressions, average position, affected landing pages and queries; URL Inspection for the homepage and previously successful landing pages; indexing and manual-action reports.
- GA4: sessions by source/medium and landing page, not only total users. Verify a normal human visit appears in Realtime. GA4 falling with stable Search Console clicks suggests measurement trouble; both falling suggests a real search-traffic decline.
- Google Business Profile: website clicks, calls and search visibility. Ads, if used: campaign delivery, spend and disapprovals.
- Netlify: exact Friday deployment diff, Forms submissions/spam, enquiry-function errors. Email provider: accepted/sent/bounced messages and recipient routing. Check mailbox spam and quota.
- One labeled end-to-end enquiry needs verified backend receipt and inbox delivery. Do not rely on the thank-you screen.

## Repair priorities

Show success only after a server acknowledges durable receipt. Remove false-success catches and unconditional timeout redirects. Use a single submission owner per form, preserve values on failure, and provide a usable retry. Make backend delivery failures visible in logs and alerts. Verify deployed anti-spam requirements against every frontend payload before releasing.

## Scope and limitations

Read-only production checks; no test lead sent, no source fixes applied, no push or deployment. Local redesign branch differs from production, so patches must be based on the actual deployed revision. Mobile clickability, historical rankings, real GA4 receipt and inbox delivery remain unverified. The evidence does not justify claiming a Google penalty or attributing the whole decline to CSS.
