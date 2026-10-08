const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const pages = {
  'index.html': ['Turnkey AV Solutions & Technology Distribution India | GPSPL', 'Plan complete AV solutions with GPSPL: conference rooms, LED walls, JBL audio, education and hospitality systems, plus Samsung and LG commercial display supply.'],
  'conference-room-solutions.html': ['Conference Room AV & Boardroom Solutions India | GPSPL', 'Plan corporate conference room AV with video conferencing, displays, ceiling microphones, room control, installation and support. Request a project BOQ.', 'Conference Room AV & Boardroom Solutions'],
  'active-led-wall-solutions.html': ['Active LED Video Wall Solutions & Supply India | GPSPL', 'Specify an indoor or outdoor Active LED video wall with pixel pitch planning, mounting, processing, calibration and support. Request a site-specific quote.', 'Active LED Video Wall Solutions'],
  'professional-audio-solutions.html': ['JBL Professional Audio & Sound System Solutions | GPSPL', 'Plan JBL professional sound systems for offices, classrooms, hotels and auditoriums, with speaker coverage, microphones, DSP tuning and installation.', 'JBL Professional Audio & Sound System Solutions'],
  'smart-classroom-solutions.html': ['Smart Classroom & Education AV Solutions India | GPSPL', 'Equip schools and colleges with interactive displays, classroom audio, hybrid teaching and lecture capture. Request a complete education AV project BOQ.', 'Smart Classroom & Education AV Solutions'],
  'hotel-hospitality-av-solutions.html': ['Hotel & Hospitality AV, LED Walls & Sound | GPSPL', 'Plan hotel and hospitality AV: banquet LED walls, meeting rooms, background music, sound systems and commercial TVs, from specification to commissioning.', 'Hotel & Hospitality AV Solutions'],
  'av-technology-distribution.html': ['AV Technology Distribution & B2B Hardware Supply | GPSPL', 'Request B2B supply pricing and availability for commercial displays, LED systems, professional audio and conferencing hardware, with project procurement support.'],
  'audio-visual-integration.html': ['End-to-End AV System Integration India | GPSPL', 'GPSPL plans and delivers end-to-end audio visual solutions: system design, equipment supply, installation, commissioning, user training and maintenance.', 'End-to-End Audio Visual System Integration'],
  'corporate-projects.html': ['Corporate AV Projects & Conference Room Installations | GPSPL', 'Explore GPSPL corporate AV projects, including boardrooms, conferencing, commercial displays and workplace systems. Discuss a similar office installation.'],
  'education-projects.html': ['Education AV Projects & Smart Classroom Installations | GPSPL', 'Explore GPSPL education technology projects for classrooms and learning spaces, including interactive displays, audio and teaching systems.'],
  'samsung-commercial-display-qmc.html': ['Samsung QMC Commercial Displays & Project Quotes | GPSPL', 'Explore Samsung QMC commercial displays for signage and corporate spaces. View model information and request current availability, pricing and installation.'],
  'samsung-commercial-display-qbc.html': ['Samsung QBC Commercial Displays & Signage Supply | GPSPL', 'Explore Samsung QBC commercial display options for business signage. Request model-specific availability, project pricing and installation support.'],
  'samsung-business-tv-befx-h2.html': ['Samsung Business TV BEFX-H2 Supply & Quotes | GPSPL', 'Explore Samsung Business TV BEFX-H2 for commercial viewing and business spaces. Request model-specific pricing, availability and installation support.'],
  'lg-commercial-tv-ua831c.html': ['LG UA831C Commercial TV Supply & Project Quotes | GPSPL', 'Explore LG UA831C commercial TVs for hospitality and business spaces. Request model-specific pricing, availability and installation support.', 'LG UA831C 4K Commercial TV'],
  'lg-commercial-tv-nu88c.html': ['LG NU88C Commercial TV Supply & Project Quotes | GPSPL', 'Explore LG NU88C commercial TV options for business and hospitality projects. Request current model availability, pricing and installation support.']
};
// Keep Delhi NCR as the primary market while retaining national project intent.
const regionalTitles = {
  'index.html': 'AV Solutions & Distribution Delhi NCR, Pan-India | GPSPL',
  'conference-room-solutions.html': 'Conference Room AV Solutions Delhi NCR & India | GPSPL',
  'active-led-wall-solutions.html': 'Active LED Video Walls Delhi NCR & India | GPSPL',
  'professional-audio-solutions.html': 'JBL Audio & Sound Systems Delhi NCR & India | GPSPL',
  'smart-classroom-solutions.html': 'Smart Classroom AV Solutions Delhi NCR & India | GPSPL',
  'hotel-hospitality-av-solutions.html': 'Hotel & Hospitality AV Delhi NCR & India | GPSPL',
  'av-technology-distribution.html': 'AV Distribution Delhi NCR & Pan-India Supply | GPSPL',
  'audio-visual-integration.html': 'End-to-End AV Integration Delhi NCR & India | GPSPL',
  'corporate-projects.html': 'Corporate AV Projects Delhi NCR & India | GPSPL',
  'education-projects.html': 'Education AV Projects Delhi NCR & India | GPSPL',
  'samsung-commercial-display-qmc.html': 'Samsung QMC Displays Delhi NCR & India Supply | GPSPL',
  'samsung-commercial-display-qbc.html': 'Samsung QBC Displays Delhi NCR & India Supply | GPSPL',
  'samsung-business-tv-befx-h2.html': 'Samsung Business TV Delhi NCR & India Supply | GPSPL',
  'lg-commercial-tv-ua831c.html': 'LG UA831C Commercial TV Delhi NCR & India | GPSPL',
  'lg-commercial-tv-nu88c.html': 'LG NU88C Commercial TV Delhi NCR & India | GPSPL'
};
const regionalDescriptions = {
  'index.html': 'Delhi NCR AV integration and technology supply, with Pan-India project enquiries for conference rooms, Active LED, JBL audio, education and hospitality.',
  'conference-room-solutions.html': 'Conference room AV in Delhi NCR, with Pan-India project planning: video conferencing, displays, microphones, control, installation and support. Request a BOQ.',
  'active-led-wall-solutions.html': 'Active LED video walls for Delhi NCR and Pan-India projects. Plan pixel pitch, mounting, processing, installation and calibration with a site-specific quote.',
  'professional-audio-solutions.html': 'JBL professional sound systems in Delhi NCR and for Pan-India projects: speaker coverage, microphones, DSP and installation for offices, hotels and venues.',
  'smart-classroom-solutions.html': 'Smart classroom AV for Delhi NCR schools and Pan-India campuses: interactive displays, teaching audio and hybrid learning. Request a project-specific BOQ.',
  'hotel-hospitality-av-solutions.html': 'Hotel AV in Delhi NCR and for Pan-India projects: banquet LED walls, meeting rooms, sound, background music and commercial TVs. Discuss your venue scope.',
  'av-technology-distribution.html': 'Commercial AV distribution from New Delhi for Delhi NCR and Pan-India buyers. Request equipment pricing, stock availability and project delivery terms.',
  'audio-visual-integration.html': 'End-to-end AV integration in Delhi NCR and for Pan-India projects: design, equipment supply, installation, commissioning, training and maintenance planning.',
  'corporate-projects.html': 'Explore GPSPL corporate AV project work for Delhi NCR and India: boardrooms, video conferencing and workplace displays. Discuss a similar office project.',
  'education-projects.html': 'Explore GPSPL education AV project work for Delhi NCR and India: interactive displays, classroom audio and learning spaces. Discuss your campus requirements.',
  'samsung-commercial-display-qmc.html': 'Samsung QMC commercial display enquiries for Delhi NCR and Pan-India buyers. Review model details and request pricing, availability and installation scope.',
  'samsung-commercial-display-qbc.html': 'Samsung QBC commercial displays for Delhi NCR and Pan-India supply enquiries. Request model-specific pricing, stock availability and installation support.',
  'samsung-business-tv-befx-h2.html': 'Samsung BEFX-H2 Business TV enquiries for Delhi NCR and Pan-India buyers. Request model-specific pricing, availability, delivery and installation scope.',
  'lg-commercial-tv-ua831c.html': 'LG UA831C commercial TV enquiries for Delhi NCR and Pan-India buyers. Explore model details and request pricing, stock and installation scope.',
  'lg-commercial-tv-nu88c.html': 'LG NU88C commercial TV enquiries for Delhi NCR and Pan-India buyers. Request model-specific availability, pricing, delivery and installation scope.'
};
for (const file of Object.keys(regionalTitles)) {
  pages[file][0] = regionalTitles[file];
  pages[file][1] = regionalDescriptions[file];
}
Object.assign(pages, {
  'av-system-integrator-delhi-ncr.html': ['AV System Integrator Delhi NCR | Pan-India Projects | GPSPL', 'Delhi NCR AV integration for Delhi, Gurugram, Noida and nearby cities. Plan conference rooms, LED walls, audio and education AV, with Pan-India enquiries welcome.'],
  'av-system-integrator-gurgaon.html': ['AV System Integrator Gurgaon & Gurugram | GPSPL', 'Plan corporate AV in Gurgaon and Gurugram: conference rooms, displays, audio and room control. Request a project BOQ, installation scope and support plan.'],
  'active-led-wall-supplier-noida.html': ['Active LED Wall Supply & Installation Noida | GPSPL', 'Plan Active LED walls in Noida and Greater Noida: pixel pitch selection, structure, processing and commissioning. Request a site-specific project quote.']
});
const coverageTopics = {
  'index.html': 'AV integration and technology distribution',
  'conference-room-solutions.html': 'Conference room and boardroom AV',
  'active-led-wall-solutions.html': 'Active LED video wall planning and installation',
  'professional-audio-solutions.html': 'JBL professional audio and sound system integration',
  'smart-classroom-solutions.html': 'Smart classrooms and education AV',
  'hotel-hospitality-av-solutions.html': 'Hotel and hospitality AV',
  'av-technology-distribution.html': 'Commercial AV equipment distribution',
  'audio-visual-integration.html': 'End-to-end audio visual integration'
};
const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let source = fs.readFileSync(path.join(root, 'JS/seo.js'), 'utf8');
for (const [file, [title, description, heading]] of Object.entries(pages)) {
  const target = path.join(root, file);
  let html = fs.readFileSync(target, 'utf8');
  const headEnd = html.indexOf('</head>');
  let head = html.slice(0, headEnd);
  head = head.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escape(title)}</title>`);
  head = head.replace(/<meta\s+(name="description"|property="og:description"|name="twitter:description")\s+content="[^>]*>/g, (_, attr) => `<meta ${attr} content="${escape(description)}">`);
  head = head.replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*(")/g, (_, a, b) => a + escape(title) + b);
  html = head + html.slice(headEnd);
  if (heading && !["conference-room-solutions.html", "smart-classroom-solutions.html", "hotel-hospitality-av-solutions.html", "audio-visual-integration.html"].includes(file)) html = html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, (_, a, b) => a + escape(heading) + b);
  if (coverageTopics[file]) {
    const topic = escape(coverageTopics[file]);
    const coverage = `<section class="product-range-section section-padding" id="regional-project-coverage" aria-labelledby="regional-coverage-heading">
      <div class="container product-range-panel">
        <div>
          <p class="section-eyebrow">Delhi NCR first. Pan-India projects welcome.</p>
          <h2 id="regional-coverage-heading">${topic} in Delhi NCR and across India</h2>
          <p>Based in Nehru Place, New Delhi, GPSPL handles enquiries from Delhi, Gurugram, Noida, Greater Noida, Ghaziabad and Faridabad. Explore our <a href="/av-system-integrator-delhi-ncr">Delhi NCR AV integration</a> scope or discuss a <a href="/av-system-integrator-gurgaon">Gurugram office project</a>.</p>
          <p>For Pan-India and multi-site requirements, share your city, site count, equipment needs and target date. Equipment availability, freight, installation coverage and maintenance terms are confirmed in your quotation. For supply enquiries, explore <a href="/av-technology-distribution">commercial AV distribution</a>; for complete delivery, explore <a href="/audio-visual-integration">end-to-end AV integration</a>.</p>
          <p><a href="/contact">Request a city-specific project quote</a>, <a href="tel:+918920830377">call +91 89208 30377</a> or <a href="https://wa.me/918920830377">share your requirement on WhatsApp</a>. Include room size, solution type and project location so the team can assess your scope.</p>
        </div>
      </div>
    </section>`;
    const existingCoverage = /<section\b[^>]*id="regional-project-coverage"[\s\S]*?<\/section>/;
    html = existingCoverage.test(html) ? html.replace(existingCoverage, coverage) : html.includes('</main>') ? html.replace('</main>', coverage + '\n</main>') : html.replace('</body>', coverage + '\n</body>');
  }
  fs.writeFileSync(target, html.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, ''));
  const key = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const entry = new RegExp('("' + key + '": \\{\\s*)title: "(?:\\\\.|[^"\\\\])*",\\s*description: "(?:\\\\.|[^"\\\\])*",');
  if (entry.test(source)) source = source.replace(entry, (_, prefix) => prefix + `title: ${JSON.stringify(title)},\n            description: ${JSON.stringify(description)},`);
  else source = source.replace('const pageSeo = {', `const pageSeo = {\n        ${JSON.stringify(file)}: { title: ${JSON.stringify(title)}, description: ${JSON.stringify(description)}, type: ${JSON.stringify(file.startsWith('av-system-') || file.startsWith('active-led-') || file.includes('distribution') ? 'service' : 'product')} },`);
}
fs.writeFileSync(path.join(root, 'JS/seo.js'), source);
for (const file of Object.keys(pages)) {
  const head = fs.readFileSync(path.join(root, file), 'utf8').split('</head>')[0];
  for (const pattern of [/<title>/g, /name="description"/g, /rel="canonical"/g]) {
    if ([...head.matchAll(pattern)].length !== 1) throw new Error(`${file}: missing or duplicate ${pattern}`);
  }
  const canonical = head.match(/rel="canonical" href="([^"]+)"/)[1];
  if (canonical.endsWith('.html')) throw new Error(`${file}: inconsistent canonical`);
  const full = fs.readFileSync(path.join(root, file), 'utf8');
  if (!full.includes('name="robots" content="index, follow')) throw new Error(`${file}: indexing directive changed`);
  if (coverageTopics[file]) {
    if ([...full.matchAll(/id="regional-project-coverage"/g)].length !== 1) throw new Error(`${file}: coverage section missing or duplicated`);
    const section = full.match(/<section\b[^>]*id="regional-project-coverage"[\s\S]*?<\/section>/)[0];
    for (const [, href] of section.matchAll(/href="(\/[^"#]*)"/g)) {
      if (!fs.existsSync(path.join(root, href.slice(1) + '.html'))) throw new Error(`${file}: broken regional link ${href}`);
    }
  }
}
console.log(`Updated metadata for ${Object.keys(pages).length} commercial pages; existing routes retained.`);
