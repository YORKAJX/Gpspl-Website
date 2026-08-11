(function () {
    "use strict";

    const config = window.GPSPL_CONFIG || {};
    const siteUrl = (config.siteUrl || "https://gpspl.co.in").replace(/\/$/, "");
    const dataLayer = window.dataLayer = window.dataLayer || [];
    const SESSION_STORAGE_KEY = "gpspl_session_data_v2";
    const VISITOR_STORAGE_KEY = "gpspl_visitor_profile_v2";
    const SESSION_TRAIL_KEY = "gpspl_journey_trail_v2";

    // 1. Generate or Retrieve Persistent Visitor ID & Visit Count
    function getVisitorProfile() {
        let profile = null;
        try {
            const raw = localStorage.getItem(VISITOR_STORAGE_KEY);
            if (raw) profile = JSON.parse(raw);
        } catch (_) {}

        if (!profile || !profile.visitor_id) {
            profile = {
                visitor_id: "gpspl_u_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36),
                first_seen: new Date().toISOString(),
                total_visits: 1,
                last_seen: new Date().toISOString()
            };
        } else {
            profile.last_seen = new Date().toISOString();
            // Check if new session (>30 mins since last seen)
            const lastSeenTime = new Date(profile.last_seen_timestamp || 0).getTime();
            if (Date.now() - lastSeenTime > 30 * 60 * 1000) {
                profile.total_visits = (profile.total_visits || 1) + 1;
            }
        }
        profile.last_seen_timestamp = Date.now();

        try {
            localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(profile));
        } catch (_) {}

        return profile;
    }

    const visitorProfile = getVisitorProfile();

    // 2. Parse UTM & Traffic Attribution
    function parseTrafficSource() {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = document.referrer ? new URL(document.referrer) : null;
        
        let utmSource = urlParams.get("utm_source");
        let utmMedium = urlParams.get("utm_medium");
        let utmCampaign = urlParams.get("utm_campaign");
        let utmTerm = urlParams.get("utm_term");
        let utmContent = urlParams.get("utm_content");
        let gclid = urlParams.get("gclid"); // Google Ads
        let fbclid = urlParams.get("fbclid"); // Meta Ads

        let trafficType = "Direct";
        let referringDomain = referrer ? referrer.hostname : "Direct";

        if (gclid) {
            trafficType = "Google Ads (Paid Search)";
            utmSource = utmSource || "google";
            utmMedium = utmMedium || "cpc";
        } else if (fbclid) {
            trafficType = "Meta Ads (Paid Social)";
            utmSource = utmSource || "facebook";
            utmMedium = utmMedium || "paid_social";
        } else if (referrer) {
            if (referringDomain.includes("google.")) trafficType = "Google Organic Search";
            else if (referringDomain.includes("bing.")) trafficType = "Bing Organic";
            else if (referringDomain.includes("linkedin.")) trafficType = "LinkedIn Referral";
            else if (referringDomain.includes("instagram.") || referringDomain.includes("facebook.")) trafficType = "Social Media Referral";
            else if (referringDomain !== window.location.hostname) trafficType = "External Referral: " + referringDomain;
        }

        const attribution = {
            traffic_type: trafficType,
            referring_domain: referringDomain,
            referring_full_url: document.referrer || "Direct / Bookmark",
            utm_source: utmSource || "organic_direct",
            utm_medium: utmMedium || "none",
            utm_campaign: utmCampaign || "none",
            utm_term: utmTerm || "none",
            utm_content: utmContent || "none",
            gclid: gclid || "",
            fbclid: fbclid || ""
        };

        // Cache first touch in session storage
        try {
            if (!sessionStorage.getItem(SESSION_STORAGE_KEY)) {
                sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
                    entry_time: new Date().toISOString(),
                    landing_page: window.location.pathname,
                    ...attribution
                }));
            }
        } catch (_) {}

        return attribution;
    }

    const trafficAttribution = parseTrafficSource();

    // 3. Detect Device, Browser, OS, Screen, Timezone
    function getDeviceIntelligence() {
        const ua = navigator.userAgent || "";
        let device = "Desktop";
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) device = "Tablet";
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) device = "Mobile";

        let os = "Unknown OS";
        if (ua.indexOf("Win") !== -1) os = "Windows";
        else if (ua.indexOf("Mac") !== -1) os = "macOS";
        else if (ua.indexOf("Android") !== -1) os = "Android";
        else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) os = "iOS";
        else if (ua.indexOf("Linux") !== -1) os = "Linux";

        let browser = "Unknown Browser";
        if (ua.indexOf("Chrome") !== -1 && ua.indexOf("Edg") === -1 && ua.indexOf("OPR") === -1) browser = "Google Chrome";
        else if (ua.indexOf("Edg") !== -1) browser = "Microsoft Edge";
        else if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Apple Safari";
        else if (ua.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";

        let connectionSpeed = "unknown";
        if (navigator.connection && navigator.connection.effectiveType) {
            connectionSpeed = navigator.connection.effectiveType;
        }

        return {
            device_type: device,
            operating_system: os,
            browser_name: browser,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            visitor_language: navigator.language || "en",
            visitor_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
            connection_speed: connectionSpeed
        };
    }

    const deviceIntel = getDeviceIntelligence();

    // 4. Page Helper Functions
    function pageTitle() {
        return document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || document.title || "GPSPL";
    }

    function pageType() {
        const file = window.location.pathname.split("/").pop() || "index.html";
        if (file === "index.html" || window.location.pathname === "/") return "homepage";
        if (file.includes("contact")) return "contact_inquiry";
        if (file.includes("industries")) return "industry_hub";
        if (file.includes("project") || file.includes("case-studies")) return "case_studies_portfolio";
        if (file.includes("partners") || file.includes("brand")) return "oem_technology_partners";
        if (file.includes("resources") || file.includes("blog")) return "resources_knowledge_base";
        if (file.includes("careers")) return "careers_recruitment";
        if (document.querySelector("[data-service-page], .service-page, .solution-page-hero")) return "solution_service_landing";
        return "general_page";
    }

    // 5. Build Complete Visitor & Event Payload
    function fullPayload(extra = {}) {
        return {
            visitor_id: visitorProfile.visitor_id,
            visit_number: visitorProfile.total_visits,
            page_title: pageTitle(),
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_type: pageType(),
            product_context: document.querySelector("[data-product-name]")?.dataset.productName || pageTitle(),
            timestamp: new Date().toISOString(),
            ...trafficAttribution,
            ...deviceIntel,
            ...extra
        };
    }

    // 6. Record Journey Trail in LocalStorage (Full Client Visit History)
    function appendJourneyTrail(actionType, detail = {}) {
        try {
            let trail = [];
            const raw = localStorage.getItem(SESSION_TRAIL_KEY);
            if (raw) trail = JSON.parse(raw);
            if (!Array.isArray(trail)) trail = [];
            
            trail.push({
                time: new Date().toLocaleTimeString(),
                action: actionType,
                page: window.location.pathname,
                ...detail
            });

            // Keep last 40 user actions
            if (trail.length > 40) trail = trail.slice(-40);
            localStorage.setItem(SESSION_TRAIL_KEY, JSON.stringify(trail));
        } catch (_) {}
    }

    // 7. Core Dispatcher (Sends to GA4, GTM, Clarity & Global Event Bus)
    function track(eventName, params = {}) {
        const cleanEvent = String(eventName || "gpspl_event").replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
        const payload = fullPayload(params);

        // Append to local journey trail for lead forms
        appendJourneyTrail(cleanEvent, params);

        // Push to GTM DataLayer
        dataLayer.push({ event: cleanEvent, ...payload });

        // Dispatch to GA4
        if (typeof window.gtag === "function") {
            window.gtag("event", cleanEvent, payload);
        }

        // Dispatch to Microsoft Clarity
        if (typeof window.clarity === "function") {
            window.clarity("event", cleanEvent);
            window.clarity("set", "visitor_id", visitorProfile.visitor_id);
            window.clarity("set", "traffic_type", trafficAttribution.traffic_type);
        }

        // Custom DOM Event for internal components
        document.dispatchEvent(new CustomEvent("gpspl:analytics-event", { detail: { event: cleanEvent, payload } }));
    }

    // 8. Script Injector
    function injectScript(src, attrs = {}) {
        if (!src || document.querySelector(`script[src="${src}"]`)) return;
        const script = document.createElement("script");
        script.async = true;
        script.src = src;
        Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
        document.head.appendChild(script);
    }

    // 9. Initialize GA4 with Enhanced Config
    function initGa4() {
        const gaId = config.ga4MeasurementId || "G-DWG4ZQNV0W";
        if (!gaId) return;

        injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
        window.gtag = window.gtag || function () { dataLayer.push(arguments); };
        window.gtag("js", new Date());
        
        // Configure GA4 with User Properties & Granular Measurement
        window.gtag("config", gaId, {
            send_page_view: false, // We dispatch manually with rich custom dimensions
            cookie_flags: "SameSite=None;Secure",
            user_id: visitorProfile.visitor_id,
            user_properties: {
                visitor_type: visitorProfile.total_visits > 1 ? "Returning Visitor" : "New Visitor",
                total_visits: visitorProfile.total_visits,
                traffic_source: trafficAttribution.traffic_type,
                device_category: deviceIntel.device_type,
                screen_res: deviceIntel.screen_resolution
            }
        });
    }

    // 10. Initialize GTM
    function initGtm() {
        if (!config.googleTagManagerId) return;
        dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.googleTagManagerId)}`);
    }

    // 11. Initialize Microsoft Clarity (Session Recording & Heatmaps)
    function initClarity() {
        const clarityId = config.microsoftClarityProjectId;
        if (!clarityId) return;
        window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
        injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
    }

    // 12. Track Page Views with Path Diffing
    let lastTrackedPath = "";
    function trackPageView(force = false) {
        const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (!force && path === lastTrackedPath) return;
        lastTrackedPath = path;

        track("page_view", {
            page_referrer: document.referrer || "Direct",
            entry_landing_page: sessionStorage.getItem(SESSION_STORAGE_KEY) ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)).landing_page : window.location.pathname
        });
    }

    // 13. Single Page Navigation Listeners
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

    // 14. High-Intent Link & Interaction Categorization
    function linkKind(anchor) {
        const href = anchor.getAttribute("href") || "";
        const text = (anchor.textContent || anchor.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
        const lowerText = text.toLowerCase();
        const lowerHref = href.toLowerCase();

        // Direct Call Tracking
        if (lowerHref.startsWith("tel:")) {
            return ["call_button_click", {
                contact_method: "Phone Call",
                phone_number: href.replace(/^tel:/i, ""),
                cta_label: text || "Call GPSPL"
            }];
        }

        // WhatsApp Click Tracking
        if (lowerHref.includes("wa.me") || lowerHref.includes("whatsapp.com/send") || lowerHref.includes("api.whatsapp.com")) {
            return ["whatsapp_lead_click", {
                contact_method: "WhatsApp Chat",
                whatsapp_url: href,
                cta_label: text || "WhatsApp GPSPL"
            }];
        }

        // Email Link Tracking
        if (lowerHref.startsWith("mailto:")) {
            return ["email_link_click", {
                contact_method: "Email",
                email_address: href.replace(/^mailto:/i, "").split("?")[0],
                cta_label: text || "Email GPSPL"
            }];
        }

        // PDF Brochure / Datasheet Download Tracking
        if (anchor.hasAttribute("download") || /\.(pdf|docx?|xlsx?|pptx?)(\?|#|$)/i.test(lowerHref)) {
            const docType = lowerHref.includes("brochure") ? "Product Brochure" : lowerHref.includes("boq") ? "Sample BOQ" : "Technical Datasheet";
            return ["file_download", {
                file_type: docType,
                file_url: href,
                file_name: href.split("/").pop() || "document"
            }];
        }

        // High-Intent Quote / BOQ Buttons
        if (lowerText.includes("quote") || lowerText.includes("boq") || lowerText.includes("estimate") || lowerText.includes("pricing")) {
            return ["request_quote_click", {
                cta_label: text,
                cta_target_url: href,
                button_location: anchor.closest("header") ? "Header" : anchor.closest("footer") ? "Footer" : anchor.closest(".hero, .ind-hero") ? "Hero" : "Body Content"
            }];
        }

        // Consultation / Expert Call
        if (lowerText.includes("consultation") || lowerText.includes("talk to") || lowerText.includes("expert") || lowerText.includes("plan my")) {
            return ["expert_consultation_click", {
                cta_label: text,
                cta_target_url: href
            }];
        }

        // Outbound Partner Links (Sony, LG, Samsung, Poly, etc.)
        try {
            const url = new URL(href, window.location.href);
            if (url.origin !== window.location.origin && !lowerHref.startsWith("#") && !lowerHref.startsWith("javascript:")) {
                return ["outbound_partner_click", {
                    external_domain: url.hostname,
                    target_url: url.href,
                    link_text: text
                }];
            }
        } catch (_) {}

        return null;
    }

    // 15. Global Click Event Tracking
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

            if (lowerText.includes("quote") || lowerText.includes("boq")) {
                track("request_quote_click", { cta_label: text, element_type: "button" });
            } else if (lowerText.includes("submit") || lowerText.includes("send") || lowerText.includes("apply")) {
                track("lead_form_submit_button_click", { cta_label: text, element_type: "submit_button" });
            } else if (button.classList.contains("filter-btn") || button.hasAttribute("data-filter")) {
                track("portfolio_filter_click", { filter_category: button.dataset.filter || text });
            }
        }, { capture: true });
    }

    // 16. Granular Form Submission Tracking
    function bindFormTracking() {
        document.addEventListener("submit", (event) => {
            const form = event.target.closest("form");
            if (!form) return;
            
            const formId = form.id || form.getAttribute("name") || "contact_lead_form";
            const formData = new FormData(form);
            const userRequirement = formData.get("requirement") || formData.get("service") || formData.get("industry") || "General Enquiry";

            track("form_submit_attempt", {
                form_id: formId,
                form_type: formId.includes("career") ? "Job Application" : "B2B Sales Lead",
                requirement_category: String(userRequirement).substring(0, 100),
                journey_steps_count: (JSON.parse(localStorage.getItem(SESSION_TRAIL_KEY) || "[]")).length
            });
        }, { capture: true });

        document.addEventListener("gpspl:lead-form-success", (event) => {
            track("generate_lead", {
                lead_status: "SUCCESS",
                form_name: event.detail?.form_name || "Enterprise Lead Form",
                lead_type: event.detail?.lead_type || "B2B AV/IT Enquiry"
            });
        });

        document.addEventListener("gpspl:lead-form-error", (event) => {
            track("form_submit_failed", {
                lead_status: "ERROR",
                error_message: event.detail?.error || "Unknown validation/network error"
            });
        });
    }

    // 17. Scroll Depth Milestones (25%, 50%, 75%, 90%, 100%)
    function bindScrollDepthTracking() {
        const milestones = [25, 50, 75, 90, 100];
        const tracked = new Set();
        let ticking = false;

        function readScrollDepth() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const percent = Math.min(100, Math.round((scrollTop / scrollable) * 100));

            milestones.forEach(milestone => {
                if (percent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    track("scroll_depth_milestone", {
                        scroll_percentage: milestone,
                        content_height_px: document.documentElement.scrollHeight
                    });
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

    // 18. Time-on-Page & Engaged Reader Heartbeat (15s, 30s, 60s, 120s, 300s)
    function bindEngagementHeartbeat() {
        const timeIntervals = [15, 30, 60, 120, 300];
        let secondsSpent = 0;

        const timer = setInterval(() => {
            secondsSpent += 5;
            if (timeIntervals.includes(secondsSpent)) {
                track("user_engagement_time", {
                    engaged_seconds: secondsSpent,
                    is_long_dwell: secondsSpent >= 60
                });
            }
            if (secondsSpent > 600) clearInterval(timer);
        }, 5000);
    }

    // Expose Global Helper
    window.gpsplTrack = track;
    window.gpsplGetVisitorInfo = function () {
        return {
            profile: visitorProfile,
            attribution: trafficAttribution,
            device: deviceIntel,
            journey: JSON.parse(localStorage.getItem(SESSION_TRAIL_KEY) || "[]")
        };
    };

    // Initialize Subsystems
    initGtm();
    initGa4();
    initClarity();
    patchNavigationTracking();

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            bindClickTracking();
            bindFormTracking();
            bindScrollDepthTracking();
            bindEngagementHeartbeat();
            trackPageView(true);
        });
    } else {
        bindClickTracking();
        bindFormTracking();
        bindScrollDepthTracking();
        bindEngagementHeartbeat();
        trackPageView(true);
    }
}());
