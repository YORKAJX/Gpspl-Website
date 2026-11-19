import os
import re
import json
import glob
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")
REDIRECTS_FILE = os.path.join(SITE_DIR, "_redirects")
SITEMAP_FILE = os.path.join(SITE_DIR, "sitemap.xml")
ROBOTS_FILE = os.path.join(SITE_DIR, "robots.txt")

# Load _redirects
redirect_rules = {}
rewrite_rules = {}
if os.path.exists(REDIRECTS_FILE):
    with open(REDIRECTS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split()
            if len(parts) >= 2:
                src, dst = parts[0], parts[1]
                status = parts[2] if len(parts) > 2 else "301"
                if "200" in status:
                    rewrite_rules[src] = dst
                else:
                    redirect_rules[src] = (dst, status)

def get_public_pages():
    pages = []
    for root, dirs, files in os.walk(SITE_DIR):
        if any(p in root for p in ["tmp", ".git", "node_modules", "outputs", "modules"]):
            continue
        for f in files:
            if f.endswith(".html"):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, SITE_DIR).replace("\\", "/")
                pages.append((full_path, rel_path))
    return sorted(pages, key=lambda x: x[1])

def run_audit():
    pages = get_public_pages()
    print(f"Loaded {len(pages)} public HTML pages for comprehensive Screaming Frog audit.\n")

    # Mapping of clean url to rel_path
    clean_url_to_rel = {}
    for full_path, rel in pages:
        clean = rel.replace(".html", "")
        if clean == "index":
            clean_url_to_rel["/"] = rel
            clean_url_to_rel[""] = rel
        else:
            clean_url_to_rel["/" + clean] = rel
            clean_url_to_rel[clean] = rel
        clean_url_to_rel["/" + rel] = rel

    # Storage for findings
    page_audits = {}
    all_titles = {}
    all_descs = {}
    all_h1s = {}
    all_canonicals = {}
    broken_links = []
    broken_images = []
    redirect_chain_links = []
    missing_alt_images = []
    missing_dim_images = []
    lazy_hero_images = []
    heading_hierarchy_issues = []
    title_issues = []
    desc_issues = []
    canonical_issues = []
    robots_issues = []
    og_issues = []
    schema_issues = []

    for full_path, rel_path in pages:
        with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")
        head = soup.find("head")
        body = soup.find("body")

        audit = {
            "rel_path": rel_path,
            "title": "",
            "title_len": 0,
            "title_status": "OK",
            "desc": "",
            "desc_len": 0,
            "desc_status": "OK",
            "canonical": "",
            "canonical_status": "OK",
            "robots": "",
            "robots_status": "OK",
            "h1s": [],
            "h2_count": len(soup.find_all("h2")),
            "h3_count": len(soup.find_all("h3")),
            "h1_status": "OK",
            "broken_internal_links": [],
            "redirect_links": [],
            "missing_alt_count": 0,
            "missing_dim_count": 0,
            "lazy_hero_count": 0,
            "og_status": "OK",
            "schema_types": [],
            "schema_valid": True,
        }

        # 1. Canonical Check
        can_tags = soup.find_all("link", attrs={"rel": "canonical"})
        if not can_tags:
            audit["canonical_status"] = "MISSING"
            canonical_issues.append((rel_path, "Missing canonical tag"))
        elif len(can_tags) > 1:
            audit["canonical_status"] = "MULTIPLE"
            canonical_issues.append((rel_path, f"Multiple canonical tags ({len(can_tags)})"))
        else:
            can_tag = can_tags[0]
            href = can_tag.get("href", "").strip()
            audit["canonical"] = href
            # Check if inside head
            if can_tag.parent != head and head is not None and can_tag not in head.find_all("link"):
                audit["canonical_status"] = "OUTSIDE_HEAD"
                canonical_issues.append((rel_path, "Canonical tag outside <head>"))
            
            # Expected canonical format
            expected_slug = rel_path.replace(".html", "")
            if expected_slug == "index":
                expected_can = "https://gpspl.co.in/"
            else:
                expected_can = f"https://gpspl.co.in/{expected_slug}"
            
            if href != expected_can:
                # Check if it has .html or uppercase or protocol mismatch
                audit["canonical_status"] = "MISMATCH"
                canonical_issues.append((rel_path, f"Canonical mismatch: expected '{expected_can}', found '{href}'"))
            
            all_canonicals.setdefault(href, []).append(rel_path)

        # 2. Robots Directives
        # Check for robots meta tags
        robot_tags = soup.find_all("meta", attrs={"name": lambda x: x and x.lower() == "robots"})
        for rt in robot_tags:
            content_val = rt.get("content", "").lower()
            audit["robots"] = content_val
            # Check if outside head
            if rt.parent != head and head is not None and rt not in head.find_all("meta"):
                robots_issues.append((rel_path, f"Robots meta outside <head>: {content_val}"))
            # Check for accidental noindex on important pages
            is_utility = any(u in rel_path for u in ["404", "thank-you", "terms-disclaimer", "privacy-policy"])
            if "noindex" in content_val and not is_utility:
                robots_issues.append((rel_path, f"CRITICAL: Non-utility page has noindex: {content_val}"))
                audit["robots_status"] = "ACCIDENTAL_NOINDEX"

        # 3. Titles
        title_tags = soup.find_all("title")
        if not title_tags or not title_tags[0].text.strip():
            audit["title_status"] = "MISSING"
            title_issues.append((rel_path, "Missing <title>"))
        elif len(title_tags) > 1:
            audit["title_status"] = "MULTIPLE"
            title_issues.append((rel_path, f"Multiple <title> tags ({len(title_tags)})"))
        else:
            t_text = title_tags[0].text.strip()
            audit["title"] = t_text
            audit["title_len"] = len(t_text)
            if len(t_text) > 65:
                title_issues.append((rel_path, f"Title too long ({len(t_text)} chars): {t_text[:50]}..."))
                audit["title_status"] = "TOO_LONG"
            elif len(t_text) < 30:
                title_issues.append((rel_path, f"Title too short ({len(t_text)} chars): {t_text}"))
                audit["title_status"] = "TOO_SHORT"
            all_titles.setdefault(t_text, []).append(rel_path)

        # 4. Meta Description
        desc_tags = soup.find_all("meta", attrs={"name": lambda x: x and x.lower() == "description"})
        if not desc_tags or not desc_tags[0].get("content", "").strip():
            audit["desc_status"] = "MISSING"
            desc_issues.append((rel_path, "Missing meta description"))
        elif len(desc_tags) > 1:
            audit["desc_status"] = "MULTIPLE"
            desc_issues.append((rel_path, f"Multiple meta descriptions ({len(desc_tags)})"))
        else:
            d_text = desc_tags[0].get("content", "").strip()
            audit["desc"] = d_text
            audit["desc_len"] = len(d_text)
            if len(d_text) > 165:
                desc_issues.append((rel_path, f"Meta description too long ({len(d_text)} chars)"))
                audit["desc_status"] = "TOO_LONG"
            elif len(d_text) < 70 and not any(u in rel_path for u in ["404", "thank-you"]):
                desc_issues.append((rel_path, f"Meta description too short ({len(d_text)} chars)"))
                audit["desc_status"] = "TOO_SHORT"
            all_descs.setdefault(d_text, []).append(rel_path)

        # 5. Heading Structure
        h1_tags = soup.find_all("h1")
        h1_texts = [h.get_text(separator=" ", strip=True) for h in h1_tags]
        audit["h1s"] = h1_texts
        if len(h1_tags) == 0:
            audit["h1_status"] = "MISSING"
            heading_hierarchy_issues.append((rel_path, "Missing <h1> tag"))
        elif len(h1_tags) > 1:
            audit["h1_status"] = "MULTIPLE"
            heading_hierarchy_issues.append((rel_path, f"Multiple <h1> tags ({len(h1_tags)}): {h1_texts[:2]}"))
        else:
            h1_text = h1_texts[0]
            if not h1_text:
                heading_hierarchy_issues.append((rel_path, "Empty <h1> tag"))
                audit["h1_status"] = "EMPTY"
            all_h1s.setdefault(h1_text, []).append(rel_path)

        # 6. Images
        imgs = soup.find_all("img")
        for idx, img in enumerate(imgs):
            src = img.get("src", "").strip()
            alt = img.get("alt")
            width = img.get("width")
            height = img.get("height")
            loading = img.get("loading", "").lower()
            fetchpriority = img.get("fetchpriority", "").lower()

            # Alt attribute check
            if alt is None:
                audit["missing_alt_count"] += 1
                missing_alt_images.append((rel_path, src, "Attribute missing"))
            elif alt.strip() == "":
                # Check if it has role='presentation' or aria-hidden='true'
                if img.get("role") != "presentation" and img.get("aria-hidden") != "true":
                    audit["missing_alt_count"] += 1
                    missing_alt_images.append((rel_path, src, "Empty alt without decorative role"))

            # Dimensions check
            if not width or not height:
                # SVGs or inline logos sometimes omit, but standard images need width & height
                audit["missing_dim_count"] += 1
                missing_dim_images.append((rel_path, src))

            # Hero image lazy loading check (genuine hero/banner container)
            is_hero = any("hero" in cls.lower() for cls in (img.get("class") or [])) or any("hero" in " ".join(p.get("class", [])).lower() for p in img.parents if p.get("class")) or any("banner" in cls.lower() for cls in (img.get("class") or []))
            if is_hero and loading == "lazy":
                audit["lazy_hero_count"] += 1
                lazy_hero_images.append((rel_path, src))

            # Internal Image file resolution
            if src and not src.startswith("data:") and not src.startswith("http://") and not src.startswith("https://"):
                clean_src = src.split("?")[0].split("#")[0]
                if clean_src.startswith("/"):
                    target_file = os.path.join(SITE_DIR, clean_src.lstrip("/"))
                else:
                    curr_dir = os.path.dirname(full_path)
                    target_file = os.path.join(curr_dir, clean_src)
                
                if not os.path.exists(target_file):
                    broken_images.append((rel_path, src, target_file))

        # 7. Internal Links & Broken Links / Redirect Chains
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if not href or href.startswith("#") or href.startswith("tel:") or href.startswith("mailto:") or href.startswith("javascript:"):
                continue
            
            # Internal link check
            if href.startswith("/") or href.startswith("https://gpspl.co.in") or not href.startswith("http"):
                parsed = urlparse(href)
                path = parsed.path
                if not path:
                    continue

                # Check if pointing to .html (which requires a 301 redirect in Netlify)
                if path.endswith(".html"):
                    redirect_chain_links.append((rel_path, href, "Points to .html instead of clean canonical URL"))

                # Check if internal link target exists
                # Check root relative or relative
                clean_path = path
                if clean_path.startswith("https://gpspl.co.in"):
                    clean_path = clean_path.replace("https://gpspl.co.in", "")
                
                # Check in clean_url_to_rel or direct file or rewrite_rules
                matched = False
                if clean_path in clean_url_to_rel or clean_path.rstrip("/") in clean_url_to_rel:
                    matched = True
                elif clean_path in rewrite_rules or (clean_path + ".html") in rewrite_rules:
                    matched = True
                else:
                    # check direct filesystem
                    test_fs = os.path.join(SITE_DIR, clean_path.lstrip("/").replace("/", os.sep))
                    if os.path.exists(test_fs) or os.path.exists(test_fs + ".html"):
                        matched = True

                if not matched and not clean_path.startswith("/tmp"):
                    # Check if it's an asset or static file
                    test_asset = os.path.join(SITE_DIR, clean_path.lstrip("/").replace("/", os.sep))
                    if not os.path.exists(test_asset):
                        broken_links.append((rel_path, href, clean_path))

        # 8. Social Metadata (Open Graph & Twitter)
        og_title = soup.find("meta", property="og:title")
        og_desc = soup.find("meta", property="og:description")
        og_img = soup.find("meta", property="og:image")
        og_url = soup.find("meta", property="og:url")
        tw_card = soup.find("meta", attrs={"name": "twitter:card"})

        missing_og = []
        if not og_title: missing_og.append("og:title")
        if not og_desc: missing_og.append("og:description")
        if not og_img: missing_og.append("og:image")
        if not og_url: missing_og.append("og:url")
        if not tw_card: missing_og.append("twitter:card")
        if missing_og:
            og_issues.append((rel_path, f"Missing tags: {', '.join(missing_og)}"))

        # 9. Schema Markup
        ld_scripts = soup.find_all("script", attrs={"type": "application/ld+json"})
        if not ld_scripts:
            schema_issues.append((rel_path, "No JSON-LD schema found"))
        else:
            for s in ld_scripts:
                try:
                    s_data = json.loads(s.string)
                    if isinstance(s_data, dict):
                        audit["schema_types"].append(s_data.get("@type", "Unknown"))
                    elif isinstance(s_data, list):
                        for item in s_data:
                            if isinstance(item, dict):
                                audit["schema_types"].append(item.get("@type", "Unknown"))
                except Exception as e:
                    audit["schema_valid"] = False
                    schema_issues.append((rel_path, f"Invalid JSON-LD syntax: {e}"))

        page_audits[rel_path] = audit

    # Duplicate checks
    dup_titles = {t: paths for t, paths in all_titles.items() if len(paths) > 1}
    dup_descs = {d: paths for d, paths in all_descs.items() if len(paths) > 1}
    dup_h1s = {h: paths for h, paths in all_h1s.items() if len(paths) > 1}

    # Print Full Screaming Frog Audit Report
    print("=" * 80)
    print("       SCREAMING FROG COMPREHENSIVE TECHNICAL SEO AUDIT RESULTS")
    print("=" * 80)
    print(f"Total Public Pages Crawled : {len(pages)}")
    print(f"Broken Internal Links (4xx): {len(broken_links)}")
    print(f"Broken Internal Images     : {len(broken_images)}")
    print(f"Links to .html (301 hops)  : {len(redirect_chain_links)}")
    print(f"Canonical Tag Issues       : {len(canonical_issues)}")
    print(f"Robots Directive Issues    : {len(robots_issues)}")
    print(f"Title Issues (<30 or >65)  : {len(title_issues)}")
    print(f"Duplicate Titles Across Site: {len(dup_titles)} groups ({sum(len(v) for v in dup_titles.values())} pages)")
    print(f"Meta Description Issues    : {len(desc_issues)}")
    print(f"Duplicate Meta Descriptions : {len(dup_descs)} groups ({sum(len(v) for v in dup_descs.values())} pages)")
    print(f"Heading H1 Hierarchy Issues: {len(heading_hierarchy_issues)}")
    print(f"Duplicate H1 Across Pages  : {len(dup_h1s)} groups")
    print(f"Images Missing ALT Text    : {len(missing_alt_images)}")
    print(f"Images Missing Width/Height: {len(missing_dim_images)}")
    print(f"Hero Images Lazy-Loaded    : {len(lazy_hero_images)}")
    print(f"Open Graph / Twitter Issues: {len(og_issues)}")
    print(f"Schema (JSON-LD) Issues    : {len(schema_issues)}")
    print("=" * 80)

    # Save detailed JSON output for programmatic remediation
    report = {
        "summary": {
            "total_pages": len(pages),
            "broken_links_count": len(broken_links),
            "broken_images_count": len(broken_images),
            "redirect_links_count": len(redirect_chain_links),
            "canonical_issues_count": len(canonical_issues),
            "robots_issues_count": len(robots_issues),
            "title_issues_count": len(title_issues),
            "duplicate_titles_count": len(dup_titles),
            "desc_issues_count": len(desc_issues),
            "duplicate_descs_count": len(dup_descs),
            "heading_issues_count": len(heading_hierarchy_issues),
            "duplicate_h1_count": len(dup_h1s),
            "missing_alt_count": len(missing_alt_images),
            "missing_dim_count": len(missing_dim_images),
            "lazy_hero_count": len(lazy_hero_images),
            "og_issues_count": len(og_issues),
            "schema_issues_count": len(schema_issues),
        },
        "broken_links": broken_links,
        "broken_images": broken_images,
        "redirect_chain_links": redirect_chain_links,
        "canonical_issues": canonical_issues,
        "robots_issues": robots_issues,
        "title_issues": title_issues,
        "duplicate_titles": dup_titles,
        "desc_issues": desc_issues,
        "duplicate_descriptions": dup_descs,
        "heading_issues": heading_hierarchy_issues,
        "duplicate_h1s": dup_h1s,
        "missing_alt_images": missing_alt_images,
        "missing_dim_images": missing_dim_images,
        "lazy_hero_images": lazy_hero_images,
        "og_issues": og_issues,
        "schema_issues": schema_issues,
        "pages": page_audits
    }

    out_file = os.path.join(SITE_DIR, "tools", "screaming_frog_report.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"Full audit report saved to: {out_file}\n")

if __name__ == "__main__":
    run_audit()
