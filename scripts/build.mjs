import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { homePage, menuPage, errorPage } from '../src/pages.mjs';

const dist = new URL('../dist/', import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(new URL('menu/', dist), { recursive: true });
await cp(new URL('../public/', import.meta.url), dist, { recursive: true });
for (const [path, html] of [['index.html', homePage()], ['menu/index.html', menuPage()], ['404.html', errorPage()]]) {
  await writeFile(new URL(path, dist), html);
}
console.log('Built / and /menu/ into ' + fileURLToPath(dist));
