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
        "conference-room-solutions.html": ["conference room AV integrator", "boardroom AV setup Delhi", "video conferencing room setup", "meeting room audio video", "wireless presentation system"],
        "unified-communication-collaboration.html": ["video conferencing solutions India", "unified communication integrator", "hybrid meeting room solutions", "PTZ camera meeting room", "collaboration room AV"],
        "video-wall-solutions.html": ["video wall supplier India", "video wall integrator Delhi", "control room video wall", "LCD video wall systems", "commercial display wall"],
        "active-led-wall-solutions.html": ["active LED wall supplier India", "LED video wall installation", "indoor LED wall Delhi", "outdoor LED display supplier", "LED wall AMC"],
        "digital-signage-solutions.html": ["digital signage solutions India", "digital signage display supplier", "menu board display", "commercial signage screen", "retail digital signage"],
        "interactive-display-solutions.html": ["interactive flat panel supplier", "smart board supplier India", "interactive display for classrooms", "MAXHUB Newline BenQ panels", "IFPD installation"],
        "smart-classroom-solutions.html": ["smart classroom solutions India", "interactive classroom setup", "classroom projector audio", "digital classroom integrator", "education AV solutions"],
        "professional-audio-solutions.html": ["professional audio system integrator", "JBL audio supplier India", "Sennheiser microphone supplier", "auditorium sound system", "conference room audio"],
        "audio-technologies.html": ["meeting room audio technology", "professional microphones speakers DSP", "audio system design India", "auditorium audio integration", "room audio tuning"],
        "video-technologies.html": ["PTZ camera supplier India", "video technology solutions", "lecture capture cameras", "video conferencing camera", "enterprise display systems"],
        "control-automation.html": ["AV control automation India", "AMX automation integrator", "Crestron control systems", "meeting room automation", "AV switching control"],
        "kvm-av-switching-solutions.html": ["ATEN KVM supplier India", "KVM switching solutions", "AV switching matrix", "control room KVM", "enterprise KVM extender"],
        "it-infrastructure-solutions.html": ["IT infrastructure solutions India", "server storage networking supplier", "enterprise IT hardware", "UPS and networking support", "IT AMC Delhi"],
        "ups-power-backup-solutions.html": ["UPS supplier India", "Luminous UPS solutions", "online UPS for AV IT", "power backup for conference room", "UPS AMC support"],
        "amc-maintenance-services.html": ["AV AMC services India", "AV maintenance support", "video wall AMC", "conference room AMC", "technical support 48 to 72 hours"],
        "contact.html": ["request AV quote", "AV system integrator contact Delhi", "GPSPL enquiry", "technology supply quote India", "conference room quote"]
    };

    const pageSeo = {
        "index.html": {
            title: "AV BOQ Calculator & System Integrator India | GPSPL",
            description: "Use GPSPL's AV BOQ calculator to plan conference rooms, boardrooms, classrooms, auditoriums, displays, audio, video conferencing, installation and AMC across India.",
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
            description: "Enterprise AV system integrator for boardrooms, classrooms, auditoriums, control rooms, displays, audio, automation, installation and AMC support.",
            type: "service",
            serviceType: "Audio visual integration and enterprise AV system integration",
            image: "/assests/images/vision/conference-room-hero.jpg"
        },
        "conference-room-solutions.html": {
            title: "Conference Room AV Integrator Delhi NCR | GPSPL",
            description: "Boardroom and conference room AV setup with displays, microphones, PTZ cameras, video conferencing, wireless presentation, touch control and support.",
            type: "service",
            serviceType: "Conference room and boardroom AV solutions",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "unified-communication-collaboration.html": {
            title: "Video Conferencing Solutions Delhi NCR | GPSPL",
            description: "Video conferencing and unified communication solutions for hybrid meeting rooms, boardrooms, classrooms, cameras, microphones, displays and support.",
            type: "service",
            serviceType: "Unified communication and collaboration systems",
            image: "/assests/images/products/conference-room-solutions.webp"
        },
        "video-wall-solutions.html": {
            title: "Video Wall Supplier & Integrator India | GPSPL",
            description: "LED and LCD video wall supplier and integrator for control rooms, command centers, boardrooms and public display spaces with calibration and AMC.",
            type: "service",
            serviceType: "Video wall solutions and display systems",
            image: "/assests/images/hero/video-wall-command-center.webp"
        },
        "active-led-wall-solutions.html": {
            title: "Active LED Wall Supplier & Installer India | GPSPL",
            description: "Indoor and outdoor active LED wall supply, pixel pitch planning, cabinets, controllers, mounting, calibration, commissioning and AMC support.",
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
            title: "Digital Signage Display Solutions India | GPSPL",
            description: "Digital signage display solutions for retail, hospitality, offices and public spaces including commercial screens, media players, menu boards and support.",
            type: "service",
            serviceType: "Digital signage and commercial display solutions",
            image: "/assests/images/products/digital-signage-solutions.webp"
        },
        "interactive-display-solutions.html": {
            title: "Interactive Flat Panel Supplier India | GPSPL",
            description: "Interactive flat panels and smart boards for classrooms, training rooms and meeting spaces with supply, installation, wireless sharing and support.",
            type: "service",
            serviceType: "Interactive display and smart board solutions",
            image: "/assests/images/products/interactive-display-solutions.webp"
        },
        "smart-classroom-solutions.html": {
            title: "Smart Classroom Solutions Supplier India | GPSPL",
            description: "Smart classroom solutions with interactive displays, projectors, classroom audio, cameras, content sharing, installation, training and AMC support.",
            type: "service",
            serviceType: "Smart classroom and interactive learning solutions",
            image: "/assests/images/hero/smart-classroom-solutions.webp"
        },
        "professional-audio-solutions.html": {
            title: "Professional Audio System Integrator India | GPSPL",
            description: "Professional audio systems for meeting rooms, auditoriums and venues including microphones, speakers, amplifiers, DSP, JBL, Harman and Sennheiser.",
            type: "service",
            serviceType: "Professional audio systems and AV sound solutions",
            image: "/assests/images/products/professional-audio-solutions.webp"
        },
        "audio-technologies.html": {
            title: "Audio Technologies for Meeting Rooms & Auditoriums | GPSPL",
            description: "Audio technologies including Harman, JBL, Sennheiser, microphones, DSP, speakers, room audio and auditorium sound systems by GPSPL.",
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
            title: "AV Control & Automation Systems India | GPSPL",
            description: "AV control and automation systems for meeting rooms, displays, audio, lighting, touch panels, source switching, AMX and Crestron workflows.",
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
            title: "IT Infrastructure, Networking & Server Solutions | GPSPL",
            description: "IT infrastructure solutions including servers, storage, networking, rack cabinets, UPS systems, security systems and AV readiness support by GPSPL.",
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
        "projects.html": {
            title: "Technology Projects | AV, IT, Display & Support | GPSPL",
            description: "Explore GPSPL project capabilities across collaboration spaces, smart classrooms, displays, control rooms, public-sector and enterprise deployments.",
            type: "webpage"
        },
        "featured-projects.html": {
            title: "Featured AV, Display & IT Integration Projects | GPSPL",
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
            description: "GPSPL case studies show requirements, solution planning, technology used and support outcomes for AV, display, IT and automation projects.",
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
            "slogan": "We supply. We design. We integrate. We support.",
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
                { "@type": "AdministrativeArea", "name": "Delhi NCR" }
            ],
            "knowsAbout": [
                "Audio visual integration",
                "AV system integration",
                "AV BOQ calculator",
                "Conference room BOQ estimates",
                "Room-wise AV requirement planning",
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
                "Smart classroom AV estimate",
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

        const title = cfg.title;
        const description = cfg.description;
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

        if (key === "index.html") {
            graph.push(boqCalculatorSchema(url));
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
