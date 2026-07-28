import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync("JS/room-configurator.js", "utf8");
const instrumented = source.replace(
  /\n\}\)\(\);\s*$/,
  `\nwindow.__qa={ CONFIG, createRoom, applyPurpose, autoTuneRoom, normalizeRoom, buildRoomBoq, buildProject, area, bandText };\n})();`
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

function scenario(name, purpose, roomType, capacity, length, width, height, overrides = {}) {
  const base = qa.applyPurpose(qa.createRoom(0), purpose);
  return {
    name,
    input: qa.autoTuneRoom({
      ...base,
      designation: name,
      purpose,
      roomType,
      autoCapacity: false,
      capacity,
      length,
      width,
      height,
      ...overrides
    })
  };
}

const baseCases = [
  ["2-person focus huddle", "huddle", "huddle", 2, 9, 8, 9],
  ["4-person huddle", "huddle", "huddle", 4, 12, 10, 9],
  ["6-person VC room", "meeting", "conference", 6, 16, 12, 9],
  ["10-person conference", "meeting", "conference", 10, 24, 16, 10],
  ["14-person conference", "meeting", "conference", 14, 30, 18, 10],
  ["18-person boardroom", "boardroom", "boardroom", 18, 36, 20, 10],
  ["24-person premium boardroom", "boardroom", "boardroom", 24, 44, 22, 11],
  ["28-seat training", "training", "training", 28, 42, 26, 11],
  ["40-seat classroom", "training", "classroom", 40, 46, 28, 11],
  ["60-seat training hall", "training", "training", 60, 60, 36, 12],
  ["80-seat seminar hall", "seminar", "auditorium", 80, 70, 45, 16],
  ["120-seat multipurpose hall", "seminar", "auditorium", 120, 85, 52, 18],
  ["180-seat auditorium", "seminar", "auditorium", 180, 95, 60, 20],
  ["300-seat auditorium", "seminar", "auditorium", 300, 110, 70, 24],
  ["500-seat large auditorium", "seminar", "auditorium", 500, 160, 100, 32],
  ["1000-seat mega auditorium", "seminar", "auditorium", 1000, 220, 140, 38],
  ["reception signage small", "reception", "reception", 4, 18, 14, 10],
  ["reception CCTV desk", "reception", "reception", 8, 28, 18, 11, { cctvQty: 4, laptopQty: 1, desktopQty: 1, networkQty: 1 }],
  ["server rack closet", "server", "server", 2, 14, 12, 10],
  ["server control room", "server", "server", 4, 28, 18, 11, { cctvQty: 2, networkQty: 2, rackQty: 3, upsQty: 3 }],
  ["BYOD meeting room", "meeting", "conference", 8, 20, 14, 10, { platform: "byod", controllerQty: 0 }]
];

const variants = [
  ["base", {}],
  ["high-ceiling", { heightAdd: 5 }],
  ["wide", { widthAdd: 14 }],
  ["deep", { lengthAdd: 22 }],
  ["low-budget-none-speaker", { speaker: "none", speakerQty: 0, manualOverrides: { speaker: true, speakerQty: true } }]
];

const scenarios = baseCases.flatMap((base) => variants.map(([variant, change]) => {
  const [name, purpose, roomType, capacity, length, width, height, overrides = {}] = base;
  const nextOverrides = { ...overrides, ...change };
  const lengthAdd = nextOverrides.lengthAdd || 0;
  const widthAdd = nextOverrides.widthAdd || 0;
  const heightAdd = nextOverrides.heightAdd || 0;
  delete nextOverrides.lengthAdd;
  delete nextOverrides.widthAdd;
  delete nextOverrides.heightAdd;
  return scenario(`${name} / ${variant}`, purpose, roomType, capacity, length + lengthAdd, width + widthAdd, height + heightAdd, nextOverrides);
}));

const failures = [];
const warnings = [];

function addIssue(list, name, area, detail, data = {}) {
  list.push({ scenario: name, area, detail, data });
}

function displayAudit(name, room, boq) {
  const display = boq.find((item) => item.category === "Display");
  if (room.display === "none" || room.displayQty === 0) return;
  if (!display) return addIssue(failures, name, "display", "Display selected but no display BOQ item generated.");
  const farthest = Math.max(room.length, room.width);
  const requiredDiagonal = Math.ceil(((Math.max(12, farthest * 12 / 6) / 0.49) / 10)) * 10;
  const component = display.component.toLowerCase();
  const largeImage = /led|projector|projection|300|240|150/.test(component);
  if (requiredDiagonal >= 180 && !largeImage) addIssue(failures, name, "display", "Large viewing distance did not produce projection/LED/large-image recommendation.", { requiredDiagonal, component: display.component });
  if (requiredDiagonal >= 260 && !/led|300|projection review/.test(component)) addIssue(warnings, name, "display", "Very large image should trigger LED/projection review.", { requiredDiagonal, component: display.component });
  if (requiredDiagonal <= 90 && /led|projector|projection/.test(component)) addIssue(warnings, name, "display", "Compact room may be over-designed with projection/LED.", { requiredDiagonal, component: display.component });
}

