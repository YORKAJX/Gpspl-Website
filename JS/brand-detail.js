(function () {
    const params = new URLSearchParams(window.location.search);
    const requestedSlug = params.get("brand") || "harman-professional";

    const officialWebsites = {
        "harman-professional": "https://pro.harman.com/",
        "jbl-professional": "https://jblpro.com/",
        "amx": "https://www.amx.com/",
        "samsung": "https://www.samsung.com/in/business/",
        "lg-business-solutions": "https://www.lg.com/in/business/",
        "sony": "https://pro.sony/en_IN/",
        "hp": "https://www.hp.com/in-en/home.html",
        "hp-poly": "https://www.hp.com/us-en/poly.html",
        "lenovo": "https://www.lenovo.com/in/en/",
        "dell": "https://www.dell.com/en-in",
        "acer": "https://www.acer.com/in-en",
        "wacom": "https://www.wacom.com/en-in",
        "lumens": "https://www.mylumens.com/",
        "absen": "https://www.absen.com/",
        "sennheiser": "https://www.sennheiser.com/en-in",
        "crestron": "https://www.crestron.com/",
        "newline": "https://newline-interactive.com/",
        "maxhub": "https://www.maxhub.com/en/",
        "aten": "https://www.aten.com/global/en/",
        "epson": "https://www.epson.co.in/",
        "benq": "https://www.benq.com/en-in/business/index.html",
        "luminous": "https://www.luminousindia.com/"
    };

    const categoryUseCases = {
        "Professional Audio": ["Boardroom audio", "Auditorium sound", "Classroom voice clarity"],
        "Meeting Audio": ["Conference rooms", "Hybrid meetings", "Training spaces"],
        "Microphones": ["Speech capture", "Wireless microphones", "Ceiling microphones"],
        "Control": ["Touch panel control", "Source switching", "Room presets"],
        "Automation": ["Lighting scenes", "Meeting modes", "Simple room operation"],
        "AV Switching": ["KVM switching", "HDMI/USB routing", "Control rooms"],
        "Commercial Displays": ["Corporate displays", "Reception signage", "Information screens"],
        "Screen Displays": ["Meeting-room screens", "Public display areas", "Enterprise signage"],
        "Digital Signage": ["Retail messaging", "Hotel signage", "Campus communication"],
        "Video Wall": ["Command centers", "Large display walls", "Monitoring rooms"],
        "Active LED": ["Indoor LED walls", "Auditoriums", "Showrooms"],
        "Professional Displays": ["Presentation spaces", "Visual communication", "Executive rooms"],
        "Projection": ["Classrooms", "Conference rooms", "Training halls"],
        "IT Peripherals": ["Office procurement", "Institutional supply", "IT refresh projects"],
        "Laptops & Desktops": ["Business users", "Computer labs", "Office teams"],
        "Printers": ["Office printing", "Institutional printing", "Consumables supply"],
        "RAM & SSD": ["System upgrades", "IT maintenance", "Performance refresh"],
        "Creative Peripherals": ["Design labs", "Media teams", "Creative classrooms"],
        "Pen Displays": ["Digital art", "Animation workflows", "Teaching screens"],
        "PTZ Cameras": ["Lecture capture", "Video meetings", "Auditorium cameras"],
        "Lecture Capture": ["Smart classrooms", "Training rooms", "Hybrid learning"],
        "Interactive Displays": ["Smart classrooms", "Boardrooms", "Collaboration zones"],
        "Smart Classroom": ["Interactive teaching", "Hybrid learning", "Training centers"],
        "KVM": ["Operator desks", "Server rooms", "Command centers"],
        "Connectivity": ["AV cabling", "Signal extension", "Rack integration"],
        "UPS": ["AV room backup", "IT room power", "Equipment protection"],
        "Power Backup": ["UPS sizing", "Battery backup", "Power continuity"]
    };

    const slugify = (value) => value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    const setHref = (id, url) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (url) {
            el.href = url;
            el.style.display = "";
        } else {
            el.style.display = "none";
        }
    };

    const unique = (items) => [...new Set(items.filter(Boolean))];

    const setBrand = (brand) => {
        const name = brand.name || "GPSPL Technology Partner";
        const slug = brand.slug || slugify(name);
        const categories = brand.categories || [];
        const officialUrl = officialWebsites[slug];
        const status = brand.authorizedStatus || "Technology portfolio";

        document.title = brand.seo?.title || `${name} Products, Integration & Support | GPSPL`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", brand.seo?.description || `${name} products, pricing, supply, installation and support from GPSPL.`);
        }

        setText("brandBreadcrumb", name);
        setText("brandTitle", `${name} Products, Pricing, Integration & Support`);
        setText("brandSummary", brand.summary || "Enterprise technology products supplied, integrated and supported by GPSPL.");
        setText("brandStatus", status);
        setText("brandTrustNote", trustNote(brand));
        setText("brandCategoryCopy", categoryCopy(brand));
        setText("brandUseTitle", `Where ${name} fits in a project`);
        setText("brandDeliveryIntro", `${name} requirements are handled as a practical project workflow: select the right product, confirm compatibility, plan deployment, complete installation and keep support ready after handover.`);
        setText("brandRfqTitle", `Request ${name} product guidance and pricing`);
        setText("brandRfqCopy", `Share your ${name} requirement, quantity, location, preferred model and installation scope. GPSPL can help with product selection, supply, integration, warranty coordination and AMC support.`);
        setHref("brandOfficialWebsite", officialUrl);
        setHref("brandOfficialWebsiteBottom", officialUrl);

        const logo = document.getElementById("brandLogo");
        if (logo) {
            logo.src = brand.logo || "/assests/images/gpspl.png";
            logo.alt = `${name} official logo`;
        }

        renderChips("brandCategories", categories);
        renderChips("brandHeroCategories", categories.slice(0, 4));
        renderUseCases(brand);
        renderProcess(brand);

        window.dispatchEvent(new CustomEvent("gpspl:brand-ready", { detail: { brand } }));
    };

    const renderChips = (id, items) => {
        const wrapper = document.getElementById(id);
        if (!wrapper) return;
        wrapper.innerHTML = "";
        items.forEach((item) => {
            const chip = document.createElement("span");
            chip.textContent = item;
            wrapper.appendChild(chip);
        });
    };

    const renderUseCases = (brand) => {
        const wrapper = document.getElementById("brandUseCases");
        if (!wrapper) return;

        const cases = unique((brand.categories || []).flatMap((category) => categoryUseCases[category] || []))
            .slice(0, 6);
        const fallback = ["Product supply", "Installation planning", "Warranty and AMC support"];
        const items = cases.length ? cases : fallback;

        wrapper.innerHTML = items.map((item, index) => `
            <article>
                <strong>${String(index + 1).padStart(2, "0")}</strong>
                <span>${escapeHtml(item)}</span>
            </article>
        `).join("");
    };

    const renderProcess = (brand) => {
        const wrapper = document.getElementById("brandProcessGrid");
        if (!wrapper) return;

        const steps = [
            {
                title: "Requirement Mapping",
                copy: `We confirm the room type, product category, quantity, preferred ${brand.name || "brand"} model, site location and expected performance.`
            },
            {
                title: "Product Selection",
                copy: "GPSPL checks product fit, compatibility, warranty, availability, pricing direction and required accessories before quoting."
            },
            {
                title: "Supply & Integration",
                copy: "Products can be supplied with installation planning, cabling, mounting, configuration, commissioning and handover support."
            },
            {
                title: "Warranty & AMC",
                copy: "Post-installation support, warranty coordination, preventive maintenance and AMC planning keep the setup reliable."
            }
        ];

        wrapper.innerHTML = steps.map((step, index) => `
            <div>
                <strong>${String(index + 1).padStart(2, "0")}</strong>
                <span>${escapeHtml(step.title)}</span>
                <p>${escapeHtml(step.copy)}</p>
            </div>
        `).join("");
    };

    const trustNote = (brand) => {
        const status = brand.authorizedStatus || "Technology portfolio";
        const categories = (brand.categories || []).slice(0, 4).join(", ");
        return `${status} for ${categories || "enterprise AV and IT products"} with GPSPL product supply, integration, warranty coordination and after-sales support.`;
    };

    const categoryCopy = (brand) => {
        const name = brand.name || "this brand";
        const categories = (brand.categories || []).join(", ");
        if (brand.slug === "lg-business-solutions") {
            return "GPSPL supports LG commercial displays, screen displays, digital signage, video wall and active LED requirements with regional authorized distributor support, product selection, installation planning, warranty coordination and AMC support.";
        }
        if (brand.slug === "harman-professional") {
            return "GPSPL supports Harman Professional product selection, professional audio, installed AV systems, control-ready environments, project supply, installation coordination and long-term service planning.";
        }
        if ((brand.authorizedStatus || "").toLowerCase().includes("authorized")) {
            return `GPSPL provides regional authorized distributor support for ${name}, covering ${categories || "product supply"}, project-fit selection, procurement, installation coordination, warranty guidance and long-term support.`;
        }
        return `GPSPL helps enterprise buyers, consultants, dealers and IT/AV teams evaluate ${name} products across ${categories || "relevant product categories"}, shortlist compatible options, coordinate procurement, and connect the product requirement with installation, commissioning, training, warranty extension and AMC support.`;
    };

    const escapeHtml = (value) => String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    fetch("/data/cms/brands.json", { cache: "no-store" })
        .then((response) => response.json())
        .then((data) => {
            const brands = data.items || [];
            const brand = brands.find((item) => item.slug === requestedSlug || slugify(item.name) === requestedSlug) || brands[0];
            if (brand) setBrand(brand);
        })
        .catch(() => {
            setText("brandSummary", "Brand information could not be loaded. Please contact GPSPL for product guidance and pricing.");
        });
}());
