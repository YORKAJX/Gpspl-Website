# GPSPL Backend and CMS Roadmap

## Current Recommendation

Do not add a full custom backend before the first public launch.

The website is currently a static corporate site with CMS-ready content files. This is the right launch approach for GPSPL because it keeps the site fast, secure, easy to host and simple to maintain while the business content, project photos and approvals are still being finalized.

## What Is Already Backend-Ready

- Reusable header and footer modules
- Service pages driven from `data/services/*.json`
- CMS planning models under `data/cms/`
- Google Reviews integration through a Netlify Function
- Static contact forms using a serverless form provider
- Sitemap, robots file, canonical URLs and redirects

## Launch Without CMS

For launch, the site should remain static:

- no database
- no admin login
- no frontend API keys
- no custom server

This reduces risk and avoids unnecessary maintenance before the content is fully approved.

## Recommended Phase 2 CMS Options

Once GPSPL wants non-technical staff to update content, use one of these:

1. Decap CMS / Netlify CMS  
   Best for editing static JSON/Markdown in Git.

2. Sanity  
   Best if the team wants a polished hosted CMS with structured content.

3. Strapi  
   Best if GPSPL wants a self-hosted backend and custom APIs.

## CMS Content To Manage Later

- homepage hero text and images
- service page content
- product and brand cards
- project case studies
- client logos
- certificates and awards
- testimonials
- FAQs
- contact details

## Important Security Rule

API keys, Google Places keys, email credentials and private tokens must never be added to frontend JavaScript or HTML. They should be stored as hosting environment variables.

For Google Reviews, use:

- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `GOOGLE_REVIEWS_URL`

## Practical Next Step

Launch the static site first. After real photos, project approvals and final brand details are ready, migrate only the content sections that need regular updates into a CMS.

