import re

# 1. Update Bangalore
with open('av-system-integrator-bangalore.html', 'r', encoding='utf-8') as f:
    blr_html = f.read()

blr_old_block = re.search(r'<section[^>]*style="padding: 70px 0; background: #f8fafc;"[\s\S]*?</section>', blr_html)

blr_new_content = '''<section class="regional-enterprise-solutions" style="padding: clamp(60px, 8vw, 100px) 0; background: #f8fafc;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: #ef3438; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; display: block; margin-bottom: 8px;">GCC & Tech Infrastructure Integration</span>
                <h2 style="font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; color: #071526; margin: 0 0 12px;">Enterprise AV Solutions for Bangalore IT Corridors & Tech Campuses</h2>
                <p style="color: #64748b; font-size: 1rem; max-width: 820px; margin: 0 auto;">Engineering standardized collaboration infrastructure for Global Capability Centers (GCCs), software campuses, and R&amp;D facilities across Whitefield, Outer Ring Road (ORR), Electronic City, and Manyata Tech Park.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #fee2e2; color: #ef3438; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-network-wired"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Standardized MTR &amp; Zoom Room Fleets</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Turnkey deployment of uniform, cross-platform meeting room architectures across multi-floor tech facilities. We integrate Shure MXA920 ceiling tile beamforming microphones, Barco ClickShare wireless collaboration, and Crestron automated room scheduling panels with central enterprise dashboard reporting.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Zero-touch native Microsoft Teams Rooms (MTR) &amp; Zoom Rooms join</li>
                        <li>Automated camera tracking for active speakers without manual pan-tilt</li>
                        <li>Dante/AES67 IP-based audio distribution with sub-millisecond latency</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #e0f2fe; color: #0284c7; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-tv"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Customer Experience Studios &amp; Touch Walls</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Interactive demonstration environments and customer briefing centers (EBCs) designed to showcase complex cloud software, IoT telemetry, and product architectures. We engineer fine-pitch 4K interactive video walls, multi-windowing matrix processors, and immersive acoustic treatments.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>P1.2 to P1.8 ultra-fine pitch active LED displays with zero bezel lines</li>
                        <li>Multi-source concurrent presentation with dynamic layout recall</li>
                        <li>Engineered acoustic wall panels for clean, echo-free audio recording</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #ecfdf5; color: #059669; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-broadcast-tower"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Campus Town Halls &amp; All-Hands Auditoriums</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Turnkey sound reinforcement and large-format stage active LED displays for 200 to 1,000+ capacity corporate all-hands events. Includes Harman JBL Professional line arrays, Crown amplification, Soundcraft digital mixing consoles, and 4K broadcast PTZ cameras for live global streaming.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>EASE 3D acoustic simulation ensuring speech intelligibility (STI &gt; 0.65)</li>
                        <li>NDI / SDI studio camera feeds integrated into corporate CDN pipelines</li>
                        <li>Motorized stage rigging, automated lighting presets, and feedback suppression</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: #071526; margin: 0 0 10px;"><i class="fas fa-truck-loading" style="color: #ef3438; margin-right: 8px;"></i> Bangalore Delivery &amp; Engineering SLA Model</h4>
                <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin: 0;">For Bangalore enterprise clients, GPSPL operates on a scheduled turnkey project delivery model. Hardware (Samsung, LG, Harman, Shure, Crestron, Barco) is supplied directly from authorized distribution channels with verified manufacturer warranties, followed by dispatched senior deployment engineers who execute CAD cabling schematics, rack dressing, Dante audio calibration, and user training on site. Post-commissioning support is managed via remote CMS administration and scheduled preventive AMC maintenance.</p>
            </div>
        </div>
    </section>'''

if blr_old_block:
    blr_html = blr_html.replace(blr_old_block.group(0), blr_new_content)
    with open('av-system-integrator-bangalore.html', 'w', encoding='utf-8') as f:
        f.write(blr_html)
    print("Updated av-system-integrator-bangalore.html with unique GCC & Tech campus content!")

