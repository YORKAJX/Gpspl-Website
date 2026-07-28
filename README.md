# GPSPL Corporate Website

Static corporate website for **Global Peripheral Solution Pvt. Ltd. (GPSPL)**, established in **1997**.

GPSPL is positioned as an **AV solutions distributor and system integrator**: supplying technology products, designing solution environments, integrating systems on site, and supporting customers through installation, warranty coordination, AMC and after-sales service.

## Current Architecture

- Static HTML, CSS and vanilla JavaScript.
- Reusable header and footer are loaded from `modules/header.html` and `modules/footer.html` through `JS/main.js`.
- Contact forms use Netlify Forms and redirect to `/thank-you.html` after successful submission.
- Service-detail pages use a CMS-ready data model:
  - HTML shell pages such as `audio-visual-integration.html`
  - JSON content under `data/services/`
  - Renderer script: `JS/service-page.js`
  - Styles: `css/service-page.css`
- Brand/CMS planning data is stored under `data/cms/` for future migration to a real CMS.
- No backend is required for the current static deployment.

## Why There Are Multiple Pages

The page structure is intentional for SEO and future CMS migration. Service, solution, product, industry and project pages are separated so search engines can understand each offering clearly, and so future content editing can map into CMS collections without redesigning the website.

Primary page groups:

- Company pages: About, Vision, Director's Message, Milestones, Team, Careers
- Service pages: AV integration, unified communication, video wall, active LED, AMC and support
- Solution/product pages: conference rooms, smart classrooms, digital signage, professional audio, IT infrastructure, KVM/AV switching, UPS, peripherals
- Trust pages: technology partners, projects, case studies, industries, FAQ
- Utility pages: contact, privacy policy, terms, downloads, 404 and thank-you

## Deployment

Recommended deployment is a static host such as Netlify, Cloudflare Pages or an equivalent DevOps-managed static server.

Deploy these files with the site:

- `_headers`
- `_redirects`
- `netlify.toml` if deploying on Netlify
- `robots.txt`
- `sitemap.xml`
- all HTML/CSS/JS files
- `assests/`
- `data/`
- `modules/`

Build command: none
Publish directory: repository root

## Contact Form Notes

The contact page and footer quote form submit through Netlify Forms:

- Contact form name: `gpspl-contact-enquiry`
- Footer form name: `gpspl-footer-quote`
- AV BOQ download form name: `gpspl-configurator-lead`
- Success redirect: `/thank-you.html`

The AV BOQ download form captures client name, company, email, phone, project location, remarks, room count, estimate range, validation status, BOQ summary and the full requirement payload.

After deploy, configure Netlify Form Notifications so submissions are emailed to the GPSPL team, for example `khurana.s@gpspl.co.in`, `support@gpspl.co.in` and `khanna.g@gpspl.co.in`. Submissions will still be stored in the Netlify dashboard even before email notifications are configured.

## Google Reviews Setup

The homepage testimonials section can show live Google reviews through the Netlify function at `/.netlify/functions/google-reviews`.

To enable live Google reviews:

1. Open Google Cloud Console and enable the Places API.
2. Create a restricted API key for the Places API.
3. Find the Google Business Profile Place ID for GPSPL.
4. In Netlify, open Site settings -> Environment variables and add:
   - `GOOGLE_PLACES_API_KEY`
   - `GOOGLE_PLACE_ID`
   - `GOOGLE_REVIEWS_URL`
5. Redeploy the site.
6. Test this URL after deploy:

```text
https://gpspl.co.in/.netlify/functions/google-reviews
```

If the API key or Place ID is missing, the site keeps the current testimonial fallback and links visitors to Google reviews instead of breaking the page.

## Known Confirmed Business Facts

- Company name: Global Peripheral Solution Pvt. Ltd.
- Short name: GPSPL
- Established: 1997
- Positioning: AV solutions distributor and system integrator
- Core model: Distribution + Integration + Support

## Information Still Required From Business Owner

The website can be deployed as a structured static site, but final credibility improves when the following are approved:

- final phone numbers, WhatsApp number, email IDs and address
- approved partner/brand usage wording
- certificates, awards and authorization proof
- approved client logos and project names
- real case-study photos and project outcomes
- Google Business Profile link
- analytics/tracking IDs, if required

## Important Notes

- Do not add secret API keys in frontend JavaScript.
- Keep service pages indexed only when they contain useful, non-duplicate content.
- Keep thin or temporary redirect pages `noindex`.
- Future CMS/backend should reuse the existing JSON content model instead of replacing the site structure.

## Production SEO & Analytics Setup

The site includes a shared production layer for SEO metadata, structured data and conversion tracking:

- SEO metadata and JSON-LD: `JS/seo.js`
- CMS/page schema fallback: `JS/cms-seo-schema.js`
- Analytics and conversion events: `JS/analytics.js`
- Runtime tracking placeholders: `JS/site-config.js`
- Environment placeholders: `.env.example`

### 1. Connect Google Analytics 4

1. Create a GA4 property in Google Analytics.
2. Copy the Measurement ID, for example `G-XXXXXXXXXX`.
3. Add it to the production config as `ga4MeasurementId`.
4. After deployment, open Realtime in GA4 and visit the website to confirm page views.

Tracked GA4 events include:

