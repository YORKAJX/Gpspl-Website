const fs = require('fs');
const entries = {
  'industries.html': ['AV Solutions by Industry Delhi NCR & India | GPSPL', 'Explore AV supply, upgrades and turnkey projects for offices, education, hotels, healthcare, retail, government, BFSI, property, media, automotive and gyms.'],
  'av-project-discovery-consultation.html': ['AV Project Consultation & Turnkey BOQ Delhi NCR | GPSPL', 'Discuss equipment supply, room upgrades or complete turnkey AV projects in Delhi NCR and across India. Share your sector, city, quantities and project scope.'],
  'coworking-space-av-solutions.html': ['Coworking & Shared Office AV Delhi NCR, India | GPSPL', 'Plan meeting rooms, collaboration displays, conferencing and room booking for coworking spaces in Delhi NCR and India. Discuss supply or complete installation.'],
  'auditorium-av-solutions.html': ['Auditorium Sound & AV Delhi NCR, Pan-India | GPSPL', 'Plan auditorium audio, microphones, stage displays, presentation and AV control. Discuss venue capacity, acoustics and installation in Delhi NCR or across India.'],
  'command-control-center-av-solutions.html': ['Command & Control Room AV Delhi NCR, India | GPSPL', 'Discuss control room video walls, KVM switching, operator displays, power backup and integration for NOC and SOC projects in Delhi NCR and across India.'],
  'experience-center-av-solutions.html': ['Experience Center & Studio AV Delhi NCR, India | GPSPL', 'Plan AV for experience centers, showrooms and studios: LED displays, audio, interactive content and control. Discuss equipment supply or turnkey integration.'],
  'digital-signage-solutions.html': ['Digital Signage Solutions Delhi NCR & India | GPSPL', 'Plan commercial digital signage for shops, hotels, offices and campuses. Request displays, players, content management and installation for single or multiple sites.'],
  'interactive-display-solutions.html': ['Interactive Displays & Smart Boards Delhi NCR | GPSPL', 'Explore interactive displays and smart boards for teaching, meeting rooms and training. Discuss sizes, software, supply and installation in Delhi NCR and India.'],
  'video-wall-solutions.html': ['Video Wall Solutions Delhi NCR & Pan-India | GPSPL', 'Plan video walls for control rooms, retail, corporate and public spaces. Discuss display technology, controllers, mounting, installation and maintenance.'],
  'active-led-wall-installation.html': ['Active LED Wall Installation Delhi NCR & India | GPSPL', 'Discuss LED wall site surveys, mounting, power, processing, commissioning and support for indoor and outdoor projects in Delhi NCR and across India.'],
  'unified-communication-collaboration.html': ['Video Conferencing & Collaboration Delhi NCR | GPSPL', 'Plan video conferencing, meeting room cameras, microphones, displays and collaboration systems. Discuss Teams, Zoom and BYOD requirements in Delhi NCR and India.'],
  'control-automation.html': ['AV Control & Room Automation Delhi NCR, India | GPSPL', 'Plan AV control for meeting rooms, auditoriums and hospitality spaces. Discuss touch panels, switching, user workflows and integration in Delhi NCR and India.'],
  'kvm-av-switching-solutions.html': ['KVM & AV Switching Solutions Delhi NCR, India | GPSPL', 'Discuss KVM, AV switching, signal distribution and operator connectivity for offices and control rooms. Request supply or integration in Delhi NCR and India.'],
  'ups-power-backup-solutions.html': ['UPS & Power Backup Supply Delhi NCR, India | GPSPL', 'Discuss UPS capacity, runtime and power backup for AV, IT and control rooms. Share your load, site and quantity for supply or installation in Delhi NCR and India.'],
  'it-infrastructure-solutions.html': ['IT Infrastructure Solutions Delhi NCR & India | GPSPL', 'Discuss networking, computing and IT infrastructure for offices, institutions and multi-site projects. Request equipment supply, upgrades or project integration.'],
  'peripheral-solutions.html': ['Creative & Business Peripherals Delhi NCR | GPSPL', 'Discuss creative displays, input devices and business peripherals for studios, education and offices. Request model-specific supply pricing in Delhi NCR and India.'],
  'projector-accessories.html': ['Projectors & AV Accessories Delhi NCR, India | GPSPL', 'Discuss projectors, lenses, screens, mounting and AV accessories for offices, education and venues. Share room size and quantities for supply or installation.'],
  'amc-maintenance-services.html': ['AV AMC & Maintenance Delhi NCR, India | GPSPL', 'Discuss AV maintenance, troubleshooting, upgrades and support for installed systems. Share equipment details and site location to confirm coverage and AMC scope.' ]
};
const esc = text => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
let seo = fs.readFileSync('JS/seo.js', 'utf8');
for (const [file, [title, description]] of Object.entries(entries)) {
  if (!fs.existsSync(file)) throw Error('Missing page: ' + file);
  let html = fs.readFileSync(file, 'utf8');
  const end = html.indexOf('</head>');
  let head = html.slice(0, end);
  head = head.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + esc(title) + '</title>');
  head = head.replace(/<meta\s+(name="description"|property="og:description"|name="twitter:description")\s+content="[^>]*>/g, (_, kind) => '<meta ' + kind + ' content="' + esc(description) + '">');
  head = head.replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*(")/g, (_, a, b) => a + esc(title) + b);
  html = head + html.slice(end);
  if (file === 'industries.html') html = html.replace(/(<h2[^>]*>)Best /g, '$1');
  fs.writeFileSync(file, html);
  const key = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const entry = new RegExp('("' + key + '": \\{\\s*)title: "(?:\\\\.|[^"\\\\])*",\\s*description: "(?:\\\\.|[^"\\\\])*",');
  if (entry.test(seo)) seo = seo.replace(entry, (_, prefix) => prefix + 'title: ' + JSON.stringify(title) + ',\n            description: ' + JSON.stringify(description) + ',');
  else seo = seo.replace('const pageSeo = {', 'const pageSeo = {\n        ' + JSON.stringify(file) + ': { title: ' + JSON.stringify(title) + ', description: ' + JSON.stringify(description) + ', type: "service" },');
}
fs.writeFileSync('JS/seo.js', seo);
const sectors = [ ['Corporate & shared offices', 'corporate'], ['Schools & colleges', 'education'], ['Hotels & hospitality', 'hospitality'], ['Government & control rooms', 'government'], ['Healthcare', 'healthcare'], ['Retail & malls', 'retail'], ['Real estate', 'real-estate'], ['Banking & financial services', 'bfsi'], ['Media & studios', 'media'], ['Automotive showrooms', 'automotive'], ['Gyms & fitness', 'fitness-gym'] ];
const block = `<section class="product-range-section section-padding" id="project-supply-and-turnkey" aria-labelledby="project-supply-heading">
  <div class="container product-range-panel"><div>
    <p class="section-eyebrow">Equipment supply, upgrades and complete projects</p>
    <h2 id="project-supply-heading">One display, one room or a complete AV rollout.</h2>
    <p>Tell GPSPL what you are planning in Delhi NCR or another Indian city. A replacement screen, a sound system upgrade and a multi-site turnkey project need different scopes; your quotation should reflect the equipment, site work and support you actually need.</p>
    <h3>Equipment supply and distribution</h3>
    <p>For <a href="/av-technology-distribution">AV equipment supply</a>, send the model or use case, quantity, delivery city and required date. Explore <a href="/samsung-commercial-display-qmc">Samsung commercial displays</a>, <a href="/lg-commercial-tv-ua831c">LG commercial TVs</a>, <a href="/professional-audio-solutions">professional audio</a> and <a href="/interactive-display-solutions">interactive displays</a>. Pricing, stock, delivery and warranty terms are confirmed in the quotation.</p>
    <h3>Turnkey AV projects and upgrades</h3>
    <p>For <a href="/audio-visual-integration">end-to-end AV integration</a>, share room dimensions or drawings, seating, existing equipment, intended use, city, timeline and budget range if available. Scope can include design, equipment, cabling, mounting, configuration, commissioning and handover, with installation and maintenance coverage agreed for your site.</p>
    <p>Choose your setting: ${sectors.map(([name, id]) => '<a href="/industries#industry-' + id + '">' + name + '</a>').join(' · ')}.</p>
    <p><a href="tel:+918920830377">Call the project desk: +91 89208 30377</a> or <a href="https://wa.me/918920830377?text=Hello%20GPSPL%2C%20I%20need%20equipment%20supply%20or%20a%20turnkey%20AV%20quote.%20My%20city%3A%20%20Requirement%3A%20%20Quantity%20or%20room%20size%3A%20%20Timeline%3A">share your scope on WhatsApp</a>. For a detailed brief, use <a href="/av-project-discovery-consultation">project consultation</a>.</p>
  </div></div>
</section>`;
const scopePages = ['index.html', 'industries.html', 'av-technology-distribution.html', 'audio-visual-integration.html', 'av-project-discovery-consultation.html'];
for (const file of scopePages) {
  let html = fs.readFileSync(file, 'utf8');
  const old = /<section\b[^>]*id="project-supply-and-turnkey"[\s\S]*?<\/section>/;
  if (old.test(html)) html = html.replace(old, block);
  else if (html.includes('</main>')) html = html.replace('</main>', block + '\n</main>');
  else if (html.includes('<div id="footer-container">')) html = html.replace('<div id="footer-container">', block + '\n<div id="footer-container">');
  else throw Error('No content/footer insertion point: ' + file);
  fs.writeFileSync(file, html);
}
const changed = new Set([...Object.keys(entries), ...scopePages]);
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const file of changed) {
  const route = file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');
  const url = 'https://gpspl.co.in' + route;
  const key = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('(<url>\\s*<loc>' + key + '</loc>\\s*<lastmod>)[^<]*(</lastmod>)');
  if (pattern.test(sitemap)) sitemap = sitemap.replace(pattern, (_, a, b) => a + '2026-10-09' + b);
  else sitemap = sitemap.replace('</urlset>', '  <url><loc>' + url + '</loc><lastmod>2026-10-09</lastmod></url>\n</urlset>');
}
fs.writeFileSync('sitemap.xml', sitemap);
for (const file of changed) {
  const html = fs.readFileSync(file, 'utf8'), head = html.split('</head>')[0];
  for (const pattern of [/<title>/g, /name="description"/g, /rel="canonical"/g]) if ([...head.matchAll(pattern)].length !== 1) throw Error(file + ': missing or duplicate metadata');
  if (/name="robots"[^>]*noindex/i.test(head)) throw Error(file + ': noindex');
  if (scopePages.includes(file)) {
    if ([...html.matchAll(/id="project-supply-and-turnkey"/g)].length !== 1) throw Error(file + ': duplicate or missing enquiry section');
    const section = html.match(/<section\b[^>]*id="project-supply-and-turnkey"[\s\S]*?<\/section>/)[0];
    for (const [, href] of section.matchAll(/href="(\/[^"#]*)/g)) if (!fs.existsSync(href.slice(1) + '.html')) throw Error(file + ': missing linked page ' + href);
  }
}
console.log('Updated ' + Object.keys(entries).length + ' service/sector metadata entries and 5 supply/turnkey enquiry paths; sitemap dates changed only for edited pages.');
