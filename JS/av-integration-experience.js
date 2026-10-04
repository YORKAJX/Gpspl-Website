/**
 * GPSPL Enterprise AV System Integration Experience Engine (Maximum Visual Tier)
 * - Interactive Infrastructure Telemetry Switcher
 * - Before vs After Acoustic Echo & Cable Clutter Comparison Slider
 * - High-Performance AV-over-IP & Dante Signal Flow Canvas Visualizer
 * - Turnkey Enterprise AV Sizing & BOQ Specification Calculator
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. INFRASTRUCTURE TELEMETRY SWITCHER
    // =========================================================================
    const FACILITY_DATA = {
        campus: {
            title: 'Corporate Headquarters & Executive Campus',
            tag: 'CAMPUS AV INFRASTRUCTURE',
            image: 'assests/images/projects/gpspl-real/corporate-boardroom-active-led-installation-onsite.jpg',
            alt: 'Corporate Headquarters Turnkey AV Infrastructure',
            resolution: '135" MicroLED 4K + Multi-Zone Dante',
            display: '135" MicroLED 4K UHD',
            displaySmall: '0.9mm Die-Cast Wall',
            audio: 'Shure MXA920 Dante',
            audioSmall: 'Acoustic Echo Cancellation',
            control: 'Crestron NVX 4K60',
            controlSmall: 'Ultra-Low Latency AV-over-IP'
        },
        noc: {
            title: 'Mission-Critical NOC / SOC Operations Center',
            tag: '24/7 COMMAND CENTER AV',
            image: 'assests/images/projects/gpspl-real/media-house-curved-active-led-newsroom.jpg',
            alt: 'Mission Critical NOC SOC Command Center AV Wall',
            resolution: 'Curved Ultra-Fine LED + KVM Matrix',
            display: '1.2mm Curved Active LED',
            displaySmall: '7x24 Continuous Duty',
            audio: 'Multi-Zone DSP Matrix',
            audioSmall: 'Priority Voice Alarm Override',
            control: 'ATEN Over-IP KVM',
            controlSmall: 'Instant Operator Switching'
        },
        auditorium: {
            title: 'Grand Auditorium & Institutional Stage',
            tag: 'BROADCAST ACOUSTIC HALL',
            image: 'assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg',
            alt: 'Grand Auditorium Stage AV & Acoustic Reinforcement',
            resolution: '220" Seamless 4K Active LED Wall',
            display: '220" P1.5 Stage Active LED',
            displaySmall: '3,840Hz Broadcast Refresh',
            audio: 'Harman JBL Line Array',
            audioSmall: 'Shure Axient Digital RF',
            control: 'Digital FOH Console',
            controlSmall: 'Dante 64x64 Stage Matrix'
        },
        rack: {
            title: 'Central Enterprise AV Server & Dante Rack',
            tag: 'ENTERPRISE RACK CORE',
            image: 'assests/images/projects/gpspl-real/av-rack-infrastructure.jpeg',
            alt: 'Central Enterprise AV Distribution Rack Infrastructure',
            resolution: 'Dante / AES67 Digital AV Core',
            display: 'Redundant Power Distribution',
            displaySmall: 'Surge & UPS Battery Isolation',
            audio: 'Q-SYS Core 510i DSP',
            audioSmall: '128 Dante Network Channels',
            control: 'Enterprise 10G Switches',
            controlSmall: 'Isolated AV VLAN Routing'
        }
    };

    function initTelemetryConsole() {
        const tabButtons = document.querySelectorAll('.console-tab-btn');
        const previewImg = document.getElementById('consolePreviewImg');
        const tagEl = document.getElementById('consoleTag');
        const resolutionEl = document.getElementById('consoleResolution');
        const displayEl = document.getElementById('specDisplay');
        const audioEl = document.getElementById('specAudio');
        const controlEl = document.getElementById('specControl');

        if (!tabButtons.length || !previewImg) return;

        tabButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const targetKey = this.getAttribute('data-facility');
                const data = FACILITY_DATA[targetKey];
                if (!data) return;

                tabButtons.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                previewImg.style.opacity = '0.3';
                setTimeout(function () {
                    previewImg.src = data.image;
                    previewImg.alt = data.alt;
                    previewImg.style.opacity = '1';
                }, 150);

                if (tagEl) tagEl.textContent = data.tag;
                if (resolutionEl) resolutionEl.textContent = data.resolution;

                if (displayEl) {
                    displayEl.innerHTML = data.display + ' <small>' + data.displaySmall + '</small>';
                }
                if (audioEl) {
                    audioEl.innerHTML = data.audio + ' <small>' + data.audioSmall + '</small>';
                }
                if (controlEl) {
                    controlEl.innerHTML = data.control + ' <small>' + data.controlSmall + '</small>';
                }
            });
        });
    }

    // =========================================================================
    // 2. BEFORE VS AFTER ACOUSTIC ECHO & CABLE CLUTTER COMPARISON SLIDER
    // =========================================================================
    function initComparisonSlider() {
        const range = document.getElementById('avCompareRange');
        const afterLayer = document.getElementById('avCompareAfter');
        const handle = document.getElementById('avCompareHandle');
        const container = document.getElementById('avCompareContainer');

        if (!range || !afterLayer || !handle || !container) return;

        function updateSlider(val) {
            const clamped = Math.max(0, Math.min(100, val));
            afterLayer.style.clipPath = 'polygon(0 0, ' + clamped + '% 0, ' + clamped + '% 100%, 0 100%)';
            handle.style.left = clamped + '%';
        }

        range.addEventListener('input', function () {
            updateSlider(parseFloat(this.value));
        });

        // Mouse & Touch Drag on Container
        let isDragging = false;

        function handleDrag(e) {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const pos = ((clientX - rect.left) / rect.width) * 100;
            const clamped = Math.max(0, Math.min(100, pos));
            range.value = clamped;
            updateSlider(clamped);
        }

        container.addEventListener('mousedown', function (e) {
            isDragging = true;
            handleDrag(e);
        });

        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', function () { isDragging = false; });

        container.addEventListener('touchstart', function (e) {
            isDragging = true;
            handleDrag(e);
        }, { passive: true });

        window.addEventListener('touchmove', handleDrag, { passive: true });
        window.addEventListener('touchend', function () { isDragging = false; });
    }

    // =========================================================================
    // 3. INTERACTIVE AV-OVER-IP & DANTE SIGNAL FLOW VISUALIZER (CANVAS)
    // =========================================================================
    function initSignalFlowVisualizer() {
        const canvas = document.getElementById('avSignalCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId = null;

        let inputNodes = [];
        let coreNode = {};
        let outputNodes = [];
        let packets = [];

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            const leftX = width * 0.16;
            const centerX = width * 0.50;
            const rightX = width * 0.84;

            inputNodes = [
                { id: 'in1', label: '4K PTZ Camera', type: 'video', x: leftX, y: height * 0.22, color: '#38bdf8' },
                { id: 'in2', label: 'Ceiling Array (Dante)', type: 'audio', x: leftX, y: height * 0.41, color: '#d96538' },
                { id: 'in3', label: 'BYOM Laptop / ClickShare', type: 'av', x: leftX, y: height * 0.60, color: '#22c55e' },
                { id: 'in4', label: 'Crestron Touch 10"', type: 'control', x: leftX, y: height * 0.79, color: '#a855f7' }
            ];

            coreNode = {
                id: 'core',
                label: 'ENTERPRISE AV CORE',
                sub: 'Dante DSP + AV-over-IP 10G',
                x: centerX,
                y: height * 0.50,
                width: Math.min(width * 0.28, 220),
                height: Math.min(height * 0.55, 180)
            };

            outputNodes = [
                { id: 'out1', label: '135" Active MicroLED', type: 'video', x: rightX, y: height * 0.22, color: '#38bdf8' },
                { id: 'out2', label: 'JBL Flush Architectural', type: 'audio', x: rightX, y: height * 0.41, color: '#d96538' },
                { id: 'out3', label: 'Cloud MTR / Zoom Rooms', type: 'cloud', x: rightX, y: height * 0.60, color: '#22c55e' },
                { id: 'out4', label: 'Lutron Lighting & Shades', type: 'control', x: rightX, y: height * 0.79, color: '#a855f7' }
            ];

            packets = [];
            for (let i = 0; i < 24; i++) {
                packets.push({
                    inIdx: i % inputNodes.length,
                    outIdx: (i * 2 + 1) % outputNodes.length,
                    progress: Math.random(),
                    speed: 0.25 + Math.random() * 0.35,
                    stage: Math.random() > 0.5 ? 1 : 2
                });
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const latencyEl = document.getElementById('sigLatency');
        const syncEl = document.getElementById('sigSync');
        const bitrateEl = document.getElementById('sigBitrate');

        let lastTime = performance.now();

        function render(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            if (latencyEl) {
                const lat = 0.08 + Math.sin(now * 0.002) * 0.02;
                latencyEl.textContent = lat.toFixed(2) + ' ms Latency';
            }
            if (syncEl) {
                syncEl.textContent = 'PTP Clock: < 1 µs';
            }
            if (bitrateEl) {
                const bit = 8.4 + Math.cos(now * 0.004) * 0.3;
                bitrateEl.textContent = bit.toFixed(1) + ' Gbps Uncompressed';
            }

            ctx.clearRect(0, 0, width, height);

            // 1. Grid Background
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
            ctx.lineWidth = 1;
            const gridSize = 36;
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

            // 2. Draw Connection Lines
            inputNodes.forEach(function (inNode) {
                ctx.beginPath();
                ctx.moveTo(inNode.x, inNode.y);
                ctx.bezierCurveTo(
                    (inNode.x + coreNode.x) / 2, inNode.y,
                    (inNode.x + coreNode.x) / 2, coreNode.y,
                    coreNode.x - coreNode.width / 2, coreNode.y
                );
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            outputNodes.forEach(function (outNode) {
                ctx.beginPath();
                ctx.moveTo(coreNode.x + coreNode.width / 2, coreNode.y);
                ctx.bezierCurveTo(
                    (coreNode.x + outNode.x) / 2, coreNode.y,
                    (coreNode.x + outNode.x) / 2, outNode.y,
                    outNode.x, outNode.y
                );
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            // 3. Draw & Animate Packets
            packets.forEach(function (p) {
                p.progress += dt * p.speed;
                if (p.progress >= 1) {
                    p.progress = 0;
                    p.stage = p.stage === 1 ? 2 : 1;
                    if (p.stage === 1) {
                        p.inIdx = Math.floor(Math.random() * inputNodes.length);
                        p.outIdx = Math.floor(Math.random() * outputNodes.length);
                    }
                }

                let px = 0;
                let py = 0;
                const inN = inputNodes[p.inIdx];
                const outN = outputNodes[p.outIdx];

                if (p.stage === 1) {
                    const t = p.progress;
                    const p0 = { x: inN.x, y: inN.y };
                    const p1 = { x: (inN.x + coreNode.x) / 2, y: inN.y };
                    const p2 = { x: (inN.x + coreNode.x) / 2, y: coreNode.y };
                    const p3 = { x: coreNode.x - coreNode.width / 2, y: coreNode.y };

                    px = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
                    py = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
                } else {
                    const t = p.progress;
                    const p0 = { x: coreNode.x + coreNode.width / 2, y: coreNode.y };
                    const p1 = { x: (coreNode.x + outN.x) / 2, y: coreNode.y };
                    const p2 = { x: (coreNode.x + outN.x) / 2, y: outN.y };
                    const p3 = { x: outN.x, y: outN.y };

                    px = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
                    py = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
                }

                ctx.save();
                ctx.beginPath();
                ctx.arc(px, py, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = p.stage === 1 ? inN.color : outN.color;
                ctx.shadowColor = ctx.fillStyle;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            });

            // 4. Draw Core Node
            ctx.save();
            const coreLeft = coreNode.x - coreNode.width / 2;
            const coreTop = coreNode.y - coreNode.height / 2;
            ctx.beginPath();
            ctx.roundRect(coreLeft, coreTop, coreNode.width, coreNode.height, 14);
            ctx.fillStyle = 'rgba(28, 32, 30, 0.95)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(217, 101, 56, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            const pulse = (Math.sin(now * 0.005) + 1) * 0.5;
            ctx.beginPath();
            ctx.roundRect(coreLeft - 3 - pulse * 3, coreTop - 3 - pulse * 3, coreNode.width + 6 + pulse * 6, coreNode.height + 6 + pulse * 6, 16);
            ctx.strokeStyle = 'rgba(217, 101, 56, ' + (0.2 + pulse * 0.25) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('ENTERPRISE AV CORE', coreNode.x, coreNode.y - 20);

            ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#ff8c5a';
            ctx.fillText('Dante DSP + AV-over-IP 10G', coreNode.x, coreNode.y);

            ctx.font = '500 9px "Space Grotesk", monospace';
            ctx.fillStyle = '#9ea3a0';
            ctx.fillText('Zero-Loss Packet Switch', coreNode.x, coreNode.y + 18);
            ctx.restore();

            // 5. Draw Input Nodes
            inputNodes.forEach(function (node) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 10;
                ctx.fill();

                ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
                ctx.textAlign = 'right';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(node.label, node.x - 14, node.y + 4);
                ctx.restore();
            });

            // 6. Draw Output Nodes
            outputNodes.forEach(function (node) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 10;
                ctx.fill();

                ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
                ctx.textAlign = 'left';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(node.label, node.x + 14, node.y + 4);
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // =========================================================================
    // 4. LIVE TURNKEY ENTERPRISE AV SIZING & BOQ CALCULATOR
    // =========================================================================
    function initBoqCalculator() {
        const roomsSlider = document.getElementById('calcRoomsCount');
        const roomsVal = document.getElementById('calcRoomsVal');
        const facilityBtns = document.querySelectorAll('.calc-facility-btn');
        const videoBtns = document.querySelectorAll('.calc-video-btn');
        const audioBtns = document.querySelectorAll('.calc-audio-btn');

        const outCore = document.getElementById('outMatrixCore');
        const outDsp = document.getElementById('outDspChannels');
        const outVideoNet = document.getElementById('outVideoNetwork');
        const outControl = document.getElementById('outControlSystem');
        const outBudget = document.getElementById('outTurnkeyBudget');

        if (!roomsSlider) return;

        let state = {
            rooms: parseInt(roomsSlider.value, 10) || 4,
            facility: 'boardroom',
            videoTier: 'avoip',
            audioTier: 'dante'
        };

        function calculateAV() {
            const count = state.rooms;

            let coreStr = '';
            if (state.facility === 'boardroom') {
                coreStr = count <= 2 ? 'Q-SYS Core 110f (16-Ch Dante)' : 'Q-SYS Core 510i (128-Ch Dante)';
            } else if (state.facility === 'auditorium') {
                coreStr = 'Dual Redundant Q-SYS Core 510i + FOH Console';
            } else if (state.facility === 'noc') {
                coreStr = 'ATEN Modular KVM Matrix + Redundant Core';
            } else {
                coreStr = count <= 5 ? 'Biamp TesiraFORTÉ X 400 Core' : 'Q-SYS Enterprise Campus Architecture';
            }

            let dspStr = (count * (state.audioTier === 'dante' ? 8 : 4)) + ' Active AEC Dante Channels';

            let videoStr = '';
            if (state.videoTier === 'avoip') {
                videoStr = 'Crestron NVX 4K60 (1Gbps/10Gbps AV-over-IP)';
            } else if (state.videoTier === 'matrix') {
                videoStr = '4K60 4:4:4 Modular Seamless Matrix Switcher';
            } else {
                videoStr = 'HDBaseT Point-to-Point 4K Extended Architecture';
            }

            let controlStr = count <= 3 ? 'Crestron 10" POE Touch + Automations' : count + 'x Crestron Touch Panels + Central Processor';

            let perRoomCost = 4.5;
            if (state.facility === 'boardroom') perRoomCost = 6.5;
            if (state.facility === 'auditorium') perRoomCost = 14.0;
            if (state.facility === 'noc') perRoomCost = 16.5;

            if (state.videoTier === 'avoip') perRoomCost += 1.5;
            if (state.audioTier === 'dante') perRoomCost += 1.8;

            const totalMin = Math.round(count * perRoomCost * 0.9);
            const totalMax = Math.round(count * perRoomCost * 1.15);
            const budgetStr = '₹' + totalMin + '.0 - ₹' + totalMax + '.5 Lakhs';

            if (outCore) outCore.textContent = coreStr;
            if (outDsp) outDsp.textContent = dspStr;
            if (outVideoNet) outVideoNet.textContent = videoStr;
            if (outControl) outControl.textContent = controlStr;
            if (outBudget) outBudget.textContent = budgetStr;
        }

        roomsSlider.addEventListener('input', function () {
            state.rooms = parseInt(this.value, 10);
            if (roomsVal) roomsVal.textContent = state.rooms + ' Meeting Spaces / Zones';
            calculateAV();
        });

        facilityBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                facilityBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.facility = this.getAttribute('data-val');
                calculateAV();
            });
        });

        videoBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                videoBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.videoTier = this.getAttribute('data-val');
                calculateAV();
            });
        });

        audioBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                audioBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                state.audioTier = this.getAttribute('data-val');
                calculateAV();
            });
        });

        calculateAV();
    }

    // =========================================================================
    // DOM READY INITIALIZER
    // =========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initTelemetryConsole();
            initComparisonSlider();
            initSignalFlowVisualizer();
            initBoqCalculator();
        });
    } else {
        initTelemetryConsole();
        initComparisonSlider();
        initSignalFlowVisualizer();
        initBoqCalculator();
    }
})();
