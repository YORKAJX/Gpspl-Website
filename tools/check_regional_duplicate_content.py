import difflib, re
from bs4 import BeautifulSoup

regional_pages = [
    'av-system-integrator-delhi-ncr.html',
    'av-system-integrator-gurgaon.html',
    'av-system-integrator-noida.html',
    'active-led-wall-supplier-noida.html',
    'av-system-integrator-bangalore.html',
    'av-system-integrator-mumbai.html',
    'av-system-integrator-hyderabad.html'
]

page_texts = {}
for p in regional_pages:
    try:
        with open(p, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            # Extract main body text excluding nav and footer
            for tag in soup(['nav', 'header', 'footer', 'script', 'style']):
                tag.decompose()
            text = soup.get_text()
            text = re.sub(r'\s+', ' ', text).strip()
            page_texts[p] = text
    except Exception as e:
        print(f"Error {p}: {e}")

print("Text similarity matrix across regional pages:")
for i, p1 in enumerate(regional_pages):
    for j, p2 in enumerate(regional_pages):
        if j > i:
            ratio = difflib.SequenceMatcher(None, page_texts[p1], page_texts[p2]).ratio()
            print(f"  {p1} <--> {p2}: {ratio:.2%}")
