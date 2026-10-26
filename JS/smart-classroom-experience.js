/**
 * GPSPL Turnkey Smart Classroom Experience Controller
 * - Interactive Signal Chain Inspector
 * - Turnkey Multi-Classroom Budget Estimator
 * - Institutional Spectrum Filter & FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', function() {
    initSignalChain();
    initClassroomCalculator();
    initSmartClassFaq();
    initSmartClassTilt();
});

// 1. Interactive Signal Flow Inspector
function initSignalChain() {
    var nodes = document.querySelectorAll('.sc-signal-node');
    var inspectorText = document.getElementById('sc-inspector-text');

    var nodeDetails = {
        'panel': '4K UHD Interactive Flat Panel (LG / Samsung / Maxhub): 50-point zero-bonding optical touch, Google EDLA Android 14/15, and front Type-C 65W PD single-cable laptop connection.',
        'podium': 'Smart Digital Audio Podium: Integrated 21.5" touch screen preview, motorized height adjustment, dual anti-feedback gooseneck microphones, and central laptop docking.',
        'dsp': 'Acoustic DSP & Voice-Lift Sound System: Digital feedback suppression, acoustic echo cancellation (AEC), and even sound pressure level (SPL) across every student desk.',
        'camera': '4K AI Auto-Tracking PTZ Camera: Optical framing with presenter tracking, auto-zooming onto blackboard equations, and SDI/NDI/USB hybrid lecture broadcast.',
        'hybrid': 'Hybrid Cloud Lecture Capture & LMS: Dual-channel synchronized recording (board notes + teacher video), instant upload to University LMS, and live streaming.'
    };

    if (!nodes.length || !inspectorText) return;

    nodes.forEach(function(node) {
        node.addEventListener('click', function() {
            nodes.forEach(function(n) { n.classList.remove('active'); });
            this.classList.add('active');

            var key = this.getAttribute('data-node');
            if (nodeDetails[key]) {
                inspectorText.textContent = nodeDetails[key];
            }
        });
    });
}

// 2. Turnkey Multi-Classroom Budget Calculator
function initClassroomCalculator() {
    var countSlider = document.getElementById('sc-slider-rooms');
    var countVal = document.getElementById('sc-val-rooms');
    var tierChips = document.querySelectorAll('.sc-tier-chip');
    
    var togglePodium = document.getElementById('sc-toggle-podium');
    var toggleCamera = document.getElementById('sc-toggle-camera');
    var toggleAmc = document.getElementById('sc-toggle-amc');

    var resTitle = document.getElementById('sc-calc-title');
    var resRooms = document.getElementById('sc-calc-rooms');
    var resTierName = document.getElementById('sc-calc-tier');
    var resDiscount = document.getElementById('sc-calc-discount');
    var resTotal = document.getElementById('sc-calc-total');

    if (!countSlider) return;

    var selectedTier = 'school';

    tierChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            tierChips.forEach(function(c) { c.classList.remove('selected'); });
            this.classList.add('selected');
            selectedTier = this.getAttribute('data-tier');
            calculateBudget();
        });
    });

    countSlider.addEventListener('input', function() {
        if (countVal) countVal.textContent = this.value + ' Classroom' + (this.value > 1 ? 's' : '');
        calculateBudget();
    });

    [togglePodium, toggleCamera, toggleAmc].forEach(function(t) {
        if (t) t.addEventListener('change', calculateBudget);
    });

    function calculateBudget() {
        var rooms = parseInt(countSlider.value, 10);
        var baseCost = 185000;
        var tierName = 'K-12 School Standard (75" IFPD + 40W Audio)';

        if (selectedTier === 'coaching') {
            baseCost = 105000;
            tierName = 'Coaching / Tuition Hub (65" IFPD + Cart + Mobile Audio)';
        } else if (selectedTier === 'university') {
            baseCost = 395000;
            tierName = 'University Lecture Theater (86" Optical Bonding + OPS i7)';
        }

        var addonCost = 0;
        if (togglePodium && togglePodium.checked) addonCost += 65000;
        if (toggleCamera && toggleCamera.checked) addonCost += 48000;
        if (toggleAmc && toggleAmc.checked) addonCost += 18000;

        var totalPerRoom = baseCost + addonCost;
        var subtotal = totalPerRoom * rooms;

        // Volume Discount Percentage
        var discountPct = 0;
        if (rooms >= 16) discountPct = 15;
        else if (rooms >= 6) discountPct = 10;
        else if (rooms >= 3) discountPct = 5;

        var discountAmount = Math.round(subtotal * (discountPct / 100));
        var netTotal = subtotal - discountAmount;

        if (resRooms) resRooms.textContent = rooms + ' Room' + (rooms > 1 ? 's' : '');
        if (resTierName) resTierName.textContent = tierName;
        if (resDiscount) {
            resDiscount.textContent = discountPct > 0 ? (discountPct + '% Institutional Volume Discount (-₹' + (discountAmount / 100000).toFixed(2) + 'L)') : 'Standard Institutional Rate';
        }

        if (resTotal) {
            var totalStr = netTotal >= 10000000 ? (netTotal / 10000000).toFixed(2) + ' Crores' : (netTotal / 100000).toFixed(2) + ' Lakhs';
            resTotal.textContent = '₹' + totalStr + '*';
            var waBtn = document.querySelector('.sc-calc-total-box a');
            if (waBtn) {
                var msg = encodeURIComponent(
                    'Hello GPSPL Team, I calculated a Turnkey Smart Classroom setup for ' + rooms + ' room(s) (' + tierName + ') on your website. Estimated total: ₹' + totalStr + '. Please send an itemized BOQ proposal and coordinate an institutional demonstration.'
                );
                waBtn.href = 'https://wa.me/918920830377?text=' + msg;
            }
        }
    }

    calculateBudget();
}

// 3. Editorial FAQ Accordion
function initSmartClassFaq() {
    var items = document.querySelectorAll('.sc-faq-item');
    items.forEach(function(item) {
        var q = item.querySelector('.sc-faq-question');
        if (q) {
            q.addEventListener('click', function() {
                var wasActive = item.classList.contains('active');
                items.forEach(function(i) { i.classList.remove('active'); });
                if (!wasActive) item.classList.add('active');
            });
        }
    });
}

// 4. Subtle 3D Card Hover Tilt
function initSmartClassTilt() {
    var cards = document.querySelectorAll('.sc-tier-card, .sc-gallery-card');
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
