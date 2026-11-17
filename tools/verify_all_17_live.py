import urllib.request, re, json

urls = [
    '/conference-room-solutions',
    '/interactive-display-solutions',
    '/active-led-wall-solutions',
    '/digital-signage-solutions',
    '/auditorium-av-solutions',
    '/professional-audio-solutions',
    '/amc-maintenance-services',
    '/av-system-integrator-delhi-ncr',
    '/av-system-integrator-gurgaon',
    '/av-system-integrator-noida',
    '/active-led-wall-supplier-noida',
    '/samsung-business-tv-befx-h2',
    '/samsung-commercial-display-qbc',
    '/samsung-commercial-display-qmc',
    '/lg-createboard-tr3er',
    '/lg-commercial-tv-nu88c',
    '/lg-commercial-tv-ua831c'
]

results = []

for path in urls:
    full_url = f"https://gpspl.co.in{path}"
    entry = {"path": path, "url": full_url}
    try:
        req = urllib.request.Request(full_url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            
            title_m = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
            h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
            desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.DOTALL)
            canonical_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', html, re.DOTALL)
            robots_m = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\'](.*?)["\']', html, re.DOTALL)
            schemas = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', html, re.DOTALL)
            
            # Check schemas
            schema_types = []
            for s in schemas:
                try:
                    data = json.loads(s.strip())
                    if "@graph" in data:
                        schema_types.extend([x.get("@type", "Unknown") for x in data["@graph"]])
                    else:
                        schema_types.append(data.get("@type", "Unknown"))
                except Exception as ex:
                    schema_types.append(f"JSON_ERROR({ex})")

            # CTAs check
            has_wa = 'wa.me/918920830377' in html or 'api.whatsapp.com' in html
            has_tel = 'tel:+918920830377' in html
            has_form = '<form' in html
            
            entry["status"] = resp.status
            entry["title"] = title_m.group(1).strip() if title_m else "MISSING"
            entry["h1"] = re.sub(r'\s+', ' ', h1_m.group(1).strip()) if h1_m else "MISSING"
            entry["desc"] = desc_m.group(1).strip() if desc_m else "MISSING"
            entry["canonical"] = canonical_m.group(1).strip() if canonical_m else "MISSING"
            entry["robots"] = robots_m.group(1).strip() if robots_m else "MISSING"
            entry["schemas"] = schema_types
            entry["cta_wa"] = has_wa
            entry["cta_tel"] = has_tel
            entry["cta_form"] = has_form
            entry["cookie_banner"] = 'id="gpspl-cookie-banner"' in html
            entry["scope_blueprint"] = 'id="turnkey-scope-blueprint"' in html or 'id="buyer-scope-check"' in html
    except Exception as e:
        entry["error"] = str(e)
    results.append(entry)

with open('data/live_17_verification.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Saved verification results for all 17 live URLs to data/live_17_verification.json")
for r in results:
    print("--------------------------------------------------")
    print(f"Path: {r.get('path')}")
    print(f"  Title: {r.get('title')}")
    print(f"  H1: {r.get('h1')}")
    print(f"  Desc: {r.get('desc')[:80]}...")
    print(f"  Canonical: {r.get('canonical')}")
    print(f"  Robots: {r.get('robots')}")
    print(f"  Schemas: {r.get('schemas')}")
    print(f"  CTAs: WhatsApp={r.get('cta_wa')}, Tel={r.get('cta_tel')}, Form={r.get('cta_form')}")
