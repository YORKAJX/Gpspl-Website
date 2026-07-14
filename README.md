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
- Success redirect: `/thank-you.html`

After deploy, configure Netlify Form Notifications so submissions are emailed to the GPSPL team, for example `khurana.s@gpspl.co.in`, `support@gpspl.co.in` and `khanna.g@gpspl.co.in`. Submissions will still be stored in the Netlify dashboard even before email notifications are configured.

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
