(function () {
    "use strict";

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateScrollProgress() {
        const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        root.style.setProperty("--gpspl-scroll", Math.min(1, window.scrollY / available).toFixed(4));
    }

    let scrollTicking = false;
    window.addEventListener("scroll", () => {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            scrollTicking = false;
        });
    }, { passive: true });
    updateScrollProgress();

    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".site-header a[href]").forEach((link) => {
        try {
            const path = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
            if (path === currentPath) link.setAttribute("aria-current", "page");
        } catch (_) {}
    });

    const hero = document.getElementById("home");
    if (hero && !reduceMotion) {
        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
            hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        }, { passive: true });
    }

    if (hero?.classList.contains("gpspl-editorial-hero")) {
        const homepageOrder = [
            document.querySelector(".home-case-study-preview"),
            document.getElementById("services"),
            document.getElementById("about"),
            document.getElementById("featured-products"),
            document.getElementById("industries"),
            document.getElementById("solution-architecture"),
            document.getElementById("home-milestones"),
            document.getElementById("partners"),
            document.getElementById("testimonials"),
            document.getElementById("technology-distribution"),
            document.getElementById("home-insights"),
            document.getElementById("instant-boq-planner"),
            document.getElementById("faq-preview")
        ].filter(Boolean);
        let anchor = hero;
        homepageOrder.forEach((section) => {
            anchor.after(section);
            anchor = section;
        });

        const industryHeadings = {
            corporate: "Boardrooms designed around the way teams actually meet",
            education: "Teaching technology that stays clear from every row",
            hospitality: "Guest-facing AV that respects the room around it",
            government: "Mission-critical rooms built for continuous visibility",
            healthcare: "Clear clinical visuals where detail cannot be missed",
            retail: "Digital signage planned for attention, content and upkeep",
            "real-estate": "Experience centres that make the property easier to understand",
            banking: "Secure collaboration and data visibility for financial teams",
            media: "Production rooms built around fast, accurate creative work",
            automotive: "Showroom technology that keeps the product centre stage"
        };
        Object.entries(industryHeadings).forEach(([key, heading]) => {
            const title = document.querySelector(`[data-industry-panel="${key}"] h3`);
            if (title) title.textContent = heading;
        });
    }

    const showcase = document.querySelector("[data-project-showcase]");
    if (showcase) {
        const shots = Array.from(showcase.querySelectorAll("[data-shot]"));
        const buttons = Array.from(showcase.querySelectorAll("[data-shot-button]"));
        let activeShot = 0;
        let showcaseTimer;

        const showShot = (index) => {
            activeShot = (index + shots.length) % shots.length;
            shots.forEach((shot, shotIndex) => shot.classList.toggle("is-active", shotIndex === activeShot));
            buttons.forEach((button, buttonIndex) => {
                button.classList.toggle("is-active", buttonIndex === activeShot);
                button.setAttribute("aria-pressed", buttonIndex === activeShot ? "true" : "false");
            });
        };

        const startShowcase = () => {
            if (reduceMotion || shots.length < 2) return;
            window.clearInterval(showcaseTimer);
            showcaseTimer = window.setInterval(() => showShot(activeShot + 1), 5200);
        };

        buttons.forEach((button, index) => button.addEventListener("click", () => {
            showShot(index);
            startShowcase();
        }));
        showcase.addEventListener("mouseenter", () => window.clearInterval(showcaseTimer));
        showcase.addEventListener("mouseleave", startShowcase);
        showShot(0);
        startShowcase();
    }

    const projectSets = {
        healthcare: [
            ["/assests/images/projects/2026-showcase/healthcare-clinical-display.webp", "Healthcare", "Clinical display and consultation technology"],
            ["/assests/images/projects/gpspl-real/polished/dentistry-clinic-display.webp", "Consultation", "Visual detail where accuracy matters"],
            ["/assests/images/projects/gpspl-real/polished/clinic-treatment-room-clean.webp", "Treatment room", "Technology fitted around the clinical workflow"]
        ],
        hospitality: [
            ["/assests/images/projects/gpspl-real/polished/hospitality-restaurant-av.webp", "Hospitality", "Audio integrated into the dining experience"],
            ["/assests/images/projects/2026-showcase/hospitality-lounge-led-wall.webp", "Large-format display", "An LED wall that belongs in the room"],
            ["/assests/images/projects/2026-showcase/hospitality-guest-lounge-av.webp", "Guest lounge", "Technology that works with the interior"]
        ],
        led: [
            ["/assests/images/projects/gpspl-real/polished/active-led-mall-atrium-cover.jpeg", "Active LED", "A landmark display inside a live mall"],
            ["/assests/images/projects/2026-showcase/temple-active-led-installation.webp", "Architectural LED", "High-impact imagery in a heritage setting"],
            ["/assests/images/projects/gpspl-real/polished/direct-video-wall-install.webp", "Installation", "The technical work behind the finished wall"]
        ],
        workplace: [
            ["/assests/images/projects/more-site-gallery/large-boardroom-av.jpeg", "Workplace", "A boardroom built around every seat"],
            ["/assests/images/projects/2026-showcase/executive-boardroom-collaboration.webp", "Collaboration", "A clean room for clear decisions"],
            ["/assests/images/projects/gpspl-real/polished/av-rack-infrastructure.webp", "Infrastructure", "The systems behind reliable daily use"]
        ],
        education: [
            ["/assests/images/projects/more-site-gallery/training-room-wide-display.jpeg", "Training room", "Three displays, one clear lesson"],
            ["/assests/images/projects/gpspl-real/polished/direct-education-classroom-panels.webp", "Classroom", "Interactive teaching across the room"],
            ["/assests/images/projects/gpspl-real/polished/education-classroom-interactive-panels.webp", "Learning", "Display technology planned for participation"]
        ],
        residential: [
            ["/assests/images/projects/gpspl-real/polished/direct-real-estate-residential-av.webp", "Residential", "AV integrated into the interior"],
            ["/assests/images/projects/gpspl-real/polished/real-estate-residential-av.webp", "Living space", "Technology placed around the room"],
            ["/assests/images/projects/gpspl-real/polished/conference-room-screen-clean.webp", "Presentation", "A focused room with a simple interface"]
        ]
    };

    const path = window.location.pathname.toLowerCase();
    const shouldAddProjectRail = !/privacy|terms|thank-you|404|careers/.test(path);
    const footer = document.getElementById("footer-container");
    if (footer && shouldAddProjectRail && !document.querySelector(".gpspl-project-rail")) {
        const key = /health|hospital|clinic/.test(path) ? "healthcare"
            : /hotel|hospitality|auditorium/.test(path) ? "hospitality"
            : /education|classroom|training|lecture/.test(path) ? "education"
            : /real-estate|residential|experience-center/.test(path) ? "residential"
            : /led|video-wall|signage|retail|temple/.test(path) ? "led"
            : "workplace";
        const cards = projectSets[key];
        const rail = document.createElement("section");
        rail.className = "gpspl-project-rail";
        rail.setAttribute("aria-labelledby", "gpspl-project-rail-title");
        rail.innerHTML = `
            <div class="container">
                <div class="gpspl-project-rail-head gpspl-reveal">
                    <div>
                        <p>Selected project photography · GPSPL</p>
                        <h2 id="gpspl-project-rail-title">Real spaces. Finished work.</h2>
                    </div>
                    <a href="/featured-projects">Explore project work →</a>
                </div>
                <div class="gpspl-project-rail-grid">
                    ${cards.map(([image, label, title]) => `
                        <a class="gpspl-project-rail-card gpspl-reveal" href="/featured-projects">
                            <img src="${image}" alt="${title}" loading="lazy" decoding="async">
                            <div><small>${label}</small><h3>${title}</h3></div>
                        </a>`).join("")}
                </div>
            </div>`;
        footer.before(rail);
    }

    const revealItems = document.querySelectorAll(".gpspl-reveal, main > section .section-title, main > section .section-heading-row");
    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
        revealItems.forEach((item) => {
            item.classList.add("gpspl-reveal");
            revealObserver.observe(item);
        });
    }

    const startedForms = new WeakSet();
    const submittedForms = new WeakSet();
    const fieldNames = new WeakMap();

    document.addEventListener("focusin", (event) => {
        const field = event.target.closest("form input, form select, form textarea");
        if (!field || ["hidden", "submit", "button"].includes(field.type)) return;
        const form = field.form;
        if (!form) return;

        if (!startedForms.has(form)) {
            startedForms.add(form);
            fieldNames.set(form, new Set());
            window.gpsplTrack?.("lead_form_start", {
                form_id: form.id || form.getAttribute("name") || "website_form",
                page_path: window.location.pathname
            });
        }

        fieldNames.get(form)?.add(field.name || field.id || "unnamed_field");
    }, { capture: true });

    document.addEventListener("submit", (event) => {
        if (event.target instanceof HTMLFormElement) submittedForms.add(event.target);
    }, { capture: true });

    window.addEventListener("pagehide", () => {
        document.querySelectorAll("form").forEach((form) => {
            if (!startedForms.has(form) || submittedForms.has(form)) return;
            window.gpsplTrack?.("lead_form_abandon", {
                form_id: form.id || form.getAttribute("name") || "website_form",
                fields_touched: fieldNames.get(form)?.size || 0,
                page_path: window.location.pathname
            });
        });
    });
}());
