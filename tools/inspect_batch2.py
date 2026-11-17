import re, json

pages = [
    'av-system-integrator-delhi-ncr.html',
    'av-system-integrator-gurgaon.html',
    'av-system-integrator-noida.html',
    'active-led-wall-supplier-noida.html',
    'samsung-business-tv-befx-h2.html',
    'samsung-commercial-display-qbc.html',
    'samsung-commercial-display-qmc.html',
    'lg-createboard-tr3er.html',
    'lg-commercial-tv-nu88c.html',
    'lg-commercial-tv-ua831c.html'
]

for p in pages:
    try:
        with open(p, 'r', encoding='utf-8') as f:
            txt = f.read()
        t = re.findall(r'<title>(.*?)</title>', txt)
        h = re.findall(r'<h1[^>]*>(.*?)</h1>', txt, re.DOTALL)
        d = re.findall(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', txt, re.DOTALL)
        schemas = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', txt, re.DOTALL)
        
        print(f"=== {p} ===")
        print(f"  Title: {t[0] if t else 'NONE'}")
        print(f"  H1: {re.sub(r'\\s+', ' ', h[0].strip()) if h else 'NONE'}")
        print(f"  Desc: {d[0] if d else 'NONE'}")
        print(f"  Schema count: {len(schemas)}")
    except Exception as e:
        print(f"Error {p}: {e}")
