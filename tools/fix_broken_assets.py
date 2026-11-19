import os

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")

def fix_broken_assets():
    # 1. amc-maintenance-services.html
    amc_file = os.path.join(SITE_DIR, "amc-maintenance-services.html")
    with open(amc_file, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(
        '/assests/images/projects/gpspl-real/polished/corporate-boardroom-active-led.webp',
        '/assests/images/projects/gpspl-real/polished/corporate-boardroom-display.webp'
    )
    content = content.replace(
        '/assests/images/projects/gpspl-real/polished/command-control-video-wall-center.webp',
        '/assests/images/hero/video-wall-command-center.webp'
    )
    content = content.replace(
        '/assests/images/projects/gpspl-real/polished/sanskriti-university-hall.webp',
        '/assests/images/projects/gpspl-real/polished/real-education-lecture-hall.jpg'
    )
    with open(amc_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed amc-maintenance-services.html broken image paths.")

    # 2. interactive-display-solutions.html
    ifp_file = os.path.join(SITE_DIR, "interactive-display-solutions.html")
    with open(ifp_file, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(
        '/assests/images/projects/gpspl-real/polished/sanskriti-university-hall.webp',
        '/assests/images/projects/gpspl-real/polished/real-education-lecture-hall.jpg'
    )
    with open(ifp_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed interactive-display-solutions.html broken image paths.")

    # 3. smart-classroom-solutions.html
    sc_file = os.path.join(SITE_DIR, "smart-classroom-solutions.html")
    with open(sc_file, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(
        '/assests/images/projects/gpspl-real/polished/sanskriti-university-hall.webp',
        '/assests/images/projects/gpspl-real/polished/real-education-lecture-hall.jpg'
    )
    with open(sc_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed smart-classroom-solutions.html broken image paths.")

    # 4. conference-room-solutions.html links to .html
    cr_file = os.path.join(SITE_DIR, "conference-room-solutions.html")
    with open(cr_file, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace('href="index.html"', 'href="/"')
    content = content.replace('href="index.html#solutions"', 'href="/#solutions"')
    with open(cr_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed conference-room-solutions.html links to clean URLs.")

    # 5. index.html links to .html
    index_file = os.path.join(SITE_DIR, "index.html")
    with open(index_file, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace('href="conference-room-solutions.html"', 'href="/conference-room-solutions"')
    content = content.replace('href="smart-classroom-solutions.html"', 'href="/smart-classroom-solutions"')
    content = content.replace('href="blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide.html"', 'href="/blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide"')
    content = content.replace('href="hotel-hospitality-av-solutions.html"', 'href="/hotel-hospitality-av-solutions"')
    content = content.replace('href="auditorium-av-solutions.html"', 'href="/auditorium-av-solutions"')
    content = content.replace('href="command-control-center-av-solutions.html"', 'href="/command-control-center-av-solutions"')
    content = content.replace('href="industries.html#industry-fitness-gym"', 'href="/industries#industry-fitness-gym"')
    with open(index_file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed index.html links to clean URLs.")

if __name__ == "__main__":
    fix_broken_assets()
