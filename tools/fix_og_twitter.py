import os
from bs4 import BeautifulSoup

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")

IMAGE_MAP = {
    "av-project-discovery-consultation.html": "https://gpspl.co.in/assests/images/hero/Vconf.webp",
    "blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide.html": "https://gpspl.co.in/assests/images/projects/gpspl-real/real-healthcare-medical-cart-display.png",
    "blog/mandir-temple-sound-system-acoustic-tuning-led-wall-guide.html": "https://gpspl.co.in/assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg",
    "digital-standee-supplier-india.html": "https://gpspl.co.in/assests/images/hero/signage.jpeg",
    "newsroom-broadcast-av-solutions.html": "https://gpspl.co.in/assests/images/projects/gpspl-real/media-house-curved-active-led-newsroom.jpg",
    "ptz-camera-solutions.html": "https://gpspl.co.in/assests/images/hero/Vconf.webp",
    "religious-place-av-solutions.html": "https://gpspl.co.in/assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg"
}

PAGES_TO_FIX = [
    "active-led-wall-supplier-noida.html",
    "audio-visual-integration.html",
    "auditorium-av-solutions.html",
    "av-project-discovery-consultation.html",
    "av-system-integrator-bangalore.html",
    "av-system-integrator-gurgaon.html",
    "av-system-integrator-hyderabad.html",
    "av-system-integrator-mumbai.html",
    "blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide.html",
    "blog/mandir-temple-sound-system-acoustic-tuning-led-wall-guide.html",
    "blog/podcast-recording-broadcast-studio-setup-cost-india.html",
    "command-control-center-av-solutions.html",
    "conference-room-solutions.html",
    "digital-standee-supplier-india.html",
    "experience-center-av-solutions.html",
    "newsroom-broadcast-av-solutions.html",
    "ptz-camera-solutions.html",
    "religious-place-av-solutions.html"
]

def fix_og_twitter():
    for rel in PAGES_TO_FIX:
        full_path = os.path.join(SITE_DIR, rel.replace("/", os.sep))
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        tags_to_insert = []
        if 'name="twitter:card"' not in content and "name='twitter:card'" not in content:
            tags_to_insert.append('    <meta name="twitter:card" content="summary_large_image">')

        if rel in IMAGE_MAP:
            img_url = IMAGE_MAP[rel]
            if 'property="og:image"' not in content:
                tags_to_insert.append(f'    <meta property="og:image" content="{img_url}">')
            if 'name="twitter:image"' not in content:
                tags_to_insert.append(f'    <meta name="twitter:image" content="{img_url}">')

        if tags_to_insert:
            insertion = "\n".join(tags_to_insert) + "\n"
            # Insert right after <head> or before </head>
            if "</head>" in content:
                content = content.replace("</head>", insertion + "</head>", 1)
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Fixed OG/Twitter metadata in: {rel}")

if __name__ == "__main__":
    fix_og_twitter()
