const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const analyticsCode = fs.readFileSync('JS/analytics.js', 'utf8');
const cookieConsentCode = fs.readFileSync('JS/cookie-consent.js', 'utf8');

function createBrowserEnvironment(initialLocalStorage = {}, hostname = 'gpspl.co.in') {
    const storage = { ...initialLocalStorage };
    const injectedScripts = [];
    const eventLog = [];
    const listeners = {};
    const dataLayer = [];
    let cookies = 'initial_test_cookie=1; _ga=GA1.2.3456; _gid=GA1.2.789;';

    const document = {
        readyState: 'complete',
        cookie: cookies,
        head: {
            appendChild(node) {
                if (node.tagName === 'SCRIPT') injectedScripts.push(node.src);
            }
        },
        body: {
            appendChild(node) {}
        },
        createElement(tag) {
            return {
                tagName: tag.toUpperCase(),
                src: '',
                setAttribute(k, v) { this[k] = v; },
                classList: { add() {}, remove() {} }
            };
        },
        querySelector(selector) {
            return null;
        },
        getElementById(id) {
            return null;
        },
        addEventListener(event, fn) {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
        },
        dispatchEvent(event) {
            eventLog.push({ type: event.type, detail: event.detail });
            (listeners[event.type] || []).forEach(fn => fn(event));
        }
    };

    const window = {
        location: {
            hostname: hostname,
            href: `https://${hostname}/`,
            pathname: '/',
            search: ''
        },
        screen: { width: 1920, height: 1080 },
        innerWidth: 1920,
        innerHeight: 1080,
        navigator: {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            language: 'en-US'
        },
        localStorage: {
            getItem(key) { return storage[key] || null; },
            setItem(key, val) { storage[key] = String(val); },
            removeItem(key) { delete storage[key]; }
        },
        sessionStorage: {
            getItem(key) { return null; },
            setItem(key, val) {}
        },
        dataLayer: dataLayer,
        gtag: function(cmd, ...args) {
            eventLog.push({ type: 'gtag', cmd, args });
        },
        clarity: function(...args) {
            eventLog.push({ type: 'clarity', args });
        },
        document: document,
        addEventListener(event, fn) {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
        },
        dispatchEvent(event) {
            eventLog.push({ type: event.type, detail: event.detail });
            (listeners[event.type] || []).forEach(fn => fn(event));
        },
        CustomEvent: class {
            constructor(type, opts = {}) {
                this.type = type;
                this.detail = opts.detail;
            }
        },
        Date: Date,
        Math: Math,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval,
        clearInterval,
        setInterval: setInterval,
        clearInterval: clearInterval
    };

    window.window = window;

    const sandbox = {
        window,
        document,
        navigator: window.navigator,
        localStorage: window.localStorage,
        sessionStorage: window.sessionStorage,
        location: window.location,
        history: { pushState() {}, replaceState() {} },
        CustomEvent: window.CustomEvent,
        URLSearchParams,
        Intl,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        console
    };

    return { sandbox, window, injectedScripts, eventLog, storage };
}

console.log("=== EXECUTING COOKIE CONSENT TEST SCENARIOS ===");

// SCENARIO 1: First visit without consent
{
    const env = createBrowserEnvironment({});
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    assert.equal(env.injectedScripts.length, 0, "Scenario 1 FAIL: Scripts must NOT be injected on first visit without consent");
    const gtagEvents = env.eventLog.filter(e => e.type === 'gtag' && e.cmd === 'event');
    assert.equal(gtagEvents.length, 0, "Scenario 1 FAIL: No GA4 events must fire without consent");
    console.log("✔ Scenario 1 PASS: First visit without consent blocks GA4/Clarity scripts and events.");
}

// SCENARIO 2: Accept analytics
{
    const env = createBrowserEnvironment({});
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    // Simulate clicking accept via cookie-consent architecture
    env.window.localStorage.setItem('gpspl_cookie_consent_v1', 'accepted');
    env.window.dispatchEvent(new env.window.CustomEvent('gpspl:cookie_consent_changed', { detail: { consent: 'accepted' } }));

    assert.ok(env.injectedScripts.some(s => s.includes('gtag/js')), "Scenario 2 FAIL: GA4 script must be injected after acceptance");
    const pageViews = env.eventLog.filter(e => e.type === 'gtag' && e.args && e.args[0] === 'page_view');
    assert.equal(pageViews.length, 1, "Scenario 2 FAIL: Exactly one page_view event must fire upon acceptance");
    console.log("✔ Scenario 2 PASS: Explicit acceptance injects GA4 script and fires initial page_view.");
}

