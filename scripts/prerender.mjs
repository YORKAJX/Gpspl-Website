import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

// HTML escape helper
function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function assetUrl(value = "") {
    if (/^(https?:)?\/\//i.test(value) || value.startsWith("/")) return value;
    return `/${value}`;
}

const button = (item) => `<a href="${escapeHtml(item.url)}" class="${item.style === "secondary" ? "service-btn service-btn-secondary" : "service-btn service-btn-primary"}">${escapeHtml(item.label)}</a>`;

const downloadItems = (items = []) => {
    const list = [...items];
    if (list.length < 4) {
        list.push({
            type: "Requirement Format",
            title: "Share Project Requirement",
            url: "/contact.html"
        });
    }
    return list;
};

const caseStudyItems = (data) => {
    const list = [...(data.caseStudies || [])];
    const applicationPool = data.applications?.length ? data.applications : [
        { name: "Enterprise Deployment", description: "Business-ready AV and IT environment" },
        { name: "Learning Space Upgrade", description: "Classroom, training and presentation readiness" }
    ];
    while (list.length < 4) {
        const appRaw = applicationPool[list.length % applicationPool.length];
        const app = typeof appRaw === "string" ? { name: appRaw, description: appRaw } : appRaw;
        list.push({
            title: `${app.name || "Project"} support plan`,
            challenge: `The client needed a clear, reliable ${data.hero.title.toLowerCase()} approach for ${String(app.description || app.name).toLowerCase()}.`,
            solution: "GPSPL reviewed the room use, product fit, cabling, power, installation scope and service expectations before recommending the stack.",
            implementation: "The solution was planned for supply, installation, configuration, testing, documentation and handover with clear ownership.",
            results: "The site received a practical technology plan with easier procurement, cleaner deployment and long-term support readiness."
        });
    }
    return list.slice(0, 4);
};

const logo = (partner) => {
    const name = partner.name || "";
    const wordmark = brandWordmark(name);
    if (partner.logo) {
        return `<img src="${escapeHtml(partner.logo)}" alt="${escapeHtml(name)} logo" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${escapeHtml(wordmark)}'}))">`;
    }
    return `<span class="service-wordmark">${escapeHtml(wordmark)}</span>`;
};

const brandWordmark = (name = "") => {
    const lookup = {
        "JBL Professional": "JBL",
        "AMX": "AMX",
        "Harman Professional": "HARMAN",
        "HP Poly": "HP Poly",
        "HP / HP Poly": "HP Poly"
    };
    return lookup[name] || name.replace("Professional", "").trim() || "GPSPL";
};

const brandSlug = (name = "") => {
    const lookup = {
        "Harman": "harman-professional",
        "Harman Professional": "harman-professional",
        "JBL": "jbl-professional",
        "JBL Professional": "jbl-professional",
        "HP Poly": "hp-poly",
        "HP / HP Poly": "hp-poly",
        "LG": "lg-business-solutions",
        "LG Business Solutions": "lg-business-solutions"
    };
    if (lookup[name]) return lookup[name];
    return String(name)
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const appIcon = (name = "") => {
    const lookup = {
        "Boardrooms": "fa-users",
        "Conference Rooms": "fa-video",
        "Auditoriums": "fa-music",
        "Universities": "fa-graduation-cap",
        "Training Centers": "fa-chalkboard-teacher",
        "Healthcare Facilities": "fa-hospital",
        "Government Institutions": "fa-university",
        "Command & Control Centers": "fa-chart-line",
        "Corporate Campuses": "fa-city",
        "Experience Centers": "fa-desktop"
    };
    return lookup[name] || "fa-layer-group";
};

function sectionHeading(eyebrow, title, text, centered = false) {
    return `<div class="service-section-heading${centered ? " centered" : ""} reveal"><p class="service-eyebrow">${escapeHtml(eyebrow)}</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></div>`;
}

function simplePlanningTitle(data) {
    return "Plan the room before the product";
}

function simplePlanningOverview(data) {
    return "GPSPL first understands the room, users, workflow, site condition and support expectation. Then we suggest the product stack, installation plan and handover process.";
}

function planningConsiderations(data) {
    return [
        "Room purpose, users, content type and daily usage.",
        "Display size, viewing distance, audio pickup and lighting.",
        "Existing cabling, power, network and mounting condition.",
        "Compatibility, warranty, training, AMC and future support."
    ];
}

function rfqChecklist(data) {
    return [
        "Room or site photos with city/location",
        "Room size, screen size or user count",
        "Preferred brand or existing model",
        "Quantity, timeline and delivery location",
        "Installation, AMC or warranty requirement"
    ];
}

function planningTags(data) {
    const serviceTags = (data.serviceCards || []).slice(0, 4).map(card => ({
        label: card.title,
        url: card.url || data.seo.canonicalUrl || "/contact.html"
    }));
    const heroTags = (data.hero.industryTags || []).slice(0, 3).map(tag => ({
        label: tag,
        url: "/contact.html"
    }));
    return [...serviceTags, ...heroTags].slice(0, 7);
}

function serviceCardPoints(card = {}) {
    const title = String(card.title || "").toLowerCase();
    const fallback = [
        "Right product selection",
        "Clean installation planning",
        "Support-ready handover"
    ];

    if (title.includes("amc") || title.includes("support") || title.includes("warranty")) {
        return ["Preventive checks", "Warranty coordination", "Troubleshooting and support"];
    }
    if (title.includes("installation") || title.includes("mounting") || title.includes("structure")) {
        return ["Site readiness", "Mounting and cabling", "Handover documentation"];
    }
    if (title.includes("controller") || title.includes("processing") || title.includes("switching")) {
        return ["Source routing", "Screen mapping", "User workflow setup"];
    }
    if (title.includes("calibration") || title.includes("commissioning")) {
        return ["Display testing", "Signal verification", "User training"];
    }
    if (title.includes("led") || title.includes("video wall") || title.includes("display")) {
        return ["Viewing-distance planning", "Controller and cabling fit", "Service access readiness"];
    }
    if (title.includes("audio") || title.includes("microphone") || title.includes("speaker")) {
        return ["Room pickup planning", "Speaker coverage", "DSP and tuning support"];
    }
    if (title.includes("conference") || title.includes("boardroom") || title.includes("collaboration")) {
        return ["Camera and audio fit", "Wireless sharing", "Simple user controls"];
    }
    if (title.includes("projector") || title.includes("projection")) {
        return ["Brightness and screen size", "Mounting position", "Connectivity planning"];
    }
    if (title.includes("ups") || title.includes("power")) {
        return ["Load calculation", "Backup runtime", "Service and battery planning"];
    }

    return fallback;
}

function serviceCardIcon(card = {}) {
    const title = String(card.title || "").toLowerCase();
    const text = `${card.title || ""} ${card.description || ""}`.toLowerCase();

    if (title.includes("digital signage") || title.includes("signage")) return "fa-sign-hanging";
    if (title.includes("processor") || title.includes("controller") || title.includes("switching") || title.includes("matrix")) return "fa-sliders";
    if (title.includes("control room") || title.includes("command") || title.includes("noc") || title.includes("surveillance")) return "fa-chart-line";
    if (title.includes("active led") || title.includes("led wall")) return "fa-table-cells-large";
    if (title.includes("lcd video wall") || title.includes("video wall")) return "fa-border-all";
    if (text.includes("mounting") || text.includes("structure") || text.includes("alignment") || text.includes("installation")) return "fa-screwdriver-wrench";
    if (text.includes("calibration") || text.includes("commissioning") || text.includes("testing")) return "fa-gauge-high";
    if (text.includes("amc") || text.includes("warranty") || text.includes("support") || text.includes("maintenance")) return "fa-headset";

    if (text.includes("conference") || text.includes("boardroom") || text.includes("meeting")) return "fa-video";
    if (text.includes("camera") || text.includes("ptz")) return "fa-camera";
    if (text.includes("microphone") || text.includes("mic")) return "fa-microphone";
    if (text.includes("speaker") || text.includes("audio") || text.includes("dsp") || text.includes("amplifier")) return "fa-volume-up";
    if (text.includes("projector") || text.includes("projection")) return "fa-display";
    if (text.includes("interactive") || text.includes("classroom") || text.includes("display panel")) return "fa-chalkboard-teacher";
    if (text.includes("kvm") || text.includes("av switching")) return "fa-network-wired";
    if (text.includes("ups") || text.includes("power") || text.includes("backup")) return "fa-battery-full";
    if (text.includes("server") || text.includes("storage") || text.includes("networking") || text.includes("it infrastructure")) return "fa-server";
    if (text.includes("wacom") || text.includes("creative") || text.includes("peripheral")) return "fa-pen-nib";

    return card.icon || "fa-layer-group";
}

function featureCopy(value = "") {
    const text = String(value);
    const lower = text.toLowerCase();
    if (lower.includes("over-designed") || lower.includes("cost-efficient")) return { title: "Value Engineering", text: "We avoid unnecessary premium hardware when a cost-efficient product fully meets the technical requirement.", icon: "fa-scale-balanced" };
    if (lower.includes("display size") || lower.includes("microphone pickup") || lower.includes("speaker coverage")) return { title: "Scope Validation", text: "Display, pickup, coverage, rack, UPS and control requirements are checked before the BOQ is finalized.", icon: "fa-clipboard-check" };
    if (lower.includes("support readiness") || lower.includes("labels") || lower.includes("handover notes")) return { title: "Support-Ready Handover", text: "Rack dressing, cable labels, user training and handover notes make the system easier to operate and maintain.", icon: "fa-screwdriver-wrench" };
    if (lower.includes("one accountable") || lower.includes("connected through one")) return { title: "Single Ownership", text: "Product supply, installation, commissioning and AMC stay connected through one accountable GPSPL workflow.", icon: "fa-handshake" };
    if (lower.includes("room purpose") || lower.includes("future serviceability")) return { title: "Room-Fit Design", text: "Solutions are planned around room purpose, user workflow, product compatibility and future serviceability.", icon: "fa-drafting-compass" };
    if (lower.includes("coordinates") || lower.includes("commercial av") || lower.includes("power backup")) return { title: "Cross-Domain Coordination", text: "AV, audio, video, control, IT readiness and power backup are coordinated as one working environment.", icon: "fa-diagram-project" };
    if (lower.includes("distribution")) return { title: "Genuine Product Supply", text: "We help source AV, IT, display and peripheral products from trusted brand channels.", icon: "fa-certificate" };
    if (lower.includes("engineering") || lower.includes("deployment")) return { title: "Experienced Technical Team", text: "Our team plans, installs, tests and hands over systems for daily use.", icon: "fa-user-gear" };
    if (lower.includes("brand") || lower.includes("oem")) return { title: "Brand & Warranty Support", text: "We help with product selection, warranty guidance and service coordination.", icon: "fa-shield-halved" };
    if (lower.includes("custom") || lower.includes("workflow")) return { title: "Designed For Your Room", text: "Solutions are planned around the room purpose, users, devices and support needs.", icon: "fa-drafting-compass" };
    if (lower.includes("pan-india") || lower.includes("project execution")) return { title: "Pan-India Project Support", text: "GPSPL can coordinate supply, installation and support requirements across locations.", icon: "fa-map-location-dot" };
    if (lower.includes("rack") || lower.includes("cabling") || lower.includes("power")) return { title: "Clean Installation Planning", text: "We plan cabling, racks, power, network readiness and service access before handover.", icon: "fa-screwdriver-wrench" };
    if (lower.includes("commissioning") || lower.includes("training")) return { title: "Testing & User Training", text: "Systems are checked, commissioned, documented and explained to the user team.", icon: "fa-clipboard-check" };
    if (lower.includes("amc") || lower.includes("maintenance")) return { title: "AMC & After-Sales Support", text: "We support maintenance, troubleshooting, warranty coordination and upgrade planning.", icon: "fa-headset" };
    return { title: text, text: "GPSPL supports this requirement through product supply, installation and after-sales service.", icon: "fa-check" };
}

function applicationLabel(name = "") {
    const lookup = {
        "Boardrooms": "Executive meeting experiences",
        "Conference Rooms": "Hybrid collaboration rooms",
        "Auditoriums": "Large venue communication",
        "Universities": "Learning and lecture spaces",
        "Training Centers": "Interactive training environments",
        "Healthcare Facilities": "Clinical and admin AV spaces",
        "Government Institutions": "Secure public-sector facilities",
        "Command & Control Centers": "Mission-critical display systems",
        "Corporate Campuses": "Multi-space enterprise standards",
        "Experience Centers": "Immersive customer spaces"
    };
    return lookup[name] || "Integrated AV environment";
}

function productMark(card, brands = []) {
    const title = (card.title || "").toLowerCase();
    const description = (card.description || "").toLowerCase();
    const text = `${title} ${description}`;
    const brandMap = [
        { keys: ["kvm", "aten", "source routing", "switching", "extension"], brand: "ATEN" },
        { keys: ["crestron", "touch panel", "room control", "control interface"], brand: "Crestron" },
        { keys: ["amx", "automation", "lighting", "scene"], brand: "AMX" },
        { keys: ["active led", "video wall", "led display"], brand: "Absen" },
        { keys: ["projector", "projection", "presentation visual"], brand: "Epson" },
        { keys: ["ptz", "lecture capture", "camera"], brand: "Lumens" },
        { keys: ["video conferencing", "video bar", "meeting-room audio", "poly"], brand: "HP Poly" },
        { keys: ["sony", "ceiling microphone"], brand: "Sony" },
        { keys: ["lg", "business display", "commercial tv"], brand: "LG" },
        { keys: ["maxhub"], brand: "MAXHUB" },
        { keys: ["newline"], brand: "Newline" },
        { keys: ["commercial display", "signage", "collaboration screen"], brand: "Samsung" },
        { keys: ["microphone", "speech capture"], brand: "Sennheiser" },
        { keys: ["professional audio", "auditorium", "speaker", "dsp"], brand: "Harman" },
        { keys: ["interactive", "classroom"], brand: "BenQ" }
    ];
    const match = brandMap.find(item => item.keys.some(key => text.includes(key)));
    const partner = match ? brands.find(brand => (brand.name || "").toLowerCase().includes(match.brand.toLowerCase())) : null;
    if (partner?.logo) {
        return `<div class="partner-tech-product-mark logo-mark">${logo(partner)}</div>`;
    }
    return `<div class="partner-tech-product-mark"><i class="fas ${escapeHtml(card.icon || defaultProductIcon(card.title))}" aria-hidden="true"></i></div>`;
}

function defaultProductIcon(title = "") {
    const lower = title.toLowerCase();
    if (lower.includes("display") || lower.includes("monitor")) return "fa-display";
    if (lower.includes("cable") || lower.includes("path")) return "fa-bezier-curve";
    if (lower.includes("power") || lower.includes("ups")) return "fa-bolt";
    return "fa-box";
}

const attrs = (items = []) => `data-cms-fields="${escapeHtml(items.join("|"))}"`;

// Render service template markup to HTML string
function renderService(data) {
    const parentName = data.seo.breadcrumbParentName || "Services";
    const parentHref = "/index.html#services";
    
    // Partner technology layouts
    const partnerTechnologyPages = ["audio-technologies", "video-technologies", "control-automation"];
    if (partnerTechnologyPages.includes(data.seo.slug)) {
        const brands = data.partners || [];
        const productFamilies = (data.serviceCards || []).slice(0, 8);
        const applications = (data.applications || []).slice(0, 8);
        const leadBrands = brands.slice(0, 4);
        
        return `
            <section class="partner-tech-hero" style="--partner-tech-image: url('${escapeHtml(assetUrl(data.hero.image))}')" data-admin-section="partner-technology-hero">
                <div class="container partner-tech-hero-grid">
                    <div class="partner-tech-copy reveal">
                        <nav class="service-breadcrumbs" aria-label="Breadcrumb">
                            <a href="/index.html">Home</a><span>/</span><a href="${escapeHtml(parentHref)}">${escapeHtml(parentName)}</a><span>/</span><span>${escapeHtml(data.hero.title)}</span>
                        </nav>
                        <p class="service-eyebrow">${escapeHtml(data.hero.eyebrow || "Technology Category")}</p>
                        <h1>${escapeHtml(data.hero.title)}</h1>
                        <p>${escapeHtml(data.hero.subtitle)}</p>
                        <div class="partner-tech-actions">${data.hero.ctaButtons.map(button).join("")}</div>
                    </div>
                    <aside class="partner-tech-brand-board reveal" aria-label="Technology brands for this category">
                        <span class="partner-tech-board-label">Brand stack</span>
                        <div class="partner-tech-logo-grid">
                            ${leadBrands.map(partner => `<div>${logo(partner)}<strong>${escapeHtml(partner.name)}</strong><small>${escapeHtml(partner.category)}</small></div>`).join("")}
                        </div>
                    </aside>
                </div>
            </section>

            <section class="partner-tech-proof">
                <div class="container">
                    ${data.hero.trustIndicators.map(item => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}
                </div>
            </section>

            <section class="section-padding partner-tech-overview" data-admin-section="partner-category-overview">
                <div class="container partner-tech-split">
                    <div class="partner-tech-heading reveal">
                        <p class="service-eyebrow">Category overview</p>
                        <h2>What GPSPL can supply in this technology category.</h2>
                    </div>
                    <div class="partner-tech-copy-panel reveal">
                        <p>${escapeHtml(data.introduction.description || data.hero.subtitle)}</p>
                        <div class="partner-tech-tag-row">
                            ${data.hero.industryTags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-padding partner-tech-brand-section" data-admin-section="technology-partner-brands">
                <div class="container">
                    ${sectionHeading("Brand ecosystem", "Brands and technologies in this category", "GPSPL helps select brand products around room purpose, budget, compatibility, warranty and long-term support.", true)}
                    <div class="partner-tech-brand-list">
                        ${brands.map((partner, index) => `
                            <article class="partner-tech-brand-row reveal">
                                <span>${String(index + 1).padStart(2, "0")}</span>
                                <div class="partner-tech-brand-logo">${logo(partner)}</div>
                                <div>
                                    <h3>${escapeHtml(partner.name)}</h3>
                                    <small>${escapeHtml(partner.category)}</small>
                                    <p>${escapeHtml(partner.description)}</p>
                                </div>
                                <a href="/brand-detail.html?brand=${escapeHtml(brandSlug(partner.name))}">View brand</a>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </section>

            <section class="section-padding partner-tech-products" data-admin-section="technology-product-families">
                <div class="container">
                    ${sectionHeading("Product families", "Clear products, clear use cases", "Simple product groups that help a buyer understand what GPSPL deals in, and help a technical team understand the project scope.", true)}
                    <div class="partner-tech-product-grid">
                        ${productFamilies.map((card, index) => `
                            <article class="partner-tech-product-card reveal">
                                <span>${String(index + 1).padStart(2, "0")}</span>
                                ${productMark(card, brands)}
                                <h3>${escapeHtml(card.title)}</h3>
                                <p>${escapeHtml(card.description)}</p>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </section>

            <section class="section-padding partner-tech-applications" data-admin-section="technology-use-cases">
                <div class="container partner-tech-split">
                    <div class="partner-tech-heading reveal">
                        <p class="service-eyebrow">Where it fits</p>
                        <h2>Spaces where this technology is usually used.</h2>
                    </div>
                    <div class="partner-tech-application-list reveal">
                        ${applications.map(item => `<span><i class="fas ${appIcon(item)}" aria-hidden="true"></i>${escapeHtml(item)}</span>`).join("")}
                    </div>
                </div>
            </section>

            <section class="section-padding partner-tech-procurement" data-admin-section="partner-technology-procurement">
                <div class="container partner-tech-split">
                    <div class="partner-tech-heading reveal">
                        <p class="service-eyebrow">Buying guidance</p>
                        <h2>What GPSPL checks before recommending products.</h2>
                    </div>
                    <div class="partner-tech-procurement-grid reveal">
                        ${planningConsiderations(data).slice(0, 4).map((item, index) => `<article><strong>${String(index + 1).padStart(2, "0")}</strong><p>${escapeHtml(item)}</p></article>`).join("")}
                    </div>
                </div>
            </section>

            <section class="service-cta partner-tech-cta" data-admin-section="partner-technology-cta" style="--service-cta-image: url('${escapeHtml(assetUrl(data.cta.backgroundImage || data.hero.image))}')">
                <div class="container reveal">
                    <div class="partner-tech-cta-copy">
                        <p class="service-eyebrow">Talk to GPSPL</p>
                        <h2>${escapeHtml(data.cta.headline)}</h2>
                        <p>${escapeHtml(data.cta.subheading)}</p>
                    </div>
                    <div class="service-hero-actions">${data.cta.buttons.map(button).join("")}</div>
                </div>
            </section>
        `;
    }

    // Standard service layouts
    return `
        <section class="service-hero" data-admin-section="service-hero" style="--service-hero-image: url('${escapeHtml(assetUrl(data.hero.image))}')" ${attrs(["Hero Title", "Hero Subtitle", "Hero Image", "CTA Buttons", "Brochure PDF", "Industry Tags"])}>
            <div class="container service-hero-grid">
                <div class="service-hero-copy reveal">
                    <nav class="service-breadcrumbs" aria-label="Breadcrumb">
                        <a href="/index.html">Home</a><span>/</span><a href="${escapeHtml(parentHref)}">${escapeHtml(parentName)}</a><span>/</span><span>${escapeHtml(data.hero.title)}</span>
                    </nav>
                    <p class="service-eyebrow">${escapeHtml(data.hero.eyebrow)}</p>
                    <h1>${escapeHtml(data.hero.title)}</h1>
                    <p>${escapeHtml(data.hero.subtitle)}</p>
                    <div class="service-hero-actions">${data.hero.ctaButtons.map(button).join("")}</div>
                    <div class="service-tags">${data.hero.industryTags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                </div>
                <aside class="service-hero-panel reveal">
                    <p>Trusted Integration Partner</p>
                    <div class="service-trust-grid">${data.hero.trustIndicators.map(item => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>
                    <div class="service-logo-strip">${data.hero.partnerLogos.map(item => `<img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.name)} logo" loading="lazy">`).join("")}</div>
                </aside>
            </div>
        </section>

        <section class="service-approach" data-admin-section="service-approach" ${attrs(["Approach Cards", "Icons", "Descriptions", "Display Order"])}>
            <div class="container">
                <div class="service-approach-grid">
                    ${data.approach.map((item, index) => `
                        <article class="reveal">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            <i class="fas ${escapeHtml(item.icon)}" aria-hidden="true"></i>
                            <h2>${escapeHtml(item.title)}</h2>
                            <p>${escapeHtml(item.description)}</p>
                        </article>
                    `).join("")}
                </div>
            </div>
        </section>

        <nav class="service-page-index" aria-label="Service page sections">
            <div class="container">
                <a href="#overview">Overview</a>
                <a href="#planning">Planning</a>
                <a href="#capabilities">Capabilities</a>
                <a href="#applications">Industries</a>
                <a href="#process">Delivery Process</a>
                <a href="#projects">Projects</a>
                <a href="#resources">Resources</a>
                <a href="#faq">FAQs</a>
            </div>
        </nav>

        <section id="overview" class="service-intro section-padding" data-admin-section="service-introduction" ${attrs(["Heading", "Description", "Statistics", "Images"])}>
            <div class="container service-intro-grid">
                <div class="service-section-copy reveal">
                    <p class="service-eyebrow">GPSPL Expertise</p>
                    <h2>${escapeHtml(data.introduction.heading)}</h2>
                    <p>${escapeHtml(data.introduction.description)}</p>
                </div>
                <figure class="service-intro-media reveal">
                    <img class="service-intro-image" src="${escapeHtml(data.introduction.image)}" alt="${escapeHtml(data.introduction.heading)}" loading="lazy">
                    <figcaption>
                        <span>${escapeHtml(data.hero.eyebrow || "GPSPL Capability")}</span>
                        <strong>${escapeHtml(data.hero.title)}</strong>
                    </figcaption>
                </figure>
                <div class="service-stat-row reveal">${data.introduction.statistics.map(item => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>
            </div>
        </section>

        <section id="planning" class="service-planning section-padding" data-admin-section="planning-guide-module">
            <div class="container">
                ${sectionHeading(
                    data.sectionContent?.planning?.eyebrow || "Buying & Planning Guidance",
                    data.sectionContent?.planning?.title || `${data.hero.title} Planning Guide`,
                    data.sectionContent?.planning?.description || `Useful planning points for organizations comparing ${data.hero.title.toLowerCase()}, technology supply, integration, installation and long-term support options.`,
                    true
                )}
                <div class="service-planning-grid">
                    <article class="service-planning-story reveal">
                        <span>01</span>
                        <h3>${escapeHtml(simplePlanningTitle(data))}</h3>
                        <p>${escapeHtml(simplePlanningOverview(data))}</p>
                        <div class="service-keyword-strip">
                            ${planningTags(data).map(tag => `<a href="${escapeHtml(tag.url)}">${escapeHtml(tag.label)}</a>`).join("")}
                        </div>
                    </article>
                    <article class="service-planning-checklist reveal">
                        <span>02</span>
                        <h3>What we check before we quote</h3>
                        <ul>${planningConsiderations(data).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </article>
                    <article class="service-rfq-card reveal">
                        <span>03</span>
                        <h3>What you can share with us</h3>
                        <ul>${rfqChecklist(data).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                        <a class="service-btn service-btn-primary" href="/contact.html">Share Requirement</a>
                    </article>
                </div>
            </div>
        </section>

        <section id="capabilities" class="service-capabilities section-padding" data-admin-section="services-module">
            <div class="container">
                ${sectionHeading(
                    data.sectionContent?.capabilities?.eyebrow || "Service Portfolio",
                    data.sectionContent?.capabilities?.title || "Core Capabilities",
                    data.sectionContent?.capabilities?.description || "Integrated systems designed around user experience, reliability, and long-term performance.",
                    true
                )}
                <div class="service-card-grid">${data.serviceCards.map(card => `
                    <article class="service-capability-card reveal" data-cms-entity="service">
                        <i class="fas ${escapeHtml(serviceCardIcon(card))}" aria-hidden="true"></i>
                        <h3>${escapeHtml(card.title)}</h3>
                        <p>${escapeHtml(card.description)}</p>
                        <ul class="service-card-points">
                            ${serviceCardPoints(card).map(point => `<li>${escapeHtml(point)}</li>`).join("")}
                        </ul>
                        <a href="${escapeHtml(card.url || "/contact.html")}" aria-label="View ${escapeHtml(card.title)} details">
                            View Details <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </article>`).join("")}</div>
            </div>
        </section>

        <section id="applications" class="service-applications section-padding" data-admin-section="applications-module">
            <div class="container">
                ${sectionHeading("Application Environments", "Industries & Use Cases", "AV environments for boardrooms, campuses, command centers, healthcare, public institutions, and experience spaces.", true)}
                <div class="service-application-grid">${data.applications.map(item => `<article class="reveal"><i class="fas ${appIcon(item)}" aria-hidden="true"></i><span>${escapeHtml(item)}</span><small>${escapeHtml(applicationLabel(item))}</small></article>`).join("")}</div>
            </div>
        </section>

        <section id="partners" class="service-partners section-padding" data-admin-section="technology-partners-module">
            <div class="container">
                ${sectionHeading("Technology Partners", "Brands We Work With", "Products and technologies selected around project fit, installation quality, support and performance.", true)}
                <div class="service-partner-grid">${data.partners.map(partner => `
                    <article class="service-partner-card reveal">
                        <div class="service-partner-logo">${logo(partner)}</div>
                        <div>
                            <h3>${escapeHtml(partner.name)}</h3>
                            <span>${escapeHtml(partner.category)}</span>
                            <p>${escapeHtml(partner.description)}</p>
                        </div>
                    </article>`).join("")}</div>
            </div>
        </section>

        <section id="process" class="service-process section-padding" data-admin-section="delivery-process-module">
            <div class="container">
                ${sectionHeading("Project Execution", "Delivery Timeline", "A practical delivery flow from consultation to handover and support.", true)}
                <div class="service-timeline">${data.process.map((step, index) => `<article class="reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(step)}</h3></article>`).join("")}</div>
            </div>
        </section>

        <section class="service-features section-padding" data-admin-section="feature-cards-module">
            <div class="container">
                ${sectionHeading("Why GPSPL", "Why Organizations Choose GPSPL", "A system integration partner focused on product fit, installation quality and after-sales support.", true)}
                <div class="service-feature-grid">${data.features.map((item, index) => {
                    const feature = featureCopy(item);
                    return `<article class="reveal"><span>${String(index + 1).padStart(2, "0")}</span><i class="fas ${escapeHtml(feature.icon)}" aria-hidden="true"></i><h3>${escapeHtml(feature.title)}</h3><p>${escapeHtml(feature.text)}</p></article>`;
                }).join("")}</div>
            </div>
        </section>

        <section id="projects" class="service-projects section-padding" data-admin-section="projects-module">
            <div class="container">
                ${sectionHeading("Field Experience", "Project Showcase", "GPSPL project visuals selected from real rooms, display environments, training spaces and integrated AV deployments.", true)}
                <div class="service-project-slider">${data.projects.map(project => `
                    <article class="service-project-card reveal">
                        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.clientName)}" loading="lazy">
                        <div>
                            <span>${escapeHtml(project.industry)}</span>
                            <h3>${escapeHtml(project.clientName)}</h3>
                            <p>${escapeHtml(project.solution)}</p>
                            <div>${project.technologies.map(tag => `<small>${escapeHtml(tag)}</small>`).join("")}</div>
                        </div>
                    </article>`).join("")}</div>
            </div>
        </section>

        <section class="service-case-studies section-padding" data-admin-section="case-studies-module">
            <div class="container">
                ${sectionHeading(
                    data.sectionContent?.caseStudies?.eyebrow || "Case Studies",
                    data.sectionContent?.caseStudies?.title || "From Challenge to Outcome",
                    data.sectionContent?.caseStudies?.description || "Structured delivery notes that show how GPSPL studies the requirement, designs the solution, implements the system, and supports the outcome.",
                    true
                )}
                <div class="service-case-grid">${caseStudyItems(data).map((study, index) => `
                    <article class="reveal">
                        <div class="service-case-card-head">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            <h3>${escapeHtml(study.title)}</h3>
                        </div>
                        <div class="service-case-flow">
                            ${["challenge", "solution", "implementation", "results"].map(key => `
                                <div class="service-case-step">
                                    <strong>${key[0].toUpperCase() + key.slice(1)}</strong>
                                    <p>${escapeHtml(study[key])}</p>
                                </div>
                            `).join("")}
                        </div>
                    </article>`).join("")}</div>
            </div>
        </section>

        <section class="service-gallery section-padding" data-admin-section="gallery-module">
            <div class="container">
                ${sectionHeading("Deployment Visuals", "Installation Gallery", "Professional AV environments across boardrooms, meeting rooms, training rooms, installation, display systems and video conferencing.", true)}
                <div class="service-gallery-tags">${data.gallery.categories.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
                <div class="service-gallery-grid">${data.gallery.images.map(image => `<figure class="reveal"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.caption)}" loading="lazy"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`).join("")}</div>
            </div>
        </section>

        <section id="resources" class="service-resources section-padding" data-admin-section="downloads-module">
            <div class="container">
                ${sectionHeading("Resources", "Downloads & Planning Material", "Brochures, datasheets, product guides, and solution catalogs for project planning.", true)}
                <div class="service-download-grid">${downloadItems(data.downloads).map(item => `<a class="reveal" href="${escapeHtml(item.url)}"><i class="fas ${item.url.endsWith('.pdf') ? 'fa-file-pdf' : 'fa-clipboard-list'}" aria-hidden="true"></i><span>${escapeHtml(item.type)}</span><strong>${escapeHtml(item.title)}</strong></a>`).join("")}</div>
            </div>
        </section>

        <section id="faq" class="service-faq section-padding" data-admin-section="faqs-module">
            <div class="container">
                ${sectionHeading("FAQ", "Frequently Asked Questions", "Answers to common questions about design, implementation, brands, support, and Pan-India project execution.", true)}
                <div class="service-faq-list">${data.faqs.map(item => `<details class="reveal"><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}</div>
            </div>
        </section>

        <section class="service-related section-padding" data-admin-section="related-services-module">
            <div class="container">
                ${sectionHeading("Explore More", "Related Services", "Connected solutions that help build a complete enterprise technology environment.", true)}
                <div class="service-related-grid">${data.relatedServices.map(item => `<a class="reveal" href="${escapeHtml(item.url)}">${escapeHtml(item.title)}<i class="fas fa-arrow-right" aria-hidden="true"></i></a>`).join("")}</div>
            </div>
        </section>

        <section class="service-related service-seo-intent section-padding" data-admin-section="seo-intent-section">
            <div class="container">
                <div class="seo-intent-panel reveal">
                    <div class="seo-intent-copy">
                        <p class="service-eyebrow">Search Intent Guidance</p>
                        <h2>Search-Friendly AV Solution Paths</h2>
                        <p>Whether a buyer searches casually or technically, GPSPL connects the requirement to the right AV page. Many customers do not know the exact industry term, so we list common keywords to help everyone find the correct integration route.</p>
                        <p>If you search for <strong>AV solutions provider India</strong>, <strong>AV solution company Delhi NCR</strong>, <strong>audio video solution provider</strong>, <strong>pro audio video solution</strong>, <strong>AV system integrator in Delhi NCR</strong>, or <strong>audio visual integration company India</strong>, this page is the central hub. If you are comparing technologies, use the related links on the right or build a custom layout using our BOQ calculator tool.</p>
                    </div>
                    <ul class="seo-intent-list">
                        <li><a href="/audio-visual-integration.html">AV SOLUTIONS</a></li>
                        <li><a href="/professional-audio-solutions.html">PRO AUDIO &amp; AUDITORIUMS</a></li>
                        <li><a href="/active-led-wall-solutions.html">ACTIVE LED &amp; VIDEO WALLS</a></li>
                        <li><a href="/conference-room-solutions.html">CONFERENCE &amp; BOARDROOMS</a></li>
                        <li><a href="/smart-classroom-solutions.html">EDUCATION &amp; SMART CLASSROOMS</a></li>
                        <li><a href="/amc-maintenance-services.html">AV AMC &amp; LIFECYCLE SUPPORT</a></li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="service-cta" data-admin-section="service-cta" style="--service-cta-image: url('${escapeHtml(assetUrl(data.cta.backgroundImage))}')">
            <div class="container reveal">
                <p class="service-eyebrow">Talk to GPSPL</p>
                <h2>${escapeHtml(data.cta.headline)}</h2>
                <p>${escapeHtml(data.cta.subheading)}</p>
                <div class="service-hero-actions">${data.cta.buttons.map(button).join("")}</div>
            </div>
        </section>
    `;
}

// Inlining global header/footer HTML into HTML templates
const headerHtml = fs.readFileSync(path.join(__dirname, 'modules', 'header.html'), 'utf-8');
const footerHtml = fs.readFileSync(path.join(__dirname, 'modules', 'footer.html'), 'utf-8');

function cleanInlines(html) {
    let result = html;
    
    // Replace header container
    result = result.replace(
        /<div id="header-container"><\/div>/i,
        `<div id="header-container">${headerHtml}</div>`
    );
    // Replace footer container
    result = result.replace(
        /<div id="footer-container"><\/div>/i,
        `<div id="footer-container">${footerHtml}</div>`
    );
    
    return result;
}

const pagesToPreRender = [
    { file: 'video-wall-solutions.html', slug: 'video-wall-solutions' },
    { file: 'unified-communication-collaboration.html', slug: 'unified-communication-collaboration' },
    { file: 'active-led-wall-installation.html', slug: 'active-led-wall-installation' },
    { file: 'control-automation.html', slug: 'control-automation' },
    { file: 'audio-technologies.html', slug: 'audio-technologies' },
    { file: 'video-technologies.html', slug: 'video-technologies' },
    { file: 'audio-visual-integration.html', slug: 'audio-visual-integration' }
];

console.log("Starting Pre-rendering Execution...");

for (const page of pagesToPreRender) {
    const filePath = path.join(__dirname, page.file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${page.file}`);
        continue;
    }
    
    const jsonPath = path.join(__dirname, 'data', 'services', `${page.slug}.json`);
    if (!fs.existsSync(jsonPath)) {
        console.warn(`JSON not found: ${page.slug}.json`);
        continue;
    }
    
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    let htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    // Render dynamic HTML from JSON
    const renderedBody = renderService(data);
    
    // Find the main servicePage element and replace its contents
    const mainRegex = /(<main\s+id="servicePage"[^>]*>)([\s\S]*?)(<\/main>)/i;
    if (mainRegex.test(htmlContent)) {
        htmlContent = htmlContent.replace(mainRegex, `$1\n${renderedBody}\n$3`);
        console.log(`Pre-rendered body text into ${page.file}`);
    } else {
        console.warn(`Could not find <main id="servicePage"> inside ${page.file}`);
    }
    
    // Inline header/footer
    htmlContent = cleanInlines(htmlContent);
    console.log(`Inlined header and footer into ${page.file}`);
    
    // Save file
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
}

// Inline header/footer in other core indexable pages that are not service templates
const otherPages = [
    'index.html',
    'about-gpspl.html',
    'contact.html',
    'our-vision.html',
    'directors-message.html',
    'milestones.html',
    'team.html',
    'careers.html',
    'downloads.html',
    'faq.html',
    'projects.html',
    'case-studies.html',
    'active-led-wall-solutions.html',
    'conference-room-solutions.html',
    'smart-classroom-solutions.html',
    'professional-audio-solutions.html',
    'it-infrastructure-solutions.html',
    'lg-createboard-tr3er.html',
    'lg-commercial-tv-nu88c.html',
    'lg-commercial-tv-ua831c.html'
];

console.log("Inlining header/footer on remaining core indexable pages...");
for (const file of otherPages) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let htmlContent = fs.readFileSync(filePath, 'utf-8');
        htmlContent = cleanInlines(htmlContent);
        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        console.log(`Inlined header and footer in ${file}`);
    }
}

console.log("Pre-rendering and inlining completed successfully!");