function audioAudit(name, room, boq) {
  const speaker = boq.find((item) => item.category === "Speaker");
  const amp = boq.find((item) => item.category === "Amplification");
  const mic = boq.find((item) => item.category === "Microphone");
  const dsp = boq.find((item) => item.category === "Audio Processing");
  if (room.speaker === "none" || room.speakerQty === 0) {
    if (speaker || amp) addIssue(failures, name, "audio", "Speaker disabled but speaker/amplifier still generated.");
  } else {
    if (!speaker) addIssue(failures, name, "audio", "Speaker selected but no speaker BOQ item generated.");
    if (!amp) addIssue(failures, name, "audio", "Speaker selected but no amplifier/headroom item generated.");
    if (room.roomType === "auditorium" && room.capacity >= 250 && speaker && !/delay|fill|PA/i.test(`${speaker.component} ${speaker.note}`)) {
      addIssue(failures, name, "audio", "Large auditorium lacks PA delay/fill coverage logic.", { component: speaker.component, note: speaker.note });
    }
  }
  if (room.microphone === "wireless" && room.capacity >= 80 && mic && !/RF coordination/i.test(mic.note)) {
    addIssue(failures, name, "microphone", "Wireless multi-mic scenario lacks RF coordination note.");
  }
  if ((room.micQty > 0 || room.speakerQty > 1 || room.cameraQty > 0) && !dsp) {
    addIssue(warnings, name, "dsp", "Endpoint mix may need DSP/audio processing but no DSP row was generated.");
  }
}

function infrastructureAudit(name, room, boq, project) {
  const cabling = boq.find((item) => item.category === "Cabling");
  const service = boq.find((item) => item.category === "Services");
  const validation = project.rooms[0].validation;
  if (!cabling || cabling.qty <= 0) addIssue(failures, name, "cabling", "No positive cabling allowance generated.");
  if (!service?.serviceScope) addIssue(failures, name, "services", "Professional installation scope metadata missing.");
  if (service?.serviceScope && service.serviceScope.activities.length < 8) addIssue(failures, name, "services", "Installation activity checklist is too short.", { activities: service.serviceScope.activities });
  if (service?.serviceScope && (!service.serviceScope.engineerDays || !service.serviceScope.programming?.engineerHours)) addIssue(failures, name, "services", "Engineer-day/programming-hour labour model missing.", { service: service.serviceScope });
  if (!validation || validation.checks.length < 8) addIssue(failures, name, "validation", "Engineering validation checks missing.");
  if (validation && validation.score < 70) addIssue(warnings, name, "validation", "Validation score below acceptable preliminary planning threshold.", { score: validation.score, label: validation.label });
}

const summaries = scenarios.map(({ name, input }) => {
  const room = qa.normalizeRoom(input);
  const project = qa.buildProject({ rooms: [room], activeRoom: 0, budget: "business" });
  const boq = project.rooms[0].boq;
  displayAudit(name, room, boq);
  audioAudit(name, room, boq);
  infrastructureAudit(name, room, boq, project);
  return {
    name,
    roomType: room.roomType,
    capacity: room.capacity,
    area: qa.area(room),
    estimate: qa.bandText(project.total),
    validation: project.rooms[0].validation.label,
    validationScore: project.rooms[0].validation.score
  };
});

const report = {
  status: failures.length ? "FAIL" : warnings.length ? "PASS_WITH_WARNINGS" : "PASS",
  scenarios: scenarios.length,
  failures,
  warnings,
  summary: {
    byRoomType: summaries.reduce((acc, item) => {
      acc[item.roomType] = (acc[item.roomType] || 0) + 1;
      return acc;
    }, {}),
    validationAverage: Math.round(summaries.reduce((sum, item) => sum + item.validationScore, 0) / summaries.length),
    validationMin: Math.min(...summaries.map((item) => item.validationScore)),
    validationMax: Math.max(...summaries.map((item) => item.validationScore))
  },
  examples: summaries.filter((item) => ["300-seat auditorium / base", "500-seat large auditorium / base", "1000-seat mega auditorium / base", "BYOD meeting room / base", "server control room / base"].includes(item.name))
};

fs.mkdirSync("outputs", { recursive: true });
fs.writeFileSync("outputs/boq-100-scenario-audit.json", JSON.stringify({ ...report, scenarios: summaries }, null, 2));

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
