import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync("JS/room-configurator.js", "utf8");
const instrumented = source.replace(
  /\n\}\)\(\);\s*$/,
  `\nwindow.__qa={ CONFIG, createRoom, applyPurpose, autoTuneRoom, normalizeRoom, buildRoomBoq, engineeringDesign, buildProject, bandText, escapeHtml };\n})();`
);

const sandbox = {
  console,
  window: {},
  document: {
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement() { return {}; }
  },
  FormData: function FormData() {},
  Blob: function Blob() {},
  URL: {
    createObjectURL() { return ""; },
    revokeObjectURL() {}
  },
  navigator: {},
  location: { href: "http://localhost/" },
  fetch: async () => ({ ok: true })
};

vm.createContext(sandbox);
vm.runInContext(instrumented, sandbox);

const qa = sandbox.window.__qa;
const failures = [];

function assert(condition, message, context = {}) {
  if (!condition) failures.push({ message, context });
}

function finiteNumber(value) {
  return Number.isFinite(value) && value >= 0;
}

function validateRoomScenario(name, input) {
  let room;
  let design;
  let boq;
  let project;
  try {
    room = qa.normalizeRoom(input);
    design = qa.engineeringDesign(room);
    boq = qa.buildRoomBoq(room);
    project = qa.buildProject({ rooms: [room], activeRoom: 0, budget: "business" });
  } catch (error) {
    failures.push({ message: "Scenario crashed", context: { name, error: error.stack || String(error), input } });
    return;
  }

  const qtyFields = ["capacity", "length", "width", "height", "displayQty", "cameraQty", "micQty", "speakerQty", "schedulerQty", "controllerQty", "dspQty", "rackQty", "upsQty", "laptopQty", "desktopQty", "cctvQty", "networkQty"];
  qtyFields.forEach((field) => assert(finiteNumber(room[field]), `${field} must be finite`, { name, field, value: room[field], room }));

  assert(room.capacity >= 1 && room.capacity <= 2000, "capacity outside supported range", { name, capacity: room.capacity });
  assert(room.length >= 6 && room.length <= 220, "length outside supported range", { name, length: room.length });
  assert(room.width >= 6 && room.width <= 160, "width outside supported range", { name, width: room.width });
  assert(room.height >= 7 && room.height <= 40, "height outside supported range", { name, height: room.height });
  assert(project.total[0] >= 0 && project.total[1] >= project.total[0], "project estimate band invalid", { name, total: project.total });
  assert(boq.length > 0, "BOQ should not be empty", { name, room });
  const validation = project.rooms[0].validation;
  assert(validation && finiteNumber(validation.score), "Validation result missing", { name, validation });
  assert(["Engineering validated", "Site review advised", "Needs engineering review", "Mega venue site review required"].includes(validation.label), "Invalid validation label", { name, validation });
  assert(Array.isArray(validation.checks) && validation.checks.length >= 8, "Validation checks missing", { name, validation });
  validation.checks.forEach((check) => {
    assert(typeof check.name === "string" && check.name.length > 0, "Validation check name missing", { name, check });
    assert(typeof check.detail === "string" && check.detail.length > 0, "Validation check detail missing", { name, check });
    assert(finiteNumber(check.score) && check.score <= 100, "Validation check score invalid", { name, check });
  });

  boq.forEach((item) => {
    assert(finiteNumber(item.qty), "BOQ qty must be finite", { name, item });
    assert(Array.isArray(item.band) && item.band.every(finiteNumber) && item.band[1] >= item.band[0], "BOQ band invalid", { name, item });
    assert(typeof item.component === "string" && item.component.trim().length > 0, "BOQ component missing", { name, item });
    assert(typeof item.note === "string" && item.note.trim().length > 0, "BOQ engineering note missing", { name, item });
    assert(finiteNumber(item.confidence) && item.confidence <= 100, "BOQ confidence invalid", { name, item });
  });

  const serviceItems = boq.filter((item) => item.category === "Services");
  assert(serviceItems.length === 1, "BOQ should have one professional service scope item", { name, serviceItems });
  serviceItems.forEach((item) => {
    assert(item.component === "Installation & Commissioning", "Service component should be Installation & Commissioning", { name, item });
    assert(item.serviceScope && Array.isArray(item.serviceScope.activities), "Service scope metadata missing", { name, item });
    assert(item.serviceScope.activities.length >= 8, "Service scope activity list too short", { name, item });
    assert(["Standard", "Advanced", "Enterprise"].includes(item.serviceScope.labourLevel), "Invalid labour level", { name, item });
    assert(["Low", "Medium", "High"].includes(item.serviceScope.complexity), "Invalid service complexity", { name, item });
    assert(finiteNumber(item.serviceScope.technicianDays) && item.serviceScope.technicianDays >= 1, "Invalid technician days", { name, item });
    assert(finiteNumber(item.serviceScope.engineerDays) && item.serviceScope.engineerDays >= 0.5, "Invalid engineer days", { name, item });
    assert(item.serviceScope.programming && finiteNumber(item.serviceScope.programming.engineerHours), "Programming engineer-hour model missing", { name, item });
    assert(!/Installation, Testing and Commissioning|Programming and User Training/.test(item.component), "Old vague service row returned", { name, item });
  });

  if (room.display === "none" || room.displayQty === 0) {
    assert(!boq.some((item) => item.category === "Display"), "Display item present when display is none/zero", { name, room, boq });
  }
  if (room.camera === "none" || room.cameraQty === 0) {
    assert(!boq.some((item) => item.category === "Camera"), "Camera item present when camera is none/zero", { name, room, boq });
  }
  if (room.microphone === "none" || room.micQty === 0) {
    assert(!boq.some((item) => item.category === "Microphone"), "Mic item present when mic is none/zero", { name, room, boq });
  }
  if (room.speaker === "none" || room.speakerQty === 0) {
    assert(!boq.some((item) => item.category === "Speaker" || item.category === "Amplification"), "Speaker/amplifier present when speaker is none/zero", { name, room, boq });
  }

  const sourceSensitive = boq.filter((item) => ["Display", "Camera", "Microphone", "Speaker"].includes(item.category));
  sourceSensitive.forEach((item) => {
    assert(["GPSPL recommended", "Client selected"].includes(item.source), "Primary recommendation source missing", { name, item });
  });

  if (room.roomType === "auditorium" && room.capacity >= 250) {
    const display = boq.find((item) => item.category === "Display");
    const speaker = boq.find((item) => item.category === "Speaker");
    const mic = boq.find((item) => item.category === "Microphone");
    assert(display && !/150 inch|120 inch|98 inch/.test(display.component), "Large auditorium display under-sized", { name, display });
    if (room.speakerQty > 0) assert(speaker && /delay|fill|PA/i.test(speaker.component + " " + speaker.note), "Large auditorium speaker design lacks PA delay/fill logic", { name, speaker });
    assert(mic && /RF coordination/i.test(mic.note), "Large auditorium wireless mic lacks RF coordination note", { name, mic });
  }

  return { room, design, boq, project };
}

