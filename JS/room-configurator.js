(function () {
  "use strict";

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
    manualOverrides: {}
  };

  const defaultState = {
    activeRoom: 0,
    rooms: [createRoom(0)]
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
      training: "training",
      classroom: "training",
      executive: "meeting",
      auditorium: "seminar",
      server: "server",
      reception: "reception"
    };
    return map[roomType] || "meeting";
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

  function isMegaVenue(room) {
    return room.capacity > 500 || area(room) > 22000 || num(room.length, 0) > 180 || num(room.width, 0) > 120;
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

  function displayRecommendation(room) {
    const sqft = area(room);
    const seats = int(room.capacity, 10, 1, 2000);
    const farthestViewFt = Math.max(num(room.length, 24), num(room.width, 16));
    const requiredDiag = ceilTo(Math.max(12, farthestViewFt * 12 / 6) / 0.49, 10);
    if (room.display === "none") return { component: "No display required", shortLabel: "No display", reason: "Selected because this room does not need visual presentation." };
    if (room.display === "led") return {
      component: isMegaVenue(room) ? "Mega Venue LED Wall / Projection System Review" : requiredDiag >= 260 ? "Estimated 300+ inch Active LED Wall" : "Estimated Active LED Wall",
      shortLabel: isMegaVenue(room) ? "Mega venue LED/projection review" : requiredDiag >= 260 ? "300+ inch LED wall" : "LED wall",
      reason: isMegaVenue(room)
        ? "Large venue image system requires site drawing, throw distance, brightness, rigging, power and content-size validation before final BOQ."
        : requiredDiag >= 260
        ? `Large image suggested from ${Math.round(farthestViewFt)} ft farthest viewer; final LED size/pixel pitch depends on wall size and content detail.`
        : "Best for premium front-facing rooms, larger walls and high-impact viewing."
    };
    if (room.display === "projector") return {
      component: requiredDiag >= 260 ? "Estimated 300 inch Laser Projection / LED Wall Review" : requiredDiag >= 200 ? "Estimated 240 inch Laser Projection" : seats >= 60 || sqft >= 1400 ? "Estimated 150 inch Projector + Screen" : "Estimated 120 inch Projector + Screen",
      shortLabel: requiredDiag >= 260 ? "300 inch projection review" : requiredDiag >= 200 ? "240 inch projection" : seats >= 60 || sqft >= 1400 ? "150 inch projection" : "120 inch projection",
      reason: `Suggested from ${Math.round(farthestViewFt)} ft farthest viewer; final projection/LED choice depends on brightness, wall size and ambient light.`
    };
    if (room.display === "dual") return {
      component: requiredDiag >= 260 ? "Estimated Dual Displays + LED Wall Review" : requiredDiag >= 180 ? "Estimated Dual 98 inch Displays / Projection Review" : seats >= 18 || sqft >= 650 ? "Estimated Dual 86 inch Commercial Displays" : "Estimated Dual 75 inch Commercial Displays",
      shortLabel: requiredDiag >= 260 ? "Dual + LED review" : requiredDiag >= 180 ? "Dual 98 inch / projection review" : seats >= 18 || sqft >= 650 ? "Dual 86 inch displays" : "Dual 75 inch displays",
      reason: requiredDiag >= 180 ? `Dual-display workflow selected, but ${Math.round(farthestViewFt)} ft viewing distance needs larger image review for readable content.` : "Dual displays help show VC participants and content together without switching."
    };
    if (room.display === "interactive") return {
      component: requiredDiag >= 260 ? "Estimated Interactive Display + LED Wall Review" : requiredDiag >= 180 ? "Estimated Interactive Display + Projection Support" : seats >= 18 || sqft >= 650 ? "Estimated 86 inch Interactive Display" : "Estimated 75 inch Interactive Display",
      shortLabel: requiredDiag >= 260 ? "Interactive + LED review" : requiredDiag >= 180 ? "Interactive + projection support" : seats >= 18 || sqft >= 650 ? "86 inch interactive" : "75 inch interactive",
      reason: requiredDiag >= 180 ? `Interactive workflow selected; ${Math.round(farthestViewFt)} ft farthest viewer needs supplemental projection/LED support for rear visibility.` : "Interactive display is suggested for training, annotation and classroom-style collaboration."
    };
    if (seats <= 6 && sqft <= 180) return {
      component: "Estimated 65 inch Commercial Display",
      shortLabel: "65 inch display",
      reason: "Suitable for compact rooms with shorter viewing distance."
    };
    if (seats <= 14 && sqft <= 520) return {
      component: "Estimated 75 inch Commercial Display",
      shortLabel: "75 inch display",
      reason: "Suggested for standard meeting rooms so text remains readable from the rear seats."
    };
    if (seats <= 28 && sqft <= 950) return {
      component: "Estimated 86 inch Commercial Display",
      shortLabel: "86 inch display",
      reason: "Suggested for medium rooms where presentations need larger text visibility."
    };
    return {
      component: "Estimated 98 inch Commercial Display",
      shortLabel: "98 inch display",
      reason: "Suggested for larger rooms; final size depends on wall, viewing distance and budget."
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

  function audioPlan(room) {
    const sqft = area(room);
    const ceiling = num(room.height, 10);
    const isLarge = room.capacity >= 18 || sqft >= 500;
    const isAuditorium = room.roomType === "auditorium" || room.capacity >= 60;
    const targetSpl = isAuditorium ? "90-95 dBA speech / 105 dB peak headroom" : isLarge ? "74-80 dBA speech / 95 dB peak headroom" : "68-74 dBA speech / 88-92 dB peak headroom";
    const wattsPerSpeaker = room.speaker === "pa" ? 180 : room.speaker === "soundbar" ? 120 : room.speaker === "wall" ? 60 : 35;
    const amplifierLow = Math.max(120, Math.ceil(room.speakerQty * wattsPerSpeaker * 1.15 / 50) * 50);
    const amplifierHigh = Math.max(amplifierLow + 100, Math.ceil(room.speakerQty * wattsPerSpeaker * 1.85 / 50) * 50);
    const inputChannels = Math.max(2, room.micQty + room.cameraQty + (room.displayQty > 1 ? 2 : 1));
    const outputChannels = Math.max(2, Math.ceil(room.speakerQty / 2));
    const processor = room.dspQty > 0 ? `${inputChannels}x${outputChannels} DSP / mixer planning` : "Basic USB/audio interface planning";
    const acousticRisk = ceiling > 12 || sqft > 800
      ? "High ceiling or large throw distance needs on-site acoustic validation."
      : room.capacity >= 12
        ? "Medium acoustic risk; ceiling, glass and table shape should be checked."
        : "Low-to-medium acoustic risk for standard meeting use.";
    return { targetSpl, amplifier: `${amplifierLow}-${amplifierHigh}W amplifier headroom`, processor, acousticRisk };
  }

  function roomAssumptions(room) {
    const sqft = area(room);
    const vc = room.camera !== "none" || ["teams", "zoom", "meet", "hybrid"].includes(room.platform);
    const divisible = room.displayQty > 1 || room.roomType === "multipurpose" || room.roomType === "auditorium";
    const acousticFactor = room.height >= 13 || sqft > 900 ? 0.86 : room.capacity >= 18 ? 0.92 : 1;
    return {
      sqft,
      vc,
      divisible,
      listenerHeight: 4,
      tableLayout: room.roomType === "boardroom" ? "boardroom table" : room.roomType === "training" || room.roomType === "classroom" ? "classroom rows" : room.roomType === "auditorium" ? "audience rows" : "meeting table",
      backgroundNoise: sqft > 1200 ? "medium-high" : sqft > 500 ? "medium" : "low-medium",
      acousticFactor
    };
  }

  function displayEngineering(room) {
    if (room.display === "none") return { qty: 0, plan: displayRecommendation(room), confidence: 94 };
    const longestViewFt = Math.max(num(room.length, 24), num(room.width, 16));
    const contentHeightIn = Math.max(12, longestViewFt * 12 / 6);
    const diagonal = ceilTo(contentHeightIn / 0.49, 5);
    const needsLargeImage = diagonal >= 105 || room.capacity >= 50 || area(room) >= 1300;
    let display = room.display;
    if (needsLargeImage && display === "commercial") {
      if (room.roomType === "auditorium") display = "projector";
      else if (diagonal >= 175 || area(room) >= 1600 || room.capacity >= 50) display = "led";
    }
    if (diagonal >= 180 && ["interactive", "dual"].includes(display) && !manualMap(room).display) display = diagonal >= 260 ? "led" : "projector";
    if (room.roomType === "auditorium" && diagonal >= 260 && display === "projector" && !manualMap(room).display) display = "led";
    const derivedRoom = Object.assign({}, room, { display });
    const plan = displayRecommendation(derivedRoom);
    const qty = display === "dual" ? 2 : (room.width > 34 && room.capacity >= 18 && !needsLargeImage ? 2 : 1);
    return {
      qty,
      plan,
      display,
      confidence: clamp(Math.round(92 - Math.max(0, diagonal - 98) * 0.12), 78, 96),
      justification: `${Math.round(longestViewFt)} ft farthest viewer needs approx. ${Math.round(diagonal)} inch diagonal for readable content. ${qty > 1 ? "Dual image positions reduce side-view strain." : "Single primary image position is sufficient."}`
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
      confidence: clamp(Math.round(94 - Math.max(0, requiredHfov - 90) * 0.25), 80, 96),
      justification: `${Math.round(requiredHfov)} degree horizontal FOV needed from room geometry; ${component} selected for participant framing.`
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
        justification: `${stageOrPresenterChannels} presenter channel(s), ${audienceQna} audience Q&A roving mic(s) and ${backup} spare channel planned from room area, audience participation and layout; RF coordination required for simultaneous wireless operation.`
      };
    }
    const pickupRadius = room.microphone === "ceiling" ? 16 * assumptions.acousticFactor : room.microphone === "table" ? 9 : 18;
    const coverageArea = Math.PI * pickupRadius * pickupRadius * 0.78;
    const layoutFactor = assumptions.tableLayout === "classroom rows" ? 0.82 : assumptions.tableLayout === "boardroom table" ? 1.08 : 1;
    const qtyByArea = Math.ceil(assumptions.sqft / Math.max(1, coverageArea * layoutFactor));
    const qtyByLength = room.microphone === "table" ? Math.ceil(roomLength / (pickupRadius * 2.2)) : Math.ceil(roomLength / (pickupRadius * 2.6));
    const qtyByWidth = room.microphone === "ceiling" && roomWidth > pickupRadius * 3 ? Math.ceil(roomWidth / (pickupRadius * 2.2)) : 1;
    const qty = clamp(Math.max(1, qtyByArea, qtyByLength, qtyByWidth), 1, 18);
    const component = room.microphone === "ceiling" ? "Beamforming / Ceiling Microphone Zone" : room.microphone === "wireless" ? "Wireless Handheld/Lapel Microphone Set" : "Table Boundary Microphone";
    return {
      qty,
      component,
      confidence: clamp(Math.round(91 * assumptions.acousticFactor), 76, 94),
      justification: `${Math.round(pickupRadius)} ft effective pickup radius, ${assumptions.tableLayout} layout and ${assumptions.backgroundNoise} noise assumption; minimum ${qty} zone(s) cover ${Math.round(assumptions.sqft)} sq. ft.`
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
        justification: suitable ? "Short listener distance allows one high-output soundbar without coverage gaps." : "Room is wider than a soundbar coverage pattern; wall pair prevents weak rear/side coverage."
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
        ? paDelayPairs > 0 ? `${paMainPairs * 2} main speaker(s) plus ${paDelayPairs * 2} delay/fill speaker(s) for long-throw audience coverage` : "Distributed left/right audience coverage with front-fill validation"
        : `${xCount} x ${yCount} distributed grid with overlapping coverage zones`,
      confidence: clamp(Math.round(88 + Math.min(6, splAtListener - minTarget)), 78, 95),
      justification: `${Math.round(coverageAngle)} degree coverage, ${Math.round(effectiveRadius)} ft effective radius, ${Math.round(splAtListener)} dBA calculated listener SPL before headroom; ${qty} speaker(s) meet uniform speech coverage without over-counting.`
    };
  }

  function infrastructureEngineering(room, design) {
    const endpoints = design.display.qty + design.camera.qty + design.microphone.qty + design.speaker.qty + room.controllerQty + room.schedulerQty + room.cctvQty + room.laptopQty + room.desktopQty;
    const cableFt = ceilTo((num(room.length, 24) + num(room.width, 16)) * 2 + endpoints * 18 + num(room.height, 10) * Math.max(1, endpoints / 2), 25);
    const rackUnits = ceilTo(6 + endpoints * 0.7 + (design.dspRequired ? 2 : 0), 2);
    const upsVa = ceilTo(650 + endpoints * 55 + design.amplifierWatts * 0.35, 250);
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
    const dspInputs = Math.max(0, room.micQty + room.cameraQty + (room.displayQty > 0 ? 1 : 0));
    const dspOutputs = Math.max(0, Math.ceil(room.speakerQty / 2) + (room.displayQty > 1 ? 1 : 0));
    const controlledDevices = room.displayQty + room.cameraQty + room.schedulerQty + room.controllerQty + room.dspQty + room.networkQty + room.cctvQty;
    const touchPages = room.controllerQty > 0 ? 1 + (room.displayQty > 0 ? 1 : 0) + (room.cameraQty > 0 ? 1 : 0) + (room.micQty > 0 || room.speakerQty > 0 ? 1 : 0) + (room.schedulerQty > 0 ? 1 : 0) : 0;
    const automationWorkflows = (room.platform !== "byod" ? 1 : 0) + (design.switchingRequired ? 1 : 0) + (room.controllerQty > 0 ? 1 : 0) + (room.roomType === "auditorium" ? 2 : 0);
    const integrations = (room.platform !== "byod" ? 1 : 0) + (room.networkQty > 0 ? 1 : 0) + (room.schedulerQty > 0 ? 1 : 0) + (room.cctvQty > 0 ? 1 : 0);
    const complexityMultiplier = room.roomType === "auditorium" ? 1.45 : room.roomType === "training" || room.roomType === "classroom" ? 1.2 : room.roomType === "server" ? 1.1 : 1;
    const rawHours =
      1.5 +
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
      summary: `${engineerHours} engineer-hour(s) from ${controlledDevices} controlled device(s), ${dspInputs} DSP input(s), ${dspOutputs} DSP output(s), ${touchPages} touch page(s), ${automationWorkflows} workflow(s) and ${integrations} integration(s).`
    };
  }

  function serviceEngineering(room, design) {
    const infrastructure = design.infrastructure;
    const programming = design.programming;
    const cableRuns = Math.max(1, Math.ceil(infrastructure.cableFt / 75));
    const highCeiling = room.height >= 14;
    const largeRoom = area(room) >= 1200 || room.capacity >= 40;
    const ledOrProjection = room.display === "led" || room.display === "projector";
    const programmingComplex = design.dspRequired || design.switchingRequired || room.controllerQty > 0 || room.networkQty > 0;
    const activities = ["Equipment Installation"];

    if (room.displayQty > 0) activities.push(room.display === "led" ? "Display / LED Wall Installation" : "Display Mounting & Alignment");
    if (room.cameraQty > 0) activities.push("Camera Installation");
    if (room.micQty > 0) activities.push("Microphone Installation");
    if (room.speakerQty > 0) activities.push("Speaker Installation");
    if (room.rackQty > 0) activities.push("Rack Assembly");
    activities.push("Cable Laying & Termination");
    if (room.networkQty > 0 || room.cctvQty > 0 || room.schedulerQty > 0 || room.controllerQty > 0) activities.push("Network Configuration");
    if (room.dspQty > 0 && (room.micQty > 0 || room.speakerQty > 0)) activities.push("DSP Programming");
    if (room.controllerQty > 0) activities.push("AMX / Control System Programming");
    if (programmingComplex) activities.push("Device Configuration");
    if (infrastructure.endpoints >= 4) activities.push("System Integration");
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
      (room.roomType === "auditorium" ? 6 : 0) +
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
    const programming = programmingEngineering(room, { display, camera, microphone, speaker, dspRequired, switchingRequired, amplifierWatts, infrastructure });
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
    room.displayQty = int(manual.displayQty ? room.displayQty : design.display.qty, design.display.qty, 0, 8);
    room.cameraQty = room.camera === "none" ? 0 : int(manual.cameraQty ? room.cameraQty : design.camera.qty, design.camera.qty, 0, 6);
    room.micQty = room.microphone === "none" ? 0 : int(manual.micQty ? room.micQty : design.microphone.qty, design.microphone.qty, 0, 24);
    room.speakerQty = room.speaker === "none" ? 0 : int(manual.speakerQty ? room.speakerQty : design.speaker.qty, design.speaker.qty, 0, 40);
    room.schedulerQty = int(room.schedulerQty, 0, 0, 4);
    room.controllerQty = int(room.controllerQty, 1, 0, 4);
    room.dspQty = int(manual.dspQty ? room.dspQty : (room.micQty > 0 || room.speakerQty > 1 || room.cameraQty > 0 ? 1 : 0), room.micQty > 0 || room.speakerQty > 1 || room.cameraQty > 0 ? 1 : 0, 0, 3);
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

  function buildRoomBoq(room) {
    const items = [];
    const design = engineeringDesign(room);
    const displayPlan = design.display.plan;
    const dKey = displayKey(Object.assign({}, room, { display: design.display.display || room.display }));
    if (dKey && room.displayQty > 0) {
      const displayItem = line("Display", displayPlan.component, room.displayQty, dKey, design.display.justification || displayPlan.reason, design.display.confidence);
      displayItem.shortLabel = displayPlan.shortLabel;
      displayItem.reason = displayItem.note;
      items.push(markSource(displayItem, room, ["display", "displayQty"]));
    }

    const cKey = cameraKey(room);
    if (cKey && room.cameraQty > 0) items.push(markSource(line("Camera", design.camera.component, room.cameraQty, cKey, design.camera.justification, design.camera.confidence), room, ["camera", "cameraQty"]));

    const mKey = micKey(room);
    if (mKey && room.micQty > 0) items.push(markSource(line("Microphone", design.microphone.component, room.micQty, mKey, design.microphone.justification, design.microphone.confidence), room, ["microphone", "micQty"]));

    const sKey = speakerKey(room);
    if (sKey && room.speakerQty > 0) items.push(markSource(line("Speaker", design.speaker.component, room.speakerQty, sKey, `${design.speaker.justification} Placement: ${design.speaker.placement}.`, design.speaker.confidence), room, ["speaker", "speakerQty"]));

    if (room.dspQty > 0 && (room.micQty > 0 || room.speakerQty > 0 || room.cameraQty > 0)) items.push(markSource(line("Audio Processing", "AEC DSP / Audio Processor", room.dspQty, "dsp", `DSP selected because design has ${room.micQty} mic zone(s), ${room.speakerQty} speaker(s) and VC audio routing.`, design.infrastructure.confidence), room, ["dspQty"]));
    if (sKey && room.speakerQty > 0) items.push(line("Amplification", `${ceilTo(design.amplifierWatts || 120, 50)}W amplifier with headroom`, 1, "amplifier", `Amplifier sized from speaker load with approx. 60% headroom for ${audioPlan(room).targetSpl}.`, design.speaker.confidence));
    if (design.switchingRequired || room.capacity >= 12 || room.micQty >= 2 || room.speakerQty >= 4) items.push(line("Mixer / Matrix", audioPlan(room).processor, 1, null, `I/O count planned from ${room.micQty} mic, ${room.cameraQty} camera and ${room.displayQty} display endpoint(s) with future expansion allowance. Programming effort is calculated separately from engineer-hours.`, 86, [0, 0]));
    if (room.schedulerQty > 0) items.push(markSource(line("Room Booking", "Room Scheduler Panel", room.schedulerQty, "scheduler", "Usually one scheduler per bookable room."), room, ["schedulerQty"]));
    if (room.controllerQty > 0) items.push(markSource(line("Control", "Touch Controller / Control Processor", room.controllerQty, "controller", `Control added for ${design.infrastructure.endpoints} controllable endpoint(s), source selection and user handover.`, 88), room, ["controllerQty"]));
    if (room.rackQty > 0) items.push(markSource(line("Infrastructure", `${design.infrastructure.rackUnits}U AV Rack / Mounting Hardware`, room.rackQty, "rack", `Rack size calculated from ${design.infrastructure.endpoints} endpoints, DSP/control hardware and ventilation allowance.`, design.infrastructure.confidence), room, ["rackQty"]));
    if (room.upsQty > 0) items.push(markSource(line("Power", `${design.infrastructure.upsVa}VA UPS / Power Conditioning`, room.upsQty, "ups", `UPS capacity calculated from AV endpoint load, control electronics and amplifier allowance.`, design.infrastructure.confidence), room, ["upsQty"]));
    if (room.laptopQty > 0) items.push(markSource(line("IT Devices", "Business Laptop", room.laptopQty, "laptop", "For reception, operator desk or user workstation requirement."), room, ["laptopQty"]));
    if (room.desktopQty > 0) items.push(markSource(line("IT Devices", "Business Desktop", room.desktopQty, "desktop", "For fixed desk operation, admin or reception use."), room, ["desktopQty"]));
    if (room.cctvQty > 0) items.push(markSource(line("CCTV", "IP CCTV Camera Points", room.cctvQty, "cctv", "Camera count depends on entry points, viewing angle and recording need."), room, ["cctvQty"]));
    if (room.networkQty > 0) items.push(markSource(line("Network", "Network Switch / Patch Panel", room.networkQty, "networkSwitch", "For rack, control devices, CCTV and endpoint connectivity."), room, ["networkQty"]));
    items.push(line("Cabling", "Signal, Control and Power Cabling", design.infrastructure.cableFt, null, `Cable quantity calculated from room perimeter, ceiling drop and ${design.infrastructure.endpoints} endpoint runs.`, design.infrastructure.confidence, [design.infrastructure.cableFt * 90, design.infrastructure.cableFt * 180]));
    const serviceItem = line("Services", "Installation & Commissioning", design.service.technicianDays, null, design.service.summary, 86, design.service.band);
    serviceItem.serviceScope = design.service;
    serviceItem.costSplit = design.service.costSplit;
    items.push(serviceItem);
    return items;
  }

  function totalBand(items) {
    return items.reduce((acc, item) => addBand(acc, item.band, 1), [0, 0]);
  }

  function costGroup(item) {
    if (item.category === "Cabling") return "wiring";
    if (item.category === "Services" && item.component.includes("Programming")) return "programming";
    if (item.category === "Services") return "installation";
    if (["Audio Processing", "Mixer / Matrix", "Control"].includes(item.category)) return "programming";
    return "hardware";
  }

  function costBreakdown(project) {
    const groups = {
      hardware: [0, 0],
      wiring: [0, 0],
      installation: [0, 0],
      programming: [0, 0]
    };
    project.rooms.forEach((entry) => {
      entry.boq.forEach((item) => {
        if (item.costSplit) {
          Object.keys(item.costSplit).forEach((group) => {
            if (groups[group]) groups[group] = addBand(groups[group], item.costSplit[group], 1);
          });
          return;
        }
        const group = costGroup(item);
        groups[group] = addBand(groups[group], item.band, 1);
      });
    });
    return groups;
  }

  function estimateClass(total) {
    if (total[1] <= 700000) return "Essential";
    if (total[1] <= 1800000) return "Business";
    return "Premium";
  }

  function pricingBasis(project) {
    const displayItems = project.rooms.flatMap((entry) => entry.boq.filter((item) => item.category === "Display").map((item) => item.shortLabel || item.component));
    const displayText = displayItems.length ? displayItems.slice(0, 3).join(", ") + (displayItems.length > 3 ? " +" : "") : "No display selected";
    return {
      title: "Pricing basis",
      gpspl: `${project.estimateClass} range suggested by GPSPL from room size, seating and selected workflow.`,
      client: `Client can change display type/quantity; estimate updates for ${displayText}.`,
      note: "Final brand, model and size will be frozen after site survey and client approval."
    };
  }

  function confidenceLabel(score) {
    if (score >= 90) return "High fit";
    if (score >= 82) return "Good fit";
    return "Site check";
  }

  function validationLabel(score) {
    if (score >= 88) return "Engineering validated";
    if (score >= 76) return "Site review advised";
    return "Needs engineering review";
  }

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
    const checks = [
      validationCheck("Display visibility", room.display === "none" || design.display.confidence >= 76, design.display.confidence || 90, design.display.justification || design.display.plan.reason),
      validationCheck("Speaker coverage", room.speaker === "none" || design.speaker.confidence >= 78, design.speaker.confidence || 92, design.speaker.justification || "No room speakers selected."),
      validationCheck("DSP capacity", !design.dspRequired || room.dspQty > 0, room.dspQty > 0 || !design.dspRequired ? 90 : 62, design.dspRequired ? `${room.dspQty} DSP planned for ${room.micQty} mic, ${room.speakerQty} speaker and ${room.cameraQty} camera endpoint(s).` : "DSP not required for selected endpoint mix."),
      validationCheck("Amplifier headroom", room.speakerQty === 0 || design.amplifierWatts >= room.speakerQty * (room.speaker === "pa" ? 180 : room.speaker === "wall" ? 60 : 35), room.speakerQty === 0 ? 92 : design.speaker.confidence, room.speakerQty === 0 ? "No speaker amplifier required." : `${ceilTo(design.amplifierWatts || 120, 50)}W amplifier headroom calculated from speaker load.`),
      validationCheck("Rack space", room.rackQty === 0 || rackCapacity >= design.infrastructure.rackUnits, rackCapacity >= design.infrastructure.rackUnits ? 90 : 70, `${room.rackQty} rack(s) provide approx. ${rackCapacity}U for ${design.infrastructure.rackUnits}U calculated requirement.`),
      validationCheck("UPS margin", room.upsQty === 0 || upsCapacity >= design.infrastructure.upsVa, upsCapacity >= design.infrastructure.upsVa ? 90 : 72, `${room.upsQty} UPS unit(s) provide approx. ${upsCapacity}VA for ${design.infrastructure.upsVa}VA calculated load.`),
      validationCheck("Cable route", design.infrastructure.cableFt > 0 && design.service.cableRuns > 0, 88, `${design.infrastructure.cableFt} ft cable allowance across ${design.service.cableRuns} estimated run(s).`),
      validationCheck("Services scope", design.service.technicianDays >= 1 && design.service.engineerDays >= 0.5 && design.service.activities.length >= 8, design.service.complexity === "High" ? 84 : 90, `${design.service.labourLevel} scope with ${design.service.technicianDays} technician-day(s), ${design.service.engineerDays} engineer-day(s) and ${design.service.activities.length} activity checkpoints.`)
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

  function sourceLabel(item) {
    return item.source === "Client selected" ? "Client" : "GPSPL";
  }

  function buildProject(state) {
    const rooms = state.rooms.map((room, index) => {
      const boq = buildRoomBoq(room);
      const subtotal = totalBand(boq);
      const validation = ValidationEngine(room);
      return { index, room, boq, subtotal, validation };
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
      timeline: `${Math.max(5, maxTimeline)}-${Math.max(8, maxTimeline + Math.ceil(state.rooms.length / 2) * 2)} working days after final PO/site readiness`
    };
  }

  function select(name, value, items, attrs) {
    return `<select name="${escapeHtml(name)}" ${attrs || ""}>${items.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === value ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}</select>`;
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
    const room = state.rooms[state.activeRoom] || state.rooms[0];
    const purpose = purposePreset(room.purpose);
    return `
      <div class="av-builder-fieldset av-room-editor" data-room-editor>
        <div class="av-builder-legend-row">
          <p class="av-builder-legend">Room ${state.activeRoom + 1} Details</p>
          ${state.rooms.length > 1 ? `<button type="button" class="av-builder-link" data-remove-room>Remove Room</button>` : ""}
        </div>
        <div class="av-purpose-box">
          <label>What is this room for?${select("purpose", room.purpose, CONFIG.purposes)}</label>
          <p>${escapeHtml(purpose.help)} Changing this updates display, camera, audio, control, scheduler and estimate.</p>
          <button type="button" class="av-builder-link" data-purpose-decide>Open GPSPL room helper</button>
        </div>
        <label>Room Designation<input name="designation" value="${escapeHtml(room.designation)}" placeholder="Example: Boardroom, Training Room, MD Cabin"></label>
        <div class="av-builder-form-grid">
          <label>Room Type${select("roomType", room.roomType, CONFIG.rooms)}</label>
          <label>Seating Capacity<input name="capacity" type="number" min="1" max="2000" value="${escapeHtml(room.capacity)}"><small>${room.autoCapacity ? "Auto-suggested from room size" : isMegaVenue(room) ? "Mega venue: site review required" : "Manual value locked"}</small></label>
          <label>Length (ft)<input name="length" type="number" min="1" step="0.5" value="${escapeHtml(room.length)}"></label>
          <label>Width (ft)<input name="width" type="number" min="1" step="0.5" value="${escapeHtml(room.width)}"></label>
          <label>Ceiling Height (ft)<input name="height" type="number" min="1" step="0.5" value="${escapeHtml(room.height)}"></label>
          <label>Meeting Workflow${select("platform", room.platform, CONFIG.platforms)}</label>
          <label>Display Type${select("display", room.display, CONFIG.displays)}</label>
          <label>Camera${select("camera", room.camera, CONFIG.cameras)}</label>
          <label>Microphone${select("microphone", room.microphone, CONFIG.microphones)}</label>
          <label>Speaker Type${select("speaker", room.speaker, CONFIG.speakers)}</label>
        </div>
        <details class="av-advanced-controls">
          <summary>Fine tune quantities</summary>
          <div class="av-builder-qty-grid">
            <label><span>TV / Display Qty</span>${stepper("displayQty", room.displayQty, 0, 8)}</label>
            <label><span>Camera Qty</span>${stepper("cameraQty", room.cameraQty, 0, 6)}</label>
            <label><span>Mic Qty</span>${stepper("micQty", room.micQty, 0, 24)}</label>
            <label><span>Speaker Qty</span>${stepper("speakerQty", room.speakerQty, 0, 40)}</label>
            <label><span>Room Scheduler</span>${stepper("schedulerQty", room.schedulerQty, 0, 4)}</label>
            <label><span>Controller</span>${stepper("controllerQty", room.controllerQty, 0, 4)}</label>
            <label><span>DSP</span>${stepper("dspQty", room.dspQty, 0, 3)}</label>
            <label><span>Rack Qty</span>${stepper("rackQty", room.rackQty, 0, 3)}</label>
            <label><span>UPS</span>${stepper("upsQty", room.upsQty, 0, 3)}</label>
            <label><span>Laptop Qty</span>${stepper("laptopQty", room.laptopQty, 0, 12)}</label>
            <label><span>Desktop Qty</span>${stepper("desktopQty", room.desktopQty, 0, 12)}</label>
            <label><span>CCTV Qty</span>${stepper("cctvQty", room.cctvQty, 0, 24)}</label>
            <label><span>Network Switch</span>${stepper("networkQty", room.networkQty, 0, 8)}</label>
          </div>
        </details>
        <p class="av-builder-note compact">Length, width and height update suggested seating and quantities. Manual seating stays locked until room type or purpose is changed.</p>
      </div>
    `;
  }

  function projectTable(project) {
    return `
      <div class="av-room-detail-list">
        ${project.rooms.map((entry) => `
          <details class="av-room-detail-card">
            <summary>
              <span>${escapeHtml(entry.room.designation)}</span>
              <b>${escapeHtml(bandText([Math.round(entry.subtotal[0] * 1.18), Math.round(entry.subtotal[1] * 1.18)]))}</b>
            </summary>
            <div class="av-validation-checks">
              ${entry.validation.checks.map((check) => `
                <span class="${check.passed ? "is-pass" : "is-risk"}"><b>${escapeHtml(check.name)}</b>${escapeHtml(check.score)}%</span>
              `).join("")}
            </div>
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
          </details>
        `).join("")}
      </div>
    `;
  }

  function keyPlanItems(entry) {
    const priority = ["Display", "Camera", "Microphone", "Speaker", "IT Devices", "CCTV", "Network", "Room Booking", "Control", "Infrastructure", "Power", "Services"];
    return priority.map((category) => entry.boq.find((item) => item.category === category)).filter(Boolean);
  }

  function roomPlanList(project) {
    return `
      <div class="av-plan-list">
        ${project.rooms.map((entry) => {
          return `
            <article class="av-plan-card">
              <header>
                <div>
                  <b>${escapeHtml(entry.room.designation)}</b>
                  <span>${escapeHtml(label(CONFIG.rooms, entry.room.roomType))} | ${escapeHtml(entry.room.capacity)} seats | ${escapeHtml(area(entry.room))} sq. ft.</span>
                </div>
                <strong>${escapeHtml(bandText([Math.round(entry.subtotal[0] * 1.18), Math.round(entry.subtotal[1] * 1.18)]))}</strong>
              </header>
              <div class="av-validation-pill ${escapeHtml(entry.validation.statusClass)}">${escapeHtml(entry.validation.label)} - ${escapeHtml(entry.validation.score)}%</div>
              <div class="av-plan-chips">
                ${keyPlanItems(entry).map((item) => `<span><b>${escapeHtml(simpleComponent(item))}</b>${planChipLabel(item)}</span>`).join("")}
              </div>
              <div class="av-plan-insight">
                <span>Engineering note</span>
                <p>${escapeHtml(roomInsight(entry))}</p>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function roomInsight(entry) {
    if (entry.room.roomType === "server") return "Rack, control devices, UPS, network switching and CCTV monitoring planned as a controlled equipment room.";
    if (entry.room.roomType === "reception") return "Reception display, front-desk IT device and CCTV coverage planned for visitor-facing use.";
    const audio = audioPlan(entry.room);
    return `${audio.targetSpl}. ${audio.acousticRisk}`;
  }

  function costBrief(project) {
    const breakdown = costBreakdown(project);
    const hasProgramming = breakdown.programming[1] > 0;
    const basis = pricingBasis(project);
    return `
      <section class="av-cost-brief-wrap" aria-label="Estimate breakup">
        <div class="av-cost-brief-head">
          <b>Why this estimate?</b>
          <span>Hardware, wiring, installation and setup breakup.</span>
        </div>
        <div class="av-cost-brief">
          <article><span>Hardware</span><b>${escapeHtml(bandText(breakdown.hardware))}</b><p>Display, camera, mic, speakers, IT, CCTV, rack, UPS.</p></article>
          <article><span>Wiring</span><b>${escapeHtml(bandText(breakdown.wiring))}</b><p>Cables, connectors, routing, labeling.</p></article>
          <article><span>Install</span><b>${escapeHtml(bandText(breakdown.installation))}</b><p>Mounting, testing, commissioning.</p></article>
          <article><span>${hasProgramming ? "Programming" : "Setup"}</span><b>${escapeHtml(bandText(breakdown.programming))}</b><p>${hasProgramming ? "Engineer-hour based DSP/control setup." : "Basic setup and guidance."}</p></article>
        </div>
        <div class="av-pricing-basis">
          <div class="av-pricing-basis-top">
            <span>${escapeHtml(basis.title)}</span>
          </div>
          <b>${escapeHtml(basis.gpspl)}</b>
          <p>${escapeHtml(basis.client)} ${escapeHtml(basis.note)}</p>
        </div>
      </section>
    `;
  }

  function sourceGuide() {
    return `
      <section class="av-source-guide" aria-label="Recommendation source guide">
        <div>
          <b>Recommendation source</b>
          <p><span><strong>GPSPL</strong> = engineering recommended.</span><span><strong>Client</strong> = manually changed by user.</span></p>
        </div>
        <div class="av-source-legend">
          <em>GPSPL = recommended by GPSPL</em>
          <em>Client = selected by client</em>
          <em>Fit score = suitability</em>
        </div>
      </section>
    `;
  }

  function roomCards(project) {
    return `
      <div class="av-room-summary-grid">
        ${project.rooms.map((entry) => `
          <article>
            <b>${escapeHtml(entry.room.designation)}</b>
            <span>${escapeHtml(label(CONFIG.rooms, entry.room.roomType))} | ${escapeHtml(entry.room.capacity)} seats | ${escapeHtml(area(entry.room))} sq. ft.</span>
            <strong>${escapeHtml(bandText([Math.round(entry.subtotal[0] * 1.18), Math.round(entry.subtotal[1] * 1.18)]))}</strong>
          </article>
        `).join("")}
      </div>
    `;
  }

  function engineeringCards(project) {
    return `
      <div class="av-builder-engineering">
        ${project.rooms.slice(0, 4).map((entry) => {
          const audio = audioPlan(entry.room);
          const serverPlan = entry.room.roomType === "server";
          const receptionPlan = entry.room.roomType === "reception";
          return `
            <article>
              <b>${escapeHtml(entry.room.designation)}</b>
              <em class="av-validation-pill ${escapeHtml(entry.validation.statusClass)}">${escapeHtml(entry.validation.label)} - ${escapeHtml(entry.validation.score)}%</em>
              <span>${escapeHtml(serverPlan || receptionPlan ? roomInsight(entry) : audio.targetSpl)}<br>${escapeHtml(serverPlan ? "Rack, UPS, network and CCTV planning" : receptionPlan ? "Display, IT device and CCTV planning" : audio.amplifier)}<br>${escapeHtml(serverPlan ? "Control devices centralized in server rack" : receptionPlan ? "Visitor-facing reception workflow" : audio.processor)}</span>
              <small>${escapeHtml(entry.validation.summary)}</small>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function render(root, state) {
    if (!root.dataset.builderInstance) root.dataset.builderInstance = `av-builder-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const project = buildProject(state);
    const active = state.rooms[state.activeRoom] || state.rooms[0];
    const whatsappText = `Hello GPSPL, I need AV BOQ guidance for ${state.rooms.length} room(s). Estimated range: ${bandText(project.total)} GST included. Please help with final equipment selection and site survey.`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${CONFIG.phone}&text=${encodeURIComponent(whatsappText)}&type=phone_number&app_absent=0`;
    const contactUrl = `/contact.html?source=av-boq-designer&rooms=${state.rooms.length}&estimate=${encodeURIComponent(bandText(project.total))}`;

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
          <p class="section-eyebrow">GST-inclusive planning estimate</p>
          <h3>${escapeHtml(project.estimateClass)} AV Solution for ${state.rooms.length} Room${state.rooms.length > 1 ? "s" : ""}</h3>
          <div class="av-builder-summary-grid">
            <span><b>Active Room</b>${escapeHtml(active.designation)}</span>
            <span><b>Room Area</b>${escapeHtml(area(active))} sq. ft.</span>
            <span><b>Timeline</b>${escapeHtml(project.timeline)}</span>
            <span><b>Budget Class</b>${escapeHtml(project.estimateClass)}</span>
          </div>
          ${sourceGuide()}
          ${roomPlanList(project)}
          ${costBrief(project)}
          <details class="av-details-block">
            <summary>View room-wise details</summary>
            ${engineeringCards(project)}
            ${projectTable(project)}
          </details>
          <div class="av-builder-budget">
            <article><span>Pre-GST Range</span><b>${escapeHtml(bandText(project.subtotal))}</b></article>
            <article><span>GST Included @ 18%</span><b>${escapeHtml(bandText(project.gst))}</b></article>
            <article class="is-total"><span>Total Estimated Range</span><b>${escapeHtml(bandText(project.total))}</b></article>
          </div>
          <p class="av-builder-note"><strong>Prices may vary.</strong> This is a planning estimate only. For real/final pricing, contact GPSPL for site validation, equipment selection and commercial proposal.</p>
          <div class="av-builder-final-cta">
            <div>
              <b>Need deeper engineering?</b>
              <span>For more detailed insight, share room drawings/photos with GPSPL and our team will validate final quantities, wiring, mounting, warranty and installation scope.</span>
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
          <div class="av-modal-head">
            <p class="section-eyebrow">Client Proposal</p>
            <h3 id="builder-lead-title">Download AV Estimate PDF</h3>
            <span>${escapeHtml(state.rooms.length)} room${state.rooms.length > 1 ? "s" : ""} | ${escapeHtml(bandText(project.total))} GST inclusive</span>
          </div>
          <form name="gpspl-configurator-lead" data-builder-lead-form data-netlify="true" netlify-honeypot="bot-field">
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
            <label>Client Name<input name="name" autocomplete="name" required></label>
            <label>Company<input name="company" autocomplete="organization"></label>
            <label>Email<input type="email" name="email" autocomplete="email" required></label>
            <label>Phone<input name="phone" autocomplete="tel" pattern="^[+0-9][0-9\\s-]{7,18}$" required></label>
            <label>Project Location<input name="city" autocomplete="address-level2" required></label>
            <label>Remarks<textarea name="project_description" rows="4" placeholder="Any preferred brand, site deadline or special requirement"></textarea></label>
            <button class="btn-primary" type="submit">Generate PDF Proposal</button>
          </form>
          <p class="av-modal-note">Your details are used to prepare the PDF and capture the enquiry for GPSPL follow-up.</p>
        </div>
      </div>
    `;
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
            <div class="av-advisor-preview" data-advisor-preview>${advisorPreview(room)}</div>
            <button class="btn-primary" type="submit">Apply GPSPL Recommendation</button>
          </form>
        </div>
      </div>
    `;
  }

  function setRoomCount(state, count) {
    const nextCount = int(count, state.rooms.length, 1, CONFIG.maxRooms);
    const rooms = state.rooms.slice(0, nextCount);
    while (rooms.length < nextCount) rooms.push(createRoom(rooms.length));
    return { activeRoom: Math.min(state.activeRoom, rooms.length - 1), rooms };
  }

  function updateActiveRoom(state, patch, tune) {
    const rooms = state.rooms.slice();
    rooms[state.activeRoom] = tune ? autoTuneRoom(Object.assign({}, rooms[state.activeRoom], patch)) : normalizeRoom(Object.assign({}, rooms[state.activeRoom], patch));
    return Object.assign({}, state, { rooms });
  }

  function bindEvents(root, state, project) {
    root.querySelectorAll("[data-room-count]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = setRoomCount(state, state.rooms.length + Number(button.dataset.roomCount));
        track("room_configurator_update", { action: "room_count", rooms: next.rooms.length, estimate: bandText(buildProject(next).total) });
        render(root, next);
      });
    });

    const countInput = root.querySelector("[data-room-count-input]");
    if (countInput) countInput.addEventListener("change", () => {
      const next = setRoomCount(state, countInput.value);
      track("room_configurator_update", { action: "room_count_input", rooms: next.rooms.length, estimate: bandText(buildProject(next).total) });
      render(root, next);
    });

    root.querySelectorAll("[data-room-tab]").forEach((button) => {
      button.addEventListener("click", () => render(root, Object.assign({}, state, { activeRoom: Number(button.dataset.roomTab) })));
    });

    const remove = root.querySelector("[data-remove-room]");
    if (remove) remove.addEventListener("click", () => {
      const rooms = state.rooms.filter((_, index) => index !== state.activeRoom);
      render(root, { rooms, activeRoom: Math.max(0, state.activeRoom - 1) });
    });

    root.querySelectorAll("[data-room-editor] input, [data-room-editor] select").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.name === "purpose") {
          const rooms = state.rooms.slice();
          rooms[state.activeRoom] = applyPurpose(rooms[state.activeRoom], input.value);
          rooms[state.activeRoom].manualOverrides = {};
          const next = Object.assign({}, state, { rooms });
          track("room_configurator_update", { action: "purpose", purpose: input.value, rooms: next.rooms.length, estimate: bandText(buildProject(next).total) });
          render(root, next);
          return;
        }
        const tune = ["roomType", "capacity", "length", "width", "height", "display", "camera", "microphone", "speaker"].includes(input.name);
        const patch = { [input.name]: input.type === "number" ? Number(input.value) : input.value };
        const draftRoom = Object.assign({}, state.rooms[state.activeRoom], patch);
        const currentManual = manualMap(state.rooms[state.activeRoom]);
        const manualFields = ["display", "camera", "microphone", "speaker", "displayQty", "cameraQty", "micQty", "speakerQty", "schedulerQty", "controllerQty", "dspQty", "rackQty", "upsQty", "laptopQty", "desktopQty", "cctvQty", "networkQty"];
        if (manualFields.includes(input.name)) patch.manualOverrides = Object.assign({}, currentManual, { [input.name]: true });
        if (input.name === "capacity") patch.autoCapacity = false;
        if (input.name === "roomType") {
          const preset = roomPreset(input.value);
          const nextPurpose = purposePreset(purposeForRoomType(input.value));
          patch.purpose = nextPurpose.id;
          patch.designation = preset.label;
          patch.autoCapacity = true;
          patch.capacity = undefined;
          patch.length = preset.length;
          patch.width = preset.width;
          patch.height = preset.height;
          patch.display = nextPurpose.display;
          patch.camera = nextPurpose.camera;
          patch.microphone = nextPurpose.microphone;
          patch.speaker = nextPurpose.speaker;
          patch.displayQty = undefined;
          patch.cameraQty = undefined;
          patch.micQty = undefined;
          patch.speakerQty = undefined;
          patch.dspQty = undefined;
          patch.schedulerQty = nextPurpose.schedulerQty;
          patch.controllerQty = nextPurpose.controllerQty;
          patch.rackQty = nextPurpose.rackQty;
          patch.upsQty = nextPurpose.upsQty;
          patch.laptopQty = nextPurpose.laptopQty;
          patch.desktopQty = nextPurpose.desktopQty;
          patch.cctvQty = nextPurpose.cctvQty;
          patch.networkQty = nextPurpose.networkQty;
          patch.manualOverrides = {};
        }
        const fieldDesign = engineeringDesign(draftRoom);
        if (input.name === "display") {
          patch.displayQty = fieldDesign.display.qty;
          patch.manualOverrides = Object.assign({}, patch.manualOverrides || currentManual, { display: true, displayQty: true });
        }
        if (input.name === "camera") {
          patch.cameraQty = input.value === "none" ? 0 : fieldDesign.camera.qty;
          patch.manualOverrides = Object.assign({}, patch.manualOverrides || currentManual, { camera: true, cameraQty: true });
        }
        if (input.name === "microphone") {
          patch.micQty = input.value === "none" ? 0 : fieldDesign.microphone.qty;
          patch.manualOverrides = Object.assign({}, patch.manualOverrides || currentManual, { microphone: true, micQty: true });
        }
        if (input.name === "speaker") {
          patch.speakerQty = input.value === "none" ? 0 : fieldDesign.speaker.qty;
          patch.manualOverrides = Object.assign({}, patch.manualOverrides || currentManual, { speaker: true, speakerQty: true });
        }
        if (["length", "width", "height"].includes(input.name) && state.rooms[state.activeRoom].autoCapacity !== false) {
          patch.autoCapacity = true;
          patch.capacity = undefined;
        }
        if (["capacity", "length", "width", "height"].includes(input.name)) {
          const sizeDesign = engineeringDesign(Object.assign({}, draftRoom, patch));
          if (!currentManual.displayQty) patch.displayQty = sizeDesign.display.qty;
          if (!currentManual.cameraQty) patch.cameraQty = sizeDesign.camera.qty;
          if (!currentManual.micQty) patch.micQty = sizeDesign.microphone.qty;
          if (!currentManual.speakerQty) patch.speakerQty = sizeDesign.speaker.qty;
          if (!currentManual.dspQty) patch.dspQty = sizeDesign.dspRequired ? 1 : 0;
        }
        const next = updateActiveRoom(state, patch, tune);
        track("room_configurator_update", { action: "room_field", field: input.name, rooms: next.rooms.length, estimate: bandText(buildProject(next).total) });
        render(root, next);
      });
    });

    const decide = root.querySelector("[data-purpose-decide]");
    if (decide) decide.addEventListener("click", () => {
      const advisorModalEl = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"][data-advisor-modal]`);
      if (advisorModalEl) advisorModalEl.hidden = false;
      track("room_configurator_advisor_open", { room_index: state.activeRoom + 1, rooms: state.rooms.length });
    });

    const advisorModalEl = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"][data-advisor-modal]`);
    const advisorClose = advisorModalEl && advisorModalEl.querySelector("[data-advisor-close]");
    const advisorForm = advisorModalEl && advisorModalEl.querySelector("[data-advisor-form]");
    const updateAdvisorPreview = () => {
      if (!advisorForm) return;
      const role = advisorForm.querySelector("input[name='advisor_role']:checked");
      const workflow = advisorForm.querySelector("input[name='advisor_workflow']:checked");
      const designation = advisorForm.querySelector("input[name='advisor_designation']");
      const preview = advisorForm.querySelector("[data-advisor-preview]");
      const recommended = guidedRecommendation(state.rooms[state.activeRoom], role && role.value, workflow && workflow.value, designation && designation.value);
      advisorForm.querySelectorAll(".av-advisor-options label").forEach((labelNode) => {
        const input = labelNode.querySelector("input");
        labelNode.classList.toggle("is-selected", Boolean(input && input.checked));
      });
      if (preview) preview.innerHTML = advisorPreview(recommended);
    };
    if (advisorClose && advisorModalEl) advisorClose.addEventListener("click", () => { advisorModalEl.hidden = true; });
    if (advisorModalEl) advisorModalEl.addEventListener("click", (event) => {
      if (event.target === advisorModalEl) advisorModalEl.hidden = true;
    });
    if (advisorForm) {
      advisorForm.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", updateAdvisorPreview);
        input.addEventListener("change", updateAdvisorPreview);
      });
      advisorForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const role = advisorForm.querySelector("input[name='advisor_role']:checked");
        const workflow = advisorForm.querySelector("input[name='advisor_workflow']:checked");
        const designation = advisorForm.querySelector("input[name='advisor_designation']");
        const rooms = state.rooms.slice();
        rooms[state.activeRoom] = guidedRecommendation(rooms[state.activeRoom], role && role.value, workflow && workflow.value, designation && designation.value);
        const next = Object.assign({}, state, { rooms });
        track("room_configurator_advisor_apply", {
          room_index: state.activeRoom + 1,
          role: role && role.value,
          workflow: workflow && workflow.value,
          estimate: bandText(buildProject(next).total)
        });
        render(root, next);
      });
    }

    root.querySelectorAll("[data-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.step;
        const room = state.rooms[state.activeRoom];
        const current = int(room[name], 0, 0, 99);
        const input = root.querySelector(`input[name='${name}']`);
        const min = input ? Number(input.min || 0) : 0;
        const max = input ? Number(input.max || 99) : 99;
        const nextValue = Math.max(min, Math.min(max, current + Number(button.dataset.delta)));
        const nextManual = Object.assign({}, manualMap(room), { [name]: true });
        const patch = { [name]: nextValue, manualOverrides: nextManual };
        if (name === "speakerQty" && nextValue === 0) patch.dspQty = room.micQty > 0 || room.cameraQty > 0 ? room.dspQty : 0;
        if (name === "micQty" && nextValue === 0) patch.dspQty = room.speakerQty > 1 || room.cameraQty > 0 ? room.dspQty : 0;
        if (name === "cameraQty" && nextValue === 0) patch.dspQty = room.micQty > 0 || room.speakerQty > 1 ? room.dspQty : 0;
        const next = updateActiveRoom(state, patch, false);
        track("room_configurator_update", { action: "quantity_stepper", field: name, value: nextValue, rooms: next.rooms.length, estimate: bandText(buildProject(next).total) });
        render(root, next);
      });
    });

    const proposal = root.querySelector("[data-builder-proposal]");
    const modal = document.querySelector(`[data-builder-portal="${root.dataset.builderInstance}"][data-builder-modal]`);
    const close = modal && modal.querySelector("[data-builder-close]");
    const form = modal && modal.querySelector("[data-builder-lead-form]");
    const whatsapp = root.querySelector("[data-builder-whatsapp]");

    root.querySelectorAll("[data-builder-quote]").forEach((quote) => quote.addEventListener("click", () => track("room_configurator_quote_click", { rooms: state.rooms.length })));
    if (whatsapp) whatsapp.addEventListener("click", () => track("room_configurator_whatsapp_click", { rooms: state.rooms.length, estimate: bandText(project.total) }));
    if (proposal && modal) proposal.addEventListener("click", () => {
      modal.hidden = false;
      const nameInput = modal.querySelector("input[name='name']");
      if (nameInput) nameInput.focus();
      track("room_configurator_proposal_open", { rooms: state.rooms.length });
    });
    if (close && modal) close.addEventListener("click", () => { modal.hidden = true; });
    if (modal) modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.hidden = true;
    });
    if (form) form.addEventListener("submit", (event) => handleLeadSubmit(event, state, project));
  }

  function encodeForm(form) {
    return new URLSearchParams(new FormData(form)).toString();
  }

  function handleLeadSubmit(event, state, project) {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button[type='submit']");
    if (button) button.disabled = true;
    const lead = Object.fromEntries(new FormData(form));

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(form)
    }).catch(() => {
      // The browser-generated proposal should still download during local previews.
    }).finally(() => {
      downloadProposalPdf(state, project, lead);
      track("room_configurator_proposal_download", { rooms: state.rooms.length, estimate: bandText(project.total) });
      const modal = form.closest("[data-builder-modal]");
      if (modal) modal.hidden = true;
      if (button) button.disabled = false;
    });
  }

  function pdfSafe(value) {
    return String(value == null ? "" : value).replace(/[^\x20-\x7E]/g, " ");
  }

  function downloadProposalPdf(state, project, lead) {
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    const html = proposalHtml(state, project, lead);
    if (!printWindow) {
      const blob = new Blob([html], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "gpspl-av-boq-proposal.html";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
      return;
    }
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }

  function proposalHtml(state, project, lead) {
    const breakdown = costBreakdown(project);
    const basis = pricingBasis(project);
    const logoUrl = `${window.location.origin}/assests/images/gpspl.png`;
    const clientName = String(lead.name || "").trim();
    const clientCompany = String(lead.company || "").trim();
    const clientCity = String(lead.city || "").trim();
    const rows = project.rooms.flatMap((entry) => entry.boq.map((item) => `
      <tr>
        <td>${escapeHtml(entry.room.designation)}</td>
        <td>${escapeHtml(item.category)}</td>
        <td>${escapeHtml(item.component)}</td>
        <td>${escapeHtml(pdfNote(item))}</td>
        <td>${escapeHtml(item.source || "GPSPL recommended")}</td>
        <td>${escapeHtml(pdfQuantityLabel(item))}</td>
        <td>${escapeHtml(confidenceLabel(item.confidence))} (${escapeHtml(item.confidence)}%)</td>
        <td>${escapeHtml(item.band[1] ? bandText(item.band) : "Included")}</td>
      </tr>
    `)).join("");
    const preparedFor = clientCompany ? `${clientName || "Client"}, ${clientCompany}` : (clientName || "Client");
    const roomSummary = project.rooms.map((entry) => {
      const audio = audioPlan(entry.room);
      const serverPlan = entry.room.roomType === "server";
      const receptionPlan = entry.room.roomType === "reception";
      return `
        <article class="room-card">
          <div><b>${escapeHtml(entry.room.designation)}</b><span>${escapeHtml(label(CONFIG.rooms, entry.room.roomType))} | ${escapeHtml(entry.room.capacity)} seats | ${escapeHtml(area(entry.room))} sq. ft.</span></div>
          <p><strong>${escapeHtml(entry.validation.label)} (${escapeHtml(entry.validation.score)}%)</strong><br>${escapeHtml(roomInsight(entry))}<br>${escapeHtml(serverPlan ? "Rack, UPS, network and CCTV planning" : receptionPlan ? "Display, IT device and CCTV planning" : audio.amplifier)}</p>
        </article>
      `;
    }).join("");
    return `
      <!doctype html><html><head><title>GPSPL AV BOQ Proposal - ${escapeHtml(pdfSafe(lead.name || "Client"))}</title>
      <style>
        *{box-sizing:border-box}
        body{font-family:Arial,Helvetica,sans-serif;color:#071123;margin:0;background:#e9eff6;line-height:1.45}
        .page{max-width:1060px;margin:0 auto;background:#fff;min-height:100vh;box-shadow:0 18px 60px rgba(7,26,49,.16)}
        .cover{position:relative;overflow:hidden;background:#071a31;color:#fff;padding:26px 42px 32px;border-bottom:8px solid #d52b1e}
        .cover:after{content:"";position:absolute;right:-80px;top:-80px;width:260px;height:260px;border:18px solid rgba(255,255,255,.12);border-radius:50%}
        .topline{display:flex;align-items:center;justify-content:space-between;gap:22px;position:relative;z-index:1}
        .logo-lockup{display:flex;align-items:center;gap:16px}
        .logo-box{display:grid;width:82px;height:82px;place-items:center;border-radius:20px;background:#fff;padding:10px}
        .logo-box img{max-width:100%;max-height:100%;object-fit:contain}
        .brand{font-size:13px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#ffcf33}
        .since{font-size:12px;font-weight:800;color:rgba(255,255,255,.76)}
        .trust-badge{display:grid;width:96px;height:96px;place-items:center;border:3px solid rgba(255,255,255,.72);border-radius:50%;text-align:center;font-weight:900;line-height:1.05}
        .trust-badge b{display:block;font-size:34px}.trust-badge span{font-size:11px;letter-spacing:.08em;text-transform:uppercase}
        h1{position:relative;z-index:1;margin:26px 0 10px;font-size:40px;line-height:1.05;color:#fff}
        .prepared{position:relative;z-index:1;font-size:18px;color:rgba(255,255,255,.92)}
        .actions{display:flex;gap:10px;margin-top:22px}.actions button{background:#d52b1e;color:#fff;border:0;border-radius:12px;padding:13px 18px;font-weight:900;cursor:pointer}
        .content{padding:30px 42px 28px}
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 18px}
        .metric{background:#f3f7fb;border:1px solid #dce6f1;border-radius:14px;padding:15px;min-height:96px}
        .metric b{display:block;color:#071d36;font-size:15px}.metric span{display:block;margin-top:5px;color:#172b45;font-size:18px}
        .section{border:1px solid #dce6f1;border-radius:16px;padding:20px;margin:16px 0;break-inside:avoid;background:#fff}
        h2{font-size:22px;margin:0 0 14px;color:#071123}.eyebrow{color:#d52b1e;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .estimate-panel{display:grid;grid-template-columns:1.15fr .85fr;gap:16px;align-items:stretch}
        .total-card{display:grid;align-content:center;min-height:150px;padding:22px;border-radius:16px;background:#071a31;color:#fff}
        .total-card span{color:#ffcf33;font-weight:900;letter-spacing:.08em;text-transform:uppercase;font-size:12px}.total-card b{display:block;margin-top:10px;font-size:28px;line-height:1.18}
        .breakup{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
        .breakup article{padding:13px;border-radius:13px;background:#f7faff;border:1px solid #dce6f1}.breakup span{display:block;color:#d52b1e;font-weight:900;font-size:11px;letter-spacing:.08em;text-transform:uppercase}.breakup b{display:block;margin-top:5px;color:#071123}
        .basis{margin-top:14px;padding:14px;border-left:5px solid #d52b1e;border-radius:12px;background:#f7faff;color:#172b45}.basis b{display:block;color:#071123}.basis span{display:block;color:#d52b1e;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .basis small{display:block;margin-top:8px;color:#52657d;font-weight:700}
        .room-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        .room-card{padding:14px;border:1px solid #dce6f1;border-radius:14px;background:#f8fbff;break-inside:avoid}
        .room-card b,.room-card span{display:block}.room-card b{font-size:16px}.room-card span{margin-top:4px;color:#52657d;font-weight:700;font-size:12px}.room-card p{margin:10px 0 0;color:#172b45;font-size:13px}
        table{width:100%;border-collapse:collapse;font-size:11px;page-break-inside:auto}tr{break-inside:avoid;page-break-inside:avoid}th,td{border:1px solid #dce6f1;padding:8px;text-align:left;vertical-align:top}th{background:#071a31;color:#fff;font-size:10px;letter-spacing:.08em;text-transform:uppercase}td:nth-child(4),td:nth-child(5),td:nth-child(6){font-weight:800;color:#071123}
        .note{background:#fff8e6;border-left:5px solid #ffcf33;padding:14px;border-radius:10px;color:#172b45}
        .ribbon{display:grid;grid-template-columns:1.2fr 1.8fr;gap:18px;align-items:center;margin-top:22px;padding:18px 42px;background:#071a31;color:#fff;border-top:6px solid #d52b1e}
        .ribbon b{display:block;color:#ffcf33;letter-spacing:.12em;text-transform:uppercase}.ribbon span{display:block;margin-top:5px;color:rgba(255,255,255,.82);font-size:12px}.ribbon .contact{display:flex;flex-wrap:wrap;gap:14px;justify-content:flex-end;font-weight:800}
        .security-note{margin:14px 42px 0;padding-bottom:22px;color:#64748b;font-size:11px;text-align:center}
        @page{margin:12mm}
        @media print{body{background:#fff}.page{max-width:none;box-shadow:none}.actions{display:none}.section,.metric,.room-card,.total-card{break-inside:avoid}.cover{padding-top:18px}.ribbon{position:relative}}
      </style></head><body>
      <main class="page">
        <section class="cover">
          <div class="topline">
            <div class="logo-lockup">
              <div class="logo-box"><img src="${escapeHtml(logoUrl)}" alt="GPSPL logo"></div>
              <div><div class="brand">Global Peripheral Solution Pvt. Ltd.</div><div class="since">Established 1997 | AV, Display, Collaboration and IT Integration</div></div>
            </div>
            <div class="trust-badge"><div><b>29</b><span>Years<br>Trust</span></div></div>
          </div>
          <h1>Smart AV BOQ Estimate</h1>
          <p class="prepared">Prepared for ${escapeHtml(preparedFor)} | ${escapeHtml(clientCity || "Project Location")}</p>
          <div class="actions"><button type="button" onclick="window.print()">Download / Save PDF</button></div>
        </section>
        <section class="content">
          <div class="grid">
            <div class="metric"><b>Total Rooms</b><span>${state.rooms.length}</span></div>
            <div class="metric"><b>Budget Class</b><span>${escapeHtml(project.estimateClass)}</span></div>
            <div class="metric"><b>Timeline</b><span>${escapeHtml(project.timeline)}</span></div>
          </div>
          <div class="section">
            <p class="eyebrow">Commercial Estimate</p>
            <div class="estimate-panel">
              <div class="total-card"><span>Total GST-inclusive estimate</span><b>${escapeHtml(bandText(project.total))}</b><p>Pre-GST: ${escapeHtml(bandText(project.subtotal))}<br>GST included @ 18%: ${escapeHtml(bandText(project.gst))}</p></div>
              <div class="breakup">
                <article><span>Hardware</span><b>${escapeHtml(bandText(breakdown.hardware))}</b></article>
                <article><span>Wiring</span><b>${escapeHtml(bandText(breakdown.wiring))}</b></article>
                <article><span>Install</span><b>${escapeHtml(bandText(breakdown.installation))}</b></article>
                <article><span>Programming</span><b>${escapeHtml(bandText(breakdown.programming))}</b></article>
              </div>
            </div>
            <p>This includes AV hardware, mounting support, cabling, installation, commissioning and programming wherever DSP/controller/automation is selected.</p>
            <div class="basis"><span>${escapeHtml(basis.title)}</span><b>${escapeHtml(basis.gpspl)}</b><p>${escapeHtml(basis.client)} ${escapeHtml(basis.note)}</p><small>GPSPL = system recommended from room engineering. Client = manually selected/changed by user. Fit score is suitability, not discount/tax/price accuracy.</small></div>
          </div>
          <div class="section">
            <p class="eyebrow">Room Summary</p>
            <div class="room-grid">${roomSummary}</div>
          </div>
          <div class="section">
            <p class="eyebrow">Preliminary BOQ</p>
            <table><thead><tr><th>Room</th><th>Category</th><th>Component</th><th>Engineering Justification</th><th>Source</th><th>Qty</th><th>Fit Score</th><th>Range</th></tr></thead><tbody>${rows}</tbody></table>
          </div>
          <div class="section note">
            <strong>Prices may vary.</strong> This is a planning estimate only. For real/final pricing, contact GPSPL for site validation, equipment selection and commercial proposal. Final pricing may change after brand/model selection, site condition, cable route, mounting scope, acoustic treatment, warranty terms and stock availability.
          </div>
          <div class="section">
            <h2>Next Step</h2>
            <p>For more detailed insight, contact GPSPL with site drawings, room photos and preferred meeting platform. Our team will validate quantities, wiring scope, installation method and final commercial proposal.</p>
          </div>
        </section>
        <footer class="ribbon">
          <div><b>GPSPL</b><span>Technology supply, AV integration, commissioning and support</span></div>
          <div class="contact"><span>www.gpspl.co.in</span><span>info@gpspl.co.in</span><span>khurana.s@gpspl.co.in</span><span>+91 93100 92963</span></div>
        </footer>
        <p class="security-note">Generated locally in the browser. No server-side PDF rendering load is required. Proposal data is escaped before rendering and submitted through the configured lead form.</p>
      </main>
      <script>window.onload=function(){setTimeout(function(){window.print();},600)}<\/script>
      </body></html>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-room-configurator]").forEach((section) => {
      const target = section.querySelector("[data-configurator-app]") || section;
      render(target, JSON.parse(JSON.stringify(defaultState)));
      track("room_configurator_view", { rooms: defaultState.rooms.length });
    });
  });
})();


