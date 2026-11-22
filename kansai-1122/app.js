/* 關西紅葉 → 橫濱電池討論會 · 2026/11/22–24
 * Data-driven, mobile-first. Edit `days` / `checklist` only; render code stays untouched.
 * event: [start, end, title, desc, kind, mapQuery?, flag?]
 */
'use strict';

const TRIP = 'kansai-1122';
const kindLabel = {bus:'巴士', train:'電車', sight:'紅葉', night:'夜楓', meal:'用餐', hotel:'住宿', event:'會議', free:'自由'};

const days = [
  {
    date:'2026-11-22', tab:'11/22 日', title:'夜行巴士出發',
    note:'よかっぺ號（大阪・京都⇔水戶線），近鐵巴士營運。上車前把手機、行動電源充飽。',
    events:[
      ['22:40','23:00','抵達上車站','提早 20 分鐘到站，確認巴士號車。','bus','並木大橋 バス停 つくば'],
      ['23:00','07:32','よかっぺ號 夜行巴士','並木大橋 23:00 發 → なんばOCAT 隔天 07:32 到（預定）。','bus',null,'車票號碼請看自己的預約信']
    ]
  },
  {
    date:'2026-11-23', tab:'11/23 一・祝', title:'大阪 → 南禪寺・永觀堂 → 炸串',
    note:'國定假日＋紅葉高峰，人潮最多的一天。下午只走東山北側一區，不跨區。',
    events:[
      ['07:32','08:15','なんばOCAT → 新大阪 寄放行李','OCAT = Osaka City Air Terminal。御堂筋線 なんば → 新大阪（直達約 15 分），到東横INN 新大阪中央口本館寄放行李。','hotel','東横INN 新大阪中央口本館'],
      ['08:15','08:35','新大阪 → なんば','御堂筋線回難波。','train','なんば駅'],
      ['08:35','12:30','跟室友逛大阪','道頓堀（どうとんぼり）、黒門市場（くろもんいちば）一帶。','free','道頓堀'],
      ['12:30','13:45','大阪 → 京都・蹴上','御堂筋線 なんば→淀屋橋（よどやばし）→ 京阪特急 → 三条（さんじょう）→ 地下鐵東西線 → 蹴上（けあげ）。','train','蹴上駅'],
      ['13:45','14:15','無鄰菴（むりんあん）〔可略〕','小紅書 11/18、11/22 都說無鄰菴已見頃（最美）。時間緊就跳過。','sight','無鄰菴 京都'],
      ['14:15','15:40','南禅寺（なんぜんじ）・天授庵','三門、水路閣（すいろかく，紅磚水道橋）、天授庵（てんじゅあん）。網友：南禪寺正好、天授庵很不錯。','sight','南禅寺 京都'],
      ['15:40','16:00','步行 → 永観堂','沿哲学の道（てつがくのみち）南段往北約 10 分鐘。','free','永観堂 京都'],
      ['16:00','17:15','永観堂（えいかんどう）日間','11/21 官方「今見頃」。人非常多，日間入場時間以現場公告為準。','sight','永観堂 京都'],
      ['17:30','18:30','永観堂 夜間點燈〔可選〕','11/20 起點燈，需另購票。18:30 前離開。','night','永観堂 京都'],
      ['18:30','19:40','京都 → 新大阪','蹴上 → 地下鐵東西線 → 烏丸御池（からすまおいけ）轉烏丸線 → 京都 → JR 京都線 新快速 → 新大阪（約 25 分）。','train','新大阪駅'],
      ['19:40','20:10','東横INN Check-in','預約到達時間 20:00–21:00。新大阪站中央口走路約 5 分。','hotel','東横INN 新大阪中央口本館'],
      ['20:15','21:30','一個人吃炸串（觸控面板點餐）','串かつだるま アルデ新大阪店（アルデ新大阪 2F，新大阪站走路 2 分）。觸控面板點餐，餐點用仿新幹線的軌道送到座位；有吧台、一人 OK。每天 10:30–22:30（L.O. 22:00）。','meal','串かつだるま アルデ新大阪店','だるま全店每人須點一杯飲料；醬汁不可二次沾'],
      ['21:30','21:40','回飯店','走路約 5 分。明天 06:30 出發，早點睡。','hotel','東横INN 新大阪中央口本館']
    ]
  },
  {
    date:'2026-11-24', tab:'11/24 二', title:'東福寺早場 → 新幹線 → 橫濱',
    note:'連休後的平日早上，一週裡人最少。小紅書 11/22：東福寺通天橋「再等兩天」，正好今天。',
    events:[
      ['06:30','07:00','退房 → 京都站','新大阪 → JR 新快速 → 京都（約 25 分）。東横INN 免費早餐可拿了就走。','train','京都駅'],
      ['07:00','07:10','京都站寄放行李','紅葉季置物櫃很快就滿，越早越好。','hotel','京都駅 コインロッカー'],
      ['07:10','07:30','JR 奈良線 → 東福寺站','一站，下車走路約 10 分鐘。','train','東福寺駅'],
      ['07:30','08:30','東福寺 朝の貸切拝観','早晨包場 7:30–8:30（最後入場 8:00），EX旅先予約 1,800 円。','sight','東福寺 京都','要先自己預約'],
      ['08:30','09:30','東福寺 通天橋・本坊庭園','通天橋（つうてんきょう）秋季 1,000 円、本坊庭園 600 円（11/14–12/6 無套票）。','sight','東福寺 通天橋'],
      ['09:30','10:15','今熊野観音寺（いまくまのかんのんじ）','小紅書 11/22：已見頃，人少。','sight','今熊野観音寺'],
      ['10:15','11:15','泉涌寺（せんにゅうじ）','小紅書 11/22：已見頃，安靜。','sight','泉涌寺'],
      ['11:15','11:45','回京都站','計程車約 10 分鐘，或走回 JR 東福寺站。','train','京都駅'],
      ['11:45','13:15','午餐・取行李','想再吃炸串：串かつだるま 京都ポルタ店（京都站地下街 Porta，觸控面板點餐、18 席吧台，11:00–22:30）。否則站內便當。','meal','串かつだるま 京都ポルタ店'],
      ['13:30','15:30','のぞみ 京都 → 新横浜','約 2 小時。最晚 14:00 從京都出發，再晚就沒緩衝。','train','新横浜駅','需購指定席'],
      ['15:30','16:05','新横浜 → みなとみらい','JR 横浜線 → 横浜 → みなとみらい線 → みなとみらい站，走路約 5 分。','train','みなとみらい駅'],
      ['16:05','16:30','抵達 パシフィコ横浜ノース','第 67 回電池討論會（11/24–26）。橫濱市西區みなとみらい 1-1-2。','event','パシフィコ横浜ノース']
    ]
  }
];

