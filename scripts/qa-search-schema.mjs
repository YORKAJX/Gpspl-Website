import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
let pages=0,blocks=0;
for(const file of fs.readdirSync('.').filter(x=>x.endsWith('.html'))) {
 const html=fs.readFileSync(file,'utf8');pages++;
 for(const [,json] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)){assert.doesNotThrow(()=>JSON.parse(json),file);blocks++;}
}
const source=fs.readFileSync('JS/seo.js','utf8');const start=source.indexOf('    function faqSchema('),end=source.indexOf('    function boqCalculatorSchema(',start);const code=source.slice(start,end);
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

// Regression: CMS breadcrumbs previously omitted item URLs (GSC missing item).
const cmsSource=fs.readFileSync('JS/cms-seo-schema.js','utf8');
function cmsBreadcrumb(labels){
 let output;
 const canonical='https://gpspl.co.in/careers';
 vm.runInNewContext(cmsSource,{URL,window:{location:{href:canonical}},document:{
  title:'Careers',body:{dataset:{}},
  querySelector:s=>s==='link[rel="canonical"]'?{href:canonical}:null,
  querySelectorAll:()=>labels.map(([textContent,href])=>({textContent,getAttribute:()=>href})),
  createElement:()=>({dataset:{}}),head:{appendChild:s=>{output=JSON.parse(s.text);}}
 }});
 return output['@graph'].find(x=>x['@type']==='BreadcrumbList');
}
const crumb=cmsBreadcrumb([['Home','/'],['/',null],['Careers',null]]);
assert.deepEqual(Array.from(crumb.itemListElement,x=>x.item),['https://gpspl.co.in/','https://gpspl.co.in/careers']);
assert.deepEqual(Array.from(crumb.itemListElement,x=>x.position),[1,2]);
assert.equal(cmsBreadcrumb([['Home','/']]),undefined);
const nested=cmsBreadcrumb([['Home','/'],['Section',null],['Partners','/technology-partners'],['Careers',null]]);
assert.deepEqual(Array.from(nested.itemListElement,x=>x.position),[1,2,3]);
assert.equal(nested.itemListElement[1].item,'https://gpspl.co.in/technology-partners');
console.log('PASS: CMS breadcrumb item URLs, relative links, final canonical and intermediate labels.');

assert.ok(!source.includes('"GPSPL Technology Portfolio"'), 'No invented generic product brand');
assert.ok(!source.includes('"reviewCount": "148"'), 'No hardcoded company review count');
assert.ok(!source.includes('graph.push(productSchema('), 'No duplicate price-less product offer');
console.log('PASS: shared SEO omits unverified ratings and generic product offers.');
