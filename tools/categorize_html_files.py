import glob, os

all_html = [os.path.normpath(f) for f in glob.glob('**/*.html', recursive=True)]
print(f"Total HTML files in repository: {len(all_html)}")

categories = {
    'root_production': [],
    'blog': [],
    'resources': [],
    'modules': [],
    'tmp_legacy': [],
    'outputs_archive': [],
    'node_modules': []
}

for f in all_html:
    parts = f.split(os.sep)
    if 'node_modules' in parts:
        categories['node_modules'].append(f)
    elif 'tmp' in parts:
        categories['tmp_legacy'].append(f)
    elif 'outputs' in parts:
        categories['outputs_archive'].append(f)
    elif 'blog' in parts:
        categories['blog'].append(f)
    elif 'resources' in parts:
        categories['resources'].append(f)
    elif 'modules' in parts:
        categories['modules'].append(f)
    elif len(parts) == 1:
        categories['root_production'].append(f)
    else:
        categories['tmp_legacy'].append(f)

for cat, files in categories.items():
    print(f"Category: {cat} -> {len(files)} files")
