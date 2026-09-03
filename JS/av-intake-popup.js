/* ==========================================================================
   GPSPL RECURRING AV PROJECT DISCOVERY TOAST POPUP
   Triggers immediately on load, then re-prompts every 30 seconds upon dismissal.
   ========================================================================== */
(function() {
    // Do not show on the discovery page itself or the thank-you confirmation page
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('av-project-discovery') || currentPath.includes('thank-you')) {
        return;
    }

    let toastElement = null;
    let toastTimer = null;
    const INTERVAL_MS = 30000; // 30 seconds

    function createToast() {
        if (document.getElementById('avEngineerToast')) return;

        const toast = document.createElement('div');
        toast.id = 'avEngineerToast';
        toast.className = 'av-engineer-toast';
        toast.setAttribute('role', 'dialog');
        toast.setAttribute('aria-label', 'AV Project Discovery Consultation');

        toast.innerHTML = `
            <button type="button" class="av-toast-close" id="avToastCloseBtn" aria-label="Close notification">&times;</button>
            <div class="av-toast-badge">
                <span class="pulse-dot"></span>
                <span>FOR ALL YOUR AV &amp; IT INTEGRATION NEEDS</span>
            </div>
            <h3 class="av-toast-title">Planning an AV, Sound, or Video Wall Setup?</h3>
            <p class="av-toast-desc">
                Mandirs, Hospitals, Malls, Command Centers (NOC/SOC), Auditoriums &amp; Boardrooms. Let our senior systems engineers draft your turnkey design &amp; BOQ.
            </p>
            <div class="av-toast-actions">
                <a href="/av-project-discovery-consultation" class="av-toast-btn-primary" id="avToastActionBtn">
                    <span>Let Our Engineers Know</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
                <a href="tel:+919310092963" class="av-toast-phone-link">
                    <i class="fas fa-phone-alt" aria-hidden="true"></i>
                    <span>Direct Hotline: +91 93100 92963</span>
                </a>
            </div>
        `;

        document.body.appendChild(toast);
        toastElement = toast;

        // Attach event listeners
        const closeBtn = document.getElementById('avToastCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissToast();
            });
        }

        const actionBtn = document.getElementById('avToastActionBtn');
        if (actionBtn) {
            actionBtn.addEventListener('click', () => {
                if (window.gtag) {
                    gtag('event', 'click_av_toast_consultation', {
                        event_category: 'Lead Generation',
                        event_label: window.location.pathname
                    });
                }
            });
        }
    }

    function showToast() {
        if (!toastElement) {
            createToast();
        }
        if (toastElement) {
            toastElement.classList.add('is-visible');
        }
    }

    function dismissToast() {
        if (toastElement) {
            toastElement.classList.remove('is-visible');
        }
        // Clear any existing timer and schedule next prompt in 30 seconds
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            showToast();
        }, INTERVAL_MS);
    }

    // Initial trigger: Immediately after page load (1.2s delay for smooth page render)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(showToast, 1200);
        });
    } else {
        setTimeout(showToast, 1200);
    }
})();
