/**
 * GPSPL Multi-Brand AMC & Lifecycle Service Controller
 * - Live SLA Telemetry Switcher (Boardroom, NOC/SOC, Auditorium, Campus)
 * - Interactive SLA Tier & Maintenance Cost Sizer
 * - Accordion Handlers & 3D Card Hover
 */

document.addEventListener('DOMContentLoaded', function() {
    initAmcTelemetry();
    initAmcCalculator();
    initAmcFaq();
    initAmcTilt();
});

// 1. Live SLA Telemetry Switcher
function initAmcTelemetry() {
    var tabs = document.querySelectorAll('.amc-tab-btn');
    var valUptime = document.getElementById('amc-val-uptime');
    var valSla = document.getElementById('amc-val-sla');
    var valVisits = document.getElementById('amc-val-visits');
    var valSpares = document.getElementById('amc-val-spares');
    var valNote = document.getElementById('amc-val-note');

    var profiles = {
        'boardroom': {
            uptime: '99.9% Target Uptime',
            sla: '4-Hour Emergency SLA',
            visits: 'Quarterly (4x / Year)',
            spares: 'Touch Panels & DSP Ready',
            note: 'Zero-downtime boardroom reliability for executive leadership meetings and investor calls.'
        },
        'noc': {
            uptime: '99.99% Mission-Critical',
            sla: '2-Hour Guaranteed SLA',
            visits: 'Bi-Monthly (6x / Year)',
            spares: 'NovaStar & MicroLED Ready',
            note: '24/7 continuous operation with hot-swappable spares in stock at Nehru Place dispatch depot.'
        },
        'auditorium': {
            uptime: '99.8% Townhall Ready',
            sla: '4-Hour + Event Standby',
            visits: 'Quarterly (4x / Year)',
            spares: 'Shure Mics & Line Array Ready',
            note: 'On-site engineer standby support during high-ticket annual general meetings and live broadcasts.'
        },
        'campus': {
            uptime: '99.5% Academic Uptime',
            sla: '6-Hour On-Site SLA',
            visits: 'Term-End (3x / Year)',
            spares: 'IFPD Boards & Stylus Ready',
            note: 'Standardized maintenance across 20+ smart classrooms with scheduled vacation firmware updates.'
        }
    };

    if (!tabs.length) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');

            var key = this.getAttribute('data-facility');
            var data = profiles[key];
            if (!data) return;

            if (valUptime) valUptime.textContent = data.uptime;
            if (valSla) valSla.textContent = data.sla;
            if (valVisits) valVisits.textContent = data.visits;
            if (valSpares) valSpares.textContent = data.spares;
            if (valNote) valNote.textContent = data.note;
        });
    });
}

// 2. Interactive SLA Tier & Maintenance Cost Estimator
function initAmcCalculator() {
    var sliderRooms = document.getElementById('amc-slider-rooms');
    var valRooms = document.getElementById('amc-badge-rooms');
    var slaChips = document.querySelectorAll('.amc-sla-chip');
    var selectHw = document.getElementById('amc-select-hw');

    var resTitle = document.getElementById('amc-res-rooms');
    var resSla = document.getElementById('amc-res-sla');
    var resVisits = document.getElementById('amc-res-visits');
    var resSpares = document.getElementById('amc-res-spares');
    var resPrice = document.getElementById('amc-res-price');

    if (!sliderRooms) return;

    var selectedSla = 'gold';

    slaChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            slaChips.forEach(function(c) { c.classList.remove('selected'); });
            this.classList.add('selected');
            selectedSla = this.getAttribute('data-sla');
            calculateAmc();
        });
    });

    sliderRooms.addEventListener('input', function() {
        if (valRooms) valRooms.textContent = this.value + ' Facility' + (this.value > 1 ? 's' : '');
        calculateAmc();
    });

    if (selectHw) {
        selectHw.addEventListener('change', calculateAmc);
    }

    function calculateAmc() {
        var rooms = parseInt(sliderRooms.value, 10);
        var hwType = selectHw ? selectHw.value : 'vc';

        var baseCostPerUnit = 28000;
        if (hwType === 'led') baseCostPerUnit = 75000;
        else if (hwType === 'auditorium') baseCostPerUnit = 65000;
        else if (hwType === 'noc') baseCostPerUnit = 95000;

        var multiplier = 1.35;
        var slaName = 'Gold SLA: 4-Hour Onsite Emergency SLA (Delhi NCR)';
        var visitsText = 'Quarterly (4 Scheduled Preventive Visits / Year)';
        var sparesText = 'Standby Inventory Maintained at Central Depot';

        if (selectedSla === 'silver') {
            multiplier = 1.0;
            slaName = 'Silver SLA: 8x5 Next-Business-Day Resolution';
            visitsText = 'Semi-Annual (2 Scheduled Preventive Visits / Year)';
            sparesText = 'Standard OEM Warranty Routing';
        } else if (selectedSla === 'platinum') {
            multiplier = 2.1;
            slaName = 'Platinum SLA: 24/7 Dedicated Resident Engineer';
            visitsText = 'Continuous Daily Monitoring + Monthly Full Audits';
            sparesText = 'Dedicated On-Premise Hot-Standby Inventory';
        }

        var subtotal = Math.round(baseCostPerUnit * rooms * multiplier);
        // Bulk facility discount
        if (rooms >= 10) subtotal = Math.round(subtotal * 0.88);
        else if (rooms >= 5) subtotal = Math.round(subtotal * 0.93);

        if (resTitle) resTitle.textContent = (rooms === 1 ? '1 Covered Facility' : rooms + ' Covered Facilities');
        if (resSla) resSla.textContent = slaName;
        if (resVisits) resVisits.textContent = visitsText;
        if (resSpares) resSpares.textContent = sparesText;
        if (resPrice) {
            var priceStr = subtotal >= 10000000 ? (subtotal / 10000000).toFixed(2) + ' Cr' : (subtotal / 100000).toFixed(2) + ' Lakhs';
            resPrice.textContent = '₹' + priceStr + ' / Year*';
            var waBtn = document.querySelector('.amc-price-box a');
            if (waBtn) {
                var msg = encodeURIComponent(
                    'Hello GPSPL Team, I used the AMC Cost Estimator for ' + rooms + ' facility/room(s) (' + slaName + '). Estimated budget: ₹' + priceStr + '/Year. Please share an itemized SLA contract proposal and preventive audit schedule.'
                );
                waBtn.href = 'https://wa.me/918920830377?text=' + msg;
            }
        }
    }

    calculateAmc();
}

// 3. Editorial FAQ Accordion
function initAmcFaq() {
    var items = document.querySelectorAll('.amc-faq-item');
    items.forEach(function(item) {
        var q = item.querySelector('.amc-faq-question');
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
function initAmcTilt() {
    var cards = document.querySelectorAll('.amc-oem-card, .amc-gallery-card');
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -3;
            var rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-3px)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}
