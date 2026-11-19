# GPSPL first-page search audit — 19 November 2026

## Measured baseline

The supplied Google Search Console screenshots show 72 web-search clicks from 6,060 impressions between 3 and 18 November 2026, a 1.2% CTR and average position 23.6. The latest seven days show 39 clicks from 2,670 impressions, 1.5% CTR and average position 23.3. The website is being shown and clicked; these numbers do not support a deindexing conclusion. The commercial limitation is that the average result sits around page two or three and receives about 4.5 organic clicks per day over the longer supplied range.

## Changes in this pass

- Rewrote the title and description on the homepage and eight priority commercial pages around one clear buyer intent per page. Titles are 46–60 characters and descriptions are 143–154 characters in source.
- Made the homepage H1 state the actual service scope instead of the generic “complete solutions” phrase.
- Aligned the professional-audio H1 with JBL and installed sound-system intent rather than narrowing the page to gyms.
- Added static internal links to the previously isolated team, featured-project and Mumbai, Bangalore and Hyderabad integration pages. Added the same destinations to the shared footer directory.
- Added `llms.txt` as a concise, factual directory of GPSPL services, evidence pages and designated contact details. The wildcard robots policy allows compliant public search and answer-engine crawlers.
- Removed contradictory lazy loading from priority hero images marked `fetchpriority="high"`.
- Extracted two embedded proposal images from the homepage configurator JavaScript. The script fell from about 635 KB to about 72 KB uncompressed; the images are now separately cacheable and requested only when their URLs are used.
- Added an automated architecture audit covering sitemap-to-file resolution, titles, H1 counts, internal links and orphan detection.

## Verified architecture

- 94 unique, canonical, indexable sitemap URLs.
- Zero broken internal links in sitemap pages.
- Zero missing or multiple H1 elements.
- Zero duplicate or missing page titles.
- Zero sitemap pages without at least one static internal link.
- Googlebot, OAI-SearchBot, ChatGPT-User and Google-Extended received HTTP 200 for the tested public conference-room page before this deployment. The current wildcard robots policy allows them.

## Competitor result observations

The sampled result pages that compete visibly use highly specific local service propositions, project photographs, named installations, warranty/support details and a short path to call, WhatsApp or quote. GPSPL already has broader vertical coverage; its weakness is average rank and evidence consistency, not missing keyword volume. Competitor traffic totals are not public Search Console data and were not invented or estimated.

## Limits and next measurement

First-page ranking, ChatGPT/Gemini recommendation and lead volume cannot be guaranteed by code changes. Google controls ranking and snippets. Search Console query and page exports are still needed to map actual impressions and clicks to each vertical. After deployment, compare the same pages for 14 and 28 complete days; do not keep changing titles daily. Review received calls, WhatsApp messages and emails alongside clicks so contact attempts are not confused with genuine enquiries.

The automated Lighthouse run could not produce a valid LCP trace in the local Windows environment. Payload reductions were measured from source and HTTP compression headers, but a field Core Web Vitals report still needs PageSpeed Insights or Search Console Core Web Vitals after deployment.
