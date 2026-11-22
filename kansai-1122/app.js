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
    pins:[['蹴上駅',35.0076,135.7906],['永観堂',35.0140,135.7950],['南禅寺 三門',35.0115,135.7927],['京都駅',34.9846,135.7584],['東寺',34.9806,135.7477]],
    note:'國定假日＋紅葉高峰，人潮最多的一天。下午只走東山北側一區，不跨區。',
    events:[
      ['07:32','08:15','なんばOCAT → 新大阪 寄放行李','OCAT = Osaka City Air Terminal。御堂筋線 なんば → 新大阪（直達約 15 分），到東横INN 新大阪中央口本館寄放行李。','hotel','東横INN 新大阪中央口本館'],
      ['08:15','08:35','新大阪 → なんば','御堂筋線回難波。','train','なんば駅'],
      ['08:35','12:30','跟室友逛大阪','道頓堀（どうとんぼり）、黒門市場（くろもんいちば）一帶。','free','道頓堀'],
      ['12:30','13:45','大阪 → 京都・蹴上','地鐵御堂筋線 なんば → 淀屋橋（よどやばし）→ 京阪特急 → 三条（さんじょう）→ 地鐵東西線 → 蹴上（けあげ）。','train','蹴上駅'],
      ['13:45','14:00','步行 → 永観堂','蹴上站走路約 15 分（假日「南禅寺・永観堂道」公車站會封閉，別搭公車）。','free','永観堂 京都'],
      ['14:00','15:30','永観堂（えいかんどう）寺宝展','1,500 円，16:00 停止入場。小紅書 11/22：永觀堂排隊非常長 → 提早到。','sight','永観堂 京都','16:00 前一定要入場'],
      ['15:30','15:45','步行 → 南禅寺','約 10 分。','free','南禅寺 京都'],
      ['15:45','16:45','南禅寺（なんぜんじ）三門・水路閣','三門 600 円，爬上去看東山紅葉，也能俯瞰天授庵（てんじゅあん）內部（網友 11/22 推薦）。水路閣（すいろかく）免費。天授庵排隊太長就略過。','sight','南禅寺 三門'],
      ['16:45','17:30','蹴上 → 京都站','地鐵東西線 → 烏丸御池（からすまおいけ）轉烏丸線 → 京都，約 20 分。可先在站內休息、吃點東西。','train','京都駅'],
      ['17:30','17:50','步行 → 東寺','京都站八條口往西南走約 15 分（或近鐵一站到東寺站，走路 10 分）。','free','東寺 京都'],
      ['18:00','19:00','東寺（とうじ）夜間點燈','1,000 円，18:00–21:30（21:00 停止入場）。五重塔倒映瓢箪池（ひょうたんいけ）。預測 11/26 前後最美，11/23 可能未全紅。','night','東寺 京都'],
      ['19:00','19:20','步行 → 京都站','約 15 分。','free','京都駅'],
      ['19:25','19:40','新幹線 京都 → 新大阪','自由席 1,450 円，約 14 分，班次很多。','train','新大阪駅'],
      ['19:40','20:10','東横INN Check-in','預約到達時間 20:00–21:00。新大阪站中央口走路約 5 分。','hotel','東横INN 新大阪中央口本館'],
      ['20:15','21:30','一個人吃炸串（觸控面板點餐）','串かつだるま アルデ新大阪店（アルデ新大阪 2F，新大阪站走路 2 分）。觸控面板點餐、新幹線造型軌道送餐，有一人吧台。每天 10:30–22:30（L.O. 22:00）。約 2,000–3,000 円。','meal','串かつだるま アルデ新大阪店','每人須點一杯飲料；醬汁不可二次沾'],
      ['21:30','21:40','回飯店','走路約 5 分。','hotel','東横INN 新大阪中央口本館']
    ]
  },
  {
    date:'2026-11-24', tab:'11/24 二', title:'東福寺早場 → 新幹線 → 橫濱',
    pins:[['京都駅',34.9846,135.7584],['東福寺駅',34.9811,135.7701],['東福寺',34.9772,135.7746],['今熊野観音寺',34.9798,135.7811],['泉涌寺',34.9780,135.7802],['泉涌寺道 公車站',34.9829,135.7738],['京都駅',34.9846,135.7584]],
    note:'連休後平日早上人最少。小紅書 11/22 網友說東福寺約三、四成紅，預測高峰 11/29 前後 → 11/24 會是紅黃綠漸層，不是全紅。',
    events:[
      ['06:40','06:55','退房 → 新大阪站','東横INN 免費早餐 6:30 開始可拿了就走。','hotel','新大阪駅'],
      ['06:55','07:10','新幹線 新大阪 → 京都','自由席 1,450 円，約 14 分。','train','京都駅'],
      ['07:10','07:20','京都站寄放行李','大型置物櫃約 700 円，越早越好。','hotel','京都駅 コインロッカー'],
      ['07:20','07:30','JR 奈良線 → 東福寺站','一站約 3 分，150 円，下車走路約 10 分。','train','東福寺駅'],
      ['07:30','08:30','東福寺 朝の貸切拝観','早晨包場 7:30–8:30（最後入場 8:00），EX旅先予約 1,800 円。','sight','東福寺 京都','要先自己預約'],
      ['08:30','09:30','東福寺 通天橋・本坊庭園','通天橋（つうてんきょう）1,000 円、本坊庭園 600 円（秋季無套票）。','sight','東福寺 通天橋'],
      ['09:30','10:00','步行 → 今熊野観音寺','走路約 15 分，上坡。','free','今熊野観音寺'],
      ['10:00','10:30','今熊野観音寺（いまくまのかんのんじ）','小紅書 11/22：已見頃，人少。','sight','今熊野観音寺'],
      ['10:30','11:30','泉涌寺（せんにゅうじ）','伽藍 500 円＋御座所庭園 500 円（紅葉看這裡）。網友：很偏僻、非常清靜。','sight','泉涌寺'],
      ['11:30','11:55','泉涌寺道 → 京都站（公車）','下坡走到「泉涌寺道」公車站，市公車 208 號往京都駅前約 10 分，230 円。平日約每 30 分一班。','bus','泉涌寺道 バス停'],
      ['11:55','13:15','午餐・取行李','想再吃炸串：串かつだるま 京都ポルタ店（京都站地下街 Porta，觸控面板點餐、18 席吧台，11:00–22:30）。','meal','串かつだるま 京都ポルタ店'],
      ['13:30','15:20','のぞみ 京都 → 新横浜','普通車指定席 13,500 円（自由席 12,650 円），約 1 小時 49 分。最晚 14:00 出發。','train','新横浜駅','需購票'],
      ['15:20','16:00','新横浜 → みなとみらい','JR 横浜線 → 横浜 → みなとみらい線 → みなとみらい站，走路約 5 分。','train','みなとみらい駅'],
      ['16:00','16:30','抵達 パシフィコ横浜ノース','第 67 回電池討論會（11/24–26）。橫濱市西區みなとみらい 1-1-2。','event','パシフィコ横浜ノース']
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
    ${d.pins ? '<div id="map" class="map-box" aria-label="當日京都地圖"></div><p class="muted">圖釘數字＝當日順序；點圖釘可開 Google Maps。</p>' : ''}
    <ol class="timeline">${d.events.map(e => renderEvent(d, e, now)).join('')}</ol>`;
  if (d.pins) renderMap(d.pins);
  history.replaceState(null, '', '#day-' + (i + 1));
  $('#day').querySelector('.now')?.scrollIntoView({block:'center'});
}

/* Numbered pins + dashed route for one day. No-op if Leaflet failed to load. */
let map = null;
function renderMap(pins) {
  if (!window.L) return;
  if (map) map.remove();
  map = L.map('map', {scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'© OpenStreetMap'}).addTo(map);
  const pts = pins.map(([, lat, lng]) => [lat, lng]);
  L.polyline(pts, {color:'#cb8058', weight:3, dashArray:'6 6'}).addTo(map);
  pins.forEach(([name, lat, lng], i) => {
    const icon = L.divIcon({className:'pin', html:`<span>${i + 1}</span>`, iconSize:[28, 28], iconAnchor:[14, 14]});
    L.marker([lat, lng], {icon}).addTo(map)
      .bindPopup(`<b>${i + 1}. ${esc(name)}</b><br><a href="${mapUrl(name + ' 京都')}" target="_blank" rel="noopener">Google Maps ↗</a>`);
  });
  map.fitBounds(pts, {padding:[24, 24]});
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
