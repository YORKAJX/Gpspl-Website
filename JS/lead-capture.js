/**
 * GPSPL Gated Lead Capture, Anti-Fake Validator & Instant Zero-Cost Alert Engine
 * - Target Admin Mobile: +91 89208 30377
 * - Target Admin Email: global@gpspl.co.in
 * - Strict 10-digit Indian Mobile Validation (Blocks fake/sequential/dummy numbers)
 * - Strict Email Validation (Blocks disposable & dummy emails)
 * - Auto-downloads datasheet while dispatching instant lead alert
 */

(function() {
    'use strict';

    const ADMIN_CONFIG = {
        email: 'global@gpspl.co.in',
        phone: '8920830377',
        whatsappCountryCode: '91'
    };

    // -----------------------------------------------------------------
    // 1. ANTI-FAKE PHONE & EMAIL VALIDATION ENGINE
    // -----------------------------------------------------------------
    const DISPOSABLE_EMAIL_DOMAINS = [
        'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
        'throwawaymail.com', 'yopmail.com', 'fake.com', 'test.com', 'sample.com',
        'example.com', 'dispostable.com', 'trashmail.com', 'temp-mail.org',
        'fakeinbox.com', 'sharklasers.com', 'getnada.com', 'burnermail.io'
    ];

    const DUMMY_EMAIL_PREFIXES = [
        'test', 'admin', 'fake', 'asdf', 'abc', 'xyz', 'none', 'no',
        'demo', 'dummy', 'sample', 'user', 'temp', 'spam', 'hello', '123'
    ];

    const DUMMY_PHONE_PATTERNS = [
        '1234567890', '0123456789', '9876543210', '8765432109',
        '9898989898', '9090909090', '1212121212', '9000000000',
        '9999900000', '9876500000', '1122334455', '9988776655'
    ];

    window.GPSPL_Validator = {
        isValidPhone: function(phoneStr) {
            if (!phoneStr) return false;
            const cleaned = phoneStr.replace(/\D/g, '');

            let digits = cleaned;
            if (cleaned.length === 12 && cleaned.startsWith('91')) {
                digits = cleaned.substring(2);
            } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
                digits = cleaned.substring(1);
            }

            if (digits.length !== 10) return false;
            if (!/^[6-9]/.test(digits)) return false;
            if (/^(.)\1{9}$/.test(digits)) return false;
            if (DUMMY_PHONE_PATTERNS.includes(digits)) return false;

            let isAscending = true;
            let isDescending = true;
            for (let i = 0; i < 9; i++) {
                const cur = parseInt(digits[i], 10);
                const next = parseInt(digits[i+1], 10);
                if (next !== (cur + 1) % 10) isAscending = false;
                if (next !== (cur - 1 + 10) % 10) isDescending = false;
            }
            if (isAscending || isDescending) return false;

            return true;
        },

        isValidEmail: function(emailStr) {
            if (!emailStr) return false;
            const email = emailStr.trim().toLowerCase();

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            if (!emailRegex.test(email)) return false;

            const parts = email.split('@');
            if (parts.length !== 2) return false;
            const prefix = parts[0];
            const domain = parts[1];

            if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) return false;
            if (DUMMY_EMAIL_PREFIXES.includes(prefix) && (domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'hotmail.com' || domain === 'outlook.com')) {
                return false;
            }

            const tld = domain.split('.').pop();
            if (!tld || tld.length < 2) return false;

            return true;
        }
    };

    // -----------------------------------------------------------------
    // 2. GATED DATASHEET DOWNLOAD MODAL
    // -----------------------------------------------------------------
    let pendingDownloadUrl = null;
    let pendingDownloadFilename = null;
    let pendingModelName = null;

    function createDatasheetModal() {
        if (document.getElementById('gpspl-datasheet-modal')) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'gpspl-datasheet-modal';
        modalOverlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9999999;
            background: rgba(7, 21, 38, 0.78);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity 0.25s ease;
        `;

        modalOverlay.innerHTML = `
            <div class="gpspl-modal-card" style="background: #ffffff; border-radius: 20px; width: 100%; max-width: 480px; padding: 30px 26px; box-shadow: 0 25px 60px rgba(0,0,0,0.35); position: relative; border: 1px solid rgba(13, 31, 56, 0.1); transform: translateY(20px); transition: transform 0.25s ease; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;">
                <button type="button" id="gpspl-modal-close" style="position: absolute; top: 16px; right: 16px; background: #f1f5f9; border: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: #64748b; font-size: 16px; cursor: pointer; transition: all 0.2s ease;" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>

                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="width: 50px; height: 50px; background: #fee2e2; color: #ef3438; border-radius: 14px; display: grid; place-items: center; font-size: 1.35rem; margin: 0 auto 12px;">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <h3 style="color: #071526; font-size: 1.3rem; font-weight: 800; margin: 0 0 6px;" id="gpspl-modal-title">Download Official Datasheet</h3>
                    <p style="color: #64748b; font-size: 0.86rem; line-height: 1.5; margin: 0;">Enter your business details to instantly download full technical metrics, CAD dimensions, and tender BOQ data.</p>
                </div>

                <form id="gpspl-datasheet-form" style="display: flex; flex-direction: column; gap: 13px;">
                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Full Name <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="gpspl-lead-name" required placeholder="e.g. Rahul Sharma" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box; transition: border-color 0.2s;">
                        <span class="field-error" id="name-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Company / School / Org Name <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="gpspl-lead-company" required placeholder="e.g. DPS International / TechCorp" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box; transition: border-color 0.2s;">
                        <span class="field-error" id="company-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Mobile Number (10 Digits) <span style="color: #ef4444;">*</span></label>
                        <div style="display: flex; gap: 8px;">
                            <span style="background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 12px; font-weight: 700; color: #475569; font-size: 0.9rem;">+91</span>
                            <input type="tel" id="gpspl-lead-phone" maxlength="10" required placeholder="e.g. 98100 12345" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box; transition: border-color 0.2s;">
                        </div>
                        <span class="field-error" id="phone-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Work / Official Email <span style="color: #ef4444;">*</span></label>
                        <input type="email" id="gpspl-lead-email" required placeholder="e.g. rahul@company.com" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box; transition: border-color 0.2s;">
                        <span class="field-error" id="email-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <button type="submit" id="gpspl-submit-btn" style="background: #ef3438; border: none; color: #ffffff; padding: 13px 20px; border-radius: 8px; font-size: 0.96rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; box-shadow: 0 4px 14px rgba(239, 52, 56, 0.25); transition: all 0.2s ease;">
                        <i class="fas fa-download"></i> Verify &amp; Download Datasheet
                    </button>
                    
                    <p style="text-align: center; color: #94a3b8; font-size: 0.74rem; margin: 4px 0 0;">
                        <i class="fas fa-shield-alt"></i> Official GPSPL Authorized Supply &bull; No spam.
                    </p>
                </form>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        document.getElementById('gpspl-modal-close').addEventListener('click', closeDatasheetModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeDatasheetModal();
        });

        document.getElementById('gpspl-datasheet-form').addEventListener('submit', handleModalSubmit);
    }

    function openDatasheetModal(url, filename, modelName) {
        createDatasheetModal();
        pendingDownloadUrl = url;
        pendingDownloadFilename = filename || url.split('/').pop();
        pendingModelName = modelName || 'Samsung / LG Commercial Display';

        const modal = document.getElementById('gpspl-datasheet-modal');
        const title = document.getElementById('gpspl-modal-title');
        if (title && modelName) {
            title.textContent = `Download ${modelName} Datasheet`;
        }

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
            const card = modal.querySelector('.gpspl-modal-card');
            if (card) card.style.transform = 'translateY(0)';
        }, 10);
    }

    function closeDatasheetModal() {
        const modal = document.getElementById('gpspl-datasheet-modal');
        if (!modal) return;
        modal.style.opacity = '0';
        const card = modal.querySelector('.gpspl-modal-card');
        if (card) card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 250);
    }

    // -----------------------------------------------------------------
    // 3. DISPATCH LEAD ALERT (Email & WhatsApp targets)
    // -----------------------------------------------------------------
    async function dispatchLeadAlert(leadData) {
        // 1. Save to local audit backup
        try {
            const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
            history.push({ ...leadData, timestamp: new Date().toISOString() });
            localStorage.setItem('gpspl_captured_leads', JSON.stringify(history));
        } catch(e) {}

        // 2. Dispatch to Admin Email (global@gpspl.co.in) via Zero-Cost Gateway
        try {
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '56d7df15-776e-4b47-9759-9b62c12140bb',
                    to_email: ADMIN_CONFIG.email,
                    subject: `🔥 NEW LEAD: ${leadData.name} (${leadData.company}) - ${leadData.source || 'Datasheet'}`,
                    from_name: 'GPSPL Lead Engine',
                    name: leadData.name,
                    phone: leadData.phone,
                    email: leadData.email,
                    company: leadData.company,
                    source: leadData.source,
                    page_url: window.location.href,
                    alert_target: `Admin: ${ADMIN_CONFIG.phone} | ${ADMIN_CONFIG.email}`,
                    details: JSON.stringify(leadData, null, 2)
                })
            }).catch(() => {});
        } catch(e) {}

        // 3. Backend local endpoint dispatch
        try {
            fetch('/api/v1/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            }).catch(() => {});
        } catch(e) {}
    }

    function handleModalSubmit(e) {
        e.preventDefault();

        const nameInput = document.getElementById('gpspl-lead-name');
        const companyInput = document.getElementById('gpspl-lead-company');
        const phoneInput = document.getElementById('gpspl-lead-phone');
        const emailInput = document.getElementById('gpspl-lead-email');

        const nameErr = document.getElementById('name-error');
        const companyErr = document.getElementById('company-error');
        const phoneErr = document.getElementById('phone-error');
        const emailErr = document.getElementById('email-error');

        [nameErr, companyErr, phoneErr, emailErr].forEach(el => {
            if (el) { el.style.display = 'none'; el.textContent = ''; }
        });

        let hasError = false;

        if (!nameInput.value || nameInput.value.trim().length < 2) {
            nameErr.textContent = 'Please enter your full name.';
            nameErr.style.display = 'block';
            hasError = true;
        }

        if (!companyInput.value || companyInput.value.trim().length < 2) {
            companyErr.textContent = 'Please enter your company or organization name.';
            companyErr.style.display = 'block';
            hasError = true;
        }

        if (!window.GPSPL_Validator.isValidPhone(phoneInput.value)) {
            phoneErr.textContent = 'Please enter a valid 10-digit Indian mobile number (e.g. 98100XXXXX).';
            phoneErr.style.display = 'block';
            hasError = true;
        }

        if (!window.GPSPL_Validator.isValidEmail(emailInput.value)) {
            emailErr.textContent = 'Please enter a valid business/work email address (no fake/temp emails).';
            emailErr.style.display = 'block';
            hasError = true;
        }

        if (hasError) return;

        const btn = document.getElementById('gpspl-submit-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing &amp; Downloading...';
        btn.style.pointerEvents = 'none';

        const leadData = {
            name: nameInput.value.trim(),
            company: companyInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            source: `Datasheet Download: ${pendingModelName || pendingDownloadFilename}`,
            download_url: pendingDownloadUrl,
            page: window.location.pathname
        };

        dispatchLeadAlert(leadData);

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = pendingDownloadUrl;
            link.download = pendingDownloadFilename;
            document.body.appendChild(link);
            link.click();
            link.remove();

            btn.innerHTML = '<i class="fas fa-check-circle"></i> Download Complete!';
            btn.style.background = '#16a34a';

            setTimeout(() => {
                closeDatasheetModal();
                btn.innerHTML = '<i class="fas fa-download"></i> Verify &amp; Download Datasheet';
                btn.style.background = '#ef3438';
                btn.style.pointerEvents = 'auto';
                document.getElementById('gpspl-datasheet-form').reset();
            }, 1400);
        }, 800);
    }

    // -----------------------------------------------------------------
    // 4. ATTACH TO ALL DATASHEET BUTTONS ACROSS THE SITE
    // -----------------------------------------------------------------
    function attachDatasheetTriggers() {
        createDatasheetModal();

        const datasheetLinks = document.querySelectorAll('a[href$=".pdf"]');
        datasheetLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('company-profile') || href.includes('brochure')) {
                return;
            }

            if (href.includes('datasheet') || href.includes('samsung') || href.includes('lg-')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    let modelName = 'Commercial Display';
                    if (href.includes('qmc')) modelName = 'Samsung QMC 24/7 Signage';
                    else if (href.includes('qbc')) modelName = 'Samsung QBC Crystal UHD';
                    else if (href.includes('befx')) modelName = 'Samsung Business TV (BEFX)';
                    else if (href.includes('nu88c')) modelName = 'LG NU88C Commercial TV';
                    else if (href.includes('tr3er')) modelName = 'LG CreateBoard Interactive Panel';

                    openDatasheetModal(href, href.split('/').pop(), modelName);
                });
            }
        });
    }

    // -----------------------------------------------------------------
    // 5. ATTACH STRICT VALIDATION TO ALL SITE FORMS (Contact, BOQ, Careers)
    // -----------------------------------------------------------------
    function attachGlobalFormValidation() {
        const forms = document.querySelectorAll('form:not(#gpspl-datasheet-form)');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const phoneInput = form.querySelector('input[type="tel"], input[name*="phone"], input[name*="mobile"], input[id*="phone"]');
                const emailInput = form.querySelector('input[type="email"], input[name*="email"], input[id*="email"]');

                if (phoneInput && phoneInput.value) {
                    if (!window.GPSPL_Validator.isValidPhone(phoneInput.value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('⚠️ Please enter a valid 10-digit Indian mobile number (e.g. 98100XXXXX). Random or sequential numbers are not accepted.');
                        phoneInput.focus();
                        return false;
                    }
                }

                if (emailInput && emailInput.value) {
                    if (!window.GPSPL_Validator.isValidEmail(emailInput.value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('⚠️ Please enter a valid official/work email address. Disposable or test email domains are not accepted.');
                        emailInput.focus();
                        return false;
                    }
                }

                const formData = new FormData(form);
                const leadData = {
                    name: formData.get('name') || formData.get('fullName') || 'Website Inquirer',
                    company: formData.get('company') || formData.get('organization') || 'Not Specified',
                    phone: (phoneInput ? phoneInput.value : formData.get('phone')) || '',
                    email: (emailInput ? emailInput.value : formData.get('email')) || '',
                    source: `Form Submission: ${form.id || form.className || 'General Contact'}`,
                    page: window.location.pathname
                };
                dispatchLeadAlert(leadData);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            attachDatasheetTriggers();
            attachGlobalFormValidation();
        });
    } else {
        attachDatasheetTriggers();
        attachGlobalFormValidation();
    }

    window.addEventListener('load', () => {
        attachDatasheetTriggers();
        attachGlobalFormValidation();
    });

})();
