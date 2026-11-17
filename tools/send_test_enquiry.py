import urllib.request, json

payload = {
    "name": "GPSPL Internal QA Audit Test",
    "phone": "8920830377",
    "email": "global@gpspl.co.in",
    "company": "GPSPL Internal Audit",
    "location": "Nehru Place HQ",
    "requirement": "Internal System Verification Test",
    "message": "INTERNAL QA VERIFICATION TEST ONLY. Please disregard.",
    "leadSource": "Direct Internal QA Test",
    "timeToken": 12345
}

url = "https://gpspl.co.in/.netlify/functions/submit-enquiry"
data_bytes = json.dumps(payload).encode('utf-8')

req = urllib.request.Request(
    url,
    data=data_bytes,
    headers={
        "Content-Type": "application/json",
        "Origin": "https://gpspl.co.in",
        "Referer": "https://gpspl.co.in/contact",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    method="POST"
)

try:
    print(f"Sending internal QA test enquiry to {url} ...")
    with urllib.request.urlopen(req, timeout=15) as resp:
        status = resp.status
        body = resp.read().decode('utf-8')
        print(f"Response HTTP Status: {status}")
        print(f"Response Body: {body}")
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code} - {e.reason}")
    print(f"Error Body: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Exception: {e}")
