(function () {
  "use strict";

  // Product Library & Extended Metadata
  const ProductLibrary = {
    displayCommercial: {
      weight: 35, // kg
      power: 180, // Watts
      idlePower: 15,
      analogInputs: 1,
      digitalInputs: 3,
      controlProtocols: ["RS232", "IP", "CEC"],
      poeClass: 0,
      voltage: 230,
      btu: 180 * 3.412,
      signals: ["HDMI", "VGA"]
    },
    displayInteractive: {
      weight: 65,
      power: 350,
      idlePower: 25,
      analogInputs: 1,
      digitalInputs: 4,
      controlProtocols: ["RS232", "IP", "USB"],
      poeClass: 0,
      voltage: 230,
      btu: 350 * 3.412,
      signals: ["HDMI", "USB"]
    },
    displayProjector: {
      weight: 18,
      power: 420,
      idlePower: 10,
      analogInputs: 1,
      digitalInputs: 2,
      controlProtocols: ["RS232", "IP", "Trigger"],
      poeClass: 0,
      voltage: 230,
      btu: 420 * 3.412,
      signals: ["HDMI", "VGA"]
    },
    displayLed: {
      weight: 150,
      power: 1200,
      idlePower: 80,
      analogInputs: 0,
      digitalInputs: 4,
      controlProtocols: ["IP", "USB"],
      poeClass: 0,
      voltage: 230,
      btu: 1200 * 3.412,
      signals: ["HDMI", "DVI"]
    },
    cameraUsb: {
      weight: 1.5,
      power: 10,
      idlePower: 2,
      poeClass: 0,
      voltage: 5,
      btu: 10 * 3.412,
      signals: ["USB"],
      controlProtocols: ["USB"]
    },
    cameraAi: {
      weight: 3.8,
      power: 35,
      idlePower: 5,
      poeClass: 3,
      voltage: 48,
      btu: 35 * 3.412,
      signals: ["IP", "HDMI"],
      controlProtocols: ["IP"]
    },
    cameraPtz: {
      weight: 4.5,
      power: 45,
      idlePower: 6,
      poeClass: 4,
      voltage: 48,
      btu: 45 * 3.412,
      signals: ["IP", "HDMI", "SDI"],
      controlProtocols: ["IP", "RS232"]
    },
    cameraMulti: {
      weight: 12,
      power: 120,
      idlePower: 15,
      poeClass: 4,
      voltage: 48,
      btu: 120 * 3.412,
      signals: ["IP", "HDMI"],
      controlProtocols: ["IP"]
    },
    micTable: {
      weight: 0.8,
      power: 5,
      idlePower: 1,
      poeClass: 0,
      voltage: 48,
      btu: 5 * 3.412,
      signals: ["Analog-Mic"]
    },
    micCeiling: {
      weight: 3.5,
      power: 15,
      idlePower: 3,
      poeClass: 3,
      voltage: 48,
      btu: 15 * 3.412,
      signals: ["Dante", "Analog-Line"],
      protocols: ["Dante", "AES67"]
    },
    micWireless: {
      weight: 2.2,
      power: 25,
      idlePower: 8,
      poeClass: 0,
      voltage: 12,
      btu: 25 * 3.412,
      signals: ["Analog-Line"]
    },
    speakerSoundbar: {
      weight: 6.5,
      power: 80,
      idlePower: 8,
      poeClass: 0,
      voltage: 230,
      btu: 80 * 3.412,
      signals: ["Analog-Line", "HDMI-ARC"]
    },
    speakerCeiling: {
      weight: 2.5,
      power: 35,
      impedance: 8,
      signals: ["Speaker-Level"]
    },
    speakerWall: {
      weight: 4.8,
      power: 60,
      impedance: 8,
      signals: ["Speaker-Level"]
    },
    speakerPa: {
      weight: 22,
      power: 180,
      impedance: 8,
      signals: ["Speaker-Level"]
    },
    dsp: {
      weight: 4.2,
      power: 60,
      idlePower: 20,
      voltage: 230,
      btu: 60 * 3.412,
      analogInputs: 12,
      analogOutputs: 8,
      danteChannels: 64,
      aecChannels: 12,
      gpioPorts: 8,
      protocols: ["Dante", "AES67", "AVB"]
    },
    amplifier: {
      weight: 8.5,
      power: 450,
      idlePower: 45,
      voltage: 230,
      btu: 450 * 3.412,
      channels: 4,
      wattsPerChannel: 150,
      supportedImpedance: [4, 8, 70, 100]
    },
    scheduler: {
      weight: 0.6,
      power: 12,
      idlePower: 2,
      poeClass: 2,
      voltage: 48,
      btu: 12 * 3.412,
      protocols: ["IP"]
    },
    controller: {
      weight: 1.2,
      power: 20,
      idlePower: 5,
      poeClass: 3,
      voltage: 48,
      btu: 20 * 3.412,
      serialPorts: 2,
      irPorts: 4,
      gpioPorts: 4,
      relayPorts: 4,
      protocols: ["IP", "RS232", "IR", "GPIO"]
    },
    rack: {
      weight: 38,
      capacityRU: 24,
      depth: 600
    },
    ups: {
      weight: 15,
      capacityVA: 1500,
      wattHour: 180
    },
    networkSwitch: {
      weight: 3.2,
      power: 250,
      poeBudget: 190,
      ports: 24,
      uplinkBandwidth: 10000,
      protocols: ["IP", "Dante", "AES67", "AVB"]
    }
  };

const CONFIG = {
    phone: "919310092963",
    maxRooms: 12,
    gstRate: 0.18,
    rooms: [
      { id: "conference", label: "Conference Room", capacity: 10, length: 24, width: 16, height: 10, timeline: 7 },
      { id: "boardroom", label: "Boardroom", capacity: 14, length: 32, width: 18, height: 10, timeline: 10 },
      { id: "huddle", label: "Huddle Room", capacity: 4, length: 12, width: 10, height: 9, timeline: 4 },
      { id: "training", label: "Training Room", capacity: 28, length: 42, width: 26, height: 11, timeline: 14 },
      { id: "classroom", label: "Smart Classroom", capacity: 35, length: 38, width: 24, height: 11, timeline: 14 },
      { id: "executive", label: "Executive Room", capacity: 8, length: 20, width: 14, height: 10, timeline: 7 },
      { id: "auditorium", label: "Auditorium / Seminar Hall", capacity: 80, length: 70, width: 45, height: 16, timeline: 24 },
      { id: "server", label: "Server Room", capacity: 2, length: 14, width: 12, height: 10, timeline: 10 },
      { id: "reception", label: "Reception Area", capacity: 4, length: 18, width: 14, height: 10, timeline: 7 }
    ],
    purposes: [
      { id: "meeting", label: "Meetings / Video Calls", roomType: "conference", display: "commercial", camera: "ai", microphone: "ceiling", speaker: "ceiling", schedulerQty: 1, controllerQty: 1, help: "For daily calls, presentations and hybrid meetings." },
      { id: "boardroom", label: "Boardroom / Leadership", roomType: "boardroom", display: "dual", camera: "ptz", microphone: "ceiling", speaker: "ceiling", schedulerQty: 1, controllerQty: 1, help: "For premium meetings, presentations and visitor discussions." },
      { id: "training", label: "Training / Classroom", roomType: "training", display: "interactive", camera: "ptz", microphone: "ceiling", speaker: "ceiling", schedulerQty: 0, controllerQty: 1, help: "For teaching, workshops, lectures and content sharing." },
      { id: "huddle", label: "Huddle Room", roomType: "huddle", display: "commercial", camera: "ai", microphone: "table", speaker: "soundbar", schedulerQty: 0, controllerQty: 0, help: "For compact teams that need quick calls and screen sharing." },
      { id: "seminar", label: "Seminar / Auditorium", roomType: "auditorium", display: "projector", camera: "ptz", microphone: "wireless", speaker: "pa", schedulerQty: 0, controllerQty: 1, help: "For large audience speech, events and stage-style sessions." },
      { id: "signage", label: "Digital Signage", roomType: "executive", display: "commercial", camera: "none", microphone: "none", speaker: "soundbar", schedulerQty: 0, controllerQty: 0, help: "For reception, notices, menus, wayfinding and branded screens." },
      { id: "server", label: "Server Room", roomType: "server", display: "none", camera: "none", microphone: "none", speaker: "none", schedulerQty: 0, controllerQty: 1, rackQty: 2, upsQty: 2, networkQty: 1, cctvQty: 1, help: "For racks, control devices, network switching, UPS and monitoring." },
      { id: "reception", label: "Reception Area", roomType: "reception", display: "commercial", camera: "none", microphone: "none", speaker: "soundbar", schedulerQty: 0, controllerQty: 0, laptopQty: 1, desktopQty: 1, cctvQty: 2, help: "For front desk display, visitor work device and CCTV coverage." },
      { id: "not-sure", label: "Not sure - GPSPL helper", roomType: "conference", display: "commercial", camera: "ai", microphone: "ceiling", speaker: "ceiling", schedulerQty: 1, controllerQty: 1, help: "Use the helper below if you only know the room role. GPSPL will pick a practical starting setup." }
    ],
    platforms: [
      { id: "teams", label: "Microsoft Teams" },
      { id: "zoom", label: "Zoom Rooms" },
      { id: "meet", label: "Google Meet" },
      { id: "byod", label: "BYOD" },
      { id: "hybrid", label: "Hybrid / Flexible" }
    ],
    displays: [
      { id: "commercial", label: "Commercial Display" },
      { id: "interactive", label: "Interactive Display" },
      { id: "dual", label: "Dual Display" },
      { id: "projector", label: "Projector + Screen" },
      { id: "led", label: "Active LED Wall" },
      { id: "none", label: "No Display Required" }
    ],
    displaySizes: [
      { id: "43", label: "43 inch - Small huddle / signage" },
      { id: "55", label: "55 inch - Huddle room" },
      { id: "65", label: "65 inch - Small meeting room" },
      { id: "75", label: "75 inch - Meeting room" },
      { id: "86", label: "86 inch - Boardroom / conference" },
      { id: "98", label: "98 inch - Large boardroom / training" },
      { id: "110", label: "110 inch - Executive boardroom" },
      { id: "130", label: "130 inch - Small LED wall" },
      { id: "136", label: "136 inch - Standard LED wall" },
      { id: "150", label: "150 inch - Large meeting / training LED" },
      { id: "165", label: "165 inch - Premium training room" },
      { id: "180", label: "180 inch - Auditorium / seminar" },
      { id: "200", label: "200 inch - Medium auditorium" },
      { id: "220", label: "220 inch - Large auditorium" },
      { id: "250", label: "250 inch - University hall" },
      { id: "300", label: "300 inch - Convention / large auditorium" },
      { id: "330", label: "330 inch - Premium large venue" }
    ],
    speakers: [
      { id: "soundbar", label: "Soundbar" },
      { id: "ceiling", label: "Ceiling Speakers" },
      { id: "wall", label: "Wall Mounted Speakers" },
      { id: "pa", label: "PA / Auditorium Speakers" },
      { id: "none", label: "No Speakers Required" }
    ],
    microphones: [
      { id: "table", label: "Table Microphones" },
      { id: "ceiling", label: "Ceiling Microphones" },
      { id: "wireless", label: "Wireless Microphones" },
      { id: "none", label: "No Mic Required" }
    ],
    cameras: [
      { id: "usb", label: "USB Camera" },
      { id: "ai", label: "AI Bar / AI Camera" },
      { id: "ptz", label: "PTZ Camera" },
      { id: "multi", label: "Multi Camera" },
      { id: "none", label: "No Camera" }
    ],
    unitBands: {
      displayCommercial: [65000, 125000],
      displayInteractive: [150000, 280000],
      displayProjector: [130000, 300000],
      displayLed: [700000, 1800000],
      cameraUsb: [28000, 65000],
      cameraAi: [65000, 135000],
      cameraPtz: [120000, 280000],
      cameraMulti: [220000, 520000],
      micTable: [18000, 45000],
      micCeiling: [45000, 105000],
      micWireless: [28000, 75000],
      speakerSoundbar: [45000, 115000],
      speakerCeiling: [8000, 18000],
      speakerWall: [16000, 38000],
      speakerPa: [65000, 180000],
      dsp: [65000, 155000],
      amplifier: [45000, 125000],
      scheduler: [25000, 55000],
      controller: [45000, 110000],
      rack: [22000, 52000],
      ups: [18000, 48000],
      laptop: [45000, 95000],
      desktop: [50000, 115000],
      cctv: [8500, 28000],
      networkSwitch: [18000, 85000],
      cables: [25000, 68000],
      installation: [35000, 85000],
      programming: [25000, 65000]
    },
    labourRates: {
      technicianDay: [18000, 42000],
      engineerHour: [3500, 8500]
    }
  };

  const defaultRoom = {
    designation: "Conference Room",
    purpose: "meeting",
    roomType: "conference",
    autoCapacity: true,
    capacity: 10,
    length: 24,
    width: 16,
    height: 10,
    platform: "teams",
    display: "commercial",
    displaySize: undefined,
    displayQty: 1,
    camera: "ai",
    cameraQty: 1,
    microphone: "ceiling",
    micQty: 1,
    speaker: "ceiling",
    speakerQty: 4,
    schedulerQty: 1,
    controllerQty: 1,
    dspQty: 1,
    rackQty: 1,
    upsQty: 1,
    laptopQty: 0,
    desktopQty: 0,
    cctvQty: 0,
    networkQty: 0,
    budgetTier: "standard",
    manualOverrides: {}
  };

  function createRoom(index, source) {
    const preset = CONFIG.rooms[index % Math.min(CONFIG.rooms.length, 4)] || CONFIG.rooms[0];
    const base = Object.assign({}, defaultRoom, source || {});
    base.roomType = source && source.roomType ? source.roomType : preset.id;
    base.designation = source && source.designation ? source.designation : preset.label;
    base.purpose = source && source.purpose ? source.purpose : purposeForRoomType(base.roomType);
    base.capacity = source && source.capacity ? source.capacity : preset.capacity;
    base.length = source && source.length ? source.length : preset.length;
    base.width = source && source.width ? source.width : preset.width;
    base.height = source && source.height ? source.height : preset.height;
    return autoTuneRoom(base);
  }

  function purposePreset(id) {
    return CONFIG.purposes.find((entry) => entry.id === id) || CONFIG.purposes[0];
  }

  function purposeForRoomType(roomType) {
    const map = {
      conference: "meeting",
      boardroom: "boardroom",
      huddle: "huddle",
      classroom: "classroom",
      training: "meeting",
      auditorium: "seminar",
      reception: "reception",
      server: "server"
    };
    return map[roomType] || "meeting";
  }


  function manualMap(room) {
    return Object.assign({}, room.manualOverrides || {});
  }

  function markSource(item, room, fields) {
    const manual = manualMap(room);
    const isManual = fields.some((field) => manual[field]);
    item.source = isManual ? "Client selected" : "GPSPL recommended";
    return item;
  }

  function guidedRoleItems() {
    return [
      { id: "meeting", label: "Conference / Meeting", note: "For regular meetings and video calls" },
      { id: "boardroom", label: "Boardroom", note: "For leadership meetings and premium VC" },
      { id: "training", label: "Training / Classroom", note: "For teaching, workshops and sessions" },
      { id: "huddle", label: "Small Team Room", note: "For quick calls and small teams" },
      { id: "seminar", label: "Seminar / Auditorium", note: "For large audience events" },
      { id: "server", label: "Server Room", note: "For racks, controls, network and UPS" },
      { id: "reception", label: "Reception Area", note: "For front desk display, IT devices and CCTV" },
      { id: "signage", label: "Digital Signage", note: "For display-only information screens" },
      { id: "not-sure", label: "Not Sure", note: "Let GPSPL suggest a practical setup" }
    ];
  }

  function guidedWorkflowItems() {
    return [
      { id: "teams", label: "Teams / Zoom Room", note: "Dedicated meeting workflow" },
      { id: "byod", label: "BYOD", note: "Users bring their laptop" },
      { id: "hybrid", label: "Hybrid", note: "Flexible meetings and presentations" },
      { id: "meet", label: "Google Meet", note: "Google workspace calls" }
    ];
  }

  function guidedRecommendation(room, roleId, workflowId, designation) {
    const base = applyPurpose(room, roleId || "not-sure");
    const next = Object.assign({}, base, {
      designation: designation && designation.trim() ? designation.trim() : base.designation,
      platform: workflowId || base.platform
    });

    if (workflowId === "byod") {
      next.controllerQty = 0;
      if (next.camera === "ptz" && next.roomType !== "auditorium") next.camera = "ai";
    }

    if (workflowId === "hybrid" && next.camera === "usb") next.camera = "ai";
    return autoTuneRoom(next);
  }

  function simpleComponent(item) {
    const map = {
      Display: item.shortLabel || "Display screen",
      "Video Processing": "LED processor setup",
      Camera: "Video meeting camera",
      Microphone: "Voice pickup",
      Speaker: "Room sound",
      "Audio Processing": "Audio clarity processor",
      Amplification: "Amplifier capacity",
      "Mixer / Matrix": "Audio routing",
      "Room Booking": "Room scheduler",
      Control: "Touch control",
      Infrastructure: "Mounting / rack",
      Power: "Power backup",
      "IT Devices": item.component.includes("Laptop") ? "Business laptop" : "Business desktop",
      CCTV: "CCTV camera",
      Network: "Network switch",
      Cabling: "Cabling",
      Services: item.component.includes("Programming") ? "Setup & training" : "Installation"
    };
    return map[item.category] || item.category;
  }

  function customerWhy(item) {
    if (item.serviceScope) return item.serviceScope.summary;
    const map = {
      Display: item.reason || "For clear content visibility.",
      "Video Processing": "Maps LED/projection inputs, scaling, resolution and content source workflow.",
      Camera: "For remote meeting participants.",
      Microphone: "For clear voice pickup.",
      Speaker: "For clear room audio.",
      "Audio Processing": "Keeps speech clear and reduces echo.",
      Amplification: "Powers speakers as per room size.",
      "Mixer / Matrix": "Routes audio sources cleanly.",
      "Room Booking": "Shows booking status outside the room.",
      Control: "One-touch meeting start and source control.",
      Infrastructure: "Keeps equipment mounted and managed.",
      Power: "Protects equipment and supports uptime.",
      "IT Devices": "For reception, operator or user workstation.",
      CCTV: "For entry, reception or server-room monitoring.",
      Network: "Connects rack, control, CCTV and endpoint devices.",
      Cabling: "Connects display, audio, control and power.",
      Services: "Covers installation, testing and handover."
    };
    return map[item.category] || item.note;
  }

  function customerGroup(item) {
    const map = {
      Display: "Visuals",
      "Video Processing": "Display Setup",
      Camera: "Video Call",
      Microphone: "Voice",
      Speaker: "Sound",
      "Audio Processing": "Sound Quality",
      Amplification: "Sound Power",
      "Mixer / Matrix": "Sound Control",
      "Room Booking": "Booking",
      Control: "Easy Use",
      Infrastructure: "Mounting",
      Power: "Protection",
      "IT Devices": "IT Device",
      CCTV: "Security",
      Network: "Network",
      Cabling: "Wiring",
      Services: "Setup"
    };
    return map[item.category] || item.category;
  }

  function itemQuantityLabel(item) {
    if (!item.serviceScope) return `Qty ${item.qty}`;
    return `${item.serviceScope.labourLevel} | ${item.serviceScope.technicianDays} technician-days + ${item.serviceScope.engineerDays} engineer-days | ${item.serviceScope.complexity} complexity`;
  }

  function planChipLabel(item) {
    if (!item.serviceScope) return `${escapeHtml(item.qty)} qty - ${escapeHtml(sourceLabel(item))}`;
    return `${escapeHtml(item.serviceScope.labourLevel)} - ${escapeHtml(item.serviceScope.technicianDays)} tech + ${escapeHtml(item.serviceScope.engineerDays)} eng days`;
  }

  function planQuantityValue(item) {
    if (!item.serviceScope) return `${item.qty} qty`;
    return `${item.serviceScope.labourLevel}: ${item.serviceScope.technicianDays} tech + ${item.serviceScope.engineerDays} eng days`;
  }

  function serviceScopeHtml(item) {
    if (!item.serviceScope) return "";
    return `
      <ul class="av-service-scope-list">
        ${item.serviceScope.activities.map((activity) => `<li>${escapeHtml(activity)}</li>`).join("")}
      </ul>
      <div class="av-service-meta">
        <span>Labour: <b>${escapeHtml(item.serviceScope.labourLevel)}</b></span>
        <span>Technicians: <b>${escapeHtml(item.serviceScope.technicianDays)} days</b></span>
        <span>Engineering: <b>${escapeHtml(item.serviceScope.engineerDays)} days</b></span>
        <span>Complexity: <b>${escapeHtml(item.serviceScope.complexity)}</b></span>
      </div>
    `;
  }

  function pdfQuantityLabel(item) {
    if (!item.serviceScope) return item.qty;
    return `${item.serviceScope.technicianDays} technician-days + ${item.serviceScope.engineerDays} engineer-days`;
  }

  function pdfNote(item) {
    if (!item.serviceScope) return item.note || item.reason || "";
    return `${item.serviceScope.summary} ${item.serviceScope.programming.summary} Activities: ${item.serviceScope.activities.join(", ")}. Labour Level: ${item.serviceScope.labourLevel}. Engineering Complexity: ${item.serviceScope.complexity}.`;
  }

  function displayKey(room) {
    if (room.display === "none") return null;
    if (room.display === "led") return "displayLed";
    if (room.display === "projector") return "displayProjector";
    if (room.display === "interactive") return "displayInteractive";
    return "displayCommercial";
  }

  function displayBand(room, bandKey, qty) {
    const base = CONFIG.unitBands[bandKey] || [0, 0];
    const size = int(room.displaySize || 75, 75, 43, 330);
    const reference = bandKey === "displayLed" ? 136 : bandKey === "displayProjector" ? 120 : bandKey === "displayInteractive" ? 75 : 75;
    const exponent = bandKey === "displayLed" ? 1.35 : bandKey === "displayProjector" ? 0.85 : 1.15;
    const multiplier = clamp(Math.pow(size / reference, exponent), 0.55, bandKey === "displayLed" ? 4.2 : 3.6);
    return [Math.round(base[0] * multiplier * qty), Math.round(base[1] * multiplier * qty)];
  }

  function displayName(display, size) {
    if (display === "none") return "No display required";
    if (display === "led") return `${size} inch Active LED Wall`;
    if (display === "projector") return `${size} inch Projector + Screen`;
    if (display === "interactive") return `${size} inch Interactive Display`;
    if (display === "dual") return `Dual ${size} inch Displays`;
    return `${size} inch Commercial Display`;
  }

  function recommendedDisplaySize(room, display, requiredDiag) {
    if (display === "none") return 0;
    if (display === "led") return int(ceilTo(Math.max(requiredDiag, 150), 10), 150, 43, 330);
    if (display === "projector") return int(ceilTo(Math.max(requiredDiag, 120), 10), 120, 43, 330);
    if (display === "dual") return int(requiredDiag >= 180 ? 98 : room.capacity >= 18 || area(room) >= 650 ? 86 : 75, 75, 43, 330);
    if (display === "interactive") return int(requiredDiag >= 180 ? 98 : room.capacity >= 18 || area(room) >= 650 ? 86 : 75, 75, 43, 330);
    if (room.capacity <= 6 && area(room) <= 180) return 65;
    if (room.capacity <= 14 && area(room) <= 520) return 75;
    if (room.capacity <= 28 && area(room) <= 950) return 86;
    return 98;
  }

  function displayRecommendation(room) {
    const sqft = area(room);
    const seats = int(room.capacity, 10, 1, 2000);
    const farthestViewFt = Math.max(num(room.length, 24), num(room.width, 16));
    const requiredDiag = ceilTo(Math.max(12, farthestViewFt * 12 / 6) / 0.49, 10);
    if (room.display === "none") return { component: "No display required", shortLabel: "No display", reason: "Selected because this room does not need visual presentation." };
    const isManualSize = manualMap(room).displaySize;
    const size = int(room.displaySize || recommendedDisplaySize(room, room.display, requiredDiag), recommendedDisplaySize(room, room.display, requiredDiag), 43, 330);
    const sizeReason = isManualSize ? `${size} inch size selected by client; GPSPL will validate viewing distance and wall fit during site survey.` : `Estimated from ${Math.round(farthestViewFt)} ft farthest viewer and room use.`;
    if (room.display === "led") return {
      component: isMegaVenue(room) ? `Mega Venue ${size} inch LED Wall / Projection System Review` : `Estimated ${displayName("led", size)}`,
      shortLabel: isMegaVenue(room) ? "Mega venue LED/projection review" : `${size} inch LED wall`,
      reason: isMegaVenue(room)
        ? "Large venue image system requires site drawing, throw distance, brightness, rigging, power and content-size validation before final BOQ."
        : requiredDiag >= 260
        ? `${sizeReason} Final LED size/pixel pitch depends on wall size and content detail.`
        : `${sizeReason} Best for premium front-facing rooms, larger walls and high-impact viewing.`,
      size
    };
    if (room.display === "projector") return {
      component: requiredDiag >= 260 && !isManualSize ? `Estimated ${size} inch Laser Projection / LED Wall Review` : `Estimated ${displayName("projector", size)}`,
      shortLabel: `${size} inch projection`,
      reason: `${sizeReason} Final projection/LED choice depends on brightness, wall size and ambient light.`,
      size
    };
    if (room.display === "dual") return {
      component: requiredDiag >= 260 && !isManualSize ? `Estimated Dual ${size} inch Displays + LED Wall Review` : requiredDiag >= 180 && !isManualSize ? `Estimated Dual ${size} inch Displays / Projection Review` : `Estimated ${displayName("dual", size)}`,
      shortLabel: `Dual ${size} inch displays`,
      reason: requiredDiag >= 180 ? `Dual-display workflow selected. ${sizeReason}` : `${sizeReason} Dual displays help show VC participants and content together without switching.`,
      size
    };
    if (room.display === "interactive") return {
      component: requiredDiag >= 260 && !isManualSize ? `Estimated ${size} inch Interactive Display + LED Wall Review` : requiredDiag >= 180 && !isManualSize ? `Estimated ${size} inch Interactive Display + Projection Support` : `Estimated ${displayName("interactive", size)}`,
      shortLabel: `${size} inch interactive`,
      reason: requiredDiag >= 180 ? `Interactive workflow selected. ${sizeReason}` : `${sizeReason} Interactive display is suggested for training, annotation and classroom-style collaboration.`,
      size
    };
    return {
      component: `Estimated ${displayName("commercial", size)}`,
      shortLabel: `${size} inch display`,
      reason: `${sizeReason} Final size depends on wall, viewing distance and budget.`,
      size
    };
  }

  function cameraKey(room) {
    if (room.camera === "none") return null;
    if (room.camera === "multi") return "cameraMulti";
    if (room.camera === "ptz") return "cameraPtz";
    if (room.camera === "usb") return "cameraUsb";
    return "cameraAi";
  }

  function micKey(room) {
    if (room.microphone === "none") return null;
    if (room.microphone === "wireless") return "micWireless";
    if (room.microphone === "table") return "micTable";
    return "micCeiling";
  }

  function speakerKey(room) {
    if (room.speaker === "none") return null;
    if (room.speaker === "pa") return "speakerPa";
    if (room.speaker === "wall") return "speakerWall";
    if (room.speaker === "soundbar") return "speakerSoundbar";
    return "speakerCeiling";
  }

  function recommendedDisplayQty(room) {
    if (room.display === "none") return 0;
    if (room.display === "dual") return 2;
    if (room.capacity >= 45 || area(room) > 1200) return room.display === "led" ? 1 : 2;
    return 1;
  }

  function recommendedSpeakerQty(room) {
    const sqft = area(room);
    if (room.speaker === "none") return 0;
    if (room.speaker === "soundbar") return 1;
    if (room.speaker === "pa") return Math.max(2, Math.ceil(room.capacity / 35) * 2);
    if (room.speaker === "wall") return Math.max(2, Math.ceil(sqft / 280) * 2);
    return Math.max(2, Math.ceil(sqft / 180) * 2);
  }

  function recommendedMicQty(room) {
    if (room.microphone === "none") return 0;
    if (room.microphone === "wireless") return room.capacity >= 40 ? 4 : 2;
    if (room.microphone === "table") return Math.max(1, Math.ceil(room.capacity / 6));
    return Math.max(1, Math.ceil(area(room) / 320));
  }

  function applyPurpose(room, purposeId) {
    const purpose = purposePreset(purposeId);
    const preset = roomPreset(purpose.roomType);
    return autoTuneRoom(Object.assign({}, room, {
      purpose: purpose.id,
      roomType: purpose.roomType,
      designation: purpose.id === "not-sure" ? room.designation || preset.label : purpose.label.replace(" / Video Calls", "").replace(" / Leadership", ""),
      autoCapacity: true,
      capacity: undefined,
      length: preset.length,
      width: preset.width,
      height: preset.height,
      display: purpose.display,
      displaySize: undefined,
      camera: purpose.camera,
      microphone: purpose.microphone,
      speaker: purpose.speaker,
      displayQty: undefined,
      cameraQty: undefined,
      micQty: undefined,
      speakerQty: undefined,
      dspQty: undefined,
      schedulerQty: purpose.schedulerQty,
      controllerQty: purpose.controllerQty,
      rackQty: purpose.rackQty,
      upsQty: purpose.upsQty,
      laptopQty: purpose.laptopQty,
      desktopQty: purpose.desktopQty,
      cctvQty: purpose.cctvQty,
      networkQty: purpose.networkQty
    }));
  }


  function addBand(a, b, qty) {
    return [a[0] + (b[0] * qty), a[1] + (b[1] * qty)];
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function ceilTo(value, step) {
    return Math.ceil(value / step) * step;
  }

  function formatInr(value) {
    if (value >= 10000000) return `Rs. ${(value / 10000000).toFixed(value % 10000000 ? 1 : 0)} Cr`;
    if (value >= 100000) return `Rs. ${(value / 100000).toFixed(value % 100000 ? 1 : 0)} Lakh`;
    return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
  }

  function bandText(band) {
    return `${formatInr(band[0])} - ${formatInr(band[1])}`;
  }

  function area(room) {
    return Math.round(num(room.length, 24) * num(room.width, 16));
  }

  function roomPreset(id) {
    return CONFIG.rooms.find((entry) => entry.id === id) || CONFIG.rooms[0];
  }

  function recommendedCapacity(room) {
    const preset = roomPreset(room.roomType);
    const sqft = area(room);
    const presetArea = Math.max(1, preset.length * preset.width);
    const height = num(room.height, preset.height);
    let seats = Math.round(preset.capacity * (sqft / presetArea));
    if (height < 8.5) seats = Math.floor(seats * 0.82);
    else if (height < 9.5) seats = Math.floor(seats * 0.92);
    else if (height >= 13 && room.roomType !== "auditorium" && sqft > 900) seats = Math.ceil(seats * 1.04);
    if (room.roomType === "server") return Math.max(1, Math.min(6, seats || preset.capacity));
    if (room.roomType === "reception") return Math.max(2, Math.min(12, seats || preset.capacity));
    const minimum = room.roomType === "huddle" ? 2 : room.roomType === "auditorium" ? 20 : 4;
    return Math.max(minimum, Math.min(2000, seats || preset.capacity));
  }

  function seatingAreaPerPerson(roomType) {
    if (roomType === "auditorium") return 13;
    if (roomType === "training" || roomType === "classroom") return 24;
    if (roomType === "boardroom") return 42;
    if (roomType === "huddle") return 28;
    if (roomType === "reception") return 36;
    if (roomType === "server") return 120;
    return 34;
  }

  function dimensionsForCapacity(room, capacity) {
    const preset = roomPreset(room.roomType);
    const seats = int(capacity, preset.capacity, 1, 2000);
    const targetArea = Math.max(preset.length * preset.width, seats * seatingAreaPerPerson(room.roomType));
    const ratio = preset.length / Math.max(1, preset.width);
    const width = clamp(Math.round(Math.sqrt(targetArea / ratio)), 8, 160);
    const length = clamp(Math.round(targetArea / width), 8, 220);
    const height = room.roomType === "auditorium" && seats >= 200 ? 18 : seats >= 80 ? Math.max(num(room.height, preset.height), 14) : seats >= 30 ? Math.max(num(room.height, preset.height), 11) : num(room.height, preset.height);
    return { length, width, height };
  }

  function isMegaVenue(room) {
    return room.capacity > 500 || area(room) > 22000 || num(room.length, 0) > 180 || num(room.width, 0) > 120;
  }

  function isDisplayOnlyRoom(room) {
    return room.display !== "none" && room.displayQty > 0 && room.cameraQty === 0 && room.micQty === 0 && room.speakerQty === 0;
  }

  function isAudioOnlyRoom(room) {
    return room.displayQty === 0 && room.cameraQty === 0 && (room.micQty > 0 || room.speakerQty > 0 || room.dspQty > 0);
  }

  function selectedScope(room) {
    const scope = [];
    if (room.displayQty > 0) scope.push("display");
    if (room.cameraQty > 0) scope.push("camera");
    if (room.micQty > 0) scope.push("microphone");
    if (room.speakerQty > 0) scope.push("speaker");
    if (room.dspQty > 0) scope.push("DSP");
    if (room.controllerQty > 0) scope.push("control");
    if (room.schedulerQty > 0) scope.push("scheduler");
    if (room.networkQty > 0 || room.cctvQty > 0) scope.push("network/CCTV");
    return scope;
  }


  function track(name, payload) {
    const data = Object.assign({ component: "multi_room_av_boq_designer" }, payload || {});
    if (typeof window.gpsplTrack === "function") window.gpsplTrack(name, data);
    if (typeof window.gtag === "function") window.gtag("event", name, data);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, data));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function label(list, id) {
    const item = list.find((entry) => entry.id === id);
    return item ? item.label : id;
  }

  function num(value, fallback) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  }

  function int(value, fallback, min, max) {
    const parsed = Math.round(num(value, fallback));
    return Math.max(min, Math.min(max, parsed));
  }

  function dimension(value, fallback, min, max) {
    return clamp(num(value, fallback), min, max);
  }


  const defaultState = {
    activeRoom: 0,
    fineTuneOpen: false,
    budgetTier: "standard",
    simulatedFailures: {
      dsp: false,
      power: false,
      network: false
    },
    rooms: [createRoom(0)]
  };


  function sourceLabel(item) {
    return item.source === "Client selected" ? "Client" : "GPSPL";
  }

  function sourceStatusLabel(item) {
    return item.source === "Client selected" ? "Client selected" : "GPSPL recommended";
  }



  // Centralized AV Design & Simulation Engine (Consumer Friendly Language)
  function roomAssumptions(room) {
    const sqft = area(room);
    const volume = sqft * num(room.height, 10);
    
    // Acoustic absorption factors based on room types
    let absorptionFactor = 0.18; // Default
    if (["boardroom", "executive"].includes(room.roomType)) absorptionFactor = 0.25;
    else if (["server", "reception"].includes(room.roomType)) absorptionFactor = 0.12;

    const rt60 = 0.049 * (volume / (sqft * absorptionFactor));
    return {
      sqft,
      volume,
      rt60,
      absorptionFactor,
      listenerHeight: 4, // Average ear level sitting
      tableLayout: ["training", "classroom"].includes(room.roomType) ? "classroom rows" : "boardroom table",
      backgroundNoise: sqft > 1200 ? "medium-high" : sqft > 500 ? "medium" : "low-medium",
      acousticFactor: rt60 > 0.85 ? 0.82 : rt60 > 0.65 ? 0.90 : 1.0
    };
  }

  function displayEngineering(room) {
    if (room.display === "none") return { qty: 0, plan: displayRecommendation(room), confidence: 94 };
    const longestViewFt = Math.max(num(room.length, 24), num(room.width, 16));
    
    // DISCAS standard for basic reading content height = distance / 6
    const contentHeightIn = Math.max(12, longestViewFt * 12 / 6);
    const diagonal = ceilTo(contentHeightIn / 0.49, 5);
    const needsLargeImage = diagonal >= 105 || room.capacity >= 50 || area(room) >= 1300;
    
    let display = room.display;
    if (needsLargeImage && display === "commercial") {
      if (room.roomType === "auditorium") display = "projector";
      else if (diagonal >= 175 || area(room) >= 1600 || room.capacity >= 50) display = "led";
    }
    if (diagonal >= 180 && ["interactive", "dual"].includes(display) && !manualMap(room).display) display = diagonal >= 260 ? "led" : "projector";
    
    const derivedRoom = Object.assign({}, room, { display });
    const plan = displayRecommendation(derivedRoom);
    const size = int(room.displaySize || plan.size || recommendedDisplaySize(derivedRoom, display, diagonal), plan.size || 75, 43, 330);
    const qty = display === "dual" ? 2 : (room.width > 34 && room.capacity >= 18 && !needsLargeImage ? 2 : 1);
    
    // Check DISCAS limits
    const discasHeight = size * 0.49;
    const maxReadDistance = discasHeight * 6 / 12; // feet
    const visibilityPass = longestViewFt <= maxReadDistance;

    return {
      qty,
      plan,
      display,
      size,
      maxReadDistance,
      visibilityPass,
      confidence: clamp(Math.round(92 - Math.max(0, diagonal - 98) * 0.12), 78, 96),
      justification: `Fits room length of ${Math.round(longestViewFt)} ft. ${size} inch screen selected so text is easily readable from all seats. ${qty > 1 ? "Two displays are recommended to prevent side-view eye strain." : "One main display is perfect for this room size."}`
    };
  }

  function cameraEngineering(room) {
    if (room.camera === "none") return { qty: 0, component: "No camera required", confidence: 96 };
    const roomLength = num(room.length, 24);
    const roomWidth = num(room.width, 16);
    const requiredHfov = Math.atan((roomWidth / 2) / Math.max(5, roomLength * 0.65)) * 2 * 180 / Math.PI;
    const isLarge = roomLength > 40 || roomWidth > 28 || room.capacity >= 30;
    const qty = isLarge && room.camera !== "ai" ? Math.max(1, Math.ceil(roomLength / 55)) : 1;
    const component = isLarge ? "PTZ Camera with preset framing" : requiredHfov > 82 ? "Wide-angle AI Bar / AI Camera" : "4K AI Camera";
    
    return {
      qty,
      component,
      requiredHfov,
      confidence: clamp(Math.round(94 - Math.max(0, requiredHfov - 90) * 0.25), 80, 96),
      justification: `Wide-angle coverage maps all seats so remote meeting callers can see everyone clearly.`
    };
  }

  function microphoneEngineering(room) {
    if (room.microphone === "none") return { qty: 0, component: "No microphone required", confidence: 96 };
    const roomLength = num(room.length, 24);
    const roomWidth = num(room.width, 16);
    const assumptions = roomAssumptions(room);
    
    if (room.microphone === "wireless") {
      const audienceArea = roomLength * roomWidth;
      const stageOrPresenterChannels = room.roomType === "auditorium" || room.roomType === "training" || room.roomType === "classroom" ? 2 : 1;
      const qnaZoneArea = room.roomType === "auditorium" ? 2600 : 1800;
      const audienceQna = room.capacity >= 50 ? clamp(Math.ceil(audienceArea / qnaZoneArea), 1, room.roomType === "auditorium" ? 3 : 2) : 0;
      const backup = room.capacity >= 120 || room.roomType === "auditorium" ? 1 : 0;
      const qty = clamp(stageOrPresenterChannels + audienceQna + backup, 1, 8);
      return {
        qty,
        component: "Wireless Handheld/Lapel Microphone Set",
        confidence: room.capacity >= 250 ? 86 : 89,
        justification: `Recommended ${stageOrPresenterChannels} presenter mic(s) and ${audienceQna} roving audience mic(s) for clear speaking; RF coordination required.`
      };
    }
    
    const pickupRadius = room.microphone === "ceiling" ? 16 * assumptions.acousticFactor : room.microphone === "table" ? 9 : 18;
    const coverageArea = Math.PI * pickupRadius * pickupRadius * 0.78;
    const layoutFactor = assumptions.tableLayout === "classroom rows" ? 0.82 : assumptions.tableLayout === "boardroom table" ? 1.08 : 1;
    const qtyByArea = Math.ceil(assumptions.sqft / Math.max(1, coverageArea * layoutFactor));
    const qtyByLength = room.microphone === "table" ? Math.ceil(roomLength / (pickupRadius * 2.2)) : Math.ceil(roomLength / (pickupRadius * 2.6));
    const qtyByWidth = room.microphone === "ceiling" && roomWidth > pickupRadius * 3 ? Math.ceil(roomWidth / (pickupRadius * 2.2)) : 1;
    const qty = clamp(Math.max(1, qtyByArea, qtyByLength, qtyByWidth), 1, 18);
    const component = room.microphone === "ceiling" ? "Beamforming / Ceiling Microphone Zone" : "Table Boundary Microphone";
    
    return {
      qty,
      component,
      pickupRadius,
      confidence: clamp(Math.round(91 * assumptions.acousticFactor), 76, 94),
      justification: `Recommends ${qty} microphone(s) based on seat layout to capture all voices clearly without echoing.`
    };
  }

  function speakerEngineering(room) {
    if (room.speaker === "none") return { qty: 0, component: "No speakers required", confidence: 96 };
    if (room.speaker === "soundbar") {
      const suitable = area(room) <= 220 && room.capacity <= 8;
      return {
        qty: suitable ? 1 : 2,
        component: suitable ? "High-output conferencing soundbar" : "Wall speaker pair for wider room coverage",
        amplifierWatts: suitable ? 120 : 180,
        placement: suitable ? "Front wall below display" : "Left/right front wall aimed at listener area",
        confidence: suitable ? 92 : 84,
        justification: suitable ? "Compact room allows one front soundbar without sound gaps." : "Room width requires two wall speakers to spread sound evenly."
      };
    }
    
    const length = num(room.length, 24);
    const width = num(room.width, 16);
    const height = num(room.height, 10);
    const listenerHeight = roomAssumptions(room).listenerHeight;
    const coverageAngle = room.speaker === "pa" ? 70 : room.speaker === "wall" ? 90 : 100;
    const throwFt = Math.max(3, height - listenerHeight);
    const rawRadius = Math.tan((coverageAngle / 2) * Math.PI / 180) * throwFt;
    const effectiveRadius = rawRadius * (room.speaker === "ceiling" ? 0.9 : 0.72);
    const speakerSpacing = room.speaker === "ceiling" ? effectiveRadius * 2 : effectiveRadius * 1.75;
    const xCount = Math.max(1, Math.ceil(width / speakerSpacing));
    const yCount = Math.max(1, Math.ceil(length / speakerSpacing));
    let qty = xCount * yCount;
    let paMainPairs = 0;
    let paDelayPairs = 0;
    if (room.speaker === "pa") {
      paMainPairs = Math.max(1, Math.ceil(width / 28));
      paDelayPairs = length > 95 ? 2 : length > 60 ? 1 : 0;
      qty = Math.max(2, (paMainPairs + paDelayPairs) * 2);
    }
    
    const sensitivity = room.speaker === "pa" ? 96 : room.speaker === "wall" ? 89 : 88;
    const wattsPerSpeaker = room.speaker === "pa" ? 180 : room.speaker === "wall" ? 60 : 35;
    const farDistance = Math.max(8, Math.sqrt((length / Math.max(1, yCount)) ** 2 + (width / Math.max(1, xCount)) ** 2));
    const splAtListener = sensitivity + 10 * Math.log10(wattsPerSpeaker) - 20 * Math.log10(farDistance);
    const minTarget = 80;
    if (splAtListener < minTarget && room.speaker !== "pa") qty += Math.ceil((minTarget - splAtListener) / 3);
    qty = clamp(qty, 1, 40);
    const amplifierWatts = ceilTo(qty * wattsPerSpeaker * 1.6, 50);
    const component = room.speaker === "pa"
      ? paDelayPairs > 0 ? "High-SPL PA mains with delay/fill speakers" : "High-SPL PA / Auditorium Speaker"
      : room.speaker === "wall" ? "Wall-mounted speech reinforcement speaker" : "6.5 inch ceiling speaker, 90-100 degree coverage";
      
    return {
      qty,
      component,
      amplifierWatts,
      placement: room.speaker === "pa"
        ? paDelayPairs > 0 ? `${paMainPairs * 2} main plus ${paDelayPairs * 2} delay speaker(s) for long throw` : "Distributed left/right audience coverage"
        : `${xCount} x ${yCount} distributed grid with overlapping coverage`,
      confidence: clamp(Math.round(88 + Math.min(6, splAtListener - minTarget)), 78, 95),
      justification: `Recommends ${qty} speaker(s) to distribute sound evenly, ensuring speech is comfortable and clear for everyone.`
    };
  }

  function infrastructureEngineering(room, design) {
    const endpoints = design.display.qty + design.camera.qty + design.microphone.qty + design.speaker.qty + room.controllerQty + room.schedulerQty + room.cctvQty + room.laptopQty + room.desktopQty;
    const cableFt = ceilTo((num(room.length, 24) + num(room.width, 16)) * 2 + endpoints * 18 + num(room.height, 10) * Math.max(1, endpoints / 2), 25);
    const rackUnits = ceilTo(6 + endpoints * 0.7 + (design.dspRequired ? 2 : 0), 2);
    
    // Dynamic VA load summing
    let upsVa = 650;
    if (room.display !== "none") upsVa += room.displayQty * (ProductLibrary[displayKey(room)]?.power || 150) * 1.2;
    if (room.camera !== "none") upsVa += room.cameraQty * (ProductLibrary[cameraKey(room)]?.power || 30) * 1.1;
    if (room.microphone !== "none") upsVa += room.micQty * (ProductLibrary[micKey(room)]?.power || 10) * 1.1;
    upsVa += design.amplifierWatts * 0.65;
    upsVa += room.controllerQty * 20 + room.schedulerQty * 12;
    upsVa = ceilTo(upsVa, 250);

    const installDays = Math.max(1, Math.ceil((endpoints + cableFt / 80) / 8));
    return {
      endpoints,
      cableFt,
      rackUnits,
      upsVa,
      installDays,
      confidence: clamp(92 - Math.ceil(endpoints / 8), 80, 94)
    };
  }

  function programmingEngineering(room, design) {
    const displayOnly = isDisplayOnlyRoom(room);
    const ledOrProjection = room.display === "led" || room.display === "projector";
    const dspInputs = displayOnly ? 0 : Math.max(0, room.micQty + room.cameraQty + (room.displayQty > 0 ? 1 : 0));
    const dspOutputs = displayOnly ? 0 : Math.max(0, Math.ceil(room.speakerQty / 2) + (room.displayQty > 1 ? 1 : 0));
    const controlledDevices = room.displayQty + room.cameraQty + room.schedulerQty + room.controllerQty + room.dspQty + room.networkQty + room.cctvQty;
    const touchPages = room.controllerQty > 0 ? 1 + (room.displayQty > 0 ? 1 : 0) + (room.cameraQty > 0 ? 1 : 0) + (room.micQty > 0 || room.speakerQty > 0 ? 1 : 0) + (room.schedulerQty > 0 ? 1 : 0) : 0;
    const automationWorkflows = (displayOnly ? 0 : room.platform !== "byod" ? 1 : 0) + (design.switchingRequired ? 1 : 0) + (room.controllerQty > 0 ? 1 : 0) + (room.roomType === "auditorium" && !displayOnly ? 2 : 0);
    const integrations = (displayOnly ? 0 : room.platform !== "byod" ? 1 : 0) + (room.networkQty > 0 ? 1 : 0) + (room.schedulerQty > 0 ? 1 : 0) + (room.cctvQty > 0 ? 1 : 0);
    const complexityMultiplier = displayOnly ? (ledOrProjection ? 1.08 : 0.82) : room.roomType === "auditorium" ? 1.45 : room.roomType === "training" || room.roomType === "classroom" ? 1.2 : room.roomType === "server" ? 1.1 : 1;
    const rawHours = displayOnly
      ? 1.25 + controlledDevices * 0.3 + (ledOrProjection ? 2.5 : 0.75) + (room.displaySize >= 180 ? 1 : 0) + (room.controllerQty > 0 ? 1 : 0)
      : 1.5 +
        controlledDevices * 0.45 +
        (dspInputs + dspOutputs) * 0.35 +
        touchPages * 0.8 +
        automationWorkflows * 1.15 +
        integrations * 0.75;
    const engineerHours = ceilTo(rawHours * complexityMultiplier, 1);
    return {
      controlledDevices,
      dspInputs,
      dspOutputs,
      touchPages,
      automationWorkflows,
      integrations,
      engineerHours,
      engineerDays: Math.max(0.5, Math.ceil(engineerHours / 6 * 2) / 2),
      summary: displayOnly
        ? `${engineerHours} engineer-hour(s) for ${room.display === "led" ? "LED processor mapping, resolution scaling, input testing and content handover" : "display setup, source testing and video calibration"}.`
        : `${engineerHours} engineer-hour(s) from ${controlledDevices} controlled device(s), ${dspInputs} DSP input(s), ${dspOutputs} DSP output(s), ${touchPages} touch page(s), ${automationWorkflows} workflow(s) and ${integrations} integration(s).`
    };
  }

  function serviceEngineering(room, design) {
    const infrastructure = design.infrastructure;
    const programming = design.programming;
    const cableRuns = Math.max(1, Math.ceil(infrastructure.cableFt / 75));
    const highCeiling = room.height >= 14;
    const largeRoom = area(room) >= 1200 || room.capacity >= 40;
    const ledOrProjection = room.display === "led" || room.display === "projector";
    const displayOnly = isDisplayOnlyRoom(room);
    const programmingComplex = design.dspRequired || design.switchingRequired || room.controllerQty > 0 || room.networkQty > 0 || ledOrProjection;
    const activities = ["Equipment Installation"];

    if (room.displayQty > 0) activities.push(room.display === "led" ? "Display / LED Wall Installation" : "Display Mounting & Alignment");
    if (room.display === "led" && room.displayQty > 0) activities.push("LED Processor Mapping", "Resolution Scaling & Content Input Configuration");
    if (room.display === "projector" && room.displayQty > 0) activities.push("Projection Alignment & Source Configuration");
    if (room.cameraQty > 0) activities.push("Camera Installation");
    if (room.micQty > 0) activities.push("Microphone Installation");
    if (room.speakerQty > 0) activities.push("Speaker Installation");
    if (room.rackQty > 0) activities.push("Rack Assembly");
    activities.push("Cable Laying & Termination");
    if (room.networkQty > 0 || room.cctvQty > 0 || room.schedulerQty > 0 || room.controllerQty > 0) activities.push("Network Configuration");
    if (room.dspQty > 0 && (room.micQty > 0 || room.speakerQty > 0)) activities.push("DSP Programming");
    if (room.controllerQty > 0) activities.push("AMX / Control System Programming");
    if (programmingComplex) activities.push(displayOnly ? "Video Processor / Display Configuration" : "Device Configuration");
    if (infrastructure.endpoints >= 4 || ledOrProjection) activities.push("System Integration");
    if (room.speakerQty > 0 || room.micQty > 0) activities.push("Audio Tuning");
    if (room.displayQty > 0 || room.cameraQty > 0) activities.push("Video Calibration");
    if (isMegaVenue(room)) activities.push("Mega Venue Site Survey & Load Validation");
    activities.push("Testing & Commissioning", "User Training", "Documentation", "Final Handover");

    const complexityScore =
      infrastructure.endpoints +
      cableRuns * 0.55 +
      (highCeiling ? 5 : 0) +
      (largeRoom ? 4 : 0) +
      (ledOrProjection ? 5 : 0) +
      (room.display === "led" ? 4 : 0) +
      (programmingComplex ? 4 : 0) +
      (room.roomType === "auditorium" && !displayOnly ? 6 : 0) +
      (room.roomType === "server" ? 3 : 0);

    const labourLevel = complexityScore >= 36 ? "Enterprise" : complexityScore >= 20 ? "Advanced" : "Standard";
    const complexity = complexityScore >= 36 ? "High" : complexityScore >= 20 ? "Medium" : "Low";
    const baseInstallDays = Math.max(1, Math.ceil((infrastructure.endpoints + cableRuns + (highCeiling ? 3 : 0) + (ledOrProjection ? 3 : 0)) / 8));
    const technicianDays = Math.max(1, baseInstallDays);
    const engineerDays = programming.engineerDays;
    const technicianBand = [technicianDays * CONFIG.labourRates.technicianDay[0], technicianDays * CONFIG.labourRates.technicianDay[1]];
    const programmingBand = [programming.engineerHours * CONFIG.labourRates.engineerHour[0], programming.engineerHours * CONFIG.labourRates.engineerHour[1]];

    return {
      activities: Array.from(new Set(activities)),
      labourLevel,
      technicianDays,
      engineerDays,
      complexity,
      cableRuns,
      programmingHours: programming.engineerHours,
      programming,
      summary: `${isMegaVenue(room) ? "Mega venue review scope" : labourLevel + " installation scope"} based on ${infrastructure.endpoints} AV endpoint(s), ${cableRuns} cable run(s), ${technicianDays} technician-day(s), ${programming.engineerHours} engineer-hour(s) and ${room.height} ft ceiling height.${isMegaVenue(room) ? " Final quantities require drawings, rigging, acoustic and electrical validation." : ""}`,
      band: addBand(technicianBand, programmingBand, 1),
      costSplit: {
        installation: technicianBand,
        programming: programmingBand
      }
    };
  }

  function engineeringDesign(room) {
    const display = displayEngineering(room);
    const camera = cameraEngineering(room);
    const microphone = microphoneEngineering(room);
    const speaker = speakerEngineering(room);
    const dspRequired = microphone.qty > 0 || speaker.qty > 1 || camera.qty > 0;
    const switchingRequired = display.qty > 1 || room.display === "dual" || room.display === "projector" || room.display === "led";
    const amplifierWatts = speaker.amplifierWatts || 0;
    const infrastructure = infrastructureEngineering(room, { display, camera, microphone, speaker, dspRequired, switchingRequired, amplifierWatts });
    const programming = programmingEngineering(room, { display, camera, microphone, speaker, dspRequired, switchingRequired, amplifierWatts });
    const service = serviceEngineering(room, { display, camera, microphone, speaker, dspRequired, switchingRequired, amplifierWatts, infrastructure, programming });
    return { display, camera, microphone, speaker, dspRequired, switchingRequired, amplifierWatts, infrastructure, programming, service };
  }



  function autoTuneRoom(input) {
    const room = Object.assign({}, input);
    const preset = roomPreset(room.roomType);
    room.length = dimension(room.length || preset.length, preset.length, 6, 220);
    room.width = dimension(room.width || preset.width, preset.width, 6, 160);
    room.height = dimension(room.height || preset.height, preset.height, 7, 40);
    room.autoCapacity = room.autoCapacity !== false;
    room.capacity = int(room.autoCapacity ? recommendedCapacity(room) : (room.capacity || recommendedCapacity(room)), recommendedCapacity(room), 1, 2000);

    if (room.roomType === "auditorium") {
      if (room.display === "commercial") room.display = "projector";
      if (room.camera === "ai") room.camera = "ptz";
      if (room.speaker === "ceiling") room.speaker = "pa";
      if (room.microphone === "ceiling") room.microphone = "wireless";
    }

    const design = engineeringDesign(room);
    const manual = manualMap(room);
    room.display = design.display.display || room.display;
    room.displaySize = room.display === "none" ? 0 : int(manual.displaySize ? room.displaySize : design.display.size, design.display.size || 75, 43, 330);
    room.displayQty = int(manual.displayQty ? room.displayQty : design.display.qty, design.display.qty, 0, 8);
    room.cameraQty = room.camera === "none" ? 0 : int(manual.cameraQty ? room.cameraQty : design.camera.qty, design.camera.qty, 0, 6);
    room.micQty = room.microphone === "none" ? 0 : int(manual.micQty ? room.micQty : design.microphone.qty, design.microphone.qty, 0, 24);
    room.speakerQty = room.speaker === "none" ? 0 : int(manual.speakerQty ? room.speakerQty : design.speaker.qty, design.speaker.qty, 0, 40);
    room.schedulerQty = int(room.schedulerQty == null ? 0 : room.schedulerQty, 0, 0, 4);
    room.controllerQty = int(room.controllerQty == null ? 1 : room.controllerQty, 1, 0, 4);
    room.dspQty = int(manual.dspQty ? room.dspQty : (design.dspRequired ? 1 : 0), design.dspRequired ? 1 : 0, 0, 3);
    room.rackQty = int(manual.rackQty ? room.rackQty : Math.max(1, Math.ceil(design.infrastructure.rackUnits / 12)), 1, 0, 3);
    room.upsQty = int(manual.upsQty ? room.upsQty : Math.max(1, Math.ceil(design.infrastructure.upsVa / 1500)), 1, 0, 3);
    room.laptopQty = int(room.laptopQty == null ? 0 : room.laptopQty, 0, 0, 12);
    room.desktopQty = int(room.desktopQty == null ? 0 : room.desktopQty, 0, 0, 12);
    room.cctvQty = int(room.cctvQty == null ? 0 : room.cctvQty, 0, 0, 24);
    room.networkQty = int(room.networkQty == null ? 0 : room.networkQty, 0, 0, 8);
    return room;
  }

  function normalizeRoom(input) {
    const room = Object.assign({}, input);
    room.length = dimension(room.length, 24, 6, 220);
    room.width = dimension(room.width, 16, 6, 160);
    room.height = dimension(room.height, 10, 7, 40);
    room.autoCapacity = room.autoCapacity !== false;
    room.capacity = int(room.autoCapacity ? recommendedCapacity(room) : room.capacity, recommendedCapacity(room), 1, 2000);
    const design = engineeringDesign(room);
    const manual = manualMap(room);
    room.display = design.display.display || room.display;
    room.displaySize = room.display === "none" ? 0 : int(manual.displaySize ? room.displaySize : design.display.size, design.display.size || 75, 43, 330);
    room.displayQty = int(manual.displayQty ? room.displayQty : design.display.qty, design.display.qty, 0, 8);
    room.cameraQty = room.camera === "none" ? 0 : int(manual.cameraQty ? room.cameraQty : design.camera.qty, design.camera.qty, 0, 6);
    room.micQty = room.microphone === "none" ? 0 : int(manual.micQty ? room.micQty : design.microphone.qty, design.microphone.qty, 0, 24);
    room.speakerQty = room.speaker === "none" ? 0 : int(manual.speakerQty ? room.speakerQty : design.speaker.qty, design.speaker.qty, 0, 40);
    room.schedulerQty = int(room.schedulerQty, 0, 0, 4);
    room.controllerQty = int(room.controllerQty, 1, 0, 4);
    room.dspQty = int(manual.dspQty ? room.dspQty : (design.dspRequired ? 1 : 0), design.dspRequired ? 1 : 0, 0, 3);
    room.rackQty = int(manual.rackQty ? room.rackQty : Math.max(1, Math.ceil(design.infrastructure.rackUnits / 12)), 1, 0, 3);
    room.upsQty = int(manual.upsQty ? room.upsQty : Math.max(1, Math.ceil(design.infrastructure.upsVa / 1500)), 1, 0, 3);
    room.laptopQty = int(room.laptopQty, 0, 0, 12);
    room.desktopQty = int(room.desktopQty, 0, 0, 12);
    room.cctvQty = int(room.cctvQty, 0, 0, 24);
    room.networkQty = int(room.networkQty, 0, 0, 8);
    return room;
  }

  function line(category, component, qty, bandKey, note, confidence, bandOverride) {
    const band = bandOverride || (bandKey && CONFIG.unitBands[bandKey] ? [CONFIG.unitBands[bandKey][0] * qty, CONFIG.unitBands[bandKey][1] * qty] : [0, 0]);
    return { category, component, qty, band, note, confidence: confidence || 88 };
  }

  // Simplified description helper
  function audioPlan(room) {
    const spk = room.speaker;
    const qty = room.speakerQty;
    const base = {
      amplifier: "No speaker amplifier required.",
      processor: "Simple Direct audio routing"
    };
    if (spk === "soundbar") {
      base.amplifier = "Built-in soundbar amplifier (stereo)";
      base.processor = "Direct USB/HDMI audio interface";
    } else if (spk === "ceiling") {
      base.amplifier = `Ceiling speaker amplifier to power ${qty} speakers safely.`;
      base.processor = "Audio processor mapping";
    } else if (spk === "wall") {
      base.amplifier = `Wall speaker amplifier to power ${qty} speakers safely.`;
      base.processor = "Audio processor mapping";
    } else if (spk === "pa") {
      base.amplifier = `High-power auditorium amplifier to power ${qty} PA speakers.`;
      base.processor = "Professional audio mixing & tuning";
    }
    return base;
  }

  function buildRoomBoq(room) {
    const items = [];
    const design = engineeringDesign(room);
    const displayPlan = design.display.plan;
    const dKey = displayKey(Object.assign({}, room, { display: design.display.display || room.display }));
    if (dKey && room.displayQty > 0) {
      const displayItem = line("Display", displayPlan.component, room.displayQty, dKey, design.display.justification || displayPlan.reason, design.display.confidence, displayBand(room, dKey, room.displayQty));
      displayItem.shortLabel = displayPlan.shortLabel;
      displayItem.reason = displayItem.note;
      items.push(markSource(displayItem, room, ["display", "displaySize", "displayQty"]));
    }

    if ((room.display === "led" || room.display === "projector") && room.displayQty > 0) {
      const videoSetup = line(
        "Video Processing",
        room.display === "led" ? "LED Video Processor Mapping & Content Setup" : "Display Source Scaling & Calibration Setup",
        1,
        null,
        room.display === "led"
          ? `LED processor mapping setup: matches input sources and outputs resolution for the ${room.displaySize || design.display.size} inch wall.`
          : "Image alignment, scaling, and signal testing for projection screen.",
        88,
        [0, 0]
      );
      videoSetup.shortLabel = room.display === "led" ? "LED processor setup" : "Video setup";
      videoSetup.source = "GPSPL recommended";
      items.push(videoSetup);
    }

    const cKey = cameraKey(room);
    if (cKey && room.cameraQty > 0) items.push(markSource(line("Camera", design.camera.component, room.cameraQty, cKey, design.camera.justification, design.camera.confidence), room, ["camera", "cameraQty"]));

    const mKey = micKey(room);
    if (mKey && room.micQty > 0) items.push(markSource(line("Microphone", design.microphone.component, room.micQty, mKey, design.microphone.justification, design.microphone.confidence), room, ["microphone", "micQty"]));

    const sKey = speakerKey(room);
    if (sKey && room.speakerQty > 0) items.push(markSource(line("Speaker", design.speaker.component, room.speakerQty, sKey, `${design.speaker.justification} Placement: ${design.speaker.placement}.`, design.speaker.confidence), room, ["speaker", "speakerQty"]));

    if (room.dspQty > 0 && (room.micQty > 0 || room.speakerQty > 0 || room.cameraQty > 0)) items.push(markSource(line("Audio Processing", "AEC DSP / Audio Processor", room.dspQty, "dsp", "Clears background noise, stops microphone echo, and routes sound to the video call.", design.infrastructure.confidence), room, ["dspQty"]));
    if (sKey && room.speakerQty > 0) items.push(line("Amplification", `${ceilTo(design.amplifierWatts || 120, 50)}W amplifier with headroom`, 1, "amplifier", "Powers the speakers cleanly for a distortion-free audio experience.", design.speaker.confidence));
    if (!isDisplayOnlyRoom(room) && (design.switchingRequired || room.capacity >= 12 || room.micQty >= 2 || room.speakerQty >= 4)) items.push(line("Mixer / Matrix", audioPlan(room).processor, 1, null, "Central hub to link display, mics, and cameras.", 86, [0, 0]));
    if (room.schedulerQty > 0) items.push(markSource(line("Room Booking", "Room Scheduler Panel", room.schedulerQty, "scheduler", "Shows room booking status outside the entrance door."), room, ["schedulerQty"]));
    if (room.controllerQty > 0) items.push(markSource(line("Control", "Touch Controller / Control Processor", room.controllerQty, "controller", "Touch panel control interface to start video calls and select inputs with one touch.", 88), room, ["controllerQty"]));
    if (room.rackQty > 0) items.push(markSource(line("Infrastructure", `${design.infrastructure.rackUnits}U AV Rack / Mounting Hardware`, room.rackQty, "rack", "Houses central control gear neatly with safe ventilation spacing.", design.infrastructure.confidence), room, ["rackQty"]));
    if (room.upsQty > 0) items.push(markSource(line("Power", `${design.infrastructure.upsVa}VA UPS / Power Conditioning`, room.upsQty, "ups", "Provides power backup and protects electronics from spikes.", design.infrastructure.confidence), room, ["upsQty"]));
    if (room.laptopQty > 0) items.push(markSource(line("IT Devices", "Business Laptop", room.laptopQty, "laptop", "User workstation laptop for starting meetings."), room, ["laptopQty"]));
    if (room.desktopQty > 0) items.push(markSource(line("IT Devices", "Business Desktop", room.desktopQty, "desktop", "Dedicated admin desktop for the receptionist or room operator."), room, ["desktopQty"]));
    if (room.cctvQty > 0) items.push(markSource(line("CCTV", "IP CCTV Camera Points", room.cctvQty, "cctv", "Security monitoring coverage for entrances or server closet."), room, ["cctvQty"]));
    if (room.networkQty > 0) items.push(markSource(line("Network", "Network Switch / Patch Panel", room.networkQty, "networkSwitch", "Links control panels, cameras, and audio devices together.", 88), room, ["networkQty"]));
    items.push(line("Cabling", "Signal, Control and Power Cabling", design.infrastructure.cableFt, null, "High-grade shielded wiring to connect all displays, speakers, and cameras.", design.infrastructure.confidence, [design.infrastructure.cableFt * 90, design.infrastructure.cableFt * 180]));
    
    const serviceItem = line("Services", "Installation & Commissioning", design.service.technicianDays, null, design.service.summary, 86, design.service.band);
    serviceItem.serviceScope = design.service;
    serviceItem.costSplit = design.service.costSplit;
    items.push(serviceItem);
    return items;
  }

  function totalBand(items) {
    return items.reduce((acc, entry) => addBand(acc, entry.band, 1), [0, 0]);
  }

  function estimateClass(total) {
    if (total[1] <= 700000) return "Essential";
    if (total[1] <= 1800000) return "Business";
    return "Enterprise";
  }

  function validationLabel(score) {
    if (score >= 88) return "Engineering validated";
    if (score >= 76) return "Site review advised";
    return "Needs engineering review";
  }

  // Simplified classification styling mapping
  function validationClass(score) {
    if (score >= 88) return "is-pass";
    if (score >= 76) return "is-review";
    return "is-risk";
  }

  function validationCheck(name, passed, score, detail) {
    return {
      name,
      passed,
      score: clamp(Math.round(score), 0, 100),
      detail
    };
  }



  function ValidationEngine(room) {
    const design = engineeringDesign(room);
    const rackCapacity = room.rackQty * 12;
    const upsCapacity = room.upsQty * 1500;
    const assumptions = roomAssumptions(room);

    // Dynamic checks aligning with gap analysis criteria
    const displayPass = room.display === "none" || design.display.visibilityPass;
    const dspPass = !design.dspRequired || room.dspQty > 0;
    const ampPass = room.speakerQty === 0 || design.amplifierWatts >= room.speakerQty * (room.speaker === "pa" ? 180 : room.speaker === "wall" ? 60 : 35);
    const rackPass = room.rackQty === 0 || rackCapacity >= design.infrastructure.rackUnits;
    const upsPass = room.upsQty === 0 || upsCapacity >= design.infrastructure.upsVa;

    // Cable run length check (warn on HDMI degradation > 45 ft)
    const cableRunFt = design.infrastructure.cableFt / Math.max(1, design.infrastructure.endpoints);
    const cablingPass = cableRunFt <= 45 || room.networkQty > 0;

    // PoE Switch Load budget check (Class 3 is 15.4W, Class 4 is 30W)
    let totalPoeWatts = 0;
    if (room.camera === "ai") totalPoeWatts += room.cameraQty * 15.4;
    if (room.camera === "ptz" || room.camera === "multi") totalPoeWatts += room.cameraQty * 30.0;
    if (room.microphone === "ceiling") totalPoeWatts += room.micQty * 15.4;
    if (room.schedulerQty > 0) totalPoeWatts += room.schedulerQty * 7.0;
    if (room.controllerQty > 0) totalPoeWatts += room.controllerQty * 15.4;
    const switchPoeBudget = room.networkQty * 190.0;
    const poeBudgetPass = room.networkQty === 0 || switchPoeBudget >= totalPoeWatts;

    // Acoustic RT60 Echo risk warning
    const acousticPass = assumptions.rt60 <= 0.85;

    const checks = [
      validationCheck("Display visibility", displayPass, displayPass ? 90 : 60, displayPass ? `Viewing distance is within safety limits for ${room.displaySize} inch display.` : `Farthest viewer exceeds readable distance. Recommend active LED or projector setup.`),
      validationCheck("Speaker coverage", room.speaker === "none" || design.speaker.confidence >= 78, design.speaker.confidence || 92, design.speaker.justification || "No room speakers selected."),
      validationCheck("DSP capacity", dspPass, dspPass ? 90 : 62, dspPass ? `${room.dspQty} DSP planned for input processing.` : "DSP processing required for dynamic AEC and audio mixing."),
      validationCheck("Amplifier headroom", ampPass, ampPass ? 92 : 68, ampPass ? "Amplifier contains correct safety wattage headroom." : "Underpowered speaker amplifier config. Safety headroom is below 25%."),
      validationCheck("Rack space", rackPass, rackPass ? 90 : 70, rackPass ? `Rack space is sufficient for planned components.` : `Rack space overloaded: planned RU (${design.infrastructure.rackUnits}U) exceeds rack capacity.`),
      validationCheck("UPS margin", upsPass, upsPass ? 90 : 72, upsPass ? "UPS capacity contains correct backup load margin." : "UPS capacity overloaded by planned hardware wattage draw."),
      validationCheck("Cabling attenuation", cablingPass, cablingPass ? 88 : 65, cablingPass ? "Average endpoint cable runs are within signal integrity limits." : "Long passive HDMI run detected. High frequency degradation risk. Recommend HDBaseT extender kit."),
      validationCheck("PoE load limit", poeBudgetPass, poeBudgetPass ? 90 : 60, poeBudgetPass ? "PoE switch power budget is within continuous load limits." : `PoE budget overloaded: planned load (${Math.round(totalPoeWatts)}W) exceeds switch PoE limit (${switchPoeBudget}W).`),
      validationCheck("Acoustic echo risk", acousticPass, acousticPass ? 90 : 55, acousticPass ? `RT60 reverb time (${assumptions.rt60.toFixed(2)}s) is within guidelines.` : `High RT60 reverb time (${assumptions.rt60.toFixed(2)}s). Echo risk. Recommend acoustic panels or AEC DSP algorithm.`)
    ];

    if (isMegaVenue(room)) {
      checks.unshift(validationCheck("Mega venue review", false, 72, "Capacity or dimensions exceed standard calculator range. Treat this as budgetary direction only; final BOQ requires site survey, drawings, rigging, power and acoustic validation."));
    }

    const score = Math.round(checks.reduce((sum, check) => sum + check.score, 0) / checks.length);
    return {
      score,
      label: isMegaVenue(room) ? "Mega venue site review required" : validationLabel(score),
      statusClass: isMegaVenue(room) ? "is-review" : validationClass(score),
      checks,
      summary: `${isMegaVenue(room) ? "Mega venue site review required" : validationLabel(score)}: ${checks.filter((check) => check.passed).length}/${checks.length} checks passed.`
    };
  }

  function calculateSubScores(room, design, validation, simulatedFailures) {
    const fails = simulatedFailures || { dsp: false, power: false, network: false };
    let engineering = validation.score;
    let reliability = 90;
    let scalability = 85;
    let coverage = Math.round(design.speaker.confidence * 0.5 + design.microphone.confidence * 0.5);

    // Apply simulation failure penalties
    if (fails.dsp && room.dspQty > 0) {
      engineering -= 40;
      reliability -= 50;
      coverage -= 60;
    }
    if (fails.power) {
      engineering -= 50;
      reliability -= 80;
      scalability -= 40;
    }
    if (fails.network && room.networkQty > 0) {
      engineering -= 35;
      reliability -= 45;
      scalability -= 50;
    }

    // Adjust sub-scores based on engineering parameters
    if (room.upsQty > 0) reliability += 8;
    if (room.rackQty > 0) {
      const rackSpaceRemaining = (room.rackQty * 12) - design.infrastructure.rackUnits;
      if (rackSpaceRemaining > 4) scalability += 10;
    }
    if (room.networkQty > 0) scalability += 5;
    if (room.display === "none") coverage -= 10;

    engineering = clamp(engineering, 0, 100);
    reliability = clamp(reliability, 0, 100);
    scalability = clamp(scalability, 0, 100);
    coverage = clamp(coverage, 0, 100);

    const overall = Math.round((engineering + reliability + scalability + coverage) / 4);
    return { engineering, reliability, scalability, coverage, overall };
  }

  function generateAutoRecommendations(room, design, validation, simulatedFailures) {
    const fails = simulatedFailures || { dsp: false, power: false, network: false };
    const list = [];
    const assumptions = roomAssumptions(room);

    if (fails.dsp) {
      list.push({ severity: "Critical", text: "DSP has failed. Backup routing bypass is required to keep basic mic/speaker functions running.", action: "Route local analog signals directly to the amplifier inputs." });
    }
    if (fails.power) {
      list.push({ severity: "Critical", text: "Primary electrical breaker has tripped. Rack cooling fan and displays are offline.", action: "Switch power line input to the secondary redundant circuit immediately." });
    }
    if (fails.network) {
      list.push({ severity: "Warning", text: "Primary network switch is offline. VoIP/Dante network streams are disconnected.", action: "Plug Dante cables into the secondary backup switch port interface." });
    }

    if (assumptions.rt60 > 0.85) {
      list.push({ severity: "Warning", text: `High reverberation time (${assumptions.rt60.toFixed(2)}s) detected. High echo risk.`, action: "Add wall acoustic absorption treatment or use ceiling mic AEC processing." });
    }
    if (design.amplifierWatts > 450) {
      list.push({ severity: "Warning", text: "High wattage speaker load requires multiple amplifier channels.", action: "Upgrade to a multi-channel modular amplifier chassis." });
    }
    if (room.display !== "none" && !design.display.visibilityPass) {
      list.push({ severity: "Warning", text: `Farthest viewing distance exceeds readability limits for ${room.displaySize} inch screen size.`, action: "Increase screen size or replace commercial display with a projection rig." });
    }
    if (room.micQty > 6 && room.dspQty === 0) {
      list.push({ severity: "Critical", text: "Multiple mic zones selected without a digital audio processor.", action: "Add 1 qty AEC DSP Mixer to manage room mixing and prevent feedback loops." });
    }
    if (list.length === 0) {
      list.push({ severity: "Info", text: "All systems are normal. Room config satisfies standard CTS-D AV design guidelines.", action: "Review PDF proposal for client budgeting." });
    }
    return list;
  }

  function buildProject(state) {
    const actualState = state || {};
    const roomsList = actualState.rooms || [];
    const simulatedFailures = actualState.simulatedFailures || { dsp: false, power: false, network: false };
    
    const rooms = roomsList.map((room, index) => {
      const boq = buildRoomBoq(room);
      const subtotal = totalBand(boq);
      const validation = ValidationEngine(room);
      const design = engineeringDesign(room);
      const scores = calculateSubScores(room, design, validation, simulatedFailures);
      const recommendations = generateAutoRecommendations(room, design, validation, simulatedFailures);
      return { index, room, boq, subtotal, validation, scores, recommendations, design };
    });
    const subtotal = rooms.reduce((acc, entry) => addBand(acc, entry.subtotal, 1), [0, 0]);
    const gst = [Math.round(subtotal[0] * CONFIG.gstRate), Math.round(subtotal[1] * CONFIG.gstRate)];
    const total = [subtotal[0] + gst[0], subtotal[1] + gst[1]];
    const maxTimeline = rooms.reduce((max, entry) => Math.max(max, roomPreset(entry.room.roomType).timeline), 0);
    return {
      rooms,
      subtotal,
      gst,
      total,
      estimateClass: estimateClass(total),
      timeline: `${Math.max(5, maxTimeline)}-${Math.max(8, maxTimeline + Math.ceil(roomsList.length / 2) * 2)} working days after final PO/site readiness`
    };
  }

  function select(name, value, items, attrs) {
    return `<select name="${escapeHtml(name)}" ${attrs || ""}>${items.map((item) => `<option value="${escapeHtml(item.id)}" ${String(item.id) === String(value) ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}</select>`;
  }

  function stepper(name, value, min, max) {
    return `
      <div class="av-builder-stepper" data-stepper>
        <button type="button" data-step="${escapeHtml(name)}" data-delta="-1" aria-label="Decrease">-</button>
        <input name="${escapeHtml(name)}" type="number" min="${min}" max="${max}" value="${escapeHtml(value)}" inputmode="numeric">
        <button type="button" data-step="${escapeHtml(name)}" data-delta="1" aria-label="Increase">+</button>
      </div>
    `;
  }



  // Live Dashboard Visualizer & Failure Simulation Indicators
  function scoreClass(val) {
    if (val >= 88) return "is-pass";
    if (val >= 76) return "is-review";
    return "is-risk";
  }

  function dashboardVisuals(activeRoomData, simulatedFailures) {
    const scores = activeRoomData.scores;
    const recs = activeRoomData.recommendations;
    const validation = activeRoomData.validation;
    const design = activeRoomData.design;
    const room = activeRoomData.room;
    
    const displayOnly = isDisplayOnlyRoom(room);
    const dspModel = ProductLibrary.dsp;
    const swModel = ProductLibrary.networkSwitch;
    
    const compChecks = [
      { name: "AEC Loop (DSP vs VC)", passed: !design.dspRequired || room.dspQty > 0, reason: room.dspQty > 0 ? "AEC algorithm active." : "Echo hazard during VC call." },
      { name: "Digital Dante Signal Mics", passed: room.microphone !== "ceiling" || dspModel.protocols.includes("Dante"), reason: "Dante protocol supported." },
      { name: "PoE Class switch budget", passed: room.networkQty > 0, reason: room.networkQty > 0 ? "Managed PoE Switch allocated." : "Missing PoE Switch." }
    ];

    return `
      <!-- Failure Simulation Dashboard -->
      <div class="av-failure-sim-panel">
        <div class="sim-header">
          <i class="fas fa-tower-broadcast sim-icon"></i>
          <div>
            <span class="sim-title">Live Engineering Simulation Controls</span>
            <p class="sim-description">Simulate real-world AV system failures in real-time. Test how backup routing, redundant power grids, and network drops affect your overall system reliability score.</p>
          </div>
        </div>
        <div class="sim-toggles">
          <label class="sim-toggle-btn ${simulatedFailures.dsp ? "is-active" : ""}">
            <input type="checkbox" data-sim-failure="dsp" ${simulatedFailures.dsp ? "checked" : ""}>
            <span class="indicator-dot"></span>
            <i class="fas fa-microchip"></i>
            <span>Simulate DSP Failure</span>
          </label>
          <label class="sim-toggle-btn ${simulatedFailures.power ? "is-active" : ""}">
            <input type="checkbox" data-sim-failure="power" ${simulatedFailures.power ? "checked" : ""}>
            <span class="indicator-dot"></span>
            <i class="fas fa-plug"></i>
            <span>Simulate Power Trip</span>
          </label>
          <label class="sim-toggle-btn ${simulatedFailures.network ? "is-active" : ""}">
            <input type="checkbox" data-sim-failure="network" ${simulatedFailures.network ? "checked" : ""}>
            <span class="indicator-dot"></span>
            <i class="fas fa-network-wired"></i>
            <span>Simulate Switch Loss</span>
          </label>
        </div>
      </div>

      <!-- Live Design Scores -->
      <div class="av-scores-container">
        <span class="panel-subtitle">Live Design Metrics (CTS-D Index)</span>
        <div class="av-scores-grid">
          <div class="score-card ${scoreClass(scores.engineering)}">
            <b>${scores.engineering}%</b>
            <span>Engineering</span>
          </div>
          <div class="score-card ${scoreClass(scores.reliability)}">
            <b>${scores.reliability}%</b>
            <span>Reliability</span>
          </div>
          <div class="score-card ${scoreClass(scores.scalability)}">
            <b>${scores.scalability}%</b>
            <span>Scalability</span>
          </div>
          <div class="score-card ${scoreClass(scores.coverage)}">
            <b>${scores.coverage}%</b>
            <span>Coverage</span>
          </div>
          <div class="score-card is-overall ${scoreClass(scores.overall)}">
            <b>${scores.overall}%</b>
            <span>Overall Design Score</span>
          </div>
        </div>
      </div>

      <!-- Live Warnings & Recommendations -->
      <div class="av-warnings-container">
        <span class="panel-subtitle">Active Advisor Warnings (${recs.length})</span>
        <div class="av-warnings-list">
          ${recs.map((item) => `
            <div class="warning-item is-${item.severity.toLowerCase()}">
              <div class="warning-header">
                <i class="fas fa-${item.severity === "Critical" ? "exclamation-circle" : item.severity === "Warning" ? "exclamation-triangle" : "info-circle"}" aria-hidden="true"></i>
                <b>${item.severity}</b>
              </div>
              <p>${escapeHtml(item.text)}</p>
              <div class="warning-fix">
                <span>Suggested Solution:</span>
                <p>${escapeHtml(item.action)}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Calculated Engineering Parameters Checklist -->
      <div class="av-checklist-container">
        <span class="panel-subtitle">Calculated Parameters Check</span>
        <div class="av-checklist-list">
          <div class="checklist-item">
            <span>Acoustic Reverberation (RT60)</span>
            <b>${roomAssumptions(room).rt60.toFixed(2)} seconds</b>
          </div>
          <div class="checklist-item">
            <span>AV Equipment Continuous Draw</span>
            <b>${Math.round(design.infrastructure.upsVa * 0.8)} Watts</b>
          </div>
          <div class="checklist-item">
            <span>Redundant UPS Requirement</span>
            <b>${design.infrastructure.upsVa} VA</b>
          </div>
          <div class="checklist-item">
            <span>Est. Thermal Heat Load</span>
            <b>${Math.round(design.infrastructure.upsVa * 3.412)} BTU/hr</b>
          </div>
          <div class="checklist-item">
            <span>HDMI / Digital Signal Endpoints</span>
            <b>${design.infrastructure.endpoints} connected</b>
          </div>
        </div>
      </div>

      <!-- Live System Interface Protocol Checks -->
      <div class="av-matrix-container">
        <span class="panel-subtitle">Device Protocol Validation Checks</span>
        <div class="av-matrix-list">
          ${compChecks.map((check) => `
            <div class="matrix-item ${check.passed ? "is-pass" : "is-fail"}">
              <i class="fas fa-${check.passed ? "check-circle" : "times-circle"}" aria-hidden="true"></i>
              <span>${escapeHtml(check.name)}</span>
              <small>${escapeHtml(check.reason)}</small>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Sleek Consumer Guide Panel -->
      <details class="av-help-guide-panel">
        <summary><i class="fas fa-lightbulb"></i> <span>Understanding your AV metrics (Simple Guide)</span></summary>
        <div class="help-guide-content">
          <article>
            <b>Acoustic Reverberation (RT60)</b>
            <p>How long sound echoes in the room. A higher number means voice calls will sound echoed. Adding wall panels or selecting DSP fixes this.</p>
          </article>
          <article>
            <b>AV Power Draw &amp; UPS</b>
            <p>The total electrical power needed. The UPS acts as an emergency battery backup to keep your systems running during power cuts.</p>
          </article>
          <article>
            <b>Thermal Heat Load (BTU/hr)</b>
            <p>The heat generated by the AV equipment. Your AC team uses this to keep the room cool and comfortable.</p>
          </article>
          <article>
            <b>AEC Loop (Echo Cancellation)</b>
            <p>Stops your voice from looping back as an annoying echo to the remote callers on the other side of the meeting.</p>
          </article>
          <article>
            <b>Digital Dante Audio</b>
            <p>Sends crystal-clear digital microphone signals over standard internet cables, avoiding thick analog wiring mess.</p>
          </article>
          <article>
            <b>PoE (Power over Ethernet)</b>
            <p>Powers devices (like wall touch panels) directly through the network cable, eliminating the need for extra wall power plugs.</p>
          </article>
        </div>
      </details>
    `;
  }

  function roomTabs(state) {
    return `
      <div class="av-room-tabs" role="tablist" aria-label="Configured rooms">
        ${state.rooms.map((room, index) => `
          <button type="button" class="${index === state.activeRoom ? "is-active" : ""}" data-room-tab="${index}">
            <b>${index + 1}</b><span>${escapeHtml(room.designation || label(CONFIG.rooms, room.roomType))}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function roomEditor(state) {
    const active = state.rooms[state.activeRoom] || state.rooms[0];
    const isManual = manualMap(active);
    const purpose = purposePreset(active.purpose);
    const detailsId = `details-toggle-${state.activeRoom}`;
    return `
      <div class="av-room-editor" data-room-editor-container>
        <div class="av-editor-header">
          <label class="av-editor-title-field">Room designation / label
            <input name="designation" value="${escapeHtml(active.designation)}" placeholder="Example: Boardroom 1">
          </label>
          <button class="btn-secondary av-advisor-trigger" type="button" data-advisor-trigger-btn>Advisor suggestions</button>
        </div>
        <div class="av-builder-form-grid">
          <label>Room purpose
            ${select("purpose", active.purpose, CONFIG.purposes)}
          </label>
          <label>Meeting standard
            ${select("platform", active.platform, CONFIG.platforms)}
          </label>
        </div>
        <div class="av-builder-dimensions">
          <label>Length (ft)
            ${stepper("length", active.length, 6, 220)}
          </label>
          <label>Width (ft)
            ${stepper("width", active.width, 6, 160)}
          </label>
          <label>Height (ft)
            ${stepper("height", active.height, 7, 40)}
          </label>
        </div>
        <div class="av-builder-form-grid">
          <label class="av-editor-checkbox">
            <input type="checkbox" name="autoCapacity" ${active.autoCapacity ? "checked" : ""}>
            <span>Auto calculate capacity</span>
          </label>
          <label class="${active.autoCapacity ? "is-disabled" : ""}">Room capacity (seats)
            ${stepper("capacity", active.capacity, 1, 2000)}
          </label>
        </div>
        <div class="av-builder-form-grid">
          <label>Active display
            ${select("display", active.display, CONFIG.displays)}
          </label>
          <label class="${active.display === "none" ? "is-disabled" : ""}">Display size (diagonal)
            ${select("displaySize", active.displaySize, CONFIG.displaySizes, active.display === "none" ? "disabled" : "")}
          </label>
        </div>
        <div class="av-builder-form-grid">
          <label>Microphones
            ${select("microphone", active.microphone, CONFIG.microphones)}
          </label>
          <label>Speakers
            ${select("speaker", active.speaker, CONFIG.speakers)}
          </label>
        </div>
        <div class="av-builder-form-grid">
          <label>Camera Type
            ${select("camera", active.camera, CONFIG.cameras)}
          </label>
          <label>Target Budget Class
            ${select("budgetTier", active.budgetTier || 'standard', [
              { id: 'value', label: 'Economy Tier (Value AV)' },
              { id: 'standard', label: 'Professional Tier (Standard)' },
              { id: 'premium', label: 'Premium Tier (Luxury)' }
            ])}
          </label>
        </div>
        <div class="av-editor-expandable">
          <button type="button" class="btn-text" data-expand-details aria-controls="${detailsId}" aria-expanded="${state.fineTuneOpen}">
            <span>Fine-tune equipment quantities</span>
            <i class="fas fa-chevron-${state.fineTuneOpen ? "up" : "down"}" aria-hidden="true"></i>
          </button>
          <div class="av-editor-details-content" id="${detailsId}" ${state.fineTuneOpen ? "" : "hidden"}>
            <p class="av-fine-tune-intro">Manually adjust quantities below. Overriden values are marked as <strong>Client selected</strong> in the BOQ matrix.</p>
            <div class="av-builder-qty-grid">
              <div>
                <label class="av-stepper-label">Displays
                  <span class="av-status-indicator ${isManual.displayQty ? "is-manual" : "is-auto"}">${isManual.displayQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("displayQty", active.displayQty, 0, 8)}
              </div>
              <div>
                <label class="av-stepper-label">Cameras
                  <span class="av-status-indicator ${isManual.cameraQty ? "is-manual" : "is-auto"}">${isManual.cameraQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("cameraQty", active.cameraQty, 0, 6)}
              </div>
              <div>
                <label class="av-stepper-label">Microphones
                  <span class="av-status-indicator ${isManual.micQty ? "is-manual" : "is-auto"}">${isManual.micQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("micQty", active.micQty, 0, 24)}
              </div>
              <div>
                <label class="av-stepper-label">Speakers
                  <span class="av-status-indicator ${isManual.speakerQty ? "is-manual" : "is-auto"}">${isManual.speakerQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("speakerQty", active.speakerQty, 0, 40)}
              </div>
              <div>
                <label class="av-stepper-label">AEC DSPs
                  <span class="av-status-indicator ${isManual.dspQty ? "is-manual" : "is-auto"}">${isManual.dspQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("dspQty", active.dspQty, 0, 3)}
              </div>
              <div>
                <label class="av-stepper-label">Rack Qty
                  <span class="av-status-indicator ${isManual.rackQty ? "is-manual" : "is-auto"}">${isManual.rackQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("rackQty", active.rackQty, 0, 3)}
              </div>
              <div>
                <label class="av-stepper-label">UPS Qty
                  <span class="av-status-indicator ${isManual.upsQty ? "is-manual" : "is-auto"}">${isManual.upsQty ? "Client" : "Auto"}</span>
                </label>
                ${stepper("upsQty", active.upsQty, 0, 3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }



  function sourceGuide() {
    return `
      <div class="av-source-guide">
        <span class="is-auto"><b>GPSPL</b> SYSTEM RECOMMENDED</span>
        <span class="is-manual"><b>CLIENT</b> MANUALLY SELECTED</span>
      </div>
    `;
  }

  function roomPlanList(project) {
    return `
      <div class="av-plan-list">
        ${project.rooms.map((entry) => `
          <article class="av-plan-card">
            <header>
              <div>
                <b>${escapeHtml(entry.room.designation)}</b>
                <span>${escapeHtml(label(CONFIG.rooms, entry.room.roomType))} | ${escapeHtml(entry.room.capacity)} seats | ${escapeHtml(area(entry.room))} sq. ft.</span>
              </div>
            </header>
            <div class="av-validation-pill ${escapeHtml(entry.validation.statusClass)}">${escapeHtml(entry.validation.label)} - ${escapeHtml(entry.validation.score)}%</div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function costBrief(project) {
    return `
      <div class="av-cost-brief" style="display: none !important;">
        <div>
          <span>Equipment subtotal (Pre-GST)</span>
          <b>${escapeHtml(bandText(project.subtotal))}</b>
        </div>
        <div>
          <span>Integrated tax estimate (@ 18% GST)</span>
          <b>${escapeHtml(bandText(project.gst))}</b>
        </div>
      </div>
    `;
  }

  function engineeringCards(project, activeRoomIndex) {
    const entry = project.rooms[activeRoomIndex] || project.rooms[0];
    if (!entry) return "";
    return `
      <div class="av-engineering-cards">
        <div class="av-eng-card">
          <h4>${escapeHtml(entry.room.designation)} checks</h4>
          <div class="av-eng-card-grid">
            ${entry.validation.checks.map((check) => `
              <div class="av-check-row">
                <span class="av-check-status ${check.passed ? "is-pass" : "is-fail"}">${check.passed ? "Pass" : "Review"}</span>
                <div class="av-check-body">
                  <b>${escapeHtml(check.name)} (${check.score}%)</b>
                  <p>${escapeHtml(check.detail)}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function projectTable(project, activeRoomIndex) {
    const entry = project.rooms[activeRoomIndex] || project.rooms[0];
    if (!entry) return "";
    return `
      <div class="av-room-detail-list">
        <div class="av-room-detail-card-standalone">
          <header class="av-room-detail-header">
            <h3>Detailed equipment list: ${escapeHtml(entry.room.designation)}</h3>
            <b>${escapeHtml(bandText([Math.round(entry.subtotal[0] * 1.18), Math.round(entry.subtotal[1] * 1.18)]))}</b>
          </header>
          <div class="av-room-detail-grid">
            ${entry.boq.map((item) => `
              <article>
                <span>${escapeHtml(customerGroup(item))}</span>
                <b>${escapeHtml(simpleComponent(item))}</b>
                <p>${escapeHtml(customerWhy(item))}</p>
                ${serviceScopeHtml(item)}
                <strong>${escapeHtml(sourceLabel(item))} | ${escapeHtml(itemQuantityLabel(item))} | ${escapeHtml(confidenceLabel(item.confidence))} (${escapeHtml(item.confidence)}%)</strong>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function itemQuantityValue(item) {
    if (!item.serviceScope) return item.qty;
    return `${item.serviceScope.technicianDays} tech + ${item.serviceScope.engineerDays} eng days`;
  }

  function roomInsight(entry) {
    const room = entry.room;
    if (room.roomType === "server") return "IT server rack ventilation configuration validated.";
    if (room.roomType === "reception") return "Front desk display and local CCTV points configured.";
    return `${entry.validation.checks.filter((check) => check.passed).length}/${entry.validation.checks.length} engineering checks passed. Ready for deployment.`;
  }

  function pdfSafe(value) {
    return String(value || "").replace(/[<>"/\\|:*?]/g, "").trim();
  }

  function clientProposalPdf(state, project, lead) {
    const preparedFor = lead.name || "Client Name";
    const clientCompany = lead.company || "Company Name";
    const clientCity = lead.city || "Project Location";
    const logoUrl = "/images/gpspl-logo.png";
    const dateString = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const proposalNo = `GPSPL-AV-2026-${Date.now().toString(10).slice(-4)}`;
    
    const breakdown = {
      hardware: [0, 0],
      wiring: [0, 0],
      installation: [0, 0],
      programming: [0, 0]
    };

    const rows = project.rooms.flatMap((entry) => {
      return entry.boq.map((item) => {
        const rowBand = item.band;
        if (item.category === "Cabling") {
          breakdown.wiring[0] += rowBand[0];
          breakdown.wiring[1] += rowBand[1];
        } else if (item.category === "Services") {
          breakdown.installation[0] += item.costSplit?.installation[0] || (rowBand[0] * 0.6);
          breakdown.installation[1] += item.costSplit?.installation[1] || (rowBand[1] * 0.6);
          breakdown.programming[0] += item.costSplit?.programming[0] || (rowBand[0] * 0.4);
          breakdown.programming[1] += item.costSplit?.programming[1] || (rowBand[1] * 0.4);
        } else {
          breakdown.hardware[0] += rowBand[0];
          breakdown.hardware[1] += rowBand[1];
        }

        return `
          <tr>
            <td><b>${escapeHtml(entry.room.designation)}</b></td>
            <td><span>${escapeHtml(item.category)}</span></td>
            <td><b>${escapeHtml(item.component)}</b></td>
            <td>${escapeHtml(pdfNote(item))}</td>
            <td><span class="badge ${item.source === "Client selected" ? "is-manual" : "is-auto"}">${escapeHtml(sourceLabel(item))}</span></td>
            <td><b>${escapeHtml(pdfQuantityLabel(item))}</b></td>
            <td><span>${item.confidence}%</span></td>
            <td><b>${escapeHtml(bandText(rowBand))}</b></td>
          </tr>
        `;
      });
    }).join("");

    const roomSummary = project.rooms.map((entry) => {
      const audio = audioPlan(entry.room);
      const serverPlan = entry.room.roomType === "server";
      const receptionPlan = entry.room.roomType === "reception";
      const displayOnly = isDisplayOnlyRoom(entry.room);
      const supportLine = displayOnly
        ? entry.room.display === "led" ? "LED processor mapping, source scaling and brightness/input testing" : "Display mounting, source testing and image calibration"
        : serverPlan ? "Rack, UPS, network and CCTV planning" : receptionPlan ? "Display, IT device and CCTV planning" : audio.amplifier;
      return `
        <article class="room-summary-card">
          <div class="card-head">
            <b>${escapeHtml(entry.room.designation)}</b>
            <span>${escapeHtml(label(CONFIG.rooms, entry.room.roomType))} | ${escapeHtml(entry.room.capacity)} seats</span>
          </div>
          <p>
            <strong>Status: ${escapeHtml(entry.validation.label)} (${escapeHtml(entry.validation.score)}%)</strong><br>
            • ${escapeHtml(roomInsight(entry))}<br>
            • ${escapeHtml(supportLine)}
          </p>
        </article>
      `;
    }).join("");

    const baseTitle = `GPSPL_AV_Proposal_${pdfSafe(preparedFor).replace(/\s+/g, "_")}_${proposalNo}`;

    return `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(baseTitle)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #0f172a;
            margin: 0;
            background: #f1f5f9;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .pdf-container {
            max-width: 842px; /* Standard A4 Width */
            margin: 0 auto;
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .pdf-page {
            position: relative;
            padding: 20mm;
            min-height: 297mm; /* Standard A4 Height */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #ffffff;
            page-break-after: always;
            break-after: page;
          }
          
          /* Cover Page */
          .cover-page {
            background: #0f172a;
            color: #ffffff;
            justify-content: space-between;
          }
          .cover-inner {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
          }
          .cover-top {
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 20px;
          }
          .cover-logo {
            width: 70px;
            height: 70px;
            object-fit: contain;
            background: #ffffff;
            border-radius: 12px;
            padding: 8px;
          }
          .cover-brand strong {
            display: block;
            font-size: 16px;
            letter-spacing: 0.05em;
            color: #ffffff;
            font-weight: 800;
          }
          .cover-brand span {
            font-size: 12px;
            color: #94a3b8;
            font-weight: 600;
          }
          .cover-middle {
            margin: 60px 0;
          }
          .cover-eyebrow {
            font-size: 12px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #38bdf8; /* sky blue */
            display: block;
            margin-bottom: 12px;
          }
          .cover-title {
            font-size: 38px;
            line-height: 1.15;
            font-weight: 900;
            color: #ffffff;
            margin: 0 0 16px 0;
            letter-spacing: -0.02em;
          }
          .cover-subtitle {
            font-size: 15px;
            color: #94a3b8;
            margin: 0;
            max-width: 600px;
            font-weight: 500;
          }
          .cover-meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 40px;
          }
          .meta-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .meta-item span {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            font-weight: 800;
          }
          .meta-item strong {
            font-size: 14px;
            color: #f8fafc;
            font-weight: 700;
          }
          .cover-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
          }
          .confidential-badge {
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: #ef4444;
            border: 1px solid #ef4444;
            padding: 6px 12px;
            border-radius: 6px;
          }
          
          /* Repeating Page Header / Footer */
          .pdf-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
            margin-bottom: 24px;
            font-size: 11px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .pdf-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 2px solid #e2e8f0;
            padding-top: 10px;
            margin-top: 24px;
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .pdf-page-title {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            margin: 0 0 20px 0;
            letter-spacing: -0.01em;
          }
          
          /* Exec Summary */
          .exec-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .exec-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
          }
          .exec-card h3 {
            margin: 0 0 12px 0;
            font-size: 14px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #0f172a;
          }
          .exec-card p {
            margin: 0;
            font-size: 13px;
            color: #334155;
            line-height: 1.6;
            font-weight: 600;
          }
          .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 16px;
          }
          .kpi-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            text-align: center;
          }
          .kpi-card span {
            font-size: 10px;
            color: #64748b;
            font-weight: 800;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
          }
          .kpi-card b {
            font-size: 13px;
            color: #0f172a;
            font-weight: 900;
          }
          .kpi-total-box {
            background: #0f172a;
            color: #ffffff;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .kpi-total-box span {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            color: #38bdf8;
            letter-spacing: 0.05em;
          }
          .kpi-total-box b {
            font-size: 18px;
            font-weight: 900;
          }
          .exec-metrics-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          }
          .metric-index-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 14px;
            text-align: center;
            background: #ffffff;
          }
          .metric-index-card span {
            font-size: 10px;
            color: #64748b;
            font-weight: 800;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
          }
          .metric-index-card b {
            font-size: 20px;
            font-weight: 900;
            color: #0f172a;
          }
          .roadmap-box {
            background: #f0f9ff;
            border-color: #bae6fd;
          }
          .roadmap-box h3 {
            color: #0369a1;
          }
          .roadmap-box p {
            color: #0369a1;
          }
          
          /* Rooms Summary list */
          .rooms-summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .room-summary-card {
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 14px;
            background: #f8fafc;
          }
          .room-summary-card .card-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
          }
          .room-summary-card b {
            font-size: 13px;
            color: #0f172a;
          }
          .room-summary-card span {
            font-size: 11px;
            color: #64748b;
            font-weight: 700;
          }
          .room-summary-card p {
            margin: 0;
            font-size: 11px;
            color: #475569;
            line-height: 1.45;
            font-weight: 600;
          }

          /* BOQ Tables */
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
            margin-bottom: 16px;
            page-break-inside: auto;
          }
          tr {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 8px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background: #0f172a;
            color: #ffffff;
            font-size: 9px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 800;
          }
          td b {
            color: #0f172a;
          }
          td span {
            color: #475569;
            font-weight: 600;
          }
          /* Row Alternating Colors */
          tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          .badge {
            display: inline-block;
            font-size: 8px;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .badge.is-auto {
            background: #e2e8f0;
            color: #475569;
          }
          .badge.is-manual {
            background: #fee2e2;
            color: #ef4444;
          }
          
          /* Disclaimer Page */
          .disclaimer-box {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .disclaimer-box h3 {
            margin: 0 0 10px 0;
            font-size: 13px;
            color: #b45309;
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 0.05em;
          }
          .disclaimer-box p {
            margin: 0;
            font-size: 11px;
            color: #b45309;
            line-height: 1.5;
            font-weight: 600;
          }
          .print-btn-bar {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            padding: 20px;
          }
          .print-btn {
            background: #0f172a;
            color: #ffffff;
            border: 0;
            border-radius: 10px;
            padding: 12px 24px;
            font-size: 13px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(15,23,42,0.15);
            transition: all 0.2s ease;
          }
          .print-btn:hover {
            background: #1e293b;
          }

          @media print {
            body {
              background: #ffffff;
              padding: 0;
              margin: 0;
            }
            .pdf-container {
              max-width: none;
              box-shadow: none;
            }
            .pdf-page {
              page-break-after: always !important;
              break-after: page !important;
              min-height: 296mm; /* Exactly fits standard A4 with margins */
              padding: 15mm;
            }
            .print-btn-bar {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="pdf-container">
          <!-- PAGE 1: COVER PAGE -->
          <div class="pdf-page cover-page">
            <div class="cover-inner">
              <div class="cover-top">
                <img src="${escapeHtml(logoUrl)}" class="cover-logo" alt="GPSPL logo">
                <div class="cover-brand">
                  <strong>GLOBAL PERIPHERAL SOLUTIONS PVT. LTD.</strong>
                  <span>Enterprise technology integrators since 1997</span>
                </div>
              </div>
              <div class="cover-middle">
                <span class="cover-eyebrow">Enterprise AV Design &amp; Technology BOQ</span>
                <h1 class="cover-title">AV Infrastructure &amp; Collaboration Proposal</h1>
                <p class="cover-subtitle">Custom engineered solution prepared for ${escapeHtml(preparedFor)} based on site specifications and capacity design parameters.</p>
              </div>
              <div class="cover-meta-grid">
                <div class="meta-item"><span>Prepared For</span><strong>${escapeHtml(preparedFor)}</strong></div>
                <div class="meta-item"><span>Company</span><strong>${escapeHtml(clientCompany)}</strong></div>
                <div class="meta-item"><span>Project Location</span><strong>${escapeHtml(clientCity)}</strong></div>
                <div class="meta-item"><span>Proposal Number</span><strong>${proposalNo}</strong></div>
                <div class="meta-item"><span>Date Generated</span><strong>${dateString}</strong></div>
                <div class="meta-item"><span>Target Budget Class</span><strong>${escapeHtml(project.estimateClass)}</strong></div>
                <div class="meta-item"><span>Project Timeline</span><strong>${escapeHtml(project.timeline)}</strong></div>
                <div class="meta-item"><span>Estimated Cost</span><strong>${escapeHtml(bandText(project.total))}</strong></div>
              </div>
              <div class="cover-bottom">
                <div class="confidential-badge">CONFIDENTIAL AV DESIGN</div>
                <div class="qr-code-box">
                  <svg width="50" height="50" viewBox="0 0 100 100" fill="#ffffff">
                    <path d="M5 5h30v30H5zm60 0h30v30H65zM5 65h30v30H5zm60 20h10v10H65zm10-10h10v10H75zm10 10h10v10H85zm0-20h10v10H85zm-10 10h10v10H75z"/>
                    <path d="M15 15h10v10H15zm60 0h10v10H75zM15 75h10v10H15zm35-25h10v10H50zm10 10h10v10H60zm-20 0h10v10H40zm10-20h10v10H50z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="print-btn-bar">
              <button class="print-btn" onclick="window.print()">Download / Save PDF Proposal</button>
            </div>
          </div>

          <!-- PAGE 2: EXECUTIVE SUMMARY -->
          <div class="pdf-page">
            <div class="pdf-header">
              <span>GPSPL AV Proposal</span>
              <span>Proposal No: ${proposalNo}</span>
            </div>
            <div>
              <div class="pdf-page-title">Executive Summary</div>
              <div class="exec-grid">
                <div class="exec-card project-overview">
                  <h3>Project Overview</h3>
                  <p>GPSPL has engineered this comprehensive AV roadmap for <strong>${escapeHtml(clientCompany)}</strong>. The design incorporates <strong>${state.rooms.length} room(s)</strong> configured to optimized specifications. By utilizing standard digital protocols, the setup guarantees high availability, certified meeting security standards, and seamless local presentation capabilities.</p>
                </div>
                <div class="exec-card commercial-estimate">
                  <h3>Commercial Estimate Breakup</h3>
                  <div class="kpi-grid">
                    <div class="kpi-card"><span>Hardware</span><b>${escapeHtml(bandText(breakdown.hardware))}</b></div>
                    <div class="kpi-card"><span>Wiring &amp; Cabling</span><b>${escapeHtml(bandText(breakdown.wiring))}</b></div>
                    <div class="kpi-card"><span>Installation Services</span><b>${escapeHtml(bandText(breakdown.installation))}</b></div>
                    <div class="kpi-card"><span>Programming &amp; Setup</span><b>${escapeHtml(bandText(breakdown.programming))}</b></div>
                  </div>
                  <div class="kpi-total-box">
                    <span>Total Estimated Range (GST-Inclusive)</span>
                    <b>${escapeHtml(bandText(project.total))}</b>
                  </div>
                </div>
              </div>
              <div class="exec-metrics-row">
                <div class="metric-index-card">
                  <span>Engineering Score</span>
                  <b>${project.rooms[0]?.validation?.score || 85}%</b>
                </div>
                <div class="metric-index-card">
                  <span>Reliability Index</span>
                  <b>${project.rooms[0]?.scores?.reliability || 90}%</b>
                </div>
                <div class="metric-index-card">
                  <span>Scalability Index</span>
                  <b>${project.rooms[0]?.scores?.scalability || 85}%</b>
                </div>
                <div class="metric-index-card">
                  <span>Acoustic Coverage</span>
                  <b>${project.rooms[0]?.scores?.coverage || 88}%</b>
                </div>
              </div>
              <div class="exec-card roadmap-box">
                <h3>Future Expansion Roadmap</h3>
                <p>All core components (Dante DSP mixers, active display matrices, and controller systems) have been sized with at least <strong>30% hardware headroom</strong>. This ensures that adding extra display terminals, ceiling mic arrays, or centralized IT rack equipment in future phases will not require replacing core hardware.</p>
              </div>
            </div>
            <div class="pdf-footer">
              <span>Confidential AV Design | Prepared by GPSPL Engineering Platform</span>
              <span>Page 2</span>
            </div>
          </div>

          <!-- PAGE 3: ROOMS SUMMARY -->
          <div class="pdf-page">
            <div class="pdf-header">
              <span>GPSPL AV Proposal</span>
              <span>Proposal No: ${proposalNo}</span>
            </div>
            <div>
              <div class="pdf-page-title">Room Configurations Summary</div>
              <div class="rooms-summary-grid">
                ${roomSummary}
              </div>
            </div>
            <div class="pdf-footer">
              <span>Confidential AV Design | Prepared by GPSPL Platform</span>
              <span>Page 3</span>
            </div>
          </div>

          <!-- PAGE 4 (and onwards): DETAILED BOQ -->
          <div class="pdf-page">
            <div class="pdf-header">
              <span>GPSPL AV Proposal</span>
              <span>Proposal No: ${proposalNo}</span>
            </div>
            <div>
              <div class="pdf-page-title">Preliminary Engineering BOQ Matrix</div>
              <table class="av-builder-table">
                <thead>
                  <tr>
                    <th>Room Designation</th>
                    <th>Category</th>
                    <th>Component Description</th>
                    <th>Engineering Rationale</th>
                    <th>Source</th>
                    <th>Qty</th>
                    <th>Fit Score</th>
                    <th>Budget Range</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
              <div class="disclaimer-box">
                <h3>Engineering Disclaimer &amp; Proposal Basis</h3>
                <p>This is a planning estimate prepared by the GPSPL Automatic Engineering platform. For final commercial binding pricing, a physical site survey, cable routing validation, and brand/model selections must be finalized. Pricing may vary depending on local logistics, mounting conditions, acoustic panels requirements, and manufacturer supply availability.</p>
              </div>
            </div>
            <div class="pdf-footer">
              <span>Confidential AV Design | Prepared by GPSPL Platform</span>
              <span>Page 4</span>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          }
        </script>
      </body>
      </html>
    `;
  }

  function render(root, state) {
    if (!root.dataset.builderInstance) root.dataset.builderInstance = `av-builder-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const project = buildProject(state);
    const active = state.rooms[state.activeRoom] || state.rooms[0];
    const activeRoomData = project.rooms[state.activeRoom] || project.rooms[0];
    const whatsappText = `Hello GPSPL, I need AV BOQ guidance for ${state.rooms.length} room(s). Please help with final equipment selection and site survey.`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${CONFIG.phone}&text=${encodeURIComponent(whatsappText)}&type=phone_number&app_absent=0`;
    const contactUrl = `/contact.html?source=av-boq-designer&rooms=${state.rooms.length}`;

    root.innerHTML = `
      <div class="av-builder">
        <div class="av-builder-panel av-builder-input">
          <div class="av-builder-kicker"><span>Engineering AV BOQ Designer</span><b>Up to ${CONFIG.maxRooms} rooms</b></div>
          <h3>Build a client-ready AV estimate</h3>
          <div class="av-room-count">
            <div>
              <span>Rooms in project</span>
              <b>${state.rooms.length}</b>
            </div>
            <div class="av-builder-stepper">
              <button type="button" data-room-count="-1" aria-label="Remove room">-</button>
              <input type="number" min="1" max="${CONFIG.maxRooms}" value="${state.rooms.length}" data-room-count-input>
              <button type="button" data-room-count="1" aria-label="Add room">+</button>
            </div>
          </div>
          ${roomTabs(state)}
          ${roomEditor(state)}
        </div>

        <aside class="av-builder-panel av-builder-output" aria-live="polite">
          <p class="section-eyebrow">AV Solution Design &amp; Estimate</p>
          <h3>Enterprise AV Design for ${state.rooms.length} Room${state.rooms.length > 1 ? "s" : ""}</h3>
          
          <!-- Locked Turnkey Estimate Callout -->
          <div class="av-builder-estimate-banner" style="background: linear-gradient(135deg, #071526 0%, #1e293b 100%); border: 2px solid rgba(239, 52, 56, 0.4); border-radius: 16px; padding: 20px 22px; margin: 14px 0; color: #ffffff; box-shadow: 0 10px 25px rgba(7,21,38,0.25);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                  <span style="background: rgba(239, 52, 56, 0.2); color: #ef3438; border: 1px solid #ef3438; font-size: 0.72rem; font-weight: 900; padding: 3px 8px; border-radius: 6px; letter-spacing: 0.06em; text-transform: uppercase;">🔒 ESTIMATE LOCKED</span>
                  <span style="font-size: 0.74rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">TURNKEY AV PROJECT ESTIMATE</span>
                </div>
                <strong style="font-size: 1.15rem; font-weight: 900; color: #ffffff; letter-spacing: -0.01em; display: block; margin-bottom: 4px;">WANT TO KNOW FULL TURNKEY COST &amp; ITEMIZED BOQ?</strong>
                <span style="font-size: 0.76rem; color: #22c55e; font-weight: 700; display: block;">✓ INCLUDES EXACT OEM HARDWARE MODELS + CABLING + INSTALLATION + 1-YR SUPPORT</span>
              </div>
              <button class="btn-primary" type="button" data-builder-proposal style="padding: 12px 22px; font-size: 0.88rem; font-weight: 800; border-radius: 10px; box-shadow: 0 4px 14px rgba(239,52,56,0.45); text-transform: uppercase; letter-spacing: 0.04em;">
                <i class="fas fa-file-pdf"></i> DOWNLOAD FULL PROPOSAL &amp; COST PDF
              </button>
            </div>
          </div>

          <div class="av-builder-summary-grid">
            <span><b>Active Room</b>${escapeHtml(active.designation)}</span>
            <span><b>Room Area</b>${escapeHtml(area(active))} sq. ft.</span>
            <span><b>Timeline</b>${escapeHtml(project.timeline)}</span>
            <span><b>Budget Class</b>${escapeHtml(project.estimateClass)}</span>
          </div>

          <!-- Simplified What's Included Card -->
          <div class="av-builder-scope-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 18px; margin-bottom: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
            <h4 style="font-size: 0.92rem; font-weight: 800; color: #071526; margin: 0 0 10px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-check-circle" style="color: #ef3438;"></i> What's Included in This Room Setup:
            </h4>
            <div style="display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 0.82rem; color: #334155; line-height: 1.45;">
              <div style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef3438; font-weight: 900;">•</span> <span><strong>Display:</strong> ${escapeHtml(active.display === 'led' ? 'Active LED Video Wall (0.0mm seamless)' : active.display === 'interactive' ? '4K Interactive Touch Panel (LG / Samsung)' : '4K Non-Glare Commercial Display (Samsung QMC)')}</span></div>
              <div style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef3438; font-weight: 900;">•</span> <span><strong>Camera:</strong> ${escapeHtml(active.camera === 'ptz' ? '4K 12x Optical PTZ Camera (Speaker Voice Tracking)' : active.camera === 'ai' ? '4K AI Auto-Framing Video Bar (Poly / Logitech)' : 'Integrated 4K Camera')}</span></div>
              <div style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef3438; font-weight: 900;">•</span> <span><strong>Microphone &amp; Sound:</strong> ${escapeHtml(active.mic === 'ceiling' ? 'Ceiling Beamforming Mic (Zero table wires)' : 'Tabletop Mics')} + Flush Ceiling Speakers</span></div>
              <div style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef3438; font-weight: 900;">•</span> <span><strong>Audio DSP:</strong> Echo Cancellation (AEC) &amp; AC noise reduction</span></div>
              <div style="display: flex; align-items: flex-start; gap: 8px;"><span style="color: #ef3438; font-weight: 900;">•</span> <span><strong>Turnkey Delivery:</strong> On-Site Mounting, Cabling, Audio Tuning &amp; Handover</span></div>
            </div>
          </div>

          ${sourceGuide()}
          ${roomPlanList(project)}
          
          <!-- Live Interactive Engineering Dashboard Integration -->
          <div class="av-engineering-dashboard">
            ${dashboardVisuals(activeRoomData, state.simulatedFailures)}
          </div>

          <p class="av-builder-note">This is an automated AV design roadmap. The detailed equipment schedule and commercial proposal will be prepared after physical site audit and brand specifications validation.</p>
          <div class="av-builder-final-cta">
            <div>
              <b>Need custom room engineering?</b>
              <span>Share room drawings/photos with GPSPL and our team will validate final quantities, wiring, mounting, warranty and installation scope.</span>
            </div>
            <a class="btn-primary" href="${contactUrl}" data-builder-quote>Contact Our Team</a>
          </div>
          <div class="configurator-cta-row">
            <button class="btn-secondary" type="button" data-builder-proposal>Download Client PDF</button>
            <a class="btn-secondary" href="${whatsappUrl}" target="_blank" rel="noopener" data-builder-whatsapp>Talk to Expert</a>
          </div>
        </aside>
      </div>
      ${leadModal(state, project)}
      ${advisorModal(state)}
    `;

    mountModals(root);
    bindEvents(root, state, project);
  }

  function mountModals(root) {
    const portalId = root.dataset.builderInstance;
    document.querySelectorAll(`[data-builder-portal="${portalId}"]`).forEach((modal) => modal.remove());
    root.querySelectorAll("[data-builder-modal], [data-advisor-modal]").forEach((modal) => {
      modal.setAttribute("data-builder-portal", portalId);
      document.body.appendChild(modal);
    });
  }

  function leadModal(state, project) {
    const validationStatus = project.rooms.map((entry) => `${entry.room.designation}: ${entry.validation.label} (${entry.validation.score}%)`).join(" | ");
    const boqSummary = project.rooms.map((entry) => {
      const keyItems = keyPlanItems(entry).map((item) => `${simpleComponent(item)} ${item.serviceScope ? itemQuantityLabel(item) : item.qty + " qty"}`).join(", ");
      return `${entry.room.designation} - ${label(CONFIG.rooms, entry.room.roomType)}, ${entry.room.capacity} seats, ${area(entry.room)} sq.ft, ${bandText([Math.round(entry.subtotal[0] * 1.18), Math.round(entry.subtotal[1] * 1.18)])}: ${keyItems}`;
    }).join("\n");
    return `
      <div class="av-builder-modal" data-builder-modal hidden>
        <div class="av-builder-modal-card" role="dialog" aria-modal="true" aria-labelledby="builder-lead-title">
          <button class="av-builder-modal-close" type="button" data-builder-close aria-label="Close proposal form">x</button>
          
          <!-- Loader Screen UI -->
          <div class="av-loading-screen" data-proposal-loader hidden>
            <div class="loader-spinner"></div>
            <h4 class="loader-status" data-loader-text>Checking Details...</h4>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" data-loader-bar></div>
            </div>
          </div>

          <!-- Enterprise Form UI -->
          <div data-proposal-form-container>
            <div class="av-modal-head">
              <p class="section-eyebrow">Client Proposal</p>
              <h3 id="builder-lead-title">Download AV Estimate PDF</h3>
              <span>${escapeHtml(state.rooms.length)} room${state.rooms.length > 1 ? "s" : ""} configured for design proposal</span>
            </div>
            
            <form name="gpspl-configurator-lead" data-builder-lead-form data-netlify="true" netlify-honeypot="bot-field" novalidate>
              <input type="hidden" name="form-name" value="gpspl-configurator-lead">
              <input type="hidden" name="lead_source" value="Engineering AV BOQ Designer">
              <input type="hidden" name="page_url" value="${escapeHtml(window.location.href)}">
              <input type="hidden" name="submitted_at" value="${escapeHtml(new Date().toISOString())}">
              <input type="hidden" name="room_count" value="${escapeHtml(state.rooms.length)}">
              <input type="hidden" name="estimate_range" value="${escapeHtml(bandText(project.total))}">
              <input type="hidden" name="validation_status" value="${escapeHtml(validationStatus)}">
              <textarea name="boq_summary" hidden>${escapeHtml(boqSummary)}</textarea>
              <input type="hidden" name="requirement_summary" value="${escapeHtml(JSON.stringify({ rooms: state.rooms, estimate: bandText(project.total), validation: validationStatus }))}">
              <p class="av-builder-honeypot" aria-hidden="true"><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
              
              <div class="form-field">
                <label>Client Name</label>
                <input name="name" type="text" autocomplete="name" placeholder="Enter your full name">
                <span class="validation-message" data-validate-field="name"></span>
              </div>
              
              <div class="form-field">
                <label>Company / Organization</label>
                <input name="company" type="text" autocomplete="organization" placeholder="Enter company name">
                <span class="validation-message" data-validate-field="company"></span>
              </div>
              
              <div class="form-field">
                <label>Business Email</label>
                <input name="email" type="text" autocomplete="email" placeholder="example@company.com">
                <span class="validation-message" data-validate-field="email"></span>
              </div>
              
              <div class="form-field">
                <label>Phone Number</label>
                <input name="phone" type="text" autocomplete="tel" placeholder="9876543210 or +919876543210">
                <span class="validation-message" data-validate-field="phone"></span>
              </div>
              
              <div class="form-field full-width">
                <label>Project Location (City)</label>
                <input name="city" type="text" autocomplete="address-level2" placeholder="e.g. Delhi, Mumbai, Bangalore">
                <span class="validation-message" data-validate-field="city"></span>
              </div>
              
              <div class="form-field full-width">
                <label>Remarks / Special requirements</label>
                <textarea name="project_description" rows="3" placeholder="Any preferred brand, site deadline, or special cabling requirement..."></textarea>
              </div>
              
              <button class="btn-primary" type="submit" disabled>Generate PDF Proposal</button>
            </form>
            <p class="av-modal-note">Your details are used to prepare the PDF and capture the enquiry for GPSPL follow-up.</p>
          </div>
        </div>
      </div>
    `;
  }

  function keyPlanItems(entry) {
    const priority = ["Display", "Video Processing", "Camera", "Microphone", "Speaker", "IT Devices", "CCTV", "Network", "Room Booking", "Control", "Infrastructure", "Power", "Cabling", "Services"];
    return priority.map((category) => entry.boq.find((item) => item.category === category)).filter(Boolean);
  }

  function advisorPreview(room) {
    const keyItems = ["Display", "Camera", "Microphone", "Speaker", "IT Devices", "CCTV", "Network", "Infrastructure", "Power", "Room Booking", "Control"]
      .map((category) => buildRoomBoq(room).find((item) => item.category === category))
      .filter(Boolean);
    return `
      <b>Recommended setup</b>
      <div>
        ${keyItems.map((item) => `<span>${escapeHtml(simpleComponent(item))}: ${escapeHtml(item.qty)} qty - ${escapeHtml(confidenceLabel(item.confidence))}</span>`).join("")}
      </div>
    `;
  }

  function confidenceLabel(val) {
    if (val >= 88) return "High Suitability";
    if (val >= 76) return "Good Fit";
    return "Needs Check";
  }

  function advisorModal(state) {
    const room = state.rooms[state.activeRoom] || state.rooms[0];
    return `
      <div class="av-builder-modal av-advisor-modal" data-advisor-modal hidden>
        <div class="av-builder-modal-card av-advisor-card" role="dialog" aria-modal="true" aria-labelledby="advisor-title">
          <button class="av-builder-modal-close" type="button" data-advisor-close aria-label="Close GPSPL advisor">x</button>
          <div class="av-modal-head">
            <p class="section-eyebrow">GPSPL Advisor</p>
            <h3 id="advisor-title">GPSPL Room Helper</h3>
            <span>Enter room name, select its role, then apply. We will fill the starting setup for you.</span>
          </div>
          <form data-advisor-form>
            <label>Room name / number
              <input name="advisor_designation" value="${escapeHtml(room.designation || `Room ${state.activeRoom + 1}`)}" placeholder="Example: Room 2, Boardroom, Training Room">
            </label>
            <div class="av-advisor-section">
              <b>Room role</b>
              <div class="av-advisor-options">
                ${guidedRoleItems().map((item) => `
                  <label class="${item.id === room.purpose ? "is-selected" : ""}">
                    <input type="radio" name="advisor_role" value="${escapeHtml(item.id)}" ${item.id === room.purpose ? "checked" : ""}>
                    <span>${escapeHtml(item.label)}</span>
                    <small>${escapeHtml(item.note)}</small>
                  </label>
                `).join("")}
              </div>
            </div>
            <div class="av-advisor-section">
              <b>Meeting style</b>
              <div class="av-advisor-options compact">
                ${guidedWorkflowItems().map((item) => `
                  <label class="${item.id === room.platform ? "is-selected" : ""}">
                    <input type="radio" name="advisor_workflow" value="${escapeHtml(item.id)}" ${item.id === room.platform ? "checked" : ""}>
                    <span>${escapeHtml(item.label)}</span>
                    <small>${escapeHtml(item.note)}</small>
                  </label>
                `).join("")}
              </div>
            </div>
            <div class="av-advisor-preview" data-advisor-preview>
              ${advisorPreview(room)}
            </div>
            <div class="av-advisor-actions">
              <button class="btn-primary" type="submit">Apply suggested setup</button>
              <button class="btn-secondary" type="button" data-advisor-close>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function bindEvents(root, state, project) {
    const active = state.rooms[state.activeRoom] || state.rooms[0];

    // Steppers and direct inputs
    root.querySelectorAll("[data-delta]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.step;
        const delta = parseInt(btn.dataset.delta, 10);
        const input = btn.parentNode.querySelector("input");
        if (!input) return;
        const nextVal = parseInt(input.value || 0, 10) + delta;
        const min = parseInt(input.min, 10);
        const max = parseInt(input.max, 10);
        if (Number.isFinite(min) && nextVal < min) return;
        if (Number.isFinite(max) && nextVal > max) return;
        
        if (name === "length" || name === "width" || name === "height" || name === "capacity") {
          active[name] = nextVal;
          if (name !== "capacity" && active.autoCapacity) {
            active.capacity = recommendedCapacity(active);
          }
          if (name === "capacity") {
            active.autoCapacity = false;
            const dims = dimensionsForCapacity(active, nextVal);
            active.length = dims.length;
            active.width = dims.width;
            active.height = dims.height;
          }
          autoTuneRoom(active);
        } else if (name === "displayQty" || name === "cameraQty" || name === "micQty" || name === "speakerQty" || name === "dspQty" || name === "rackQty" || name === "upsQty") {
          active[name] = nextVal;
          active.manualOverrides[name] = true;
          autoTuneRoom(active);
        }
        render(root, state);
      });
    });

    // Room count triggers
    root.querySelectorAll("[data-room-count]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const delta = parseInt(btn.dataset.roomCount, 10);
        const nextLen = state.rooms.length + delta;
        if (nextLen >= 1 && nextLen <= CONFIG.maxRooms) {
          if (delta > 0) {
            state.rooms.push(createRoom(nextLen - 1));
          } else {
            state.rooms.pop();
            if (state.activeRoom >= state.rooms.length) state.activeRoom = state.rooms.length - 1;
          }
          render(root, state);
        }
      });
    });

    // Inputs count direct edit
    const roomCountInput = root.querySelector("[data-room-count-input]");
    if (roomCountInput) {
      roomCountInput.addEventListener("change", () => {
        const val = int(roomCountInput.value, state.rooms.length, 1, CONFIG.maxRooms);
        while (state.rooms.length < val) {
          state.rooms.push(createRoom(state.rooms.length));
        }
        while (state.rooms.length > val) {
          state.rooms.pop();
        }
        if (state.activeRoom >= state.rooms.length) state.activeRoom = state.rooms.length - 1;
        render(root, state);
      });
    }

    // Tabs select click
    root.querySelectorAll("[data-room-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeRoom = parseInt(btn.dataset.roomTab, 10);
        render(root, state);
      });
    });

    // Option change listener
    root.querySelectorAll("select").forEach((sel) => {
      sel.addEventListener("change", () => {
        const name = sel.name;
        const val = sel.value;
        if (name === "purpose") {
          state.rooms[state.activeRoom] = applyPurpose(active, val);
        } else if (name === "platform" || name === "display" || name === "displaySize" || name === "microphone" || name === "speaker" || name === "camera" || name === "budgetTier") {
          active[name] = val;
          if (name === "displaySize" || name === "display" || name === "microphone" || name === "speaker" || name === "camera" || name === "budgetTier") {
            active.manualOverrides[name] = true;
          }
          autoTuneRoom(active);
        }
        render(root, state);
      });
    });

    // Checkbox auto-capacity selection trigger
    const autoCapCheck = root.querySelector('input[name="autoCapacity"]');
    if (autoCapCheck) {
      autoCapCheck.addEventListener("change", () => {
        active.autoCapacity = autoCapCheck.checked;
        if (active.autoCapacity) {
          active.capacity = recommendedCapacity(active);
          autoTuneRoom(active);
        }
        render(root, state);
      });
    }

    // Expand manual fine tune
    const expandBtn = root.querySelector("[data-expand-details]");
    if (expandBtn) {
      expandBtn.addEventListener("click", () => {
        state.fineTuneOpen = !state.fineTuneOpen;
        render(root, state);
      });
    }

    // Reset overrides
    const resetBtn = root.querySelector("[data-reset-room-overrides]");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.rooms[state.activeRoom] = createRoom(state.activeRoom);
        render(root, state);
      });
    }

    // Lead Proposal form triggers
    const triggerPdf = root.querySelector("[data-builder-proposal]");
    const triggerPdfLock = root.querySelector("[data-builder-proposal-lock]");
    const leadPortal = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"][data-builder-modal]`);
    
    function openModal() {
      if (leadPortal) {
        leadPortal.removeAttribute("hidden");
        leadPortal.classList.add("is-visible");
        setupFormValidation(leadPortal);
      }
    }
    
    if (triggerPdf) triggerPdf.addEventListener("click", openModal);
    if (triggerPdfLock) triggerPdfLock.addEventListener("click", openModal);

    // Close modals
    const closeBtns = document.querySelectorAll(`[data-builder-portal="${root.dataset.builderInstance}"] [data-builder-close], [data-builder-portal="${root.dataset.builderInstance}"] [data-advisor-close]`);
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".av-builder-modal");
        if (modal) {
          modal.setAttribute("hidden", "true");
          modal.classList.remove("is-visible");
        }
      });
    });

    // Custom SaaS Validation & Phone Formatting
    function setupFormValidation(modal) {
      const form = modal.querySelector("form");
      const nameInput = form.querySelector('input[name="name"]');
      const companyInput = form.querySelector('input[name="company"]');
      const emailInput = form.querySelector('input[name="email"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const cityInput = form.querySelector('input[name="city"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      function validateName(val) {
        if (!val || val.trim().length < 3) return "Name must be at least 3 characters.";
        const nameRegex = /^[a-zA-Z\s'.-]+$/;
        if (!nameRegex.test(val)) return "Please enter letters only.";
        return true;
      }

      function validateCompany(val) {
        if (!val || val.trim().length < 2) return "Company name must be at least 2 characters.";
        if (/^\d+$/.test(val.trim())) return "Company name cannot be numbers only.";
        if (/^[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/.test(val.trim())) return "Company name cannot be symbols only.";
        return true;
      }

      function validateEmail(val) {
        if (!val) return "Please enter an email address.";
        if (val.includes(" ") || val.includes("..") || val.includes("@@")) return "Please enter a valid email address.";
        const parts = val.split("@");
        if (parts.length !== 2) return "Please enter a valid email address.";
        const [user, domain] = parts;
        if (!user || !domain) return "Please enter a valid email address.";
        if (domain.startsWith(".") || domain.endsWith(".")) return "Please enter a valid email address.";
        const domainParts = domain.split(".");
        if (domainParts.length < 2) return "Please enter a valid email address.";
        if (domainParts.some(p => p.length < 2)) return "Please enter a valid email address.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) return "Please enter a valid email address.";
        return true;
      }

      function validatePhone(val) {
        if (!val) return "Please enter a phone number.";
        const clean = val.replace(/[\s()-]/g, "");
        const phoneRegex = /^(?:\+91)?[0-9]{10}$/;
        if (!phoneRegex.test(clean)) return "Enter a valid 10-digit number.";
        const digitsOnly = clean.replace("+91", "");
        if (/^(\d)\1{9}$/.test(digitsOnly)) return "Dummy numbers are not accepted.";
        if (digitsOnly === "1234567890" || digitsOnly === "0987654321") return "Dummies are not accepted.";
        return true;
      }

      function validateCity(val) {
        if (!val || val.trim().length < 3) return "Please enter your project location city.";
        return true;
      }

      function showFeedback(input, span, status) {
        const field = input.closest(".form-field");
        if (!field) return;
        if (input.value.trim() === "") {
          field.classList.remove("is-valid", "is-invalid");
          span.className = "validation-message";
          span.innerHTML = "";
          return;
        }
        if (status === true) {
          field.classList.add("is-valid");
          field.classList.remove("is-invalid");
          span.className = "validation-message is-valid";
          span.innerHTML = `&#10003; Valid ${input.name === "name" ? "Client Name" : input.name === "email" ? "Email" : input.name === "phone" ? "Phone" : input.name === "company" ? "Company" : "Location"}`;
        } else {
          field.classList.add("is-invalid");
          field.classList.remove("is-valid");
          span.className = "validation-message is-invalid";
          span.innerHTML = `&#10006; ${status}`;
        }
      }

      function checkFormState() {
        const nameOk = validateName(nameInput.value) === true;
        const compOk = validateCompany(companyInput.value) === true;
        const emailOk = validateEmail(emailInput.value) === true;
        const phoneOk = validatePhone(phoneInput.value) === true;
        const cityOk = validateCity(cityInput.value) === true;
        
        if (nameOk && compOk && emailOk && phoneOk && cityOk) {
          submitBtn.removeAttribute("disabled");
        } else {
          submitBtn.setAttribute("disabled", "true");
        }
      }

      // Add input listeners
      nameInput.addEventListener("input", () => {
        showFeedback(nameInput, form.querySelector('[data-validate-field="name"]'), validateName(nameInput.value));
        checkFormState();
      });

      companyInput.addEventListener("input", () => {
        showFeedback(companyInput, form.querySelector('[data-validate-field="company"]'), validateCompany(companyInput.value));
        checkFormState();
      });

      emailInput.addEventListener("input", () => {
        showFeedback(emailInput, form.querySelector('[data-validate-field="email"]'), validateEmail(emailInput.value));
        checkFormState();
      });

      // Phone formatting: strip letters, keep numbers and +
      phoneInput.addEventListener("input", () => {
        let val = phoneInput.value;
        const clean = val.replace(/[^0-9+]/g, ""); // Keep only numbers and +
        phoneInput.value = clean;
        showFeedback(phoneInput, form.querySelector('[data-validate-field="phone"]'), validatePhone(clean));
        checkFormState();
      });

      cityInput.addEventListener("input", () => {
        showFeedback(cityInput, form.querySelector('[data-validate-field="city"]'), validateCity(cityInput.value));
        checkFormState();
      });
    }

    // Form submit listener
    const leadForm = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"] [data-builder-lead-form]`);
    const loaderScreen = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"] [data-proposal-loader]`);
    const formContainer = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"] [data-proposal-form-container]`);
    
    if (leadForm) {
      leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(leadForm);
        const leadObj = {
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          city: data.get("city"),
          remarks: data.get("project_description")
        };

        // Trigger loader animation
        if (formContainer && loaderScreen) {
          formContainer.style.display = "none";
          loaderScreen.removeAttribute("hidden");
          
          const textEl = loaderScreen.querySelector("[data-loader-text]");
          const barEl = loaderScreen.querySelector("[data-loader-bar]");
          
          const steps = [
            { text: "Checking Details...", progress: "25%" },
            { text: "Preparing Proposal...", progress: "50%" },
            { text: "Generating PDF...", progress: "75%" },
            { text: "Almost Ready...", progress: "100%" }
          ];
          
          steps.forEach((step, idx) => {
            setTimeout(() => {
              textEl.innerText = step.text;
              barEl.style.width = step.progress;
            }, idx * 500);
          });
          
          // Submit and open PDF at 2000ms
          setTimeout(() => {
            // 1. Post to Netlify Form
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(data).toString()
            }).catch(() => {});

            // 2. Post to Netlify Serverless Function for instant email delivery to itsdivesh221@gmail.com & karan@gpspl.co.in
            fetch("/.netlify/functions/boq-lead-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: leadObj.name,
                company: leadObj.company,
                email: leadObj.email,
                phone: leadObj.phone,
                city: leadObj.city,
                roomCount: state.rooms.length,
                estimateRange: bandText(project.total),
                boqSummary: data.get("boq_summary") || "",
                projectDescription: leadObj.project_description || "BOQ PDF Download"
              })
            }).catch(() => {});

            // 3. Post to FormSubmit fallback for both Divesh & Karan Sir
            ['karan@gpspl.co.in', 'itsdivesh221@gmail.com'].forEach(targetEmail => {
              fetch('https://formsubmit.co/ajax/' + encodeURIComponent(targetEmail), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                  _subject: `📄 [BOQ Estimate PDF Download] ${leadObj.name} (${leadObj.company})`,
                  _template: 'table',
                  _captcha: 'false',
                  'Full Name': leadObj.name,
                  'Company': leadObj.company,
                  'Email': leadObj.email,
                  'Phone': leadObj.phone,
                  'City': leadObj.city,
                  'Room Count': state.rooms.length,
                  'Estimate Range': bandText(project.total),
                  'Source': 'AV BOQ Room Configurator PDF'
                })
              }).catch(() => {});
            });

            // 4. Generate & Open PDF
            const pdfHtml = clientProposalPdf(state, project, leadObj);
            const w = window.open();
            if (w) {
              w.document.write(pdfHtml);
              w.document.close();
            }
            leadPortal.setAttribute("hidden", "true");
            leadPortal.classList.remove("is-visible");
            
            // Reset loader state for next time
            formContainer.style.display = "block";
            loaderScreen.setAttribute("hidden", "true");
            textEl.innerText = "Checking Details...";
            barEl.style.width = "0%";
          }, 2000);
        }
      });
    }

    // Advisor suggested trigger modal
    const advisorBtn = root.querySelector("[data-advisor-trigger-btn]");
    const advisorPortal = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"][data-advisor-modal]`);
    if (advisorBtn && advisorPortal) {
      advisorBtn.addEventListener("click", () => {
        advisorPortal.removeAttribute("hidden");
        advisorPortal.classList.add("is-visible");
      });
    }

    // Advisor form inputs dynamic suggestions preview update
    const advisorForm = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"] [data-advisor-form]`);
    if (advisorForm) {
      advisorForm.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          const data = new FormData(advisorForm);
          const role = data.get("advisor_role");
          const wf = data.get("advisor_workflow");
          const designation = data.get("advisor_designation");
          const previewObj = guidedRecommendation(active, role, wf, designation);
          const previewDiv = advisorForm.querySelector("[data-advisor-preview]");
          if (previewDiv) previewDiv.innerHTML = advisorPreview(previewObj);
        });
      });

      advisorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(advisorForm);
        const role = data.get("advisor_role");
        const wf = data.get("advisor_workflow");
        const designation = data.get("advisor_designation");
        state.rooms[state.activeRoom] = guidedRecommendation(active, role, wf, designation);
        if (advisorPortal) {
          advisorPortal.setAttribute("hidden", "true");
          advisorPortal.classList.remove("is-visible");
        }
        render(root, state);
      });
    }

    // Interactive failure simulation triggers listener
    root.querySelectorAll("[data-sim-failure]").forEach((cb) => {
      cb.addEventListener("change", () => {
        const failureKey = cb.dataset.simFailure;
        state.simulatedFailures[failureKey] = cb.checked;
        render(root, state);
      });
    });
  }


  // Robust auto mount check (handles both early and late loading states)
  function initApp() {
    document.querySelectorAll("[data-room-configurator]").forEach((section) => {
      const target = section.querySelector("[data-configurator-app]") || section;
      render(target, JSON.parse(JSON.stringify(defaultState)));
      track("room_configurator_view", { rooms: defaultState.rooms.length });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  // QA exposure bindings hook
  if (typeof window !== "undefined") {
    window.__qa = {
      CONFIG,
      createRoom,
      applyPurpose,
      autoTuneRoom,
      normalizeRoom,
      buildRoomBoq,
      engineeringDesign,
      buildProject,
      bandText,
      escapeHtml
    };
  }
})();