const baseRooms = qa.CONFIG.rooms.flatMap((preset, index) => {
  const created = qa.createRoom(index);
  return [
    [`${preset.id}-default`, created],
    [`${preset.id}-blankish`, { ...created, capacity: "", length: "", width: null, height: undefined }],
    [`${preset.id}-tiny`, { ...created, capacity: 1, autoCapacity: false, length: 1, width: 2, height: 4 }],
    [`${preset.id}-huge`, { ...created, capacity: 9999, autoCapacity: false, length: 999, width: 999, height: 99 }]
  ];
});

const purposeRooms = qa.CONFIG.purposes.map((purpose, index) => {
  const room = qa.applyPurpose(qa.createRoom(index), purpose.id);
  return [`purpose-${purpose.id}`, room];
});

const overrideRooms = [
  ["client-speaker-zero", {
    ...qa.applyPurpose(qa.createRoom(0), "seminar"),
    roomType: "auditorium",
    capacity: 300,
    autoCapacity: false,
    length: 110,
    width: 70,
    height: 24,
    speakerQty: 0,
    manualOverrides: { speakerQty: true }
  }],
  ["client-display-two", {
    ...qa.applyPurpose(qa.createRoom(0), "seminar"),
    roomType: "auditorium",
    capacity: 300,
    autoCapacity: false,
    length: 110,
    width: 70,
    height: 24,
    displayQty: 2,
    manualOverrides: { displayQty: true }
  }],
  ["all-none-room", {
    ...qa.createRoom(0),
    display: "none",
    camera: "none",
    microphone: "none",
    speaker: "none",
    displayQty: 0,
    cameraQty: 0,
    micQty: 0,
    speakerQty: 0,
    manualOverrides: { display: true, camera: true, microphone: true, speaker: true }
  }],
  ["string-injection-values", {
    ...qa.createRoom(0),
    designation: "<script>alert(1)</script>",
    capacity: "300abc",
    length: "110 ft",
    width: "70 ft",
    height: "24 ft"
  }]
];