- `page_view`
- `contact_form_submit_attempt`
- `contact_form_submit_success`
- `contact_form_submit_failed`
- `whatsapp_click`
- `call_button_click`
- `email_click`
- `get_quote_click`
- `download_click`
- `product_enquiry_click`
- `navigation_cta_click`
- `scroll_depth`
- `outbound_link_click`

### 2. Connect Google Tag Manager

1. Create a GTM web container.
2. Copy the container ID, for example `GTM-XXXXXXX`.
3. Add it to the production config as `googleTagManagerId`.
4. In GTM, create GA4 Event tags using the event names pushed to `dataLayer`.
5. Publish the GTM container only after testing in Preview mode.

### 3. Connect Google Search Console

1. Add the domain property for `gpspl.co.in`.
2. Use DNS verification when possible.
3. If HTML meta verification is used, add the verification token to `googleSearchConsoleVerification`.
4. Submit this sitemap after deployment:

```text
https://gpspl.co.in/sitemap.xml
```

The site already includes:

- `robots.txt`
- `sitemap.xml`
- canonical URLs
- Open Graph metadata
- Twitter card metadata
- Organization, LocalBusiness, WebSite, Breadcrumb, Service and Product JSON-LD

### 4. Connect Microsoft Clarity

1. Create a Microsoft Clarity project.
2. Copy the project ID.
3. Add it to the production config as `microsoftClarityProjectId`.
4. Check recordings and heatmaps after real traffic starts.

### 5. Vercel Analytics

The site loads the Vercel analytics script path when hosted on Vercel. Keep `vercelAnalytics` enabled in config. If the site remains on Netlify, this script will not affect the site experience.

### 6. Where Form Leads Go

The forms are Netlify Forms:

- `gpspl-contact-enquiry`
- `gpspl-footer-quote`

To receive email alerts, open Netlify project settings and configure Form Notifications. Without notifications, submissions still appear inside the Netlify Forms dashboard.

### 7. Important Manual Checks After Deployment

- Search Console: verify ownership and submit sitemap.
- GA4: confirm Realtime page views and conversion events.
- GTM: test all tags in Preview mode.
- Clarity: confirm session recordings.
- Netlify Forms: submit one test enquiry and confirm it appears in Forms.
- Google Business Profile: add website URL and keep NAP details consistent.

## Enterprise UX And Lead Generation Additions

### Enterprise AV Requirement Builder

The homepage includes a lightweight client-side requirement builder:

- Markup entry point: `data-room-configurator`
- Logic: `JS/room-configurator.js`
- Page: `index.html`

It asks for room type, approximate dimensions, capacity, collaboration workflow, display preference, camera preference, microphone preference and optional room features. The output is an engineering requirement summary with preliminary BOQ categories, quantity guidance, budget range and delivery timeline.

The builder intentionally avoids exact brand/model names and ecommerce-style pricing. GPSPL engineers can confirm exact OEM models after site survey, acoustic review, display sizing and procurement availability.

Lead capture:

- Hidden Netlify form: `gpspl-configurator-lead`
- Visible modal form is rendered by `JS/room-configurator.js`
- Captured fields: lead source, page URL, submitted time, room count, estimate range, validation status, BOQ summary, full requirement summary, name, company, email, phone, city and project description

Future CMS/admin panel:

- Replace `CONFIG` arrays in `JS/room-configurator.js` with API/CMS data
- Keep the same `data-room-configurator` mount point
- Keep rule-engine outputs generic unless exact model approval is available
- Map submitted requirement summaries into CRM or admin lead records

Tracked events:

- `room_configurator_view`
- `room_configurator_update`
- `room_configurator_quote_click`
- `room_configurator_whatsapp_click`
- `room_configurator_proposal_open`
- `room_configurator_proposal_download`

### Enterprise Case Study Schema

`case-studies.html` includes JSON-LD for the case study hub. The schema connects GPSPL, service capability, location/business context and representative case study entries so Google and AI search systems can understand the page as a service-led project portfolio instead of a basic gallery.

Keep real client names, project outcomes and impact numbers approved before publishing stronger claims.

### Form Validation And Netlify Forms

Frontend validation is handled by `JS/form-validation.js`; Netlify submission handling remains in `JS/main.js`.

The validation layer:

- validates required fields, email format and phone format
- blocks common disposable email domains and spam phrases
- populates hidden `page_url` and `submitted_at` fields
- tracks validation success and validation failure events
- works with dynamically loaded footer forms through the `gpspl:module-loaded` event

The lead forms still submit to Netlify Forms. Configure email notifications in Netlify so enquiry emails reach the GPSPL team.

### Image Optimization Tooling

Use Sharp to generate compressed WebP variants for heavy installation photos:

```powershell
npm install
npm run optimize:images
npm run optimize:projects
```

After generating optimized assets, visually inspect key pages before replacing production image paths. The script writes optimized images separately so original project photos are not overwritten.

### Production Safety Checklist

- Run `npm run check:js` before pushing.
- Submit `https://gpspl.co.in/sitemap.xml` in Google Search Console.
- Keep `GA4 Measurement ID`, `GTM ID`, `Clarity ID` and Google verification values in configuration, not scattered across page files.
- Do not expose server-only secrets in browser JavaScript.
