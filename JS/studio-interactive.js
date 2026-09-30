/**
 * GPSPL Studio Interactive Engine (Inspired by SQLSpace Design System)
 * Handles:
 * 1. Interactive Signal Board tab switching with real high-resolution photos & engineering specs
 * 2. Instant 1-Click Reversible View Switcher (Studio vs Classic)
 */

(function () {
    'use strict';

    // 6 High-Conversion Commercial Domains
    const ENVIRONMENTS = {
        boardroom: {
            tabText: 'Boardrooms',
            tag: 'Shure • Samsung • Barco • Crestron',
            kicker: 'ENTERPRISE COLLABORATION & MTR',
            title: 'Executive Video Conference Boardroom',
            img: '/assests/images/projects/gpspl-real/real-boardroom-vc-conference.jpg',
            alt: 'GPSPL Executive Boardroom with Video Conferencing and Shure Microphones',
            waveformColor: '#d96538',
            waveformRate: 'DANTE • 4K60',
            specs: [
                { label: 'Audio Architecture', value: 'Shure MXA920 · Dante DSP' },
                { label: 'Display & Visuals', value: 'Samsung 4K Commercial Displays' },
                { label: 'Wireless Sharing', value: 'Barco ClickShare · Zero Clutter' },
                { label: 'Control & SLA', value: 'Crestron MTR · 4-Hour On-Site SLA' }
            ],
            boqSector: 'boardroom',
            ctaText: 'Configure Boardroom BOQ →',
            waText: 'Hi GPSPL, I need a turnkey quote for an Executive Boardroom / MTR setup.'
        },
        led: {
            tabText: 'Active LED',
            tag: 'LG Business Solutions • JBL Pro Audio',
            kicker: 'LARGE-FORMAT VISUALS & PRO AUDIO',
            title: 'LG Active LED Wall with Floor JBL Audio',
            img: '/assests/images/projects/gpspl-real/real-lg-active-led-jbl-audio.jpg',
            alt: 'GPSPL Installed LG Commercial Active LED Wall with Floor Standing JBL Pro Subwoofers',
            waveformColor: '#f59e0b',
            waveformRate: 'COEx • 3840Hz',
            specs: [
                { label: 'Display Technology', value: 'LG Fine Pitch LED (P0.9–P2.5)' },
                { label: 'Sound Reinforcement', value: 'Floor-standing JBL Pro Subwoofers' },
                { label: 'Video Engine', value: 'NovaStar Ultra-HD Controller' },
                { label: 'Service & Spares', value: '100% Front-Service Magnetic Spares' }
            ],
            boqSector: 'led',
            ctaText: 'Configure Active LED BOQ →',
            waText: 'Hi GPSPL, I need a direct OEM quote for an Active LED Video Wall.'
        },
        signage: {
            tabText: 'Signage',
            tag: 'Samsung MagicINFO • LG SuperSign • Kiosks',
            kicker: 'COMMERCIAL DISPLAYS & DIGITAL SIGNAGE',
            title: 'Cloud-Managed 4K Signage & Interactive Kiosks',
            img: '/assests/images/projects/gpspl-real/real-luxury-lounge-led-wall.jpg',
            alt: 'GPSPL Luxury Digital Signage Display Wall integrated into architectural woodwork',
            waveformColor: '#38bdf8',
            waveformRate: 'CLOUD CMS • 24/7',
            specs: [
                { label: 'Display Panels', value: 'Samsung / LG 500-700 Nit Commercial' },
                { label: 'Content Management', value: 'MagicINFO / SuperSign Cloud CMS' },
                { label: 'Form Factors', value: 'Slim Totems, Menu Boards & Kiosks' },
                { label: 'Turnkey Supply', value: 'Bulk Wholesale Supply & Deployment' }
            ],
            boqSector: 'signage',
            ctaText: 'Configure Signage BOQ →',
            waText: 'Hi GPSPL, I require a quote for Commercial Digital Signage Displays & Cloud CMS.'
        },
        classroom: {
            tabText: 'Smart Class',
            tag: '4K IFPDs 65"-86" • Digital Podiums • Lumens',
            kicker: 'EDUCATION & HYBRID LEARNING',
            title: 'Smart Classroom & Interactive Flat Panels',
            img: '/assests/images/projects/gpspl-real/real-healthcare-medical-cart-display.png',
            alt: 'GPSPL Smart Classroom Interactive Display and Lecture Capture Setup',
            waveformColor: '#10b981',
            waveformRate: '4K TOUCH • 40-PT',
            specs: [
                { label: 'Touch Displays', value: '4K Interactive Panels (65", 75", 86")' },
                { label: 'Lecture Capture', value: 'Lumens 4K PTZ Tracking Cameras' },
                { label: 'Presenter Station', value: 'Motorized Digital Audio Podiums' },
                { label: 'Procurement', value: 'GeM Portal Authorized & Institutional' }
            ],
            boqSector: 'education',
            ctaText: 'Configure Smart Class BOQ →',
            waText: 'Hi GPSPL, I need wholesale / turnkey pricing for Smart Classrooms & Interactive Panels.'
        },
        cctv: {
            tabText: 'CCTV / NOC',
            tag: '24/7 Video Wall • AI Analytics • KVM Matrix',
            kicker: 'MISSION-CRITICAL SURVEILLANCE & NOC',
            title: 'Command Center Video Wall & Surveillance',
            img: '/assests/images/hero/video-wall-command-center.webp',
            alt: 'GPSPL 24/7 Command and Control Room Video Wall with Zero-Latency KVM Matrix',
            waveformColor: '#ef4444',
            waveformRate: 'ZERO-LATENCY • KVM',
            specs: [
                { label: 'Mission Display', value: '24/7 Ultra-Narrow Bezel / LED Wall' },
                { label: 'Surveillance Stream', value: 'AI IP Cameras & Multi-Channel NVR' },
                { label: 'Matrix Control', value: 'ATEN Zero-Latency KVM-over-IP' },
                { label: 'Console Design', value: 'ISO 11064 Ergonomic Operator Desk' }
            ],
            boqSector: 'govt',
            ctaText: 'Configure Command Center BOQ →',
            waText: 'Hi GPSPL, I require a quote for Command Center Video Walls & CCTV Surveillance.'
        },
        auditorium: {
            tabText: 'Auditoriums',
            tag: 'Harman JBL Pro • Luminous Online UPS',
            kicker: 'LARGE VENUE ACOUSTICS & STAGE LED',
            title: 'Heritage Auditorium Stage Active LED & Sound',
            img: '/assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg',
            alt: 'GPSPL Heritage Civic Auditorium Stage Active LED Display Backdrop and Line Array Audio',
            waveformColor: '#d96538',
            waveformRate: 'RT60 TUNED • 130dB',
            specs: [
                { label: 'Sound Reinforcement', value: 'Harman JBL Pro Line Array System' },
                { label: 'Stage Visuals', value: 'P2.5 Large-Format Stage LED Wall' },
                { label: 'Acoustic Engineering', value: 'EASE 3D RT60 Reverberation Tuning' },
                { label: 'Power Infrastructure', value: 'Luminous Online Double-Conversion UPS' }
            ],
            boqSector: 'education',
            ctaText: 'Configure Auditorium BOQ →',
            waText: 'Hi GPSPL, I need a proposal for an Auditorium Stage Active LED & Pro Audio Sound System.'
        }
    };

    let currentWaveColor = '#d96538';
    let wavePhase = 0;
    let waveFreqMult = 1;

    // =========================================================================
    // 1. REAL-TIME AUDIO-VISUAL DSP WAVEFORM CANVAS
    // =========================================================================
    function initWaveformEngine() {
        const canvas = document.getElementById('studioWaveformCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function renderWave() {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            wavePhase += 0.045 * waveFreqMult;

            // Draw frequency grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();

            // Main oscillating DSP sine wave
            ctx.lineWidth = 1.8;
            ctx.strokeStyle = currentWaveColor;
            ctx.beginPath();

            for (let x = 0; x < width; x++) {
                const normalizedX = x / width;
                const envelope = Math.sin(normalizedX * Math.PI); // Window envelope
                const y1 = Math.sin(x * 0.12 * waveFreqMult + wavePhase) * (height * 0.32);
                const y2 = Math.cos(x * 0.06 * waveFreqMult - wavePhase * 0.8) * (height * 0.16);
                const y = (height / 2) + ((y1 + y2) * envelope);

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Secondary harmonic shadow wave
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            for (let x = 0; x < width; x += 2) {
                const normalizedX = x / width;
                const envelope = Math.sin(normalizedX * Math.PI);
                const y = (height / 2) + Math.sin(x * 0.18 + wavePhase * 1.4) * (height * 0.22) * envelope;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            requestAnimationFrame(renderWave);
        }

        renderWave();
    }

    // =========================================================================
    // 2. SIGNAL BOARD INTERACTIVE SWITCHER
    // =========================================================================
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
        const waBtn = document.getElementById('signalWaBtn');
        const rateLabel = board.querySelector('.waveform-rate');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const sectorKey = this.getAttribute('data-scene');
                const data = ENVIRONMENTS[sectorKey];
                if (!data) return;

                // Update active tab button
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Shift waveform color & speed
                currentWaveColor = data.waveformColor || '#d96538';
                waveFreqMult = (sectorKey === 'cctv' || sectorKey === 'auditorium') ? 1.4 : 1.0;
                if (rateLabel) rateLabel.textContent = data.waveformRate;

                // Animate image transition
                if (stageImg) {
                    stageImg.style.opacity = '0.25';
                    stageImg.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        stageImg.src = data.img;
                        stageImg.alt = data.alt;
                        stageImg.style.opacity = '1';
                        stageImg.style.transform = 'scale(1)';
                    }, 160);
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

                // Update WhatsApp direct button
                if (waBtn) {
                    const encodedMsg = encodeURIComponent(data.waText);
                    waBtn.href = `https://wa.me/918920830377?text=${encodedMsg}`;
                }
            });
        });
    }

    // =========================================================================
    // 3. 5-SECOND HERO EXPRESS INQUIRY HANDLER
    // =========================================================================
    window.handleHeroExpressSubmit = function (event) {
        event.preventDefault();
        const phone = document.getElementById('heroExpPhone')?.value.trim();
        const sector = document.getElementById('heroExpSector')?.value;
        const successMsg = document.getElementById('heroExpSuccess');

        if (!phone || !sector) return;

        // Show instant visual success feedback
        if (successMsg) {
            successMsg.style.display = 'flex';
        }

        // Send to Lead Capture API if available
        try {
            if (window.GPSPL_LEAD && typeof window.GPSPL_LEAD.capture === 'function') {
                window.GPSPL_LEAD.capture({
                    type: 'hero_express',
                    phone: phone,
                    service: sector,
                    source: 'homepage_hero_5sec_bar'
                });
            }
        } catch (e) {
            console.warn('Lead capture tracker bypassed', e);
        }

        // Construct customized WhatsApp intent URL
        const text = `Hello GPSPL, I require urgent pricing & BOQ schedule for: ${sector}. My contact number is: ${phone}. Please connect with an engineer.`;
        const waUrl = `https://wa.me/918920830377?text=${encodeURIComponent(text)}`;

        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 350);
    };

    // =========================================================================
    // 4. INSTANT 1-CLICK RESET VIEW CONTROLLER
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
            initWaveformEngine();
            initSignalBoard();
            initViewSwitcher();
        });
    } else {
        initWaveformEngine();
        initSignalBoard();
        initViewSwitcher();
    }
})();
