/**
 * GPSPL Studio Interactive Engine (Inspired by SQLSpace Design System)
 * Handles:
 * 1. Interactive Signal Board tab switching with real high-resolution photos & engineering specs
 * 2. Instant 1-Click Reversible View Switcher (Studio vs Classic)
 */

(function () {
    'use strict';

    // Interactive Environment Definitions
    const ENVIRONMENTS = {
        boardroom: {
            tabText: 'Boardroom',
            tag: 'Microsoft Teams & Zoom Native',
            kicker: 'ENTERPRISE COLLABORATION',
            title: 'Executive Boardroom Integration',
            img: '/assests/images/hero/video-technologies-boardroom.webp',
            alt: 'GPSPL Executive Boardroom AV Integration with Shure Microphones',
            specs: [
                { label: 'Audio Architecture', value: 'Shure MXA920 · Dante DSP' },
                { label: 'Display & Visuals', value: 'Dual 85" 4K Commercial Displays' },
                { label: 'Cable Management', value: 'Zero Clutter · Wireless BYOD' },
                { label: 'SLA Guarantee', value: '4-Hour Pan-India On-Site' }
            ],
            boqSector: 'boardroom',
            ctaText: 'Configure Boardroom BOQ →'
        },
        led: {
            tabText: 'Active LED',
            tag: 'Seamless Fine Pitch P1.25',
            kicker: 'LARGE-FORMAT VISUALS',
            title: 'Fine Pitch Active LED Video Wall',
            img: '/assests/images/hero/VideoWall_3.webp',
            alt: 'GPSPL Installed Seamless Active LED Display Wall',
            specs: [
                { label: 'Pixel Pitch & Tech', value: 'P1.25 / P1.56 COB & SMD' },
                { label: 'Controller Engine', value: 'NovaStar COEx Processing' },
                { label: 'Serviceability', value: '100% Front-Service Magnetic' },
                { label: 'SLA Guarantee', value: 'Buffer Module Inventory' }
            ],
            boqSector: 'led',
            ctaText: 'Configure Active LED Wall BOQ →'
        },
        command: {
            tabText: 'Command Center',
            tag: '24/7/365 Mission Critical',
            kicker: 'CRITICAL INFRASTRUCTURE',
            title: 'NOC / SOC Command & Control Room',
            img: '/assests/images/hero/video-wall-command-center.webp',
            alt: 'GPSPL 24/7 Command and Control Room Video Wall Integration',
            specs: [
                { label: 'Console & Standards', value: 'ISO 11064 Ergonomic Consoles' },
                { label: 'Switching Fabric', value: 'Zero-Latency KVM-over-IP' },
                { label: 'Procurement', value: 'GeM Registered · OEM MAF Letters' },
                { label: 'SLA Guarantee', value: '24/7 Dedicated Emergency SLA' }
            ],
            boqSector: 'govt',
            ctaText: 'Configure Command Center BOQ →'
        },
        auditorium: {
            tabText: 'Auditorium',
            tag: 'EASE 3D Acoustic Tuning',
            kicker: 'LARGE VENUE ACOUSTICS',
            title: 'Turnkey Smart Auditorium AV',
            img: '/assests/images/products/professional-audio-solutions.webp',
            alt: 'GPSPL Large Venue Auditorium Sound and Stage LED Systems',
            specs: [
                { label: 'Sound Reinforcement', value: 'Harman JBL Pro Line Arrays' },
                { label: 'Speech Intelligibility', value: 'STI > 0.65 · RT60 Acoustic Tuning' },
                { label: 'Stage Production', value: '4K Backdrop LED · Digital Podium' },
                { label: 'SLA Guarantee', value: 'Annual Maintenance (AMC) SLA' }
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
