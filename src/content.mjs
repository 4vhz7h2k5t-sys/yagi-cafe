export const store = {
  name: 'YAGI.CAFE',
  address: '広島県呉市安浦町安登西7丁目2-36',
  phone: '0823-84-0066',
  tel: 'tel:0823840066',
  cafeHours: '10:00–15:00',
  takeoutHours: '9:00–16:30',
  closed: '日曜・祝日休み、土曜不定休',
  parking: '10台（取材記事掲載情報）',
  instagram: 'https://www.instagram.com/cafe.yagi/',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('YAGI.CAFE 広島県呉市安浦町安登西7丁目2-36'),
  map: 'https://www.google.com/maps?hl=ja&amp;output=embed&amp;q=34.248987%2C132.718729&amp;z=15',
  correction: 'https://www.renta-uehara.com/web#contact',
};
export const sources = {
  kure: 'https://kure-trip.jp/spots/186',
  wink: 'https://wink-jaken.com/series/takaramono/20261023-01/',
  tabelog: 'https://tabelog.com/hiroshima/A3404/A340401/34023933/',
};
export const cafe = [
  { name: 'チーズケーキセット', note: 'ベイクドチーズケーキとドリンク', price: '600' },
  { name: '抹茶チーズケーキセット', note: '提供状況は店舗へご確認ください', price: '要確認' },
  { name: 'コーヒー・紅茶', note: '季節のフレーバーティーなど', price: '要確認' },
];
export const takeout = [
  { name: 'ベイクドチーズケーキ S', note: 'カット', price: '200' },
  { name: 'ベイクドチーズケーキ M', note: 'カット', price: '400' },
  { name: 'ベイクドチーズケーキ ホール', note: 'ホール', price: '1,800' },
];
