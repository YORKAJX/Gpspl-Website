(function () {
    "use strict";

    const config = window.GPSPL_CONFIG || {};
    const siteUrl = (config.siteUrl || "https://gpspl.co.in").replace(/\/$/, "");
    const startedAt = new Date().toISOString();
    const dataLayer = window.dataLayer = window.dataLayer || [];
    let lastTrackedPath = "";

    function normalizeEventName(name) {
        return String(name || "gpspl_event").replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
    }

    function pageTitle() {
        return document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || document.title || "GPSPL";
    }

    function pageType() {
        const file = window.location.pathname.split("/").pop() || "index.html";
        if (file === "index.html") return "home";
        if (file.includes("contact")) return "contact";
        if (file.includes("project") || file.includes("case-studies")) return "work";
        if (file.includes("partners") || file.includes("brand")) return "partners";
        if (document.querySelector("[data-service-page], .service-page, .solution-page-hero")) return "solution";
        return "page";
    }

    function pageContext(extra = {}) {
        return {
            page_title: pageTitle(),
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_type: pageType(),
            product: document.querySelector("[data-product-name]")?.dataset.productName || pageTitle(),
            timestamp: new Date().toISOString(),
            ...extra
        };
    }

    function injectScript(src, attrs = {}) {
        if (!src || document.querySelector(`script[src="${src}"]`)) return;
        const script = document.createElement("script");
        script.async = true;
        script.src = src;
        Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
        document.head.appendChild(script);
    }

    function initGtm() {
        if (!config.googleTagManagerId) return;
        dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.googleTagManagerId)}`);
    }

    function initGa4() {
        if (!config.ga4MeasurementId) return;
        injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4MeasurementId)}`);
        window.gtag = window.gtag || function () { dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", config.ga4MeasurementId, { send_page_view: false });
    }

    function initClarity() {
        if (!config.microsoftClarityProjectId) return;
        window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
        injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(config.microsoftClarityProjectId)}`);
    }

    function initVercelAnalytics() {
        if (config.vercelAnalytics === false) return;
        injectScript("/_vercel/insights/script.js", { defer: "defer" });
    }

    function track(eventName, params = {}) {
        const event = normalizeEventName(eventName);
        const payload = pageContext(params);
        dataLayer.push({ event, ...payload });
        if (typeof window.gtag === "function") window.gtag("event", event, payload);
        if (typeof window.clarity === "function") window.clarity("event", event);
        document.dispatchEvent(new CustomEvent("gpspl:analytics-event", { detail: { event, payload } }));
    }

    function trackPageView(force = false) {
        const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (!force && path === lastTrackedPath) return;
        lastTrackedPath = path;
        track("page_view", {
            page_referrer: document.referrer || "",
            session_started_at: startedAt
        });
    }

    function patchNavigationTracking() {
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        history.pushState = function () {
            originalPushState.apply(this, arguments);
            window.setTimeout(() => trackPageView(), 0);
        };
        history.replaceState = function () {
            originalReplaceState.apply(this, arguments);
            window.setTimeout(() => trackPageView(), 0);
        };
        window.addEventListener("popstate", () => trackPageView());
        window.addEventListener("hashchange", () => trackPageView());
    }

    function linkKind(anchor) {
        const href = anchor.getAttribute("href") || "";
        const text = (anchor.textContent || anchor.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
        const lowerText = text.toLowerCase();
        const lowerHref = href.toLowerCase();

        if (lowerHref.startsWith("tel:")) return ["call_button_click", { phone: href.replace(/^tel:/i, "") }];
        if (lowerHref.startsWith("mailto:")) return ["email_click", { email: href.replace(/^mailto:/i, "").split("?")[0] }];
        if (lowerHref.includes("wa.me") || lowerHref.includes("whatsapp.com/send") || lowerHref.includes("api.whatsapp.com")) {
            return ["whatsapp_click", { whatsapp_url: href }];
        }
        if (anchor.hasAttribute("download") || /\.(pdf|docx?|xlsx?|pptx?)(\?|#|$)/i.test(lowerHref)) {
            const subtype = lowerHref.includes("brochure") ? "brochure" : lowerHref.includes("datasheet") ? "datasheet" : "file";
            return ["download_click", { download_type: subtype, file_url: href }];
        }
        if (lowerText.includes("request quote") || lowerText.includes("get quote")) return ["get_quote_click", { cta_text: text, cta_url: href }];
        if (lowerText.includes("consultation") || lowerText.includes("talk to") || lowerText.includes("expert")) return ["navigation_cta_click", { cta_text: text, cta_url: href }];
        if (lowerText.includes("enquiry") || lowerText.includes("inquiry")) return ["product_enquiry_click", { cta_text: text, cta_url: href }];
        if (lowerHref.includes("/contact.html")) return ["navigation_cta_click", { cta_text: text || "Contact", cta_url: href }];
        try {
            const url = new URL(href, window.location.href);
            if (url.origin !== window.location.origin && !lowerHref.startsWith("#")) {
                return ["outbound_link_click", { link_url: url.href, link_domain: url.hostname, link_text: text }];
            }
        } catch (_) {
            return null;
        }
        return null;
    }

    function bindClickTracking() {
        document.addEventListener("click", (event) => {
            const anchor = event.target.closest("a[href]");
            if (anchor) {
                const match = linkKind(anchor);
                if (match) track(match[0], match[1]);
                return;
            }

            const button = event.target.closest("button");
            if (!button) return;
            const text = (button.textContent || button.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
            const lowerText = text.toLowerCase();
            if (lowerText.includes("quote")) track("get_quote_click", { cta_text: text });
            else if (lowerText.includes("submit") || lowerText.includes("send")) track("contact_form_submit_click", { cta_text: text });
        }, { capture: true });
    }

    function bindFormTracking() {
        document.addEventListener("submit", (event) => {
            const form = event.target.closest("form");
            if (!form) return;
            track("contact_form_submit_attempt", {
                form_name: form.getAttribute("name") || form.id || "lead_form",
                form_source: form.dataset.leadForm || "Website enquiry"
            });
        }, { capture: true });

        document.addEventListener("gpspl:lead-form-success", (event) => {
            track("contact_form_submit_success", event.detail || {});
        });
        document.addEventListener("gpspl:lead-form-error", (event) => {
            track("contact_form_submit_failed", event.detail || {});
        });
    }

    function bindScrollDepthTracking() {
        const milestones = [25, 50, 75, 90];
        const tracked = new Set();
        let ticking = false;

        function readScrollDepth() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const percent = Math.min(100, Math.round((scrollTop / scrollable) * 100));

            milestones.forEach(milestone => {
                if (percent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    track("scroll_depth", { scroll_percent: milestone });
                }
            });
            ticking = false;
        }

        window.addEventListener("scroll", () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(readScrollDepth);
        }, { passive: true });
    }

    function improveAccessibility() {
        document.querySelectorAll("a[href^='tel:']:not([aria-label])").forEach(link => link.setAttribute("aria-label", `Call GPSPL at ${link.textContent.trim()}`));
        document.querySelectorAll("a[href^='mailto:']:not([aria-label])").forEach(link => link.setAttribute("aria-label", `Email GPSPL at ${link.textContent.trim()}`));
        document.querySelectorAll("a[href*='wa.me']:not([aria-label]), a[href*='whatsapp.com']:not([aria-label])").forEach(link => link.setAttribute("aria-label", "Chat with GPSPL on WhatsApp"));
        document.querySelectorAll("img:not([alt])").forEach(img => img.alt = "GPSPL technology solution image");
        document.querySelectorAll("img:not([loading])").forEach(img => img.loading = "lazy");
        document.querySelectorAll("img:not([decoding])").forEach(img => img.decoding = "async");
    }

    window.gpsplTrack = track;

    initGtm();
    initGa4();
    initClarity();
    initVercelAnalytics();
    patchNavigationTracking();

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            improveAccessibility();
            bindClickTracking();
            bindFormTracking();
            bindScrollDepthTracking();
            trackPageView(true);
        });
    } else {
        improveAccessibility();
        bindClickTracking();
        bindFormTracking();
        bindScrollDepthTracking();
        trackPageView(true);
    }
}());
