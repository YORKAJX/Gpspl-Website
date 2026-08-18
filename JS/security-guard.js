/**
 * GPSPL Enterprise Security & Anti-Spam Guard
 * - Prevents rapid-click download button spamming / bot scraping
 * - Injects honeypot & timing verification on form submissions
 * - Sanitizes user inputs against XSS & script injection
 * - Ultra-lightweight vanilla JS with zero lag
 */

(function() {
    'use strict';

    // -------------------------------------------------------------
    // 1. Download Spam Protection & Throttling
    // -------------------------------------------------------------
    const DOWNLOAD_THROTTLE_MS = 2500; // 2.5s cooldown per button
    const MAX_DOWNLOADS_PER_WINDOW = 5; // Max 5 downloads in 30 seconds
    const WINDOW_DURATION_MS = 30000;

    let downloadHistory = [];
    let isToastVisible = false;

    function showSecurityToast(message, isWarning = false) {
        if (isToastVisible) return;
        isToastVisible = true;

        const toast = document.createElement('div');
        toast.className = 'gpspl-security-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            background: ${isWarning ? '#991b1b' : '#0f172a'};
            color: #ffffff;
            padding: 14px 22px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
            border-left: 4px solid ${isWarning ? '#ef4444' : '#0284c7'};
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            font-size: 13.5px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: gpsplToastSlideIn 0.3s ease forwards;
            pointer-events: none;
            max-width: 90vw;
        `;

        toast.innerHTML = `
            <i class="fas ${isWarning ? 'fa-shield-exclamation' : 'fa-circle-check'}" style="color: ${isWarning ? '#fca5a5' : '#38bdf8'}; font-size: 16px;"></i>
            <span>${message}</span>
        `;

        if (!document.getElementById('gpspl-toast-style')) {
            const style = document.createElement('style');
            style.id = 'gpspl-toast-style';
            style.textContent = `
                @keyframes gpsplToastSlideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes gpsplToastFadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(10px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'gpsplToastFadeOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
                isToastVisible = false;
            }, 300);
        }, 3200);
    }

    function handleDownloadClick(e) {
        const link = e.currentTarget;
        const now = Date.now();

        // 1. Check sliding window limit
        downloadHistory = downloadHistory.filter(timestamp => now - timestamp < WINDOW_DURATION_MS);
        if (downloadHistory.length >= MAX_DOWNLOADS_PER_WINDOW) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('Security Cooldown: Please wait a moment before downloading another file.', true);
            return false;
        }

        // 2. Check single-button throttle
        if (link.dataset.downloading === 'true') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        link.dataset.downloading = 'true';
        downloadHistory.push(now);

        const originalHtml = link.innerHTML;
        const originalPointerEvents = link.style.pointerEvents;
        const originalOpacity = link.style.opacity;

        link.style.pointerEvents = 'none';
        link.style.opacity = '0.75';

        const hasIcon = link.querySelector('i');
        if (hasIcon) {
            hasIcon.className = 'fas fa-spinner fa-spin';
        }

        showSecurityToast('Download starting securely...');

        setTimeout(() => {
            link.innerHTML = originalHtml;
            link.style.pointerEvents = originalPointerEvents;
            link.style.opacity = originalOpacity;
            delete link.dataset.downloading;
        }, DOWNLOAD_THROTTLE_MS);
    }

    function initDownloadProtection() {
        const downloadLinks = document.querySelectorAll('a[download], a[href$=".pdf"], a[href*="datasheet"]');
        downloadLinks.forEach(link => {
            link.removeEventListener('click', handleDownloadClick);
            link.addEventListener('click', handleDownloadClick);
        });
    }

    // -------------------------------------------------------------
    // 2. Anti-Bot Form Honeypot & Timing Verification
    // -------------------------------------------------------------
    const pageLoadTime = Date.now();
    const MIN_SUBMISSION_TIME_MS = 1500;

    function initFormProtection() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.querySelector('.gpspl-hp-check')) {
                const hp = document.createElement('div');
                hp.className = 'gpspl-hp-check';
                hp.style.cssText = 'opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1; pointer-events: none;';
                hp.innerHTML = '<input type="text" name="website_url_hp" tabindex="-1" autocomplete="off" value="">';
                form.appendChild(hp);
            }

            form.addEventListener('submit', function(e) {
                const hpField = form.querySelector('input[name="website_url_hp"]');
                const timeDiff = Date.now() - pageLoadTime;

                if (hpField && hpField.value !== '') {
                    e.preventDefault();
                    console.warn('Bot submission blocked.');
                    return false;
                }

                if (timeDiff < MIN_SUBMISSION_TIME_MS) {
                    e.preventDefault();
                    showSecurityToast('Please review your form before submitting.', true);
                    return false;
                }

                const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
                inputs.forEach(input => {
                    input.value = input.value
                        .replace(/<[^>]*>/g, '')
                        .replace(/[^\w\s@.,+\-()/#]/gi, '')
                        .trim();
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDownloadProtection();
            initFormProtection();
        });
    } else {
        initDownloadProtection();
        initFormProtection();
    }

    window.addEventListener('load', () => {
        initDownloadProtection();
        initFormProtection();
    });
})();
