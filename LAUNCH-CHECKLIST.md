# GPSPL Website Launch Checklist

## Already QA-Fixed
- [x] Establishment year confirmed as `1997`.
- [x] Business positioning standardized as `AV solutions distributor and system integrator`.
- [x] Broken Wacom brand logo path fixed.
- [x] Public "CMS-ready / future admin" wording removed from visible content data.
- [x] Company name standardized as `Global Peripheral Solution Pvt. Ltd.` across schema/data/docs checked in this pass.
- [x] `404.html` has `noindex` and a meta description.
- [x] JS-rendered service pages now have static fallback H1 and summary text.
- [x] Old `active-led-video-wall.html` has a Netlify 301 redirect in `_redirects`.
- [x] Basic security/cache headers added in `_headers`.
- [x] Local HTML links, JSON image paths, JS syntax and JSON parsing verified.

## Must Confirm With Business Owner
- [x] Confirm company name: `Global Peripheral Solution Pvt. Ltd.`
- [ ] Confirm address, phone numbers, WhatsApp number and email IDs.
- [ ] Confirm claims: 28+ years of excellence, 600+ projects successfully delivered, 16+ global technology partners and 50+ certified AV professionals.
- [ ] Confirm founder/director wording and photo approval.
- [ ] Confirm brand logo usage permissions and partner wording.
- [ ] Confirm client logo permissions before launch.
- [ ] Review final brochure PDF.
- [ ] Review Privacy Policy and Terms & Disclaimer.

## Before Final Deploy
- [ ] Do not deploy until business owner gives final approval.
- [ ] Submit a real test from the contact form and footer quote form.
- [ ] Confirm Netlify detects forms `gpspl-contact-enquiry` and `gpspl-footer-quote`.
- [ ] Configure Netlify Form Notifications for `khurana.s@gpspl.co.in`, `support@gpspl.co.in` and `khanna.g@gpspl.co.in`.
- [ ] Confirm both forms redirect to `https://gpspl.co.in/thank-you.html`.
- [ ] Deploy `_redirects`, `_headers`, `robots.txt` and `sitemap.xml` with the site.
- [ ] Check deployed mobile, tablet and desktop pages after upload.

## Search & Tracking
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Add Google Analytics or Tag Manager ID if required.
- [ ] Add website link to Google Business Profile.
- [ ] Track call, WhatsApp, brochure download and form submit conversions.

## Best Next Improvements
- [ ] Add approved real project photos and case studies.
- [ ] Add approved testimonials.
- [ ] Compress/replace any oversized video or image assets after deployment testing.
- [ ] Keep first launch static; add backend/admin panel later only if GPSPL needs editable products, projects, leads or blogs.
- [ ] See `BACKEND-CMS-ROADMAP.md` before planning any CMS work.

