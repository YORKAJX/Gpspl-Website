/* ==========================================================================
   GPSPL AV PROJECT DISCOVERY BOTTOM STRIP BANNER
   Compact horizontal bottom bar covering half website length.
   Closes permanently upon user dismissal.
   ========================================================================== */
(function() {
    // Do not show on the discovery page itself or the thank-you confirmation page
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('av-project-discovery') || currentPath.includes('thank-you')) {
        return;
    }

    // If user previously closed the banner in this session, keep it closed ("band ho jaye")
    try {
        if (sessionStorage.getItem('gpspl_av_strip_dismissed') === '1') {
            return;
        }
    } catch (e) {}

    let toastElement = null;

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
                        <span>URGENT AV &amp; IT PROJECT</span>
                    </span>
                    <div class="av-strip-text">
                        <strong>Planning an AV, Sound, or Video Wall Setup?</strong>
                        <span>Direct OEM Quotes &bull; Boardrooms, Auditoriums, Smart Classes, Hotels, Hospitals &amp; Malls.</span>
                    </div>
                </div>
                <div class="av-strip-right">
                    <a href="https://wa.me/918920830377?text=Hi%20GPSPL%2C%20I%20have%20an%20urgent%20commercial%20AV%20%2F%20Active%20LED%20Wall%20requirement.%20Please%20connect%20with%20an%20engineer." class="av-strip-wa" id="avToastWaBtn" target="_blank" rel="noopener noreferrer" title="Chat with Senior AV Engineer on WhatsApp">
                        <i class="fab fa-whatsapp" aria-hidden="true"></i>
                        <span>WhatsApp Quote</span>
                    </a>
                    <a href="/av-project-discovery-consultation" class="av-strip-btn" id="avToastActionBtn" title="Request Itemized BOQ Specification">
                        <span>Free BOQ Quote</span>
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    </a>
                    <a href="tel:+918920830377" class="av-strip-phone" title="Call Senior AV Engineers">
                        <i class="fas fa-phone-alt" aria-hidden="true"></i>
                        <span>+91 89208 30377</span>
                    </a>
                    <button type="button" class="av-strip-close" id="avToastCloseBtn" aria-label="Close notification" title="Close">&times;</button>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Hide banner if user opens AI chat so they never compete
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gpspl-chat-launcher') || e.target.closest('#gpspl-ai-chat-root')) {
                dismissBanner(false);
            }
        });

        toastElement = toast;

        // When user clicks close (✕), it closes permanently ("band ho jaye")
        const closeBtn = document.getElementById('avToastCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissBanner(true);
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

    function showBanner() {
        if (!toastElement) {
            createToast();
        }
        if (toastElement) {
            toastElement.classList.add('is-visible');
        }
    }

    function dismissBanner(permanent = true) {
        if (toastElement) {
            toastElement.classList.remove('is-visible');
            setTimeout(() => {
                if (toastElement && toastElement.parentNode) {
                    toastElement.parentNode.removeChild(toastElement);
                    toastElement = null;
                }
            }, 350);
        }
        if (permanent) {
            try {
                sessionStorage.setItem('gpspl_av_strip_dismissed', '1');
            } catch (e) {}
        }
    }

    // Trigger after initial smooth page load (mobile: 3.5s delay so hero buttons are clear, desktop: 1.2s)
    const initialDelay = window.innerWidth < 768 ? 3500 : 1200;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(showBanner, initialDelay);
        });
    } else {
        setTimeout(showBanner, initialDelay);
    }
})();