const auditoriumCases = [
  ["auditorium-80", { ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", capacity: 80, autoCapacity: false, length: 70, width: 45, height: 16 }],
  ["auditorium-150", { ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", capacity: 150, autoCapacity: false, length: 90, width: 55, height: 20 }],
  ["auditorium-300", { ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", capacity: 300, autoCapacity: false, length: 110, width: 70, height: 24 }],
  ["auditorium-500", { ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", capacity: 500, autoCapacity: false, length: 160, width: 100, height: 32 }],
  ["auditorium-1000", { ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", capacity: 1000, autoCapacity: false, length: 220, width: 140, height: 38 }]
];

const matrixRooms = [];
const dimensionSets = [
  { label: "compact", capacity: 4, length: 12, width: 10, height: 9 },
  { label: "standard", capacity: 14, length: 28, width: 18, height: 10 },
  { label: "large", capacity: 60, length: 60, width: 38, height: 14 },
  { label: "xl", capacity: 220, length: 100, width: 65, height: 22 }
];
const displayOptions = qa.CONFIG.displays.map((entry) => entry.id);
const cameraOptions = qa.CONFIG.cameras.map((entry) => entry.id);
const microphoneOptions = qa.CONFIG.microphones.map((entry) => entry.id);
const speakerOptions = qa.CONFIG.speakers.map((entry) => entry.id);

qa.CONFIG.rooms.forEach((preset, roomIndex) => {
  dimensionSets.forEach((dims, dimIndex) => {
    const seed = qa.applyPurpose(qa.createRoom(roomIndex), purposeForMatrix(preset.id));
    matrixRooms.push([`matrix-${preset.id}-${dims.label}`, {
      ...seed,
      roomType: preset.id,
      purpose: purposeForMatrix(preset.id),
      autoCapacity: false,
      capacity: dims.capacity,
      length: dims.length,
      width: dims.width,
      height: dims.height,
      display: displayOptions[(roomIndex + dimIndex) % displayOptions.length],
      camera: cameraOptions[(roomIndex + dimIndex) % cameraOptions.length],
      microphone: microphoneOptions[(roomIndex + dimIndex) % microphoneOptions.length],
      speaker: speakerOptions[(roomIndex + dimIndex) % speakerOptions.length],
      manualOverrides: {}
    }]);
  });
});

function purposeForMatrix(roomType) {
  const map = {
    auditorium: "seminar",
    server: "server",
    reception: "reception",
    huddle: "huddle",
    boardroom: "boardroom",
    training: "training",
    classroom: "training"
  };
  return map[roomType] || "meeting";
}

const scenarios = [...baseRooms, ...purposeRooms, ...overrideRooms, ...auditoriumCases, ...matrixRooms];
const summaries = scenarios.map(([name, room]) => [name, validateRoomScenario(name, room)]).filter((entry) => entry[1]);

const staleRoom = qa.applyPurpose(qa.createRoom(0), "seminar");
const recalculatedAuditorium = qa.autoTuneRoom({
  ...staleRoom,
  roomType: "auditorium",
  capacity: 300,
  autoCapacity: false,
  length: 110,
  width: 70,
  height: 24,
  displayQty: 1,
  cameraQty: 1,
  micQty: 1,
  speakerQty: 2,
  rackQty: 1,
  upsQty: 1,
  manualOverrides: {}
});
assert(recalculatedAuditorium.micQty >= 6, "Auto-tune did not recalculate stale mic quantity", { recalculatedAuditorium });
assert(recalculatedAuditorium.speakerQty >= 10, "Auto-tune did not recalculate stale speaker quantity", { recalculatedAuditorium });
assert(recalculatedAuditorium.cameraQty >= 2, "Auto-tune did not recalculate stale camera quantity", { recalculatedAuditorium });
validateRoomScenario("auditorium-stale-recalculated", recalculatedAuditorium);

const programmingScale = [
  ["huddle", qa.autoTuneRoom({ ...qa.applyPurpose(qa.createRoom(0), "huddle"), roomType: "huddle", autoCapacity: false, capacity: 4, length: 12, width: 10, height: 9 })],
  ["training", qa.autoTuneRoom({ ...qa.applyPurpose(qa.createRoom(0), "training"), roomType: "training", autoCapacity: false, capacity: 40, length: 52, width: 30, height: 12 })],
  ["auditorium", qa.autoTuneRoom({ ...qa.applyPurpose(qa.createRoom(0), "seminar"), roomType: "auditorium", autoCapacity: false, capacity: 300, length: 110, width: 70, height: 24 })]
].map(([name, room]) => {
  const service = qa.buildRoomBoq(room).find((item) => item.category === "Services");
  return [name, service.serviceScope.programming.engineerHours];
});
assert(programmingScale[0][1] < programmingScale[1][1], "Programming hours should scale from huddle to training", { programmingScale });
assert(programmingScale[1][1] < programmingScale[2][1], "Programming hours should scale from training to auditorium", { programmingScale });

const multiRoom = {
  rooms: summaries.slice(0, 12).map((entry) => entry[1].room),
  activeRoom: 11,
  budget: "business"
};

try {
  const project = qa.buildProject(multiRoom);
  assert(project.rooms.length === 12, "12-room project did not build 12 rooms", { count: project.rooms.length });
  assert(project.total[1] >= project.total[0] && project.total[0] > 0, "12-room total invalid", { total: project.total });
} catch (error) {
  failures.push({ message: "12-room project crashed", context: { error: error.stack || String(error) } });
}

if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures }, null, 2));
  process.exit(1);
}

const auditorium300 = summaries.find(([name]) => name === "auditorium-300")?.[1];
console.log(JSON.stringify({
  status: "PASS",
  scenarios: scenarios.length,
  auditorium300: auditorium300 ? {
    estimate: qa.bandText(auditorium300.project.total),
    items: auditorium300.boq.map((item) => ({
      category: item.category,
      component: item.component,
      qty: item.qty,
      source: item.source || "Calculated scope",
      fit: item.confidence
    }))
  } : null
}, null, 2));
