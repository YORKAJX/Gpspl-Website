import fs from 'node:fs';
import assert from 'node:assert/strict';

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, 'https://gpspl.co.in');
  assert.equal(parsed.search, '', `Query URL in sitemap: ${url}`);
  assert(!/\.html$/.test(parsed.pathname), `Noncanonical HTML URL: ${url}`);
  const file = parsed.pathname === '/' ? 'index.html' : `${parsed.pathname.slice(1)}.html`;
  const html = fs.readFileSync(file, 'utf8');
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  assert(!tags.some(t => /name=["'](?:robots|googlebot)["']/i.test(t) && /noindex/i.test(t)), `Noindex sitemap page: ${file}`);
  const canonical = (html.match(/<link\b[^>]*>/gi) || []).find(t => /rel=["']canonical["']/i.test(t));
  assert.equal(canonical?.match(/href=["']([^"']+)/i)?.[1], url, `Canonical mismatch: ${file}`);
}
const routes = fs.readFileSync('_redirects', 'utf8').split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'));
assert.equal(routes.at(-1), '/* /404.html 404', 'Catch-all must be last');
for (const route of routes.filter(l => l.startsWith('/resources/'))) {
  const [, destination, status] = route.split(/\s+/);
  assert.equal(status, '301');
  assert(urls.includes(`https://gpspl.co.in${destination}`), `Redirect target absent from sitemap: ${destination}`);
}
const robots = fs.readFileSync('robots.txt', 'utf8');
assert.equal((robots.match(/^User-agent:/gm) || []).length, 1, 'Crawler groups must use one consistent policy');
assert(!/Disallow: \/(?:thank-you|404|css|JS|modules|assests)/.test(robots));
for (const file of ['thank-you.html', '404.html']) {
  assert(/<meta[^>]+name="robots"[^>]+content="noindex/i.test(fs.readFileSync(file, 'utf8')), `${file} needs noindex`);
}
console.log(`PASS: ${urls.length} unique canonical, indexable sitemap pages; redirect ordering and utility exclusions verified.`);
