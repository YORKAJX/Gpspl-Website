/**
 * Delhi NCR AV System Integrator Interactive Experience
 * GPSPL - Estd. 1997 | Nehru Place Headquarters
 * Hub Telemetry Switcher & Turnkey Budget Estimator
 */

(function () {
  'use strict';

  // --- 1. Regional Hub Telemetry Data ---
  const HUB_DATA = {
    gurugram: {
      name: 'Gurugram (Cyber City & Golf Course Rd)',
      eta: '45 Mins SLA',
      coverage: 'DLF Cyber City, Cyber Hub, Golf Course Extension, Udyog Vihar & Sector 48-50.',
      engineers: '6 On-Duty',
      spares: '18 VC Units',
      deployments: '140+ Boardrooms'
    },
    noida: {
      name: 'Noida (Film City & Expressway SEZs)',
      eta: '40 Mins SLA',
      coverage: 'Film City, Sector 62/63 IT Parks, Sector 125-135 Tech SEZs & Greater Noida Knowledge Park.',
      engineers: '5 On-Duty',
      spares: '14 LED Tiles',
      deployments: '95+ Campuses'
    },
    delhi: {
      name: 'Central & South Delhi (Aerocity & Saket)',
      eta: '30 Mins SLA',
      coverage: 'Connaught Place, Barakhamba, Aerocity Hospitality & Corporate District, Saket & Okhla Phase I-III.',
      engineers: '7 On-Duty',
      spares: '22 Mic Arrays',
      deployments: '210+ Sites'
    },
    depot: {
      name: 'Nehru Place HQ (Master Logistics & Staging Lab)',
      eta: 'Immediate Dispatch',
      coverage: 'Nehru Place Master Hardware Warehouse, Pre-staging Testing Lab & Direct OEM RMA Spare Reserve.',
      engineers: '12 Lab Techs',
      spares: '85+ Hot Spares',
      deployments: 'Estd. 1997 Depot'
    }
  };

  function initHubTelemetry() {
    const hubButtons = document.querySelectorAll('[data-delhi-hub]');
    const nameEl = document.getElementById('delhi-hub-name');
    const etaEl = document.getElementById('delhi-hub-eta');
    const covEl = document.getElementById('delhi-hub-cov');
    const engEl = document.getElementById('delhi-hub-eng');
    const sparesEl = document.getElementById('delhi-hub-spares');
    const depEl = document.getElementById('delhi-hub-dep');

    if (!hubButtons.length || !nameEl) return;

    hubButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const hubKey = this.getAttribute('data-delhi-hub');
        if (!HUB_DATA[hubKey]) return;

        hubButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const d = HUB_DATA[hubKey];
        nameEl.textContent = d.name;
        etaEl.innerHTML = '<i class="fas fa-bolt"></i> ' + d.eta;
        covEl.textContent = d.coverage;
        engEl.textContent = d.engineers;
        sparesEl.textContent = d.spares;
        depEl.textContent = d.deployments;
      });
    });
  }

  // --- 2. Turnkey AV Scope & Budget Estimator ---
  const PRICING_MATRIX = {
    room: {
      boardroom: {
        name: 'Executive Boardroom (16-24 Seater)',
        baseMin: 4.20,
        baseMax: 7.80,
        display: '86" / 98" 4K Commercial Display or Dual 75"',
        audio: 'Ceiling Array Mic + Beamforming DSP + Dante Out',
        camera: '4K Dual-Eye Auto-Framing & Speaker Tracking PTZ',
        control: '10" PoE Wall/Tabletop Touch Control'
      },
      huddle: {
        name: 'VC Huddle Room (6-10 Seater)',
        baseMin: 1.65,
        baseMax: 3.10,
        display: '65" / 75" 4K 24/7 Anti-Glare Commercial Display',
        audio: 'Integrated Acoustic Beamforming Soundbar + Sub',
        camera: '4K 120° Wide FOV AI Group Framing Camera',
        control: 'BYOD Auto-Switch USB-C Hub / Touch Controller'
      },
      auditorium: {
        name: 'Town Hall & Auditorium (100-500 Seater)',
        baseMin: 14.50,
        baseMax: 32.00,
        display: 'Active LED Video Wall (P1.25 / P1.5) or Laser 12K Lumens',
        audio: 'Line Array Columns + Dante Wireless Handheld/Lapels + Feedback DSP',
        camera: 'Multi-PTZ 4K Broadcast Cameras with NDI Tracking',
        control: 'Central Control Processor + Master AV Rack'
      },
      noc: {
        name: '24/7 Command & Control NOC/SOC',
        baseMin: 9.80,
        baseMax: 22.00,
        display: '2x2 or 3x2 Seamless Bezel Video Wall / Fine Pitch LED',
        audio: 'Zone Distributed Ceiling Audio + Priority Intercom',
        camera: 'Operator Station PTZ + Multi-Source KVM Matrix',
        control: 'Multi-Window Video Processor + Redundant PSU'
      }
    },
    tier: {
      standard: { mult: 1.0, label: 'Standard Native VC', extra: 'Commercial Grade' },
      advanced: { mult: 1.45, label: 'Avixa High-Fidelity & Touch Automation', extra: 'Ceiling Array + DSP' },
      broadcast: { mult: 2.2, label: 'Broadcast & Fine-Pitch Active LED', extra: 'Mission-Critical Redundancy' }
    }
  };

  let currentRoom = 'boardroom';
  let currentTier = 'advanced';
  let currentHub = 'gurugram';

  function calculateEstimate() {
    const rData = PRICING_MATRIX.room[currentRoom] || PRICING_MATRIX.room.boardroom;
    const tData = PRICING_MATRIX.tier[currentTier] || PRICING_MATRIX.tier.advanced;

    const minLakhs = (rData.baseMin * tData.mult).toFixed(2);
    const maxLakhs = (rData.baseMax * tData.mult).toFixed(2);

    const priceEl = document.getElementById('delhi-est-price');
    const dispEl = document.getElementById('delhi-spec-display');
    const audEl = document.getElementById('delhi-spec-audio');
    const camEl = document.getElementById('delhi-spec-cam');
    const ctlEl = document.getElementById('delhi-spec-ctl');
    const waBtn = document.getElementById('delhi-wa-lead-btn');

    if (priceEl) {
      priceEl.innerHTML = '₹' + minLakhs + 'L - ₹' + maxLakhs + 'L <span>+ GST</span>';
    }
    if (dispEl) dispEl.textContent = rData.display;
    if (audEl) audEl.textContent = rData.audio;
    if (camEl) camEl.textContent = rData.camera;
    if (ctlEl) ctlEl.textContent = rData.control;

    if (waBtn) {
      const hubLabel = HUB_DATA[currentHub] ? HUB_DATA[currentHub].name : 'Delhi NCR';
      const msg = encodeURIComponent(
        'Hello GPSPL Team, I am planning a ' + rData.name + ' (' + tData.label + ') in ' + hubLabel +
        '. Estimated budget range is ₹' + minLakhs + 'L - ₹' + maxLakhs + 'L. Please coordinate an engineer site survey and itemized BOQ.'
      );
      waBtn.href = 'https://wa.me/918920830377?text=' + msg;
    }
  }

  function initBudgetEstimator() {
    const roomPills = document.querySelectorAll('[data-room-choice]');
    const tierPills = document.querySelectorAll('[data-tier-choice]');
    const hubPills = document.querySelectorAll('[data-hub-choice]');

    roomPills.forEach(pill => {
      pill.addEventListener('click', function () {
        roomPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentRoom = this.getAttribute('data-room-choice');
        calculateEstimate();
      });
    });

    tierPills.forEach(pill => {
      pill.addEventListener('click', function () {
        tierPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentTier = this.getAttribute('data-tier-choice');
        calculateEstimate();
      });
    });

    hubPills.forEach(pill => {
      pill.addEventListener('click', function () {
        hubPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentHub = this.getAttribute('data-hub-choice');
        calculateEstimate();
      });
    });

    calculateEstimate();
  }

  // --- 3. DOM Ready Initialization ---
  document.addEventListener('DOMContentLoaded', function () {
    initHubTelemetry();
    initBudgetEstimator();
  });
})();
