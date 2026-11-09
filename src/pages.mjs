import { store as shop, sources, cafe, takeout } from './content.mjs';

const icons = {
  arrow: '<path d="M3.5 10h12.8m-5-5 5 5-5 5"/>',
  down: '<path d="M10 3.5v12.8m-5-5 5 5 5-5"/>',
  up: '<path d="M10 16.5V3.7m-5 5 5-5 5 5"/>',
  external: '<path d="M5 15 15 5M7 5h8v8"/>',
  pin: '<path d="M16 8c0 4-6 8.5-6 8.5S4 12 4 8a6 6 0 1 1 12 0Z"/><circle cx="10" cy="8" r="1.8"/>',
  cup: '<path d="M3 5.5h11v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-5Zm11 1h1.3a2 2 0 0 1 0 4H14M2 17h15"/>',
  bag: '<path d="M4 6.5h12l1 10.5H3L4 6.5Zm3 1V5a3 3 0 1 1 6 0v2.5"/>',
  phone: '<path d="M6.5 2.9 3.6 4.5a2 2 0 0 0-.9 2.2c1.5 5.5 5.2 9.1 10.6 10.6a2 2 0 0 0 2.2-.9l1.6-2.9-4-2.4-1.7 1.6a10 10 0 0 1-4.1-4.1L8.9 7 6.5 2.9Z"/>',
  insta: '<rect x="3" y="3" width="14" height="14" rx="4"/><circle cx="10" cy="10" r="3.1"/><path d="M14 6.2h.01"/>',
  slice: '<path d="m10 2-6 13c3.8 2.5 8.2 2.5 12 0L10 2Z"/><path d="M5.3 12.2c3.1 1.6 6.3 1.6 9.4 0"/>',
};

