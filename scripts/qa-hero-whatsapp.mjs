import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('JS/studio-interactive.js','utf8');
const start=source.indexOf('    window.handleHeroExpressSubmit =');
const end=source.indexOf('\n    };',start)+7;
for (const [phone,sector,custom,valid] of [
 ['9123456789','Conference Room','',true],
 ['9123456789','CUSTOM_OTHER','Hospital OPD & displays / 5 screens',true],
 ['9123456789','Active LED','Indoor 3 x 2m',true],
 ['123','Conference Room','',false],
 ['9123456789','CUSTOM_OTHER','',false]
]) {
 let destination='',successEvents=0;
 const elements={heroExpPhone:{value:phone,focus(){}},heroExpSector:{value:sector},heroExpCustom:{value:custom,focus(){},style:{}},heroExpSuccess:{style:{},innerHTML:''}};
 const context={window:{location:{assign(url){destination=url;}},toggleHeroCustomReq(){}},document:{getElementById:id=>elements[id],dispatchEvent(){successEvents++;}},alert(){},encodeURIComponent,Math,fetch(){throw Error('WhatsApp flow must not depend on API');}};
 vm.runInNewContext(source.slice(start,end),context);
 context.window.handleHeroExpressSubmit({preventDefault(){}});
 assert.equal(Boolean(destination),valid);
 assert.equal(successEvents,0);
 if(valid){const url=new URL(destination);assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/918920830377');const msg=url.searchParams.get('text');assert.ok(msg.includes(phone));assert.ok(msg.includes(custom||sector));assert.ok(elements.heroExpSuccess.innerHTML.includes('Tap Send'));assert.ok(!elements.heroExpSuccess.innerHTML.includes('Inquiry recorded'));}
}
console.log('PASS: standard/custom/combined requirements open correct WhatsApp draft; invalid input blocked; no email dependency or false lead events. No real messages sent.');