const checklist = [
  ['預約 11/24 東福寺「朝の貸切拝観」','EX旅先予約，1,800 円，名額有限'],
  ['確認東横INN 新大阪可先寄放行李','11/23 早上 08:00 前後；TEL 06-6305-1045'],
  ['買 11/24 京都 → 新横浜 指定席','13:30 前後，最晚 14:00'],
  ['查 11/24 電池討論會議程','67denchi.com／program'],
  ['手機・行動電源充飽','夜行巴士＋整天在外']
];

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mapUrl = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

/* Current Tokyo time as "YYYY-MM-DD HH:MM" for string comparison. */
function tokyoNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Tokyo', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false})
    .formatToParts(new Date()).map(x => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour === '24' ? '00' : p.hour}:${p.minute}`;
}

function renderTabs(active) {
  $('#tabs').innerHTML = days.map((d, i) =>
    `<button type="button" role="tab" aria-selected="${i === active}" data-i="${i}">${esc(d.tab)}</button>`).join('');
  $('#tabs').querySelectorAll('button').forEach(b => b.onclick = () => show(Number(b.dataset.i)));
}

function renderEvent(d, e, now) {
  const [from, to, title, desc, kind, place, flag] = e;
  const isNow = now >= `${d.date} ${from}` && now < `${d.date} ${to}`;
  return `<li class="ev k-${esc(kind)}${isNow ? ' now' : ''}">
    <div class="ev-time"><b>${esc(from)}</b><span>${esc(to)}</span></div>
    <div class="ev-body">
      <div class="ev-head"><h3>${esc(title)}</h3><span class="tag">${esc(kindLabel[kind] || '')}</span></div>
      <p>${esc(desc)}</p>
      ${flag ? `<p class="flag">⚠ ${esc(flag)}</p>` : ''}
      ${place ? `<a class="map" href="${mapUrl(place)}" target="_blank" rel="noopener">📍 地圖</a>` : ''}
    </div>
  </li>`;
}

function show(i) {
  const d = days[i], now = tokyoNow();
  renderTabs(i);
  $('#day').innerHTML = `<h2>${esc(d.title)}</h2><p class="day-note">${esc(d.note)}</p>
    <ol class="timeline">${d.events.map(e => renderEvent(d, e, now)).join('')}</ol>`;
  history.replaceState(null, '', '#day-' + (i + 1));
  $('#day').querySelector('.now')?.scrollIntoView({block:'center'});
}

function renderChecklist() {
  const key = i => `${TRIP}_check_${i}`;
  const get = i => { try { return localStorage.getItem(key(i)) === '1'; } catch (_) { return false; } };
  $('#checks').innerHTML = checklist.map(([t, s], i) =>
    `<label class="check"><input type="checkbox" data-i="${i}" ${get(i) ? 'checked' : ''}><span><b>${esc(t)}</b><small>${esc(s)}</small></span></label>`).join('');
  $('#checks').querySelectorAll('input').forEach(c => c.onchange = () => {
    try { localStorage.setItem(key(c.dataset.i), c.checked ? '1' : '0'); } catch (_) {}
  });
}

/* Open the day matching today's Tokyo date, else the hash, else day 1. */
function initialDay() {
  const m = location.hash.match(/^#day-(\d)$/);
  if (m && days[m[1] - 1]) return m[1] - 1;
  const today = tokyoNow().slice(0, 10);
  const i = days.findIndex(d => d.date === today);
  return i < 0 ? 0 : i;
}

renderChecklist();
show(initialDay());
