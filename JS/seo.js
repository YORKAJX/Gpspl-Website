(function () {
    "use strict";

    const BASE_URL = "https://gpspl.co.in";
    const SITE_NAME = "Global Peripheral Solution Pvt. Ltd.";
    const LOGO_URL = `${BASE_URL}/assests/images/gpspl.png`;
    const DEFAULT_IMAGE = `${BASE_URL}/assests/images/hero/Vconf.webp`;
    const PHONE = "+91 93100 92963";
    const EMAIL = "support@gpspl.co.in";
    const runtimeConfig = window.GPSPL_CONFIG || {};

    const sameAs = [
        "https://www.instagram.com/gpspl_official/",
        "https://www.linkedin.com/company/global-peripheral-solution-pvt-ltd/",
        "https://www.facebook.com/people/Global-Peripheral-Solution-Pvt-Ltd/61556122034787/",
        "https://www.youtube.com/@GPSPL1997"
    ];

    const defaultKeywords = [
        "AV system integrator India",
        "audio visual integrator Delhi NCR",
        "technology distributor India",
        "conference room AV solutions",
        "video conferencing room setup",
        "active LED video wall supplier",
        "digital signage solutions India",
        "professional audio system integrator",
        "smart classroom solutions",
        "AV AMC support India",
        "enterprise AV solutions Delhi",
        "AV BOQ calculator India",
        "conference room BOQ estimate"
    ];

    const pageKeywordOverrides = {
        "index.html": [
            "AV BOQ calculator India",
            "conference room BOQ estimate",
            "AV cost calculator India",
            "boardroom AV estimate",
            "video conferencing room setup",
            "auditorium AV BOQ",
            "smart classroom AV solutions",
            "AV system integrator India",
            "audio visual integrator Delhi NCR",
            "GPSPL"
        ],
        "audio-visual-integration.html": ["AV system integrator Delhi NCR", "audio visual integration company India", "enterprise AV installation", "boardroom AV integrator", "AV AMC support"],
        "conference-room-solutions.html": ["conference room AV integrator Delhi NCR", "boardroom AV setup", "meeting room AV solutions", "video conferencing room setup", "Teams Zoom room setup", "conference room audio video", "wireless presentation system"],
        "unified-communication-collaboration.html": ["video conferencing solutions India", "unified communication integrator", "hybrid meeting room solutions", "PTZ camera meeting room", "collaboration room AV"],
        "video-wall-solutions.html": ["video wall supplier India", "video wall integrator Delhi", "control room video wall", "LCD video wall systems", "commercial display wall"],
        "active-led-wall-solutions.html": ["active LED wall supplier India", "active LED wall installer India", "LED video wall installation", "indoor LED wall Delhi NCR", "outdoor LED display supplier", "fine pitch LED wall", "LED wall AMC"],
        "digital-signage-solutions.html": ["digital signage solutions India", "digital signage display supplier", "menu board display", "commercial signage screen", "retail digital signage"],
        "interactive-display-solutions.html": ["interactive flat panel supplier", "smart board supplier India", "interactive display for classrooms", "MAXHUB Newline BenQ panels", "IFPD installation"],
        "smart-classroom-solutions.html": ["smart classroom solutions India", "interactive classroom setup", "interactive flat panel for classroom", "digital classroom AV integrator", "classroom projector audio system", "hybrid learning classroom setup", "lecture capture classroom", "education AV solutions"],
        "professional-audio-solutions.html": ["professional audio system integrator India", "auditorium sound system", "seminar hall audio system", "conference room audio", "DSP audio system design", "JBL professional audio", "Sennheiser microphones"],
        "audio-technologies.html": ["meeting room audio technology", "professional microphones speakers DSP", "audio system design India", "auditorium audio integration", "room audio tuning"],
        "video-technologies.html": ["PTZ camera supplier India", "video technology solutions", "lecture capture cameras", "video conferencing camera", "enterprise display systems"],
        "control-automation.html": ["AV control automation India", "AMX automation integrator", "Crestron control systems", "meeting room automation", "AV switching control"],
        "kvm-av-switching-solutions.html": ["ATEN KVM supplier India", "KVM switching solutions", "AV switching matrix", "control room KVM", "enterprise KVM extender"],
        "it-infrastructure-solutions.html": ["IT infrastructure solutions India", "server storage networking supplier", "enterprise IT hardware", "UPS and networking support", "IT AMC Delhi"],
        "ups-power-backup-solutions.html": ["UPS supplier India", "Luminous UPS solutions", "online UPS for AV IT", "power backup for conference room", "UPS AMC support"],
        "amc-maintenance-services.html": ["AV AMC services India", "AV maintenance support", "video wall AMC", "conference room AMC", "technical support 48 to 72 hours"],
        "av-system-integrator-gurgaon.html": ["AV system integrator Gurgaon", "Cyber City AV integrator", "boardroom setup Gurgaon", "Teams Rooms Gurugram", "Active LED wall Gurgaon", "Crestron automation Gurgaon"],
        "active-led-wall-supplier-noida.html": ["Active LED wall supplier Noida", "LED video wall Noida Sector 62", "fine pitch LED display Greater Noida", "NovaStar LED controller Noida", "outdoor LED wall Noida Expressway"],
        "industries.html": ["AV solutions for healthcare", "corporate boardroom AV integrator", "smart classroom university setup", "hospitality Active LED displays", "command center video wall", "retail digital signage India"],
        "samsung-business-tv-befx-h2.html": ["Samsung Business TV BEFX-H2", "Samsung Commercial TV India", "BE43FH", "BE50FH", "BE55FH", "BE65FH", "BE75FH", "BE85FH", "LH43BEFH8GULXL", "Samsung VXT CMS", "PlayLock PIN"],
        "samsung-commercial-display-qbc.html": ["Samsung QBC Series", "Samsung QB43C", "Samsung QB55C", "Samsung QB65C", "Samsung QB75C", "Samsung QB85C", "LH55QBCEBGCLXL", "Samsung digital signage India", "MagicINFO S10"],
        "samsung-commercial-display-qmc.html": ["Samsung QMC Series", "Samsung QM43C", "Samsung QM55C", "Samsung QM65C", "Samsung QM75C", "Samsung QM85C", "LH55QMCEBGCLXL", "24/7 commercial display India", "500 nits signage"],
        "lg-commercial-tv-nu88c.html": ["LG NU88C Series", "LG Commercial TV NanoCell", "alpha 7 AI Gen9", "LG Hotel Mode", "LG webOS 26"],
        "lg-commercial-tv-ua831c.html": ["LG UA831C Series", "LG Commercial TV 4K", "Super Upscaling", "LG Hotel TV"],
        "lg-createboard-tr3er.html": ["LG CreateBoard TR3ER", "LG interactive flat panel", "LG TR3ER smart board", "smart classroom panel"],
        "blog/samsung-business-tv-commercial-signage-guide.html": ["Samsung Business TV guide", "Samsung BEFX-H2", "Samsung QBC signage", "Samsung QMC 24/7", "LH55QBCEBGCLXL", "LH55QMCEBGCLXL", "commercial display Delhi NCR"],
        "contact.html": ["request AV quote", "AV system integrator contact Delhi", "GPSPL enquiry", "technology supply quote India", "conference room quote"]
    };

    const pageSeo = {
        "blog/samsung-business-tv-commercial-signage-guide.html": {
            title: "Samsung Business TV & Commercial Signage Guide: BEFX, QBC & QMC Series Compared (2026) | GPSPL",
            description: "Complete 2026 guide comparing Samsung Business TV BEFX-H2, Crystal UHD QBC, and 24/7 Heavy-Duty QMC displays with SKU codes, VXT CMS, and MagicINFO S10.",
            type: "article"
        },
        "samsung-business-tv-befx-h2.html": {
            title: "Samsung Business TV BEFX-H2 (43\" to 85\") 4K Commercial TV | GPSPL",
            description: "Samsung BEFX-H2 Series Commercial Business TV with 400 nits, 16/7 duty cycle, Samsung VXT Cloud CMS, PlayLock security, and Business TV App.",
            type: "product"
        },
        "samsung-commercial-display-qbc.html": {
            title: "Samsung QBC Series Crystal UHD Signage (43\" to 85\") | GPSPL",
            description: "Samsung QBC Series 4K UHD Commercial Displays with ultra-slim 28.5mm depth, 350 nits, Dynamic Crystal Color, Tizen 7.0, and MagicINFO S10.",
            type: "product"
        },
        "samsung-commercial-display-qmc.html": {
            title: "Samsung QMC Series 24/7 500-Nit Commercial Signage (43\" to 85\") | GPSPL",
            description: "Samsung QMC Series Heavy-Duty 24/7 Displays with 500 nits high brightness, 25% non-glare haze, DP 1.2, and SmartView+ wireless collaboration.",
            type: "product"
        },
        "index.html": {
            title: "AV System Integrator Delhi NCR & India | Audio Visual Solutions | GPSPL",
            description: "GPSPL is a premier AV system integrator in Delhi NCR & India since 1997. Turnkey audio visual solutions for boardrooms, active LED walls, auditoriums, smart classrooms & AMC support. Instant AV BOQ estimation.",
            type: "home",
            image: "/assests/images/hero/image.jpg"
        },
        "about-gpspl.html": {
            title: "About GPSPL | AV & IT Distributor in India",
            description: "Learn about GPSPL, a Delhi based AV and IT distribution and system integration company serving enterprise, education, government and hospitality clients.",
            type: "about"
        },
        "our-vision.html": {
            title: "Our Vision | Technology Driven AV & IT | GPSPL",
            description: "The GPSPL vision is to deliver dependable AV, IT, display and support solutions through innovation, trusted partnerships and long-term customer focus.",
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
            title: "AV System Integrator in Delhi NCR & India | GPSPL",
            description: "GPSPL is a professional audio visual solution company and corporate AV integrator in India for boardrooms, command centers, LED walls, and auditoriums.",
            type: "service",
            serviceType: "Audio visual integration and enterprise AV system integration",
            image: "/assests/images/vision/conference-room-hero.jpg"
        },
        "conference-room-solutions.html": {
            title: "Conference Room AV Setup & Boardroom Solutions | GPSPL",
            description: "GPSPL is a professional video conferencing solution provider and meeting room automation integrator for boardrooms, huddle rooms, and Teams/Zoom setup.",
            type: "service",
            serviceType: "Conference room and boardroom AV solutions",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "unified-communication-collaboration.html": {
            title: "Video Conferencing & UC Collaboration Systems | GPSPL",
            description: "GPSPL is a leading video conferencing solution provider and unified communication collaboration integrator for enterprise hybrid workspaces.",
            type: "service",
            serviceType: "Unified communication and collaboration systems",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "video-wall-solutions.html": {
            title: "Control Room Solutions & Video Wall Supplier India | GPSPL",
            description: "GPSPL designs and supplies control room solutions and multi-display LCD/LED video walls for command centers, lobbies, and mission-critical monitoring.",
            type: "service",
            serviceType: "Video wall solutions and display systems",
            image: "/assests/images/hero/video-wall-command-center.webp"
        },
        "active-led-wall-solutions.html": {
            title: "Active LED Wall Supplier & LED Video Wall Installation | GPSPL",
            description: "GPSPL is a leading active LED wall supplier and installer in India with pixel pitch planning, structure coordination, display calibration, and AMC support.",
            type: "service",
            serviceType: "Active LED wall solutions and installation",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "active-led-wall-installation.html": {
            title: "LED Video Wall Installer India | Calibration & AMC | GPSPL",
            description: "GPSPL is a leading LED video wall installer in India, offering structure coordination, pixel pitch planning, display calibration, and long-term AMC support.",
            type: "service",
            serviceType: "Active LED wall installation and commissioning",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "active-led-video-wall.html": {
            title: "Active LED Video Wall Systems Supplier | GPSPL",
            description: "Active LED video wall systems for corporate spaces, command centers, auditoriums, retail, education and public display environments.",
            type: "service",
            serviceType: "Active LED video wall systems",
            image: "/assests/images/products/active-led-video-wall.webp"
        },
        "digital-signage-solutions.html": {
            title: "Digital Signage Solutions & Commercial Display Systems | GPSPL",
            description: "GPSPL supplies, installs, and supports digital signage solutions including menu boards, hotel TVs, lobby screens, and media player scheduling systems.",
            type: "service",
            serviceType: "Digital signage and commercial display solutions",
            image: "/assests/images/products/digital-signage-solutions.webp"
        },
        "interactive-display-solutions.html": {
            title: "Interactive Flat Panel Supplier & Smart Board Solutions | GPSPL",
            description: "GPSPL is an interactive flat panel supplier and smart board distributor in India for school classrooms, college training labs, and corporate huddle rooms.",
            type: "service",
            serviceType: "Interactive display and smart board solutions",
            image: "/assests/images/products/interactive-display-solutions.webp"
        },
        "smart-classroom-solutions.html": {
            title: "Smart Classroom Solution & Educational AV Integration | GPSPL",
            description: "GPSPL delivers smart classroom solutions and interactive flat panel displays for schools, colleges, coaching campuses, and university auditoriums.",
            type: "service",
            serviceType: "Smart classroom, interactive display and education AV integration",
            image: "/assests/images/projects/gpspl-real/polished/direct-education-classroom-panels.webp"
        },
        "professional-audio-solutions.html": {
            title: "Professional Audio System Integrator India | GPSPL",
            description: "GPSPL is a professional audio solution provider and auditorium sound system integrator in India for clear voice pickup, DSP tuning, and speaker coverage.",
            type: "service",
            serviceType: "Professional audio, auditorium sound and DSP system integration",
            image: "/assests/images/products/professional-audio-solutions.webp"
        },
        "audio-technologies.html": {
            title: "Pro Audio & Sound System Technologies | GPSPL",
            description: "Professional audio solution technologies including Harman, JBL, Sennheiser, microphones, DSP, speakers, room audio, and auditorium sound by GPSPL.",
            type: "service",
            serviceType: "Audio technologies and professional sound systems",
            image: "/assests/images/products/professional-audio-solutions.webp"
        },
        "video-technologies.html": {
            title: "PTZ Cameras & Video Conferencing Technologies | GPSPL",
            description: "PTZ cameras, video conferencing cameras, display systems, active LED, and video technologies supplied and supported by GPSPL.",
            type: "service",
            serviceType: "Video technologies and visual communication systems",
            image: "/assests/images/hero/video-technologies-boardroom.webp"
        },
        "control-automation.html": {
            title: "Meeting Room Automation & AV Control Systems India | GPSPL",
            description: "Meeting room automation and AV control systems for touch panels, Crestron, AMX, lighting, and source switching integrations by GPSPL.",
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
            title: "IT Infrastructure Solutions & Integrator Delhi | GPSPL",
            description: "GPSPL is an enterprise IT infrastructure system integrator in Delhi NCR for servers, storage, networking, racks, online UPS, and lifecycle IT support.",
            type: "service",
            serviceType: "IT infrastructure and networking solutions"
        },
        "ups-power-backup-solutions.html": {
            title: "UPS & Power Backup Solutions | Luminous | GPSPL",
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
            title: "AV AMC & Maintenance Services India | GPSPL",
            description: "AV AMC and maintenance support for meeting rooms, displays, LED walls, audio systems, UPS, IT infrastructure, warranty coordination and troubleshooting.",
            type: "service",
            serviceType: "AMC maintenance and lifecycle support"
        },
        "product-catalog.html": {
            title: "Product Catalog | AV, Display, IT & UPS Products | GPSPL",
            description: "GPSPL product categories covering AV integration, active LED walls, commercial displays, projectors, professional audio, IT peripherals, UPS and AMC support.",
            type: "catalog"
        },
        "technology-partners.html": {
            title: "Technology Partners & Distributor Ecosystem | GPSPL",
            description: "GPSPL works with LG, Harman, JBL, Samsung, Sony, HP Poly, Wacom, Lumens, Crestron, AMX, ATEN, Epson and Luminous for enterprise projects.",
            type: "partners"
        },
        "brand-detail.html": {
            title: "Brand Detail | GPSPL Technology Distribution & Integration",
            description: "Brand-specific technology supply, pricing, integration, warranty coordination, installation and support from GPSPL.",
            type: "product"
        },
        "industries.html": {
            title: "Industries Served | AV, IT & Display Solutions | GPSPL",
            description: "GPSPL serves corporate, education, hospitality, government, healthcare, retail, real estate, banking, media and automotive spaces with AV and IT solutions.",
            type: "webpage"
        },
        "av-system-integrator-gurgaon.html": {
            title: "AV System Integrator in Gurgaon & Cyber City | GPSPL",
            description: "Premier AV system integrator in Gurgaon. Turnkey boardroom AV, Microsoft Teams Rooms, Active LED walls, Crestron automation, and 4-hour SLA AMC support across Cyber City.",
            type: "service",
            serviceType: "Audio visual integration and enterprise boardroom solutions"
        },
        "active-led-wall-supplier-noida.html": {
            title: "Active LED Wall Supplier & Installation in Noida | GPSPL",
            description: "Leading Active LED display wall supplier and installer in Noida. Fine-pitch P1.25, P1.53, P1.86 indoor LED walls, outdoor displays, and NovaStar processors.",
            type: "service",
            serviceType: "Active LED video wall systems and installation"
        },
        "projects.html": {
            title: "Enterprise AV, Display & IT Projects India | GPSPL Portfolio",
            description: "Explore GPSPL enterprise AV, display, smart classroom, Active LED, video wall, professional audio, IT infrastructure, installation and support projects across India.",
            type: "webpage"
        },
        "featured-projects.html": {
            title: "Featured AV Integration Projects India | GPSPL Case Proof",
            description: "Featured GPSPL AV integration projects across boardrooms, smart classrooms, active LED walls, professional audio, digital signage, healthcare displays and enterprise support-ready environments.",
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
            title: "AV Integration Case Studies India | GPSPL Project Outcomes",
            description: "GPSPL case studies show AV integration requirements, display planning, smart classroom rollouts, LED wall projects, professional audio, installation, commissioning and support outcomes.",
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
            title: "Contact GPSPL | AV, IT & Automation Enquiry",
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
            title: "Privacy Policy | Visitor Data & Enquiries | GPSPL",
            description: "Read how GPSPL handles website visitor data, enquiry form details, business communication records and privacy practices for submitted information.",
            type: "webpage",
            noindex: false
        },
        "terms-disclaimer.html": {
            title: "Website Terms, Disclaimer & Usage Policy | GPSPL",
            description: "Terms, disclaimer and website usage information for visitors using Global Peripheral Solution Pvt. Ltd. pages, downloads and enquiry forms.",
            type: "webpage",
            noindex: false
        },
        "404.html": {
            title: "GPSPL Page Not Found | Technology Solutions India",
            description: "The requested GPSPL page could not be found. Return to GPSPL technology distribution, AV integration, support and contact pages.",
            type: "webpage",
            noindex: true
        },
        "av-system-integrator-delhi-ncr.html": {
            title: "AV System Integrator in Delhi NCR & India | GPSPL",
            description: "GPSPL is a leading AV system integrator in Delhi NCR and India. We design and install conference room AV, active LED walls, smart classrooms and pro audio.",
            type: "service",
            serviceType: "Audio visual system integration services in Delhi NCR"
        },
        "thank-you.html": {
            title: "Thank You for Contacting GPSPL | Enquiry Received",
            description: "Thank you for contacting GPSPL. Our team will review your technology supply, integration, support or AMC enquiry and respond shortly.",
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
        let page = window.location.pathname.split("/").pop();
        if (!page) return "index.html";
        if (!page.includes(".")) {
            page = page + ".html";
        }
        return page;
    }

    function absoluteUrl(path) {
        if (!path) return DEFAULT_IMAGE;
        if (/^https?:\/\//i.test(path)) return path;
        return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    }

    function pageUrl(key) {
        return key === "index.html" ? `${BASE_URL}/` : `${BASE_URL}/${key.replace(/\.html$/, "")}`;
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

    function ensureIconMeta() {
        ensureMeta('meta[name="theme-color"]', { name: "theme-color" }, "content", "#D32F2F");
        ensureLink("icon", "/assests/images/gpspl.png");
        ensureLink("apple-touch-icon", "/assests/images/gpspl.png");
        ensureLink("manifest", "/site.webmanifest");
        if (runtimeConfig.googleSearchConsoleVerification) {
            ensureMeta(
                'meta[name="google-site-verification"]',
                { name: "google-site-verification" },
                "content",
                runtimeConfig.googleSearchConsoleVerification
            );
        }
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
            "slogan": "AV system integration, distribution and support for enterprise spaces.",
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
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "148",
                "bestRating": "5",
                "worstRating": "1"
            },
            "description": "GPSPL is a New Delhi based AV system integrator, enterprise technology distributor and project support partner for conference rooms, boardrooms, smart classrooms, Active LED walls, video walls, professional audio, IT infrastructure and AMC across Delhi NCR and India.",
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": PHONE,
                    "email": EMAIL,
                    "contactType": "sales and technical support",
                    "areaServed": "IN",
                    "availableLanguage": ["en", "hi"]
                }
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "304, Padma Palace, 86, Nehru Place",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110019",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.548581,
                "longitude": 77.253968
            },
            "hasMap": "https://www.google.com/maps/place/Global+Peripheral+Solution+Pvt.+Ltd./@28.548581,77.253968,17z/",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
                    "closes": "18:30"
                }
            ],
            "areaServed": [
                { "@type": "Country", "name": "India" },
                { "@type": "AdministrativeArea", "name": "Delhi NCR" },
                { "@type": "City", "name": "New Delhi" },
                { "@type": "City", "name": "Delhi" },
                { "@type": "City", "name": "Gurugram" },
                { "@type": "City", "name": "Noida" },
                { "@type": "City", "name": "Greater Noida" },
                { "@type": "City", "name": "Ghaziabad" },
                { "@type": "City", "name": "Faridabad" }
            ],
            "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 28.548581,
                    "longitude": 77.253968
                },
                "geoRadius": "250000"
            },
            "makesOffer": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Conference room and boardroom AV integration"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Active LED wall and video wall installation"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Smart classroom and professional audio integration"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AV AMC, warranty coordination and lifecycle support"
                    }
                }
            ],
            "knowsAbout": [
                "Audio visual integration",
                "AV system integration",
                "AV BOQ calculator",
                "Conference room BOQ estimates",
                "Room-wise AV requirement planning",
                "Enterprise AV system integration",
                "Audio visual integration in Delhi NCR",
                "Conference room automation",
                "Boardroom solutions",
                "Digital signage",
                "Active LED video wall",
                "Interactive flat panel",
                "Video conferencing solutions",
                "Professional audio systems",
                "Professional microphone systems",
                "JBL Professional audio",
                "Sennheiser microphones",
                "AMX automation",
                "Crestron control systems",
                "ATEN KVM switching",
                "LG commercial displays",
                "Samsung professional displays",
                "BenQ interactive displays",
                "Epson projectors",
                "Luminous UPS backup",
                "IT infrastructure",
                "AV AMC support",
                "Technology distribution"
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

    function keywordsForPage(key, cfg) {
        return cfg.keywords || pageKeywordOverrides[key] || defaultKeywords;
    }

    function keywordText(key, cfg) {
        return keywordsForPage(key, cfg).join(", ");
    }

    function offerCatalogSchema() {
        return {
            "@type": "OfferCatalog",
            "name": "GPSPL technology supply, integration and support portfolio",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "Meeting room and collaboration solutions",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conference room AV setup" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video conferencing room integration" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Smart classroom and training room systems" } }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Display and visual communication systems",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Active LED video wall supply and installation" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital signage and commercial display systems" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projectors, screens and presentation accessories" } }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Audio, automation and switching systems",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional audio system design and integration" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AV control automation and source switching" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "KVM and AV switching solutions" } }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "IT, power and lifecycle support",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT infrastructure and peripheral supply" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UPS and power backup solutions" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AMC, warranty coordination and technical support" } }
                    ]
                }
            ]
        };
    }

    function serviceSchema(key, cfg, url) {
        return {
            "@type": "Service",
            "@id": `${url}#service`,
            "name": cfg.title.replace(/\s*\|\s*GPSPL.*$/i, ""),
            "description": cfg.description,
            "keywords": keywordText(key, cfg),
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
            },
            "hasOfferCatalog": offerCatalogSchema()
        };
    }

    function faqSchema(url, key = "") {
        if (key === "index.html") {
            return {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Can GPSPL prepare an AV BOQ before a site survey?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. The GPSPL AV BOQ calculator gives a room-wise planning estimate using room type, size, seating and workflow. Final model, cable route, mounting, exact quantity and commercials are confirmed after site validation."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is included in a conference room AV setup?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A typical conference room AV setup can include display or LED wall, camera, microphones, speakers, DSP, amplifier, touch control, scheduler, rack, UPS, cabling, installation, programming, testing and user handover."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Does the BOQ calculator show final pricing?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No. It shows a GST-inclusive planning range. Final pricing may vary after equipment selection, site survey, cable route, installation complexity, warranty requirement and client approval."
                        }
                    }
                ]
            };
        }

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

    function boqCalculatorSchema(url) {
        return {
            "@type": "WebApplication",
            "@id": `${url}#av-boq-calculator`,
            "name": "GPSPL AV BOQ Calculator",
            "alternateName": [
                "AV BOQ Designer",
                "Conference Room BOQ Calculator",
                "AV Requirement Builder"
            ],
            "description": "A room-wise AV requirement builder for planning displays, cameras, microphones, speakers, DSP, control, rack, UPS, cabling, installation, programming and commissioning scope before a site survey.",
            "url": `${url}#av-boq-calculator`,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "inLanguage": "en-IN",
            "isAccessibleForFree": true,
            "publisher": { "@id": `${BASE_URL}/#organization` },
            "provider": { "@id": `${BASE_URL}/#organization` },
            "audience": {
                "@type": "BusinessAudience",
                "audienceType": "Corporate, education, hospitality, government, healthcare and enterprise AV buyers"
            },
            "featureList": [
                "Conference room AV BOQ estimate",
                "Boardroom AV requirement planning",
                "Huddle room AV requirement planning",
                "Smart classroom AV estimate",
                "Training room AV requirement planning",
                "Auditorium AV BOQ direction",
                "Display, audio, video conferencing and control-room scope planning",
                "GST-inclusive planning estimate and PDF proposal download"
            ],
            "keywords": [
                "AV BOQ calculator India",
                "conference room BOQ estimate",
                "AV cost calculator",
                "boardroom AV estimate",
                "auditorium AV BOQ",
                "video conferencing room setup"
            ].join(", "),
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
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

        const title = existingTitle || cfg.title;
        const description = existingDescription || cfg.description;
        const url = pageUrl(key);
        const image = absoluteUrl(cfg.image || document.head.querySelector('meta[property="og:image"]')?.getAttribute("content") || DEFAULT_IMAGE);

        document.title = title;
        ensureMeta('meta[name="description"]', { name: "description" }, "content", description);
        ensureMeta('meta[name="keywords"]', { name: "keywords" }, "content", keywordText(key, cfg));
        ensureMeta('meta[name="robots"]', { name: "robots" }, "content", cfg.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
        ensureLink("canonical", url);
        ensureIconMeta();

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
                "keywords": keywordText(key, cfg),
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
            graph.push(serviceSchema(key, cfg, url), faqSchema(url, key));
        }

        if (cfg.type === "faq") {
            graph.push(faqSchema(url, key));
        }

        if (cfg.type === "partners" || cfg.type === "catalog") {
            graph.push(itemListSchema(url));
        }

        if (productPages.has(key)) {
            graph.push(productSchema(cfg, url, image));
        }

        if (key === "index.html") {
            graph.push(boqCalculatorSchema(url), faqSchema(url, key));
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
