const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const analyticsCode = fs.readFileSync('JS/analytics.js', 'utf8');

function createClickTestEnv() {
    const eventLog = [];
    let clickListener = null;

    const document = {
        readyState: 'complete',
        addEventListener(event, fn) {
            if (event === 'click') clickListener = fn;
        },
        dispatchEvent(event) {
            eventLog.push(event);
        },
        querySelectorAll: () => [],
        querySelector: () => null,
        createElement: (tag) => ({ tagName: tag.toUpperCase(), setAttribute() {} }),
        head: { appendChild() {} },
        body: { appendChild() {} }
    };

    const window = {
        location: { hostname: 'gpspl.co.in', href: 'https://gpspl.co.in/', pathname: '/' },
        screen: { width: 1920, height: 1080 },
        innerWidth: 1920,
        innerHeight: 1080,
        navigator: { userAgent: 'Mozilla/5.0 Chrome/120.0', language: 'en-US' },
        localStorage: {
            getItem(key) {
                if (key === 'gpspl_cookie_consent_v1') return 'accepted';
                return null;
            },
            setItem() {},
            removeItem() {}
        },
        sessionStorage: { getItem() { return null; }, setItem() {} },
        dataLayer: [],
        gtag: function(cmd, eventName, payload) {
            eventLog.push({ type: 'gtag', cmd, eventName, payload });
        },
        clarity: function() {},
        document: document,
        addEventListener() {},
        dispatchEvent() {},
        CustomEvent: class { constructor(t, o) { this.type = t; this.detail = o?.detail; } },
        history: { pushState() {}, replaceState() {} },
        setTimeout: () => {},
        clearTimeout: () => {},
        setInterval: () => {},
        clearInterval: () => {}
    };

    const sandbox = {
        window,
        document,
        navigator: window.navigator,
        localStorage: window.localStorage,
        sessionStorage: window.sessionStorage,
        location: window.location,
        CustomEvent: window.CustomEvent,
        history: window.history,
        URLSearchParams,
        Intl,
        setTimeout: () => {},
        clearTimeout: () => {},
        setInterval: () => {},
        clearInterval: () => {},
        console
    };

    vm.runInNewContext(analyticsCode, sandbox);

    return { clickListener, eventLog };
}

const { clickListener, eventLog } = createClickTestEnv();
assert.ok(clickListener, "Click listener must be registered on document");

// Test 1: Click on WhatsApp link
const waAnchor = {
    tagName: 'A',
    getAttribute(attr) {
        if (attr === 'href') return 'https://wa.me/918920830377?text=Hello%20GPSPL';
        return null;
    },
    closest(selector) {
        if (selector.includes('a')) return this;
        return null;
    }
};

clickListener({ target: waAnchor });
const waEvent = eventLog.find(e => e.eventName === 'whatsapp_lead_click');
assert.ok(waEvent, "WhatsApp click event must be tracked");
assert.equal(waEvent.payload.whatsapp_destination, "GPSPL business WhatsApp");
console.log("✔ PASS: WhatsApp click event tracked with destination parameters");

// Test 2: Click on Phone link
const telAnchor = {
    tagName: 'A',
    getAttribute(attr) {
        if (attr === 'href') return 'tel:+918920830377';
        return null;
    },
    closest(selector) {
        if (selector.includes('a')) return this;
        return null;
    }
};

clickListener({ target: telAnchor });
const telEvent = eventLog.find(e => e.eventName === 'call_button_click');
assert.ok(telEvent, "Phone click event must be tracked");
assert.equal(telEvent.payload.phone_number, "+918920830377");
console.log("✔ PASS: Phone click event tracked with sanitized telephone number");

console.log("ALL LEAD TELEMETRY CLICK TESTS PASSED!");
