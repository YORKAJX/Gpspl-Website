import urllib.request, re

def check_url(url, pattern):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            m = re.search(pattern, content)
            print(f"=== {url} ===")
            print(f"   Status: {resp.status}")
            print(f"   ETag: {resp.headers.get('etag')}")
            print(f"   Pattern '{pattern}' found? {bool(m)}")
            if m:
                print(f"   Match: {m.group(0)[:120]}")
            else:
                # print snippet of where it might be
                print(f"   (Pattern not found in live response of {len(content)} chars)")
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("Checking live production responses from https://gpspl.co.in ...")
check_url('https://gpspl.co.in/lg-createboard-tr3er', r'Android 16')
check_url('https://gpspl.co.in/JS/analytics.js', r'hasAnalyticsConsent')
check_url('https://gpspl.co.in/JS/cookie-consent.js', r'gpsplWithdrawCookieConsent')
check_url('https://gpspl.co.in/auditorium-av-solutions', r'engineering-indicative-disclaimer')
check_url('https://gpspl.co.in/av-system-integrator-bangalore', r'regional-enterprise-solutions')
