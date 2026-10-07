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
    // 3. 5-SECOND HERO EXPRESS INQUIRY HANDLER (WITH CUSTOM REQUIREMENT SUPPORT)
    // =========================================================================
    window.toggleHeroCustomReq = function (enable) {
        const wrap = document.getElementById('heroExpCustomWrap');
        const sel = document.getElementById('heroExpSector');
        const input = document.getElementById('heroExpCustom');
        if (!wrap || !sel || !input) return;

        if (enable === true || sel.value === 'CUSTOM_OTHER') {
            wrap.style.display = 'flex';
            if (sel.value !== 'CUSTOM_OTHER') {
                sel.value = 'CUSTOM_OTHER';
            }
            setTimeout(() => {
                input.focus();
                input.style.borderColor = 'var(--studio-accent, #d96538)';
                input.style.boxShadow = '0 0 0 2px rgba(217, 101, 56, 0.25)';
            }, 60);
        } else {
            wrap.style.display = 'none';
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    };

    window.handleHeroExpressSubmit = function (event) {
        event.preventDefault();
        const phoneInput = document.getElementById('heroExpPhone');
        const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '').slice(-10) : '';
        const sectorSelect = document.getElementById('heroExpSector');
        const sector = sectorSelect ? sectorSelect.value : '';
        const customInput = document.getElementById('heroExpCustom');
        const customVal = customInput ? customInput.value.trim() : '';
        const successMsg = document.getElementById('heroExpSuccess');

        if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
            alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
            if (phoneInput) phoneInput.focus();
            return;
        }

        let finalRequirement = sector;
        if (sector === 'CUSTOM_OTHER' || !sector) {
            if (!customVal) {
                window.toggleHeroCustomReq(true);
                if (customInput) {
                    customInput.focus();
                    customInput.placeholder = 'Please type your custom requirement here...';
                    customInput.style.borderColor = '#ef4444';
                }
                return;
            }
            finalRequirement = customVal;
        } else if (customVal) {
            finalRequirement = `${sector} (${customVal})`;
        }

        const refNo = 'GPSPL/HERO/' + Math.floor(100000 + Math.random() * 900000);
        const leadPayload = {
            name: `Express Client (${phone})`,
            phone: phone,
            email: `inquiry-${phone}@gpspl.co.in`,
            company: 'Direct Express Mobile Lead',
            requirement: finalRequirement,
            message: `1-Step 5-Second Hero Express Inquiry:\n• Reference: ${refNo}\n• Mobile: ${phone}\n• Solution: ${finalRequirement}\n• Priority: Urgent Wholesale Quote Requested`,
            lead_source: 'Homepage 5-Sec Hero Express Bar'
        };

        // 1. Dispatch immediately to Netlify Function & FormSubmit for 100% email delivery
        try {
            fetch('/.netlify/functions/submit-enquiry', {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadPayload)
            }).catch(() => null);

            ['itsdivesh221@gmail.com', 'global@gpspl.co.in'].forEach(targetEmail => {
                fetch('https://formsubmit.co/ajax/' + encodeURIComponent(targetEmail), {
                    method: 'POST',
                    keepalive: true,
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        _subject: `⚡ NEW EXPRESS HERO LEAD: [${finalRequirement}] ${phone}`,
                        'Mobile Number': '+91 ' + phone,
                        'Requirement': finalRequirement,
                        'Reference ID': refNo,
                        'Lead Source': 'Homepage Express Lead Bar',
                        'Submitted At': new Date().toLocaleString('en-IN')
                    })
                }).catch(() => null);
            });
        } catch (e) {}

        // 2. Backup to Local Storage
        try {
            const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
            history.unshift({
                id: refNo,
                category: 'HERO_EXPRESS_QUOTE',
                date_time: new Date().toLocaleString('en-IN'),
                phone: phone,
                service: finalRequirement,
                source: 'hero_express_inquiry'
            });
            localStorage.setItem('gpspl_captured_leads', JSON.stringify(history.slice(0, 25)));
        } catch (e) {}

        // 3. Construct direct WhatsApp link with pre-filled technical inquiry
        const text = `Hello GPSPL AV Engineering Team,\n\nI require urgent wholesale pricing & BOQ schedule for:\n*Requirement*: ${finalRequirement}\n*Mobile*: ${phone}\n*Ref*: ${refNo}\n\nPlease connect with an engineer immediately.`;
        const waUrl = `https://wa.me/918920830377?text=${encodeURIComponent(text)}`;

        // 4. Update UI with direct clickable actions
        if (successMsg) {
            successMsg.style.display = 'flex';
            successMsg.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:6px; width:100%;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-circle-check" style="color:#22c55e; font-size:1.1rem;"></i>
                        <span style="font-weight:700;">Inquiry recorded! Connecting to AV Engineering desk...</span>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:4px; flex-wrap:wrap;">
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25d366; color:#ffffff; padding:7px 14px; border-radius:6px; font-weight:800; text-decoration:none; display:inline-flex; align-items:center; gap:6px; font-size:0.82rem;">
                            <i class="fab fa-whatsapp"></i> Chat on WhatsApp Now
                        </a>
                        <a href="tel:+918920830377" style="background:#0f172a; color:#ffffff; padding:7px 14px; border-radius:6px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:6px; font-size:0.82rem;">
                            <i class="fas fa-phone-alt"></i> Call +91 89208 30377
                        </a>
                    </div>
                </div>
            `;
        }

        // 5. User-Controlled Action Routing:
        // Keep the user on the webpage with the confirmed receipt, while opening WhatsApp smoothly
        try {
            const win = window.open(waUrl, '_blank');
            if (!win) {
                // If popup blocked, user has immediate high-contrast WhatsApp button inside heroExpSuccess
            }
        } catch(e) {}
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

    function initArchPipelineInteractivity() {
        const flowNodes = document.querySelectorAll('.arch-flow-node');
        const steps = document.querySelectorAll('.arch-step');
        if (!flowNodes.length || !steps.length) return;

        flowNodes.forEach((node, idx) => {
            node.style.cursor = 'pointer';
            node.addEventListener('click', () => {
                flowNodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                if (steps[idx]) {
                    steps[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    steps[idx].style.borderColor = '#d96538';
                    setTimeout(() => {
                        steps[idx].style.borderColor = '';
                    }, 1400);
                }
            });
        });

        steps.forEach((step, idx) => {
            step.addEventListener('mouseenter', () => {
                flowNodes.forEach(n => n.classList.remove('active'));
                if (flowNodes[idx]) flowNodes[idx].classList.add('active');
            });
        });
    }

    /**
     * 3D Tilt Parallax & Dynamic Mouse-Tracking Spotlight for 3 Pillars
     */
    function initPillarInteractivity() {
        const cards = document.querySelectorAll('.model-pillar-card');
        if (!cards.length) return;

        cards.forEach((card) => {
            let bounds;

            function updateBounds() {
                bounds = card.getBoundingClientRect();
            }

            card.addEventListener('mouseenter', () => {
                updateBounds();
                card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';
            });

            card.addEventListener('mousemove', (e) => {
                if (!bounds) updateBounds();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;

                // Relative percentages (-1 to 1)
                const xPct = Math.max(-1, Math.min(1, (mouseX / bounds.width - 0.5) * 2));
                const yPct = Math.max(-1, Math.min(1, (mouseY / bounds.height - 0.5) * 2));

                const rotX = (-yPct * 7).toFixed(2);
                const rotY = (xPct * 7).toFixed(2);

                card.style.setProperty('--mouse-x', `${mouseX}px`);
                card.style.setProperty('--mouse-y', `${mouseY}px`);
                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initWaveformEngine();
            initSignalBoard();
            initViewSwitcher();
            initArchPipelineInteractivity();
            initPillarInteractivity();
        });
    } else {
        initWaveformEngine();
        initSignalBoard();
        initViewSwitcher();
        initArchPipelineInteractivity();
        initPillarInteractivity();
    }
})();
