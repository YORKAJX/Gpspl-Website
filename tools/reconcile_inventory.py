import os, glob, json

all_files = [os.path.normpath(f) for f in glob.glob('**/*.html', recursive=True)]

data = {
    'canonical_root_pages': [],
    'canonical_blog_pages': [],
    'canonical_resource_pages': [],
    'dynamic_modules': [],
    'legacy_and_tmp_files': [],
    'staging_outputs_files': [],
    'vendor_files': []
}

for f in sorted(all_files):
    parts = f.split(os.sep)
    if 'node_modules' in parts:
        data['vendor_files'].append(f)
    elif 'tmp' in parts:
        data['legacy_and_tmp_files'].append(f)
    elif 'outputs' in parts:
        data['staging_outputs_files'].append(f)
    elif 'blog' in parts:
        data['canonical_blog_pages'].append(f)
    elif 'resources' in parts:
        data['canonical_resource_pages'].append(f)
    elif 'modules' in parts:
        data['dynamic_modules'].append(f)
    elif len(parts) == 1:
        data['canonical_root_pages'].append(f)

print(f"Total HTML files on disk: {len(all_files)}")
print(f"1. Canonical Root Pages (including index.html): {len(data['canonical_root_pages'])}")
print(f"2. Canonical Blog Pages: {len(data['canonical_blog_pages'])}")
print(f"3. Canonical Resource Pages: {len(data['canonical_resource_pages'])}")
print(f"4. Dynamic Modules (header.html, footer.html): {len(data['dynamic_modules'])}")
print(f"5. Staging Outputs (developer form tests): {len(data['staging_outputs_files'])}")
print(f"6. Legacy & Tmp Snapshots (backups, test renders): {len(data['legacy_and_tmp_files'])}")
print(f"7. Vendor Dependencies: {len(data['vendor_files'])}")

total_public_canonical_routes = len(data['canonical_root_pages']) + len(data['canonical_blog_pages']) + len(data['canonical_resource_pages'])
print(f"\nTotal Public Canonical URLs = {total_public_canonical_routes}")
print(f"Total Public Canonical + Modules = {total_public_canonical_routes + len(data['dynamic_modules'])}")
print(f"Total files touched by universal glob = {total_public_canonical_routes + len(data['staging_outputs_files']) + len(data['legacy_and_tmp_files'])}")

with open('data/inventory_reconciliation.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
print("Saved detailed list to data/inventory_reconciliation.json")
