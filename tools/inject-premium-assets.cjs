const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const directories = [root, path.join(root, "blog"), path.join(root, "resources")];
const cssTag = '    <link rel="stylesheet" href="/css/premium-system.css?v=20260929b">';
const jsTag = '    <script src="/JS/premium-experience.js?v=20260929b" defer></script>';

let updated = 0;

function insertBeforeLast(source, closingTag, markup) {
    const index = source.toLowerCase().lastIndexOf(closingTag.toLowerCase());
    if (index === -1) return source;
    return `${source.slice(0, index)}${markup}\n${source.slice(index)}`;
}

function insertBeforeFirst(source, closingTag, markup) {
    const index = source.toLowerCase().indexOf(closingTag.toLowerCase());
    if (index === -1) return source;
    return `${source.slice(0, index)}${markup}\n${source.slice(index)}`;
}

for (const directory of directories) {
    for (const name of fs.readdirSync(directory)) {
        if (!name.endsWith(".html")) continue;
        const file = path.join(directory, name);
        let source = fs.readFileSync(file, "utf8");
        let next = source;

        next = next
            .replace(/'\s*<script src="\/JS\/premium-experience\.js\?v=20260929(?:b)?" defer><\/script>\s*\r?\n<\/body>'/g, "'</body>'")
            .replace(/'\s*<link rel="stylesheet" href="\/css\/premium-system\.css\?v=20260929(?:b)?">\s*\r?\n<\/head>'/g, "'</head>'")
            .replace(/^\s*<link rel="stylesheet" href="\/css\/premium-system\.css\?v=20260929(?:b)?">\s*\r?\n?/gmi, '')
            .replace(/^\s*<script src="\/JS\/premium-experience\.js\?v=20260929(?:b)?" defer><\/script>\s*\r?\n?/gmi, '');

        next = insertBeforeFirst(next, '</head>', cssTag);
        next = insertBeforeLast(next, '</body>', jsTag);

        next = next
            .replace(/<strong>4\.9 \/ 5 Google Rating<\/strong>/g, '<strong>Public Google Profile</strong>')
            .replace(/<span>86\+ Verified Enterprise Reviews<\/span>/g, '<span>Current rating and customer feedback</span>');

        if (next !== source) {
            fs.writeFileSync(file, next, "utf8");
            updated += 1;
        }
    }
}

console.log(`Premium assets injected into ${updated} HTML pages.`);
