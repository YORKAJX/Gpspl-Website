# Immediate traffic and lead-delivery work

## Verified GA4 comparison

Read the user's existing GA4 property (ID 542613676, displayed as magic-info-cccca), which contains GPSPL page titles. Its scope/stream association still needs verification; do not assume every session is a GPSPL prospect.

Compared 2–7 October 2026 with 25–30 September 2026, matched weekdays, excluding the incomplete current day:

| Recorded metric/source | 2–7 October | 25–30 September |
|---|---:|---:|
| Total sessions | 129 | 238 |
| Engaged sessions | 60 | 140 |
| Direct sessions | 31 | 136 |
| organic_direct / none | 77 | 78 |
| chatgpt.com / none | 7 | 14 |
| google / organic | 1 | 0 |
| Recorded key events | 0 | 0 |

Sessions declined 45.8%; the largest absolute decline was Direct (105 fewer sessions). The organic_direct bucket was nearly unchanged. These numbers do not establish a Google ranking loss. The source classification is unreliable: the site code invents organic_direct/none defaults, and the report has a very large Unassigned share. Genuine inbound attribution, bot/internal traffic and stream scope require verification. GA4 key-event zeros do not prove there were no calls or messages.

Local analytics repair avoids invented native-looking UTM values in event payloads, gives custom attribution labels a gpspl_ namespace, preserves real page URL/UTM parameters, and supplies an empty referrer for direct visits. Confirm source attribution with Google/Bing/referral test sessions after release. Historical attribution will not be repaired by a code change.

Search Console remains inaccessible under the current account; use the existing verified owner account/access. Do not reverify solely to view historical reports. Google Business Profile and deployment/provider logs have not been accessed.

## Delivery repairs implemented locally

- Contact forms: one submit owner; await checked success; reject network failure, non-success JSON and skipped anti-spam responses; keep fields and retry on failure; redirect only after acceptance.
- Team notification backend: missing configuration, network failure and provider rejection produce errors instead of false success. Duplicate suppression occurs only after provider acceptance. Optional client acknowledgement failure is separately logged.
- Quote/distribution, consultant, download gate and quick BOQ paths: delivery failures do not display receipt; retries remain available.
- Homepage enterprise BOQ: checked delivery before showing completed enquiry state. Production-only studio hero has a separate production-based repair candidate.
- Optional BOQ mail endpoint: disabled/unconfigured/provider-error states no longer return HTTP success.

Mocked backend and frontend regression checks passed. Production-based frontend candidates are in outputs/lead-delivery-repair, separate from local redesign changes. No live enquiry or real email sent; no push/deployment. Actual lead recovery is not verified until approved changes are released and receipt is tested.

Reference for source classification: https://support.google.com/analytics/answer/9756891?hl=en
