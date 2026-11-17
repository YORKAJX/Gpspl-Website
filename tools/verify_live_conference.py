import urllib.request, re

urls = [
    'https://gpspl.co.in/conference-room-solutions',
    'https://gpspl.co.in/conference-room-solutions.html'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            title = re.search(r'<title>(.*?)</title>', content, re.DOTALL)
            h1 = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
            desc = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.DOTALL)
            canonical = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.DOTALL)
            robots = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\'](.*?)["\']', content, re.DOTALL)
            print(f"URL: {u}")
            print(f"  Live Title: {title.group(1).strip() if title else 'None'}")
            print(f"  Live H1: {re.sub(r'\\s+', ' ', h1.group(1).strip()) if h1 else 'None'}")
            print(f"  Live Desc: {desc.group(1).strip() if desc else 'None'}")
            print(f"  Canonical: {canonical.group(1).strip() if canonical else 'None'}")
            print(f"  Robots: {robots.group(1).strip() if robots else 'None'}")
            print(f"  Has turnkey-scope-blueprint: {'turnkey-scope-blueprint' in content}")
            print(f"  Has gpspl-cookie-banner: {'gpspl-cookie-banner' in content}")
            print(f"  Content length: {len(content)}")
    except Exception as e:
        print(f"Error for {u}: {e}")
