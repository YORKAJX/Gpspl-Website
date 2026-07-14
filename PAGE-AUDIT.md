# GPSPL Page Audit

Last audit date: 2026-07-09

## Confirmed Site Positioning

- Company: Global Peripheral Solution Pvt. Ltd.
- Established: 1997
- Positioning: AV solutions distributor and system integrator
- Core model: Distribution + Integration + Support

## Indexable Pages To Keep

These pages are intentional SEO or trust pages and should remain in `sitemap.xml`:

- `/`
- `/about-gpspl.html`
- `/contact.html`
- `/audio-visual-integration.html`
- `/unified-communication-collaboration.html`
- `/video-wall-solutions.html`
- `/active-led-wall-solutions.html`
- `/active-led-wall-installation.html`
- `/conference-room-solutions.html`
- `/smart-classroom-solutions.html`
- `/professional-audio-solutions.html`
- `/interactive-display-solutions.html`
- `/digital-signage-solutions.html`
- `/it-infrastructure-solutions.html`
- `/amc-maintenance-services.html`
- `/audio-technologies.html`
- `/video-technologies.html`
- `/control-automation.html`
- `/kvm-av-switching-solutions.html`
- `/ups-power-backup-solutions.html`
- `/peripheral-solutions.html`
- `/projector-accessories.html`
- `/technology-partners.html`
- `/product-catalog.html`
- `/industries.html`
- `/projects.html`
- `/featured-projects.html`
- `/corporate-projects.html`
- `/education-projects.html`
- `/government-projects.html`
- `/healthcare-projects.html`
- `/our-vision.html`
- `/directors-message.html`
- `/milestones.html`
- `/team.html`
- `/careers.html`
- `/downloads.html`
- `/faq.html`
- `/privacy-policy.html`
- `/terms-disclaimer.html`

## Noindex / Utility Pages

These pages should not compete in search results:

- `/404.html`
- `/thank-you.html`
- `/active-led-video-wall.html` redirects to `/active-led-wall-solutions.html`
- `/brand-detail.html` is a dynamic brand template and should be indexed only after real brand-specific URLs are created

## Pages That Need Business Content Later

These pages are structurally valid but should receive approved real content over time:

- `/case-studies.html`: replace representative stories with approved client case studies
- `/projects.html` and industry project pages: add approved real project images/client permissions
- `/team.html`: add approved team/leadership data if business wants this public
- `/careers.html`: add real openings or keep as general hiring interest page
- `/technology-partners.html`: confirm each brand relationship wording and logo permission

## DevOps Notes

- Multiple pages are intentional for SEO and future CMS migration.
- Service pages are rendered from JSON under `data/services/`.
- Static deployment is acceptable; no backend is required for launch.
- Future CMS can map to `data/cms/` and `data/services/` structures.
