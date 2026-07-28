#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const supported = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

const source = path.resolve(readArg('source', 'assests/images'));
const out = path.resolve(readArg('out', 'assests/images/optimized'));
const quality = Number(readArg('quality', '78'));
const maxWidth = Number(readArg('maxWidth', '1920'));

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.includes(`${path.sep}optimized${path.sep}`)) continue;
      files.push(...await walk(fullPath));
    } else if (supported.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function outputPath(file) {
  const relative = path.relative(source, file);
  const parsed = path.parse(relative);
  return path.join(out, parsed.dir, `${parsed.name}.webp`);
}

async function optimize(file) {
  const target = outputPath(file);
  await fs.mkdir(path.dirname(target), { recursive: true });

  const input = await fs.stat(file);
  const image = sharp(file, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();
  const width = metadata.width && metadata.width > maxWidth ? maxWidth : metadata.width;

  await image
    .resize({ width, withoutEnlargement: true })
    .webp({
      quality,
      effort: 6,
      smartSubsample: true
    })
    .toFile(target);

  const output = await fs.stat(target);
  const saving = input.size ? Math.round((1 - output.size / input.size) * 100) : 0;

  return {
    file: path.relative(process.cwd(), file),
    target: path.relative(process.cwd(), target),
    beforeKb: Math.round(input.size / 1024),
    afterKb: Math.round(output.size / 1024),
    saving
  };
}

async function main() {
  const files = await walk(source);
  if (!files.length) {
    console.log(`No supported images found in ${source}`);
    return;
  }

  const results = [];
  for (const file of files) {
    try {
      results.push(await optimize(file));
    } catch (error) {
      console.error(`Failed: ${path.relative(process.cwd(), file)} - ${error.message}`);
    }
  }

  const totalBefore = results.reduce((sum, item) => sum + item.beforeKb, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.afterKb, 0);
  const totalSaving = totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;

  console.table(results);
  console.log(`Optimized ${results.length} images. ${totalBefore} KB -> ${totalAfter} KB (${totalSaving}% smaller).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
