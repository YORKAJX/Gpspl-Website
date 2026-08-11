import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if 'tmp' in root or '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

all_existing_paths = {'/', '/index.html', 'index.html'}
for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        p = os.path.normpath(os.path.join(root, f)).replace('\\', '/')
        if p.startswith('./'):
            p = p[2:]
        all_existing_paths.add('/' + p)
        all_existing_paths.add(p)

real_broken_links = []
for hf in html_files:
    rel_hf = hf.replace('\\', '/')
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    href_matches = re.findall(r'<a\s+[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>', content, re.IGNORECASE)
    for hr in href_matches:
        if hr.startswith('http') or hr.startswith('tel:') or hr.startswith('mailto:') or hr.startswith('javascript:'):
            continue
        if hr == '#' or hr.startswith('#'):
            continue
        clean_hr = hr.split('#')[0].split('?')[0]
        if not clean_hr:
            continue
        if clean_hr == '/':
            continue
        norm_hr = clean_hr if clean_hr.startswith('/') else '/' + clean_hr
        candidates = [
            norm_hr,
            norm_hr + '.html',
            norm_hr + '/index.html',
            norm_hr.lstrip('/'),
            (norm_hr + '.html').lstrip('/'),
            (norm_hr.rstrip('/') + '.html').lstrip('/')
        ]
        file_dir = os.path.dirname(rel_hf)
        rel_candidate = os.path.normpath(os.path.join(file_dir, clean_hr)).replace('\\', '/')
        candidates.extend([rel_candidate, rel_candidate + '.html', '/' + rel_candidate, rel_candidate.lstrip('/')])

        if not any(c in all_existing_paths for c in candidates):
            real_broken_links.append((rel_hf, hr))

print(f'Total HTML user files scanned: {len(html_files)}')
print(f'Real Broken internal links found: {len(real_broken_links)}')
for rbl in real_broken_links:
    print(f'  [BROKEN LINK] in {rbl[0]} -> {rbl[1]}')