const icon = (name) => `<svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
const link = (href, label, symbol = 'arrow', classes = 'text-link') => `<a class="${classes}" href="${href}">${label}${icon(symbol)}</a>`;
const ext = (href, label, classes) => link(href, label, 'external', classes);
const logo = `<span class="logo-mark">${icon('slice')}</span><span>YAGI<span class="logo-dot">.</span>CAFE</span>`;
const insta = () => ext(shop.instagram, '公式Instagram');
const bread = (text) => `<nav class="breadcrumbs" aria-label="現在の位置"><a href="/">トップ</a><span aria-hidden="true">/</span><span aria-current="page">${text}</span></nav>`;
const label = (text) => `<p class="eyebrow" lang="en">${text}</p>`;

const opening = `
  <div class="opening" hidden>
    <div class="opening-scene" aria-hidden="true">
      <svg class="opening-art" viewBox="0 0 260 215" fill="none">
        <circle class="opening-halo" cx="130" cy="105" r="93" fill="#f8e7b8"/>
        <ellipse class="opening-shadow" cx="133" cy="164" rx="62" ry="7" fill="#bb8c50" opacity=".16"/>
        <g class="opening-plate" stroke="#c9ac86" stroke-width="1.2">
          <ellipse cx="132" cy="162" rx="96" ry="18" fill="#fffaf1"/>
          <path d="M49 164c30 13 125 13 165-2" opacity=".6"/>
        </g>
        <g class="opening-slice" stroke-linejoin="round">
          <path d="m55 109 154-18q10 21 0 42L55 153Z" fill="#f8dfa1" stroke="#a16d3b" stroke-width="1.6"/>
          <path d="m55 145 156-19-2 7-154 20Z" fill="#d5a36a"/>
          <path d="m55 109 95-50q42 5 59 32Z" fill="#d99445" stroke="#a16d3b" stroke-width="1.6"/>
          <path d="m67 108 84-43q29 5 43 17" stroke="#efb96e" stroke-width="3" stroke-linecap="round"/>
          <path d="m64 119 132-16" stroke="#fff1cb" stroke-width="2.8" stroke-linecap="round"/>
          <path d="m78 146 5-1m31-3 5-1m34-3 5-1m27-3 4-1" stroke="#b7834f" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <g class="opening-sparkles" stroke="#aa713c" stroke-width="1.5" stroke-linecap="round">
          <path d="m40 77 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="#f5cf79"/>
          <path d="m210 49 2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#f5cf79"/>
          <path d="m223 121 2 3m-37-84 3-2"/>
          <circle cx="66" cy="49" r="2" fill="#aa713c" stroke="none"/>
        </g>
      </svg>
      <p class="opening-wordmark">YAGI<span>.</span>CAFE</p>
    </div>
    <button class="opening-skip" type="button">スキップ ${icon('arrow')}</button>
  </div>`;

function frame(title, description, body, route = 'home') {
  const menuCurrent = route === 'menu' ? ' aria-current="page"' : '';
  const access = route === 'home' ? '#access' : '/#access';
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#faf5eb">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
  ${route === 'home' ? '<script src="/assets/site.js" defer></script>' : ''}
</head>
<body class="page-${route}" id="top">
  ${route === 'home' ? opening : ''}
  <a class="skip" href="#main">本文へ移動</a>
  <div class="demo-bar"><div class="shell demo-row"><a href="#demo-info">非公式の自主制作デモ</a><span>DESIGN BY RENTA STUDIO</span></div></div>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="YAGI.CAFE トップ">${logo}</a>
      <nav class="site-nav" aria-label="メインナビゲーション">
        <a href="/menu/"${menuCurrent}><span class="nav-wide">メニュー・お持ち帰り</span><span class="nav-small">メニュー</span></a>
        <a href="${access}">アクセス</a>
      </nav>
      <a class="nav-social" href="${shop.instagram}" aria-label="YAGI.CAFEの公式Instagram">${icon('insta')}</a>
    </div>
  </header>
  <main id="main" tabindex="-1">
  ${body}
  </main>
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div><a class="brand footer-brand" href="/" aria-label="YAGI.CAFE トップ">${logo}</a><p class="footer-locale">広島県呉市安浦町のチーズケーキ専門店</p></div>
        <div class="footer-links">${link('/menu/', 'メニュー・お持ち帰り')}${link(access, 'アクセス')}${insta()}</div>
      </div>
      <div class="footer-demo" id="demo-info">
        <div><h2>このサイトについて</h2><p>RENTA STUDIOによる非公式の自主制作デモです。店舗の公認・運営によるものではありません。掲載のケーキ画像はAI生成のイメージで、実際の商品を撮影したものではありません。</p>
          <p class="footer-sources">店舗情報の参照：<a href="${sources.kure}">くれとりっぷ</a>・<a href="${sources.wink}">Wink</a>・<a href="${sources.tabelog}">食べログ</a></p></div>
        ${ext(shop.correction, '掲載内容の修正・削除のご連絡')}
      </div>
      <div class="footer-end"><span>© 2026 RENTA STUDIO</span>${route === 'home' ? '<button type="button" class="opening-replay" hidden>オープニングをもう一度</button>' : ''}${link('#top', 'ページ上部へ', 'up')}</div>
    </div>
  </footer>
</body>
</html>`;
}

