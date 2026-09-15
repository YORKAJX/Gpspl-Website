/**
 * GPSPL Cookie Consent Banner (DPDP & GDPR Compliant)
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'gpspl_cookie_consent_v1';

    function initCookieConsent() {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (consent === 'accepted' || consent === 'declined') {
            return; // Already responded
        }

        // Create Banner DOM
        const banner = document.createElement('div');
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
                We use necessary cookies and analytics to ensure our enterprise AV configurator functions seamlessly, analyze traffic, and offer prompt engineering support in accordance with India's DPDP Act and our <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.
            </p>
            <div class="gpspl-cookie-actions">
                <button type="button" class="gpspl-cookie-btn gpspl-cookie-btn-accept" id="gpsplCookieAccept">Accept All</button>
                <button type="button" class="gpspl-cookie-btn gpspl-cookie-btn-decline" id="gpsplCookieDecline">Essential Only</button>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate in after 1 second
        setTimeout(() => {
            banner.classList.add('active');
        }, 1000);

        // Handlers
        const acceptBtn = document.getElementById('gpsplCookieAccept');
        const declineBtn = document.getElementById('gpsplCookieDecline');

        function dismiss(status) {
            try {
                localStorage.setItem(STORAGE_KEY, status);
            } catch(e) {}
            banner.classList.remove('active');
            setTimeout(() => {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 400);

            if (status === 'accepted' && window.dataLayer) {
                window.dataLayer.push({ event: 'cookie_consent_given' });
            }
        }

        if (acceptBtn) acceptBtn.addEventListener('click', () => dismiss('accepted'));
        if (declineBtn) declineBtn.addEventListener('click', () => dismiss('declined'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
})();
