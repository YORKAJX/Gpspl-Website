import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
let pages=0,blocks=0;
for(const file of fs.readdirSync('.').filter(x=>x.endsWith('.html'))) {
 const html=fs.readFileSync(file,'utf8');pages++;
 for(const [,json] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)){assert.doesNotThrow(()=>JSON.parse(json),file);blocks++;}
}
const source=fs.readFileSync('JS/seo.js','utf8');const start=source.indexOf('    function faqSchema('),end=source.indexOf('    function productSchema(',start);const code=source.slice(start,end);
function schema(items){const get=vm.runInNewContext(code+'\nfaqSchema',{document:{querySelectorAll:()=>items}});return get('https://gpspl.co.in/example');}
const item=(question,answer)=>({querySelector:s=>s.startsWith('summary')?{textContent:question}:{textContent:answer}});
assert.equal(schema([]),null);
assert.equal(schema([item('Missing answer','')]),null);
const faq=schema([item('  What is supplied?  ','Displays, cameras and audio.'),item('What is supplied?','Duplicate answer'),item('Where?','Delhi NCR and other cities, with scope confirmed.')]);
assert.equal(faq.mainEntity.length,2);
assert.equal(faq.mainEntity[0].name,'What is supplied?');
assert.equal(faq.mainEntity[0].acceptedAnswer.text,'Displays, cameras and audio.');
assert.ok(!JSON.stringify(faq).includes('4.9'));
console.log(`PASS: ${pages} root pages / ${blocks} valid JSON-LD blocks; FAQs use actual DOM answers, skip empty answers and deduplicate questions.`);
