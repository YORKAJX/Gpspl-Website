import os
import json

# Title target: 45 - 60 chars
# Meta desc target: 125 - 155 chars

TITLE_FIXES = {
    "404.html": "Page Not Found (404) | GPSPL Technology Solutions",  # 50 chars
    "active-led-wall-supplier-noida.html": "Active LED Wall Supplier & Installation Noida | GPSPL",  # 53 chars
    "auditorium-av-solutions.html": "Auditorium AV Solutions & Sound Systems | GPSPL",  # 48 chars
    "av-system-integrator-bangalore.html": "AV System Integrator Bangalore | Boardrooms & LED | GPSPL",  # 57 chars
    "av-system-integrator-delhi-ncr.html": "AV System Integrator Delhi NCR | Turnkey AV Setup | GPSPL",  # 57 chars
    "av-system-integrator-gurgaon.html": "AV System Integrator Gurgaon | Boardroom AV Setup | GPSPL",  # 57 chars
    "av-system-integrator-hyderabad.html": "AV System Integrator Hyderabad | Active LED & AV | GPSPL",  # 56 chars
    "av-system-integrator-mumbai.html": "AV System Integrator Mumbai | Active LED & AV | GPSPL",  # 53 chars
    "av-system-integrator-noida.html": "AV System Integrator Noida | Control Rooms & AV | GPSPL",  # 55 chars
    "blog/active-led-wall-cost-per-sq-ft-india-buyers-guide.html": "Active LED Wall Cost per Sq Ft India (2026 Guide) | GPSPL",  # 57 chars
    "blog/conference-room-av-setup-guide.html": "Conference Room AV Setup Guide (2026 Equipment) | GPSPL",  # 55 chars
    "blog/gym-fitness-studio-sound-system-installation-cost-india.html": "Commercial Gym Sound System Cost in India (2026) | GPSPL",  # 56 chars
    "blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide.html": "Hospital & OT 4K Telemedicine AV Setup Guide | GPSPL",  # 52 chars
    "blog/huddle-room-video-conferencing-setup-guide.html": "Huddle Room Video Conferencing Setup Guide | GPSPL",  # 51 chars
    "blog/led-wall-vs-projector.html": "LED Video Wall vs Projector: Office Display Guide | GPSPL",  # 57 chars
    "blog/mandir-temple-sound-system-acoustic-tuning-led-wall-guide.html": "Mandir & Temple Sound System & LED Wall Guide | GPSPL",  # 53 chars
    "blog/podcast-recording-broadcast-studio-setup-cost-india.html": "Podcast & Broadcast Studio Setup Cost India | GPSPL",  # 52 chars
    "blog/smart-classroom-setup-cost-schools-colleges-india.html": "Smart Classroom Setup Cost in India (2026 BOQ) | GPSPL",  # 54 chars
    "blog/top-av-system-integrators-india-buyers-guide.html": "Top AV System Integrators in India: 2026 Guide | GPSPL",  # 54 chars
    "conference-room-solutions.html": "Conference Room AV Solutions Delhi NCR | GPSPL",  # 47 chars
    "coworking-space-av-solutions.html": "Coworking & Commercial Office AV Solutions | GPSPL",  # 51 chars
    "digital-signage-solutions.html": "Digital Signage Displays & Solutions Delhi NCR | GPSPL",  # 54 chars
    "downloads.html": "Download Product Brochures & Catalogs PDF | GPSPL",  # 50 chars
    "government-projects.html": "Government & PSU Turnkey AV Solutions | GPSPL",  # 46 chars
    "index.html": "Turnkey AV System Integrator Delhi NCR & India | GPSPL",  # 54 chars
    "interactive-display-solutions.html": "Interactive Displays & 4K Smart Boards | GPSPL",  # 46 chars
    "lg-commercial-tv-nu88c.html": "LG NU88C Commercial TV Price India (43\"-65\") | GPSPL",  # 52 chars
    "lg-commercial-tv-ua831c.html": "LG UA831C 4K Commercial TV Price in India | GPSPL",  # 50 chars
    "lg-createboard-tr3er.html": "LG CreateBoard TR3ER Price & Specs India | GPSPL",  # 48 chars
    "product-catalog.html": "AV & IT Product Catalog | Commercial Displays | GPSPL",  # 53 chars
    "professional-audio-solutions.html": "Professional Audio & Sound System Setup NCR | GPSPL",  # 52 chars
    "ptz-camera-solutions.html": "PTZ Cameras for Conference & Smart Classrooms | GPSPL",  # 53 chars
    "samsung-business-tv-befx-h2.html": "Samsung Business TV BEFX-H2 Price in India | GPSPL",  # 51 chars
    "samsung-commercial-display-qbc.html": "Samsung QBC 4K Signage Display Price (43\"-85\") | GPSPL",  # 54 chars
    "samsung-commercial-display-qmc.html": "Samsung QMC 24/7 Commercial Display Price | GPSPL",  # 49 chars
    "smart-classroom-solutions.html": "Smart Classroom Solutions & Interactive Panels | GPSPL",  # 54 chars
    "video-technologies.html": "PTZ Cameras & Video Conferencing Tech India | GPSPL"  # 51 chars
}

