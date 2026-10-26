import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const routes = [
 ['industry-corporate', [['/corporate-projects','Corporate project scope'],['/blog/conference-room-av-setup-guide','Conference room buying guide']]],
 ['industry-education', [['/education-projects','Campus AV projects'],['/blog/smart-classroom-setup-cost-schools-colleges-india','Classroom budget planning']]],
 ['industry-hospitality', [['/blog/commercial-tv-vs-consumer-tv-guide','Choosing commercial TVs'],['/blog/samsung-business-tv-commercial-signage-guide','Samsung business TV planning']]],
 ['industry-government', [['/government-projects','Government project requirements'],['/blog/command-control-center-video-wall-guide','Control room display planning']]],
 ['industry-healthcare', [['/healthcare-projects','Healthcare project scope'],['/blog/hospital-healthcare-av-integration-ot-streaming-telemedicine-guide','Hospital AV planning guide']]],
 ['industry-retail', [['/blog/retail-digital-signage-video-wall-guide','Retail signage planning'],['/blog/enterprise-digital-signage-network-cms-guide','Managing a signage network']]],
 ['industry-real-estate', [['/experience-center-av-solutions','Experience centre requirements'],['/interactive-display-solutions','Interactive display options']]],
 ['industry-bfsi', [['/unified-communication-collaboration','Meeting platform integration'],['/kvm-av-switching-solutions','KVM and signal switching']]],
 ['industry-media', [['/blog/podcast-recording-broadcast-studio-setup-cost-india','Recording and broadcast studio planning'],['/video-technologies','Camera and video equipment']]],
 ['industry-automotive', [['/digital-signage-solutions','Showroom digital signage'],['/active-led-wall-solutions','Active LED display options']]],
 ['industry-fitness-gym', [['/blog/gym-fitness-studio-sound-system-installation-cost-india','Gym sound system planning'],['/audio-technologies','Speaker and amplifier supply']]]
];

export function improveIndustryLinks(html) {
  if(html.includes('data-industry-buyer-links')) throw Error('Buyer links already installed');
  for (const [id, links] of routes) {
    const start=html.indexOf(`<section id="${id}"`);
    const end=html.indexOf('</section>',start);
    if(start<0||end<0)throw Error(`Missing industry ${id}`);
    let block=html.slice(start,end);
    const insertion=block.indexOf('<div class="ind-card-actions">');
    if(insertion<0)throw Error(`Missing actions ${id}`);
    const nav=`<nav class="ind-sol-links" data-industry-buyer-links="${id}" aria-label="${id.slice(9).replaceAll('-',' ')} buying resources">${links.map(([url,label])=>`<a class="ind-sol-link" href="${url}">${label} →</a>`).join('')}</nav>\n`;
    block=block.slice(0,insertion)+nav+block.slice(insertion);
    html=html.slice(0,start)+block+html.slice(end);
  }
  html=html.replace('Explore 11 Industries','Explore Industries');
  const existing='<a href="#industry-fitness-gym" class="ind-nav-pill"><span class="pill-num">11</span> Gym &amp; Fitness</a>';
  if(!html.includes(existing))throw Error('Missing industry navigation');
  html=html.replace(existing,existing+'\n<a href="#religious-place-av" class="ind-nav-pill"><span class="pill-num">12</span> Religious Venues</a>');
  return html;
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  for(const [,links] of routes) for(const [url] of links) if(!fs.existsSync(url.slice(1)+'.html'))throw Error(`Missing target ${url}`);
  fs.writeFileSync('industries.html',improveIndustryLinks(fs.readFileSync('industries.html','utf8')));
  console.log('Added 22 contextual buying links and religious-venue navigation.');
}