# 2. Update Mumbai
with open('av-system-integrator-mumbai.html', 'r', encoding='utf-8') as f:
    bom_html = f.read()

bom_old_block = re.search(r'<section[^>]*style="padding: 70px 0; background: #f8fafc;"[\s\S]*?</section>', bom_html)

bom_new_content = '''<section class="regional-enterprise-solutions" style="padding: clamp(60px, 8vw, 100px) 0; background: #f8fafc;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: #ef3438; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; display: block; margin-bottom: 8px;">BFSI & Corporate Headquarters AV</span>
                <h2 style="font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; color: #071526; margin: 0 0 12px;">Audio Visual Systems for Mumbai BFSI, Hospitality & Commercial HQs</h2>
                <p style="color: #64748b; font-size: 1rem; max-width: 820px; margin: 0 auto;">Designing mission-critical, high-security boardroom architectures, luxury hospitality sound reinforcement, and corporate communication displays across BKC, Lower Parel, Nariman Point, and Navi Mumbai.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #fee2e2; color: #ef3438; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">High-Security BFSI Boardroom Integration</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Engineered specifically for financial institutions, law firms, and private equity headquarters requiring impenetrable meeting privacy. We implement AES-256 encrypted Dante audio networks, Shure Microflex Wireless systems with RF interference shielding, and Crestron authenticated control networks.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Hardware-encrypted audio transmission protecting sensitive financial discourse</li>
                        <li>Acoustic architectural dampening preventing speech spillover across adjacent rooms</li>
                        <li>Automated executive preset switching for investor conferences &amp; board meetings</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #fef3c7; color: #d97706; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-hotel"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Luxury Hospitality &amp; Ballroom Sound</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Commercial audio distribution and video switching for 5-star hotel banquets, luxury dining lounges, and ballroom venues. Systems include BSS Soundweb London digital audio matrices, Crown multi-channel commercial power amplifiers, and JBL architectural flush ceiling speakers.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Multi-zone ambient music control with scheduled volume leveling</li>
                        <li>Partition-aware audio routing that automatically reconfigures when ballrooms divide</li>
                        <li>High-gain wireless handheld microphones with multi-antenna diversity</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #e0e7ff; color: #4338ca; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-building"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Atrium &amp; Lobby Active LED Displays</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Architectural display statements for corporate lobby atriums in BKC and Lower Parel. Featuring high-refresh, high-contrast active LED video walls with custom structural metal fabrication designed to withstand ambient sunlight while delivering vivid brand storytelling.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Die-cast aluminum cabinets with magnetic front-service maintenance access</li>
                        <li>NovaStar UHD video controllers with seamless failover loop redundancy</li>
                        <li>Cloud-managed enterprise digital signage scheduling via Samsung MagicINFO / LG CMS</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: #071526; margin: 0 0 10px;"><i class="fas fa-truck-loading" style="color: #ef3438; margin-right: 8px;"></i> Mumbai Project Execution &amp; West-Zone Logistics</h4>
                <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin: 0;">GPSPL executes Mumbai corporate and hospitality installations through direct factory-authorized equipment logistics and dedicated field deployment teams. Systems are pre-staged, labeled, and tested prior to site delivery. On-site structural mounting, cabling, DSP calibration, and final handover testing are managed under strict project timelines, backed by manufacturer warranties and remote system management.</p>
            </div>
        </div>
    </section>'''

if bom_old_block:
    bom_html = bom_html.replace(bom_old_block.group(0), bom_new_content)
    with open('av-system-integrator-mumbai.html', 'w', encoding='utf-8') as f:
        f.write(bom_html)
    print("Updated av-system-integrator-mumbai.html with unique BFSI & Hospitality content!")

# 3. Update Hyderabad
with open('av-system-integrator-hyderabad.html', 'r', encoding='utf-8') as f:
    hyd_html = f.read()

