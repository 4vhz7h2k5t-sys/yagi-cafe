# YAGI.CAFE — ひと切れの、しあわせ。

呉市安浦町のチーズケーキ専門店を題材にした、RENTA STUDIOの非公式自主制作デモです。店舗との提携・公認はありません。

- 公開先：<https://yagi-cafe.ur24-jp.workers.dev/>
- TOP：看板のケーキ、店内と持ち帰りの導線、店舗紹介、アクセス
- MENU & TAKEOUT：店内と持ち帰りのメニュー、参考価格、電話予約案内

## 開発と公開

Node.js 22以上を使用。Cloudflare Workersの静的アセット配信で構成し、実行時のサーバー処理・データベースはありません。

```sh
npm ci
npm run dev
npm run build
npm run check
npm run deploy
```

店舗・価格は [src/content.mjs](src/content.mjs)、ページは [src/pages.mjs](src/pages.mjs) で管理。出典と価格の扱いは [docs/sources.md](docs/sources.md) を参照してください。制作側への修正・削除の窓口は [RENTA STUDIO](https://www.renta-uehara.com/web#contact) です。

## 素材

- `public/assets/hero-*.webp`：ケーキの断面
- `public/assets/whole-*.webp`：ホールとレモン
- `public/assets/cafe-*.webp`：カフェセット

ケーキは自主制作のAI生成イメージです。許可を得た写真への差し替え時は、該当する解像度の画像と `src/pages.mjs` の画像サイズ・代替テキスト・キャプションを更新してください。見出しには [SIL Open Font License](public/assets/OFL-NotoSerifJP.txt) のNoto Serif JPを一部収録。見出しの変更時は端末の明朝体にもフォールバックします。

ページ内のrobotsメタとHTTPヘッダーで `noindex, nofollow` を指定しています。クローラーがページのnoindexを読めるようrobots.txtでクロールを許可しています。
