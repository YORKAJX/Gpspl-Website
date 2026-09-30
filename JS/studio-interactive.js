/**
 * GPSPL Studio Interactive Engine (Inspired by SQLSpace Design System)
 * Handles:
 * 1. Interactive Signal Board tab switching with real high-resolution photos & engineering specs
 * 2. Instant 1-Click Reversible View Switcher (Studio vs Classic)
 */

(function () {
    'use strict';

    // Interactive Environment Definitions using 100% Real Commissioned Project Photos
    const ENVIRONMENTS = {
        boardroom: {
            tabText: 'Boardroom',
            tag: 'Shure • Samsung • Barco • Crestron',
            kicker: 'ENTERPRISE COLLABORATION',
            title: 'Executive Video Conference Boardroom',
            img: '/assests/images/projects/gpspl-real/real-boardroom-vc-conference.jpg',
            alt: 'GPSPL Executive Boardroom with Video Conferencing and Shure Microphones',
            specs: [
                { label: 'Audio Architecture', value: 'Shure MXA920 · Dante DSP' },
                { label: 'Display & Visuals', value: 'Samsung 4K Commercial Displays' },
                { label: 'Wireless Sharing', value: 'Barco ClickShare · Zero Clutter' },
                { label: 'Control & SLA', value: 'Crestron MTR · 4-Hour On-Site SLA' }
            ],
            boqSector: 'boardroom',
            ctaText: 'Configure Boardroom BOQ →'
        },
        led: {
            tabText: 'Active LED',
            tag: 'LG Business Solutions • JBL Pro Audio',
            kicker: 'LARGE-FORMAT VISUALS & PRO AUDIO',
            title: 'LG Active LED Wall with JBL Sound',
            img: '/assests/images/projects/gpspl-real/real-lg-active-led-jbl-audio.jpg',
            alt: 'GPSPL Installed LG Commercial Active LED Wall with Floor Standing JBL Pro Subwoofers',
            specs: [
                { label: 'Display Technology', value: 'LG Commercial Fine Pitch LED' },
                { label: 'Sound Reinforcement', value: 'Floor-standing JBL Pro Audio' },
                { label: 'Video Engine', value: 'NovaStar Ultra-HD Controller' },
                { label: 'Service & Spares', value: '100% Front-Service Magnetic Spares' }
            ],
            boqSector: 'led',
            ctaText: 'Configure Active LED Wall BOQ →'
        },
        hospitality: {
            tabText: 'Hospitality',
            tag: 'Sony / LG Visuals • Harman Multi-Zone Audio',
            kicker: 'ARCHITECTURAL INTEGRATION',
            title: 'Luxury Hotel Lounge & Ballroom Display',
            img: '/assests/images/projects/gpspl-real/real-luxury-lounge-led-wall.jpg',
            alt: 'GPSPL Hotel Lounge Display Wall integrated into curved architectural woodwork',
            specs: [
                { label: 'Display Wall', value: 'Sony / LG High-Brightness Display' },
                { label: 'Sound Distribution', value: 'Harman / JBL Multi-Zone BGM' },
                { label: 'Architectural Finish', value: 'Curved Acoustic Wood Paneling' },
                { label: 'Turnkey Integration', value: 'Luxury Hotel & Ballroom AV Handover' }
            ],
            boqSector: 'hospitality',
            ctaText: 'Configure Hospitality BOQ →'
        },
        healthcare: {
            tabText: 'Healthcare',
            tag: 'Lumens 4K PTZ • Clinical OT Telemedicine',
            kicker: 'MEDICAL & SURGICAL AV',
            title: 'Mobile OT Surgical Workstation Cart',
            img: '/assests/images/projects/gpspl-real/real-healthcare-medical-cart-display.png',
            alt: 'GPSPL Healthcare Operation Theater Workstation Cart and Interactive Display',
            specs: [
                { label: 'Clinical Cart', value: 'Ergonomic Medical Cart Workstation' },
                { label: 'Camera & Video', value: 'Lumens 4K PTZ Surgical Transmission' },
                { label: 'Telemedicine Stream', value: 'Bi-directional Low-Latency Consult' },
                { label: 'Chassis Compliance', value: 'Hospital-Grade Cleanable Stainless Unit' }
            ],
            boqSector: 'healthcare',
            ctaText: 'Configure Healthcare BOQ →'
        },
        auditorium: {
            tabText: 'Auditorium',
            tag: 'Harman JBL Pro • Luminous Online UPS',
            kicker: 'LARGE VENUE ACOUSTICS',
            title: 'Heritage Auditorium Stage Active LED',
            img: '/assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg',
            alt: 'GPSPL Heritage Civic Auditorium Stage Active LED Display Backdrop and Line Array Audio',
            specs: [
                { label: 'Sound Reinforcement', value: 'Harman JBL Pro Line Array System' },
                { label: 'Stage Visuals', value: 'Large-Format Stage Active LED Wall' },
                { label: 'Acoustic Engineering', value: 'EASE 3D RT60 Reverberation Tuning' },
                { label: 'Power Infrastructure', value: 'Luminous Online Double-Conversion UPS' }
            ],
            boqSector: 'education',
            ctaText: 'Configure Auditorium BOQ →'
        }
    };

    function initSignalBoard() {
        const board = document.getElementById('studioSignalBoard');
        if (!board) return;

        const tabButtons = board.querySelectorAll('.signal-tab-btn');
        const stageImg = document.getElementById('signalStageImg');
        const pillTag = document.getElementById('signalPillTag');
        const stageKicker = document.getElementById('signalStageKicker');
        const stageTitle = document.getElementById('signalStageTitle');
        const readoutContainer = document.getElementById('signalReadoutContainer');
        const actionBtn = document.getElementById('signalActionBtn');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const sectorKey = this.getAttribute('data-scene');
                const data = ENVIRONMENTS[sectorKey];
                if (!data) return;

                // Update active tab
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Animate image transition
                if (stageImg) {
                    stageImg.style.opacity = '0.3';
                    stageImg.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        stageImg.src = data.img;
                        stageImg.alt = data.alt;
                        stageImg.style.opacity = '1';
                        stageImg.style.transform = 'scale(1)';
                    }, 180);
                }

                // Update text elements
                if (pillTag) pillTag.textContent = data.tag;
                if (stageKicker) stageKicker.textContent = data.kicker;
                if (stageTitle) stageTitle.textContent = data.title;

                // Update Readout specs
                if (readoutContainer && data.specs) {
                    readoutContainer.innerHTML = data.specs.map(spec => `
                        <div class="readout-spec">
                            <span>${spec.label}</span>
                            <strong>${spec.value}</strong>
                        </div>
                    `).join('');
                }

                // Update CTA button link and sector hook
                if (actionBtn) {
                    actionBtn.textContent = data.ctaText;
                    actionBtn.href = `#instant-boq-planner`;
                    actionBtn.setAttribute('data-target-sector', data.boqSector);
                }
            });
        });

        // Pre-select sector on BOQ calculator click
        if (actionBtn) {
            actionBtn.addEventListener('click', function () {
                const targetSector = this.getAttribute('data-target-sector');
                if (targetSector) {
                    const sectorTab = document.querySelector(`.hero-sector-chip[data-sector="${targetSector}"]`);
                    if (sectorTab) sectorTab.click();
                }
            });
        }
    }

    // =========================================================================
    // INSTANT 1-CLICK RESET VIEW CONTROLLER
    // =========================================================================
    window.toggleGpsplView = function () {
        const body = document.body;
        const isClassic = body.classList.contains('gpspl-classic-mode');
        const newMode = isClassic ? 'studio' : 'classic';

        if (newMode === 'classic') {
            body.classList.add('gpspl-classic-mode');
            localStorage.setItem('gpspl_view_preference', 'classic');
            updateToggleBtnUI('classic');
        } else {
            body.classList.remove('gpspl-classic-mode');
            localStorage.setItem('gpspl_view_preference', 'studio');
            updateToggleBtnUI('studio');
        }
    };

    function updateToggleBtnUI(mode) {
        const btn = document.getElementById('btnResetView');
        if (!btn) return;

        if (mode === 'classic') {
            btn.innerHTML = `
                <span class="reset-dot" style="background:#22c55e;"></span>
                <span>⚡ Switch to Studio View</span>
            `;
            btn.title = "Click to return to the modern Studio Architectural view";
        } else {
            btn.innerHTML = `
                <span class="reset-dot"></span>
                <span>↺ Reset to Classic View</span>
            `;
            btn.title = "Click anytime to reset to the classic dark hero view";
        }
    }

    function initViewSwitcher() {
        const savedPref = localStorage.getItem('gpspl_view_preference');
        if (savedPref === 'classic') {
            document.body.classList.add('gpspl-classic-mode');
            updateToggleBtnUI('classic');
        } else {
            document.body.classList.remove('gpspl-classic-mode');
            updateToggleBtnUI('studio');
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSignalBoard();
            initViewSwitcher();
        });
    } else {
        initSignalBoard();
        initViewSwitcher();
    }
})();
