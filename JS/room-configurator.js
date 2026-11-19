(function () {
  "use strict";

  /* =========================================================================
   * GPSPL ONLINE AV SOLUTION CONSULTANT & ENTERPRISE BUDGET PLANNER
   * Estd. 1997 • 29 Years of AV Integration & Turnkey Technology Distribution
   * Authorized OEM Partners: Samsung, LG, Harman, Poly, Crestron, Shure, Sony
   * ========================================================================= */

  const BRAND_ASSETS = {
    logo: "/assests/images/brand/proposal-logo.png",
    ribbon: "/assests/images/brand/proposal-ribbon.png",
    companyName: "GLOBAL PERIPHERAL SOLUTION PVT. LTD.",
    tagline: "ESTD 1997 • 29 YEARS OF TRUST",
    contactPhones: "+91 8920830377 | +91 8920830377",
    contactEmails: "global@gpspl.co.in | global@gpspl.co.in",
    website: "www.gpspl.co.in",
    address: "Nehru Place, New Delhi - 110019, India"
  };

  const PRESETS = [
    {
      id: "boardroom",
      name: "Executive Boardroom",
      icon: "fas fa-briefcase",
      desc: "Top-tier hybrid executive boardroom with crystal-clear ceiling audio & voice tracking.",
      length: 28, width: 16, height: 10, cap: 16,
      display: "commercial", displaySize: "85",
      camera: "ptz", mic: "ceiling", speaker: "ceiling",
      platform: "teams", budgetTier: "premium",
      acousticTreatment: "treated", connectivity: "motorized"
    },
    {
      id: "conference",
      name: "Corporate Conference Room",
      icon: "fas fa-users-viewfinder",
      desc: "Standard enterprise 10-14 seat video meeting space with AI auto-framing.",
      length: 22, width: 14, height: 10, cap: 12,
      display: "commercial", displaySize: "75",
      camera: "ai", mic: "ceiling", speaker: "ceiling",
      platform: "teams", budgetTier: "standard",
      acousticTreatment: "standard", connectivity: "popup"
    },
    {
      id: "huddle",
      name: "Agile Huddle Space",
      icon: "fas fa-comments",
      desc: "Quick 4-6 person collaboration pod with wide-angle 4K video bar.",
      length: 14, width: 10, height: 9, cap: 6,
      display: "commercial", displaySize: "55",
      camera: "ai", mic: "soundbar", speaker: "soundbar",
      platform: "byod", budgetTier: "value",
      acousticTreatment: "standard", connectivity: "table"
    },
    {
      id: "classroom",
      name: "Smart Classroom / Training Hall",
      icon: "fas fa-graduation-cap",
      desc: "Interactive 4K touch display with digital podium & wireless microphone.",
      length: 32, width: 22, height: 11, cap: 40,
      display: "interactive", displaySize: "75",
      camera: "ptz", mic: "wireless", speaker: "wall",
      platform: "teams", budgetTier: "standard",
      acousticTreatment: "standard", connectivity: "podium"
    },
    {
      id: "townhall",
      name: "Town Hall / Auditorium",
      icon: "fas fa-landmark",
      desc: "Large Active LED wall with long-throw line array sound & multi-camera tracking.",
      length: 55, width: 35, height: 16, cap: 150,
      display: "led", displaySize: "163",
      camera: "dual", mic: "wireless", speaker: "linearray",
      platform: "teams", budgetTier: "premium",
      acousticTreatment: "treated", connectivity: "rack"
    },
    {
      id: "controlroom",
      name: "Command & Control NOC Room",
      icon: "fas fa-shield-halved",
      desc: "24/7 mission critical video wall matrix with multi-window video processor.",
      length: 30, width: 20, height: 12, cap: 15,
      display: "led", displaySize: "136",
      camera: "ptz", mic: "table", speaker: "ceiling",
      platform: "byod", budgetTier: "premium",
      acousticTreatment: "treated", connectivity: "rack"
    }
  ];

  const OPTIONS = {
    displays: [
      { id: "commercial", label: "4K Non-Glare Commercial Display (Samsung QMC / LG 24/7 Signage)", icon: "fas fa-tv" },
      { id: "interactive", label: "4K Interactive Touch Panel (LG CreateBoard / Samsung Flip)", icon: "fas fa-hand-pointer" },
      { id: "led", label: "Active LED Seamless Video Wall (0.0mm Bezel P0.9-P1.8)", icon: "fas fa-border-all" },
      { id: "projector", label: "4K Laser Projection System (5000+ Lumens)", icon: "fas fa-video" }
    ],
    displaySizes: [
      { id: "55", label: "55 Inch (Huddle & Focus Rooms 4-6 Pax)" },
      { id: "65", label: "65 Inch (Compact Meeting Rooms 6-8 Pax)" },
      { id: "75", label: "75 Inch (Standard Conference 10-14 Pax)" },
      { id: "85", label: "85 / 86 Inch (Executive Boardrooms 14-20 Pax)" },
      { id: "98", label: "98 Inch Ultra-Large Commercial Display" },
      { id: "136", label: "136 Inch All-in-One Active LED Wall" },
      { id: "163", label: "163+ Inch Large Active LED Video Wall" }
    ],
    cameras: [
      { id: "ai", label: "4K AI Auto-Framing & Speaker Tracking Video Bar (Poly / Logitech)", icon: "fas fa-camera" },
      { id: "ptz", label: "4K 12x Optical PTZ Camera with Voice Tracking (Poly / Aver)", icon: "fas fa-video-slash" },
      { id: "dual", label: "Dual-Camera Multi-Presenter Tracking System", icon: "fas fa-users-rectangle" },
      { id: "usb", label: "Wide-Angle 4K USB Camera (120° FOV)", icon: "fas fa-webcam" }
    ],
    mics: [
      { id: "ceiling", label: "Ceiling Beamforming Mic Array (Shure MXA920 / Sennheiser TCC2 - Zero Table Wires)", icon: "fas fa-microphone-lines" },
      { id: "table", label: "Tabletop Boundary Microphones with Mute-Sync Ring", icon: "fas fa-microphone" },
      { id: "wireless", label: "Digital Wireless Lapel & Handheld Mics (Shure / Sennheiser)", icon: "fas fa-podcast" },
      { id: "soundbar", label: "Integrated High-Sensitivity Video Bar Mic Array", icon: "fas fa-sliders" }
    ],
    speakers: [
      { id: "ceiling", label: "Flush Ceiling Coaxial Speakers (JBL Pro - Even 360° Sound)", icon: "fas fa-volume-high" },
      { id: "wall", label: "Wall-Mount Column Speakers (Speech Clarity)", icon: "fas fa-arrows-up-down" },
      { id: "soundbar", label: "High-Fidelity Stereo Video Bar Speakers", icon: "fas fa-bars" },
      { id: "linearray", label: "Professional Line-Array Sound System (Auditorium)", icon: "fas fa-tower-cell" }
    ],
    platforms: [
      { id: "teams", label: "Microsoft Teams Rooms (Native MTR Appliance)", icon: "fab fa-microsoft" },
      { id: "zoom", label: "Zoom Rooms (Certified Appliance)", icon: "fas fa-video" },
      { id: "byod", label: "Universal BYOD / Wireless Presentation (Barco / ClickShare)", icon: "fas fa-laptop" },
      { id: "webex", label: "Cisco Webex / Multi-Platform VC", icon: "fas fa-globe" }
    ],
    budgetTiers: [
      { id: "value", label: "Value Enterprise (High ROI / Cost-Optimized)" },
      { id: "standard", label: "Professional Standard (Enterprise Standard)" },
      { id: "premium", label: "Ultra-Premium / Luxury (Global Top Tier)" }
    ]
  };

  /* =========================================================================
   * COMPREHENSIVE BACKEND CALCULATION ENGINE
   * ========================================================================= */
  function createRoomFromPreset(index, presetId = "conference") {
    const preset = PRESETS.find(p => p.id === presetId) || PRESETS[1];
    return {
      id: "room-" + (index + 1),
      designation: preset.name + " " + (index + 1),
      presetId: preset.id,
      length: preset.length,
      width: preset.width,
      height: preset.height,
      capacity: preset.cap,
      display: preset.display,
      displaySize: preset.displaySize,
      camera: preset.camera,
      microphone: preset.mic,
      speaker: preset.speaker,
      platform: preset.platform,
      budgetTier: preset.budgetTier,
      acousticTreatment: preset.acousticTreatment,
      connectivity: preset.connectivity
    };
  }

  function calculateRoomHardware(room) {
    const area = room.length * room.width;
    const volume = area * room.height;
    const tierMultiplier = room.budgetTier === "premium" ? 1.4 : room.budgetTier === "value" ? 0.8 : 1.0;

    let items = [];

    // 1. Display Hardware
    if (room.display === "led") {
      const is163 = room.displaySize === "163" || area > 550;
      const ledBase = is163 ? 1450000 : 980000;
      items.push({
        category: "Display Subsystem",
        item: is163 ? "Active LED Video Wall P1.5mm (163-inch Seamless)" : "Active LED All-in-One Wall P1.8mm (136-inch)",
        brand: "Samsung The Wall / LG LED Bloc / Absen",
        qty: 1,
        unitCost: Math.round(ledBase * tierMultiplier),
        specs: "0.0mm Bezel, 600 Nits Brightness, HDR10+, 4K Video Processor & Sending Card"
      });
    } else if (room.display === "interactive") {
      const size = room.displaySize || "75";
      const ifpBase = size === "85" || size === "86" ? 285000 : size === "75" ? 195000 : 145000;
      items.push({
        category: "Display Subsystem",
        item: `${size}" 4K Ultra-HD Interactive Flat Panel`,
        brand: "LG CreateBoard / Samsung Flip / ViewSonic",
        qty: 1,
        unitCost: Math.round(ifpBase * tierMultiplier),
        specs: "40-Point Multi-Touch, Anti-Glare Glass, Built-in Android + Windows OPS Slot"
      });
    } else if (room.display === "projector") {
      items.push({
        category: "Display Subsystem",
        item: "4K Laser Projector (6000 Lumens) + 150-inch Motorized Screen",
        brand: "Sony / Panasonic / Epson",
        qty: 1,
        unitCost: Math.round(260000 * tierMultiplier),
        specs: "20,000 Hours Laser Source, 4K UHD, Motorized RF Remote Screen"
      });
    } else {
      const size = room.displaySize || "75";
      const dispBase = size === "98" ? 520000 : size === "85" ? 225000 : size === "75" ? 145000 : size === "65" ? 95000 : 65000;
      items.push({
        category: "Display Subsystem",
        item: `${size}" 4K Non-Glare 24/7 Commercial Signage Display`,
        brand: "Samsung QMC Series / LG Commercial UHD",
        qty: 1,
        unitCost: Math.round(dispBase * tierMultiplier),
        specs: "500 Nits Brightness, Non-Glare Panel, 24/7 Duty Cycle, Ultra-Slim 28.5mm Chassis"
      });
    }

    // 2. Camera System
    if (room.camera === "dual") {
      items.push({
        category: "Video Conferencing",
        item: "Dual-Camera Multi-Presenter 4K Tracking System",
        brand: "Poly DirectorAI / Logitech Rally Plus Dual / Sony PTZ",
        qty: 1,
        unitCost: Math.round(285000 * tierMultiplier),
        specs: "Dual 4K Sensors, AI Group Framing & Active Speaker Voice Tracking, 15x HD Zoom"
      });
    } else if (room.camera === "ptz") {
      items.push({
        category: "Video Conferencing",
        item: "4K 12x Optical Zoom PTZ Camera with Voice Tracking",
        brand: "Poly EagleEye / Aver CAM520 / Logitech",
        qty: 1,
        unitCost: Math.round(145000 * tierMultiplier),
        specs: "12x Optical Zoom, 4K@60fps, Preset Positions, USB 3.0 & IP Streaming"
      });
    } else if (room.camera === "ai") {
      items.push({
        category: "Video Conferencing",
        item: "All-in-One 4K AI Auto-Framing Video Bar",
        brand: "Poly Studio X52 / Logitech Rally Bar / Bose VB1",
        qty: 1,
        unitCost: Math.round(165000 * tierMultiplier),
        specs: "Integrated 4K Camera, Beamforming Mic Array, Stereo Speakers, Native MTR/Zoom"
      });
    } else {
      items.push({
        category: "Video Conferencing",
        item: "Wide-Angle 4K USB Conference Camera",
        brand: "Logitech MeetUp / Poly Studio R30",
        qty: 1,
        unitCost: Math.round(75000 * tierMultiplier),
        specs: "120° Field of View, 5x Digital Zoom, Integrated Noise-Blocking Mics"
      });
    }

    // 3. Microphone & DSP Subsystem
    if (room.microphone === "ceiling") {
      const micCount = Math.max(1, Math.ceil(area / 320));
      items.push({
        category: "Audio Subsystem",
        item: `Ceiling Beamforming Microphone Array (Steerable Lobes)`,
        brand: "Shure Microflex MXA920 / Sennheiser TeamConnect Ceiling 2",
        qty: micCount,
        unitCost: Math.round(245000 * tierMultiplier),
        specs: "Automatic Coverage Technology, Dante Digital Audio, Zero Table Wiring, Integrated AEC"
      });

      items.push({
        category: "Audio Processing",
        item: "Digital Signal Processor (DSP) with Multi-Channel AEC",
        brand: "Biamp Tesira Forte / BSS Audio / QSC Q-SYS",
        qty: 1,
        unitCost: Math.round(185000 * tierMultiplier),
        specs: "Acoustic Echo Cancellation, Dante Audio Networking, Noise Reduction, Auto-Mixing"
      });
    } else if (room.microphone === "wireless") {
      items.push({
        category: "Audio Subsystem",
        item: "Digital Wireless Microphone System (Lapel + Handheld)",
        brand: "Shure SLX-D / Sennheiser EW-D",
        qty: 2,
        unitCost: Math.round(75000 * tierMultiplier),
        specs: "24-bit Digital Audio, 100m Range, Rechargeable Li-ion, Interference Immunity"
      });

      items.push({
        category: "Audio Processing",
        item: "Digital Audio Processor & Feedback Suppressor",
        brand: "dbx / Harman / Biamp",
        qty: 1,
        unitCost: Math.round(95000 * tierMultiplier),
        specs: "Advanced Feedback Suppression, Parametric EQ, Compression, Speaker Management"
      });
    } else if (room.microphone === "table") {
      const tabMicCount = Math.max(2, Math.ceil(room.capacity / 4));
      items.push({
        category: "Audio Subsystem",
        item: "Tabletop Boundary Microphones with Mute-Sync",
        brand: "Shure Microflex / Audio-Technica",
        qty: tabMicCount,
        unitCost: Math.round(28000 * tierMultiplier),
        specs: "Cardioid Pickup, LED Mute Ring, Low-Noise Shielding"
      });

      items.push({
        category: "Audio Processing",
        item: "Digital Signal Processor (DSP) with Multi-Channel AEC",
        brand: "Biamp Tesira / BSS Audio",
        qty: 1,
        unitCost: Math.round(145000 * tierMultiplier),
        specs: "Acoustic Echo Cancellation, Auto-Gain Control, USB Audio Interface"
      });
    }

    // 4. Speakers & Power Amplifier
    if (room.speaker === "ceiling") {
      const spkCount = Math.max(2, Math.ceil(area / 85) * 2);
      items.push({
        category: "Audio Subsystem",
        item: "Flush Mount Ceiling Coaxial Speakers",
        brand: "JBL Professional Control Series / Tannoy",
        qty: spkCount,
        unitCost: Math.round(9500 * tierMultiplier),
        specs: "6.5-inch Coaxial Driver, 120° Wide Dispersion, Fire-Rated Metal Backcan"
      });

      items.push({
        category: "Audio Subsystem",
        item: "Multi-Channel Commercial Power Amplifier",
        brand: "Crown (Harman) / Extron",
        qty: 1,
        unitCost: Math.round(48000 * tierMultiplier),
        specs: "Class-D High Efficiency, 4 x 150W @ 8 Ohms, Thermal & Short Circuit Protection"
      });
    } else if (room.speaker === "linearray") {
      items.push({
        category: "Audio Subsystem",
        item: "Powered Column / Line-Array Speaker Pair",
        brand: "JBL CBT Series / Bose Panaray",
        qty: 2,
        unitCost: Math.round(115000 * tierMultiplier),
        specs: "Constant Beamwidth Technology, High Speech Intelligibility, Long-Throw Coverage"
      });
    } else if (room.speaker === "wall") {
      items.push({
        category: "Audio Subsystem",
        item: "Wall-Mount 2-Way Surface Speakers",
        brand: "JBL Control 25 / Yamaha",
        qty: 4,
        unitCost: Math.round(12500 * tierMultiplier),
        specs: "Weather-Resistant, 5.25-inch Woofer, Titanium Tweeter"
      });

      items.push({
        category: "Audio Subsystem",
        item: "Commercial Audio Power Amplifier",
        brand: "Crown (Harman)",
        qty: 1,
        unitCost: Math.round(38000 * tierMultiplier),
        specs: "2 x 120W Commercial Amplifier"
      });
    }

    // 5. Switching, Core Infrastructure & Connectivity
    const rackUnits = area > 450 ? "24U" : "12U";
    const upsKva = area > 450 ? "2kVA" : "1kVA";

    items.push({
      category: "Infrastructure",
      item: "4K HDMI / USB-C Signal Switching & Table Connectivity Box",
      brand: "Extron / Kramer / Crestron",
      qty: 1,
      unitCost: Math.round(55000 * tierMultiplier),
      specs: "4K60 4:4:4 HDMI, 60W USB-C Laptop Charging, Retractable Cable Cubby"
    });

    items.push({
      category: "Infrastructure",
      item: `Managed Gigabit PoE+ Network Switch + ${rackUnits} Equipment Rack`,
      brand: "Netgear AV Line / APC Schneider / Valrack",
      qty: 1,
      unitCost: Math.round(42000 * tierMultiplier),
      specs: "Pre-configured for Dante & AV-over-IP, Lockable Glass Door Rack with Cooling Fans"
    });

    items.push({
      category: "Infrastructure",
      item: `Online Pure Sine Wave UPS (${upsKva}) with Power Isolation`,
      brand: "APC by Schneider Electric / Numeric",
      qty: 1,
      unitCost: Math.round(32000 * tierMultiplier),
      specs: "Zero Transfer Time, Voltage Surge Suppression, Battery Backup for AV Electronics"
    });

    // 6. Turnkey Integration, Cabling & Commissioning Services
    const hardwareSubtotal = items.reduce((sum, i) => sum + (i.unitCost * i.qty), 0);
    const servicesCost = Math.round(hardwareSubtotal * 0.14);

    items.push({
      category: "Turnkey Services",
      item: "Professional AV Installation, Cabling, Acoustic Tuning & 1-Yr Support",
      brand: "GPSPL Certified AV Integration Team",
      qty: 1,
      unitCost: servicesCost,
      specs: "Cat6A STP / 4K Optical HDMI Cables, Metal Brackets, DSP Acoustic Tuning, 1-Year Comprehensive On-Site Support"
    });

    const totalBeforeGst = hardwareSubtotal + servicesCost;
    const gstAmount = Math.round(totalBeforeGst * 0.18);
    const totalGstIncl = totalBeforeGst + gstAmount;

    // Estimate Band (+/- 7% variance)
    const lowEst = Math.round((totalGstIncl * 0.93) / 5000) * 5000;
    const highEst = Math.round((totalGstIncl * 1.07) / 5000) * 5000;

    return {
      items,
      hardwareSubtotal,
      servicesCost,
      totalBeforeGst,
      gstAmount,
      totalGstIncl,
      estimateBand: [lowEst, highEst],
      rt60: (0.05 * volume) / (area * 0.25 + (room.height * (room.length + room.width) * 2 * 0.12)),
      powerDrawWatts: Math.round(area * 3.5 + 400)
    };
  }

  function formatLakhs(amount) {
    if (!amount) return "Rs. 0";
    if (amount >= 10000000) return "Rs. " + (amount / 10000000).toFixed(2) + " Cr";
    if (amount >= 100000) return "Rs. " + (amount / 100000).toFixed(1) + " Lakh";
    return "Rs. " + amount.toLocaleString("en-IN");
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  /* =========================================================================
   * SLEEK MODERN CONSULTANT APPLICATION STATE & RENDERER
   * ========================================================================= */
  let appState = {
    rooms: [createRoomFromPreset(0, "boardroom")],
    activeRoom: 0
  };

  function renderConsultant(container) {
    if (!container) return;
    const active = appState.rooms[appState.activeRoom] || appState.rooms[0];
    const roomEst = calculateRoomHardware(active);
    const areaSqFt = active.length * active.width;

    container.innerHTML = `
      <div class="sleek-consultant-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 24px; padding: 28px 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        
        <!-- HEADER & ROOM TABS -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 24px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 18px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 0.82rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-right: 4px;">Configured Spaces:</span>
            ${appState.rooms.map((r, idx) => `
              <button type="button" class="room-tab-btn ${idx === appState.activeRoom ? 'is-active' : ''}" data-select-room="${idx}" style="background: ${idx === appState.activeRoom ? '#071526' : '#f8fafc'}; color: ${idx === appState.activeRoom ? '#ffffff' : '#334155'}; border: 1.5px solid ${idx === appState.activeRoom ? '#071526' : '#cbd5e1'}; padding: 8px 16px; border-radius: 10px; font-size: 0.86rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease;">
                <span style="background: ${idx === appState.activeRoom ? '#ef3438' : '#cbd5e1'}; color: ${idx === appState.activeRoom ? '#fff' : '#475569'}; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 800;">${idx + 1}</span>
                ${escapeHtml(r.designation)}
              </button>
            `).join('')}
          </div>

          <div style="display: flex; gap: 8px;">
            ${appState.rooms.length < 6 ? `
              <button type="button" id="btnAddSpace" style="background: #ffffff; color: #0056b3; border: 1.5px dashed #0056b3; padding: 8px 16px; border-radius: 10px; font-size: 0.84rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fas fa-plus-circle"></i> Add Another Space
              </button>
            ` : ''}
            ${appState.rooms.length > 1 ? `
              <button type="button" id="btnRemoveSpace" style="background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; padding: 8px 12px; border-radius: 10px; font-size: 0.82rem; font-weight: 700; cursor: pointer;">
                <i class="fas fa-trash-can"></i> Remove Space
              </button>
            ` : ''}
          </div>
        </div>

        <!-- QUICK APPLICATION PRESET PILLS -->
        <div style="margin-bottom: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px 20px;">
          <div style="font-size: 0.76rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">
            <i class="fas fa-wand-magic-sparkles" style="color: #ef3438;"></i> Select Room Template / Real-World Use Case:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
            ${PRESETS.map(p => `
              <button type="button" class="preset-choice-pill ${p.id === active.presetId ? 'is-active' : ''}" data-apply-preset="${p.id}" style="background: ${p.id === active.presetId ? '#071526' : '#ffffff'}; color: ${p.id === active.presetId ? '#ffffff' : '#1e293b'}; border: 1.5px solid ${p.id === active.presetId ? '#071526' : '#cbd5e1'}; padding: 10px 14px; border-radius: 10px; text-align: left; cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.86rem; margin-bottom: 2px;">
                  <i class="${p.icon}" style="color: ${p.id === active.presetId ? '#ef3438' : '#0056b3'}; font-size: 0.95rem;"></i>
                  ${p.name}
                </div>
                <span style="font-size: 0.72rem; color: ${p.id === active.presetId ? '#94a3b8' : '#64748b'}; display: block;">${p.cap} Seats &bull; ${p.length}x${p.width} ft</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 2-COLUMN MAIN WORKSPACE -->
        <div class="configurator-workspace-grid">
          
          <!-- LEFT: TECHNOLOGY SELECTION & ROOM SPECS -->
          <div>
            
            <!-- ROOM DIMENSIONS & SEATING -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px 20px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 0.86rem; font-weight: 800; color: #071526; display: flex; align-items: center; gap: 8px;">
                  <i class="fas fa-ruler-combined" style="color: #ef3438;"></i> Space Dimensions &amp; Capacity
                </span>
                <span style="font-size: 0.78rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 3px 8px; border-radius: 6px;">
                  Floor Area: ${areaSqFt} sq. ft.
                </span>
              </div>

              <div class="configurator-dimensions-grid">
                <div>
                  <label style="font-size: 0.74rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px;">Length (ft)</label>
                  <input type="number" name="length" min="8" max="150" value="${active.length}" style="width: 100%; padding: 10px 8px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; font-weight: 800; color: #071526; text-align: center; background: #fff; box-sizing: border-box;">
                </div>
                <div>
                  <label style="font-size: 0.74rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px;">Width (ft)</label>
                  <input type="number" name="width" min="6" max="100" value="${active.width}" style="width: 100%; padding: 10px 8px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; font-weight: 800; color: #071526; text-align: center; background: #fff; box-sizing: border-box;">
                </div>
                <div>
                  <label style="font-size: 0.74rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px;">Height (ft)</label>
                  <input type="number" name="height" min="8" max="30" value="${active.height}" style="width: 100%; padding: 10px 8px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; font-weight: 800; color: #071526; text-align: center; background: #fff; box-sizing: border-box;">
                </div>
                <div>
                  <label style="font-size: 0.74rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px;">Seats (Pax)</label>
                  <input type="number" name="capacity" min="2" max="500" value="${active.capacity}" style="width: 100%; padding: 10px 8px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.92rem; font-weight: 800; color: #071526; text-align: center; background: #fff; box-sizing: border-box;">
                </div>
              </div>
            </div>

            <!-- TECHNOLOGY DROPDOWNS -->
            <div style="display: flex; flex-direction: column; gap: 14px;">
              
              <!-- Display Row -->
              <div class="configurator-select-pair">
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Display Technology</label>
                  <select name="display" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.displays.map(d => `<option value="${d.id}" ${d.id === active.display ? 'selected' : ''}>${d.label}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Screen Size / Diagonal</label>
                  <select name="displaySize" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.displaySizes.map(s => `<option value="${s.id}" ${s.id === active.displaySize ? 'selected' : ''}>${s.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Camera & Collaboration Platform -->
              <div class="configurator-select-pair">
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Camera Subsystem</label>
                  <select name="camera" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.cameras.map(c => `<option value="${c.id}" ${c.id === active.camera ? 'selected' : ''}>${c.label}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Meeting Standard</label>
                  <select name="platform" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.platforms.map(p => `<option value="${p.id}" ${p.id === active.platform ? 'selected' : ''}>${p.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Microphone & Speakers -->
              <div class="configurator-select-pair">
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Microphone Subsystem</label>
                  <select name="microphone" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.mics.map(m => `<option value="${m.id}" ${m.id === active.microphone ? 'selected' : ''}>${m.label}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Speaker Subsystem</label>
                  <select name="speaker" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                    ${OPTIONS.speakers.map(s => `<option value="${s.id}" ${s.id === active.speaker ? 'selected' : ''}>${s.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Budget Class -->
              <div>
                <label style="font-size: 0.78rem; font-weight: 800; color: #334155; display: block; margin-bottom: 5px;">Target Budget Tier</label>
                <select name="budgetTier" style="width: 100%; padding: 11px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.86rem; color: #0f172a; font-weight: 600; background: #f8fafc;">
                  ${OPTIONS.budgetTiers.map(b => `<option value="${b.id}" ${b.id === active.budgetTier ? 'selected' : ''}>${b.label}</option>`).join('')}
                </select>
              </div>

            </div>

            <!-- QUALITY GUARANTEE PILLS -->
            <div style="margin-top: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 0.78rem; font-weight: 700; color: #16a34a; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fas fa-circle-check"></i> DISCAS Sightline Verified
              </span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #16a34a; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fas fa-circle-check"></i> RT60 Acoustic Echo: ${roomEst.rt60.toFixed(2)}s
              </span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #16a34a; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fas fa-circle-check"></i> Dante Digital Audio Isolation
              </span>
            </div>

          </div>

          <!-- RIGHT: CONSULTANT ROADMAP & LOCKED ESTIMATE -->
          <div>
            
            <!-- PROMINENT LOCKED INVESTMENT BANNER -->
            <div style="background: linear-gradient(135deg, #071526 0%, #1e293b 100%); border: 2px solid rgba(239, 52, 56, 0.4); border-radius: 20px; padding: 24px 26px; color: #ffffff; box-shadow: 0 12px 30px rgba(7,21,38,0.25); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(239, 52, 56, 0.25); color: #ef3438; border: 1px solid #ef3438; font-size: 0.72rem; font-weight: 900; padding: 3px 8px; border-radius: 6px; letter-spacing: 0.06em; text-transform: uppercase;">🔒 INDICATIVE ESTIMATE BAND</span>
                <span style="font-size: 0.74rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">INDICATIVE AV PROJECT ESTIMATE</span>
              </div>
              <strong style="font-size: 1.25rem; font-weight: 900; color: #ffffff; letter-spacing: -0.01em; display: block; margin-bottom: 6px; line-height: 1.3;">
                WANT TO KNOW FULL TURNKEY COST &amp; ITEMIZED BOQ?
              </strong>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0 0 16px; line-height: 1.5;">
                Includes itemized OEM models (Samsung/LG, Poly, Shure, Biamp) + complete cabling, testing, commissioning &amp; 1-Year Comprehensive On-Site AMC Support.
              </p>
              <button class="btn-primary" type="button" id="btnDownloadProposal" style="width: 100%; padding: 14px 22px; font-size: 0.9rem; font-weight: 800; border-radius: 12px; box-shadow: 0 4px 16px rgba(239,52,56,0.5); text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;">
                <i class="fas fa-file-pdf"></i> DOWNLOAD FULL PROPOSAL &amp; COST PDF
              </button>
            </div>

            <!-- WHAT'S INCLUDED IN THIS ARCHITECTURE -->
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 22px 24px; box-shadow: 0 2px 14px rgba(0,0,0,0.03);">
              <h4 style="font-size: 0.96rem; font-weight: 900; color: #071526; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-layer-group" style="color: #ef3438;"></i> Recommended Architecture for ${escapeHtml(active.designation)}:
              </h4>

              <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.84rem; color: #334155; line-height: 1.45;">
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <i class="fas fa-tv" style="color: #0284c7; margin-top: 3px; font-size: 0.95rem;"></i>
                  <div><strong>Display:</strong> ${roomEst.items.find(i => i.category === 'Display Subsystem')?.item || '4K Commercial Display'}</div>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <i class="fas fa-video" style="color: #0284c7; margin-top: 3px; font-size: 0.95rem;"></i>
                  <div><strong>Camera:</strong> ${roomEst.items.find(i => i.category === 'Video Conferencing')?.item || '4K Tracking Camera'}</div>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <i class="fas fa-microphone" style="color: #0284c7; margin-top: 3px; font-size: 0.95rem;"></i>
                  <div><strong>Audio &amp; DSP:</strong> ${roomEst.items.find(i => i.category === 'Audio Subsystem')?.item || 'Ceiling Mic Array + DSP'}</div>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <i class="fas fa-server" style="color: #0284c7; margin-top: 3px; font-size: 0.95rem;"></i>
                  <div><strong>Infrastructure:</strong> Managed PoE+ Switch, Server Rack, Online Sine-Wave UPS</div>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <i class="fas fa-screwdriver-wrench" style="color: #16a34a; margin-top: 3px; font-size: 0.95rem;"></i>
                  <div><strong>Turnkey Integration:</strong> Metal Fabrication, Concealed Cabling, DSP Tuning &amp; 1-Yr AMC</div>
                </div>
              </div>

              <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b;">
                <span>Total Spaces: <strong>${appState.rooms.length} Room${appState.rooms.length > 1 ? 's' : ''}</strong></span>
                <span>Est. Power Draw: <strong>${roomEst.powerDrawWatts} Watts</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    attachConsultantEvents(container);
  }

  function attachConsultantEvents(container) {
    // Room tab switching
    container.querySelectorAll('[data-select-room]').forEach(btn => {
      btn.addEventListener('click', () => {
        appState.activeRoom = parseInt(btn.dataset.selectRoom, 10);
        renderConsultant(container);
      });
    });

    // Preset pills
    container.querySelectorAll('[data-apply-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.applyPreset;
        appState.rooms[appState.activeRoom] = createRoomFromPreset(appState.activeRoom, pId);
        renderConsultant(container);
      });
    });

    // Add space
    const btnAdd = container.querySelector('#btnAddSpace');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        if (appState.rooms.length < 6) {
          appState.rooms.push(createRoomFromPreset(appState.rooms.length, "conference"));
          appState.activeRoom = appState.rooms.length - 1;
          renderConsultant(container);
        }
      });
    }

    // Remove space
    const btnRemove = container.querySelector('#btnRemoveSpace');
    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        if (appState.rooms.length > 1) {
          appState.rooms.splice(appState.activeRoom, 1);
          appState.activeRoom = Math.max(0, appState.activeRoom - 1);
          renderConsultant(container);
        }
      });
    }

    // Input changes
    const active = appState.rooms[appState.activeRoom];
    container.querySelectorAll('select, input').forEach(input => {
      input.addEventListener('change', (e) => {
        const name = e.target.name;
        const val = e.target.value;
        if (!name) return;

        if (name === 'length' || name === 'width' || name === 'height' || name === 'capacity') {
          active[name] = Math.max(1, parseInt(val, 10) || 1);
        } else {
          active[name] = val;
        }
        renderConsultant(container);
      });
    });

    // Download Proposal PDF
    const btnPdf = container.querySelector('#btnDownloadProposal');
    if (btnPdf) {
      btnPdf.addEventListener('click', () => {
        openConsultantLeadModal();
      });
    }
  }

  /* =========================================================================
   * EXECUTIVE LEAD CAPTURE MODAL WITH STRICT 10-DIGIT PHONE VALIDATION
   * ========================================================================= */
  function openConsultantLeadModal() {
    let modal = document.getElementById('gpspl-consultant-lead-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gpspl-consultant-lead-modal';
      modal.style.cssText = 'position: fixed; inset: 0; background: rgba(7,21,38,0.78); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 999999; padding: 20px;';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="background: #ffffff; border-radius: 20px; width: 100%; max-width: 520px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.3); animation: fadeIn 0.25s ease;">
        <div style="background: linear-gradient(135deg, #071526 0%, #1e293b 100%); padding: 22px 26px; color: #ffffff; position: relative;">
          <button type="button" onclick="document.getElementById('gpspl-consultant-lead-modal').remove()" style="position: absolute; right: 18px; top: 18px; background: transparent; border: none; color: #94a3b8; font-size: 1.3rem; cursor: pointer;">&times;</button>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="background: #ef3438; color: #fff; font-size: 0.72rem; font-weight: 900; padding: 2px 8px; border-radius: 4px;">OFFICIAL PROPOSAL</span>
            <span style="font-size: 0.76rem; color: #94a3b8;">GPSPL Estd. 1997</span>
          </div>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #ffffff;">Download Itemized BOQ Proposal PDF</h3>
          <p style="margin: 4px 0 0; font-size: 0.8rem; color: #94a3b8;">Complete with OEM model numbers, pricing breakdown &amp; turnkey scope.</p>
        </div>

        <form id="consultantProposalForm" style="padding: 24px 26px;" onsubmit="handleConsultantProposalSubmit(event)">
          <div style="margin-bottom: 12px;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Your Full Name *</label>
            <input type="text" name="name" placeholder="e.g. Rahul Sharma" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" required>
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Company / Organization Name *</label>
            <input type="text" name="company" placeholder="e.g. Acme Enterprises / ABC University" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">10-Digit Mobile Number *</label>
              <input type="tel" name="phone" maxlength="10" pattern="[6-9][0-9]{9}" placeholder="98100XXXXX" oninput="this.value=this.value.replace(/\\D/g,'').slice(0,10)" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" required>
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">Official Business Email *</label>
              <input type="email" name="email" placeholder="rahul@acme.com" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" required>
            </div>
          </div>
          <div style="margin-bottom: 18px;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">City / Project Location *</label>
            <input type="text" name="city" placeholder="e.g. New Delhi / Noida / Gurugram" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;" required>
          </div>

          <button type="submit" id="btnSubmitProposalForm" style="width: 100%; background: #ef3438; color: #ffffff; border: none; padding: 13px 20px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(239,52,56,0.4);">
            <i class="fas fa-file-pdf"></i> Generate &amp; Download Proposal PDF
          </button>
        </form>
      </div>
    `;
  }

  window.handleConsultantProposalSubmit = async function(e) {
    e.preventDefault();
    const form = document.getElementById('consultantProposalForm');
    const btn = document.getElementById('btnSubmitProposalForm');
    if (!form || !btn) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Official PDF...';

    const formData = new FormData(form);
    const clientName = formData.get('name') || 'Client';
    const company = formData.get('company') || 'Organization';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const city = formData.get('city') || '';

    const roomEstimates = appState.rooms.map(r => ({
      room: r,
      estimate: calculateRoomHardware(r)
    }));

    const totalEstimateMin = roomEstimates.reduce((sum, re) => sum + re.estimate.estimateBand[0], 0);
    const totalEstimateMax = roomEstimates.reduce((sum, re) => sum + re.estimate.estimateBand[1], 0);

    const boqSummaryText = roomEstimates.map(re => {
      const r = re.room;
      const e = re.estimate;
      return `[${r.designation} - ${r.length}x${r.width}x${r.height} ft, ${r.capacity} seats]: ${formatLakhs(e.estimateBand[0])} - ${formatLakhs(e.estimateBand[1])}`;
    }).join(' \n');

    const leadData = {
      category: 'BOQ / PROJECT ESTIMATE',
      name: clientName,
      company: company,
      phone: phone,
      email: email,
      source: 'Online AV Solution Consultant & Enterprise Planner',
      details: `Location: ${city} | Spaces: ${appState.rooms.length} | Estimate: ${formatLakhs(totalEstimateMin)} - ${formatLakhs(totalEstimateMax)} | Summary: ${boqSummaryText}`,
      page: window.location.pathname
    };

    try {
      if (!window.GPSPL_LeadCapture?.dispatchLead) throw new Error('The enquiry service is unavailable. Please refresh or contact GPSPL directly.');
      await window.GPSPL_LeadCapture.dispatchLead(leadData);
    } catch (error) {
      btn.disabled = false; btn.textContent = 'Retry Project Enquiry';
      alert(error.message); return;
    }

    generateExecutiveProposalPdf({
      clientName,
      company,
      phone,
      email,
      city,
      rooms: roomEstimates,
      totalEstimateMin,
      totalEstimateMax
    });

    setTimeout(() => {
      const modal = document.getElementById('gpspl-consultant-lead-modal');
      if (modal) modal.remove();
    }, 1200);
  };

  /* =========================================================================
   * OFFICIAL PDF PROPOSAL REPORT WITH TOP LOGO & BOTTOM RIBBON ON ALL PAGES
   * ========================================================================= */
  function generateExecutiveProposalPdf(data) {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const proposalRef = 'GPSPL-AV-' + Date.now().toString().slice(-6);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>GPSPL Official Turnkey AV Proposal - ${escapeHtml(data.company)}</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background: #ffffff; color: #0f172a; line-height: 1.45; }
          @page { size: A4 portrait; margin: 0; }
          .page { width: 210mm; min-height: 297mm; padding: 18mm 16mm 24mm; position: relative; page-break-after: always; display: flex; flex-direction: column; justify-content: space-between; }
          
          .page-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0056b3; padding-bottom: 12px; margin-bottom: 16px; }
          .page-header-logo { height: 55px; object-fit: contain; }
          .page-header-title { text-align: right; }
          .page-header-title h1 { margin: 0; font-size: 14px; font-weight: 800; color: #0056b3; letter-spacing: 0.05em; text-transform: uppercase; }
          .page-header-title p { margin: 2px 0 0; font-size: 10px; color: #64748b; font-weight: 600; }

          .page-footer-ribbon { position: absolute; bottom: 0; left: 0; width: 100%; height: 20mm; object-fit: cover; }

          .meta-box { display: grid; grid-template-columns: 1.2fr 1fr; gap: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; margin-bottom: 18px; font-size: 11px; }
          .meta-col p { margin: 3px 0; }
          .meta-col strong { color: #071526; }

          .section-heading { font-size: 13px; font-weight: 800; color: #071526; text-transform: uppercase; letter-spacing: 0.05em; border-left: 4px solid #ef3438; padding-left: 8px; margin: 16px 0 10px; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10px; }
          th { background: #071526; color: #ffffff; text-align: left; padding: 7px 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
          td { border-bottom: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: top; color: #334155; }
          tr:nth-child(even) { background: #f8fafc; }
          .total-row td { font-weight: 800; background: #f1f5f9; border-top: 2px solid #cbd5e1; color: #071526; font-size: 11px; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 700; background: #e0f2fe; color: #0284c7; }
        </style>
      </head>
      <body>

        <!-- PAGE 1: EXECUTIVE SUMMARY -->
        <div class="page">
          <div>
            <div class="page-header">
              <img class="page-header-logo" src="${BRAND_ASSETS.logo}" alt="GPSPL Logo">
              <div class="page-header-title">
                <h1>GLOBAL PERIPHERAL SOLUTION PVT. LTD.</h1>
                <p>Enterprise AV Systems Integration &bull; Estd. 1997 &bull; Proposal Ref: ${proposalRef}</p>
              </div>
            </div>

            <div class="meta-box">
              <div class="meta-col">
                <p><strong>Client / Organization:</strong> ${escapeHtml(data.company)}</p>
                <p><strong>Attention:</strong> ${escapeHtml(data.clientName)}</p>
                <p><strong>Contact:</strong> ${escapeHtml(data.phone)} | ${escapeHtml(data.email)}</p>
                <p><strong>Project Location:</strong> ${escapeHtml(data.city)}</p>
              </div>
              <div class="meta-col">
                <p><strong>Date of Proposal:</strong> ${today}</p>
                <p><strong>Turnkey Integrator:</strong> Global Peripheral Solution Pvt. Ltd.</p>
                <p><strong>OEM Brand Coverage:</strong> Samsung, LG, Harman, Poly, Shure, Biamp</p>
                <p><strong>Total Spaces Configured:</strong> ${data.rooms.length} Room${data.rooms.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            <div class="section-heading">1. Project Architecture &amp; Room-wise Sizing Summary</div>
            <table>
              <thead>
                <tr>
                  <th>Space Designation</th>
                  <th>Dimensions (L x W x H)</th>
                  <th>Capacity</th>
                  <th>Display Technology</th>
                  <th>Audio / Mic Setup</th>
                  <th>Estimated Investment</th>
                </tr>
              </thead>
              <tbody>
                ${data.rooms.map(re => `
                  <tr>
                    <td><strong>${escapeHtml(re.room.designation)}</strong></td>
                    <td>${re.room.length} x ${re.room.width} x ${re.room.height} ft (${re.room.length * re.room.width} sq.ft)</td>
                    <td>${re.room.capacity} Seats</td>
                    <td>${re.room.displaySize}" ${re.room.display === 'led' ? 'Active LED Wall' : re.room.display === 'interactive' ? 'Interactive 4K Panel' : 'Commercial 4K Display'}</td>
                    <td>${re.room.microphone === 'ceiling' ? 'Ceiling Array + DSP' : 'Video Bar Mic Array'}</td>
                    <td style="font-weight: 800; color: #0056b3;">${formatLakhs(re.estimate.estimateBand[0])} - ${formatLakhs(re.estimate.estimateBand[1])}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="5" style="text-align: right;">TOTAL ESTIMATED TURNKEY INVESTMENT (GST INCL.):</td>
                  <td style="color: #ef3438; font-size: 12px;">${formatLakhs(data.totalEstimateMin)} - ${formatLakhs(data.totalEstimateMax)}</td>
                </tr>
              </tbody>
            </table>

            <div class="section-heading">2. Engineering Compliance &amp; Standards Verified</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 10px; margin-bottom: 14px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
                <strong>&bull; AVIXA DISCAS Sightline Compliance:</strong> Display sizes calculated to ensure 100% legibility from furthest seat distance.
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
                <strong>&bull; Acoustic Echo Cancellation (AEC):</strong> DSP algorithms tuned to eliminate echo on Microsoft Teams / Zoom calls.
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
                <strong>&bull; Network &amp; Dante Isolation:</strong> Separate VLAN bandwidth allocated for ultra-low latency uncompressed digital audio.
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
                <strong>&bull; Power &amp; Thermal Load Sizing:</strong> Online pure sine wave UPS included to isolate sensitive AV electronics from voltage spikes.
              </div>
            </div>

          </div>

          <img class="page-footer-ribbon" src="${BRAND_ASSETS.ribbon}" alt="GPSPL Official Ribbon">
        </div>

        <!-- PAGE 2+: ITEMIZED BOQ SCHEDULES -->
        ${data.rooms.map((re, rIdx) => `
          <div class="page">
            <div>
              <div class="page-header">
                <img class="page-header-logo" src="${BRAND_ASSETS.logo}" alt="GPSPL Logo">
                <div class="page-header-title">
                  <h1>ITEMIZED EQUIPMENT SCHEDULE: ${escapeHtml(re.room.designation.toUpperCase())}</h1>
                  <p>Proposal Ref: ${proposalRef} &bull; Page ${rIdx + 2} of ${data.rooms.length + 1}</p>
                </div>
              </div>

              <div class="section-heading">Detailed Bill of Quantities (BOQ) &amp; OEM Brand Specifications</div>
              <table>
                <thead>
                  <tr>
                    <th style="width: 20%;">Category</th>
                    <th style="width: 45%;">Equipment Description &amp; Technical Specifications</th>
                    <th style="width: 20%;">Approved OEM Brands</th>
                    <th style="width: 15%;">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  ${re.estimate.items.map(i => `
                    <tr>
                      <td><span class="badge">${escapeHtml(i.category)}</span></td>
                      <td>
                        <strong>${escapeHtml(i.item)}</strong><br>
                        <span style="color: #64748b; font-size: 9px;">${escapeHtml(i.specs)}</span>
                      </td>
                      <td><strong>${escapeHtml(i.brand)}</strong></td>
                      <td style="text-align: center; font-weight: 800;">${i.qty}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="section-heading">Turnkey Scope of Work &amp; Delivery Commitments</div>
              <div style="font-size: 10px; color: #475569; line-height: 1.5; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
                <p style="margin: 0 0 6px;"><strong>1. Supply &amp; Delivery:</strong> Brand new, factory-sealed hardware with official OEM manufacturer warranty certificates.</p>
                <p style="margin: 0 0 6px;"><strong>2. Physical Installation:</strong> Heavy-duty wall mounting, ceiling structural anchors, concealed conduit cable laying, rack dressing.</p>
                <p style="margin: 0 0 6px;"><strong>3. System Testing &amp; Commissioning:</strong> Firmware updates, DSP acoustic echo calibration, camera auto-tracking tuning, Teams/Zoom rooms certification.</p>
                <p style="margin: 0;"><strong>4. Handover &amp; Support:</strong> Complete as-built wiring schematic drawings, admin/user training session, and 1-Year Comprehensive On-Site AMC Support by GPSPL engineers.</p>
              </div>

            </div>

            <img class="page-footer-ribbon" src="${BRAND_ASSETS.ribbon}" alt="GPSPL Official Ribbon">
          </div>
        `).join('')}

      </body>
      </html>
    `;

    const printWin = window.open('', '_blank', 'width=900,height=800');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(htmlContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
      }, 750);
    }
  }

  /* =========================================================================
   * DISTRIBUTION FORM HANDLER (Connected directly to sales email & Resend)
   * ========================================================================= */
  window.handleDistributionFormSubmit = async function(e) {
    e.preventDefault();
    const form = document.getElementById('distributionSupplyForm');
    const btn = document.getElementById('btnSubmitDistForm');
    if (!form || !btn) return;

    const formData = new FormData(form);
    const inqType = formData.get('inquiry_type') || 'Distribution';
    const name = formData.get('name') || 'Customer';
    const company = formData.get('company') || 'Dealership';
    const phone = (formData.get('phone') || '').replace(/\D/g, '').slice(-10);
    const email = formData.get('email') || '';
    const req = formData.get('product_requirement') || '';

    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      const pInput = form.querySelector('input[name="phone"]');
      if (pInput) pInput.focus();
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';

    const leadData = {
      name: name,
      email: email,
      phone: phone,
      company: company,
      requirement: 'WHOLESALE & DISTRIBUTION: ' + inqType,
      message: 'B2B Wholesale / Project Supply Request:\n' +
               '• Inquiry Type: ' + inqType + '\n' +
               '• Contact Name: ' + name + '\n' +
               '• Company / Dealership: ' + company + '\n' +
               '• Phone: ' + phone + '\n' +
               '• Email: ' + email + '\n' +
               '• Required Products / Brands: ' + req,
      lead_source: 'Homepage Distribution Supply Desk (' + inqType + ')'
    };

    // 1. Direct Serverless Dispatch
    const timeToken = (function() {
      try {
        return btoa(JSON.stringify({ t: Date.now() - 3500, r: Math.random().toString(36).slice(2, 8) }));
      } catch(err) { return ''; }
    })();

    try {
      const response = await fetch('/.netlify/functions/submit-enquiry', {
        method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attribution: window.gpsplLeadAttribution?.() || {}, ...leadData, email: /^inquiry[-@]/.test(leadData.email || '') ? '' : leadData.email,
          form_time_token: timeToken, 'cf-turnstile-response': new FormData(form).get('cf-turnstile-response') || '' })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true || data.skipped || data.status === 'queued') {
        throw new Error('Your enquiry delivery was not confirmed. Please retry, call +91 89208 30377 or use WhatsApp.');
      }
      document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: form.id, lead_id: data.leadId || "", is_duplicate: data.isDuplicate === true } }));
    } catch (error) {
      const retryButton = form.querySelector('[type="submit"]');
      if (retryButton) retryButton.disabled = false;
      alert('Your enquiry delivery was not confirmed. Your details are still in the form. Please retry, call +91 89208 30377 or use WhatsApp.');
      document.dispatchEvent(new CustomEvent('gpspl:lead-form-error', { detail: { form_name: form.id } }));
      return;
    }

    // 2. Backup to localStorage
    try {
      const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
      history.unshift({
        id: 'DIST-' + Date.now().toString().slice(-6),
        category: 'WHOLESALE_DISTRIBUTION',
        date_time: new Date().toLocaleString('en-IN'),
        name: name,
        company: company,
        phone: phone,
        email: email,
        details: leadData.message
      });
      localStorage.setItem('gpspl_captured_leads', JSON.stringify(history));
    } catch(e) {}

    const waMsg = encodeURIComponent(
      `Hello GPSPL Wholesale Distribution Desk,\n\nI just submitted a Wholesale Supply Inquiry:\n• Type: ${inqType}\n• Name: ${name} (${company})\n• Phone: ${phone}\n• Products: ${req}\n\nPlease share authorized dealer tier pricing and stock availability.`
    );

    form.parentElement.innerHTML = `
      <div style="background: #f0fdf4; border: 1.5px solid #22c55e; border-radius: 14px; padding: 24px; text-align: center; color: #166534;">
        <div style="font-size: 1.3rem; font-weight: 900; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fas fa-check-circle" style="color: #22c55e;"></i> Wholesale Inquiry Received!
        </div>
        <p style="font-size: 0.9rem; line-height: 1.5; margin: 0 0 16px; color: #15803d;">
          Thank you <strong>${escapeHtml(name)}</strong>. Our Distribution &amp; Commercial Sales Desk has received your request. An authorized quote with dealer discount tiers will be emailed to <strong>${escapeHtml(email || phone)}</strong> shortly.
        </p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/918920830377?text=${waMsg}" target="_blank" rel="noopener noreferrer" style="background: #22c55e; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 0.86rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(34,197,94,0.3);">
            <i class="fab fa-whatsapp"></i> Instant WhatsApp Fast-Track
          </a>
          <a href="tel:+918920830377" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 0.86rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fas fa-phone"></i> Call Distribution Manager (+91 8920830377)
          </a>
        </div>
      </div>
    `;
  };

  /* =========================================================================
   * 1-STEP EXPRESS FAST QUOTE HANDLER (15-Minute Priority Callback)
   * ========================================================================= */
  window.enableFastQuoteCustomReq = function(enable) {
    const wrap = document.getElementById('fqCustomWrap');
    const sel = document.getElementById('fqService');
    const input = document.getElementById('fqCustom');
    if (!wrap || !sel || !input) return;

    if (enable === true || sel.value === 'CUSTOM_OTHER') {
      wrap.style.display = 'flex';
      if (sel.value !== 'CUSTOM_OTHER') {
        sel.value = 'CUSTOM_OTHER';
      }
      setTimeout(() => {
        input.focus();
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.2)';
      }, 60);
    } else {
      wrap.style.display = 'none';
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }
  };

  window.handleFastQuoteSubmit = async function(e) {
    e.preventDefault();
    const form = document.getElementById('fastQuoteForm');
    const btn = document.getElementById('btnFastQuote');
    const successBox = document.getElementById('fastQuoteSuccess');
    const waBtn = document.getElementById('fastQuoteWaBtn');
    if (!form || !btn) return;

    const name = (document.getElementById('fqName') ? document.getElementById('fqName').value.trim() : '') || 'Valued Client';
    const phone = (document.getElementById('fqPhone') ? document.getElementById('fqPhone').value.trim().replace(/\D/g, '').slice(-10) : '');
    const serviceSel = document.getElementById('fqService');
    const serviceVal = (serviceSel ? serviceSel.value : '') || 'Commercial AV Solution';
    const customInput = document.getElementById('fqCustom');
    const customVal = customInput ? customInput.value.trim() : '';

    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      const pInput = document.getElementById('fqPhone');
      if (pInput) pInput.focus();
      return;
    }

    let service = serviceVal;
    if (serviceVal === 'CUSTOM_OTHER' || !serviceVal) {
      if (!customVal) {
        window.enableFastQuoteCustomReq(true);
        if (customInput) {
          customInput.focus();
          customInput.placeholder = 'Please type your custom requirement here...';
        }
        return;
      }
      service = customVal;
    } else if (customVal) {
      service = `${serviceVal} (${customVal})`;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    const refNo = 'GPSPL/EXPRESS/' + Math.floor(100000 + Math.random() * 900000);
    const leadData = {
      name: name,
      email: 'inquiry-' + phone + '@gpspl.co.in',
      phone: phone,
      company: 'Express Client Inquiry',
      requirement: service,
      message: '1-Step Express Fast Quote Request:\n' +
               '• Reference: ' + refNo + '\n' +
               '• Client Name: ' + name + '\n' +
               '• Mobile Number: ' + phone + '\n' +
               '• Selected Solution: ' + service + '\n' +
               '• Priority: High / Immediate 15-Min Callback Requested',
      lead_source: 'Homepage 1-Step Express Quote Bar (' + service + ')'
    };

    const timeToken = (function() {
      try {
        return btoa(JSON.stringify({ t: Date.now() - 3500, r: Math.random().toString(36).slice(2, 8) }));
      } catch(err) { return ''; }
    })();

    try {
      const response = await fetch('/.netlify/functions/submit-enquiry', {
        method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attribution: window.gpsplLeadAttribution?.() || {}, ...leadData, email: /^inquiry[-@]/.test(leadData.email || '') ? '' : leadData.email,
          form_time_token: timeToken, 'cf-turnstile-response': new FormData(form).get('cf-turnstile-response') || '' })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true || data.skipped || data.status === 'queued') {
        throw new Error('Your enquiry delivery was not confirmed. Please retry, call +91 89208 30377 or use WhatsApp.');
      }
      document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: form.id, lead_id: data.leadId || "", is_duplicate: data.isDuplicate === true } }));
    } catch (error) {
      const retryButton = form.querySelector('[type="submit"]');
      if (retryButton) retryButton.disabled = false;
      alert('Your enquiry delivery was not confirmed. Your details are still in the form. Please retry, call +91 89208 30377 or use WhatsApp.');
      document.dispatchEvent(new CustomEvent('gpspl:lead-form-error', { detail: { form_name: form.id } }));
      return;
    }

    // Backup to localStorage
    try {
      const history = JSON.parse(localStorage.getItem('gpspl_captured_leads') || '[]');
      history.unshift({
        id: refNo,
        category: 'EXPRESS_FAST_QUOTE',
        date_time: new Date().toLocaleString('en-IN'),
        name: name,
        phone: phone,
        service: service,
        details: leadData.message
      });
      localStorage.setItem('gpspl_captured_leads', JSON.stringify(history.slice(0, 20)));
    } catch(e) {}

    const waMsg = encodeURIComponent(
      `Hello GPSPL AV Engineering Team,\n\nI just requested a 1-Step Express Quote on your website:\n• Ref: ${refNo}\n• Name: ${name}\n• Mobile: ${phone}\n• Solution: ${service}\n\nPlease share the indicative BOQ pricing and schedule a quick 10-minute discovery call.`
    );

    if (waBtn) {
      waBtn.href = 'https://wa.me/918920830377?text=' + waMsg;
    }

    form.style.display = 'none';
    if (successBox) {
      successBox.style.display = 'flex';
    }

    // Auto-launch WhatsApp without popup block
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const waFinalUrl = 'https://wa.me/918920830377?text=' + waMsg;
    if (isMobile) {
      window.location.href = waFinalUrl;
    } else {
      window.open(waFinalUrl, '_blank');
    }
  };

  /* =========================================================================
   * INITIALIZE ON PAGE LOAD
   * ========================================================================= */
  function initRoomConsultant() {
    const container = document.querySelector('[data-configurator-app]');
    if (container) {
      renderConsultant(container);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoomConsultant);
  } else {
    initRoomConsultant();
  }

  window.gpsplInitRoomConsultant = initRoomConsultant;

})();
