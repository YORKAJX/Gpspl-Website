/**
 * GPSPL Conference Room & Boardroom Experience Engine
 * - Interactive Telemetry Console Switcher
 * - Steerable Acoustic Beamforming Ceiling Mic Canvas Visualizer
 * - Turnkey AV Sizing & BOQ Specification Calculator
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. TELEMETRY CONSOLE SWITCHER
    // =========================================================================
    const ROOM_DATA = {
        executive: {
            title: 'Executive 18-Seater Boardroom',
            tag: 'BOARDROOM C-SUITE',
            image: 'assests/images/projects/gpspl-real/corporate-boardroom-active-led-installation-onsite.jpg',
            alt: 'Executive 18-Seater Corporate Boardroom AV Installation',
            resolution: '135" MicroLED 4K (0.9mm)',
            display: '135" MicroLED 4K UHD',
            displaySmall: '0.9mm P0.9 Die-Cast',
            mics: 'Dual Shure MXA920',
            micsSmall: '16 Steerable Lobes',
            dsp: 'Q-SYS Core 110f AEC',
            dspSmall: 'Dante / AES67 Network',
            camera: 'Dual 4K Presenter Track',
            cameraSmall: 'AI Optical Director',
            sound: 'Harman JBL Flush-Mount',
            soundSmall: 'Ceiling Distributed'
        },
        teams: {
            title: 'Microsoft Teams War Room',
            tag: 'MTR CERTIFIED ENTERPRISE',
            image: 'assests/images/projects/gpspl-real/real-boardroom-vc-conference.jpg',
            alt: 'Microsoft Teams Enterprise War Room AV Deployment',
            resolution: 'Dual 85" 4K Commercial Displays',
            display: 'Dual 85" Sony Pro BRAVIA',
            displaySmall: '4K HDR Anti-Glare',
            mics: 'Sennheiser TCC2 Ceiling',
            micsSmall: 'Dynamic Beamforming',
            dsp: 'Biamp TesiraFORTÉ X',
            dspSmall: 'Automated Room Tuning',
            camera: 'Poly Studio E70 AI Track',
            cameraSmall: 'Dual 20MP Sensors',
            sound: 'Sonance Architectural',
            soundSmall: 'Full-Range In-Ceiling'
        },
        hybrid: {
            title: '12-Seater Hybrid Conference Room',
            tag: 'HYBRID WORKSPACE PRO',
            image: 'assests/images/projects/gpspl-real/real-executive-boardroom-conference.jpg',
            alt: '12-Seater Hybrid Conference Room with Ceiling Mics',
            resolution: '98" Commercial UHD Display',
            display: '98" Samsung Commercial UHD',
            displaySmall: '500 Nits 24/7 Duty',
            mics: 'Shure MXA710 Linear Array',
            micsSmall: 'Under-Display / Ceiling',
            dsp: 'Crestron Avia DSP-1282',
            dspSmall: 'IntelliMix Processing',
            camera: 'Lumens 4K PTZ Auto-Framing',
            cameraSmall: '20x Optical Zoom',
            sound: 'QSC AcousticDesign',
            soundSmall: '6.5" High-Fidelity'
        },
        huddle: {
            title: 'Agile Huddle Collaboration Room',
            tag: 'HUDDLE FAST-MEET',
            image: 'assests/images/projects/gpspl-real/corporate-conference-room.jpeg',
            alt: 'Modern Agile Huddle Meeting Space',
            resolution: '65" Commercial 4K Interactive',
            display: '65" LG 4K UHD Commercial',
            displaySmall: 'Touch Collaboration',
            mics: 'Integrated 6-Beam Array',
            micsSmall: 'AI Noise Suppression',
            dsp: 'On-Board Hardware AEC',
            dspSmall: 'Zero-Latency DSP',
            camera: '120° Wide-Angle 4K ePTZ',
            cameraSmall: 'Auto-Framing 5x ePTZ',
            sound: 'Studio Acoustic Bar',
            soundSmall: 'Twin Stereo Woofers'
        }
    };

    function initTelemetryConsole() {
        const tabButtons = document.querySelectorAll('.console-tab-btn');
        const previewImg = document.getElementById('consolePreviewImg');
        const tagEl = document.getElementById('consoleTag');
        const resolutionEl = document.getElementById('consoleResolution');
        const displayEl = document.getElementById('specDisplay');
        const micsEl = document.getElementById('specMics');
        const dspEl = document.getElementById('specDsp');

        if (!tabButtons.length || !previewImg) return;

        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const targetKey = this.getAttribute('data-room');
                const data = ROOM_DATA[targetKey];
                if (!data) return;

                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Animate image switch with smooth fade
                previewImg.style.opacity = '0.3';
                setTimeout(() => {
                    previewImg.src = data.image;
                    previewImg.alt = data.alt;
                    previewImg.style.opacity = '1';
                }, 150);

                if (tagEl) tagEl.textContent = data.tag;
                if (resolutionEl) resolutionEl.textContent = data.resolution;

                if (displayEl) {
                    displayEl.innerHTML = data.display + ' <small>' + data.displaySmall + '</small>';
                }
                if (micsEl) {
                    micsEl.innerHTML = data.mics + ' <small>' + data.micsSmall + '</small>';
                }
                if (dspEl) {
                    dspEl.innerHTML = data.dsp + ' <small>' + data.dspSmall + '</small>';
                }
            });
        });
    }

    // =========================================================================
    // 2. BEAMFORMING CEILING MIC VISUALIZER (CANVAS)
    // =========================================================================
    function initBeamformingVisualizer() {
        const canvas = document.getElementById('micCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId = null;

        // Visualizer State
        let activeSpeakerIndex = 0;
        let lastSpeakerSwitch = performance.now();
        let mouseX = -1;
        let mouseY = -1;
        let isUserInteracting = false;

        // Conference Table Virtual Layout
        const NUM_SPEAKERS = 8;
        let speakers = [];

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            // Recompute table and speaker coordinates
            const centerX = width / 2;
            const centerY = height / 2;
            const rx = Math.min(width * 0.36, 320);
            const ry = Math.min(height * 0.32, 120);

            speakers = [];
            for (let i = 0; i < NUM_SPEAKERS; i++) {
                const angle = (i / NUM_SPEAKERS) * Math.PI * 2;
                speakers.push({
                    id: i + 1,
                    x: centerX + Math.cos(angle) * rx,
                    y: centerY + Math.sin(angle) * ry,
                    angle: angle,
                    speakingEnergy: 0,
                    label: 'Seat 0' + (i + 1)
                });
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Canvas interactions
        canvas.addEventListener('mousemove', function (e) {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isUserInteracting = true;

            // Find closest speaker to mouse cursor
            let closestDist = Infinity;
            let closestIdx = 0;
            speakers.forEach(function (s, idx) {
                const dx = s.x - mouseX;
                const dy = s.y - mouseY;
                const dist = Math.hypot(dx, dy);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = idx;
                }
            });

            if (closestDist < 120) {
                activeSpeakerIndex = closestIdx;
            }
        });

        canvas.addEventListener('mouseleave', function () {
            mouseX = -1;
            mouseY = -1;
            isUserInteracting = false;
        });

        // Telemetry readout tags
        const angleReadout = document.getElementById('micActiveAngle');
        const dbReadout = document.getElementById('micDbLevel');
        const snrReadout = document.getElementById('micSnrLevel');

        // Animation Loop
        let lastTime = performance.now();

        function render(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            // Auto-switch speaker every 3.2s if no mouse interaction
            if (!isUserInteracting && now - lastSpeakerSwitch > 3200) {
                activeSpeakerIndex = (activeSpeakerIndex + 1) % NUM_SPEAKERS;
                lastSpeakerSwitch = now;
            }

            // Update speaker speaking energy
            speakers.forEach(function (s, idx) {
                const isTarget = idx === activeSpeakerIndex;
                const targetEnergy = isTarget ? 1.0 : 0.05;
                s.speakingEnergy += (targetEnergy - s.speakingEnergy) * (dt * 6);
            });

            // Update DOM telemetry indicators
            const activeSpeaker = speakers[activeSpeakerIndex];
            if (activeSpeaker && angleReadout) {
                let deg = Math.round((activeSpeaker.angle * 180) / Math.PI);
                if (deg < 0) deg += 360;
                angleReadout.textContent = 'Acoustic Beam: ' + deg + '°';
            }
            if (dbReadout) {
                const db = -24 + Math.sin(now * 0.005) * 4 + (activeSpeaker ? activeSpeaker.speakingEnergy * 12 : 0);
                dbReadout.textContent = db.toFixed(1) + ' dBFS';
            }
            if (snrReadout) {
                const snr = 28 + Math.cos(now * 0.003) * 2;
                snrReadout.textContent = 'SNR: +' + snr.toFixed(0) + ' dB';
            }

            // Clear frame
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const rx = Math.min(width * 0.36, 320);
            const ry = Math.min(height * 0.32, 120);

            // 1. Draw Boardroom Floor Grid & Table Outline
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Conference Table Ring (Warm Glass Graphic)
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, rx * 0.88, ry * 0.88, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([6, 6]);
            ctx.stroke();
            ctx.restore();

            // 2. Ambient HVAC Noise Floor Boundary (Attenuated Blue-Gray Wave)
            ctx.save();
            const hvacPulse = (now * 0.0015) % 1;
            const hvacRadius = Math.max(width, height) * 0.45;
            ctx.beginPath();
            ctx.arc(centerX, centerY, hvacRadius * (0.85 + hvacPulse * 0.15), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(100, 140, 160, ' + (0.12 * (1 - hvacPulse)) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            // 3. Render 8 Steerable Audio Lobes from Central Ceiling Array
            speakers.forEach(function (s) {
                const energy = s.speakingEnergy;
                const isFocused = energy > 0.3;

                ctx.save();
                const lobeGrad = ctx.createRadialGradient(
                    centerX, centerY, 10,
                    s.x, s.y, 80
                );

                if (isFocused) {
                    // Active steerable lobe (Warm Terracotta / Rust Copper)
                    lobeGrad.addColorStop(0, 'rgba(217, 101, 56, ' + (0.45 * energy) + ')');
                    lobeGrad.addColorStop(0.7, 'rgba(255, 140, 90, ' + (0.25 * energy) + ')');
                    lobeGrad.addColorStop(1, 'rgba(217, 101, 56, 0)');

                    ctx.fillStyle = lobeGrad;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    const spread = 0.32;
                    ctx.lineTo(
                        centerX + Math.cos(s.angle - spread) * (rx * 1.05),
                        centerY + Math.sin(s.angle - spread) * (ry * 1.05)
                    );
                    ctx.quadraticCurveTo(
                        s.x, s.y,
                        centerX + Math.cos(s.angle + spread) * (rx * 1.05),
                        centerY + Math.sin(s.angle + spread) * (ry * 1.05)
                    );
                    ctx.closePath();
                    ctx.fill();

                    // Central directional vector line
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(s.x, s.y);
                    ctx.strokeStyle = 'rgba(255, 140, 90, ' + (0.7 * energy) + ')';
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Animated acoustic speech wavefronts expanding toward ceiling mic
                    for (let w = 1; w <= 3; w++) {
                        const waveProgress = ((now * 0.0018 + w * 0.33) % 1);
                        const waveX = s.x + (centerX - s.x) * waveProgress;
                        const waveY = s.y + (centerY - s.y) * waveProgress;
                        ctx.beginPath();
                        ctx.arc(waveX, waveY, 8 + waveProgress * 22, s.angle + Math.PI - 0.7, s.angle + Math.PI + 0.7);
                        ctx.strokeStyle = 'rgba(255, 170, 120, ' + (0.5 * (1 - waveProgress) * energy) + ')';
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                } else {
                    // Passive listening lobe
                    lobeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
                    lobeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = lobeGrad;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    const spread = 0.22;
                    ctx.lineTo(
                        centerX + Math.cos(s.angle - spread) * (rx * 0.75),
                        centerY + Math.sin(s.angle - spread) * (ry * 0.75)
                    );
                    ctx.lineTo(
                        centerX + Math.cos(s.angle + spread) * (rx * 0.75),
                        centerY + Math.sin(s.angle + spread) * (ry * 0.75)
                    );
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            });

            // 4. Render Speaker Nodes around the Table
            speakers.forEach(function (s) {
                const energy = s.speakingEnergy;
                const isFocused = energy > 0.3;

                ctx.save();
                // Outer ring
                ctx.beginPath();
                ctx.arc(s.x, s.y, isFocused ? 14 : 9, 0, Math.PI * 2);
                ctx.fillStyle = isFocused ? '#d96538' : '#232925';
                ctx.fill();
                ctx.strokeStyle = isFocused ? '#ffaa78' : '#3c4440';
                ctx.lineWidth = isFocused ? 2 : 1.5;
                ctx.stroke();

                // Inner core
                ctx.beginPath();
                ctx.arc(s.x, s.y, isFocused ? 6 : 4, 0, Math.PI * 2);
                ctx.fillStyle = isFocused ? '#ffffff' : '#5e6460';
                ctx.fill();

                // Seat Label
                ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = isFocused ? '#ffffff' : '#8e9490';
                ctx.fillText(s.label, s.x, s.y + (s.y > centerY ? 22 : -16));

                ctx.restore();
            });

            // 5. Center Ceiling Mic Icon Ring (Array boundary)
            ctx.save();
            const pulse = (Math.sin(now * 0.004) + 1) * 0.5;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 52 + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(217, 101, 56, ' + (0.35 + pulse * 0.3) + ')';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 64, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // =========================================================================
    // 3. LIVE CONFERENCE ROOM AV SIZING & BOQ CALCULATOR
    // =========================================================================
    function initBoqCalculator() {
        const roomLengthSlider = document.getElementById('calcRoomLength');
        const roomLengthVal = document.getElementById('calcRoomLengthVal');
        const roomCapacitySlider = document.getElementById('calcRoomCapacity');
        const roomCapacityVal = document.getElementById('calcRoomCapacityVal');

        const platformBtns = document.querySelectorAll('.calc-platform-btn');
        const micBtns = document.querySelectorAll('.calc-mic-btn');
        const displayBtns = document.querySelectorAll('.calc-display-btn');

        // Output DOM nodes
        const outDisplay = document.getElementById('outDisplaySize');
        const outDiscas = document.getElementById('outDiscasRating');
        const outMics = document.getElementById('outMicSystem');
        const outDsp = document.getElementById('outDspChannels');
        const outCamera = document.getElementById('outCameraType');
        const outBudget = document.getElementById('outTurnkeyBudget');

        if (!roomLengthSlider || !roomCapacitySlider) return;

        let state = {
            length: parseInt(roomLengthSlider.value, 10) || 8,
            capacity: parseInt(roomCapacitySlider.value, 10) || 14,
            platform: 'teams',
            micType: 'ceiling',
            displayType: 'microled'
        };

        function calculateAV() {
            const lengthM = state.length;
            const seats = state.capacity;

            // 1. Display Sizing based on Room Length & DISCAS standards
            let displayRec = '';
            let discasText = '';

            if (state.displayType === 'microled') {
                if (lengthM <= 6) {
                    displayRec = '110" MicroLED 4K (P1.2)';
                    discasText = 'DISCAS Verified (1.8m-6m)';
                } else if (lengthM <= 10) {
                    displayRec = '135" MicroLED 4K (P0.9)';
                    discasText = 'DISCAS Verified (2.2m-10m)';
                } else {
                    displayRec = '165" MicroLED 4K HDR (P0.9)';
                    discasText = 'DISCAS Certified (3.0m-16m)';
                }
            } else if (state.displayType === 'dual') {
                if (lengthM <= 7) {
                    displayRec = 'Dual 75" Sony Pro BRAVIA 4K';
                    discasText = 'Dual Content + Gallery View';
                } else {
                    displayRec = 'Dual 85" Samsung UHD Displays';
                    discasText = 'Dual 4K Commercial 24/7';
                }
            } else {
                // Large Commercial Display
                if (lengthM <= 5) {
                    displayRec = '75" LG Commercial 4K UHD';
                    discasText = 'Optimal Viewing (1.5m-5m)';
                } else if (lengthM <= 8) {
                    displayRec = '85" Sony Pro BRAVIA 4K';
                    discasText = 'Optimal Viewing (2.0m-8m)';
                } else {
                    displayRec = '98" Commercial UHD Display';
                    discasText = 'Maximum Single Panel Format';
                }
            }

            // 2. Microphone Coverage & Array Calculation
            let micRec = '';
            if (state.micType === 'ceiling') {
                if (lengthM <= 6 && seats <= 10) {
                    micRec = '1x Shure MXA920 (8 Steerable Lobes)';
                } else if (lengthM <= 11 && seats <= 18) {
                    micRec = '2x Shure MXA920 / Sennheiser TCC2';
                } else {
                    micRec = '3x Shure MXA920 Multi-Zone Array';
                }
            } else if (state.micType === 'table') {
                const pods = Math.ceil(seats / 4);
                micRec = pods + 'x Shure MXA310 Table Boundary Arrays';
            } else {
                micRec = 'Poly / Neat All-in-One AI Mic Bar';
            }

            // 3. DSP & Audio Network Channels
            let dspRec = '';
            if (seats <= 8) {
                dspRec = '8-Ch Hardware AEC (Biamp Tesira X400)';
            } else if (seats <= 16) {
                dspRec = '16-Ch Dante DSP (Q-SYS Core 110f AEC)';
            } else {
                dspRec = '32-Ch Dante Architecture (Q-SYS Core 510i)';
            }

            // 4. Camera & Auto-Tracking
            let cameraRec = '';
            if (lengthM <= 5) {
                cameraRec = '4K Wide-Angle Auto-Framing ePTZ (120° FOV)';
            } else if (lengthM <= 9) {
                cameraRec = '12x Optical PTZ with Presenter Voice Tracking';
            } else {
                cameraRec = 'Dual 4K Director AI Track (Poly Studio E70 + Lumens PTZ)';
            }

            // 5. Turnkey Budget Estimate (INR Lakhs range)
            let baseBudget = 3.5; // Base huddle/small room
            if (state.displayType === 'microled') {
                baseBudget += (lengthM <= 6 ? 12 : lengthM <= 10 ? 18 : 26);
            } else if (state.displayType === 'dual') {
                baseBudget += 4.5;
            } else {
                baseBudget += (lengthM > 8 ? 4.0 : 2.5);
            }

            if (state.micType === 'ceiling') baseBudget += (seats > 14 ? 7.5 : 4.5);
            if (state.platform === 'teams' || state.platform === 'zoom') baseBudget += 1.8;

            const minBudget = Math.round(baseBudget * 0.9);
            const maxBudget = Math.round(baseBudget * 1.15);
            const budgetStr = '₹' + minBudget + '.0 - ₹' + maxBudget + '.5 Lakhs';

            // Update DOM outputs
            if (outDisplay) outDisplay.textContent = displayRec;
            if (outDiscas) outDiscas.textContent = discasText;
            if (outMics) outMics.textContent = micRec;
            if (outDsp) outDsp.textContent = dspRec;
            if (outCamera) outCamera.textContent = cameraRec;
            if (outBudget) outBudget.textContent = budgetStr;
        }

        // Sliders Listeners
        roomLengthSlider.addEventListener('input', function () {
            state.length = parseInt(this.value, 10);
            if (roomLengthVal) roomLengthVal.textContent = state.length + ' Meters (' + Math.round(state.length * 3.28) + ' ft)';
            calculateAV();
        });

        roomCapacitySlider.addEventListener('input', function () {
            state.capacity = parseInt(this.value, 10);
            if (roomCapacityVal) roomCapacityVal.textContent = state.capacity + ' Seats';
            calculateAV();
        });

        // Platform Toggle Buttons
        platformBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                platformBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.platform = this.getAttribute('data-val');
                calculateAV();
            });
        });

        // Mic Toggle Buttons
        micBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                micBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.micType = this.getAttribute('data-val');
                calculateAV();
            });
        });

        // Display Toggle Buttons
        displayBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                displayBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.displayType = this.getAttribute('data-val');
                calculateAV();
            });
        });

        // Initial calculation
        calculateAV();
    }

    // =========================================================================
    // DOM READY INITIALIZER
    // =========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initTelemetryConsole();
            initBeamformingVisualizer();
            initBoqCalculator();
        });
    } else {
        initTelemetryConsole();
        initBeamformingVisualizer();
        initBoqCalculator();
    }
})();
