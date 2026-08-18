/**
 * GPSPL Gated Lead Capture, Anti-Fake Validator, Instant Alert & CSV Export Engine
 * - Target Admin Mobile: +91 89208 30377
 * - Target Admin Email: global@gpspl.co.in
 * - Strict 10-digit Indian Mobile Validation (Blocks fake/sequential/dummy numbers)
 * - Strict Email Validation (Blocks disposable & dummy emails)
 * - 1-Click Professional CSV / Excel Lead Export (Ctrl + Shift + L or #leads-manager)
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
            const cleaned = String(phoneStr).replace(/\D/g, '');

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
            const email = String(emailStr).trim().toLowerCase();

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
        pendingDownloadFilename = filename || url.split('/').pop().split('?')[0];
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
    // 3. DISPATCH LEAD ALERT (Email & Storage)
    // -----------------------------------------------------------------
    async function dispatchLeadAlert(leadData) {
        // 1. Save to local audit backup with formatted IST time
        try {
            const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
            const now = new Date();
            const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
            
            const newLead = {
                id: 'LEAD-' + Date.now().toString().slice(-6),
                date_time: istTime,
                name: leadData.name || 'Not Provided',
                company: leadData.company || 'Not Specified',
                phone: leadData.phone || '',
                email: leadData.email || '',
                source: leadData.source || 'Datasheet Download',
                page: leadData.page || window.location.pathname,
                timestamp: now.toISOString()
            };

            history.unshift(newLead);
            localStorage.setItem('gpspl_captured_leads', JSON.stringify(history));
        } catch(e) {}

        // 2. Dispatch to Admin Email (global@gpspl.co.in) via Zero-Cost FormSubmit / Web3Forms Gateway
        try {
            fetch('https://formsubmit.co/ajax/' + encodeURIComponent(ADMIN_CONFIG.email), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    _subject: `🔥 NEW LEAD: ${leadData.name} (${leadData.company}) - ${leadData.source || 'Datasheet'}`,
                    _template: 'table',
                    _captcha: 'false',
                    'Full Name': leadData.name,
                    'Mobile Number': '+91 ' + leadData.phone,
                    'Email Address': leadData.email,
                    'Company / Organization': leadData.company,
                    'Action / Source': leadData.source,
                    'Page URL': window.location.href,
                    'Admin Target Phone': '+91 ' + ADMIN_CONFIG.phone
                })
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
            source: `Datasheet: ${pendingModelName || pendingDownloadFilename}`,
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
    // 4. ATTACH TO ALL DATASHEET BUTTONS ACROSS THE SITE (Event Delegation)
    // -----------------------------------------------------------------
    function handleDocumentClick(e) {
        const target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const isDownload = target.hasAttribute('download') || href.includes('.pdf') || href.includes('datasheet');

        if (isDownload) {
            // Allow company profile direct download without gatekeeping
            if (href.includes('company-profile') || href.includes('brochure')) {
                return;
            }

            // Gatekeep Samsung & LG & Hardware Datasheets
            if (href.includes('datasheet') || href.includes('samsung') || href.includes('lg-') || href.includes('.pdf')) {
                e.preventDefault();
                e.stopPropagation();

                let modelName = 'Commercial Display';
                if (href.includes('qmc')) modelName = 'Samsung QMC 24/7 Signage';
                else if (href.includes('qbc')) modelName = 'Samsung QBC Crystal UHD';
                else if (href.includes('befx')) modelName = 'Samsung Business TV (BEFX)';
                else if (href.includes('nu88c')) modelName = 'LG NU88C Commercial TV';
                else if (href.includes('tr3er')) modelName = 'LG CreateBoard Interactive Panel';

                openDatasheetModal(href, href.split('/').pop().split('?')[0], modelName);
            }
        }
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
                    source: `Form: ${form.id || form.className || 'General Contact'}`,
                    page: window.location.pathname
                };
                dispatchLeadAlert(leadData);
            });
        });
    }

    // -----------------------------------------------------------------
    // 6. CSV & EXCEL EXPORT ENGINE + ADMIN LEAD HUB MODAL
    // -----------------------------------------------------------------
    window.GPSPL_ExportLeadsCSV = function() {
        const leads = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
        if (leads.length === 0) {
            alert('No captured leads found in local storage yet. Submit a test form or datasheet download to test!');
            return;
        }

        const headers = [
            'Lead ID',
            'Date & Time (IST)',
            'Full Name',
            'Company / Organization',
            'Mobile Number',
            'Work Email',
            'Action / Product / Datasheet',
            'Source Page URL'
        ];

        const csvRows = [headers.join(',')];
        leads.forEach(lead => {
            const row = [
                `"${(lead.id || '').replace(/"/g, '""')}"`,
                `"${(lead.date_time || lead.timestamp || '').replace(/"/g, '""')}"`,
                `"${(lead.name || '').replace(/"/g, '""')}"`,
                `"${(lead.company || '').replace(/"/g, '""')}"`,
                `"${(lead.phone ? '+91 ' + lead.phone : '').replace(/"/g, '""')}"`,
                `"${(lead.email || '').replace(/"/g, '""')}"`,
                `"${(lead.source || '').replace(/"/g, '""')}"`,
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
        a.download = `GPSPL-Leads-Export-${today}.csv`;
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
            <div style="background: #ffffff; border-radius: 20px; width: 100%; max-width: 950px; max-height: 85vh; display: flex; flex-direction: column; padding: 28px; box-shadow: 0 30px 80px rgba(0,0,0,0.4); border: 1px solid #e2e8f0; position: relative;">
                <button type="button" id="gpspl-admin-close" style="position: absolute; top: 18px; right: 18px; background: #f1f5f9; border: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: #64748b; font-size: 16px; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
                    <div>
                        <span style="font-size: 0.72rem; font-weight: 800; color: #ef3438; text-transform: uppercase; letter-spacing: 0.12em;">GPSPL Executive CRM</span>
                        <h3 style="margin: 2px 0 0; color: #071526; font-size: 1.4rem; font-weight: 800;">Captured Leads &amp; Inquiries</h3>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button type="button" id="gpspl-export-csv-btn" style="background: #16a34a; border: none; color: #ffffff; padding: 9px 18px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);">
                            <i class="fas fa-file-excel"></i> Download Leads (CSV / Excel)
                        </button>
                        <button type="button" id="gpspl-clear-leads-btn" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                            <i class="fas fa-trash"></i> Clear Test
                        </button>
                    </div>
                </div>

                <div id="gpspl-leads-table-container" style="overflow-y: auto; flex-grow: 1; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <!-- Leads Table Injected Here -->
                </div>
                
                <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #64748b;">
                    <span>Alerts automatically sent to: <strong>${ADMIN_CONFIG.email}</strong> &bull; <strong>+91 ${ADMIN_CONFIG.phone}</strong></span>
                    <span>Shortkey: <strong>Ctrl + Shift + L</strong></span>
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
            if (confirm('Are you sure you want to clear the local test leads list?')) {
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
                    <p style="font-size: 1rem; font-weight: 700; color: #475569; margin: 0 0 6px;">No Leads Captured Yet</p>
                    <p style="font-size: 0.85rem; margin: 0;">Submit any form or download a Samsung/LG datasheet to see the live data stream here.</p>
                </div>
            `;
            return;
        }

        let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
                <thead style="background: #0f172a; color: #ffffff; position: sticky; top: 0;">
                    <tr>
                        <th style="padding: 12px 14px;">Date/Time</th>
                        <th style="padding: 12px 14px;">Name</th>
                        <th style="padding: 12px 14px;">Company</th>
                        <th style="padding: 12px 14px;">Phone</th>
                        <th style="padding: 12px 14px;">Email</th>
                        <th style="padding: 12px 14px;">Source / Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        leads.forEach((l, idx) => {
            const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            tableHtml += `
                <tr style="background: ${bg}; border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 14px; font-size: 0.78rem; color: #64748b; white-space: nowrap;">${l.date_time || l.timestamp || ''}</td>
                    <td style="padding: 10px 14px; font-weight: 700; color: #0f172a;">${l.name || ''}</td>
                    <td style="padding: 10px 14px; color: #334155;">${l.company || ''}</td>
                    <td style="padding: 10px 14px; font-family: monospace; font-weight: 700; color: #0284c7;">${l.phone ? '+91 ' + l.phone : ''}</td>
                    <td style="padding: 10px 14px; color: #334155;">${l.email || ''}</td>
                    <td style="padding: 10px 14px;"><span style="background: #e0f2fe; color: #0284c7; padding: 3px 8px; border-radius: 6px; font-size: 0.74rem; font-weight: 700;">${l.source || ''}</span></td>
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
