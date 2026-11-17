import re

text = open('JS/analytics.js', encoding='utf-8').read()

events = set(re.findall(r'track\([\"\']([a-zA-Z0-9_]+)[\"\']', text))
print("Unique GA4 Events tracked in JS/analytics.js:")
for e in sorted(events):
    print(f"  - {e}")

# Check click tracking logic
print("\nClick tracking inspection:")
for l in text.splitlines():
    if any(k in l for k in ['wa.me', 'tel:', 'mailto:', 'generate_lead', 'whatsapp', 'phone']):
        print("  ", l.strip()[:100])

# Check backend delivery logic in netlify/functions/submit-enquiry.js
print("\nBackend Lead Delivery Inspection (netlify/functions/submit-enquiry.js):")
backend_text = open('netlify/functions/submit-enquiry.js', encoding='utf-8').read()
recipients = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', backend_text)
print("  Recipients found in submit-enquiry.js:", set(recipients))
providers = [l.strip() for l in backend_text.splitlines() if any(k in l.lower() for k in ['resend', 'formsubmit', 'nodemailer', 'smtp', 'sendgrid'])]
print("  Delivery mechanisms identified:")
for p in providers[:5]:
    print("    ", p[:90])
