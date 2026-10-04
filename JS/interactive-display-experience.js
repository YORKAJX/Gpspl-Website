/**
 * GPSPL Interactive Display & Smart Board Experience Controller
 * - Live 4K Telemetry Switcher (65", 75", 86", 98")
 * - Avixa DISCAS Smart Board Sizer & Budget Estimator
 * - Micro-interactions, FAQ Accordions, and 3D Card Hover
 */

document.addEventListener('DOMContentLoaded', function() {
    initTelemetryConsole();
    initDiscasSizer();
    initFaqAccordion();
    initCardTilt();
});

// 1. Live 4K Telemetry Console Switcher
function initTelemetryConsole() {
    var sizeData = {
        '65': {
            diagonal: '65" (165 cm)',
            activeArea: '1,428 × 803 mm',
            resolution: '3840 × 2160 (4K UHD)',
            latency: '< 5 ms Zero-Lag',
            distance: '6 – 16 Feet (Ideal 12ft)',
            capacity: '8 – 20 Students / Team',
            power: '145W Typ (0.5W Standby)',
            summary: 'Engineered for Coaching Batches, Meeting Huddles & Small Labs'
        },
        '75': {
            diagonal: '75" (190 cm)',
            activeArea: '1,650 × 928 mm',
            resolution: '3840 × 2160 (4K UHD)',
            latency: '< 4 ms Zero-Lag',
            distance: '8 – 24 Feet (Ideal 18ft)',
            capacity: '25 – 45 Students (Standard Class)',
            power: '185W Typ (0.5W Standby)',
            summary: "India's Gold Standard for K-12 Classrooms, Training Hubs & Boardrooms"
        },
        '86': {
            diagonal: '86" (218 cm)',
            activeArea: '1,895 × 1,066 mm',
            resolution: '3840 × 2160 (4K UHD)',
            latency: '< 3.5 ms Zero-Lag',
            distance: '12 – 36 Feet (Ideal 28ft)',
            capacity: '50 – 80 Students (University Hall)',
            power: '240W Typ (0.5W Standby)',
            summary: 'Large University Lecture Halls, Executive Boardrooms & Training Auditoriums'
        },
        '98': {
            diagonal: '98" (249 cm)',
            activeArea: '2,158 × 1,214 mm',
            resolution: '3840 × 2160 (4K UHD)',
            latency: '< 3 ms Zero-Lag',
            distance: '15 – 50+ Feet (Ideal 40ft)',
            capacity: '80 – 150+ Students (Amphitheatre)',
            power: '320W Typ (0.5W Standby)',
            summary: 'Grand University Amphitheatres, Multi-Purpose Halls & Command Suites'
        }
    };

    var buttons = document.querySelectorAll('.ifp-size-btn');
    var valArea = document.getElementById('ifp-metric-area');
    var valLatency = document.getElementById('ifp-metric-latency');
    var valDistance = document.getElementById('ifp-metric-distance');
    var valCapacity = document.getElementById('ifp-metric-capacity');
    var valSummary = document.getElementById('ifp-metric-summary');

    if (!buttons.length) return;

    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            buttons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            var size = this.getAttribute('data-size');
            var data = sizeData[size];
            if (!data) return;

            if (valArea) valArea.textContent = data.activeArea;
            if (valLatency) valLatency.textContent = data.latency;
            if (valDistance) valDistance.textContent = data.distance;
            if (valCapacity) valCapacity.textContent = data.capacity;
            if (valSummary) valSummary.textContent = data.summary;
        });
    });
}

