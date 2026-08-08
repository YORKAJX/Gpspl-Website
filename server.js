import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.mjs': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.webmanifest': 'application/manifest+json'
};

function getFilePath(requestUrl) {
    let pathname = decodeURI(requestUrl.split('?')[0]);

    if (pathname === '/') {
        return path.join(ROOT_DIR, 'index.html');
    }

    let fullPath = path.join(ROOT_DIR, pathname);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return fullPath;
    }

    let htmlPath = path.join(ROOT_DIR, `${pathname}.html`);
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
        return htmlPath;
    }

    let dirIndexPath = path.join(ROOT_DIR, pathname, 'index.html');
    if (fs.existsSync(dirIndexPath) && fs.statSync(dirIndexPath).isFile()) {
        return dirIndexPath;
    }

    return null;
}

const server = http.createServer((req, res) => {
    const filePath = getFilePath(req.url);

    if (filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content);
        });
    } else {
        const notFoundPath = path.join(ROOT_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
            fs.readFile(notFoundPath, (err, content) => {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
                res.end(content);
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
});

server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n==================================================`);
    console.log(`🚀 GPSPL Local Preview Server Running!`);
    console.log(`👉 URL: ${url}`);
    console.log(`👉 Clean URLs: /about-gpspl, /case-studies, /privacy-policy, /blog/...`);
    console.log(`👉 Fully compatible with VS Code Simple Browser & External Browsers`);
    console.log(`👉 Press Ctrl + C to stop`);
    console.log(`==================================================\n`);
});
