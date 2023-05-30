---
layout: post
title:  "Samo nam je pažnja potrebna"
date:   2023-05-30 13:10:48 +0100
categories: AI
---

Strmoglav rast popularnosti velikih jezičkih modela (LLM) zagolicao je maštu celog sveta. U poziciji polovičnog razumevanja nalaze se i računarski eksperti, koji su tradicionalno bili u stanju da objasne kako rade kompajleri, operativni sistemi, računarske mreže, 3D grafika itd., ali i potpuni laici koje do sada nije interesovalo šta se dešava ispod površine.

Deluje mi da većina ljudi napravi ogroman korak kojim preskoči sve početne stvari u oblasti mašinskog učenja i završi razmišljajući o tome šta će ChatGPT12 doneti.

U ovom postu, pokušaćemo da se vratimo jednostavnijem svetu - treniraćemo model koji je sličan GPT2, bez ikakvih dodatnih koraka (human feedback and co) i sve ćemo raditi lokalno (veruj samo mašini na kojoj možeš da držiš noge dok je programiraš). Za trening modela ćemo koristiti knjige domaćih autora (Andrić, Crnjanski, Selimović).

Naravno, nije razumno očekivati da priđemo ni blizu GPT kvalitetu generisanog teksta. Ali, hajde da vidimo koliko daleko možemo da dođemo iz ovako skromnog starta.

Sledi niz generisanog teksta tokom trening. U odabranim momentima tokom treninga, pitamo model da nastavi generisanje teksta koji počinje sa "Ово је мост ". Tehničke detalje ostavljam za kraj teksta.

| Generisani tekst | iteracija     |  vreme |
|------------------|:-------------:|------:|
| Ово је мост а е а и аа рра азо ооу у о... |  10 | 20s |
| Ово је мост !имре по у пра  чемо шузамре спо сусе, свем, вилоје у да зникици статопу гум, —аљ иламатшат... | 1000 | 10min
| Ово је мост х ађезиђса,, ко и ресабо однилаћејеј виј и којмасломазад гаприндан рези ко котрерали... | 5000 | 56min |
| Ово је мост устано је почео шта су свога не већа трајне ниједног угио? Ча сам се, такасна срама ср... | 10000 | ~2h
| Ово је мост на раду лавира оставио, јер буде у позоришту са тврдим сарајевом предвиђен. После вилке капије, нигде како Исаковичи чују у којој бога, док је требало сад слабије, наслеђивати, да га одваја. Уживао га је променљив. Ручало се да је рекла да врати у миргиналу нуде и његову личну огромну повратку у крани, непродорно компромис. Кнез је био одбачен на камулијама и поред терминала 2 из травице који треба од свега саме да сам се и незважно »страховити који смо кле | 20000 | ~4h


Prvo par detalja. Model je baziran na [transformer](https://arxiv.org/abs/1706.03762) arhitekturi. Toplo preporučujem [Zero to Hero](https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) seriju predavanja, po kojoj je i napisan kod koji je odgovoran za lepotu koju vidite gore. Model je mali,oko 70 miliona parametara, treniran na više nego skromnim podacima (oko 16 miliona karaktera, odnosno malo više od 3MB). Koristimo predviđanje na nivou pojedinačnih karaktera (slova), što je opet inferiorna tehnika u poređenju sa predviđanjem tokena što je osnova pravih LLM-ova (recimo da je slog pandan token konceptu). Ovo znači da model na osnovu prethodne istorije bira sledeće slovo i tako u krug dok se ne generiše čitav tekst. Tokom svakog generisanja karaktera, gledamo istoriju od prethonih 64 karaktera. Naravno, svi ovi brojevi su nekoliko hiljada puta manji od brojeva koje ozbiljni modeli koriste.

Dakle, iako generisani tekst nije ni blizu magije koju GPT2+ modeli nude, ipak možemo da vidimo značajan napredak kroz iteracije. Na samom početku, generisani tekst je nasumičan, mada već vidimo kako model bira najučestalija slova, drži se kratkih reči i forsira znak za razmak. Posle 1000 iteracija i dalje ne pogađa reči, ali, strukturno, ovo već liči na rečenicu. Koristi sva slova, dužina reči deluje smisleno.

Posle 10000 iteracija i dalje nema smislenih reči, mada polako pogađa veznike. Ali već na 10000 iteracija hvata prave reči. Takođe, pogađa veliko slovo posle znaka pitanja.

Posle 20000 iteracija i 4h držanja grafičke kartice na 85C, počinjemo da generišemo nešto što liči na pravi tekst. Neke reči se smisleno kombinuju, padeži, i oblici glagola deluju ok ako malo zažmurimo. Smisao i dalje izostaje. Ono što je fascinantno je da je OpenAI ekipa dokazala da bi vremenom, veći model uhvatio i semantičku stranu teksta, slično kao što je u ovom skromnom primeru naučio reči i gramatiku.

Nedavno sam naleteo na sledeću analogiju - zamislite da modelu date kriminalističku knjigu i kažete mu da nastavi tekst koji počinje sa "ubica je...". Jednostavan model, malo napredniji od našeg, uspeće da shvati da verovatno sledi nečije ime, ili nominativ neke imenice. Napredni model će uhvatiti značajno kompleksnije paterne u prethodnom tekstu i ponuditi odgovor, koji je opet baziran na istom principu statistike kao i kod jednostavnijih modela.

Iako ovaj primer nije uspeo da stigne do semantičkog nivoa (recimo da je hijerarhija razumevanja individualne reči, gramatika, veliki skok, semantika), meni je pomogao da steknem osećaj o bebećim koracima jezičkih modela. Sedeo sam poluhipnotisan dok je model pronalazio paterne i generisao sve smisleniji tekst. I dalje ne deluje intuitivno da je sledeći korak razumevanje teksta, do kog bi došli "na mišiće", uz više resursa, većim modelom i većim korpusom kojim treniramo sistem.

U nedostatku dobrog modela koći me pomoći da završim tekst, okrećem se blagoj patetici. Što bi Andrić rekao:

```"Najbednija i najtragičnija od svih čovekovih slabosti nesumnjivo je njegova potpuna nesposobnost predviđanja, koja je u opštoj protivnosti sa tolikim njegovim darovima, veštinama i znanjima."```


Možda su transformeri alat koji će nam pomoći da uhvatimo sve te fine, kompleksne paterne između događaja iz prošlosti i verovatnih budućnosti.