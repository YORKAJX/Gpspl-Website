const fs = require('fs');

const pages = {
  'index.html': ['AV System Integrator Delhi NCR | Turnkey Solutions | GPSPL', 'Plan conference rooms, Active LED walls, professional audio, signage and classroom AV with GPSPL. Request equipment supply or turnkey integration.', 'Turnkey AV system integration. Conference rooms, LED walls &amp; education.'],
  'conference-room-solutions.html': ['Conference Room Setup Delhi NCR | Boardroom AV | GPSPL', 'Plan a complete boardroom or meeting-room setup: display, camera, microphones, speakers, control and Teams or Zoom integration. Request a site survey.'],
  'active-led-wall-solutions.html': ['Active LED Video Wall Delhi NCR | Installation | GPSPL', 'Plan an indoor or outdoor Active LED wall: pixel pitch, processor, mounting, power, installation and calibration. Request a site-specific quotation.'],
  'smart-classroom-solutions.html': ['Smart Classroom Setup Delhi NCR | Education AV | GPSPL', 'Interactive panels, teaching audio, digital podiums and hybrid-learning cameras for schools and colleges. Discuss one classroom or a campus rollout.'],
  'professional-audio-solutions.html': ['JBL Professional Audio Integrator Delhi NCR | GPSPL', 'Plan JBL speakers, microphones, amplifiers and DSP for offices, auditoriums, hospitality and religious venues. Request supply or sound-system integration.', 'JBL Professional Audio &amp; Sound System Integration in Delhi NCR'],
  'digital-signage-solutions.html': ['Digital Signage Company Delhi NCR | LG &amp; Samsung | GPSPL', 'Commercial displays, digital standees and signage CMS for retail, offices, hotels and hospitals. Request LG or Samsung supply and installation.'],
  'healthcare-projects.html': ['Hospital OPD Displays &amp; Healthcare AV Delhi NCR | GPSPL', 'OPD queue displays, wayfinding signage, telemedicine rooms and hospital AV integration. Discuss a single department or multi-site healthcare rollout.'],
  'religious-place-av-solutions.html': ['Religious Place Sound System Delhi NCR | GPSPL', 'Plan clear speech, devotional music, JBL speakers, microphones, outdoor coverage and live-darshan displays for temples, gurdwaras, mosques and churches.', 'Religious Place Sound Systems &amp; AV Integration in Delhi NCR'],
  'audio-visual-integration.html': ['AV System Integrator Delhi NCR | Turnkey Projects | GPSPL', 'One accountable team for AV design, BOQ, supply, installation, programming and handover across conference rooms, campuses, hotels and public venues.']
};

const attr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

for (const [file, [title, description, h1]] of Object.entries(pages)) {
  let source = fs.readFileSync(file, 'utf8');
  source = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  source = source.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${attr(description)}">`);
  source = source.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${attr(title)}">`);
  source = source.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${attr(description)}">`);
  source = source.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${attr(title)}">`);
  source = source.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${attr(description)}">`);
  if (h1) source = source.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${h1}</h1>`);
  source = source.replace(/fetchpriority="high"\s+loading="lazy"/g, 'fetchpriority="high"');
  fs.writeFileSync(file, source);
  console.log(`Updated ${file}`);
}
