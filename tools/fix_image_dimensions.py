import os
import sys
import re
from urllib.parse import urlparse

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")
sys.path.insert(0, os.path.join(SITE_DIR, "tools"))
import screaming_frog_audit as sfa
from test_parser import get_image_size

def fix_image_dimensions():
    pages = sfa.get_public_pages()
    total_imgs_updated = 0

    img_tag_re = re.compile(r'<img\b(?![^>]*\b(width|height)=)[^>]*>', re.IGNORECASE)
    # More generally, match any <img ...>
    any_img_re = re.compile(r'<img\b([^>]*)>', re.IGNORECASE)

    for full_path, rel in pages:
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        modified = False

        def repl_img(match):
            nonlocal total_imgs_updated, modified
            attrs_str = match.group(1)

            # Check if both width and height exist
            has_w = bool(re.search(r'\bwidth=[\"\']\d+', attrs_str, re.IGNORECASE))
            has_h = bool(re.search(r'\bheight=[\"\']\d+', attrs_str, re.IGNORECASE))

            if has_w and has_h:
                return match.group(0)

            # Extract src
            src_m = re.search(r'\bsrc=[\"\']([^\"\']+)[\"\']', attrs_str, re.IGNORECASE)
            if not src_m:
                return match.group(0)

            src = src_m.group(1).strip()
            if src.startswith("data:") or src.startswith("http://") or src.startswith("https://"):
                return match.group(0)

            # Resolve local path
            clean_src = src.split("?")[0].split("#")[0]
            if clean_src.startswith("/"):
                file_path = os.path.join(SITE_DIR, clean_src.lstrip("/").replace("/", os.sep))
            else:
                curr_dir = os.path.dirname(full_path)
                file_path = os.path.join(curr_dir, clean_src.replace("/", os.sep))

            w, h = get_image_size(file_path)
            if not w or not h:
                return match.group(0)

            # Inject missing width and height
            new_attrs = attrs_str
            if not has_w:
                new_attrs += f' width="{w}"'
            if not has_h:
                new_attrs += f' height="{h}"'

            total_imgs_updated += 1
            modified = True
            return f'<img{new_attrs}>'

        new_content = any_img_re.sub(repl_img, content)

        if modified:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated images in: {rel}")

    print(f"\nDone! Injected width/height into {total_imgs_updated} image tags across the site.")

if __name__ == "__main__":
    fix_image_dimensions()
