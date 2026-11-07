import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { homePage, menuPage, errorPage } from '../src/pages.mjs';

const dist = new URL('../dist/', import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(new URL('menu/', dist), { recursive: true });
await cp(new URL('../public/', import.meta.url), dist, { recursive: true });

const entries = new Map();
for (const ext of ['css', 'js']) {
  const path = `assets/site.${ext}`;
  const file = new URL(path, dist);
  const hash = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 12);
  const hashedPath = `assets/site.${hash}.${ext}`;
  await rename(file, new URL(hashedPath, dist));
  entries.set(path, hashedPath);
}
for (const [path, html] of [['index.html', homePage()], ['menu/index.html', menuPage()], ['404.html', errorPage()]]) {
  let output = html;
  for (const [entry, hashed] of entries) output = output.replaceAll('/' + entry, '/' + hashed);
  await writeFile(new URL(path, dist), output);
}
console.log('Built / and /menu/ into ' + fileURLToPath(dist));
