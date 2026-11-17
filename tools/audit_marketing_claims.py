import re, glob

claims = {
    '1500_facilities': r'\b1[,.]?500\+?\s*(?:facilities|projects|installations|rooms)?',
    '28_states': r'\b28\s+states\b',
    '4_hour_sla': r'\b4-?hour\s*(?:emergency|onsite|response|sla)?',
    '16_oem': r'\b16\+?\s*(?:oem|brands|partners)',
    'tier_1': r'\btier-?1\b',
    'certified': r'\b(?:certified|certification)\b'
}

files = glob.glob('*.html') + glob.glob('blog/*.html')

claim_occurrences = {k: [] for k in claims}

for f in files:
    try:
        content = open(f, 'r', encoding='utf-8').read()
        for k, pat in claims.items():
            matches = re.findall(pat, content, re.IGNORECASE)
            if matches:
                claim_occurrences[k].append((f, len(matches)))
    except Exception as e:
        pass

for k, occs in claim_occurrences.items():
    print(f"=== Claim '{k}' found in {len(occs)} files ===")
    for f, count in occs[:4]:
        print(f"  {f}: {count} occurrences")
