import fs from 'node:fs';

const source = fs.readFileSync('JS/room-configurator.js', 'utf8');
let optimized = source;
fs.mkdirSync('assests/images/brand', { recursive: true });

for (const key of ['logo', 'ribbon']) {
  const match = optimized.match(new RegExp(`${key}: "data:image/png;base64,([^"]+)`));
  const output = `assests/images/brand/proposal-${key}.png`;
  if (match) {
    fs.writeFileSync(output, Buffer.from(match[1], 'base64'));
    optimized = optimized.replace(
      new RegExp(`${key}: "data:image/png;base64,[^"]+"`),
      `${key}: "/assests/images/brand/proposal-${key}.png"`,
    );
  } else if (!fs.existsSync(output)) {
    throw new Error(`Neither embedded ${key} image nor ${output} was found`);
  }
  console.log(`${output}: ${fs.statSync(output).size} bytes`);
}

if (optimized !== source) {
  fs.writeFileSync('JS/room-configurator.js', optimized);
  console.log(`JS/room-configurator.js reduced by ${source.length - optimized.length} characters`);
} else {
  console.log('Proposal assets are already externalized');
}