hyd_old_block = re.search(r'<section[^>]*style="padding: 70px 0; background: #f8fafc;"[\s\S]*?</section>', hyd_html)

hyd_new_content = '''<section class="regional-enterprise-solutions" style="padding: clamp(60px, 8vw, 100px) 0; background: #f8fafc;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 50px;">
                <span style="color: #ef3438; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; display: block; margin-bottom: 8px;">Mission-Critical & Pharma Corridor AV</span>
                <h2 style="font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; color: #071526; margin: 0 0 12px;">AV Integration for Hyderabad HITEC City, Pharma & GCC Hubs</h2>
                <p style="color: #64748b; font-size: 1rem; max-width: 820px; margin: 0 auto;">Delivering 24/7 mission-critical NOC/SOC command center displays, large convention auditoriums, and hybrid research collaboration spaces across HITEC City, Gachibowli, Financial District, and Genome Valley.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #fee2e2; color: #ef3438; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-desktop"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">24/7 NOC &amp; SOC Command Center Video Walls</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Engineered for IT network operations, data centers, and cybersecurity monitoring rooms requiring uninterrupted 24/7/365 uptime. We configure Samsung QMC 500-nit non-glare commercial displays, ATEN zero-latency KVM matrix switches, and ultra-high-density video processors with hot-swappable power supplies.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Anti-reflective 25% haze panels preventing operator eye fatigue in continuous shifts</li>
                        <li>Hardware-level KVM operator switching with multi-view concurrent telemetry</li>
                        <li>N+1 redundant power supplies and automated thermal regulation</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #f0fdf4; color: #16a34a; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-microscope"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Pharma &amp; Biotech Scientific Training Theatres</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">Specialized audio-visual integration for pharmaceutical research institutes and biotechnology auditoriums in Genome Valley. We integrate LG CreateBoard 4K interactive displays with Android 16 EDLA, multi-source scientific data sharing, and ultra-clean room architectural mounting.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Zero-gap bonded 50-point multi-touch interactive panels for molecular diagrams</li>
                        <li>High-CRI studio camera integration for live laboratory demonstration streaming</li>
                        <li>Sealed acoustic wall structures compatible with clinical cleanroom hygiene standards</li>
                    </ul>
                </div>

                <div style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    <div style="width: 52px; height: 52px; background: #fdf2f8; color: #db2777; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 18px;">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #071526; margin: 0 0 12px;">Financial District Executive Boardrooms</h3>
                    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px;">State-of-the-art hybrid meeting boardrooms for multinational corporates in Gachibowli and the Financial District. Turnkey scope includes Shure Microflex Advance beamforming audio, Samsung professional 4K commercial displays, and unified Crestron room automation.</p>
                    <ul style="color: #475569; font-size: 0.88rem; line-height: 1.6; padding-left: 18px; margin: 0;">
                        <li>Intelligent acoustic echo cancellation (AEC) and noise suppression</li>
                        <li>Single-touch meeting initiation for Microsoft Teams and Zoom Rooms</li>
                        <li>Concealed architectural motorized cable retractor boxes for clutter-free tables</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: #071526; margin: 0 0 10px;"><i class="fas fa-truck-loading" style="color: #ef3438; margin-right: 8px;"></i> Hyderabad Project Delivery &amp; Multi-Site Coordination</h4>
                <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin: 0;">GPSPL delivers enterprise technology infrastructure in Hyderabad through pre-configured, factory-certified hardware shipments and dispatched engineering specialists. We work in tandem with corporate facility managers, general contractors, and IT directors to ensure turnkey delivery on time, backed by direct OEM warranties and remote enterprise network support.</p>
            </div>
        </div>
    </section>'''

if hyd_old_block:
    hyd_html = hyd_html.replace(hyd_old_block.group(0), hyd_new_content)
    with open('av-system-integrator-hyderabad.html', 'w', encoding='utf-8') as f:
        f.write(hyd_html)
    print("Updated av-system-integrator-hyderabad.html with unique NOC & Pharma corridor content!")
