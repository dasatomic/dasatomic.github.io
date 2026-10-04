// Interaktivna animacija mini Teslinog transformatora (slayer exciter, BD243 kit).
// Pojednostavljen model: oblici talasa i brojke su ilustrativni, ne merenje.
(function () {
  var root = document.getElementById('tesla-sim');
  if (!root) return;

  var F_REAL = 3.5e6;            // procenjena stvarna frekvencija (Hz)
  var KV_MAX = 8;                // amplituda na vrhu u ustaljenom stanju (kV, procena)
  var SPEEDS = [0.1, 0.25, 0.5, 1, 2, 4, 8];   // ciklusa u sekundi animacije
  var WINDOW = 3;                // koliko ciklusa prikazuje osciloskop

  var css = [
    '#tesla-sim{border:1px solid #e3e1db;border-radius:10px;padding:14px;background:#fcfcfb;color:#222;font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:2em 0}',
    '#tesla-sim .ts-row{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin:0 0 10px}',
    '#tesla-sim button{font:inherit;font-size:13.5px;padding:6px 12px;border-radius:7px;border:1px solid #cfccc4;background:#fff;color:#222;cursor:pointer}',
    '#tesla-sim button:hover{border-color:#999}',
    '#tesla-sim button:disabled{opacity:.4;cursor:default}',
    '#tesla-sim button.ts-power{background:#1e9e62;border-color:#1e9e62;color:#fff;font-weight:600}',
    '#tesla-sim button.ts-power.on{background:#c0392b;border-color:#c0392b}',
    '#tesla-sim label{font-size:13px;color:#444;display:inline-flex;align-items:center;gap:5px;margin:0}',
    '#tesla-sim .ts-group{display:inline-flex;flex-wrap:wrap;gap:4px 10px;align-items:center}',
    '#tesla-sim .ts-group b{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#777;font-weight:600}',
    '#tesla-sim .ts-speedlbl{font-size:12.5px;color:#666}',
    '#tesla-sim .ts-views{display:grid;grid-template-columns:1.45fr 1fr;gap:10px}',
    '@media (max-width:640px){#tesla-sim .ts-views{grid-template-columns:1fr}}',
    '#tesla-sim svg{width:100%;height:auto;display:block;background:#fff;border:1px solid #ebe9e4;border-radius:8px}',
    '#tesla-sim .ts-cap{background:#fff;border:1px solid #ebe9e4;border-left:4px solid #2a78d6;border-radius:6px;padding:9px 12px;margin:10px 0;min-height:4.6em;font-size:14.5px}',
    '#tesla-sim .ts-cap small{display:block;color:#666;margin-top:3px;font-size:13px}',
    '#tesla-sim .ts-read{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:13px;margin:6px 0 10px;color:#444}',
    '#tesla-sim .ts-read span b{font-variant-numeric:tabular-nums}',
    '#tesla-sim .ts-note{font-size:12px;color:#888;margin:8px 0 0}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var bumps = function (n, h) { var s = ''; for (var i = 0; i < n; i++) s += 'c14 0 14 ' + h + ' 0 ' + h + ' '; return s; };
  var L1 = 'M350 50 V80 ' + bumps(4, 15) + 'V215';
  var L2 = 'M480 70 V80 ' + bumps(20, 10);

  root.innerHTML =
    '<div class="ts-row">' +
      '<button class="ts-power" data-k="power">Uključi S1</button>' +
      '<button data-k="play">Pauza</button>' +
      '<button data-k="step" disabled>Korak →</button>' +
      '<label>Brzina <input type="range" min="0" max="6" step="1" value="2" data-k="speed"></label>' +
      '<span class="ts-speedlbl" data-k="speedlbl"></span>' +
    '</div>' +
    '<div class="ts-views">' +
    // ---------- šema ----------
    '<svg viewBox="0 0 620 380" aria-label="Animirana šema">' +
      '<defs><linearGradient id="tsL2g" x1="0" y1="1" x2="0" y2="0">' +
        '<stop offset="0" stop-color="#c0392b" stop-opacity="0"/><stop offset="1" data-k="l2stop" stop-color="#c0392b" stop-opacity="1"/>' +
      '</linearGradient></defs>' +
      '<rect x="462" y="66" width="36" height="216" rx="6" fill="url(#tsL2g)" data-k="l2glow" opacity="0"/>' +
      '<circle cx="333" cy="250" r="34" fill="#e67e22" data-k="qglow" opacity="0"/>' +
      '<circle cx="250" cy="290" r="22" fill="#2a78d6" data-k="d1glow" opacity="0"/>' +
      '<path d="' + L1 + '" fill="none" stroke="#e67e22" stroke-width="9" stroke-linecap="round" data-k="l1glow" opacity="0"/>' +
      '<g fill="none" stroke="#444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M50 50 H88 M132 50 H350 M50 340 H350 M50 50 V165 M50 177 V340"/>' +
        '<path d="M92 50 L128 50" data-k="sw"/>' +
        '<path d="M30 165 H70" stroke-width="3"/><path d="M40 177 H60" stroke-width="5"/>' +
        '<path d="M170 50 V185 M157 185 H183 M157 195 H183 M170 195 V340"/>' +
        '<path d="M250 250 H290"/>' +
      '</g>' +
      '<path stroke="#8e44ad" stroke-width="2.2" fill="none" stroke-linejoin="round" d="M250 50 V90 L242 96 L258 108 L242 120 L258 132 L242 144 L250 150 V250"/>' +
      '<path stroke="#2a78d6" stroke-width="2.2" fill="none" d="M250 250 V278 M236 278 H264 M250 302 V340"/>' +
      '<path stroke="#2a78d6" stroke-width="2" fill="#dbe9fb" d="M236 302 H264 L250 278 Z"/>' +
      '<path stroke="#e67e22" stroke-width="2.2" fill="none" stroke-linejoin="round" d="' + L1 + ' L320 238"/>' +
      '<path stroke="#e67e22" stroke-width="2.2" fill="none" d="M320 262 L350 285 V340"/>' +
      '<path d="M350 285 l-12 -1 l6 -9 Z" fill="#e67e22"/>' +
      '<path d="M320 225 V275" stroke="#444" stroke-width="3.5"/>' +
      '<path stroke="#1e9e62" stroke-width="2.2" fill="none" d="M290 250 H320 M480 280 V300 M480 316 V326 H356 a6 6 0 0 0 -12 0 H290 V250"/>' +
      '<rect x="471" y="300" width="18" height="16" fill="#fff7d6" stroke="#b58b00" stroke-width="1.5"/>' +
      '<path d="' + L2 + '" fill="none" stroke="#c0392b" stroke-width="2.2"/>' +
      '<circle cx="480" cy="62" r="7" fill="#fff" stroke="#c0392b" stroke-width="2.5"/>' +
      '<path d="M420 80 V145 M430 80 V145" stroke="#2a78d6" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<g fill="#444"><circle cx="170" cy="50" r="3.5"/><circle cx="250" cy="50" r="3.5"/><circle cx="170" cy="340" r="3.5"/><circle cx="250" cy="340" r="3.5"/><circle cx="250" cy="250" r="3.5"/><circle cx="290" cy="250" r="3.5"/></g>' +
      // tokovi struje (tačkice koje putuju)
      '<g fill="none" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="0.1 11">' +
        '<path data-k="fMain" stroke="#b85e10" d="' + L1 + ' L322 238 L322 262 L350 285 V340"/>' +
        '<path data-k="fR1" stroke="#6d2f8a" d="M250 50 V90 L242 96 L258 108 L242 120 L258 132 L242 144 L250 150 V250 H320"/>' +
        '<path data-k="fFb" stroke="#137a4a" d="M480 280 V300 M480 316 V326 H290 V250 H320"/>' +
        '<path data-k="fD1" stroke="#1b5fb3" d="M250 340 V250"/>' +
      '</g>' +
      '<g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="13" fill="#333">' +
        '<text x="78" y="164">J1</text><text x="78" y="179" font-size="11.5" fill="#666">adapter</text>' +
        '<text x="96" y="34">S1</text>' +
        '<text x="190" y="188">C1</text>' +
        '<text x="266" y="118" fill="#8e44ad">R1</text>' +
        '<text x="232" y="294" text-anchor="end" fill="#2a78d6">D1</text>' +
        '<text x="300" y="242" font-size="11.5">B</text><text x="358" y="222" font-size="11.5">C</text><text x="358" y="292" font-size="11.5">E</text>' +
        '<text x="362" y="262" font-weight="600">Q1</text>' +
        '<text x="366" y="104" fill="#e67e22" font-weight="600">L1</text><text x="366" y="118" font-size="11.5" fill="#666">primar</text>' +
        '<text x="503" y="180" fill="#c0392b" font-weight="600">L2</text><text x="503" y="195" font-size="11.5" fill="#666">sekundar</text>' +
        '<text x="480" y="312" text-anchor="middle" font-size="11" font-weight="700" fill="#7a5d00">T</text>' +
        '<text x="498" y="56" font-weight="600" data-k="vtxt" fill="#c0392b">0 kV</text>' +
        '<text x="378" y="282" font-size="12" font-weight="600" data-k="qtxt" fill="#999">zatvoren</text>' +
        '<text x="50" y="365" font-size="11.5" fill="#888">masa (−)</text>' +
      '</g>' +
    '</svg>' +
    // ---------- fizički prikaz ----------
    '<svg viewBox="0 0 400 380" aria-label="Kalem, polje i sijalica">' +
      '<defs>' +
        '<radialGradient id="tsNeon"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".95"/><stop offset=".55" stop-color="#ff6a1a" stop-opacity=".35"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="tsPurple"><stop offset="0" stop-color="#e7d4ff" stop-opacity="1"/><stop offset=".4" stop-color="#a66bff" stop-opacity=".6"/><stop offset="1" stop-color="#a66bff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="tsBlue"><stop offset="0" stop-color="#7fb2ff" stop-opacity=".95"/><stop offset="1" stop-color="#7fb2ff" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="tsCopper" x1="0" x2="1"><stop offset="0" stop-color="#b8661f"/><stop offset=".45" stop-color="#f0a454"/><stop offset="1" stop-color="#a65a19"/></linearGradient>' +
        '<linearGradient id="tsVg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c0392b" stop-opacity="0"/><stop offset="1" data-k="vstop" stop-color="#c0392b" stop-opacity=".85"/></linearGradient>' +
        '<clipPath id="tsClip"><rect data-k="clip" x="0" y="0" width="400" height="380"/></clipPath>' +
      '</defs>' +
      '<rect x="0" y="352" width="400" height="28" fill="#efe9df"/>' +
      '<rect x="40" y="340" width="6" height="12" fill="#c9a640"/><rect x="214" y="340" width="6" height="12" fill="#c9a640"/>' +
      '<rect x="30" y="332" width="200" height="9" rx="2" fill="#1f4f9e"/>' +
      '<g data-k="heat"><rect x="44" y="270" width="34" height="62" fill="#222"/><path d="M48 270 V258 M56 270 V258 M64 270 V258 M72 270 V258" stroke="#222" stroke-width="3"/></g>' +
      '<rect x="44" y="258" width="34" height="74" fill="#ff3b1f" data-k="heatglow" opacity="0"/>' +
      '<text x="61" y="250" text-anchor="middle" font-size="10.5" fill="#666" font-family="sans-serif">Q1</text>' +
      '<g data-k="bfield" fill="none" stroke="#2a78d6" stroke-width="1.6" stroke-dasharray="4 4" opacity="0">' +
        '<ellipse cx="150" cy="300" rx="62" ry="34"/><ellipse cx="150" cy="290" rx="88" ry="52"/>' +
      '</g>' +
      '<rect x="122" y="152" width="56" height="178" fill="url(#tsCopper)"/>' +
      '<g stroke="#8a4a12" stroke-width=".6" opacity=".5">' + (function () { var s = ''; for (var y = 158; y < 330; y += 6) s += '<path d="M122 ' + y + ' H178"/>'; return s; })() + '</g>' +
      '<rect x="122" y="152" width="56" height="178" fill="url(#tsVg)" data-k="vglow" opacity="0"/>' +
      '<ellipse cx="150" cy="152" rx="28" ry="6" fill="#f4f4f4" stroke="#ccc"/>' +
      '<ellipse cx="150" cy="331" rx="44" ry="6" fill="none" stroke="#e8e8e8" stroke-width="3"/>' +
      '<ellipse cx="150" cy="331" rx="44" ry="6" fill="none" stroke="#ff8c1a" stroke-width="5" data-k="ringglow" opacity="0"/>' +
      '<ellipse cx="150" cy="322" rx="30" ry="14" fill="url(#tsBlue)" data-k="ledglow" opacity="0"/>' +
      '<path d="M150 152 C150 128 160 116 156 92" fill="none" stroke="#b8661f" stroke-width="1.5"/>' +
      '<g clip-path="url(#tsClip)" fill="none" stroke-width="1.6" data-k="efield" opacity="0"></g>' +
      '<g data-k="barrier"></g>' +
      '<g data-k="bulb">' +
        '<ellipse cx="0" cy="214" rx="34" ry="46" fill="url(#tsNeon)" data-k="bulbglow" opacity="0"/>' +
        '<rect x="-9" y="186" width="18" height="56" rx="9" fill="#fbf8f4" fill-opacity=".6" stroke="#999" stroke-width="1.6"/>' +
        '<path d="M-3 196 V232 M3 196 V232" stroke="#888" stroke-width="1.4"/>' +
        '<path d="M-3 242 V300 M3 242 V300" stroke="#999" stroke-width="1.2"/>' +
        '<text x="0" y="318" text-anchor="middle" font-size="11" fill="#666" font-family="sans-serif" data-k="dtxt"></text>' +
      '</g>' +
      '<g data-k="pencil" style="display:none">' +
        '<path d="M149 62 V4 H163 V62 Z" fill="#f2c94c" stroke="#a67c00"/>' +
        '<path d="M149 62 L156 76 L163 62 Z" fill="#e8d3b0" stroke="#a67c00"/>' +
        '<path d="M153.5 71 L156 76 L158.5 71 Z" fill="#333"/>' +
        '<text x="143" y="40" text-anchor="end" font-size="11" fill="#666" font-family="sans-serif">olovka (grafit)</text>' +
      '</g>' +
      '<g data-k="finger" style="display:none">' +
        '<path d="M145 0 V78 C145 92 167 92 167 78 V0 Z" fill="#f2c7a5" stroke="#b07a55"/>' +
        '<path d="M149 80 C149 87 163 87 163 80 V70 C163 66 149 66 149 70 Z" fill="#fbe3d2" stroke="#d9a07c"/>' +
        '<text x="139" y="40" text-anchor="end" font-size="11" fill="#666" font-family="sans-serif">prst</text>' +
      '</g>' +
      '<path data-k="spark" fill="none" stroke="#e9dcff" stroke-width="2.2" style="filter:drop-shadow(0 0 3px #a66bff)"/>' +
      '<circle cx="156" cy="92" r="16" fill="url(#tsPurple)" data-k="corona" opacity="0"/>' +
      '<g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="11" fill="#666">' +
        '<text x="12" y="20">pogled sa strane</text>' +
        '<text x="150" y="374" text-anchor="middle">L1 prsten na pločici</text>' +
      '</g>' +
    '</svg>' +
    '</div>' +
    '<div class="ts-cap" data-k="cap"></div>' +
    '<div class="ts-read">' +
      '<span>Napon na vrhu L2: <b data-k="rV">0 kV</b></span>' +
      '<span>Q1: <b data-k="rQ">zatvoren</b></span>' +
      '<span>D1: <b data-k="rD">ne svetli</b></span>' +
      '<span>Sijalica: <b data-k="rB">ne svetli</b></span>' +
    '</div>' +
    '<div class="ts-row">' +
      '<span class="ts-group"><b>Vrh kalema</b>' +
        '<label><input type="radio" name="ts-tip" value="free" checked> slobodan</label>' +
        '<label><input type="radio" name="ts-tip" value="pencil"> olovka</label>' +
        '<label><input type="radio" name="ts-tip" value="finger"> prst</label></span>' +
      '<span class="ts-group"><b>Između</b>' +
        '<label><input type="radio" name="ts-bar" value="none" checked> ništa</label>' +
        '<label><input type="radio" name="ts-bar" value="glass"> staklo</label>' +
        '<label><input type="radio" name="ts-bar" value="foil"> folija</label></span>' +
      '<label>Sijalica na <input type="range" min="3" max="14" step="0.5" value="5" data-k="dist"> <span data-k="distlbl">5 cm</span></label>' +
    '</div>' +
    '<svg viewBox="0 0 900 200" aria-label="Osciloskop">' +
      '<g stroke="#eee"><path d="M150 40 H890 M150 110 H890 M150 185 H890"/></g>' +
      '<path d="M890 8 V196" stroke="#ccc" stroke-dasharray="3 3"/>' +
      '<polyline data-k="sV" fill="none" stroke="#c0392b" stroke-width="2"/>' +
      '<polyline data-k="sB" fill="none" stroke="#1e9e62" stroke-width="2"/>' +
      '<polyline data-k="sI" fill="none" stroke="#e67e22" stroke-width="2"/>' +
      '<g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="12.5">' +
        '<text x="8" y="36" fill="#c0392b" font-weight="600">napon na vrhu L2</text><text x="8" y="51" fill="#999" font-size="11">± nekoliko kV</text>' +
        '<text x="8" y="106" fill="#1e9e62" font-weight="600">napon baze Q1</text><text x="8" y="121" fill="#999" font-size="11">= dno L2, −3…+0,7 V</text>' +
        '<text x="8" y="168" fill="#e67e22" font-weight="600">struja kroz L1</text><text x="8" y="183" fill="#999" font-size="11">kad Q1 provodi</text>' +
        '<text x="886" y="198" text-anchor="end" fill="#999" font-size="11">sada</text>' +
        '<text x="152" y="198" fill="#999" font-size="11">← poslednja 3 ciklusa (u stvarnosti manje od 1 µs)</text>' +
      '</g>' +
    '</svg>' +
    '<p class="ts-note">Pojednostavljen model: oblici talasa, brojke i domet sijalice su ilustrativni, a ne merenje.</p>';

  var $ = function (k) { return root.querySelector('[data-k="' + k + '"]'); };
  var el = {};
  ['power','play','step','speed','speedlbl','l2stop','l2glow','qglow','d1glow','l1glow','sw','fMain','fR1','fFb','fD1','vtxt','qtxt',
   'heatglow','bfield','vglow','vstop','ringglow','ledglow','efield','barrier','bulb','bulbglow','dtxt','pencil','finger','spark','corona','clip',
   'cap','rV','rQ','rD','rB','dist','distlbl','sV','sB','sI'].forEach(function (k) { el[k] = $(k); });

  // ---------- stanje ----------
  var S = {
    power: false, playing: true, speed: SPEEDS[2],
    theta: 0, A: 0, cyc: 0, sinceOn: 0, temp: 0,
    tip: 'free', bar: 'none', dist: 5,
    vt: 0, vb: 0, ic: 0, d1: 0, on: false, glow: 0,
    hist: [], off: { main: 0, r1: 0, fb: 0, d1: 0 }
  };
  var SUB = 1 / 96;

  function step(h) {
    S.theta += 2 * Math.PI * h; S.cyc += h;
    if (S.power) S.sinceOn += h;
    var target = !S.power ? 0 : S.tip === 'finger' ? 0.35 : S.tip === 'pencil' ? 0.65 : 1;
    var tau = S.power ? 4 : 2;
    S.A += (target - S.A) * h / tau;
    if (S.A < 1e-4) S.A = 0;
    var s = Math.sin(S.theta);
    S.vt = S.A * s;
    var startup = S.power && S.sinceOn < 0.3;
    if (!S.power) S.vb = S.A > 0.02 ? Math.max(-3, Math.min(0.7, S.A * s * 25)) : 0;
    else if (startup) S.vb = 0.7;
    else S.vb = Math.max(-3, Math.min(0.7, S.A * s * 25 + (S.A < 0.03 ? 0.7 : 0)));
    S.on = S.power && S.vb > 0.55;
    S.ic = !S.on ? 0 : startup ? 0.15 + S.sinceOn : Math.max(0.15, s) * (0.4 + 0.6 * Math.min(1, S.A));
    S.d1 = S.vb < -1.6 ? Math.min(1, (-S.vb - 1.6) / 1.4) : 0;
    S.hist.push([S.cyc, S.vt, S.vb, S.ic]);
  }

  function fieldAtBulb() {
    var bf = S.bar === 'foil' ? 0 : S.bar === 'glass' ? 0.85 : 1;
    return S.A * bf * Math.pow(5 / S.dist, 2);
  }

  // ---------- crtanje ----------
  var bulbX = 0, barX = 0;
  function layoutScene() {
    bulbX = 160 + S.dist * 16;
    barX = (180 + bulbX) / 2;
    el.bulb.setAttribute('transform', 'translate(' + bulbX + ' 0)');
    el.dtxt.textContent = S.dist.toString().replace('.', ',') + ' cm';
    el.distlbl.textContent = S.dist.toString().replace('.', ',') + ' cm';
    // linije električnog polja od vrha prema sijalici
    var tx = 156, ty = 92, g = '';
    [[-40, 200], [-10, 214], [25, 228], [-75, 186]].forEach(function (o, i) {
      var ex = bulbX - 12, ey = o[1];
      g += '<path d="M' + tx + ' ' + ty + ' Q' + (tx + (ex - tx) * 0.45) + ' ' + (ty + o[0] * (i === 3 ? 0.4 : 0.2) - 10) + ' ' + ex + ' ' + ey + '" stroke-dasharray="6 5"/>';
    });
    g += '<path d="M156 92 Q120 60 70 70" stroke-dasharray="6 5"/><path d="M156 92 Q170 50 190 20" stroke-dasharray="6 5"/>';
    el.efield.innerHTML = g;
    var b = '';
    if (S.bar === 'glass') {
      b = '<rect x="' + (barX - 5) + '" y="40" width="10" height="292" rx="3" fill="#cfe6ff" fill-opacity=".55" stroke="#7fb2e6"/>' +
          '<text x="' + barX + '" y="34" text-anchor="middle" font-size="11" fill="#2a78d6" font-family="sans-serif">staklo</text>';
    } else if (S.bar === 'foil') {
      b = '<rect x="' + (barX - 2) + '" y="40" width="4" height="270" fill="#c9ccd1" stroke="#8a8f96"/>' +
          '<path d="M' + barX + ' 310 V322 M' + (barX - 9) + ' 322 H' + (barX + 9) + ' M' + (barX - 6) + ' 326 H' + (barX + 6) + ' M' + (barX - 3) + ' 330 H' + (barX + 3) + '" stroke="#555" stroke-width="1.4"/>' +
          '<text x="' + barX + '" y="34" text-anchor="middle" font-size="11" fill="#555" font-family="sans-serif">folija (u ruci)</text>';
    }
    el.barrier.innerHTML = b;
    el.clip.setAttribute('width', S.bar === 'foil' ? barX - 2 : 400);
    el.pencil.style.display = S.tip === 'pencil' ? '' : 'none';
    el.finger.style.display = S.tip === 'finger' ? '' : 'none';
  }

  function fmtKV(v) { return (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1).replace('.', ',') + ' kV'; }

  function caption() {
    var t, sub = '';
    if (!S.power && S.A < 0.01) {
      t = 'Prekidač S1 je isključen i ništa se ne dešava. Pritisni <b>Uključi S1</b>.';
    } else if (!S.power) {
      t = 'S1 je isključen: tranzistor više ne gura, pa oscilacija u sekundaru zamire za nekoliko ciklusa.';
    } else if (S.sinceOn < 0.3) {
      t = '<b>Start.</b> Kroz otpornik <span style="color:#8e44ad">R1</span> mala struja ulazi u bazu, pa se Q1 otvara. Kroz primar <span style="color:#e67e22">L1</span> (bakarni prsten) krene struja i oko njega nastaje magnetno polje.';
    } else if (S.speed > 1 && S.playing) {
      t = 'Ubrzano: ciklusi se smenjuju prebrzo da bi se opisali jedan po jedan. Uspori animaciju ili pauziraj i idi <b>Korak →</b>.';
    } else {
      var q = Math.floor(((S.theta % (2 * Math.PI)) / (2 * Math.PI)) * 4);
      t = [
        '<b>Q1 provodi.</b> Struja teče kroz primar <span style="color:#e67e22">L1</span>, magnetno polje prolazi kroz sekundar i „gura" ga. Napon na vrhu <span style="color:#c0392b">L2</span> raste ka plusu.',
        '<b>Vrh L2 je na vrhuncu (+)</b> i kreće nazad. Dno L2 je vezano za bazu (<span style="color:#1e9e62">zelena žica</span> preko rupice T), i još uvek drži Q1 otvorenim.',
        '<b>Dno L2 je otišlo u minus</b>, pa je baza u minusu i Q1 se zatvara. <span style="color:#2a78d6">D1</span> provodi i ne dozvoljava da baza ode ispod oko −3 V. Zato plava LED svetli.',
        '<b>Vrh L2 je u minusu (−)</b> i oscilacija se vraća. Čim dno L2 pređe u plus, Q1 se ponovo otvara i ciklus kreće iz početka, tačno u ritmu sekundara.'
      ][q];
    }
    if (S.power && S.sinceOn > 0.3) {
      if (S.A < 0.9 * (S.tip === 'free' ? 1 : S.tip === 'pencil' ? 0.65 : 0.35)) sub = 'Napon raste iz ciklusa u ciklus: to je rezonancija, kao ljuljaška koja se gura u pravom trenutku.';
      else sub = 'Napon se ustalio: gubici po ciklusu jednaki su onome što tranzistor ubaci.';
      if (S.tip === 'pencil') sub += ' Između vrha i olovke vazduh se jonizuje i nastaje varnica (plazma), koja troši energiju, pa je napon niži.';
      if (S.tip === 'finger') sub += ' Prst opterećuje sekundar i napon jako pada. Struju od nekoliko MHz nervi ne osete, samo malo toplote na mestu dodira.';
      if (S.bar === 'foil') sub += ' Folija u ruci zaustavlja električno polje, pa sijalica iza nje ne svetli.';
      if (S.bar === 'glass') sub += ' Staklo je izolator i propušta polje, pa sijalica i dalje svetli.';
    }
    el.cap.innerHTML = t + (sub ? '<small>' + sub + '</small>' : '');
  }

  var last = null, acc = 0, sparkT = 0;
  function render(dtReal) {
    var A = S.A, s = Math.sin(S.theta);
    // šema
    el.qglow.setAttribute('opacity', S.on ? 0.18 + 0.25 * S.ic : 0);
    el.l1glow.setAttribute('opacity', 0.45 * S.ic);
    el.d1glow.setAttribute('opacity', 0.55 * S.d1);
    el.l2glow.setAttribute('opacity', Math.min(1, Math.abs(S.vt) * 1.1));
    el.l2stop.setAttribute('stop-color', S.vt >= 0 ? '#c0392b' : '#2a78d6');
    el.sw.setAttribute('d', S.power ? 'M92 50 L128 50' : 'M92 50 L128 38');
    el.vtxt.textContent = fmtKV(S.vt * KV_MAX);
    el.vtxt.setAttribute('fill', S.vt >= 0 ? '#c0392b' : '#2a78d6');
    el.qtxt.textContent = S.on ? 'provodi' : 'zatvoren';
    el.qtxt.setAttribute('fill', S.on ? '#e67e22' : '#999');
    var v = 60 * dtReal;
    S.off.main += v * S.ic; S.off.r1 += S.power ? v * 0.35 : 0;
    S.off.fb += v * A * Math.cos(S.theta) * 1.2; S.off.d1 += v * S.d1;
    el.fMain.style.strokeDashoffset = -S.off.main; el.fMain.setAttribute('opacity', S.ic > 0.01 ? 1 : 0);
    el.fR1.style.strokeDashoffset = -S.off.r1; el.fR1.setAttribute('opacity', S.power ? 0.8 : 0);
    el.fFb.style.strokeDashoffset = -S.off.fb; el.fFb.setAttribute('opacity', Math.min(1, A * 2));
    el.fD1.style.strokeDashoffset = -S.off.d1; el.fD1.setAttribute('opacity', S.d1 > 0.02 ? 1 : 0);
    // fizički prikaz
    S.temp += dtReal * ((S.power ? (S.tip === 'finger' ? 0.09 : 0.05) : 0) - 0.02 * S.temp);
    S.temp = Math.max(0, Math.min(1, S.temp));
    el.heatglow.setAttribute('opacity', 0.55 * S.temp);
    el.ringglow.setAttribute('opacity', S.ic);
    el.bfield.setAttribute('opacity', 0.85 * S.ic);
    el.ledglow.setAttribute('opacity', S.power ? 0.25 + 0.75 * S.d1 : 0);
    el.vglow.setAttribute('opacity', Math.min(1, Math.abs(S.vt) * 1.2));
    el.vstop.setAttribute('stop-color', S.vt >= 0 ? '#c0392b' : '#2a78d6');
    el.efield.setAttribute('opacity', Math.min(1, Math.abs(S.vt) * 1.3));
    el.efield.setAttribute('stroke', S.vt >= 0 ? '#c0392b' : '#2a78d6');
    S.off.e = (S.off.e || 0) - 40 * dtReal * S.vt;
    el.efield.style.strokeDashoffset = S.off.e;
    var E = fieldAtBulb();
    var glow = Math.max(0, Math.min(1, (E - 0.25) / 0.6));
    S.glow = glow;
    el.bulbglow.setAttribute('opacity', glow ? glow * (0.92 + 0.08 * Math.random()) : 0);
    el.corona.setAttribute('opacity', S.tip === 'free' && A > 0.55 ? (A - 0.5) * 1.6 * (0.7 + 0.3 * Math.random()) : 0);
    el.corona.setAttribute('r', 10 + 8 * A);
    sparkT += dtReal;
    if (S.tip === 'pencil' && A > 0.3) {
      if (sparkT > 0.05) {
        sparkT = 0;
        var x0 = 156, y0 = 91, x1 = 156, y1 = 77, p = 'M' + x0 + ' ' + y0;
        for (var i = 1; i < 5; i++) p += ' L' + (x0 + (Math.random() - 0.5) * 8) + ' ' + (y0 + (y1 - y0) * i / 5);
        el.spark.setAttribute('d', p + ' L' + x1 + ' ' + y1);
      }
      el.spark.setAttribute('opacity', Math.min(1, A * 1.4));
    } else el.spark.setAttribute('opacity', 0);
    // brojke
    el.rV.textContent = (S.playing && S.speed > 1) ? 'do ±' + (A * KV_MAX).toFixed(1).replace('.', ',') + ' kV' : fmtKV(S.vt * KV_MAX);
    el.rQ.textContent = S.on ? 'provodi' : 'zatvoren';
    el.rD.textContent = S.d1 > 0.02 ? 'provodi i svetli' : (S.power ? 'slabo / ne' : 'ne svetli');
    el.rB.textContent = glow > 0.05 ? (glow > 0.6 ? 'svetli' : 'svetli slabo') : 'ne svetli';
    // osciloskop
    var t0 = S.cyc - WINDOW;
    while (S.hist.length && S.hist[0][0] < t0 - 0.05) S.hist.shift();
    var pv = '', pb = '', pi = '';
    for (var j = 0; j < S.hist.length; j++) {
      var hh = S.hist[j], x = (150 + (hh[0] - t0) / WINDOW * 740).toFixed(1);
      pv += x + ',' + (40 - hh[1] * 30).toFixed(1) + ' ';
      pb += x + ',' + (110 - hh[2] * 9).toFixed(1) + ' ';
      pi += x + ',' + (185 - hh[3] * 32).toFixed(1) + ' ';
    }
    el.sV.setAttribute('points', pv); el.sB.setAttribute('points', pb); el.sI.setAttribute('points', pi);
    caption();
  }

  function frame(ts) {
    var dt = last === null ? 0 : Math.min(0.05, (ts - last) / 1000);
    last = ts;
    if (S.playing) {
      acc += dt * S.speed;
      var n = 0;
      while (acc >= SUB && n < 2000) { step(SUB); acc -= SUB; n++; }
    }
    render(S.playing ? dt : 0);
    requestAnimationFrame(frame);
  }

  function speedLabel() {
    var slow = F_REAL / S.speed, secs = 1 / S.speed;
    el.speedlbl.textContent = '1 ciklus = ' + (secs >= 1 ? secs.toFixed(secs < 2 ? 1 : 0) : secs.toFixed(2)).replace('.', ',') +
      ' s (usporeno oko ' + (slow >= 1e6 ? Math.round(slow / 1e6) + ' miliona' : Math.round(slow / 1e3) + ' hiljada') + ' puta)';
  }

  // ---------- kontrole ----------
  el.power.addEventListener('click', function () {
    S.power = !S.power;
    if (S.power) { S.sinceOn = 0; if (S.A < 0.01) { S.theta = 0; } }
    el.power.textContent = S.power ? 'Isključi S1' : 'Uključi S1';
    el.power.classList.toggle('on', S.power);
  });
  el.play.addEventListener('click', function () {
    S.playing = !S.playing;
    el.play.textContent = S.playing ? 'Pauza' : 'Nastavi';
    el.step.disabled = S.playing;
  });
  el.step.addEventListener('click', function () {
    for (var i = 0; i < 12; i++) step(SUB);   // 1/8 ciklusa
  });
  el.speed.addEventListener('input', function () { S.speed = SPEEDS[+el.speed.value]; speedLabel(); });
  el.dist.addEventListener('input', function () { S.dist = +el.dist.value; layoutScene(); });
  root.querySelectorAll('input[name="ts-tip"]').forEach(function (r) {
    r.addEventListener('change', function () { S.tip = r.value; layoutScene(); });
  });
  root.querySelectorAll('input[name="ts-bar"]').forEach(function (r) {
    r.addEventListener('change', function () { S.bar = r.value; layoutScene(); });
  });

  speedLabel(); layoutScene();
  root.__sim = { S: S, step: step };   // za testiranje iz konzole
  requestAnimationFrame(frame);
})();
