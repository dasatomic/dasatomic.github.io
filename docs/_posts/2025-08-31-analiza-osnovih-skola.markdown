---
layout: post
title:  "Analiza osnovnih skola u Srbiji"
date:   2025-08-31 10:10:48 +0100
categories: DataScience
---

<style>
.post-content {
    max-width: none !important;
    width: 95vw !important;
    margin-left: calc(-45vw + 50%) !important;
}

.site-main {
    max-width: none !important;
}

@media screen and (max-width: 768px) {
    .post-content {
        width: 100% !important;
        margin-left: 0 !important;
    }
}
</style>

# Analiza osnovnih škola u Srbiji

Kako sledeća školska godina upravo počinje, ovaj blog post pravi osvrt na prethodnu godinu i nudi par interaktivnih grafikona koji vizualizuju javno dostpune podatke sa https://mojasrednjaskola.gov.rs/.

Dostupni podaci za svaku osnovnu školu na teritoriji Srbije su: Ukupan broj učenika osmog razrade (iz prošle godine), prosečan broj bodova iz svakog razreda koji se boduje tokom upisa u srednje škole (odnosno šesti, sedmi i osmi razred) i ukupan broj bodova.

U ovom postu neću pokušati da donesem bilo kakve zaključke ili objašnjenja. Prikazi stavljaju akcenat na dve stvari.
1) Odnos između upeha tokom školovanja i uspeha na kraju godine.
2) Razlike između okruga i opština u ove dve dimenzije.

## Interaktivne vizualizacije

<div style="text-align: center; margin: 20px 0;">
    <iframe src="/assets/skole.html" width="100%" height="700" frameborder="0" style="border: 1px solid #ddd; border-radius: 4px;"></iframe>
</div>

Napomena za sledeća dva grafika. Ovde su prikazane informacija na nivou pojedinačnih škola, ne agregirane informacije na nivou okruga. Ovo znači da linije percentila, recimo 75 percentil, znači da tri četvrtine škola imaju ovaj prosek ili viši. Ova računica ne uzima u obzir broj učenika u pojedinačnim školama. U vizualizacijama nisu uključene škole koje se imale manje od 20 učenika u osmom razredu.

<div style="text-align: center; margin: 20px 0;">
    <iframe src="/assets/district_exam_scores_boxplot.html" width="100%" height="700" frameborder="0" style="border: 1px solid #ddd; border-radius: 4px;"></iframe>
</div>

<div style="text-align: center; margin: 20px 0;">
    <iframe src="/assets/district_grade_scores_boxplot.html" width="100%" height="700" frameborder="0" style="border: 1px solid #ddd; border-radius: 4px;"></iframe>
</div>

[Otvori u punoj veličini](/assets/skole.html){:target="_blank" class="btn"}