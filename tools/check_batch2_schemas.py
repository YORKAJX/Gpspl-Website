import json, re

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
    txt = open(p, encoding='utf-8').read()
    schemas = re.findall(r'<script\s+type=[\"\']application/ld\+json[\"\']>(.*?)</script>', txt, re.DOTALL)
    print(f'=== {p} ===')
    for i, s in enumerate(schemas):
        try:
            d = json.loads(s.strip())
            if '@graph' in d:
                types = [x.get('@type') for x in d['@graph']]
                print(f'  Schema {i+1}: @graph with {types}')
            else:
                print(f'  Schema {i+1}: {d.get("@type")}')
        except Exception as e:
            print(f'  Schema {i+1} JSON ERROR: {e}')
