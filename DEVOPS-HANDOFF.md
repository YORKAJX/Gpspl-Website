# GPSPL Website DevOps Handoff

## Project Summary

This is a static corporate website for **Global Peripheral Solution Pvt. Ltd. (GPSPL)**, established in **1997**.

Business positioning:

**AV solutions distributor and system integrator**  
Core model: **Distribution + Integration + Support**

The current implementation is intentionally static for speed, security and simple deployment. A backend is not required for launch.

Backend/CMS planning is documented separately in `BACKEND-CMS-ROADMAP.md`. Do not add a custom backend before launch unless GPSPL specifically approves editable admin workflows.

## Deployment Type

Recommended:

- Netlify
- Cloudflare Pages
- or any static web server/CDN

Build command: none  
Publish directory: repository root

Required deployment files:

- `index.html`
- all `.html` pages
- `css/`
- `JS/`
- `modules/`
- `data/`
- `assests/`
- `_headers`
- `_redirects`
- `robots.txt`
- `sitemap.xml`

## Content Architecture

The site uses a static CMS-ready structure:

- `modules/header.html` and `modules/footer.html` are loaded through `JS/main.js`
- service pages are rendered from JSON files in `data/services/`
- CMS planning models are stored under `data/cms/`
- future CMS migration can map directly to the existing JSON fields

This is not a missing backend; it is a deliberate static-first architecture.

## Why Multiple Pages Exist

Multiple landing pages are intentional for SEO and content separation:

- service pages target specific AV/system-integration searches
- solution/product pages target user requirements such as conference rooms, smart classrooms, active LED walls and IT infrastructure
- industry/project pages support trust and future case studies
- legal/utility pages support launch readiness

Do not remove SEO pages only because there are many pages. Remove or noindex only pages that are thin, duplicate or unapproved.

## SEO Files

- `sitemap.xml` lists indexable pages
- `robots.txt` points to the sitemap and blocks utility pages
- canonical tags are included in page heads
- service pages update metadata using `JS/service-page.js` and `data/services/*.json`

Before final launch:

- submit sitemap in Google Search Console
- add Google Business Profile website link
- add Google Analytics / Tag Manager only if the business provides IDs

## Security / Headers

`_headers` includes baseline static-site security:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- asset cache headers

No secret keys should be placed in frontend JS.

## Google Reviews Integration

Homepage Google reviews are loaded through a Netlify Function:

- Function path: `netlify/functions/google-reviews.js`
- Frontend loader: `JS/google-reviews.js`
- Homepage section: `#testimonials`

Required Netlify environment variables:

- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `GOOGLE_REVIEWS_URL` optional, public Google review link

The API key must stay server-side only. Do not paste it into `index.html` or any frontend JavaScript file.

If the environment variables are missing, the website does not break. It keeps the existing fallback testimonial cards and shows the normal GPSPL trust messaging.

Recommended Google Cloud setup:

- Enable Places API.
- Restrict the API key by API to Places API.
- If possible, use a separate key only for this website.
- Monitor quota and billing in Google Cloud Console.

The function uses CDN cache headers so Google reviews are not requested on every page load.

## Forms

Contact forms currently use a static/serverless form flow. Before launch:

- verify the receiving email address
- submit one real test enquiry
- confirm thank-you redirect
- add spam protection if form spam becomes an issue

## Known Confirmed Business Facts

- Company: Global Peripheral Solution Pvt. Ltd.
- Short name: GPSPL
- Established: 1997
- Positioning: AV solutions distributor and system integrator
- Core offering: AV solutions, display systems, collaboration rooms, smart classrooms, active LED/video walls, professional audio, installation, AMC and after-sales support

## Pending Business Approvals

The following should be confirmed by the business owner before final public launch:

- final address, phone numbers, WhatsApp and email IDs
- brand authorization/dealt-in wording
- client logo permissions
- project/case-study approval
- certificate/award images
- final brochure PDF
- analytics/tracking IDs

## Launch Command Checklist

1. Deploy repository root as static site.
2. Confirm `_headers` and `_redirects` are active.
3. Open homepage, contact page and at least three service pages.
4. Test mobile navigation.
5. Test contact form.
6. Submit `sitemap.xml` to Search Console.
7. Confirm HTTPS and canonical domain.
