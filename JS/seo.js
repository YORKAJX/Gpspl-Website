(function () {
    "use strict";

    const BASE_URL = "https://gpspl.co.in";
    const SITE_NAME = "Global Peripheral Solution Pvt. Ltd.";
    const LOGO_URL = `${BASE_URL}/assests/images/gpspl.png`;
    const DEFAULT_IMAGE = `${BASE_URL}/assests/images/hero/Vconf.webp`;
    const PHONE = "+91 93100 92963";
    const EMAIL = "support@gpspl.co.in";

    const sameAs = [
        "https://www.instagram.com/gpspl_official/",
        "https://www.linkedin.com/company/global-peripheral-solution-pvt-ltd/",
        "https://www.facebook.com/people/Global-Peripheral-Solution-Pvt-Ltd/61556122034787/",
        "https://www.youtube.com/@GPSPL1997"
    ];

    const pageSeo = {
        "index.html": {
            title: "GPSPL | AV Solutions Distributor & System Integrator Since 1997",
            description: "Global Peripheral Solution Pvt. Ltd. (GPSPL), established in 1997, supplies and integrates AV, display, audio, collaboration, IT infrastructure, automation and AMC support solutions across India.",
            type: "home",
            image: "/assests/images/hero/image.jpg"
        },
        "about-gpspl.html": {
            title: "About GPSPL | AV Distributor & System Integrator in India",
            description: "Learn about GPSPL, a Delhi based AV and IT technology distribution and system integration company established in 1997, serving enterprise, education, government, hospitality and healthcare clients.",
            type: "about"
        },
        "our-vision.html": {
            title: "Our Vision | Technology Driven AV & IT Solutions | GPSPL",
            description: "GPSPL's vision focuses on innovation, excellence, customer satisfaction, long-term partnerships, sustainable growth and technology-driven AV and IT solutions.",
            type: "about"
        },
        "directors-message.html": {
            title: "Director's Message | Mr. Sanjay Khurana | GPSPL",
            description: "Message from Mr. Sanjay Khurana, Founder and Director of GPSPL, on quality, reliability, long-term partnerships and technology-led growth.",
            type: "about",
            image: "/assests/images/about/sanjay-khurana-director-portrait.png"
        },
        "milestones.html": {
            title: "Milestones, Awards & Authorized Partnerships | GPSPL",
            description: "Explore GPSPL milestones, awards, authorized regional distributor recognitions and technology partnership achievements since 1997.",
            type: "about",
            image: "/assests/images/milestones/lg-regional-distributor-2022.jpeg"
        },
        "audio-visual-integration.html": {
            title: "Audio Visual Integration Company in Delhi NCR | GPSPL",
            description: "GPSPL supplies, designs, integrates, commissions and supports enterprise AV systems, meeting rooms, boardrooms, displays, audio, control systems, AMC and service support across India.",
            type: "service",
            serviceType: "Audio visual integration and enterprise AV system integration",
            image: "/assests/images/vision/conference-room-hero.jpg"
        },
        "conference-room-solutions.html": {
            title: "Conference Room & Boardroom AV Solutions | GPSPL",
            description: "Conference room setup, boardroom AV integration, video conferencing, microphones, PTZ cameras, displays, touch control and collaboration systems by GPSPL.",
            type: "service",
            serviceType: "Conference room and boardroom AV solutions",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "unified-communication-collaboration.html": {
            title: "Video Conferencing & Unified Communication Solutions | GPSPL",
            description: "GPSPL supplies and integrates video conferencing, unified communication, collaboration displays, microphones, cameras and meeting-room systems for hybrid workplaces.",
            type: "service",
            serviceType: "Unified communication and collaboration systems",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "video-wall-solutions.html": {
            title: "Video Wall Solutions for Control Rooms & Enterprises | GPSPL",
            description: "GPSPL supplies, installs and supports video wall systems, display controllers, commercial displays, calibration, mounting and control-room visualization solutions.",
            type: "service",
            serviceType: "Video wall solutions and display systems",
            image: "/assests/images/hero/video-wall-command-center.webp"
        },
        "active-led-wall-solutions.html": {
            title: "Active LED Wall Solutions, Installation & AMC | GPSPL",
            description: "Active LED wall supply, installation, calibration, mounting, controllers, indoor and outdoor LED display systems and AMC support from GPSPL.",
            type: "service",
            serviceType: "Active LED wall solutions and installation",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "active-led-wall-installation.html": {
            title: "Active LED Installation, Calibration & AMC | GPSPL",
            description: "GPSPL provides active LED wall installation, structure coordination, pixel pitch planning, calibration, commissioning, AMC and after-sales support.",
            type: "service",
            serviceType: "Active LED wall installation and commissioning",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "active-led-video-wall.html": {
            title: "Active LED Video Wall Systems | GPSPL",
            description: "Active LED video wall systems for corporate spaces, command centers, auditoriums, retail, education and public display environments.",
            type: "service",
            serviceType: "Active LED video wall systems",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "digital-signage-solutions.html": {
            title: "Digital Signage & Commercial Display Solutions | GPSPL",
            description: "Digital signage, LG commercial display, Samsung professional display, LFD screens, hotel TVs, content display and enterprise signage solutions supplied and supported by GPSPL.",
            type: "service",
            serviceType: "Digital signage and commercial display solutions",
            image: "/assests/images/products/digital-signage-solutions.webp"
        },
        "interactive-display-solutions.html": {
            title: "Interactive Flat Panel & Smart Board Solutions | GPSPL",
            description: "Interactive flat panels, smart boards, classroom displays, touch screens and digital learning solutions for education and enterprise environments.",
            type: "service",
            serviceType: "Interactive display and smart board solutions",
            image: "/assests/images/products/interactive-display-solutions.webp"
        },
        "smart-classroom-solutions.html": {
            title: "Smart Classroom Solutions & Interactive Learning | GPSPL",
            description: "Smart classroom solutions with interactive panels, cameras, microphones, lecture capture, display systems and AV integration for education institutions.",
            type: "service",
            serviceType: "Smart classroom and interactive learning solutions",
            image: "/assests/images/hero/smart-classroom-solutions.webp"
        },
        "professional-audio-solutions.html": {
            title: "Professional Audio Systems, JBL, Harman & Microphones | GPSPL",
            description: "Professional audio systems, JBL and Harman AV, BSS audio, Crown amplifiers, microphones, DSP, auditorium audio and meeting-room sound solutions by GPSPL.",
            type: "service",
            serviceType: "Professional audio systems and AV sound solutions",
            image: "/assests/images/products/professional-audio-solutions.webp"
        },
        "audio-technologies.html": {
            title: "Audio Technologies for Meeting Rooms & Auditoriums | GPSPL",
            description: "Audio technologies including Harman, JBL, Sennheiser, microphones, DSP, speakers, room audio, auditorium audio and AV-board sound systems supplied and integrated by GPSPL.",
            type: "service",
            serviceType: "Audio technologies and professional sound systems",
            image: "/assests/images/products/professional-audio-solutions.webp"
        },
        "video-technologies.html": {
            title: "Video Technologies, PTZ Cameras & Display Systems | GPSPL",
            description: "PTZ cameras, video conferencing cameras, lecture capture, projectors, signage, displays, active LED and video wall systems supplied, integrated and supported by GPSPL.",
            type: "service",
            serviceType: "Video technologies and visual communication systems",
            image: "/assests/images/hero/video-technologies-boardroom.webp"
        },
        "control-automation.html": {
            title: "Control Systems, AMX Automation, Crestron & AV Switching | GPSPL",
            description: "Control systems, AMX automation, Crestron, AV switching, KVM, source routing, touch panels and room automation solutions supplied and integrated by GPSPL.",
            type: "service",
            serviceType: "Control systems and AV automation",
            image: "/assests/images/hero/av.webp"
        },
        "kvm-av-switching-solutions.html": {
            title: "KVM & AV Switching Solutions | ATEN Systems | GPSPL",
            description: "KVM switching, AV routing, source selection, signal extension and ATEN AV switching solutions for command rooms, meeting rooms and enterprise environments.",
            type: "service",
            serviceType: "KVM and AV switching solutions"
        },
        "it-infrastructure-solutions.html": {
            title: "IT Infrastructure, Networking, Servers & UPS Solutions | GPSPL",
            description: "IT infrastructure solutions including servers, storage, networking, rack cabinets, UPS systems, security systems and AV readiness support by GPSPL.",
            type: "service",
            serviceType: "IT infrastructure and networking solutions"
        },
        "ups-power-backup-solutions.html": {
            title: "UPS & Power Backup Solutions | Luminous Authorized Distributor | GPSPL",
            description: "UPS, batteries, inverter backup, online UPS, offline UPS and power protection solutions for AV rooms, IT rooms and enterprise spaces by GPSPL.",
            type: "service",
            serviceType: "UPS and power backup solutions"
        },
        "peripheral-solutions.html": {
            title: "Wacom, Creative Displays & IT Peripheral Solutions | GPSPL",
            description: "Wacom Cintiq, DTH, DTC, creative pen displays, workstation accessories, IT peripherals, RAM, SSD, printers and business computing support by GPSPL.",
            type: "service",
            serviceType: "Creative display and peripheral solutions"
        },
        "projector-accessories.html": {
            title: "Projectors, Screens, Mounts & Accessories | GPSPL",
            description: "Business projectors, Epson projectors, presentation systems, screens, mounts, HDMI accessories, cables and installation support from GPSPL.",
            type: "service",
            serviceType: "Projectors and presentation accessories"
        },
        "amc-maintenance-services.html": {
            title: "AMC, Maintenance & Warranty Support for AV and IT | GPSPL",
            description: "Annual maintenance contracts, preventive maintenance, warranty coordination, installation support and after-sales service for AV, IT, display, LED and automation systems.",
            type: "service",
            serviceType: "AMC maintenance and lifecycle support"
        },
        "product-catalog.html": {
            title: "Product Catalog | AV, Display, IT & UPS Products | GPSPL",
            description: "GPSPL product categories covering AV integration, active LED walls, commercial displays, projectors, professional audio, IT peripherals, UPS and AMC support.",
            type: "catalog"
        },
        "technology-partners.html": {
            title: "Technology Partners & Authorized Distributor Ecosystem | GPSPL",
            description: "GPSPL works with technology brands including LG, Harman, JBL, Samsung, Sony, HP Poly, Wacom, Lumens, Crestron, AMX, ATEN, Epson and Luminous for enterprise projects.",
            type: "partners"
        },
        "brand-detail.html": {
            title: "Brand Detail | GPSPL Technology Distribution & Integration",
            description: "Brand-specific technology supply, pricing, integration, warranty coordination, installation and support from GPSPL.",
            type: "product"
        },
        "industries.html": {
            title: "Industries Served | AV, IT & Display Solutions by GPSPL",
            description: "GPSPL serves corporate, education, hospitality, government, healthcare, retail, real estate, banking, media and automotive environments with AV, IT and display solutions.",
            type: "webpage"
        },
        "projects.html": {
            title: "Technology Projects | AV, IT, Display & Support | GPSPL",
            description: "Explore GPSPL project capabilities across collaboration spaces, smart classrooms, displays, control rooms, public-sector environments and enterprise technology deployments.",
            type: "webpage"
        },
        "featured-projects.html": {
            title: "Featured AV & IT Projects | GPSPL",
            description: "Featured GPSPL projects for AV integration, smart classrooms, active LED walls, video conferencing, commercial displays and enterprise technology environments.",
            type: "webpage"
        },
        "corporate-projects.html": {
            title: "Corporate AV Projects & Boardroom Solutions | GPSPL",
            description: "Corporate AV projects, boardrooms, meeting rooms, displays, conferencing, automation and enterprise collaboration deployments by GPSPL.",
            type: "webpage"
        },
        "education-projects.html": {
            title: "Education Technology Projects & Smart Classrooms | GPSPL",
            description: "Education projects including smart classrooms, interactive displays, lecture capture, projectors, cameras, audio and hybrid learning systems.",
            type: "webpage"
        },
        "government-projects.html": {
            title: "Government AV, Control Room & Display Projects | GPSPL",
            description: "Government and public-sector technology projects with AV integration, command centers, displays, video walls, IT readiness and long-term support.",
            type: "webpage"
        },
        "healthcare-projects.html": {
            title: "Healthcare AV, Display & IT Projects | GPSPL",
            description: "Healthcare technology projects including display systems, conferencing, audio, training rooms, IT infrastructure and support for connected care environments.",
            type: "webpage"
        },
        "case-studies.html": {
            title: "Case Studies | AV & IT Project Outcomes | GPSPL",
            description: "GPSPL case studies showing requirements, solution planning, technology used and support outcomes for AV, display, IT and automation projects.",
            type: "webpage"
        },
        "downloads.html": {
            title: "Downloads, Brochures & RFQ Planning Material | GPSPL",
            description: "Download GPSPL company profile, planning checklists, service guides and RFQ resources for AV, LED wall, display, IT and AMC requirements.",
            type: "webpage"
        },
        "faq.html": {
            title: "FAQ | GPSPL AV, IT, Display & Support Questions",
            description: "Frequently asked questions about GPSPL technology supply, AV integration, project delivery, warranty support, AMC and enterprise deployments.",
            type: "faq"
        },
        "contact.html": {
            title: "Contact GPSPL | AV, IT, Display & Automation Enquiry",
            description: "Contact GPSPL for AV integration, conference room setup, active LED walls, digital signage, IT infrastructure, professional audio, UPS and AMC support.",
            type: "contact"
        },
        "team.html": {
            title: "GPSPL Team | Leadership, Engineering & Support",
            description: "GPSPL team structure across leadership, technology consultation, AV engineering, project delivery, operations and support.",
            type: "about"
        },
        "careers.html": {
            title: "Careers at GPSPL | AV, IT & Technology Roles",
            description: "Career areas at GPSPL across technology sales, AV engineering, project coordination, service support and operations.",
            type: "webpage"
        },
        "privacy-policy.html": {
            title: "Privacy Policy | GPSPL",
            description: "Privacy policy for GPSPL website visitors, enquiry forms, business communications and data handling.",
            type: "webpage",
            noindex: false
        },
        "terms-disclaimer.html": {
            title: "Terms & Disclaimer | GPSPL",
            description: "Terms, disclaimers and website usage information for Global Peripheral Solution Pvt. Ltd.",
            type: "webpage",
            noindex: false
        },
        "404.html": {
            title: "Page Not Found | GPSPL",
            description: "The requested GPSPL website page could not be found.",
            type: "webpage",
            noindex: true
        },
        "thank-you.html": {
            title: "Thank You | GPSPL",
            description: "Thank you for contacting GPSPL. Our team will review your enquiry.",
            type: "webpage",
            noindex: true
        }
    };

    const productPages = new Set([
        "product-catalog.html",
        "brand-detail.html",
        "technology-partners.html",
        "interactive-display-solutions.html",
        "professional-audio-solutions.html",
        "active-led-video-wall.html",
        "active-led-wall-solutions.html",
        "digital-signage-solutions.html",
        "projector-accessories.html",
        "it-infrastructure-solutions.html",
        "ups-power-backup-solutions.html",
        "peripheral-solutions.html"
    ]);

    function currentPageKey() {
        const page = window.location.pathname.split("/").pop();
        return page || "index.html";
    }

    function absoluteUrl(path) {
        if (!path) return DEFAULT_IMAGE;
        if (/^https?:\/\//i.test(path)) return path;
        return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    }

    function pageUrl(key) {
        return key === "index.html" ? `${BASE_URL}/` : `${BASE_URL}/${key}`;
    }

    function ensureMeta(selector, createAttrs, valueAttr, value) {
        let node = document.head.querySelector(selector);
        if (!node) {
            node = document.createElement("meta");
            Object.entries(createAttrs).forEach(([key, attrValue]) => node.setAttribute(key, attrValue));
            document.head.appendChild(node);
        }
        node.setAttribute(valueAttr, value);
    }

    function ensureLink(rel, href) {
        let node = document.head.querySelector(`link[rel="${rel}"]`);
        if (!node) {
            node = document.createElement("link");
            node.setAttribute("rel", rel);
            document.head.appendChild(node);
        }
        node.setAttribute("href", href);
    }

    function textFromSelector(selector) {
        const node = document.querySelector(selector);
        return node ? node.textContent.replace(/\s+/g, " ").trim() : "";
    }

    function buildBreadcrumb(key, cfg) {
        const items = [{ name: "Home", url: `${BASE_URL}/` }];
        const servicePages = cfg.type === "service";

        if (servicePages) items.push({ name: "Solutions", url: `${BASE_URL}/product-catalog.html` });
        if (cfg.type === "partners" || cfg.type === "product") items.push({ name: "Partners", url: `${BASE_URL}/technology-partners.html` });
        if (["about-gpspl.html", "our-vision.html", "directors-message.html", "milestones.html", "team.html"].includes(key)) {
            items.push({ name: "About Us", url: `${BASE_URL}/about-gpspl.html` });
        }
        if (["projects.html", "featured-projects.html", "corporate-projects.html", "education-projects.html", "government-projects.html", "healthcare-projects.html", "case-studies.html"].includes(key)) {
            items.push({ name: "Work", url: `${BASE_URL}/projects.html` });
        }

        if (key !== "index.html") {
            items.push({ name: document.title.replace(/\s*\|\s*GPSPL.*$/i, ""), url: pageUrl(key) });
        }

        return {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl(key)}#breadcrumb`,
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
    }

    function organizationSchema() {
        return {
            "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
            "@id": `${BASE_URL}/#organization`,
            "name": SITE_NAME,
            "alternateName": ["GPSPL", "Global Peripheral Solutions", "GPSPL India", "GPSPL Delhi"],
            "url": `${BASE_URL}/`,
            "logo": {
                "@type": "ImageObject",
                "url": LOGO_URL
            },
            "image": DEFAULT_IMAGE,
            "foundingDate": "1997",
            "telephone": PHONE,
            "email": EMAIL,
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "304, Padma Palace, 86, Nehru Place",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110019",
                "addressCountry": "IN"
            },
            "areaServed": [
                { "@type": "Country", "name": "India" },
                { "@type": "AdministrativeArea", "name": "Delhi NCR" }
            ],
            "knowsAbout": [
                "Audio visual integration",
                "AV system integration",
                "Conference room automation",
                "Boardroom solutions",
                "Digital signage",
                "Active LED video wall",
                "Interactive flat panel",
                "Video conferencing solutions",
                "Professional audio systems",
                "AMX automation",
                "LG commercial displays",
                "Samsung professional displays",
                "IT infrastructure",
                "AMC support"
            ],
            "sameAs": sameAs
        };
    }

    function websiteSchema() {
        return {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            "url": `${BASE_URL}/`,
            "name": "GPSPL",
            "alternateName": "Global Peripheral Solution Pvt. Ltd.",
            "publisher": { "@id": `${BASE_URL}/#organization` },
            "inLanguage": "en-IN"
        };
    }

    function serviceSchema(key, cfg, url) {
        return {
            "@type": "Service",
            "@id": `${url}#service`,
            "name": cfg.title.replace(/\s*\|\s*GPSPL.*$/i, ""),
            "description": cfg.description,
            "serviceType": cfg.serviceType || "AV and IT technology solutions",
            "provider": { "@id": `${BASE_URL}/#organization` },
            "areaServed": [
                { "@type": "Country", "name": "India" },
                { "@type": "City", "name": "New Delhi" },
                { "@type": "AdministrativeArea", "name": "Delhi NCR" }
            ],
            "offers": {
                "@type": "Offer",
                "url": url,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
            }
        };
    }

    function faqSchema(url) {
        return {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Does GPSPL provide both product supply and installation?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. GPSPL supplies technology products and also supports design, integration, installation, commissioning, warranty coordination, AMC and after-sales support."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where does GPSPL provide AV and IT solutions?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "GPSPL is based in New Delhi and supports AV, display, audio, collaboration, automation, IT infrastructure and AMC requirements across India."
                    }
                }
            ]
        };
    }

    function productSchema(cfg, url, image) {
        return {
            "@type": "Product",
            "@id": `${url}#product`,
            "name": cfg.title.replace(/\s*\|\s*GPSPL.*$/i, ""),
            "description": cfg.description,
            "image": image,
            "brand": {
                "@type": "Brand",
                "name": "GPSPL Technology Portfolio"
            },
            "offers": {
                "@type": "Offer",
                "url": url,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "seller": { "@id": `${BASE_URL}/#organization` }
            }
        };
    }

    function itemListSchema(url) {
        const brands = [
            "LG Business Solutions", "Harman Professional", "JBL Professional", "AMX", "Samsung", "Sony", "HP Poly", "Wacom",
            "Lumens", "Absen", "Sennheiser", "Crestron", "ATEN", "Epson", "BenQ", "Luminous"
        ];
        return {
            "@type": "ItemList",
            "@id": `${url}#brand-list`,
            "name": "GPSPL Technology Partner Portfolio",
            "itemListElement": brands.map((name, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": name
            }))
        };
    }

    function applySeo() {
        const key = currentPageKey();
        const existingTitle = document.title && document.title.trim();
        const existingDescription = document.head.querySelector('meta[name="description"]')?.getAttribute("content");
        const cfg = pageSeo[key] || {
            title: existingTitle || `${textFromSelector("h1") || "GPSPL"} | Global Peripheral Solution Pvt. Ltd.`,
            description: existingDescription || "GPSPL supplies, integrates and supports AV, display, audio, IT infrastructure, automation and collaboration technology solutions across India.",
            type: "webpage"
        };

        const title = cfg.title;
        const description = cfg.description;
        const url = pageUrl(key);
        const image = absoluteUrl(cfg.image || document.head.querySelector('meta[property="og:image"]')?.getAttribute("content") || DEFAULT_IMAGE);

        document.title = title;
        ensureMeta('meta[name="description"]', { name: "description" }, "content", description);
        ensureMeta('meta[name="robots"]', { name: "robots" }, "content", cfg.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
        ensureLink("canonical", url);

        ensureMeta('meta[property="og:type"]', { property: "og:type" }, "content", cfg.type === "article" ? "article" : "website");
        ensureMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "content", SITE_NAME);
        ensureMeta('meta[property="og:locale"]', { property: "og:locale" }, "content", "en_IN");
        ensureMeta('meta[property="og:title"]', { property: "og:title" }, "content", title);
        ensureMeta('meta[property="og:description"]', { property: "og:description" }, "content", description);
        ensureMeta('meta[property="og:url"]', { property: "og:url" }, "content", url);
        ensureMeta('meta[property="og:image"]', { property: "og:image" }, "content", image);

        ensureMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "content", "summary_large_image");
        ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" }, "content", title);
        ensureMeta('meta[name="twitter:description"]', { name: "twitter:description" }, "content", description);
        ensureMeta('meta[name="twitter:image"]', { name: "twitter:image" }, "content", image);

        const graph = [
            organizationSchema(),
            websiteSchema(),
            {
                "@type": cfg.type === "contact" ? "ContactPage" : cfg.type === "about" ? "AboutPage" : "WebPage",
                "@id": `${url}#webpage`,
                "url": url,
                "name": title,
                "description": description,
                "isPartOf": { "@id": `${BASE_URL}/#website` },
                "about": { "@id": `${BASE_URL}/#organization` },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": image
                },
                "inLanguage": "en-IN"
            },
            buildBreadcrumb(key, cfg)
        ];

        if (cfg.type === "service") {
            graph.push(serviceSchema(key, cfg, url), faqSchema(url));
        }

        if (cfg.type === "faq") {
            graph.push(faqSchema(url));
        }

        if (cfg.type === "partners" || cfg.type === "catalog") {
            graph.push(itemListSchema(url));
        }

        if (productPages.has(key)) {
            graph.push(productSchema(cfg, url, image));
        }

        let schema = document.getElementById("gpspl-seo-jsonld");
        if (!schema) {
            schema = document.createElement("script");
            schema.type = "application/ld+json";
            schema.id = "gpspl-seo-jsonld";
            document.head.appendChild(schema);
        }
        schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applySeo);
    } else {
        applySeo();
    }
})();
