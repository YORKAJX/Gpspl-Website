with open('JS/analytics.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add consent helpers near the top after constants
old_top = '''    const SESSION_STORAGE_KEY = "gpspl_session_data_v2";
    const VISITOR_STORAGE_KEY = "gpspl_visitor_profile_v2";
    const SESSION_TRAIL_KEY = "gpspl_journey_trail_v2";'''

new_top = '''    const SESSION_STORAGE_KEY = "gpspl_session_data_v2";
    const VISITOR_STORAGE_KEY = "gpspl_visitor_profile_v2";
    const SESSION_TRAIL_KEY = "gpspl_journey_trail_v2";
    const CONSENT_STORAGE_KEY = "gpspl_cookie_consent_v1";
    let isAnalyticsInitialized = false;

    function hasAnalyticsConsent() {
        try {
            return localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
        } catch (_) {
            return false;
        }
    }'''

assert old_top in code, "old_top not found"
code = code.replace(old_top, new_top, 1)

# 2. Update track function to gate external telemetry behind consent
old_track = '''        // Security & Quality Gate: Only send external telemetry from real humans on official production domains
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) {
            document.dispatchEvent(new CustomEvent("gpspl:analytics-event", { detail: { event: cleanEvent, payload } }));
            return;
        }'''

new_track = '''        // Privacy Gate: Strictly block external telemetry until explicit consent is given
        if (!hasAnalyticsConsent()) {
            document.dispatchEvent(new CustomEvent("gpspl:analytics-event", { detail: { event: cleanEvent, payload } }));
            return;
        }

        // Security & Quality Gate: Only send external telemetry from real humans on official production domains
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) {
            document.dispatchEvent(new CustomEvent("gpspl:analytics-event", { detail: { event: cleanEvent, payload } }));
            return;
        }'''

assert old_track in code, "old_track not found"
code = code.replace(old_track, new_track, 1)

# 3. Update initGa4, initGtm, initClarity
old_init_ga4 = '''    function initGa4() {
        // Enforce production domain & human visitor check
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) {
            return;
        }'''

new_init_ga4 = '''    function initGa4() {
        if (!hasAnalyticsConsent()) return;
        // Enforce production domain & human visitor check
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) {
            return;
        }'''

assert old_init_ga4 in code, "old_init_ga4 not found"
code = code.replace(old_init_ga4, new_init_ga4, 1)

old_init_gtm = '''    function initGtm() {
        if (!isProductionDomain() || isAutomatedBotOrCrawler() || !config.googleTagManagerId) return;'''

new_init_gtm = '''    function initGtm() {
        if (!hasAnalyticsConsent()) return;
        if (!isProductionDomain() || isAutomatedBotOrCrawler() || !config.googleTagManagerId) return;'''

assert old_init_gtm in code, "old_init_gtm not found"
code = code.replace(old_init_gtm, new_init_gtm, 1)

old_init_clarity = '''    function initClarity() {
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) return;'''

new_init_clarity = '''    function initClarity() {
        if (!hasAnalyticsConsent()) return;
        if (!isProductionDomain() || isAutomatedBotOrCrawler()) return;'''

assert old_init_clarity in code, "old_init_clarity not found"
code = code.replace(old_init_clarity, new_init_clarity, 1)

# 4. Update the bottom initialization and event listeners
old_bottom = '''    // Initialize Subsystems
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
    }'''

new_bottom = '''    // Privacy-Gated Subsystem Lifecycle
    function startAnalyticsIfConsented() {
        if (isAnalyticsInitialized) return;
        if (!hasAnalyticsConsent()) return;
        isAnalyticsInitialized = true;
        initGtm();
        initGa4();
        initClarity();
        trackPageView(true);
    }

    function disableAnalytics() {
        const gaId = config.ga4MeasurementId || "G-DWG4ZQNV0W";
        if (gaId) {
            window["ga-disable-" + gaId] = true;
        }
        isAnalyticsInitialized = false;
    }

    window.addEventListener("gpspl:cookie_consent_changed", (event) => {
        const status = event.detail?.consent;
        if (status === "accepted") {
            startAnalyticsIfConsented();
        } else if (status === "declined") {
            disableAnalytics();
        }
    });

    patchNavigationTracking();

    if (hasAnalyticsConsent()) {
        startAnalyticsIfConsented();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            bindClickTracking();
            bindFormTracking();
            bindScrollDepthTracking();
            bindEngagementHeartbeat();
            if (hasAnalyticsConsent()) {
                trackPageView(true);
            }
        });
    } else {
        bindClickTracking();
        bindFormTracking();
        bindScrollDepthTracking();
        bindEngagementHeartbeat();
        if (hasAnalyticsConsent()) {
            trackPageView(true);
        }
    }'''

assert old_bottom in code, "old_bottom not found"
code = code.replace(old_bottom, new_bottom, 1)

with open('JS/analytics.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated JS/analytics.js with strict consent gating!")