// 2. Avixa DISCAS Smart Board Sizer & Budget Estimator
function initDiscasSizer() {
    var depthSlider = document.getElementById('ifp-slider-depth');
    var capSlider = document.getElementById('ifp-slider-capacity');
    var depthBadge = document.getElementById('ifp-badge-depth');
    var capBadge = document.getElementById('ifp-badge-capacity');

    var osChips = document.querySelectorAll('.ifp-os-chip');
    var mountChips = document.querySelectorAll('.ifp-mount-chip');

    var resSize = document.getElementById('ifp-calc-size');
    var resScope = document.getElementById('ifp-calc-scope');
    var resDistance = document.getElementById('ifp-calc-distance');
    var resAudio = document.getElementById('ifp-calc-audio');
    var resMounting = document.getElementById('ifp-calc-mounting');
    var resPrice = document.getElementById('ifp-calc-price');

    if (!depthSlider || !capSlider) return;

    var selectedOs = 'android';
    var selectedMount = 'wall';

    osChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            osChips.forEach(function(c) { c.classList.remove('selected'); });
            this.classList.add('selected');
            selectedOs = this.getAttribute('data-os');
            recalc();
        });
    });

    mountChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            mountChips.forEach(function(c) { c.classList.remove('selected'); });
            this.classList.add('selected');
            selectedMount = this.getAttribute('data-mount');
            recalc();
        });
    });

    depthSlider.addEventListener('input', function() {
        if (depthBadge) depthBadge.textContent = this.value + ' ft';
        recalc();
    });

    capSlider.addEventListener('input', function() {
        if (capBadge) capBadge.textContent = this.value + ' Students';
        recalc();
    });

    function recalc() {
        var depth = parseInt(depthSlider.value, 10);
        var cap = parseInt(capSlider.value, 10);

        var size = '75" 4K UHD';
        var furthest = Math.round(depth * 0.95) + ' ft';
        var audio = '2×15W Built-In Stereo + Wireless Collar Mic';
        var baseMin = 145000;
        var baseMax = 195000;
        var scopeDesc = 'Standard K-12 Smart Classroom Setup';

        if (depth <= 18 && cap <= 20) {
            size = '65" 4K UHD Smart Board';
            audio = 'Built-in 2×15W Stereo Acoustic Speakers';
            baseMin = 85000;
            baseMax = 125000;
            scopeDesc = 'Coaching Center / Small Batch / Huddle Classroom';
        } else if (depth <= 28 && cap <= 45) {
            size = '75" 4K UHD Interactive Flat Panel';
            audio = '2×20W Wall-Mount Voice-Lift Soundbar + Wireless Mic';
            baseMin = 135000;
            baseMax = 185000;
            scopeDesc = 'National Standard K-12 Interactive Classroom (CBSE/ICSE)';
        } else if (depth <= 42 && cap <= 80) {
            size = '86" 4K UHD Optical Bonding IFPD';
            audio = '40W High-Efficiency Voice-Lift System + Teacher Lapel Mic';
            baseMin = 210000;
            baseMax = 295000;
            scopeDesc = 'University Lecture Hall / Large College Smart Amphitheatre';
        } else {
            size = '98" 4K UHD Architectural Interactive Display';
            audio = 'Steerable Dante Array Speakers + Multi-Zone Ceiling Mics';
            baseMin = 385000;
            baseMax = 520000;
            scopeDesc = 'Grand Auditorium / High-Capacity Higher-Ed Lecture Hall';
        }

        // Add Dual OS OPS Addon
        if (selectedOs === 'dual') {
            baseMin += 38000;
            baseMax += 48000;
            scopeDesc += ' + Windows 11 Pro i7 OPS PC Slot';
        }

        // Add Mounting Addon
        var mountDesc = 'Heavy-Duty Reinforced Wall Mount Bracket';
        if (selectedMount === 'cart') {
            baseMin += 14000;
            baseMax += 22000;
            mountDesc = 'Heavy-Duty Motorized / Mobile Wheel Trolley';
        }

        if (resSize) resSize.textContent = size;
        if (resScope) resScope.textContent = scopeDesc;
        if (resDistance) resDistance.textContent = furthest;
        if (resAudio) resAudio.textContent = audio;
        if (resMounting) resMounting.textContent = mountDesc;
        if (resPrice) {
            var minL = (baseMin / 100000).toFixed(2);
            var maxL = (baseMax / 100000).toFixed(2);
            resPrice.textContent = '₹' + minL + ' – ' + maxL + ' Lakhs*';
            var waBtn = document.querySelector('.ifp-price-card a');
            if (waBtn) {
                var msg = encodeURIComponent(
                    'Hello GPSPL Team, I configured a ' + size + ' (' + scopeDesc + ') on your website for a ' + depth + 'ft room (' + cap + ' capacity). Estimated Budget ₹' + minL + 'L - ₹' + maxL + 'L. Please send me formal BOQ and demo availability.'
                );
                waBtn.href = 'https://wa.me/918920830377?text=' + msg;
            }
        }
    }

    recalc();
}

// 3. Editorial FAQ Accordion
function initFaqAccordion() {
    var items = document.querySelectorAll('.ifp-faq-item');
    items.forEach(function(item) {
        var q = item.querySelector('.ifp-faq-question');
        if (q) {
            q.addEventListener('click', function() {
                var wasActive = item.classList.contains('active');
                items.forEach(function(i) { i.classList.remove('active'); });
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 4. Subtle 3D Card Hover Tilt
function initCardTilt() {
    var cards = document.querySelectorAll('.ifp-product-card, .ifp-tier-card');
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -3;
            var rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}
