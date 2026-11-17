/**
 * GPSPL Cookie Consent Architecture (DPDP & GDPR Compliant)
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'gpspl_cookie_consent_v1';

    function deleteAnalyticsCookies() {
        try {
            const cookies = document.cookie.split(';');
            const domain = window.location.hostname;
            const domainParts = domain.split('.');
            const baseDomain = domainParts.length > 2 ? domainParts.slice(-2).join('.') : domain;

            cookies.forEach(c => {
                const name = c.split('=')[0].trim();
                if (/^_ga|^_gid|^_gat|^_clck|^_clsk/i.test(name)) {
                    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                    document.cookie = `${name}=; Path=/; Domain=.${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                    if (baseDomain !== domain) {
                        document.cookie = `${name}=; Path=/; Domain=.${baseDomain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                    }
                }
            });
        } catch (_) {}
    }

    function createOrShowBanner() {
        let banner = document.getElementById('gpsplCookieBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.className = 'gpspl-cookie-banner';
            banner.id = 'gpsplCookieBanner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-label', 'Cookie Consent');
            banner.innerHTML = `
                <div class="gpspl-cookie-header">
                    <i class="fas fa-shield-halved" aria-hidden="true"></i>
                    <h4>Privacy &amp; Cookie Preferences</h4>
                </div>
                <p class="gpspl-cookie-text">
                    We use strictly necessary cookies for security and core navigation. We also request consent for Google Analytics to measure visitor journeys in accordance with India's DPDP Act and our <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.
                </p>
                <div class="gpspl-cookie-actions">
                    <button type="button" class="gpspl-cookie-btn gpspl-cookie-btn-accept" id="gpsplCookieAccept">Accept All</button>
                    <button type="button" class="gpspl-cookie-btn gpspl-cookie-btn-decline" id="gpsplCookieDecline">Essential Only</button>
                </div>
            `;
            document.body.appendChild(banner);

            const acceptBtn = document.getElementById('gpsplCookieAccept');
            const declineBtn = document.getElementById('gpsplCookieDecline');

            if (acceptBtn) acceptBtn.addEventListener('click', () => setConsent('accepted'));
            if (declineBtn) declineBtn.addEventListener('click', () => setConsent('declined'));
        }

        setTimeout(() => {
            banner.classList.add('active');
        }, 100);
    }

    function hideBanner() {
        const banner = document.getElementById('gpsplCookieBanner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 400);
        }
        // Also hide static banner if present
        const staticBanner = document.getElementById('gpspl-cookie-banner');
        if (staticBanner) {
            staticBanner.style.display = 'none';
        }
    }

    function setConsent(status) {
        try {
            localStorage.setItem(STORAGE_KEY, status);
        } catch (_) {}

        hideBanner();

        if (status === 'declined') {
            deleteAnalyticsCookies();
        }

        // Dispatch unified event
        window.dispatchEvent(new CustomEvent('gpspl:cookie_consent_changed', { detail: { consent: status } }));

        if (status === 'accepted' && window.dataLayer) {
            window.dataLayer.push({ event: 'cookie_consent_given' });
        }
    }

    // Expose Global Preference Manager
    window.gpsplGetCookieConsent = function() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (_) {
            return null;
        }
    };

    window.gpsplOpenCookiePreferences = function() {
        createOrShowBanner();
    };

    window.gpsplWithdrawCookieConsent = function() {
        setConsent('declined');
    };

    function initCookieConsent() {
        // Also bind static elements if present in HTML
        const staticAccept = document.getElementById('gpspl-cookie-accept');
        const staticDecline = document.getElementById('gpspl-cookie-manage');
        if (staticAccept) staticAccept.addEventListener('click', () => setConsent('accepted'));
        if (staticDecline) staticDecline.addEventListener('click', () => setConsent('declined'));

        const consent = window.gpsplGetCookieConsent();
        if (consent === 'accepted' || consent === 'declined') {
            return; // Already responded
        }

        // Show banner after brief delay
        setTimeout(createOrShowBanner, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
})();
