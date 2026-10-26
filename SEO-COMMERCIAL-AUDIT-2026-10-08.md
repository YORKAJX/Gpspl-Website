# Commercial SEO audit and local repair

Nine production service/product URLs were fetched on 8 October 2026; all returned HTTP 200. Homepage/contact indexing checks are documented in the lead diagnostic. No ranking decline or Google penalty has been established without Search Console data.

## Local changes

Updated titles, descriptions and social preview metadata for 18 existing pages, with Delhi NCR first and national supply/project intent retained. Runtime SEO configuration now uses the same text so it does not overwrite those edits. Improved the primary headings for conference rooms, Active LED, JBL professional audio, education, hospitality, end-to-end integration and LG UA831C TVs. These changes describe what each page offers without unverified superiority, uptime or response-time claims in the edited metadata.

Added visible regional coverage sections to the homepage and seven core service/supply pages. These link to Delhi NCR and Gurugram landing pages, distribution, complete integration and contact, and ask national buyers for their city and project scope. No new branch offices or guaranteed national SLA were claimed. Existing city routes, model content, canonical URLs and Google verification tag were preserved. The local Delhi NCR page had malformed description tags; these were replaced with valid tags. The corresponding live description was well formed, so this local issue is not evidence for the production traffic decline.

Validation: build and JS syntax checks passed; metadata uniqueness, index/follow directives, clean canonicals, single coverage sections and local regional link destinations passed. The conference-room preview showed the expected title, heading and Delhi NCR/Pan-India coverage after runtime scripts loaded. No production delivery test performed.

Fixed tools/sync-seo.cjs to generate extensionless canonical URLs, matching the existing HTML/runtime configuration. The broad generator was not run: it touches unrelated pages and resets all sitemap lastmod dates.

| Search intent | Existing destination |
|---|---|
| Complete end-to-end AV | /audio-visual-integration |
| Corporate conference rooms and boardrooms | /conference-room-solutions |
| Active LED supply and system planning | /active-led-wall-solutions |
| LED installation and calibration | /active-led-wall-installation |
| JBL professional sound and audio integration | /professional-audio-solutions |
| Education AV and smart classrooms | /smart-classroom-solutions |
| Hotel and hospitality AV | /hotel-hospitality-av-solutions |
| B2B AV equipment distribution | /av-technology-distribution |
| Samsung signage | /samsung-commercial-display-qmc and /samsung-commercial-display-qbc |
| Samsung business TV | /samsung-business-tv-befx-h2 |
| LG commercial TV | /lg-commercial-tv-ua831c and /lg-commercial-tv-nu88c |
| Corporate and education project evidence | /corporate-projects and /education-projects |

## Remaining evidence and risks

Production is newer than this local redesign branch. These are local candidate changes and require reconciliation with the deployed revision before any release; do not deploy this branch wholesale. The downloaded production copies are in tmp/seo-live-*.html.

Long production titles and vague H1s were observed on Active LED, professional audio and LG UA831C. This is a content clarity gap, not proof that they caused the sudden traffic decline. Conference room, classroom and hospitality live headings already have relevant wording. Do not replace those live layouts with the older local layouts.

Search Console comparisons must identify which queries and landing pages lost impressions, clicks or position. Check indexed URLs, canonical selection and the Friday deployment diff. Validate internal-link coverage and real project evidence against those affected pages. No new model specifications, manufacturer status or customer results were invented.

The previously identified form-delivery defects still need separate repair and end-to-end verification. Better SEO cannot correct lost submissions.

Reference: Google Search Central recommends clear, distinct titles rather than repeated keyword lists: https://developers.google.com/search/docs/appearance/title-link

No push or deployment performed.
