const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://gpspl.co.in";
const DEFAULT_IMAGE = `${BASE_URL}/assests/images/hero/Vconf.webp`;
const TODAY = new Date().toISOString().slice(0, 10);

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractObject(source, marker) {
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${marker}`);
  const braceStart = source.indexOf("{", start);
  let depth = 0;
  for (let i = braceStart; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}") depth -= 1;
    if (depth === 0) return source.slice(braceStart, i + 1);
  }
  throw new Error(`Cannot parse object for ${marker}`);
}

function readSeoMap() {
  const seoSource = fs.readFileSync(path.join(ROOT, "JS", "seo.js"), "utf8");
  const objectText = extractObject(seoSource, "const pageSeo =");
  return vm.runInNewContext(`(${objectText})`, {});
}

function cleanHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/\s*<meta\s+name=["']description["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']icon["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']apple-touch-icon["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']manifest["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']preconnect["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link\s+rel=["']dns-prefetch["'][^>]*>\s*/gi, "\n");
}

function canonicalFor(file) {
  return file === "index.html" ? `${BASE_URL}/` : `${BASE_URL}/${file}`;
}

function absoluteImage(image) {
  if (!image) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  return `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

function headBlock(file, cfg) {
  const title = cfg.title;
  const description = cfg.description;
  const canonical = canonicalFor(file);
  const image = absoluteImage(cfg.image);
  const robots = cfg.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  return [
    `    <title>${escapeAttr(title)}</title>`,
    `    <meta name="description" content="${escapeAttr(description)}">`,
    `    <meta name="robots" content="${robots}">`,
    `    <link rel="canonical" href="${canonical}">`,
    `    <link rel="icon" href="/assests/images/gpspl.png">`,
    `    <link rel="apple-touch-icon" href="/assests/images/gpspl.png">`,
    `    <link rel="manifest" href="/site.webmanifest">`,
    `    <link rel="preconnect" href="https://www.googletagmanager.com">`,
    `    <link rel="dns-prefetch" href="//www.google-analytics.com">`,
    `    <meta property="og:type" content="website">`,
    `    <meta property="og:site_name" content="Global Peripheral Solution Pvt. Ltd.">`,
    `    <meta property="og:locale" content="en_IN">`,
    `    <meta property="og:title" content="${escapeAttr(title)}">`,
    `    <meta property="og:description" content="${escapeAttr(description)}">`,
    `    <meta property="og:url" content="${canonical}">`,
    `    <meta property="og:image" content="${image}">`,
    `    <meta name="twitter:card" content="summary_large_image">`,
    `    <meta name="twitter:title" content="${escapeAttr(title)}">`,
    `    <meta name="twitter:description" content="${escapeAttr(description)}">`,
    `    <meta name="twitter:image" content="${image}">`
  ].join("\n");
}

function imageAltFromSrc(attrs) {
  const src = (attrs.match(/\ssrc\s*=\s*["']([^"']+)["']/i) || [])[1] || "";
  const label = path.basename(src).replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
  return label ? `GPSPL ${label}` : "GPSPL technology solution image";
}

function enhanceImages(html) {
  let seen = 0;
  return html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    seen += 1;
    let next = match;
    if (!/\sdecoding\s*=/i.test(next)) next = next.replace(/>$/, ' decoding="async">');
    if (!/\sloading\s*=/i.test(next) && seen > 1) next = next.replace(/>$/, ' loading="lazy">');
    if (!/\sfetchpriority\s*=/i.test(next) && seen === 1 && !/\sloading\s*=\s*["']lazy["']/i.test(next)) {
      next = next.replace(/>$/, ' fetchpriority="high">');
    }
    if (!/\salt\s*=/i.test(next)) {
      next = next.replace(/>$/, ` alt="${escapeAttr(imageAltFromSrc(attrs))}">`);
    }
    return next;
  });
}

function deferLocalScripts(html) {
  return html.replace(/<script\s+src=["'](JS\/[^"']+)["'](?![^>]*\sdefer\b)([^>]*)><\/script>/gi, '<script src="$1"$2 defer></script>');
}

function syncHtml(file, cfg) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) return false;
  let html = fs.readFileSync(fullPath, "utf8");
  html = cleanHead(html);
  html = html.replace(/<head>/i, `<head>\n${headBlock(file, cfg)}`);
  html = enhanceImages(html);
  html = deferLocalScripts(html);
  fs.writeFileSync(fullPath, html);
  return true;
}

function generateSitemap(seoMap) {
  const entries = Object.entries(seoMap)
    .filter(([file, cfg]) => fs.existsSync(path.join(ROOT, file)) && !cfg.noindex)
    .sort(([a], [b]) => (a === "index.html" ? -1 : b === "index.html" ? 1 : a.localeCompare(b)));

  const body = entries.map(([file, cfg]) => {
    const priority = file === "index.html" ? "1.0" : cfg.type === "service" ? "0.9" : "0.8";
    const freq = file === "index.html" ? "weekly" : cfg.type === "service" ? "monthly" : "monthly";
    return [
      "  <url>",
      `    <loc>${canonicalFor(file)}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${freq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>"
    ].join("\n");
  }).join("\n");

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

const seoMap = readSeoMap();
let synced = 0;
Object.entries(seoMap).forEach(([file, cfg]) => {
  if (syncHtml(file, cfg)) synced += 1;
});
generateSitemap(seoMap);
console.log(`SEO synced for ${synced} pages.`);
