# Immediate lead delivery repair candidates

Nothing in this directory has been deployed. The main.js, form-validation.js, lead-capture.js, room-configurator.js, studio-interactive.js, analytics.js and index.html candidates are based on downloaded public production copies. Compare them with the actual deployment revision before applying. index.html contains only the production BOQ delivery repair, not the local redesign/SEO changes.

Local netlify/functions/submit-enquiry.js and boq-lead-email.js contain backend repairs. Their production versions have not been reconciled. Do not deploy the entire redesign branch or replace production backend blindly.

Contact forms now have one delivery owner, checked acknowledgements and no two-second success redirect. Quote and hero handlers check success before displaying receipt. Backend team notification must be accepted by the email provider before success; failure returns 503 and is logged. Failed delivery no longer creates a duplicate suppression entry. Optional acknowledgement failure does not undo an already accepted team notification. Provider acceptance does not prove final inbox delivery.

Client-side LocalStorage is not a central lead database. Backend deduplication remains an in-memory best-effort mechanism. Timeouts can leave an uncertain result; user-visible text states this, rather than declaring success. Turnstile requirements remain intact; all configured widgets must supply valid tokens. Skipped anti-spam responses cannot trigger confirmed success.

Validation command: node scripts/qa-lead-delivery.mjs. All messages and provider requests in this test are mocked.

Before release: reconcile deployed revision, verify presence of configured email provider key and correct recipient routing without exposing secrets, verify any Turnstile widget/token path, deploy only the approved repair, then send one labeled test enquiry and confirm provider status and inbox receipt. No production messages sent during this audit.
