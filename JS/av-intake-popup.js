/* ==========================================================================
   GPSPL RECURRING AV PROJECT DISCOVERY BOTTOM STRIP BANNER
   Cookie-style horizontal bottom bar covering half length.
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
        toast.className = 'av-bottom-strip-banner';
        toast.setAttribute('role', 'dialog');
        toast.setAttribute('aria-label', 'AV Project Discovery Consultation');

        toast.innerHTML = `
            <div class="av-strip-inner">
                <div class="av-strip-left">
                    <span class="av-strip-badge">
                        <span class="pulse-dot"></span>
                        <span>ALL AV &amp; IT NEEDS</span>
                    </span>
                    <div class="av-strip-text">
                        <strong>Planning an AV, Sound, or Video Wall Setup?</strong>
                        <span>Mandirs, Hospitals, Malls, NOC/SOC, Auditoriums &amp; Boardrooms. Let our engineers draft your design.</span>
                    </div>
                </div>
                <div class="av-strip-right">
                    <a href="/av-project-discovery-consultation" class="av-strip-btn" id="avToastActionBtn">
                        <span>Let Our Engineers Know</span>
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    </a>
                    <a href="tel:+919310092963" class="av-strip-phone" title="Call Senior Engineers">
                        <i class="fas fa-phone-alt" aria-hidden="true"></i>
                        <span>+91 93100 92963</span>
                    </a>
                    <button type="button" class="av-strip-close" id="avToastCloseBtn" aria-label="Close notification">&times;</button>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Hide banner if user opens AI chat so they never compete
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gpspl-chat-launcher') || e.target.closest('#gpspl-ai-chat-root')) {
                dismissToast();
            }
        });

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
