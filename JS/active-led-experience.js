/* ==========================================================================
   GPSPL ACTIVE LED VIDEO WALL INTERACTIVE SUITE
   - Dynamic Spec Console & Telemetry Switcher (Authentic Projects)
   - Interactive 3840Hz vs 1920Hz Broadcast Camera Slider
   - Live Active LED Engineering Calculator (Resolution, Cabinets, Power, Distance)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Live Spec Console Data & Dynamic Updating with Authentic Photos
    // --------------------------------------------------------------------------
    const specData = {
        curved: {
            pitch: 'P1.25 mm',
            refresh: '3,840 Hz',
            nits: '1,000 Nits',
            image: '/assests/images/projects/gpspl-real/media-house-curved-active-led-newsroom.jpg',
            badge: '3,840 × 1,080 px UHD'
        },
        indoor: {
            pitch: 'P1.25 mm',
            refresh: '3,840 Hz',
            nits: '800 Nits',
            image: '/assests/images/projects/gpspl-real/corporate-boardroom-active-led-installation-onsite.jpg',
            badge: '4×3 Die-Cast 4K'
        },
        stage: {
            pitch: 'P1.86 mm',
            refresh: '3,840 Hz',
            nits: '1,200 Nits',
            image: '/assests/images/projects/gpspl-real/real-heritage-auditorium-led.jpg',
            badge: '32×14 ft Stage Wall'
        },
        outdoor: {
            pitch: 'P2.5 mm',
            refresh: '3,840 Hz',
            nits: '4,500 Nits',
            image: '/assests/images/projects/gpspl-real/polished/active-led-mall-atrium-cover.jpeg',
            badge: '360° Mall Atrium Cylinder'
        }
    };

    const tabButtons = document.querySelectorAll('.led-spec-tab-btn');
    const displayImg = document.getElementById('consoleDisplayImg');
    const badgeText = document.getElementById('specBadgeText');
    const pEl = document.getElementById('specPitchVal');
    const rEl = document.getElementById('specRefreshVal');
    const nEl = document.getElementById('specNitsVal');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => {
                b.classList.remove('is-active');
                b.classList.remove('active');
            });
            btn.classList.add('is-active');
            btn.classList.add('active');

            const key = btn.getAttribute('data-spec-key');
            const data = specData[key];
            if (!data) return;

            if (displayImg && data.image) {
                displayImg.style.opacity = '0.3';
                setTimeout(() => {
                    displayImg.src = data.image;
                    displayImg.style.opacity = '1';
                }, 150);
            }
            if (badgeText && data.badge) badgeText.textContent = data.badge;

            if (pEl) pEl.innerHTML = `${data.pitch.replace(' mm', '')} <small>mm</small>`;
            if (rEl) rEl.innerHTML = `${data.refresh.replace(' Hz', '')} <small>Hz</small>`;
            if (nEl) nEl.innerHTML = `${data.nits.replace(' Nits', '')} <small>Nits</small>`;
        });
    });

    // --------------------------------------------------------------------------
    // 2. Interactive 3840Hz vs 1920Hz Broadcast Camera Slider
    // --------------------------------------------------------------------------
    const compareContainer = document.getElementById('scanCompareContainer');
    const compareSlider = document.getElementById('scanCompareRange');
    const compareBefore = document.getElementById('scanCompareBefore');
    const compareHandle = document.getElementById('scanCompareHandle');

    if (compareContainer && compareSlider && compareBefore && compareHandle) {
        const updateSlider = (val) => {
            compareBefore.style.width = val + '%';
            compareHandle.style.left = val + '%';
        };

        compareSlider.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        // Touch & Mouse Drag on Container
        let isDragging = false;
        const handleDrag = (e) => {
            if (!isDragging) return;
            const rect = compareContainer.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let percent = ((clientX - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            compareSlider.value = percent;
            updateSlider(percent);
        };

        compareContainer.addEventListener('mousedown', (e) => { isDragging = true; handleDrag(e); });
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', () => { isDragging = false; });

        compareContainer.addEventListener('touchstart', (e) => { isDragging = true; handleDrag(e); }, { passive: true });
        window.addEventListener('touchmove', handleDrag, { passive: true });
        window.addEventListener('touchend', () => { isDragging = false; });
    }

    // --------------------------------------------------------------------------
    // 3. Interactive Active LED Resolution & BOQ Calculator
    // --------------------------------------------------------------------------
    const calcWidthInput = document.getElementById('calcWidthFt');
    const calcHeightInput = document.getElementById('calcHeightFt');
    const calcPitchSelect = document.getElementById('calcPitch');
    const presetButtons = document.querySelectorAll('.calc-preset-btn');

    const outResolution = document.getElementById('calcOutResolution');
    const outCabinets = document.getElementById('calcOutCabinets');
    const outPower = document.getElementById('calcOutPower');
    const outDistance = document.getElementById('calcOutDistance');
    const outProcessor = document.getElementById('calcOutProcessor');
    const outArea = document.getElementById('calcOutArea');

    const wDisplay = document.getElementById('calcWidthValDisplay');
    const hDisplay = document.getElementById('calcHeightValDisplay');
    const wmDisplay = document.getElementById('calcWidthMDisplay');
    const hmDisplay = document.getElementById('calcHeightMDisplay');

    function calculateWallSpecs() {
        if (!calcWidthInput || !calcHeightInput || !calcPitchSelect) return;

        const widthFt = parseFloat(calcWidthInput.value) || 16;
        const heightFt = parseFloat(calcHeightInput.value) || 9;
        const pitchMm = parseFloat(calcPitchSelect.value) || 1.25;

        // Dimensions in meters & millimeters
        const widthM = widthFt * 0.3048;
        const heightM = heightFt * 0.3048;
        const widthMm = widthM * 1000;
        const heightMm = heightM * 1000;
        const areaSqFt = (widthFt * heightFt).toFixed(1);
        const areaSqM = widthM * heightM;

        if (wDisplay) wDisplay.textContent = widthFt;
        if (hDisplay) hDisplay.textContent = heightFt;
        if (wmDisplay) wmDisplay.textContent = widthM.toFixed(1);
        if (hmDisplay) hmDisplay.textContent = heightM.toFixed(1);

        // Calculate Pixel Resolution
        const pxWidth = Math.round(widthMm / pitchMm);
        const pxHeight = Math.round(heightMm / pitchMm);

        // Standard Die-cast Cabinet Size: 600mm x 337.5mm (16:9) or 500mm x 500mm
        const cabW = 600; // mm
        const cabH = 337.5; // mm
        const cols = Math.ceil(widthMm / cabW);
        const rows = Math.ceil(heightMm / cabH);
        const totalCabinets = cols * rows;

        // Power calculation: ~600W/m² max, ~220W/m² average
        const maxKva = ((areaSqM * 650) / 1000 * 1.25).toFixed(1); // with 25% safety margin

        // Min Recommended Viewing Distance (meters) = Pitch in mm * 1.2 to 1.5
        const minDistanceM = (pitchMm * 1.2).toFixed(1);

        // Processor recommendation
        let recProcessor = 'NovaStar VX600 (Up to 3.9M pixels)';
        const totalPixels = pxWidth * pxHeight;
        if (totalPixels > 8000000) {
            recProcessor = 'NovaStar COEX MX40 Pro (8K HDR Video Processor)';
        } else if (totalPixels > 3900000) {
            recProcessor = 'NovaStar VX1000 / Barco E2 (4K Processing Engine)';
        } else if (pitchMm >= 2.5) {
            recProcessor = 'NovaStar TB60 / VX600 Redundant Setup';
        }

        // Update UI
        if (outResolution) outResolution.textContent = `${pxWidth.toLocaleString()} × ${pxHeight.toLocaleString()} px`;
        if (outCabinets) outCabinets.textContent = `${totalCabinets} Cabinets (${cols}W × ${rows}H)`;
        if (outPower) outPower.textContent = `~${maxKva} kVA Dedicated 3-Phase`;
        if (outDistance) outDistance.textContent = `${minDistanceM} meters (Optical Eye Comfort)`;
        if (outProcessor) outProcessor.textContent = recProcessor;
        if (outArea) outArea.textContent = `${areaSqFt} sq ft (${widthM.toFixed(1)}m × ${heightM.toFixed(1)}m)`;
    }

    if (calcWidthInput && calcHeightInput && calcPitchSelect) {
        calcWidthInput.addEventListener('input', calculateWallSpecs);
        calcHeightInput.addEventListener('input', calculateWallSpecs);
        calcPitchSelect.addEventListener('change', calculateWallSpecs);

        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                presetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                calcWidthInput.value = btn.getAttribute('data-w');
                calcHeightInput.value = btn.getAttribute('data-h');
                if (btn.hasAttribute('data-p')) {
                    calcPitchSelect.value = btn.getAttribute('data-p');
                }
                calculateWallSpecs();
            });
        });

        calculateWallSpecs();
    }
});
