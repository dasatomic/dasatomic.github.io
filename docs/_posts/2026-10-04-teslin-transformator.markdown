---
layout: post
title:  "Teslin transformator na stolu: kako 12 volti postane nekoliko hiljada"
date:   2026-10-04 12:00:00 +0100
categories: Nauka
excerpt: "Pavle (12) i ja smo sklopili mali Teslin transformator iz kita od 540 dinara. Šta radi svaka komponenta, odakle hiljade volti iz adaptera od 12 V, zašto sijalica svetli bez žica, zašto je čaša ne zaustavlja, a aluminijumska folija zaustavlja — i šta još da probate."
---

<style>
.post-content figure { margin: 2em 0; }
.post-content figure svg { width: 100%; height: auto; display: block; }
.post-content figcaption { font-size: .88em; color: #666; margin-top: .6em; line-height: 1.5; }
.post-content .box { background: #f6f5f2; border-left: 3px solid #2a78d6; padding: .9em 1.1em; margin: 1.5em 0; border-radius: 3px; }
.post-content .warn { background: #fdf3ec; border-left: 3px solid #eb6834; padding: .9em 1.1em; margin: 1.5em 0; border-radius: 3px; }
.post-content .box p:last-child, .post-content .warn p:last-child { margin-bottom: 0; }
.post-content .formula { font-family: Georgia, "Times New Roman", serif; font-size: 1.12em; text-align: center; margin: 1em 0; }
.post-content h2 { margin-top: 2.2em; }
.post-content h3 { margin-top: 1.6em; }
</style>

Moj sin Pavle (12 godina) i ja proveli smo jedan vikend sa lemilicom, tinolom i [kitom „Teslin transformator 9–12 VDC"](https://www.mikroprinc.com/sr/proizvod/kit-komplet-teslin-transformator-9-12vdc) iz Mikroprinca. Kesica sa dvadesetak delova, pločica 31 × 40 mm, i na kraju — mala ljubičasta munja na vrhu kalema i fluorescentna sijalica koja svetli u vazduhu, a da je ništa ne dodiruje.

Ovaj tekst je pokušaj da zapišemo sve što smo usput naučili, i ono što smo morali da proverimo posle: šta svaka komponenta radi, kako se 12 volti iz adaptera pretvori u hiljade volti, i zašto se sa sijalicom, čašom i aluminijumskom folijom dešava baš ono što se dešava.

<!-- FOTO: gotov transformator na stolu, sa upaljenom sijalicom -->

## Malo istorije: od Faradejevog prstena do Tesle

**1831.** Majkl Faradej je na gvozdeni prsten namotao dve odvojene žice. Kad je na jednu priključio bateriju, igla instrumenta na drugoj se trznula — ali samo u trenutku uključivanja i isključivanja. Zaključak koji je promenio svet: **struja ne nastaje od magnetnog polja, nego od promene magnetnog polja.** To je elektromagnetna indukcija, i to je ceo princip svakog transformatora. Džozef Henri je u Americi do istog otkrića došao nezavisno, otprilike u isto vreme.

**1836–1851.** Indukcioni kalem (Kalan, pa Rumkorf): mali broj navoja debele žice, ogroman broj navoja tanke, i mehanički prekidač koji stalno prekida struju. Prvi način da se iz baterije dobiju varnice od nekoliko centimetara. Naš kit je, u suštini, njegov daleki potomak.

**1882–1886.** Golar i Gibs u Londonu, pa Cipernovski, Blati i Deri u fabrici Ganz u Budimpešti, prave transformatore sa zatvorenim gvozdenim jezgrom — praktično iste kao oni koji danas stoje u trafo-stanicama. Iz te budimpeštanske radionice potiče i sam naziv *transformator*. Vilijam Stenli 1886. pravi prvu gradsku mrežu naizmenične struje sa transformatorima.

**1888–1891.** Nikola Tesla (Smiljan, 1856 — Njujork, 1943) patentira asinhroni motor i sistem naizmenične struje koji Westinghouse kupuje i koji pobeđuje u „ratu struja" protiv Edisonove jednosmerne. A onda Tesla ide korak dalje: zanimaju ga **visoke frekvencije**. Godine 1891. patentira (US 454,622) rezonantni transformator sa vazdušnim jezgrom — ono što danas zovemo **Teslin transformator** ili *Tesla coil*. Na predavanjima u Njujorku i Londonu drži u rukama cevi koje svetle bez ikakvih žica i propušta kroz sopstveno telo struje visoke frekvencije bez posledica. Godine 1899. u Kolorado Springsu pravi transformator sa veštačkim munjama dugim desetinama metara.

Tesla je sanjao o bežičnom prenosu energije preko celog sveta. Taj san se nije ostvario onako kako je on zamišljao, ali kada vaš telefon puni bežično punjač, to je potomak iste ideje. Njegova urna je u [Muzeju Nikole Tesle](https://tesla-museum.org/) u Beogradu, a jedinica za magnetnu indukciju u SI sistemu od 1960. zove se **tesla**.

## Opšti pristup: kako radi Teslin transformator

Običan transformator (punjač, trafo-stanica) ima gvozdeno jezgro i radi na 50 Hz. Napon se menja u odnosu broja navoja:

<p class="formula">U<sub>2</sub> = U<sub>1</sub> · N<sub>2</sub> / N<sub>1</sub></p>

Ako primar ima 100 navoja a sekundar 1000, napon se povećava deset puta. Prosto.

Teslin transformator je drugačiji u tri stvari:

1. **Nema gvozdeno jezgro.** Na visokim frekvencijama gvožđe bi se samo grejalo. Zato je sprega između dva kalema slaba: samo mali deo magnetnog polja primara prolazi kroz sekundar.
2. **Radi na frekvenciji od nekoliko miliona herca (MHz)**, a ne na 50 Hz.
3. **Sekundar je rezonator.** Ovo je ključ. Kalem od nekoliko stotina navoja tanke žice ima svoju prirodnu frekvenciju na kojoj „voli" da osciluje — kao ljuljaška, kao žica na gitari, kao čaša koju zazvučite prstom. Ako ga guramo baš u tom ritmu, napon na njemu raste ciklus po ciklus mnogo iznad onoga što bi dao sam odnos navoja.

Klasični Teslini transformatori koriste varničar i kondenzator da naprave te visokofrekventne udare. Naš kit je najjednostavnija moderna verzija, poznata kod hobista kao **slayer exciter**: jedan tranzistor, jedan otpornik, i kalem koji sam sebi određuje ritam.

## Šta je u kesici

| Komponenta | Količina | Uloga |
|---|---|---|
| Štampana pločica (PCB) 31 × 40 mm | 1 | nosi sve i povezuje |
| Kalem (sekundar sa primarom) | 1 | srce uređaja — rezonantni transformator |
| Tranzistor **BD243** (NPN, kućište TO-220) | 1 | elektronski prekidač koji se pali i gasi milione puta u sekundi |
| Hladnjak 15 × 10 × 20 mm + zavrtanj | 1 | odvodi toplotu sa tranzistora |
| Otpornik 10 kΩ | 2 | jedan „otvara" tranzistor na startu, drugi štiti LED indikator |
| LED dioda 3 mm, plava | 2 | jedna pokazuje da ima napajanja, druga štiti bazu tranzistora |
| Keramički kondenzator „105" (1 µF) | 2 | lokalni rezervoar energije za brze strujne udare |
| Prekidač 8 × 8 mm (sa zadrškom) | 1 | uključi/isključi |
| Utičnica DC005 | 1 | za adapter 9–12 V |
| Mala sijalica | 1 | za eksperimente |
| Distanceri i zavrtnji M2 | 4 + 4 | nožice |

Oznaka „105" na kondenzatoru se čita kao **10 i pet nula** pikofarada: 10 · 10⁵ pF = 1 000 000 pF = 1 µF. Otpornik od 10 kΩ ima prstenove braon–crna–narandžasta.

<!-- FOTO: delovi raspoređeni na stolu pre lemljenja -->

## Šema i šta svaki deo zaista radi

<figure>
<svg viewBox="0 0 680 370" role="img" aria-label="Šema slayer exciter kola: napajanje, prekidač, dva kondenzatora, LED indikator, otpornik baze, tranzistor BD243, primar i sekundar">
  <g fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- rails -->
    <path d="M60 60 H100 M145 52 L104 60 M150 60 H440"/>
    <path d="M60 330 H440"/>
    <!-- battery -->
    <path d="M60 60 V172 M60 184 V330"/>
    <path d="M40 172 H80" stroke-width="3"/>
    <path d="M50 184 H70" stroke-width="5"/>
    <text x="84" y="170" font-size="12" fill="#333" stroke="none" font-family="sans-serif">+</text>
    <!-- C1 C2 -->
    <path d="M190 60 V183 M178 183 H202 M178 193 H202 M190 193 V330"/>
    <path d="M235 60 V183 M223 183 H247 M223 193 H247 M235 193 V330"/>
    <!-- R2 + LED1 -->
    <path d="M290 60 V90 L282 96 L298 108 L282 120 L298 132 L282 144 L290 150 V200"/>
    <path d="M276 200 H304 L290 222 Z M276 222 H304 M290 222 V330"/>
    <path d="M308 204 l12 -8 M314 214 l12 -8" stroke-width="1.5"/>
    <!-- R1 -->
    <path d="M360 60 V100 L352 106 L368 118 L352 130 L368 142 L352 154 L360 160 V240 H410"/>
    <!-- LED2 (cathode at base, anode at ground) -->
    <path d="M360 240 V268 M346 268 H374 M346 292 H374 L360 268 Z M360 292 V330"/>
    <path d="M330 272 l-12 -8 M330 284 l-12 -8" stroke-width="1.5"/>
    <!-- Q1 -->
    <path d="M410 215 V265" stroke-width="3"/>
    <path d="M410 228 L440 205 V170"/>
    <path d="M410 252 L440 275 V330"/>
    <path d="M440 275 l-11 -1 l5 -8 Z" fill="#333"/>
    <!-- L1 primary -->
    <path d="M440 60 V80 c14 0 14 18 0 18 c14 0 14 18 0 18 c14 0 14 18 0 18 c14 0 14 18 0 18 V170"/>
    <!-- L2 secondary -->
    <path stroke="#c0392b" d="M535 80 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 c14 0 14 10 0 10 V300"/>
    <path d="M535 300 V310 H446 a6 6 0 0 0 -12 0 H380 V240"/>
  </g>
  <!-- dots -->
  <g fill="#333">
    <circle cx="190" cy="60" r="3.5"/><circle cx="235" cy="60" r="3.5"/><circle cx="290" cy="60" r="3.5"/><circle cx="360" cy="60" r="3.5"/>
    <circle cx="190" cy="330" r="3.5"/><circle cx="235" cy="330" r="3.5"/><circle cx="290" cy="330" r="3.5"/><circle cx="360" cy="330" r="3.5"/>
    <circle cx="360" cy="240" r="3.5"/><circle cx="380" cy="240" r="3.5"/>
  </g>
  <!-- coupling -->
  <path d="M500 85 V170 M510 85 V170" stroke="#2a78d6" stroke-width="2" stroke-dasharray="5 4"/>
  <!-- top terminal -->
  <circle cx="535" cy="72" r="7" fill="#fff" stroke="#c0392b" stroke-width="2.5"/>
  <path d="M543 64 l10 -10 l-4 9 l10 -6" fill="none" stroke="#8e44ad" stroke-width="2"/>
  <!-- labels -->
  <g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="13" fill="#333">
    <text x="86" y="190">9–12 V</text>
    <text x="104" y="44">prekidač</text>
    <text x="172" y="192" text-anchor="end">C1</text><text x="172" y="206" text-anchor="end" font-size="11.5" fill="#666">1 µF</text>
    <text x="253" y="192">C2</text><text x="253" y="206" font-size="11.5" fill="#666">1 µF</text>
    <text x="304" y="125">R2</text><text x="304" y="139" font-size="11.5" fill="#666">10k</text>
    <text x="298" y="245" font-size="12">LED1</text>
    <text x="370" y="125">R1</text><text x="370" y="139" font-size="11.5" fill="#666">10k</text>
    <text x="286" y="310" font-size="12">LED2</text>
    <text x="386" y="232" font-size="12">B</text>
    <text x="448" y="210" font-size="12">C</text><text x="448" y="276" font-size="12">E</text>
    <text x="456" y="300" font-weight="600">Q1 BD243</text>
    <text x="456" y="100">L1</text>
    <text x="456" y="114" font-size="11.5" fill="#666">primar</text>
    <text x="566" y="190" fill="#c0392b" font-weight="600">L2 sekundar</text>
    <text x="566" y="206" font-size="11.5" fill="#666">stotine navoja</text>
    <text x="566" y="220" font-size="11.5" fill="#666">tanke žice</text>
    <text x="566" y="60" fill="#8e44ad">vrh: hiljade volti</text>
    <text x="566" y="296" font-size="11.5" fill="#666">dno: nekoliko volti</text>
    <text x="505" y="186" text-anchor="middle" font-size="11.5" fill="#2a78d6">sprega</text>
    <text x="50" y="352" font-size="12" fill="#666">masa (−)</text>
  </g>
</svg>
<figcaption>Tipična šema „slayer exciter" kola, po kojoj su napravljeni ovakvi BD243 kitovi. Raspored na samoj pločici izgleda drugačije, a pojedine serije kita mogu se razlikovati u sitnicama. Primar (L1) je namotan oko donjeg dela sekundara (L2); na šemi su nacrtani jedan pored drugog, a plave isprekidane linije označavaju magnetnu spregu. Prava vrednost broja navoja zavisi od serije kita.</figcaption>
</figure>

### Kalem: primar i sekundar

**Sekundar** je dugačak namotaj od nekoliko stotina navoja vrlo tanke lakirane bakarne žice na plastičnom telu. Lak je izolacija — zato navoji mogu da se dodiruju. Donji kraj sekundara je vezan za kolo, a gornji kraj je **slobodan** i završava se šiljkom. Tu nastaje visok napon.

**Primar** je svega nekoliko navoja deblje žice oko dna sekundara. Kroz njega teče jaka struja iz tranzistora i pravi magnetno polje koje „gura" sekundar.

### Tranzistor BD243: prekidač bez ruku

Tranzistor je prekidač koji se ne uključuje prstom nego malom strujom na nožici koja se zove **baza (B)**. Kad u bazu uđe malo struje, između **kolektora (C)** i **emitera (E)** može da prođe velika struja — u našem kolu ona teče kroz primar. Kad baza ostane bez struje, prekidač se zatvara.

BD243 je snažan, ali relativno spor tranzistor (projektovan je za mnogo niže frekvencije nego što ovde radi). Zato se ne pali i gasi čisto, nego deo vremena provodi „na pola puta", a tada se energija pretvara u toplotu. Otuda **hladnjak**: bez njega bi tranzistor za par minuta pregoreo.

### R1 (10 kΩ): paljenje motora

Kad uključite prekidač, ništa ne osciluje — kolo treba neko da pokrene. Otpornik R1 pusti malu struju iz plusa u bazu, tranzistor počinje da provodi, i kroz primar krene struja. Od tog trenutka kolo samo sebe vodi.

### Povratna sprega: kalem sam sebi kaže kad da gura

Ovo je najpametniji deo kola. Pogledajte šemu: **donji kraj sekundara je vezan za bazu tranzistora.**

1. Tranzistor provede → kroz primar raste struja → menja se magnetno polje.
2. Promenljivo polje indukuje napon u sekundaru, a sekundar počne da osciluje na svojoj prirodnoj frekvenciji.
3. Napon na dnu sekundara klati se gore-dole u ritmu te oscilacije — i taj napon je vezan za bazu. Kad ode u minus, tranzistor se gasi. Kad ode u plus, tranzistor se pali.
4. Tranzistor se dakle pali i gasi **tačno u ritmu u kom sekundar „voli" da osciluje** — nekoliko miliona puta u sekundi.

Kao kad gurate dete na ljuljašci: ne gurate kad vam padne na pamet, nego kad se ljuljaška vrati do vas. Ovde ljuljaška sama javlja kad je vreme za guranje.

### LED2: zaštita baze (i indikator da osciluje)

Napon na dnu sekundara ide i u minus. Spoj baza–emiter tranzistora podnosi svega oko 5 V u obrnutom smeru, posle toga se oštećuje. LED2 je vezana **obrnuto** između baze i mase: dok je baza u plusu, LED ne provodi i ne smeta; čim baza ode u minus, LED provede i ne dozvoli da napon ode dublje. Bilo koja dioda bi radila taj posao, ali LED ima bonus — **zasvetli kad kolo osciluje**. Ako LED2 svetli, transformator radi.

### LED1 + R2: indikator napajanja

Obična signalna lampica: „ima struje". Otpornik R2 ograničava struju kroz LED na oko 1 mA (12 V / 10 kΩ), inače bi je adapter odmah spalio.

### C1 i C2 (2 × 1 µF): lokalni rezervoar

Tranzistor vuče struju u udarima, milione puta u sekundi. Žica do adaptera je dugačka i ima svoju induktivnost — ne može dovoljno brzo da isporuči te udare. Kondenzatori stoje odmah pored kola i daju struju u trenutku kad zatreba, a dopunjavaju se iz adaptera u pauzama. Usput sprečavaju da visokofrekventne smetnje odu nazad u adapter.

### Prekidač, utičnica i sijalica

Prekidač i utičnica su tu da se ne bi mrdao kabl. Sijalica iz kita je mala gasna sijalica — nema vlakno kao stara obična sijalica, unutra je gas pod niskim pritiskom. To je važno za sve eksperimente u nastavku.

<div class="box" markdown="1">
**Iz radionice — sitnice koje vredi znati pre lemljenja**

- LED ima polaritet: duža nožica je anoda (+). Na pločici je ravna strana kruga katoda.
- Tranzistor prvo pričvrstite zavrtnjem za hladnjak, pa tek onda lemite — tako nožice ne trpe silu.
- Krajeve lakirane žice kalema treba ostrugati ili opaliti lemilicom dok se lak ne skine; lak ne provodi i tinol se neće uhvatiti.
- Na 9 V baterije kolo radi, ali slabo. Za lepe varnice treba adapter od 12 V koji može da da bar 1 A.
</div>

## Kako 12 volti postane nekoliko hiljada

Ovo je pitanje koje je Pavle postavio prvo, pa ga rešavamo u tri koraka.

### Korak 1: odnos navoja

Kad bi ovo bio običan transformator, napon na sekundaru bio bi:

<p class="formula">U<sub>2</sub> = U<sub>1</sub> · N<sub>2</sub> / N<sub>1</sub></p>

Za računicu pretpostavimo 3 navoja primara i 400 navoja sekundara (tačan broj zavisi od kita — vredi ga izbrojati ili proceniti iz debljine žice i dužine namotaja). Na kolektoru tranzistora napon u ovakvom kolu skače otprilike do dvostrukog napona napajanja, dakle oko 24 V:

<p class="formula">24 V · 400 / 3 ≈ 3200 V</p>

Ali ovo nije pošteno, jer kalemovi nemaju gvozdeno jezgro. Samo mali deo magnetnog polja primara prolazi kroz sekundar. Taj deo se zove **koeficijent sprege k** i kod ovakvih kalemova je otprilike 0,1–0,2. Indukovani napon je onda:

<p class="formula">U<sub>ind</sub> ≈ k · U<sub>1</sub> · N<sub>2</sub> / N<sub>1</sub> ≈ 0,15 · 3200 V ≈ 480 V</p>

Dakle, sam transformator bez rezonancije dao bi par stotina volti. Lepo, ali to nije sve.

### Korak 2: rezonancija

Sekundar ima **induktivnost L** (zbog navoja) i **kapacitivnost C** (između navoja, i između vrha kalema i svega oko njega — stola, ruke, zida). Zajedno čine **LC kolo**, koje ima prirodnu frekvenciju:

<p class="formula">f = 1 / (2π · √(L · C))</p>

Induktivnost dugačkog kalema računa se Vilerovom formulom. Za kalem prečnika oko 1,5 cm, dužine oko 4,5 cm, sa 400 navoja, dobija se L ≈ 0,7 mH. Kapacitivnost je sitna: nekoliko pikofarada, recimo C ≈ 3 pF. Kad se ubaci:

<p class="formula">f ≈ 1 / (2π · √(0,0007 · 0,000 000 000 003)) ≈ 3,5 MHz</p>

Oko **tri i po miliona oscilacija u sekundi**, plus-minus, zavisno od pravog broja navoja. (Lepa slučajnost: 400 navoja po 4,7 cm obima daje oko 19 m žice, a četvrtina talasne dužine na 3,5 MHz je oko 21 m. Sekundar se zaista ponaša približno kao „četvrttalasna antena" — na dnu napon je mali, na vrhu najveći.)

Kad pobuđujemo LC kolo tačno na njegovoj rezonantnoj frekvenciji, svaki ciklus dodaje malo energije, a od prethodnog ciklusa se izgubi samo mali deo. Napon raste dok se gubici (zagrevanje žice, zračenje, korona u vazduhu) ne izjednače sa onim što ubacujemo. Koliko puta je napon veći od pobude kaže **faktor dobrote Q**:

<p class="formula">U<sub>vrh</sub> ≈ Q · U<sub>ind</sub></p>

<figure>
<svg viewBox="0 0 700 215" role="img" aria-label="Grafik oscilacije čija amplituda raste ciklus po ciklus dok se ne ustali">
  <path d="M50 100 H660" stroke="#ccc" stroke-width="1"/>
  <path d="M50 100,70 91 90 83 110 76 130 70 150 65 170 60 190 56 210 53 230 50 250 47 270 45 290 43 310 41 330 39 350 38 370 37 390 35 410 35 430 34 450 33 470 32 490 32 510 31 530 31 550 31 570 30 590 30 610 30 630 30 650 29" fill="none" stroke="#eb6834" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M50 100,70 109 90 117 110 124 130 130 150 135 170 140 190 144 210 147 230 150 250 153 270 155 290 157 310 159 330 161 350 162 370 163 390 165 410 165 430 166 450 167 470 168 490 168 510 169 530 169 550 169 570 170 590 170 610 170 630 170 650 171" fill="none" stroke="#eb6834" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M50,100 53,99 56,98 59,96 62,94 65,93 68,94 71,95 74,99 77,103 80,108 83,112 86,115 89,116 92,115 95,111 98,105 101,97 104,90 107,82 110,77 113,75 116,77 119,82 122,90 125,100 128,111 131,121 134,128 137,132 140,131 143,126 146,116 149,104 152,91 155,79 158,69 161,63 164,62 167,67 170,77 173,90 176,105 179,120 182,132 185,141 188,143 191,140 194,130 197,117 200,100 203,83 206,68 209,57 212,53 215,54 218,63 221,76 224,94 227,112 230,130 233,143 236,150 239,151 242,144 245,131 248,113 251,93 254,74 257,58 260,48 263,46 266,50 269,62 272,80 275,100 278,121 281,139 284,151 287,157 290,155 293,144 296,128 299,107 302,85 305,65 308,50 311,42 314,41 317,49 320,65 323,85 326,108 329,129 332,147 335,158 338,161 341,156 344,142 347,123 350,100 353,77 356,57 359,43 362,37 365,40 368,51 371,69 374,92 377,116 380,138 383,154 386,163 389,163 392,155 395,138 398,116 401,92 404,69 407,50 410,38 413,35 416,41 419,55 422,76 425,100 428,124 431,145 434,160 437,166 440,163 443,151 446,132 449,108 452,83 455,61 458,43 461,34 464,34 467,43 470,60 473,83 476,108 479,133 482,152 485,165 488,168 491,162 494,147 497,125 500,100 503,75 506,53 509,38 512,31 515,35 518,47 521,67 524,91 527,117 530,141 533,158 536,168 539,168 542,159 545,141 548,117 551,91 554,67 557,46 560,34 563,30 566,37 569,52 572,74 575,100 578,126 581,148 584,163 587,170 590,167 593,154 596,134 599,109 602,83 605,59 608,41 611,31 614,31 617,41 620,59 623,82 626,109 629,134 632,154 635,167 638,170 641,164 644,148 647,126 650,100" fill="none" stroke="#2a78d6" stroke-width="2.2" stroke-linejoin="round"/>
  <g fill="#1baf7a">
    <path d="M62 196 l-5 9 h10 Z"/><path d="M112 196 l-5 9 h10 Z"/><path d="M162 196 l-5 9 h10 Z"/><path d="M212 196 l-5 9 h10 Z"/><path d="M262 196 l-5 9 h10 Z"/><path d="M312 196 l-5 9 h10 Z"/><path d="M362 196 l-5 9 h10 Z"/><path d="M412 196 l-5 9 h10 Z"/><path d="M462 196 l-5 9 h10 Z"/><path d="M512 196 l-5 9 h10 Z"/><path d="M562 196 l-5 9 h10 Z"/><path d="M612 196 l-5 9 h10 Z"/>
  </g>
  <g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="12.5">
    <text x="660" y="24" text-anchor="end" fill="#eb6834">gubici = pobuda → napon se ustali</text>
    <text x="50" y="189" fill="#1baf7a">jedan „guraj" tranzistora po ciklusu</text>
    <text x="664" y="104" fill="#888">t</text>
  </g>
</svg>
<figcaption>Rezonancija kao ljuljaška: svaki ciklus tranzistor doda malo energije (zelene strelice), pa napon na vrhu sekundara (plavo) raste dok ga gubici ne zaustave (narandžasta obvojnica). Kod pravog kola ovo traje nekoliko desetina ciklusa — dakle par mikrosekundi.</figcaption>
</figure>

### Korak 3: koliko je to zaista

Kod malih kalemova Q nije veliki — korona na šiljku, tanka žica i spor tranzistor troše dosta. Ako uzmemo skromnih Q ≈ 10–20:

<p class="formula">U<sub>vrh</sub> ≈ 10…20 · 480 V ≈ 5 000 – 10 000 V</p>

Ovo je gruba procena sa mnogo pretpostavki, pa je proveravamo na drugi način — **dužinom varnice**. Vazduh se probija na oko 3 kV po milimetru između ravnih elektroda, ali na šiljku je polje koncentrisano pa varnica krene i na manjem naponu. Naše varnice od olovke su bile reda veličine par milimetara, što se lepo slaže sa **nekoliko hiljada volti**. Dakle: realno 2–10 kV na vrhu, iz 12 V na ulazu.

<div class="box" markdown="1">
**Ali odakle energija?** Napon je veliki, ali snaga nije. Adapter daje 12 V pri možda pola ampera — oko 6 vati, kao slabija sijalica u frižideru. Veliki napon ide uz vrlo malu struju: transformator ne pravi energiju ni iz čega, on samo menja „mnogo struje i malo napona" u „malo struje i mnogo napona". Veći deo tih 6 W se, uzgred, pretvara u toplotu na tranzistoru — zato je hladnjak topao.
</div>

## Zašto nastaju munjice kad prislonimo grafit ili prst

Vazduh je inače izolator: molekuli azota i kiseonika su neutralni i ne provode struju. Ali u vazduhu uvek postoji pokoji slobodan elektron (od kosmičkog zračenja i prirodne radioaktivnosti).

Kad se olovka (grafit provodi struju) ili prst približe vrhu kalema, između njih nastaje vrlo jako električno polje — hiljade volti na par milimetara. Slobodan elektron se u tom polju ubrza toliko da, kad udari u molekul vazduha, izbije iz njega još jedan elektron. Sada su dva, pa četiri, pa osam — **lavina**. Za delić mikrosekunde vazduh u tom tankom kanalu postaje **plazma**: mešavina jona i elektrona koja provodi struju.

- **Boja**: ljubičasto-plava svetlost je svetlost pobuđenog azota. Atomi primaju energiju u sudarima, pa je vraćaju kao svetlost tačno određenih boja. Iste boje ima i prava munja.
- **Miris**: oštar, „posle oluje" — to je **ozon** (O₃). Plazma cepa molekule kiseonika, a oni se slažu u ozon.
- **Zvuk**: tiho zujanje i pucketanje — vazduh se naglo greje i širi.
- **Toplota**: vrh grafita posle par sekundi postane vruć, a ponekad i zažari. Plazma je vrela, i zbog toga proizvođač upozorava da varnica može nešto i da zapali. Papir i vate dalje od vrha.

Zašto **šiljak**? Polje se gomila na oštrim krajevima. Zato i gromobran ima šiljak, i zato na samom vrhu kalema čak i bez olovke u mraku vidite malu ljubičastu „krunu" — **koronu**.

Zašto je potreban predmet u ruci? Varnica mora negde da ode. Na frekvenciji od par MHz vaše telo je, za tako malo kolo, ogroman „rezervoar" naelektrisanja (kapacitivnost tela prema okolini je oko 100 pF, desetine puta više od vrha kalema). Telo zato radi kao uzemljenje, a olovka samo daje šiljak sa koga varnica lakše krene.

## Šta se dešava kad prislonim prst

Ovo je bio najzanimljiviji (i najtiši) trenutak vikenda. Prst na vrhu kalema: **nema „struje" kakvu znate iz utičnice**. Nema trzanja mišića, nema bola u celoj ruci. Oseti se tek malo peckanje ili toplota na samom mestu dodira, a kad se prst drži malo odmaknut, varnica može da ostavi sićušnu crvenu tačkicu kao od opekotine. Zašto?

1. **Nervi ne stižu da reaguju.** Nervna ćelija se „pali" kad joj se membrana napuni do određenog napona, a za to treba vremena — reda veličine desetine mikrosekunde do milisekunde. Struja koja promeni smer 3,5 miliona puta u sekundi gura membranu na jednu pa na drugu stranu pre nego što stigne da se napuni. Nervi i mišići je praktično ne primećuju. Struja iz zida (50 Hz) menja smer samo 100 puta u sekundi i zato itekako aktivira nerve i srce — **zato je struja iz zida opasna, a ova nije**.
2. **Malo je energije.** Kao što smo izračunali, ceo uređaj troši par vati. Kad dodirnete vrh, „opteretite" sekundar, rezonancija se priguši i napon padne (videćete da sijalica u blizini oslabi, a varnica nestane).
3. **Peckanje je toplota.** Kad je između prsta i šiljka mali vazdušni procep, sva energija se troši u tankom kanalu plazme na koži. To je mala RF opekotina — ništa strašno na ovom kitu, ali je to razlog da se vrh **ne drži prstom**, nego olovkom ili komadom metala.

Tesla je upravo ovo pokazivao publici 1890-ih: propuštao je kroz sebe visokofrekventne struje koje bi na 50 Hz bile smrtonosne. (Postoji česta priča da struja „ide samo po koži" zbog skin efekta — na ovim frekvencijama to za ljudsko telo nije pravi razlog. Pravi razlog je to što nervi ne reaguju na ovako brze promene.)

<div class="warn" markdown="1">
**Bezbednost** — ono što smo se dogovorili pre nego što smo uključili:

- Ovo važi za **ovaj mali kit**. Veliki Teslini transformatori (stotine vati i više) prave opekotine koje idu duboko u tkivo i mogu biti opasni. Nikad ne prenosite iskustvo „ma ne oseti se ništa" na veće uređaje.
- Osobe sa **pejsmejkerom** ili drugim elektronskim implantom ne bi trebalo da budu blizu.
- Telefone, satove i kartice držati dalje — jako visokofrekventno polje može da smeta elektronici.
- **Hladnjak i tranzistor se greju.** Ne držati uključeno duže od minut–dva bez pauze, posebno dok se dodiruje vrh (tada je tranzistor najviše opterećen).
- Varnica može da zapali papir. Igra se na čistom stolu, ne na tepihu.
- Ozon u maloj zatvorenoj sobi nije zdrav posle dužeg rada — provetriti.
</div>

## Zašto sijalica svetli bez dodira

Uzmite fluorescentnu ili neonsku sijalicu u ruku i približite je vrhu kalema na nekoliko centimetara: zasvetli. Nema žica, nema kontakta. Šta se dešava?

Oko vrha sekundara je jako **promenljivo električno polje**: vrh je u jednom trenutku na +5 000 V, a 0,14 mikrosekundi kasnije na −5 000 V. To polje se prostire kroz vazduh i slabi sa rastojanjem.

Sijalica je staklena cev sa gasom pod niskim pritiskom (neon, argon, kod fluorescentnih i malo žive). Kad je unesete u polje, **kraj bliži kalemu i kraj dalji od kalema imaju različit napon**. Slobodni elektroni u gasu se ubrzavaju, sudaraju sa atomima gasa i:

- **jonizuju ih** — izbiju nove elektrone, pa gas postane provodnik (isto kao lavina u vazduhu, samo mnogo lakše jer je pritisak nizak);
- **pobuđuju ih** — atom primi energiju pa je vrati kao svetlost. Neon svetli narandžasto-crveno. Živa svetli nevidljivom ultraljubičastom svetlošću, a bela obloga sa unutrašnje strane fluorescentne cevi (fosfor) pretvara UV u belu svetlost.

Ništa ne mora da „uđe" u sijalicu kroz kontakte — elektroni koji svetle već su unutra, polje ih samo pokreće. Zato **obična sijalica sa užarenim vlaknom ne bi zasvetlela**: njoj treba struja kroz zatvoreno kolo, a ne polje.

Primetili smo i ovo: sijalica svetli jače kad je držite za kraj koji je dalje od kalema. Vaša ruka je „uzemljenje" — dalji kraj se drži blizu nule, pa je razlika napona duž sijalice veća.

<figure>
<svg viewBox="0 0 720 250" role="img" aria-label="Tri situacije: sijalica u polju svetli, sa staklom između i dalje svetli, sa aluminijumskom folijom između ne svetli">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#b48cff" stop-opacity=".75"/>
      <stop offset="1" stop-color="#b48cff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="13" fill="#333">
    <!-- panel template x offsets 0, 240, 480 -->
    <g id="p1">
      <rect x="30" y="80" width="26" height="120" rx="3" fill="#f3e2d3" stroke="#b5651d" stroke-width="1.5"/>
      <path d="M30 92 H56 M30 104 H56 M30 116 H56 M30 128 H56 M30 140 H56 M30 152 H56 M30 164 H56 M30 176 H56 M30 188 H56" stroke="#b5651d" stroke-width="1"/>
      <path d="M43 80 V62" stroke="#c0392b" stroke-width="2.5"/>
      <circle cx="43" cy="58" r="5" fill="#c0392b"/>
      <path d="M48 58 C 100 40, 150 60, 175 95 M48 62 C 100 70, 140 95, 168 120 M48 54 C 100 15, 170 30, 195 75" fill="none" stroke="#2a78d6" stroke-width="1.5" stroke-dasharray="5 4"/>
      <ellipse cx="185" cy="115" rx="42" ry="58" fill="url(#glow)"/>
      <rect x="175" y="80" width="20" height="72" rx="10" fill="#efe6ff" stroke="#7d56c9" stroke-width="2"/>
      <text x="20" y="228" font-weight="600">1. Samo vazduh</text>
      <text x="20" y="244" fill="#1baf7a">svetli</text>
    </g>
    <g transform="translate(240 0)">
      <rect x="30" y="80" width="26" height="120" rx="3" fill="#f3e2d3" stroke="#b5651d" stroke-width="1.5"/>
      <path d="M30 92 H56 M30 104 H56 M30 116 H56 M30 128 H56 M30 140 H56 M30 152 H56 M30 164 H56 M30 176 H56 M30 188 H56" stroke="#b5651d" stroke-width="1"/>
      <path d="M43 80 V62" stroke="#c0392b" stroke-width="2.5"/>
      <circle cx="43" cy="58" r="5" fill="#c0392b"/>
      <path d="M10 205 V40 Q10 22 28 22 H96 Q114 22 114 40 V205" fill="#2a78d6" fill-opacity=".08" stroke="#2a78d6" stroke-opacity=".55" stroke-width="3"/>
      <path d="M48 58 C 100 40, 150 60, 175 95 M48 62 C 100 70, 140 95, 168 120 M48 54 C 100 15, 170 30, 195 75" fill="none" stroke="#2a78d6" stroke-width="1.5" stroke-dasharray="5 4"/>
      <ellipse cx="185" cy="115" rx="38" ry="52" fill="url(#glow)" opacity=".85"/>
      <rect x="175" y="80" width="20" height="72" rx="10" fill="#efe6ff" stroke="#7d56c9" stroke-width="2"/>
      <text x="20" y="228" font-weight="600">2. Staklena čaša preko</text>
      <text x="20" y="244" fill="#1baf7a">i dalje svetli</text>
    </g>
    <g transform="translate(480 0)">
      <rect x="30" y="80" width="26" height="120" rx="3" fill="#f3e2d3" stroke="#b5651d" stroke-width="1.5"/>
      <path d="M30 92 H56 M30 104 H56 M30 116 H56 M30 128 H56 M30 140 H56 M30 152 H56 M30 164 H56 M30 176 H56 M30 188 H56" stroke="#b5651d" stroke-width="1"/>
      <path d="M43 80 V62" stroke="#c0392b" stroke-width="2.5"/>
      <circle cx="43" cy="58" r="5" fill="#c0392b"/>
      <path d="M48 58 C 80 48, 105 52, 120 60 M48 62 C 80 70, 105 78, 120 84 M48 54 C 80 30, 105 32, 120 38" fill="none" stroke="#2a78d6" stroke-width="1.5" stroke-dasharray="5 4"/>
      <rect x="120" y="22" width="6" height="170" fill="#c9ccd1" stroke="#8a8f96" stroke-width="1"/>
      <path d="M123 192 V206 M113 206 H133 M117 211 H129 M121 216 H125" stroke="#555" stroke-width="1.5"/>
      <rect x="175" y="80" width="20" height="72" rx="10" fill="#f2f2f2" stroke="#999" stroke-width="2"/>
      <text x="20" y="228" font-weight="600">3. Folija između</text>
      <text x="20" y="244" fill="#c0392b">ne svetli</text>
    </g>
  </g>
</svg>
<figcaption>Isprekidane plave linije su električno polje sa vrha sekundara. Staklo ga propušta. Aluminijumska folija ga zaustavlja, posebno kad je drži ruka (simbol uzemljenja).</figcaption>
</figure>

## Zašto sijalica svetli i kad je preko svega staklena čaša

Ovo je izgledalo kao trik: preklopili smo ceo kit staklenom čašom, a sijalica spolja i dalje svetli.

Staklo je **izolator**: u njemu nema slobodnih elektrona koji bi mogli da putuju kroz materijal. A da bi se električno polje zaustavilo, treba da se nešto **pomeri i suprotstavi mu se**. U staklu elektroni ostaju vezani za svoje atome. U polju se samo malo izvlače na jednu stranu (to se zove *polarizacija*), što polje malo oslabi, ali ga ne zaustavi. Polje prolazi kroz staklo skoro kao kroz vazduh.

Uostalom, i sama sijalica je od stakla — da staklo zaustavlja polje, ni bez čaše ne bi svetlela.

Isto važi za plastiku, papir, suvo drvo, karton. Probajte.

## Zašto ne svetli kad je između aluminijumska folija

Aluminijum je **provodnik**: pun je slobodnih elektrona koji mogu da se kreću kroz ceo komad metala. Kad polje sa vrha kalema stigne do folije, elektroni u njoj se za tren preraspodele — na stranu bližu kalemu dođu baš toliko da polje „poništi", a iza folije polja više skoro nema. Folija se ponaša kao **štit**. Kako se polje menja milione puta u sekundi, elektroni u foliji milione puta u sekundi jure napred-nazad, ali to im nije problem: prate polje mnogo brže od toga.

Ovo je **Faradejev kavez** — isti Faradej sa početka priče. Zato vam telefon u liftu gubi signal, zato mikrotalasna rerna ima metalnu mrežicu na staklu vrata, i zato su avioni bezbedni kad u njih udari grom.

Jedna sitnica koju vredi proveriti: folija najbolje štiti kad je **uzemljena** — na primer kad je držite rukom ili je povežete sa minusom kola. Malo parče folije koje „lebdi" samo u vazduhu može delimično da propusti polje, jer i samo „pokupi" napon sa jedne strane i prenese ga na drugu. Dobar eksperiment za sledeći vikend: ista folija, jednom držana rukom, jednom okačena na koncu.

## Još eksperimenata za sledeći vikend

Sve ovo je urađeno sa istim kitom i stvarima iz kuće:

1. **Mapa polja.** Lenjir na stolu, sijalica u ruci: na kom rastojanju se pali? Zatim isto na 9 V i na 12 V. Nacrtajte grafik rastojanja i napona.
2. **Dugačka fluorescentna cev.** Stara neonka (tzv. „fluo cev" od 60 cm) ili pregorela štedljiva sijalica zasvetle samo delimično — onaj deo koji je bliže kalemu svetli jače. Vidi se kako polje slabi sa rastojanjem.
3. **Šta propušta, a šta ne?** Između kalema i sijalice redom: papir, plastična kesa, daska, šaka, čaša vode, metalni poklopac, kuhinjska cediljka. Cediljka ima rupe a ipak štiti — rupe su milimetarske, a talasna dužina ovog polja je oko 85 metara.
4. **Folija: uzemljena ili ne?** Pomenuti eksperiment sa folijom na koncu i folijom u ruci.
5. **Bežično punjenje kao u telefonu.** Namotajte 5–10 navoja izolovane žice u krug prečnika par centimetara, krajeve zalemite na LED diodu (najbolje dve LED okrenute suprotno, paralelno). Približite taj krug **dnu** kalema, gde je primar: LED zasvetli. Ovo nije električno nego **magnetno** polje — isti princip kao bežični punjač za telefon. Uporedite: krug pored vrha kalema skoro ništa, krug pored dna svetli.
6. **AM radio.** Uključite stari radio na srednjim ili kratkim talasima i približite ga. Čućete zujanje — kalem je mali radio-predajnik. Ko ima RTL-SDR prijemnik, može da nađe **tačnu frekvenciju** rezonancije i uporedi je sa računicom iz ovog teksta.
7. **Promenite vrh.** Na vrh sekundara zakačite malu metalnu kuglicu ili zgužvanu kuglicu od folije umesto šiljka. Korona nestaje (oblo telo ne koncentriše polje), a frekvencija pada jer je kapacitivnost vrha veća. Šta se desi sa sijalicom?
8. **Fotografija plazme.** U mraku, telefon na stativu, duga ekspozicija (1–2 s) — munjica od olovke izgleda mnogo veće nego golim okom.
9. **Obična sijalica sa vlaknom.** Stara sijalica ili sijalica iz lampe: približite je kalemu i ne desi se ništa. Dobar razgovor o tome zašto ovde nije potrebna struja nego polje.
10. **Izbrojte navoje.** Lupa, lenjir: izmerite dužinu namotaja i debljinu žice, izračunajte broj navoja, pa iz njega induktivnost i frekvenciju. To je ceo inženjerski krug — od kesice delova do formule i nazad.

## Šta nam je ostalo

Najbolji deo ovog projekta nije bila munja, nego trenutak kad je jasno zašto čaša ne radi ništa, a folija radi sve. Iz 540 dinara delova izlazi dobar deo fizike iz osmog razreda i prve godine elektrotehnike: indukcija, rezonancija, provodnici i izolatori, plazma, i jedna priča o čoveku iz Smiljana koji je sve ovo smislio pre 135 godina.

<!-- FOTO: Pavle drži sijalicu koja svetli -->

---

**Izvori i dalje čitanje**

- [Kit komplet Teslin transformator 9–12 VDC — Mikroprinc](https://www.mikroprinc.com/sr/proizvod/kit-komplet-teslin-transformator-9-12vdc)
- [Spisak komponenti identičnog BD243 kita (Surplustronics)](https://surplustronics.co.nz/products/11066-mini-tesla-coil-kit)
- [Tesla coil — Wikipedia](https://en.wikipedia.org/wiki/Tesla_coil)
- [Transformer — istorija, Wikipedia](https://en.wikipedia.org/wiki/Transformer#History)
- [Muzej Nikole Tesle, Beograd](https://tesla-museum.org/)
