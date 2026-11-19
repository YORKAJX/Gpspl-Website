import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const base = 'https://gpspl.co.in';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(https:\/\/gpspl\.co\.in\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const urlToFile = new Map(urls.map((url) => {
  const pathname = new URL(url).pathname;
  return [pathname, pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`];
}));
const incoming = new Map([...urlToFile.keys()].map((key) => [key, new Set()]));
const findings = { brokenInternalLinks: [], missingH1: [], multipleH1: [], missingTitle: [], duplicateTitles: [], orphans: [] };
const titles = new Map();

function normalizeHref(href) {
  if (!href || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  let parsed;
  try { parsed = new URL(href, base); } catch { return null; }
  if (parsed.origin !== base) return null;
  let pathname = parsed.pathname.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
  if (pathname.length > 1) pathname = pathname.replace(/\/$/, '');
  return pathname;
}

for (const [pathname, file] of urlToFile) {
  const absolute = path.join(root, file);
  assert.ok(fs.existsSync(absolute), `Sitemap file missing: ${file}`);
  const html = fs.readFileSync(absolute, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].replace(/\s+/g, ' ').trim();
  if (!title) findings.missingTitle.push(pathname);
  else {
    const key = title.toLowerCase();
    if (!titles.has(key)) titles.set(key, []);
    titles.get(key).push(pathname);
  }
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count === 0) findings.missingH1.push(pathname);
  if (h1Count > 1) findings.multipleH1.push({ pathname, count: h1Count });

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const target = normalizeHref(match[1]);
    if (!target) continue;
    if (urlToFile.has(target)) {
      if (target !== pathname) incoming.get(target).add(pathname);
    } else if (!/^\/(?:assests|css|JS|modules|images|resources)\//.test(target) && !/\.(?:pdf|xml|txt|webmanifest)$/i.test(target)) {
      findings.brokenInternalLinks.push({ from: pathname, target });
    }
  }
}

findings.duplicateTitles = [...titles.entries()].filter(([, pages]) => pages.length > 1).map(([title, pages]) => ({ title, pages }));
findings.orphans = [...incoming].filter(([pathname, sources]) => pathname !== '/' && sources.size === 0).map(([pathname]) => pathname);
const lowLinkPages = [...incoming].filter(([pathname, sources]) => pathname !== '/' && sources.size > 0 && sources.size < 3)
  .map(([pathname, sources]) => ({ pathname, incoming: sources.size, sources: [...sources] }));

const report = { sitemapPages: urls.length, ...findings, lowLinkPages };
fs.writeFileSync(path.join(root, 'SEO-ARCHITECTURE-AUDIT-2026-11-19.json'), `${JSON.stringify(report, null, 2)}\n`);
assert.equal(findings.brokenInternalLinks.length, 0, 'Broken internal links found');
assert.equal(findings.missingH1.length, 0, 'Pages without an H1 found');
assert.equal(findings.multipleH1.length, 0, 'Pages with multiple H1 elements found');
assert.equal(findings.duplicateTitles.length, 0, 'Duplicate titles found');
assert.equal(findings.orphans.length, 0, 'Sitemap pages without an internal link found');
console.log(JSON.stringify({
  sitemapPages: urls.length,
  brokenInternalLinks: findings.brokenInternalLinks.length,
  missingH1: findings.missingH1.length,
  multipleH1: findings.multipleH1.length,
  duplicateTitles: findings.duplicateTitles.length,
  orphans: findings.orphans.length,
  lowLinkPages: lowLinkPages.length
}, null, 2));
