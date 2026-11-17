import os, glob, re

cookie_head_css = '<link rel="stylesheet" href="/css/cookie-consent.css">\n'

cookie_banner_html = '''    <!-- ====== COOKIE CONSENT BANNER ====== -->
    <div id="gpspl-cookie-banner" class="gpspl-cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent notice" style="display:none;">
        <div class="gpspl-cookie-inner">
            <div class="gpspl-cookie-left">
                <div class="gpspl-cookie-icon"><i class="fas fa-shield-alt"></i></div>
                <div class="gpspl-cookie-text">
                    <strong>This website uses cookies</strong>
                    <p>We use cookies to analyze traffic and improve your experience on gpspl.co.in. By clicking <em>Allow All Cookies</em>, you consent to our use of cookies. <a href="/privacy-policy" class="gpspl-cookie-link">Privacy Policy</a></p>
                </div>
            </div>
            <div class="gpspl-cookie-actions">
                <button type="button" class="gpspl-btn-cookie-manage" id="gpspl-cookie-manage">Customize</button>
                <button type="button" class="gpspl-btn-cookie-accept" id="gpspl-cookie-accept">Allow All Cookies</button>
            </div>
        </div>
    </div>
    <div id="gpspl-cookie-modal" class="gpspl-cookie-modal" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="gpspl-cookie-modal-title">
        <div class="gpspl-cookie-modal-box">
            <div class="gpspl-cookie-modal-header">
                <h3 id="gpspl-cookie-modal-title"><i class="fas fa-sliders-h" style="color:var(--primary,#ef3438); margin-right:8px;"></i> Cookie Preferences</h3>
                <button type="button" class="gpspl-cookie-modal-close" id="gpspl-cookie-close">&times;</button>
            </div>
            <div class="gpspl-cookie-modal-body">
                <p style="font-size:0.88rem; color:#64748b; margin-bottom:16px;">Customize your cookie choices. Essential cookies are strictly required for security and core navigation.</p>
                <div class="gpspl-cookie-option">
                    <div class="gpspl-cookie-option-info">
                        <strong>Strictly Necessary</strong>
                        <p>Core site security, form anti-abuse tokens and layout state.</p>
                    </div>
                    <span class="gpspl-cookie-badge-always">Required</span>
                </div>
                <div class="gpspl-cookie-option">
                    <div class="gpspl-cookie-option-info">
                        <strong>Performance &amp; Analytics</strong>
                        <p>Google Analytics 4 telemetry to measure enquiry paths and site speed.</p>
                    </div>
                    <label class="gpspl-cookie-switch">
                        <input type="checkbox" id="cookie-analytics-toggle" checked>
                        <span class="gpspl-cookie-slider"></span>
                    </label>
                </div>
            </div>
            <div class="gpspl-cookie-modal-footer">
                <button type="button" class="gpspl-btn-cookie-save" id="gpspl-cookie-save">Save &amp; Continue</button>
            </div>
        </div>
    </div>
    <script src="/JS/cookie-consent.js" defer></script>'''

html_files = [f for f in glob.glob('**/*.html', recursive=True) if not f.startswith('node_modules') and not f.startswith('.git') and not f.startswith('modules')]

updated_count = 0
for fpath in html_files:
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            html = f.read()
        if 'id="gpspl-cookie-banner"' in html:
            continue
        
        # Inject CSS in head
        if '</head>' in html and 'cookie-consent.css' not in html:
            html = html.replace('</head>', f'{cookie_head_css}</head>')
        
        # Inject banner before closing body
        if '</body>' in html:
            html = html.replace('</body>', f'{cookie_banner_html}\n</body>')
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(html)
            updated_count += 1
    except Exception as e:
        print(f"Error on {fpath}: {e}")

print(f"Universal cookie consent banner injected into {updated_count} files!")