// SCENARIO 3: Reject analytics
{
    const env = createBrowserEnvironment({});
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    // Simulate clicking decline
    env.window.dispatchEvent(new env.window.CustomEvent('gpspl:cookie_consent_changed', { detail: { consent: 'declined' } }));

    assert.equal(env.injectedScripts.length, 0, "Scenario 3 FAIL: Scripts must NOT be injected after rejection");
    const gtagEvents = env.eventLog.filter(e => e.type === 'gtag' && e.cmd === 'event');
    assert.equal(gtagEvents.length, 0, "Scenario 3 FAIL: No GA4 events must fire after rejection");
    console.log("✔ Scenario 3 PASS: Rejection keeps analytics completely dormant.");
}

// SCENARIO 4: Refresh after acceptance
{
    const env = createBrowserEnvironment({ 'gpspl_cookie_consent_v1': 'accepted' });
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    assert.ok(env.injectedScripts.some(s => s.includes('gtag/js')), "Scenario 4 FAIL: GA4 script must initialize on refresh if previously accepted");
    const pageViews = env.eventLog.filter(e => e.type === 'gtag' && e.args && e.args[0] === 'page_view');
    assert.equal(pageViews.length, 1, "Scenario 4 FAIL: Exactly one page_view event on load");
    console.log("✔ Scenario 4 PASS: Returning accepted visitor automatically initializes analytics without duplicate events.");
}

// SCENARIO 5: Refresh after rejection
{
    const env = createBrowserEnvironment({ 'gpspl_cookie_consent_v1': 'declined' });
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    assert.equal(env.injectedScripts.length, 0, "Scenario 5 FAIL: Scripts must NOT initialize on refresh if previously declined");
    const gtagEvents = env.eventLog.filter(e => e.type === 'gtag' && e.cmd === 'event');
    assert.equal(gtagEvents.length, 0, "Scenario 5 FAIL: No events on refresh after rejection");
    console.log("✔ Scenario 5 PASS: Returning declined visitor remains completely untracked.");
}

// SCENARIO 6: Withdraw consent
{
    const env = createBrowserEnvironment({ 'gpspl_cookie_consent_v1': 'accepted' });
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    // Initial state has GA4 loaded
    assert.ok(env.injectedScripts.some(s => s.includes('gtag/js')));

    // User withdraws consent via helper
    env.window.gpsplWithdrawCookieConsent();

    assert.equal(env.storage['gpspl_cookie_consent_v1'], 'declined', "Scenario 6 FAIL: Storage must update to declined");
    assert.equal(env.window['ga-disable-G-DWG4ZQNV0W'], true, "Scenario 6 FAIL: GA disable flag must be set to true");
    console.log("✔ Scenario 6 PASS: Consent withdrawal sets ga-disable flag and persists rejection.");
}

// SCENARIO 7: Change from rejection to acceptance
{
    const env = createBrowserEnvironment({ 'gpspl_cookie_consent_v1': 'declined' });
    vm.runInNewContext(cookieConsentCode, env.sandbox);
    vm.runInNewContext(analyticsCode, env.sandbox);

    assert.equal(env.injectedScripts.length, 0);

    // User changes mind to accepted
    env.window.localStorage.setItem('gpspl_cookie_consent_v1', 'accepted');
    env.window.dispatchEvent(new env.window.CustomEvent('gpspl:cookie_consent_changed', { detail: { consent: 'accepted' } }));

    assert.ok(env.injectedScripts.some(s => s.includes('gtag/js')), "Scenario 7 FAIL: GA4 script must load after switching from declined to accepted");
    const pageViews = env.eventLog.filter(e => e.type === 'gtag' && e.args && e.args[0] === 'page_view');
    assert.equal(pageViews.length, 1, "Scenario 7 FAIL: Exactly one page_view event on switch");
    console.log("✔ Scenario 7 PASS: Switching from rejection to acceptance activates tracking cleanly.");
}

console.log("\nALL 7 COOKIE CONSENT SCENARIOS PASSED WITH ZERO ERRORS!");
