import re
with open('av-system-integrator-bangalore.html', 'r', encoding='utf-8') as f:
    text = f.read()

headings = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', text, re.DOTALL)
print("Headings in Bangalore page:")
for h in headings:
    print("  ", re.sub(r'<[^>]+>', '', h).strip())
