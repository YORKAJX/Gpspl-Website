import os
import sys
import re

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")
sys.path.insert(0, os.path.join(SITE_DIR, "tools"))
import screaming_frog_audit as sfa

def fix_hero_lazy():
    pages = sfa.get_public_pages()
    total_fixed = 0

    for full_path, rel in pages:
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        modified = False
        # Find any section with class containing 'hero'
        # Pattern to find start of section: <section[^>]*class="[^"]*hero[^"]*"[^>]*>
        pos = 0
        new_content_parts = []
        sec_pattern = re.compile(r'(<section[^>]*class=[\"\'][^\"\']*hero[^\"\']*[\"\'][^>]*>)', re.IGNORECASE)
        
        while True:
            m = sec_pattern.search(content, pos)
            if not m:
                new_content_parts.append(content[pos:])
                break
            
            # Append text up to start of section
            new_content_parts.append(content[pos:m.start()])
            
            # Find the matching </section>
            sec_start = m.start()
            sec_end = content.find("</section>", m.end())
            if sec_end == -1:
                sec_block = content[m.start():]
                pos = len(content)
            else:
                sec_end += len("</section>")
                sec_block = content[m.start():sec_end]
                pos = sec_end

            # Replace loading="lazy" in sec_block
            def repl_lazy(im):
                nonlocal total_fixed, modified
                tag = im.group(0)
                # replace loading="lazy" with loading="eager" fetchpriority="high"
                new_tag = re.sub(r'\s+loading=[\"\']lazy[\"\']', ' loading="eager" fetchpriority="high"', tag)
                if new_tag != tag:
                    total_fixed += 1
                    modified = True
                return new_tag

            fixed_sec_block = re.sub(r'<img[^>]+>', repl_lazy, sec_block)
            new_content_parts.append(fixed_sec_block)

        new_content = "".join(new_content_parts)
        if modified:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated hero images in: {rel}")

    print(f"Total hero images converted to eager loading: {total_fixed}")

if __name__ == "__main__":
    fix_hero_lazy()
