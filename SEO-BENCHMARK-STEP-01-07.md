# GPSPL SEO Benchmark - Step 01 to Step 07

## Purpose

This benchmark defines the minimum quality standard for all GPSPL SEO and conversion pages completed through Step 07. The goal is not to publish ordinary keyword pages. Each page must look like it belongs to a serious enterprise AV, IT and display integration company that understands project engineering, product fit, site validation, installation quality and lifecycle support.

## Benchmark pages covered

| Page | Primary purpose | Visible word depth |
| --- | --- | --- |
| `index.html` | Enterprise AV + BOQ conversion homepage | 2415 words |
| `audio-visual-integration.html` | Flagship AV system integration page | 2013 words |
| `conference-room-solutions.html` | Conference room and boardroom AV page | 2022 words |
| `active-led-wall-solutions.html` | Active LED wall authority page | 2192 words |
| `professional-audio-solutions.html` | Professional audio and auditorium authority page | 2030 words |

## Content standard

- Each page must explain what GPSPL does, why it matters and how the design is validated.
- Content must be useful to a real buyer, consultant, IT head, facility manager or purchase team.
- Avoid thin copy, generic claims, placeholder language and random keyword stuffing.
- Show engineering logic wherever relevant: room size, usage, viewing distance, acoustic risk, cabling, rack, UPS, tuning, commissioning, AMC and site survey.
- Explain final pricing limits clearly: planning estimates help early decisions, but final brand, model, quantity and labour are confirmed after site validation and client approval.
- Every major page should have a clear CTA toward quote, BOQ calculator, site review or consultation.

## Visual standard

- Use real, classified project images only where the image supports the section.
- Do not use blurry, unrelated or stock-looking classroom/control-room filler images.
- Brand logos must render cleanly without grey patches, screenshots, clipped boxes or cutout artifacts.
- Image galleries should feel intentional: boardroom images for meeting-room pages, audio/stage/rack images for audio pages, LED/gallery images for LED pages.
- Desktop pages must not have horizontal overflow.
- Visible viewport images must not be broken or blank.

## SEO standard

- Each priority page should have a focused title and meta description matching the mapped search intent.
- Target terms should be naturally covered in headings, body copy, FAQs and internal links.
- Use FAQ schema where page FAQs are visible.
- Use Service schema where the page represents a commercial service.
- Internal linking should point users to related GPSPL solutions: BOQ calculator, AV integration, conference room, professional audio, LED wall, control automation, AMC and contact.

## Engineering standard

- The page must present GPSPL as a design-led integrator, not only a product picker.
- Audio pages must discuss microphone pickup, speaker coverage, DSP, amplifier headroom, tuning and commissioning.
- LED pages must discuss viewing distance, pixel pitch, controller workflow, mounting, power, calibration and AMC.
- Conference-room pages must discuss display, camera, mic, speaker, DSP, control, rack, UPS and meeting workflow.
- AV integration pages must connect product supply, system design, installation, programming, commissioning and support.

## QA completed

Browser QA was run on:

- `index.html`
- `audio-visual-integration.html`
- `conference-room-solutions.html`
- `active-led-wall-solutions.html`
- `professional-audio-solutions.html`

Results:

- No horizontal overflow.
- No visible broken images.
- Primary CTA present.
- Schema present.
- Old `absen-wordmark.png` references removed from checked pages.
- Old `jbl-logo.svg` references removed from checked pages.
- Professional audio gallery images loaded.
- Project showcase uses real selected GPSPL/project visuals.

Command checks:

- `npm run check:js` passed.
- `npm run qa:boq` passed.

## Step 08 quality gate

The smart classroom and education page must meet or exceed this same standard:

- 2000+ useful words.
- Education-specific SEO intent.
- Real classroom/training/project imagery where relevant.
- Interactive display, projector, classroom audio, lecture capture, hybrid teaching, teacher training and AMC content.
- FAQ and schema.
- Visual QA on desktop and mobile.
