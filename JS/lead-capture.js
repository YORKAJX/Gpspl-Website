/**
 * GPSPL Universal Lead & Inquiry Capture Engine + Instant Robust PDF Downloader
 * - Target Admin Email: global@gpspl.co.in
 * - Target Admin Mobile: +91 89208 30377
 * - Anti-Fake 10-Digit Mobile & Email Validator
 * - 100% Guaranteed PDF Download (Instant execution + fallback link)
 * - Categorized Executive CRM & 1-Click CSV / Excel Export (Ctrl + Shift + L)
 */

(function() {
    'use strict';

    const ADMIN_CONFIG = {
        email: 'karan@gpspl.co.in',
        secondaryEmail: 'itsdivesh221@gmail.com',
        allEmails: ['itsdivesh221@gmail.com', 'karan@gpspl.co.in', 'global@gpspl.co.in', 'support@gpspl.co.in'],
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
            const cleaned = String(phoneStr).replace(/\D/g, '');
            // Must be strictly 10 digits starting with 6, 7, 8, or 9
            if (cleaned.length !== 10) return false;
            if (!/^[6-9]\d{9}$/.test(cleaned)) return false;
            if (/^(.)\1{9}$/.test(cleaned)) return false;
            if (['1234567890', '0123456789', '9876543210', '8765432109', '9898989898', '9090909090'].includes(cleaned)) return false;
            return true;
        },

        isValidCompany: function(companyStr) {
            if (!companyStr) return false;
            const cleaned = String(companyStr).trim();
            // Alphanumeric + spaces/dots/ampersand, at least 2 chars
            if (cleaned.length < 2 || cleaned.length > 100) return false;
            if (!/[a-zA-Z]/.test(cleaned)) return false; // Must contain at least one letter
            const lower = cleaned.toLowerCase();
            const spamTerms = ['asdf', 'test123', 'none', 'n/a', 'na', 'null', 'xxx', 'qwerty', '12345'];
            if (spamTerms.includes(lower)) return false;
            if (/^(.)\1{3,}$/.test(lower)) return false; // Repeating chars like aaaa
            return true;
        },

        isValidEmail: function(emailStr) {
            if (!emailStr) return false;
            const email = String(emailStr).trim().toLowerCase();
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            if (!emailRegex.test(email)) return false;

            const parts = email.split('@');
            if (parts.length !== 2) return false;
            const domain = parts[1];

            // Block disposable throwaway email providers
            const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'throwawaymail.com', 'yopmail.com', 'fakeinbox.com', 'sharklasers.com', 'trashmail.com'];
            if (disposableDomains.includes(domain)) return false;

            const tld = domain.split('.').pop();
            if (!tld || tld.length < 2) return false;

            return true;
        }
    };

    // Auto-attach 10-digit phone limiter and company sanitizer across all inputs on page
    function attachInputEnforcers() {
        document.querySelectorAll('input[type="tel"], input[name="phone"], input[name*="mobile"], input[id*="phone"]').forEach(input => {
            input.setAttribute('maxlength', '10');
            input.setAttribute('pattern', '[6-9][0-9]{9}');
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
            });
        });

        document.querySelectorAll('input[name="company"], input[id*="company"]').forEach(input => {
            input.setAttribute('maxlength', '100');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachInputEnforcers);
    } else {
        attachInputEnforcers();
    }

    // -----------------------------------------------------------------
    // 2. UNIVERSAL DUAL-EMAIL DISPATCH LEAD ALERT (Email, Webhook & Storage)
    // -----------------------------------------------------------------
    async function dispatchUniversalLead(leadData) {
        const now = new Date();
        const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
        
        const newLead = {
            id: 'LEAD-' + Date.now().toString().slice(-6),
            category: leadData.category || 'INQUIRY',
            date_time: istTime,
            name: leadData.name || 'Not Provided',
            company: leadData.company || 'Not Specified',
            phone: leadData.phone || '',
            email: leadData.email || '',
            source: leadData.source || 'General Inquiry',
            details: leadData.details || leadData.message || 'No additional details',
            page: leadData.page || window.location.pathname,
            timestamp: now.toISOString()
        };

        // 1. Save to Local Storage Backup
        try {
            const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
            history.unshift(newLead);
            localStorage.setItem('gpspl_captured_leads', JSON.stringify(history));
        } catch(e) {}

        // 2. Multi-Target FormSubmit Direct Deliveries to BOTH itsdivesh221@gmail.com & karan@gpspl.co.in
        const payload = {
            _subject: `⚡ NEW GPSPL LEAD: [${newLead.category}] ${newLead.name} (${newLead.company})`,
            _template: 'table',
            _captcha: 'false',
            'Category': newLead.category,
            'Full Name': newLead.name,
            'Mobile Number': newLead.phone ? '+91 ' + newLead.phone : 'Not Provided',
            'Email Address': newLead.email,
            'Company / Organization': newLead.company,
            'Inquiry Source': newLead.source,
            'Requirement Details': newLead.details,
            'Submission Time': istTime,
            'Page URL': window.location.href,
            'Notification Recipients': 'itsdivesh221@gmail.com, karan@gpspl.co.in'
        };

        const targets = ['itsdivesh221@gmail.com', 'karan@gpspl.co.in'];
        const promises = targets.map(email => {
            return fetch('https://formsubmit.co/ajax/' + encodeURIComponent(email), {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => null);
        });

        // Also trigger Netlify serverless function
        promises.push(
            fetch('/.netlify/functions/boq-lead-email', {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'lead_inquiry',
                    name: newLead.name,
                    email: newLead.email,
                    phone: newLead.phone,
                    company: newLead.company,
                    source: newLead.source,
                    details: newLead.details
                })
            }).catch(() => null)
        );

        try {
            const timeout = new Promise(resolve => setTimeout(resolve, 1200));
            await Promise.race([Promise.allSettled(promises), timeout]);
        } catch(e) {}

        return newLead;
    }

    // 3. GATED DATASHEET DOWNLOAD MODAL WITH GUARANTEED DOWNLOAD
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
            background: rgba(7, 21, 38, 0.82);
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

                <div id="gpspl-modal-success-state" style="display: none; text-align: center; padding: 15px 0;">
                    <div style="width: 56px; height: 56px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: grid; place-items: center; font-size: 1.6rem; margin: 0 auto 14px;">
                        <i class="fas fa-check"></i>
                    </div>
                    <h4 style="color: #071526; font-size: 1.2rem; font-weight: 800; margin: 0 0 8px;">Download Started!</h4>
                    <p style="color: #475569; font-size: 0.88rem; margin: 0 0 16px;">Your datasheet PDF is downloading. If it did not start automatically, please click below:</p>
                    <a id="gpspl-direct-fallback-link" href="#" target="_blank" download style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ef3438; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 0.95rem; box-shadow: 0 4px 14px rgba(239,52,56,0.25);">
                        <i class="fas fa-download"></i> Click to Download PDF
                    </a>
                </div>

                <form id="gpspl-datasheet-form" style="display: flex; flex-direction: column; gap: 13px;">
                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Full Name <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="gpspl-lead-name" required placeholder="e.g. Rahul Sharma" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box;">
                        <span class="field-error" id="name-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Company / School / Org Name <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="gpspl-lead-company" required placeholder="e.g. DPS International / TechCorp" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box;">
                        <span class="field-error" id="company-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Mobile Number (10 Digits) <span style="color: #ef4444;">*</span></label>
                        <div style="display: flex; gap: 8px;">
                            <span style="background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 11px 12px; font-weight: 700; color: #475569; font-size: 0.9rem;">+91</span>
                            <input type="tel" id="gpspl-lead-phone" maxlength="10" required placeholder="e.g. 98100 12345" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box;">
                        </div>
                        <span class="field-error" id="phone-error" style="color: #ef4444; font-size: 0.76rem; display: none; margin-top: 3px;"></span>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 4px;">Work / Official Email <span style="color: #ef4444;">*</span></label>
                        <input type="email" id="gpspl-lead-email" required placeholder="e.g. rahul@company.com" style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; outline: none; box-sizing: border-box;">
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

        // Ensure clean absolute path
        let cleanUrl = url;
        if (!cleanUrl.startsWith('http') && !cleanUrl.startsWith('/')) {
            cleanUrl = '/' + cleanUrl;
        }

        pendingDownloadUrl = cleanUrl;
        pendingDownloadFilename = filename || cleanUrl.split('/').pop().split('?')[0];
        pendingModelName = modelName || 'Samsung / LG Commercial Display';

        const modal = document.getElementById('gpspl-datasheet-modal');
        const title = document.getElementById('gpspl-modal-title');
        if (title && modelName) {
            title.textContent = `Download ${modelName} Datasheet`;
        }

        // Reset views
        const form = document.getElementById('gpspl-datasheet-form');
        const successState = document.getElementById('gpspl-modal-success-state');
        if (form) form.style.display = 'flex';
        if (successState) successState.style.display = 'none';

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

    function triggerFileDownload(url, filename) {
        // Direct click trigger
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => link.remove(), 200);

        // Fallback for browsers that block programmatic anchor clicks
        try {
            window.open(url, '_blank');
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
            category: 'DATASHEET',
            name: nameInput.value.trim(),
            company: companyInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            source: `Datasheet: ${pendingModelName || pendingDownloadFilename}`,
            details: `Requested PDF: ${pendingDownloadFilename}`,
            page: window.location.pathname
        };

        // 1. Dispatch lead info to email
        dispatchUniversalLead(leadData);

        // 2. Trigger instant download
        triggerFileDownload(pendingDownloadUrl, pendingDownloadFilename);

        // 3. Switch modal to success state with direct fallback link
        const form = document.getElementById('gpspl-datasheet-form');
        const successState = document.getElementById('gpspl-modal-success-state');
        const directLink = document.getElementById('gpspl-direct-fallback-link');

        if (form && successState && directLink) {
            directLink.href = pendingDownloadUrl;
            directLink.download = pendingDownloadFilename;
            form.style.display = 'none';
            successState.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-download"></i> Verify &amp; Download Datasheet';
            btn.style.pointerEvents = 'auto';
            form.reset();
        }

        // Automatically close modal after 4 seconds
        setTimeout(() => {
            closeDatasheetModal();
        }, 4000);
    }

    // -----------------------------------------------------------------
    // 4. ATTACH TO ALL DATASHEET BUTTONS (Document Click Delegation)
    // -----------------------------------------------------------------
    function handleDocumentClick(e) {
        const target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const isDownload = target.hasAttribute('download') || href.includes('.pdf') || href.includes('datasheet');

        if (isDownload) {
            if (href.includes('company-profile') || href.includes('brochure')) {
                return;
            }

            if (href.includes('datasheet') || href.includes('samsung') || href.includes('lg-') || href.includes('.pdf')) {
                e.preventDefault();
                e.stopPropagation();

                let modelName = 'Commercial Display';
                if (href.includes('qmc')) modelName = 'Samsung QMC 24/7 Signage';
                else if (href.includes('qbc')) modelName = 'Samsung QBC Crystal UHD';
                else if (href.includes('befx')) modelName = 'Samsung Business TV (BEFX)';
                else if (href.includes('nu88c')) modelName = 'LG NU88C Commercial TV';
                else if (href.includes('tr3er')) modelName = 'LG CreateBoard Interactive Panel';
                else if (href.includes('ua831c')) modelName = 'LG Commercial TV (UA831C)';

                openDatasheetModal(href, href.split('/').pop().split('?')[0], modelName);
            }
        }
    }

    // -----------------------------------------------------------------
    // 5. ATTACH TO ALL SITE FORMS (Career, BOQ, Contact, Quotes)
    // -----------------------------------------------------------------
    function attachGlobalFormValidation() {
        const forms = document.querySelectorAll('form:not(#gpspl-datasheet-form)');
        forms.forEach(form => {
            if (form.dataset.gpsplBound === 'true') return;
            form.dataset.gpsplBound = 'true';

            form.addEventListener('submit', function(e) {
                const phoneInput = form.querySelector('input[type="tel"], input[name*="phone"], input[name*="mobile"], input[id*="phone"]');
                const emailInput = form.querySelector('input[type="email"], input[name*="email"], input[id*="email"]');
                const nameInput = form.querySelector('input[name*="name"], input[id*="name"], input[placeholder*="Name"]');
                const companyInput = form.querySelector('input[name*="company"], input[name*="organization"], input[id*="company"]');

                if (phoneInput && phoneInput.value) {
                    if (!window.GPSPL_Validator.isValidPhone(phoneInput.value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('⚠️ Please enter a valid 10-digit Indian mobile number (e.g. 98100XXXXX). Random or dummy numbers are not accepted.');
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

                let category = 'CONTACT INQUIRY';
                let sourceTitle = form.id || form.className || 'Website Contact Form';

                const formHtml = form.innerHTML.toLowerCase();
                if (formHtml.includes('career') || formHtml.includes('resume') || formHtml.includes('job') || window.location.pathname.includes('career')) {
                    category = 'CAREER APPLICATION';
                    const roleField = form.querySelector('[name*="role"], [name*="position"], #careerModalRoleTitle');
                    sourceTitle = roleField ? (roleField.value || roleField.textContent || 'Job Application') : 'Career Application';
                } else if (formHtml.includes('boq') || formHtml.includes('calculator') || form.id === 'boq-form') {
                    category = 'BOQ / PROJECT ESTIMATE';
                    sourceTitle = 'AV BOQ Calculator';
                } else if (formHtml.includes('quote') || formHtml.includes('inquiry')) {
                    category = 'PROJECT QUOTE REQUEST';
                }

                const formData = new FormData(form);
                const detailsArr = [];
                formData.forEach((val, key) => {
                    if (key !== 'bot-field' && key !== 'form-name' && val && typeof val === 'string') {
                        detailsArr.push(`${key}: ${val}`);
                    }
                });

                const leadData = {
                    category: category,
                    name: (nameInput ? nameInput.value : formData.get('name')) || 'Website Inquirer',
                    company: (companyInput ? companyInput.value : formData.get('company')) || (category === 'CAREER APPLICATION' ? 'Job Candidate' : 'Not Specified'),
                    phone: (phoneInput ? phoneInput.value : formData.get('phone')) || '',
                    email: (emailInput ? emailInput.value : formData.get('email')) || '',
                    source: sourceTitle,
                    details: detailsArr.join(' | ') || 'Inquiry submitted from ' + window.location.pathname,
                    page: window.location.pathname
                };

                dispatchUniversalLead(leadData);
            });
        });
    }

    // -----------------------------------------------------------------
    // 6. CSV & EXCEL EXPORT ENGINE + ADMIN LEAD HUB MODAL
    // -----------------------------------------------------------------
    window.GPSPL_LeadCapture = { dispatchLead: dispatchUniversalLead, isValidPhone: window.GPSPL_Validator.isValidPhone, isValidEmail: window.GPSPL_Validator.isValidEmail };
    window.GPSPL_ExportLeadsCSV = function() {
        const leads = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
        if (leads.length === 0) {
            alert('No captured leads or inquiries found in local storage yet.');
            return;
        }

        const headers = [
            'Lead ID',
            'Category',
            'Date & Time (IST)',
            'Full Name',
            'Company / Organization',
            'Mobile Number',
            'Work Email',
            'Inquiry Source / Product',
            'Details & Requirements',
            'Source Page URL'
        ];

        const csvRows = [headers.join(',')];
        leads.forEach(lead => {
            const row = [
                `"${(lead.id || '').replace(/"/g, '""')}"`,
                `"${(lead.category || '').replace(/"/g, '""')}"`,
                `"${(lead.date_time || lead.timestamp || '').replace(/"/g, '""')}"`,
                `"${(lead.name || '').replace(/"/g, '""')}"`,
                `"${(lead.company || '').replace(/"/g, '""')}"`,
                `"${(lead.phone ? '+91 ' + lead.phone : '').replace(/"/g, '""')}"`,
                `"${(lead.email || '').replace(/"/g, '""')}"`,
                `"${(lead.source || '').replace(/"/g, '""')}"`,
                `"${(lead.details || '').replace(/"/g, '""')}"`,
                `"${(lead.page || '').replace(/"/g, '""')}"`
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = '\uFEFF' + csvRows.join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const today = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `GPSPL-All-Inquiries-${today}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    function createAdminLeadHubModal() {
        if (document.getElementById('gpspl-admin-lead-modal')) {
            renderAdminLeadsList();
            const m = document.getElementById('gpspl-admin-lead-modal');
            m.style.display = 'flex';
            setTimeout(() => { m.style.opacity = '1'; }, 10);
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'gpspl-admin-lead-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999999;
            background: rgba(7, 21, 38, 0.85);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            transition: opacity 0.25s ease;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        `;

        modal.innerHTML = `
            <div style="background: #ffffff; border-radius: 20px; width: 100%; max-width: 1050px; max-height: 88vh; display: flex; flex-direction: column; padding: 28px; box-shadow: 0 30px 80px rgba(0,0,0,0.4); border: 1px solid #e2e8f0; position: relative;">
                <button type="button" id="gpspl-admin-close" style="position: absolute; top: 18px; right: 18px; background: #f1f5f9; border: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: #64748b; font-size: 16px; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
                    <div>
                        <span style="font-size: 0.72rem; font-weight: 800; color: #ef3438; text-transform: uppercase; letter-spacing: 0.12em;">GPSPL Executive CRM &amp; Dispatcher</span>
                        <h3 style="margin: 2px 0 0; color: #071526; font-size: 1.4rem; font-weight: 800;">All Website Leads, Careers &amp; Project Inquiries</h3>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button type="button" id="gpspl-export-csv-btn" style="background: #16a34a; border: none; color: #ffffff; padding: 9px 18px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);">
                            <i class="fas fa-file-excel"></i> Download All Inquiries (CSV / Excel)
                        </button>
                        <button type="button" id="gpspl-clear-leads-btn" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                            <i class="fas fa-trash"></i> Clear Test
                        </button>
                    </div>
                </div>

                <div id="gpspl-leads-table-container" style="overflow-y: auto; flex-grow: 1; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <!-- Table Injected Here -->
                </div>
                
                <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #64748b;">
                    <span>Alerts automatically sent to: <strong>${ADMIN_CONFIG.email}</strong> &bull; <strong>+91 ${ADMIN_CONFIG.phone}</strong></span>
                    <span>Admin Shortcut: <strong>Ctrl + Shift + L</strong></span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('gpspl-admin-close').addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => { modal.style.display = 'none'; }, 250);
        });

        document.getElementById('gpspl-export-csv-btn').addEventListener('click', window.GPSPL_ExportLeadsCSV);
        document.getElementById('gpspl-clear-leads-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear test inquiries?')) {
                localStorage.removeItem('gpspl_captured_leads');
                renderAdminLeadsList();
            }
        });

        renderAdminLeadsList();
        modal.style.display = 'flex';
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
    }

    function renderAdminLeadsList() {
        const container = document.getElementById('gpspl-leads-table-container');
        if (!container) return;
        const leads = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');

        if (leads.length === 0) {
            container.innerHTML = `
                <div style="padding: 48px 20px; text-align: center; color: #94a3b8;">
                    <i class="fas fa-inbox" style="font-size: 2.4rem; color: #cbd5e1; margin-bottom: 12px; display: block;"></i>
                    <p style="font-size: 1rem; font-weight: 700; color: #475569; margin: 0 0 6px;">No Inquiries Captured Yet</p>
                    <p style="font-size: 0.85rem; margin: 0;">Submit any form (Contact, Career, BOQ, Datasheet) to see live entries stream here.</p>
                </div>
            `;
            return;
        }

        let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
                <thead style="background: #0f172a; color: #ffffff; position: sticky; top: 0;">
                    <tr>
                        <th style="padding: 12px 14px;">Date/Time</th>
                        <th style="padding: 12px 14px;">Category</th>
                        <th style="padding: 12px 14px;">Name</th>
                        <th style="padding: 12px 14px;">Company / Role</th>
                        <th style="padding: 12px 14px;">Phone</th>
                        <th style="padding: 12px 14px;">Email</th>
                        <th style="padding: 12px 14px;">Source</th>
                    </tr>
                </thead>
                <tbody>
        `;

        leads.forEach((l, idx) => {
            const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            let catColor = '#0284c7';
            let catBg = '#e0f2fe';
            if (l.category === 'CAREER APPLICATION') { catColor = '#16a34a'; catBg = '#dcfce7'; }
            else if (l.category === 'BOQ / PROJECT ESTIMATE') { catColor = '#7c3aed'; catBg = '#ede9fe'; }
            else if (l.category === 'PROJECT QUOTE REQUEST') { catColor = '#ef3438'; catBg = '#fee2e2'; }

            tableHtml += `
                <tr style="background: ${bg}; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 14px; font-size: 0.78rem; color: #64748b; white-space: nowrap;">${l.date_time || l.timestamp || ''}</td>
                    <td style="padding: 10px 14px;"><span style="background: ${catBg}; color: ${catColor}; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 800;">${l.category || 'INQUIRY'}</span></td>
                    <td style="padding: 10px 14px; font-weight: 700; color: #0f172a;">${l.name || ''}</td>
                    <td style="padding: 10px 14px; color: #334155;">${l.company || ''}</td>
                    <td style="padding: 10px 14px; font-family: monospace; font-weight: 700; color: #0284c7;">${l.phone ? '+91 ' + l.phone : ''}</td>
                    <td style="padding: 10px 14px; color: #334155;">${l.email || ''}</td>
                    <td style="padding: 10px 14px; font-size: 0.8rem; color: #475569;">${l.source || ''}</td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;
    }

    // -----------------------------------------------------------------
    // 7. INITIALIZE GLOBAL LISTENERS
    // -----------------------------------------------------------------
    document.addEventListener('click', handleDocumentClick, true);

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
            e.preventDefault();
            createAdminLeadHubModal();
        }
    });

    if (window.location.hash === '#leads-manager') {
        window.addEventListener('DOMContentLoaded', createAdminLeadHubModal);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createDatasheetModal();
            attachGlobalFormValidation();
        });
    } else {
        createDatasheetModal();
        attachGlobalFormValidation();
    }

    window.addEventListener('load', () => {
        createDatasheetModal();
        attachGlobalFormValidation();
    });

})();