const photoData = {
  hero: { alt: 'なめらかな断面とこんがりした焼き色のベイクドチーズケーキのイメージ', width: 1536, height: 1024 },
  whole: { alt: '丸いベイクドチーズケーキとレモンを並べたイメージ', width: 1440, height: 960 },
  cafe: { alt: 'ベイクドチーズケーキとコーヒーを添えたカフェセットのイメージ', width: 1200, height: 800 },
};
function photo(name, sizes, classes, high = false) {
  const data = photoData[name];
  const widths = name === 'hero' ? [640, 1040, 1536] : [560, data.width];
  return `<figure class="photo ${classes}">
    <div class="photo-viewport"><img src="/assets/${name}-${widths[0]}.webp" srcset="${widths.map(w => `/assets/${name}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" width="${data.width}" height="${data.height}" alt="${data.alt}" ${high ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}></div>
    <figcaption>AI生成イメージ</figcaption>
  </figure>`;
}

const times = (style = '') => `<dl class="times ${style}">
  <div><dt>${icon('cup')}<span><b lang="en">CAFE</b><span>店内</span></span></dt><dd>${shop.cafeHours}</dd></div>
  <div><dt>${icon('bag')}<span><b lang="en">TAKEOUT</b><span>お持ち帰り</span></span></dt><dd>${shop.takeoutHours}</dd></div>
</dl>`;

const art = `<svg class="cake-art" viewBox="0 0 480 370" fill="none" aria-hidden="true">
  <g stroke="currentColor" stroke-width="1.2">
    <circle cx="238" cy="178" r="134" stroke-dasharray="2 5" opacity=".42"/>
    <circle cx="238" cy="178" r="109" opacity=".58"/>
    <path d="M238 178 238 69a109 109 0 1 0 94 164L238 178Z" fill="#eac17d" fill-opacity=".21"/>
    <g class="cake-art-slice">
      <path d="m258 165 0-109a109 109 0 0 1 94 164l-94-55Z" fill="#eac17d" fill-opacity=".45"/>
      <path d="M352 220v17l-94-55v-17" opacity=".52"/>
    </g>
    <path d="M238 178v20l85 50M102 178H46m333 0h53M238 45V16m0 296v41" opacity=".52"/>
    <path d="M154 255c21 17 45 26 75 28m-86-39 5 5m154-156c20 10 36 27 46 49" opacity=".63"/>
    <path d="M42 178h8m-4-4v8m382-4h8m-4-4v8M234 16h8m-4-4v8m-4 333h8m-4-4v8"/>
  </g>
  <g fill="currentColor" font-family="Georgia,serif" font-size="13" letter-spacing="2"><text x="20" y="150">01</text><text x="415" y="150">02</text></g>
</svg>`;

function visit() {
  return `<section id="access" class="visit section-pad" aria-labelledby="visit-heading">
    <div class="shell visit-grid">
      <div>
        ${label('04 / VISIT US')}
        <h2 id="visit-heading" class="section-title">店舗へのアクセス</h2>
        <p class="visit-place">${icon('pin')}${shop.address}</p>
        ${times('visit-times')}
        <dl class="visit-facts"><div><dt>定休日</dt><dd>${shop.closed}</dd></div><div><dt>駐車場</dt><dd>${shop.parking}</dd></div><div><dt>電話</dt><dd><a href="${shop.tel}">${shop.phone}</a></dd></div></dl>
        <p class="visit-note">土曜や臨時の営業情報は公式Instagramでご確認ください。</p>
        <div class="visit-links">${ext(shop.directions, 'Googleマップで経路を見る', 'button button-primary')}${insta()}</div>
      </div>
      <figure class="map">
        <iframe title="YAGI.CAFE 周辺の地図（Googleマップ）" src="${shop.map}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <figcaption><span>YAGI.CAFE / KURE, HIROSHIMA</span><span>国道185号沿い</span></figcaption>
      </figure>
    </div>
  </section>`;
}

export function homePage() {
  return frame('YAGI.CAFE｜ひと切れの、しあわせ。｜非公式デモ', '広島県呉市安浦町のベイクドチーズケーキ専門店。メニュー、テイクアウト、店舗へのアクセスをご紹介するRENTA STUDIOの非公式デモです。', `
    <section class="shell hero" aria-labelledby="home-heading">
      <div class="hero-copy">
        ${label('KURE, HIROSHIMA')}
        <p class="hero-category">呉・安浦のチーズケーキ専門店</p>
        <h1 id="home-heading">ひと切れの、<br>しあわせ。</h1>
        <p class="hero-desc">こんがり焼き色、なめらかな口どけ。<br>瀬戸内レモンがほのかに香る、<br class="hero-break">手づくりのベイクドチーズケーキ。</p>
        <div class="hero-actions">${link('/menu/', 'メニュー・お持ち帰り', 'arrow', 'button button-primary')}${link('#access', '営業時間・アクセス', 'down')}</div>
      </div>
      ${photo('hero', '(max-width: 740px) 94vw, (max-width: 1360px) 58vw, 808px', 'hero-photo', true)}
    </section>

    <aside class="shell quick" aria-label="営業時間のご案内">
      ${times('quick-times')}
      <a class="quick-note" href="#access"><span>${shop.closed}</span>${icon('arrow')}</a>
    </aside>

    <div class="shell chapter">
      <a href="#signature" class="chapter-link">${icon('down')}<span>看板のチーズケーキ</span></a>
      <span class="chapter-rule" aria-hidden="true"></span>
      <button type="button" class="motion-toggle" aria-pressed="false" hidden>スクロール演出<span aria-hidden="true">OFF</span></button>
    </div>

    <section id="signature" class="signature" aria-labelledby="signature-heading">
      <div class="shell signature-inner">
        <div class="signature-head">
          ${label('01 / THE SIGNATURE')}
          <h2 id="signature-heading" class="section-title">濃厚なのに、<br>あと味は軽やか。</h2>
          <p>フランス産クリームチーズのコクに、瀬戸内産レモンのさわやかさ。しっとりと焼き上げた生地は、ひと口食べるとすっとほどけます。</p>
        </div>
        <div class="signature-stage">
          <svg class="signature-orbit" aria-hidden="true" viewBox="0 0 1060 530" preserveAspectRatio="none" fill="none">
            <path d="M32 342C62 215 230 85 498 66c265-20 498 76 525 193 28 123-177 234-450 242C302 509 10 445 32 342Z" pathLength="1"/>
            <path d="M998 96v30m-15-15h30M65 418v24m-12-12h24" />
          </svg>
          <p class="signature-type" aria-hidden="true">Baked with care.</p>
          ${photo('whole', '(max-width: 740px) 92vw, (max-width: 1360px) 69vw, 925px', 'signature-photo')}
          <span class="signature-index" aria-hidden="true">01 — 02</span>
        </div>
        <div class="ingredient-rule">
          <div><span>01</span><h3>フランス産クリームチーズ</h3><p>しっかりとしたコクとなめらかな口どけ。</p></div>
          <div><span>02</span><h3>瀬戸内産レモン</h3><p>ほのかな酸味が、焼き菓子の余韻を軽やかに。</p></div>
        </div>
      </div>
    </section>

    <section class="shell section-pad options" aria-labelledby="options-heading">
      <div class="options-head">${label('02 / MENU & TAKEOUT')}<h2 id="options-heading" class="section-title">店内で。おうちでも。</h2><p>ドリンクと一緒にひと休み。<br>ひと切れからホールまで、お持ち帰りにも。</p></div>
      <div class="option-grid">
        <article class="option option-cafe">
          ${photo('cafe', '(max-width: 740px) 90vw, (max-width: 1360px) 45vw, 590px', 'option-photo')}
          <div class="option-copy"><div class="option-label">${label('CAFE')}${icon('cup')}</div><h3>店内で楽しむ</h3><p>チーズケーキセットと、コーヒーや紅茶。</p>${link('/menu/#cafe', '店内メニューを見る')}</div>
        </article>
        <article class="option option-takeout">
          <div class="option-art">${art}</div>
          <div class="option-copy"><div class="option-label">${label('TAKEOUT')}${icon('bag')}</div><h3>お持ち帰り</h3><p>ひと切れのおやつから、手土産のホールまで。</p>${link('/menu/#takeout', '価格・ホールの予約案内を見る')}</div>
        </article>
      </div>
    </section>

    <section class="about section-pad" aria-labelledby="about-heading">
      <div class="shell about-grid">
        <div>${label('03 / ABOUT YAGI.CAFE')}<h2 id="about-heading" class="section-title">安浦の、<br>いつもの寄り道。</h2></div>
        <div class="about-copy"><p>国道185号沿いにある、チーズケーキのお店。店内にはテーブル席とカウンター席があり、ドライブの途中にも気軽に立ち寄れます。</p>
        <p>お店を運営するのは、就労継続支援B型事業所「やすらぎ作業所」。店内の一角では、呉周辺で活動する作家の革小物や布雑貨なども展示・販売されています。</p></div>
      </div>
    </section>
    ${visit()}
  `);
}

function menuRows(items) {
  return `<dl class="menu-list">${items.map(({ name, note, price }) =>
    `<div class="menu-row"><dt>${name}<span>${note}</span></dt><dd>${price === '要確認' ? '<span class="check-price">要確認</span>' : `<span class="price">${price}<span>円</span></span>`}</dd></div>`
  ).join('')}</dl>`;
}

export function menuPage() {
  return frame('メニュー・お持ち帰り｜YAGI.CAFE｜非公式デモ', 'YAGI.CAFEの店内メニューとお持ち帰りの参考価格、ホールケーキの電話での予約案内。RENTA STUDIOによる非公式デモです。', `
    <div class="shell">${bread('メニュー・お持ち帰り')}</div>
    <section class="menu-intro shell" aria-labelledby="menu-heading">
      <div class="menu-intro-copy">${label('MENU & TAKEOUT')}
        <h1 id="menu-heading">メニューと<br>お持ち帰り。</h1>
        <p>店内でひと休み。おうちに、ひと切れ。<br>安浦のベイクドチーズケーキを、お好きなかたちで。</p>
        <nav class="menu-jump" aria-label="メニュー内の項目">
          ${link('#cafe', '店内メニュー', 'down')}${link('#takeout', 'お持ち帰り', 'down')}${link('#reserve', 'ホールのご予約', 'down')}
        </nav>
      </div>
      ${photo('cafe', '(max-width: 740px) 90vw, (max-width: 1360px) 47vw, 620px', 'menu-cover', true)}
    </section>

    <div class="menu-board">
      <div class="shell menu-board-inner">
        <p class="price-notice">価格は <a href="${sources.wink}">2026年10月の取材記事</a>に掲載された参考価格です。最新の価格・在庫・提供状況はお店にご確認ください。</p>
        <section id="cafe" class="menu-column" aria-labelledby="cafe-heading">
          <div class="menu-column-head">${label('01 / CAFE')}<h2 id="cafe-heading" class="section-title">店内メニュー</h2><p>${icon('cup')}<strong>${shop.cafeHours}</strong></p></div>
          ${menuRows(cafe)}
        </section>
        <section id="takeout" class="menu-column" aria-labelledby="takeout-heading">
          <div class="menu-column-head">${label('02 / TAKEOUT')}<h2 id="takeout-heading" class="section-title">お持ち帰り</h2><p>${icon('bag')}<strong>${shop.takeoutHours}</strong></p></div>
          ${menuRows(takeout)}
          ${link('#reserve', 'ホールケーキのご予約へ', 'down', 'text-link menu-reserve-link')}
        </section>
      </div>
    </div>

    <section id="reserve" class="reserve section-pad" aria-labelledby="reserve-heading">
      <div class="shell reserve-grid">
        ${photo('whole', '(max-width: 740px) 90vw, (max-width: 1360px) 50vw, 665px', 'reserve-photo')}
        <div class="reserve-copy">${label('03 / WHOLE CAKE')}<h2 id="reserve-heading" class="section-title">ホールケーキの<br>ご予約・お問い合わせ</h2>
          <p>ホールのご予約は店舗へお電話で。ご希望の個数と受け取り日時をお伝えのうえ、在庫や受け取りについてご確認ください。</p>
          <a class="button button-primary phone-button" href="${shop.tel}">${icon('phone')}<span><small>店舗に電話する</small><strong>${shop.phone}</strong></span></a>
          <p class="reserve-hours">お持ち帰り ${shop.takeoutHours}<br>${shop.closed}</p>
          <div class="reserve-links">${link('/#access', '営業時間・アクセス')}${insta()}</div>
        </div>
      </div>
    </section>
  `, 'menu');
}

export function errorPage() {
  return frame('ページが見つかりません｜YAGI.CAFE', 'お探しのページは見つかりませんでした。', `<section class="shell error-page section-pad">${label('404')}<h1 class="section-title">ページが見つかりません。</h1><p>トップページからお探しください。</p>${link('/', 'トップへ戻る', 'arrow', 'button button-primary')}</section>`, 'error');
}
