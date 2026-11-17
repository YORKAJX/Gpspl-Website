import re

files_map = {
    'conference-room-solutions.html': {
        'title': 'Turnkey Conference Room AV: Scope & Execution Blueprint',
        'body': 'Scope the display (Samsung/LG 4K commercial panels), PTZ conference cameras, Shure/Sennheiser beamforming ceiling microphones, DSP audio matrix, Crestron/AMX control automation, structured cabling, rack dressing, and testing together.',
        'solution': 'Conference Room Solutions',
        'cta_text': 'Request Conference Room BOQ'
    },
    'active-led-wall-installation.html': {
        'title': 'Active LED Wall Installation & Commissioning Blueprint',
        'body': 'Share screen width, height, viewing distance, indoor/outdoor requirement, and wall loading specifications. Complete turnkey scope includes die-cast aluminum cabinets, receiving cards, NovaStar/Colorlight 4K video processors, structural fabrication, sub-distribution panels, calibration, and 4-hour SLA support.',
        'solution': 'Active LED Wall Installation',
        'cta_text': 'Request Active LED BOQ'
    },
    'digital-signage-solutions.html': {
        'title': 'Enterprise Digital Signage Deployment Blueprint',
        'body': 'Plan commercial 16/7 and 24/7 high-brightness displays (Samsung MagicINFO, LG SuperSign), cloud-managed CMS players, anti-theft heavy-duty mounts, and scheduled remote content distribution for corporate reception, retail, and outdoor venues.',
        'solution': 'Digital Signage Solutions',
        'cta_text': 'Request Digital Signage BOQ'
    },
    'kvm-av-switching-solutions.html': {
        'title': 'Mission-Critical KVM & AV Matrix Switching Blueprint',
        'body': 'Architect ultra-low latency 4K AV-over-IP, zero-latency KVM matrix switches (ATEN/Crestron), multi-view video processors, and operator consoles for command & control centers (NOC/SOC), boardrooms, and mission-critical operations.',
        'solution': 'KVM & AV Switching Solutions',
        'cta_text': 'Request KVM & Matrix BOQ'
    },
    'professional-audio-solutions.html': {
        'title': 'Commercial Sound & Professional Audio Engineering Blueprint',
        'body': 'Complete installed sound reinforcement for commercial gyms, fitness studios, auditoriums, clubs, and worship spaces. Scope includes Harman JBL Professional line arrays, Crown commercial amplifiers, BSS/Soundcraft DSP matrices, and high-SPL ceiling speakers.',
        'solution': 'Professional Audio Solutions',
        'cta_text': 'Request Pro Audio BOQ'
    },
    'audio-technologies.html': {
        'title': 'Audio Technology System Integration Blueprint',
        'body': 'Complete architectural audio design, RT60 acoustic survey modeling, speech transmission index (STI) optimization, Dante/AES67 audio networking, and feedback suppression for boardrooms, council chambers, and multipurpose halls.',
        'solution': 'Audio Technologies',
        'cta_text': 'Request Audio System BOQ'
    },
    'unified-communication-collaboration.html': {
        'title': 'Unified Communications (MTR & Zoom Rooms) Blueprint',
        'body': 'End-to-end Microsoft Teams Rooms (MTR), Zoom Rooms, and BYOD hybrid collaboration systems. Includes native room touch consoles, intelligent speaker tracking cameras, ceiling tile microphones, and enterprise IT network provisioning.',
        'solution': 'Unified Communication & Collaboration',
        'cta_text': 'Request UCC System BOQ'
    }
}