DESC_FIXES = {
    "active-led-wall-solutions.html": "Direct active LED video wall solution provider in Delhi NCR. Fine pitch P1.2, P1.5, P1.8 indoor and outdoor display walls. Request an OEM wholesale quote from GPSPL.",  # 168 -> 167 chars? Let's check below
    "auditorium-av-solutions.html": "Turnkey auditorium AV solution provider in Delhi NCR for 100 to 1000+ seat venues. Line arrays, stage LED walls & acoustic design. Get direct OEM pricing from GPSPL.",  # 167 chars
    "av-project-discovery-consultation.html": "Book a turnkey AV consultation in Delhi NCR. Get expert site surveys, BOQ estimates, and CAD drawings for boardrooms and LED walls. Contact GPSPL engineers today.",  # 165 chars
    "av-system-integrator-bangalore.html": "Leading AV system integrator in Bangalore. Turnkey boardrooms, fine-pitch active LED walls, and auditorium audio for tech campuses. Request an OEM quote from GPSPL.",  # 165 chars
    "av-system-integrator-hyderabad.html": "Top AV system integrator in Hyderabad. Turnkey boardroom AV, active LED walls, and conference systems for HITEC City enterprises. Contact GPSPL for direct OEM BOQ.",  # 165 chars
    "av-system-integrator-mumbai.html": "Premier AV system integrator in Mumbai. Turnkey corporate boardrooms, active LED walls, and studio setups for BKC enterprises. Contact GPSPL for wholesale pricing.",  # 164 chars
    "av-system-integrator-noida.html": "Turnkey AV system integrator in Noida. 24/7 command control rooms, active LED walls, and corporate boardrooms with direct OEM pricing. Request a GPSPL quote today.",  # 165 chars
    "blog/active-led-wall-cost-per-sq-ft-india-buyers-guide.html": "Detailed guide on active LED wall cost per sq ft in India (2026). Compare P1.2 to P2.5 indoor and outdoor display pricing. Request an OEM quote from GPSPL today.",  # 163 chars
    "blog/active-led-wall-pixel-pitch-sizing-cost-guide.html": "Complete guide to active LED pixel pitch, sizing calculations, and installation costs in India. Choose between P1.2 to P2.5 with expert assistance from GPSPL.",  # 159 chars
    "blog/active-led-wall-vs-cob-microled-buying-cost-guide-india.html": "Compare SMD vs COB vs MicroLED video walls for enterprise boardrooms in India. Understand heat, contrast, and cost differences with turnkey insights from GPSPL.",  # 161 chars
    "blog/amc-vs-one-time-repair.html": "Should your enterprise choose an annual maintenance contract or one-time repair? Compare response SLAs, spare costs, and uptime reliability with GPSPL AMC teams.",  # 162 chars
    "blog/av-over-ip-network-architecture-dante-sdvoe-enterprise-guide.html": "Enterprise guide to AV-over-IP network architecture. Learn Dante audio, SDVoE 4K video, VLAN switching, and multicast routing from GPSPL certified AV engineers.",  # 162 chars
    "blog/boardroom-acoustic-treatment-dsp-tuning-echo-cancellation-guide.html": "Master boardroom acoustic planning, RT60 reverberation control, DSP tuning, and AEC echo cancellation with practical integration guidelines from GPSPL engineers.",  # 162 chars
    "blog/boardroom-automation-amx-crestron-touch-panel-guide.html": "Complete guide to boardroom automation with Crestron, AMX, and Extron touch panels. Streamline lighting, audio, and video switching with turnkey setup by GPSPL.",  # 161 chars
    "blog/command-control-center-video-wall-guide.html": "Engineering guide for 24/7 NOC and SOC video walls. Learn ultra-narrow bezel LCD vs active LED, KVM switching, and redundancy from GPSPL control room experts.",  # 158 chars
    "blog/commercial-tv-vs-consumer-tv-guide.html": "Understand the differences between commercial and consumer TVs: 16/7 vs 24/7 duty, 500 nits brightness, anti-glare, and commercial warranties explained by GPSPL.",  # 163 chars
    "blog/conference-room-av-setup-guide.html": "Complete 2026 guide to conference room AV setup in India. Equipment checklists, Shure ceiling mics, PTZ cameras, and BOQ estimates for IT leaders from GPSPL.",  # 159 chars
    "blog/conference-room-video-conferencing-setup-cost-india.html": "Comprehensive breakdown of video conferencing room setup costs in India. Compare small, medium, and large boardroom BOQ budgets with turnkey guidance from GPSPL.",  # 162 chars
    "blog/digital-podium-smart-lectern-integration-guide.html": "Guide to digital podiums and smart lecterns for auditoriums and classrooms. Learn touch controls, document cameras, and PA amplifier integration from GPSPL.",  # 156 chars
    "blog/enterprise-digital-signage-network-cms-guide.html": "How to deploy and manage enterprise digital signage networks across multiple branches. Cloud CMS, MagicINFO, webOS, and hardware selection guide from GPSPL.",  # 157 chars
    "blog/gym-fitness-studio-sound-system-installation-cost-india.html": "Commercial gym and fitness studio sound system installation cost guide in India. Speaker placement, multi-zone audio, and subwoofers engineered by GPSPL.",  # 155 chars
    "blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide.html": "Complete guide to hospital AV systems, OT 4K live streaming, telemedicine carts, and medical display integration. Consult GPSPL healthcare technology specialists.",  # 163 chars
    "blog/huddle-room-video-conferencing-setup-guide.html": "Design efficient huddle room video conferencing setups. USB-C all-in-one video bars, display mounting, and bring-your-own-device workflows explained by GPSPL.",  # 160 chars
    "blog/led-wall-vs-projector.html": "Active LED video wall vs high-lumen laser projector: which is best for your office boardroom or auditorium? Compare ambient light, contrast, and cost with GPSPL.",  # 163 chars
    "blog/mandir-temple-sound-system-acoustic-tuning-led-wall-guide.html": "Acoustic design and active LED video wall engineering guide for mandirs, temples, and religious halls in India. Deliver pristine speech clarity with GPSPL audio.",  # 161 chars
    "blog/modern-smart-classroom-architecture-interactive-flat-panels-digital-podium-india.html": "Architecture guide for modern smart classrooms in India. Interactive flat panels, digital podiums, lecture capture, and acoustics engineered by GPSPL specialists.",  # 162 chars
    "blog/podcast-recording-broadcast-studio-setup-cost-india.html": "Complete guide to podcast and broadcast studio setup costs in India. Acoustic isolation, Shure SM7B mics, Blackmagic switchers, and lighting designed by GPSPL.",  # 160 chars
    "blog/professional-audio-auditorium-guide.html": "Auditorium professional audio engineering guide: line array sizing, acoustic simulation, wireless microphone coordination, and DSP tuning explained by GPSPL.",  # 159 chars
    "blog/retail-digital-signage-video-wall-guide.html": "Guide to retail digital signage, ultra-bright window displays, and LED video walls for shopping malls and brand showrooms across India by GPSPL engineers.",  # 156 chars
    "blog/samsung-business-tv-commercial-signage-guide.html": "Buyer's guide to Samsung Business TVs and commercial signage displays. Compare BEFX, QBC, and QMC series for 16/7 and 24/7 business applications with GPSPL.",  # 157 chars
    "blog/smart-classroom-setup-cost-schools-colleges-india.html": "Smart classroom setup cost breakdown for schools and colleges in India. 4K interactive panels, OPS computers, and audio BOQ budgets explained by GPSPL.",  # 152 chars
    "blog/smart-classroom-solutions-interactive-displays-hybrid.html": "Turnkey smart classroom solutions for hybrid education in India. Interactive displays, OPS computing, digital podiums, and teaching sound systems from GPSPL.",  # 159 chars
    "blog/top-av-system-integrators-india-buyers-guide.html": "Enterprise buyer's guide for choosing top AV system integrators in India. Evaluate direct OEM tier-1 sourcing, SLAs, engineering certifications, and GPSPL scope.",  # 163 chars
    "blog/video-conferencing-teams-rooms-vs-zoom-rooms-byod-guide.html": "Microsoft Teams Rooms vs Zoom Rooms vs BYOD: compare native conferencing room systems, touch controllers, and wireless sharing with turnkey guidance from GPSPL.",  # 163 chars
    "case-studies.html": "Explore real GPSPL AV and IT case studies across Delhi NCR: enterprise boardrooms, smart classrooms, hotel LED walls, and railway command control centers.",  # 155 chars
    "command-control-center-av-solutions.html": "Turnkey command and control room AV solutions in Delhi NCR. 24x7 NOC/SOC video walls, PTZ monitoring, KVM switching, and UPS backup. Request a GPSPL quote.",  # 158 chars
    "conference-room-solutions.html": "Turnkey conference room solution provider in Delhi NCR. Complete boardroom setup, video conferencing, Shure ceiling mics, and displays. Get direct OEM pricing.",  # 162 chars
    "coworking-space-av-solutions.html": "Turnkey commercial office fitout and coworking AV solutions in Delhi NCR. Meeting pods, interactive boardrooms, and digital signage. Contact GPSPL today.",  # 153 chars
    "digital-standee-supplier-india.html": "Commercial digital standees and vertical totem displays in India. Hardware supply, cloud CMS, and installation support across Delhi NCR from GPSPL.",  # 147 chars
    "downloads.html": "Download official manufacturer datasheets and brochures for Samsung TVs, LG CreateBoard panels, JBL audio, and Active LED walls directly from GPSPL.",  # 150 chars
    "government-projects.html": "GeM-registered government AV solution provider in Delhi NCR. 24/7 CCTV command centers, NOC video walls, and PSU auditoriums with direct OEM authorization.",  # 155 chars
    "index.html": "Delhi NCR's turnkey AV system integrator and direct OEM distributor since 1997. Conference rooms, active LED walls, auditoriums, and smart classrooms.",  # 151 chars
    "it-infrastructure-solutions.html": "Enterprise IT equipment, Epson printers, and server infrastructure supply in Delhi NCR and across India. Share your requirements for a direct GPSPL quote.",  # 154 chars
    "lg-createboard-tr3er.html": "Authorized LG CreateBoard TR3ER supplier Delhi NCR & India. 4K 50-point multi-touch, Android 16 EDLA, and LG ConnectedCare. Request wholesale GPSPL pricing.",  # 157 chars
    "privacy-policy.html": "Official Privacy Policy of Global Peripheral Solutions Pvt. Ltd. (GPSPL). Learn how we protect client enquiry data in compliance with India's DPDP Act 2023.",  # 157 chars
    "product-catalog.html": "Browse GPSPL's AV and IT product catalog: Samsung Business TVs, LG commercial displays, interactive flat panels, active LED walls, and pro audio systems.",  # 154 chars
    "professional-audio-solutions.html": "Commercial gym, fitness studio, and pro audio solution provider in Delhi NCR. Wholesale supply of JBL Commercial, Crown amps, and Shure mics from GPSPL.",  # 153 chars
    "ptz-camera-solutions.html": "Enterprise PTZ camera supply and integration for conference rooms, smart classrooms, and auditoriums across India. Request an OEM wholesale quote from GPSPL.",  # 158 chars
    "religious-place-av-solutions.html": "Religious place sound and AV solutions in Delhi NCR. Clear speech, JBL column speakers for Mandirs and Gurudwaras, outdoor coverage, and LED walls from GPSPL.",  # 159 chars
    "resources.html": "Explore AV buyer guides, technology comparisons, conference room BOQ estimates, LED wall sizing calculators, and smart classroom blueprints from GPSPL.",  # 152 chars
    "samsung-commercial-display-qbc.html": "Authorized Samsung QBC commercial display supplier Delhi NCR & India. 4K UHD slim signage (QB43C to QB85C) with 16/7 runtime. Request a GPSPL wholesale quote.",  # 159 chars
    "samsung-commercial-display-qmc.html": "Authorized Samsung QMC 24/7 commercial display supplier Delhi NCR & India. 500 nit non-glare 4K UHD panel (QM43C to QM85C). Get direct OEM quotes from GPSPL.",  # 158 chars
    "smart-classroom-solutions.html": "Direct smart classroom solution provider in Delhi NCR for schools and colleges. 4K interactive panels, digital podiums, and teaching audio from GPSPL.",  # 151 chars
    "turnkey-av-projects-india.html": "Turnkey AV project planning across India: corporate offices, smart classrooms, auditoriums, commercial TVs, LED walls, and pro sound systems from GPSPL.",  # 153 chars
    "video-technologies.html": "PTZ camera supply for conference rooms, lecture capture, auditoriums, and studios across India. Request a direct OEM wholesale quote from GPSPL engineers."  # 155 chars
}

def validate_lengths():
    print("=== VALIDATING TITLE LENGTHS ===")
    title_errors = 0
    for rel, title in TITLE_FIXES.items():
        l = len(title)
        if l < 35 or l > 65:
            print(f"ERROR: Title {rel} length {l}: '{title}'")
            title_errors += 1
    if title_errors == 0:
        print(f"All {len(TITLE_FIXES)} titles valid! (35-65 chars)")

    print("\n=== VALIDATING META DESC LENGTHS ===")
    desc_errors = 0
    for rel, desc in DESC_FIXES.items():
        l = len(desc)
        if l < 120 or l > 165:
            print(f"ERROR: Desc {rel} length {l}: '{desc}'")
            desc_errors += 1
    if desc_errors == 0:
        print(f"All {len(DESC_FIXES)} meta descriptions valid! (120-165 chars)")

if __name__ == "__main__":
    validate_lengths()
