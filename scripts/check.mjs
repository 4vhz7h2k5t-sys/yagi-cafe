import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const routes = new Map([['/', 'index.html'], ['/menu/', 'menu/index.html'], ['/404.html', '404.html']]);
const pages = new Map(await Promise.all([...routes].map(async ([route, file]) => [route, await readFile(new URL(file, dist), 'utf8')])));
for (const [route, html] of pages) {
  assert.match(html, /name="robots" content="noindex, nofollow"/, route);
  assert.match(html, /非公式の自主制作デモ/, route);
  assert.match(html, /掲載内容の修正・削除のご連絡/, route);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, route);
  for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"]*|#[^"]+)"/g)) {
    const [destination, anchor] = path.split('#');
    if (destination.startsWith('/assets/')) {
      assert.ok((await stat(new URL(destination.slice(1), dist))).size, path);
    } else {
      assert.ok(pages.has(destination || route), path);
      if (anchor) assert.ok(pages.get(destination || route).includes(`id="${anchor}"`), path);
    }
  }
  for (const [, srcset] of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of srcset.split(',')) {
      const [asset] = candidate.trim().split(' ');
      assert.ok((await stat(new URL(asset.slice(1), dist))).size < 200 * 1024, asset);
    }
  }
}
assert.match(await readFile(new URL('_headers', dist), 'utf8'), /X-Robots-Tag: noindex, nofollow/);
console.log('Verified pages, asset budgets and linked anchors:', [...routes.keys()].join(', '));