def generate_blueprint_html(cfg):
    return f'''<section class="turnkey-scope-blueprint section-padding" id="turnkey-scope-blueprint" aria-labelledby="turnkey-scope-heading" style="background:#071526; color:#f1f5f9; padding:clamp(48px,6vw,80px) 20px; position:relative; overflow:hidden;">
  <div class="container" style="max-width:1200px; margin:0 auto; background:linear-gradient(135deg, rgba(13,34,58,0.85) 0%, rgba(7,21,38,0.95) 100%); border:1px solid rgba(239,52,56,0.35); border-radius:20px; padding:clamp(28px,4vw,44px); box-shadow:0 25px 60px rgba(0,0,0,0.4);">
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:16px;">
      <span style="display:inline-flex; align-items:center; gap:8px; font-size:0.75rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; color:#ff6b6e; background:rgba(239,52,56,0.15); border:1px solid rgba(239,52,56,0.3); padding:6px 14px; border-radius:999px;">
        <i class="fas fa-layer-group"></i> TURNKEY AV SCOPE &amp; EXECUTION BLUEPRINT
      </span>
      <span style="font-size:0.82rem; color:#94a3b8; font-weight:600;"><i class="fas fa-check-circle" style="color:#10b981; margin-right:6px;"></i>Direct OEM Supply &bull; 4-Hour Emergency Delhi NCR SLA</span>
    </div>
    <h2 id="turnkey-scope-heading" style="font-family:'Space Grotesk',sans-serif; font-size:clamp(1.5rem,2.8vw,2.2rem); font-weight:800; color:#ffffff; margin:0 0 16px 0; line-height:1.25;">
      {cfg['title']}
    </h2>
    <p style="font-size:1.02rem; line-height:1.7; color:#cbd5e1; margin-bottom:28px;">
      {cfg['body']}
    </p>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:32px;">
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:20px;">
        <h4 style="font-size:1rem; font-weight:700; color:#ffffff; margin:0 0 8px 0; display:flex; align-items:center; gap:8px;"><i class="fas fa-microchip" style="color:#ef3438;"></i> 1. Hardware &amp; OEM Supply</h4>
        <p style="font-size:0.88rem; color:#94a3b8; line-height:1.6; margin:0;">Direct wholesale supply from Harman/JBL, Samsung, LG, Shure, Crestron, Barco, Poly, ATEN. Complete itemized BOQ with verified manufacturer warranties.</p>
      </div>
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:20px;">
        <h4 style="font-size:1rem; font-weight:700; color:#ffffff; margin:0 0 8px 0; display:flex; align-items:center; gap:8px;"><i class="fas fa-drafting-compass" style="color:#38bdf8;"></i> 2. Engineering &amp; Calibration</h4>
        <p style="font-size:0.88rem; color:#94a3b8; line-height:1.6; margin:0;">Acoustic survey (RT60 calculation), sightline engineering, CAD single-line diagrams (SLD), structured cable dressing &amp; clean rack termination.</p>
      </div>
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:20px;">
        <h4 style="font-size:1rem; font-weight:700; color:#ffffff; margin:0 0 8px 0; display:flex; align-items:center; gap:8px;"><i class="fas fa-shield-alt" style="color:#10b981;"></i> 3. Handover &amp; Support SLA</h4>
        <p style="font-size:0.88rem; color:#94a3b8; line-height:1.6; margin:0;">Full commissioning, admin/operator training, preventive AMC checkups, and 4-hour onsite engineer response window across Delhi NCR.</p>
      </div>
    </div>
    <div style="display:flex; flex-wrap:wrap; align-items:center; gap:16px;">
      <a class="btn-primary" href="/contact?solution={cfg['solution'].replace(' ', '%20')}#contact-enquiry-form" style="background:#ef3438; color:#fff; border-radius:8px; padding:12px 24px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fas fa-file-contract"></i> {cfg['cta_text']}</a>
      <a href="https://wa.me/918920830377?text=Hello%20GPSPL%2C%20I%20need%20a%20turnkey%20quote%20for%20{cfg['solution'].replace(' ', '%20')}." target="_blank" rel="noopener noreferrer" style="background:#25d366; color:#fff; border-radius:8px; padding:12px 24px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fab fa-whatsapp"></i> WhatsApp Quote (Fast Response)</a>
      <a href="tel:+918920830377" style="color:#ffffff; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; padding:12px 16px;"><i class="fas fa-phone-alt" style="color:#ef3438;"></i> +91 89208 30377</a>
    </div>
  </div>
</section>'''

for filename, cfg in files_map.items():
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Pattern to match both aria-label and buyer-scope-check sections
    # Clean out any existing buyer-scope or buying sections
    html = re.sub(r'<section[^>]*id=[\"\']buyer-scope-check[\"\'][^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<section[^>]*aria-label=[\"\']Buying and project planning[\"\'][^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)
    html = re.sub(r'<section[^>]*class=[\"\'][^\"\']*turnkey-scope-blueprint[^\"\']*[\"\'][^>]*>.*?</section>\s*', '', html, flags=re.DOTALL)

    replacement = generate_blueprint_html(cfg)

    # Insert right before </main> or before footer / form-validation
    if '</main>' in html:
        html = html.replace('</main>', replacement + '\n</main>')
    elif '<footer' in html:
        html = html.replace('<footer', replacement + '\n<footer')
    else:
        html = html.replace('<script src="/JS/form-validation.js"', replacement + '\n<script src="/JS/form-validation.js"')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Successfully upgraded scope blueprint in {filename}')
