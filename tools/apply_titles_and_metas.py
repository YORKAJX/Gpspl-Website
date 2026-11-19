import os
import re
from prepare_titles_and_metas import TITLE_FIXES, DESC_FIXES

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")

def apply_fixes():
    total_titles_fixed = 0
    total_descs_fixed = 0

    all_files = set(list(TITLE_FIXES.keys()) + list(DESC_FIXES.keys()))

    for rel in sorted(all_files):
        full_path = os.path.join(SITE_DIR, rel.replace("/", os.sep))
        if not os.path.exists(full_path):
            print(f"File not found: {full_path}")
            continue

        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        modified = False

        # Apply Title Fix
        if rel in TITLE_FIXES:
            new_title = TITLE_FIXES[rel]
            # Replace <title>...</title>
            title_pat = re.compile(r'<title>.*?</title>', re.IGNORECASE | re.DOTALL)
            if title_pat.search(content):
                content = title_pat.sub(f'<title>{new_title}</title>', content, count=1)
                total_titles_fixed += 1
                modified = True

            # Also sync og:title and twitter:title if they exist
            og_title_pat = re.compile(r'<meta\s+property=[\"\']og:title[\"\']\s+content=[\"\'][^\"\']*[\"\']\s*/?>', re.IGNORECASE)
            if og_title_pat.search(content):
                content = og_title_pat.sub(f'<meta property="og:title" content="{new_title}">', content, count=1)

            tw_title_pat = re.compile(r'<meta\s+name=[\"\']twitter:title[\"\']\s+content=[\"\'][^\"\']*[\"\']\s*/?>', re.IGNORECASE)
            if tw_title_pat.search(content):
                content = tw_title_pat.sub(f'<meta name="twitter:title" content="{new_title}">', content, count=1)

        # Apply Meta Description Fix
        if rel in DESC_FIXES:
            new_desc = DESC_FIXES[rel]
            # Replace <meta name="description" content="...">
            desc_pat = re.compile(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\'][^\"\']*[\"\']\s*/?>', re.IGNORECASE)
            if desc_pat.search(content):
                content = desc_pat.sub(f'<meta name="description" content="{new_desc}">', content, count=1)
                total_descs_fixed += 1
                modified = True

            # Also sync og:description and twitter:description if they exist
            og_desc_pat = re.compile(r'<meta\s+property=[\"\']og:description[\"\']\s+content=[\"\'][^\"\']*[\"\']\s*/?>', re.IGNORECASE)
            if og_desc_pat.search(content):
                content = og_desc_pat.sub(f'<meta property="og:description" content="{new_desc}">', content, count=1)

            tw_desc_pat = re.compile(r'<meta\s+name=[\"\']twitter:description[\"\']\s+content=[\"\'][^\"\']*[\"\']\s*/?>', re.IGNORECASE)
            if tw_desc_pat.search(content):
                content = tw_desc_pat.sub(f'<meta name="twitter:description" content="{new_desc}">', content, count=1)

        if modified:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated metadata in: {rel}")

    print(f"\nDone! Updated {total_titles_fixed} titles and {total_descs_fixed} descriptions.")

if __name__ == "__main__":
    apply_fixes()
