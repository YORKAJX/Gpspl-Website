import os

SITE_DIR = os.path.abspath(r"c:\shared folder\Gpspl-Website")

def fix_schemas():
    # 1. 404.html
    f_404 = os.path.join(SITE_DIR, "404.html")
    with open(f_404, "r", encoding="utf-8") as f:
        c_404 = f.read()

    schema_404 = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Page Not Found (404) | GPSPL",
      "description": "The requested page could not be found on Global Peripheral Solutions Pvt. Ltd. (GPSPL).",
      "url": "https://gpspl.co.in/404"
    }
    </script>
"""
    if "application/ld+json" not in c_404:
        c_404 = c_404.replace("</head>", schema_404 + "</head>")
        with open(f_404, "w", encoding="utf-8") as f:
            f.write(c_404)
        print("Injected schema into 404.html")

    # 2. thank-you.html
    f_ty = os.path.join(SITE_DIR, "thank-you.html")
    with open(f_ty, "r", encoding="utf-8") as f:
        c_ty = f.read()

    schema_ty = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Thank You for Contacting Us | GPSPL Corporate Desk",
      "description": "Thank you for contacting Global Peripheral Solutions Pvt. Ltd. (GPSPL). Our AV & IT solutions team will review your enquiry shortly.",
      "url": "https://gpspl.co.in/thank-you"
    }
    </script>
"""
    if "application/ld+json" not in c_ty:
        c_ty = c_ty.replace("</head>", schema_ty + "</head>")
        with open(f_ty, "w", encoding="utf-8") as f:
            f.write(c_ty)
        print("Injected schema into thank-you.html")

    # 3. brand-detail.html
    f_bd = os.path.join(SITE_DIR, "brand-detail.html")
    with open(f_bd, "r", encoding="utf-8") as f:
        c_bd = f.read()

    schema_bd = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": "Brand Detail | GPSPL Technology Distribution & Integration",
      "description": "Authorized OEM brand technology distribution, corporate wholesale pricing, system integration, and warranty support from GPSPL India.",
      "url": "https://gpspl.co.in/brand-detail",
      "provider": {
        "@type": "Organization",
        "name": "Global Peripheral Solutions Pvt. Ltd.",
        "url": "https://gpspl.co.in",
        "logo": "https://gpspl.co.in/assests/images/gpspl.png"
      }
    }
    </script>
"""
    if "application/ld+json" not in c_bd:
        c_bd = c_bd.replace("</head>", schema_bd + "</head>")
        with open(f_bd, "w", encoding="utf-8") as f:
            f.write(c_bd)
        print("Injected schema into brand-detail.html")

if __name__ == "__main__":
    fix_schemas()
