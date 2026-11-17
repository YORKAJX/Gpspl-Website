import fitz # PyMuPDF
import re

pdf_files = [
    'samsung-business-tv-befx-h2-datasheet.pdf',
    'samsung-commercial-display-qbc-datasheet.pdf',
    'samsung-commercial-display-qmc-datasheet.pdf',
    'lg-createboard-tr3er-datasheet.pdf',
    'lg-commercial-tv-nu88c-datasheet.pdf',
    'lg-commercial-tv-ua831c-datasheet.pdf'
]

results = {}

for pdf in pdf_files:
    try:
        doc = fitz.open(pdf)
        full_text = ""
        for page in doc:
            full_text += page.get_text() + "\n"
        results[pdf] = full_text
        print(f"=== {pdf} (pages={len(doc)}, chars={len(full_text)}) ===")
        # Search for key parameters
        for kw in ['operating hour', 'operation hour', 'duty cycle', 'brightness', 'nit', 'os', 'operating system', 'android', 'touch', 'point', 'warranty', 'edla']:
            matches = [line.strip() for line in full_text.splitlines() if re.search(r'\b' + kw + r'\b', line, re.I)]
            if matches:
                print(f"  [{kw.upper()}]:", matches[:2])
    except Exception as e:
        print(f"Error {pdf}: {e}")
