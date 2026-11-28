import fs from 'node:fs';

// Auditable coverage of buyer journeys, not a ranking or lead-generation claim.
const groups = {
  'Corporate and conferencing': ['conference-room-solutions', 'unified-communication-collaboration', 'corporate-projects', 'coworking-space-av-solutions', 'ptz-camera-solutions'],
  'Education and auditoriums': ['smart-classroom-solutions', 'interactive-display-solutions', 'education-projects', 'auditorium-av-solutions', 'projector-accessories'],
  'LED, video walls and signage': ['active-led-wall-solutions', 'video-wall-solutions', 'digital-signage-solutions', 'digital-standee-supplier-india'],
  'Audio, hospitality and religious venues': ['professional-audio-solutions', 'audio-technologies', 'hotel-hospitality-av-solutions', 'religious-place-av-solutions'],
  'Control, studio and experience rooms': ['command-control-center-av-solutions', 'newsroom-broadcast-av-solutions', 'experience-center-av-solutions', 'control-automation', 'kvm-av-switching-solutions'],
  'Healthcare': ['healthcare-projects'],
  'Commercial TVs and displays': ['samsung-business-tv-befx-h2', 'samsung-commercial-display-qbc', 'samsung-commercial-display-qmc', 'lg-commercial-tv-nu88c', 'lg-commercial-tv-ua831c', 'lg-createboard-tr3er'],
  'Supply, turnkey and support': ['audio-visual-integration', 'turnkey-av-projects-india', 'av-technology-distribution', 'it-infrastructure-solutions', 'amc-maintenance-services']
};
const rows=[];
for (const [vertical, slugs] of Object.entries(groups)) for(const slug of slugs) {
 const html=fs.readFileSync(slug+'.html','utf8');
 const links=[...html.matchAll(/href=["']([^"']+)["']/g)].map(m=>m[1]);
 rows.push({vertical, page:'/'+slug,
  title:html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '',
  call:links.some(h=>h==='tel:+918920830377'),
  whatsapp:links.some(h=>h.startsWith('https://wa.me/918920830377')),
  email:links.some(h=>h.startsWith('mailto:global@gpspl.co.in')),
  form:/<form\b/i.test(html),
  contactRoute:links.some(h=>/^\/?contact(?:\.html)?(?:[?#]|$)/.test(h)),
  buyerScope:/name="purchase_scope"/.test(html),
  city:/name="(?:city|location)"/.test(html),
  searchPerformance:'Unavailable in this source audit', receivedLeads:'Unavailable in this source audit'
 });
}
const gaps=rows.filter(r=>!r.call || !r.whatsapp || (!r.form && !r.contactRoute));
console.log(JSON.stringify({checkedPages:rows.length,groups:Object.keys(groups).length,criticalRouteGaps:gaps,rows},null,2));
if(gaps.length) process.exitCode=1;
