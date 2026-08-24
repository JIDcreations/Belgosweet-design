# Belgosweet — Merk & richtlijnen

Vastlegging van het visuele systeem voor de HiFi-fase (§10 van
[`Info/belgosweet_overdracht.md`](Info/belgosweet_overdracht.md)). Dit document is
de enige bron voor kleur, typografie, logo en patroon — zowel voor dit prototype
als voor het externe team dat de echte site bouwt.

De structuur zelf ligt vast in het overdrachtsdocument en gaat hier niet opnieuw
open. Dit document gaat uitsluitend over de afwerking.

---

## 1. Bronbestanden

Alle merkbestanden staan in deze repo, onder `assets/`:

| Pad | Inhoud |
|---|---|
| `assets/css/colors.css` | **De enige bron voor kleur.** De zes basiskleuren + alle afgeleide tokens |
| `assets/color/Colors.png` | Het aangeleverde kleurenblad |
| `assets/fonts/` | Manrope variable + statics, incl. `OFL.txt` |
| `assets/logo/` | Woordmerk (licht/donker), badge-varianten, twee use-cases |
| `assets/pattern/` | Streeppatroon, logopatroon, schuin streepeffect |
| `assets/belgosweet-source.ai` | Bronbestand Illustrator (29 MB, niet voor web) |

De SVG's in `assets/logo/` en `assets/pattern/` zijn **genormaliseerd**: elke
vectorvulling gebruikt nu een van de zes kleuren uit §2.1. De aangeleverde
originelen (met afwijkende hexwaarden) staan onaangeroerd in `../Branding/`.

## 2. Kleur

### 2.1 De zes basiskleuren

Dit is de **volledige** palet. Er komt geen zevende kleur bij — geen extra
grijs, geen los accent, geen semantische status-kleur uit een andere hoek.

| Naam | Hex | RGB | CMYK | Rol |
|---|---|---|---|---|
| Off-white / Crème | `#F9F8ED` | 249, 248, 237 | 0/0/5/2 | Papier — de standaardachtergrond van de site |
| Lichtroze / Poederroze | `#E4C8CA` | 228, 200, 202 | 0/12/11/11 | Zachte sectievlakken, beeldvlak-placeholder |
| Donkerrood / Kastanjebruin | `#44171B` | 68, 23, 27 | 0/66/60/73 | Primaire inkt, woordmerk, primaire CTA |
| Donkergroen / Zwartgroen | `#1C2518` | 28, 37, 24 | 24/0/35/85 | Volvlak donkere secties (`--void`) |
| Saliegroen / Olijfgroen | `#B8C298` | 184, 194, 152 | 5/0/22/24 | Tweede zacht sectievlak, tegenwicht voor roze |
| Felroze / Magenta | `#D33168` | 211, 49, 104 | 0/77/51/17 | Accent — promo, seizoen, highlight |

### 2.2 Contrastmatrix (WCAG 2.1, verhouding tegen achtergrond)

Berekend, niet geschat. Vet = voldoet aan AA voor lopende tekst (≥ 4.5:1).

| Tekst ↓ / Achtergrond → | Crème | Lichtroze | Salie | Donkerrood | Donkergroen | Magenta |
|---|---|---|---|---|---|---|
| Donkerrood `#44171B` | **14.22** | **9.69** | **8.10** | — | — | 3.19 |
| Donkergroen `#1C2518` | **14.83** | **10.11** | **8.45** | — | — | 3.32 |
| Crème `#F9F8ED` | — | — | — | **14.22** | **14.83** | 4.46 |
| Lichtroze `#E4C8CA` | 1.47 | — | — | **9.69** | **10.11** | 3.04 |
| Salie `#B8C298` | 1.76 | 1.20 | — | **8.10** | **8.45** | 2.54 |
| Magenta `#D33168` | 4.46 | 3.04 | 2.54 | 3.19 | 3.32 | — |

### 2.3 De magenta-regel — belangrijk

Magenta is de enige verzadigde kleur in een palet van vijf gedempte tonen.
Gemeten in OKLCH-chroma:

| Kleur | Chroma |
|---|---|
| Crème | 0.015 |
| Donkergroen | 0.027 |
| Lichtroze | 0.032 |
| Saliegroen | 0.058 |
| Donkerrood | 0.070 |
| **Magenta** | **0.199** |

Magenta is **2.9x zo verzadigd als de op één na sterkste kleur** en vijf keer
het gemiddelde van de andere vijf. Dat maakt het een signaalkleur, geen
vlakkleur. Over een volle sectiebreedte wordt het meteen het luidste element
van de pagina en leest het als een ander merk — het palet valt dan uiteen in
"vijf gedempte tinten plus magenta".

Magenta hoort dus klein te blijven: een badge, een markering, een rand. Op dit
moment draagt het precies één ding, de promo-badge. Dat is de juiste schaal.

Daarbovenop komt de contrastbeperking:

**Magenta haalt nergens 4.5:1.** Op crème komt het op 4.46:1, net onder de
grens; crème op magenta geeft dezelfde 4.46:1. Dat is geen afrondingskwestie
die je kunt negeren — het is een zakelijke B2B-site waar mensen door filters en
formulieren lezen.

Daarom:

- Magenta draagt **nooit** lopende tekst, labels, filternamen of formuliertekst.
- Magenta mag wél: volvlakken, grote displaytekst (≥ 24 px regulier of ≥ 18.7 px
  bold — dan geldt de AA-grens van 3:1), badges, promo-/seizoensmarkering,
  hover- en actief-accenten, en grafische elementen.
- De **primaire CTA ("Offerte aanvragen") is donkerrood met crème tekst**
  (14.22:1), niet magenta. Magenta is te zwak om de belangrijkste actie van de
  site te dragen en verliest bovendien zijn signaalwaarde als het overal staat.

Uit de audit (§3.1 van het overdrachtsdocument): de huidige CTA oogt inactief
zolang de offertelijst leeg is. Donkerrood op crème lost dat op — die knop ziet
er altijd actief uit.

### 2.4 Geen varianten

Er worden **geen tussentinten gemaakt**. Geen lichtere of donkerdere versie van
een basiskleur, geen transparantie, geen `color-mix()`, geen verloop tussen twee
kleuren. Wat de site tekent staat letterlijk in de tabel van §2.1.

Dat heeft één gevolg dat vooraf duidelijk moet zijn: **op crème bestaat er maar
één tekstkleur die de norm haalt** — donkerrood, 14.22:1. Donkergroen kan ook
(14.83:1), maar dat is een andere kleur, geen zachtere trap. Roze en salie halen
1.47 en 1.76 en zijn dus onleesbaar als tekst.

Er is dus geen "grijzer" voor bijschriften, tellers of hulptekst. **Rangorde
loopt via grootte en gewicht**, niet via kleur. Dat is strenger dan gebruikelijk
en het maakt pagina's voller, maar het is wel consequent: alles wat tekst is,
heeft hetzelfde gewicht in het oog, en de hiërarchie zit in de typografie.

Op donkergroen bestaat de trap wél: crème (14.83:1) voor primaire tekst, salie
(8.45:1) voor secundaire.

### 2.5 Tokens

De tokens staan in [`assets/css/colors.css`](assets/css/colors.css). Dat bestand
bevat precies zes hexwaarden — alle andere namen zijn `var()`-verwijzingen
daarnaartoe. Wie een token toevoegt, wijst het naar een van de zes.

Om te gebruiken, vóór `styles.css` inladen:

```html
<link rel="stylesheet" href="assets/css/colors.css">
<link rel="stylesheet" href="styles.css">
```

| Token | Wijst naar | Voor |
|---|---|---|
| `--ink` `--ink-2` `--ink-3` | donkerrood | alle tekst op lichte vlakken |
| `--ink-4` | roze | enkel lijnen en iconen, nooit tekst |
| `--rule` `--rule-2` | roze | decoratieve scheidingen (1.47:1) |
| `--control` | donkerrood | rand van bedienbare elementen — zie §8.4 |
| `--paper` | crème | de standaardachtergrond |
| `--paper-2` `--surface` `--band-pink` | roze | zachte vlakken, beeldvlak |
| `--band-sage` | salie | tweede zacht vlak |
| `--void` `--on-void` `--on-void-2` | donkergroen / crème / salie | donkere secties |
| `--accent` `--accent-on` | magenta / crème | accent — zie §2.3 |

`styles.css` bevat zelf geen enkele kleurwaarde; alles loopt via deze namen.

### 2.6 Kleurverdeling

Kleur wordt in **grote vlakken** gebruikt, niet in kleine versieringen — de
richting van porta-nyc, meurisse en muuto. Een sectie krijgt een kleur, of hij
krijgt er geen. Zo ziet de verdeling op Home eruit:

| Sectie | Vlak |
|---|---|
| Hero | verticale banen donkergroen/crème, kop op een roze vlak |
| Merkenband | crème |
| Catalogus | crème, beeldvlakken wisselen roze/salie |
| Seizoen | crème, beeld salie |
| In de kijker | crème, beeldvlakken roze |
| USP-band | donkerrood |
| Testimonial | roze |
| Afsluiter | crème |
| Footer | donkergroen |

Gemeten over de gerenderde pagina: crème 59%, roze 16%, donkergroen 11%,
salie 8%, donkerrood 5%, magenta < 1%.

De warme familie (crème, roze, donkerrood) draagt de pagina — het is een
chocolade- en snoepmerk. Donkergroen verankert boven- en onderaan, salie
ondersteunt in de rasters, magenta is de vonk.

Twee vaste regels:

- **Nooit twee gekleurde secties direct na elkaar** die dezelfde kleur dragen.
  Crème staat er tussen; dat is wat de kleur laat werken.
- **Magenta krijgt nooit een volle sectie.** Zie §2.3: daarvoor is het te
  verzadigd. Het blijft badge, markering of rand.
- **Geen twee verwante kleuren op elkaar.** Donkergroen en salie zijn allebei
  groen; ze horen niet aan elkaar te grenzen. Daarom is de merkenband onder de
  groene hero crème en niet salie.

## 3. Typografie

### 3.1 Manrope

Eén familie voor de hele interface: **Manrope**, variable, as `wght` **200–800**
(defaultinstantie 200). Licentie SIL OFL 1.1 — vrij te gebruiken, ook
commercieel; `OFL.txt` moet meegeleverd worden bij distributie van de
fontbestanden.

### 3.2 Gevolg voor de bestaande stylesheet — actie nodig

De MidFi bouwde hiërarchie op de **breedte-as** (`wdth`) van Archivo:

```css
body{ font-variation-settings:"wdth" 100; }
.display{ font-variation-settings:"wdth" 88; }
```

**Manrope heeft geen `wdth`-as.** Die declaraties doen straks niets. De
hiërarchie moet dus verschuiven naar gewicht, grootte en letterafstand. Dit is
de vraag die §10.5 van het overdrachtsdocument openliet — hierbij beantwoord.

### 3.3 Schaal

| Rol | Klasse | Grootte | Gewicht | Tracking |
|---|---|---|---|---|
| Display (hero) | `.display` | `clamp(2.6rem, 6.4vw, 5.25rem)` | 800 | -0.035em |
| Sectiekop | `.h-lg` | `clamp(1.9rem, 3.4vw, 3rem)` | 700 | -0.028em |
| Subkop | `.h-md` | `clamp(1.4rem, 2vw, 1.9rem)` | 600 | -0.02em |
| Lede | `.lede` | `clamp(1rem, 1.25vw, 1.15rem)` | 400 | 0 |
| Lopende tekst | `body` | 16px | 400 | 0 |
| Meta | `.meta` | 0.8125rem | 500 | 0 |
| Label | `.label` | 0.6875rem, uppercase | 600 | 0.14em |

Manrope is op lage gewichten ijl; ga voor koppen niet onder 600, anders valt de
hiërarchie weg tegen de lopende tekst. Regelhoogte blijft zoals nu: 1.05 voor
koppen, 1.55 voor lopende tekst.

Labels blijven **spaarzaam** — niet boven elke sectie. Dat is precies het
sjabloon-signaal dat in de MidFi is weggewerkt.

### 3.4 Het woordmerk is geen font

Het logo is handgetekende letters, uitgezet als paden. Het woordmerk wordt
**nooit** nagezet in Manrope of in een script-font, en Manrope wordt nooit
cursief gebruikt om het logo te imiteren.

---

## 4. Logo

### 4.1 Varianten en wanneer

| Bestand | Wat | Gebruik |
|---|---|---|
| `Logo-Dark.svg` | Woordmerk, donkerrood | Standaard — header en alles op crème |
| `Logo-Light.svg` | Woordmerk, crème | Op donkergroen, donkerrood en foto |
| `Logo-Icon-Brown.svg` | Badge, donkerrood vlak + crème tekst | Favicon, avatar, verzegeling |
| `Logo-Icon-White.svg` | Badge, crème vlak + donkergroen tekst | Badge op donkere achtergrond |
| `Logo-Icon_Dark.svg` | Badge, donkergroen vlak + crème tekst | Alternatief op crème |
| `Logo-Icon_pink.svg` | Badge, lichtroze vlak + donkerrood tekst | Zacht, seizoensgebonden |
| `Logo-Icon_pattern1.svg` | Badge met groen/crème streeppatroon | Verpakking, seizoen — niet in UI |
| `Logo-Icon_pattern2.svg` | Badge met roze/bordeaux streeppatroon | Verpakking, seizoen — niet in UI |
| `Logo-usecase1.svg` | Woordmerk op crème vlak | Voorbeeldtoepassing, geen asset |
| `Logo-usecase2.svg` | Woordmerk op donkerrood vlak | Voorbeeldtoepassing, geen asset |

Het woordmerk is de **primaire** vorm. De badge is secundair: favicon, klein
formaat, en het merkteken in het lege beeldvlak (§6).

### 4.2 Vrije ruimte en minimumformaat

- **Vrije ruimte** rondom: de hoogte van de `b`-stok. Niets binnen die marge —
  geen tekst, geen lijn, geen rand van een beeld.
- **Minimum woordmerk:** 120 px breed op scherm. Daaronder lopen de dunne
  verbindingen in de script dicht; gebruik dan de badge.
- **Minimum badge:** 32 px.
- Het logo staat **nooit** op een onrustig deel van een foto. Is er geen rustig
  vlak, dan komt er een volvlak achter.

### 4.3 Niet doen

- Niet herkleuren buiten de zes. Geen verloop, geen slagschaduw (zie §4.4), geen
  contourlijn.
- Niet vervormen, roteren of herspatiëren.
- Woordmerk niet los knippen ("belgo" / "sweet" apart).
- Niet in een vorm proppen die de badge al oplost.

### 4.4 Twee problemen in de aangeleverde bestanden — één opgelost

**Kleurafwijking — opgelost.** De aangeleverde SVG's gebruikten vijf
hexwaarden die niet in het palet staan. Die zijn in `assets/` rechtgezet:

| Was | Is nu | In |
|---|---|---|
| `#F6F4E5` | `#F9F8ED` crème | alle woordmerken en badges |
| `#450118` | `#44171B` donkerrood | `Logo-Dark`, `-Icon-Brown`, `-Icon_pink`, use-cases |
| `#0D2011` | `#1C2518` donkergroen | `-Icon-White`, `-Icon_Dark`, `-Icon_pattern1`, `Vertical-pattern` |
| `#E4BFC0` | `#E4C8CA` lichtroze | `Logo-Icon_pink`, `-Icon_pattern1` |
| `#391826` | `#44171B` donkerrood | `Pattern/Logo-pattern.svg` |

Dat laatste was een compleet vijfde donkerrood. Naast elkaar op één scherm is
zoiets zichtbaar. Elke vectorvulling in `assets/logo/` en `assets/pattern/`
valt nu binnen de zes.

**Ingebakken rasterschaduw.** `Logo-Icon-Brown`, `-Icon-White`, `-Icon_Dark`,
`-Icon_pattern1` en `-Icon_pattern2` bevatten een `<image>`-element: de
slagschaduw is een ingebedde bitmap. Gevolg: 114–200 KB per bestand, schaalt
niet mee, en de schaduw is bovendien een kleur buiten het palet. Voor web zijn
schaduwloze vectorversies nodig — `Logo-Icon_pink.svg` (6 KB, drie paden) laat
zien hoe schoon het kan.

---

## 5. Patronen

Drie patronen, elk met een eigen rol. Ze zijn **achtergrond**, nooit drager van
lopende tekst.

| Bestand | Wat | Gebruik |
|---|---|---|
| `Vertical-pattern.svg` | Verticale strepen, donkergroen op crème, gelijke breedte | Sectie-achtergrond, banner, categoriehero |
| `Logo-pattern.svg` | Herhaald woordmerk, donkerrood op crème, verspringende rijen | Verpakking, footer-vlak, subtiele vulling |
| `pattern-effect.svg` | Strepen met schuine breuklijn, roze/bordeaux | Grafisch accent — is een raster, zie hieronder |

Regels:

- **Eén patroon per scherm.** Twee patronen naast elkaar maken het rommelig.
- Tekst gaat er nooit direct overheen. Wil je tekst, leg dan een volvlak
  (crème of donkergroen) over het patroon en zet de tekst daarop.
- Het streeppatroon draagt de **volledige breedte** van een sectie, niet een
  losse kaart — op kaartformaat leest het als ruis.
- Het logopatroon blijft klein en rustig: het woordmerk mag daarin niet
  concurreren met het echte logo in de header.
- `pattern-effect.svg` is volledig een ingebedde bitmap in een clippad — geen
  vector, en de pixels bevatten `#440919` en `#E5BFC1`: twee kleuren die niet in
  het palet staan. Het bestand wordt daarom **niet** als asset gebruikt. Het
  effect is herbouwd in CSS op `.hero-canvas`, met de exacte waarden en zeven
  banen over de breedte zoals in het bronbestand:

```css
.hero-canvas{
  --stripe:clamp(46px, 7.1vw, 116px);
  background:repeating-linear-gradient(90deg,
    var(--burgundy) 0 var(--stripe),
    var(--pink) var(--stripe) calc(var(--stripe) * 2));
}
.hero-canvas::after{           /* de schuine breuk: fase een halve slag om */
  content:""; position:absolute; inset:0;
  background:repeating-linear-gradient(90deg,
    var(--pink) 0 var(--stripe),
    var(--burgundy) var(--stripe) calc(var(--stripe) * 2));
  clip-path:polygon(0 100%, 0 62%, 100% 22%, 100% 100%);
}
```

  Het bronbestand blijft in `assets/pattern/` staan als referentie voor print.

Het streeppatroon is als CSS te herbouwen zonder asset, wat scherper en lichter
is dan een SVG-achtergrond:

```css
.stripes{
  background:repeating-linear-gradient(
    90deg,
    var(--cream)  0 60px,
    var(--green) 60px 120px
  );
}
```

---

## 6. Het lege beeldvlak

Het merendeel van de catalogus blijft in dit prototype zonder fotografie
(§10.3 van het overdrachtsdocument). Dat is een beperking van de demo, geen
ontwerpkeuze — maar de lege vlakken moeten er wel verzorgd uitzien.

- **Roze** als vlak, met het **merkteken gecentreerd in crème**
  (`assets/logo/Logo-Mark.svg`). Crème op roze geeft 1.47:1 — aanwezig genoeg om
  het vlak te merken, te zwak om het bijschrift te storen. Zuiver grijs naast
  echte fotografie leest als kapot; een gebrand vlak leest als
  nog-niet-ingevuld.
- Het merkteken blijft klein — ± 20% van de korte zijde. Het vlak is een
  wachtstand, geen logopresentatie.
- **Kritiek:** bij grijze producten is het bijschrift van het beeldvlak het
  enige zichtbare bewijs dat een variantkeuze werkt. Dat bijschrift moet blijven
  meewisselen bij een klik op een swatch — anders doet een swatch zichtbaar
  niets, precies het probleem dat in de audit is vastgesteld bij de
  M&M's-kleurcirkels op de huidige site.

---

## 7. Toepassing per element

**Header** — crème achtergrond, `--rule` haarlijn onderaan, woordmerk
donkerrood. De CTA "Offerte aanvragen" is donkerrood vlak met crème tekst en
blijft altijd volledig actief ogen, ook bij een lege offertelijst.

**Knoppen**

| Type | Vlak | Tekst | Contrast |
|---|---|---|---|
| Primair | donkerrood | crème | 14.22 ✅ |
| Secundair | transparant, rand `--control` | `--ink` | 14.22 ✅ |
| Op donkere sectie | crème | donkergroen | 14.83 ✅ |
| Promo / seizoen | magenta | crème | 4.46 — **enkel bij ≥18.7px bold** |

**Filters en formulieren** — crème vlak, `--control` randen op alles wat
bedienbaar is (§8.4), roze scheidingslijnen tussen filtergroepen. Alle tekst in
donkerrood; tellers en hulptekst verschillen in grootte, niet in kleur (§2.4).
Actieve filter: donkerrood onderstreept. Magenta komt hier niet voor.

**Focus** — zichtbare focus is niet onderhandelbaar; B2B-gebruikers tabben door
filters en formulieren. Blijft `2px solid var(--ink)` met 3px offset. Op donkere
secties `var(--on-void)`.

**Donkere secties** — donkergroen vlak, crème tekst, `--on-void-2` voor
secundaire tekst. Woordmerk in de crème-versie. Eén tot twee per pagina.

**Zachte secties** — lichtroze of salie volvlak met donkerrode tekst. Bedoeld
om ritme te breken tussen twee crème-secties, niet om een kaart in te vullen.

---

## 8. Toegankelijkheid — vaste regels

1. Lopende tekst haalt minimaal **4.5:1**; grote tekst (≥ 24 px, of ≥ 18.7 px
   bold) minimaal **3:1**.
2. `--ink-4` en magenta dragen **nooit** lopende tekst. Zie §2.3 en §2.4.
3. Kleur draagt nooit alleen betekenis. Een actieve filter is onderstreept én
   gekleurd; "uit voorraad" krijgt tekst, niet enkel een tint.
4. Randen van bedienbare elementen (invoerveld, select, variantknop, chip)
   halen minimaal **3:1** tegen hun achtergrond. Roze haalt op crème 1.47 en
   salie 1.76 — genoeg voor een decoratieve scheiding, **niet** voor de
   begrenzing van een control. Die krijgen daarom `--control` (donkerrood,
   14.22:1). Dat maakt formulieren zichtbaar strenger dan een lichte rand;
   binnen dit palet is er geen alternatief.
5. Tekst op patroon of foto staat altijd op een volvlak, nooit direct erop.

---

## 9. Openstaand

Afgewerkt in deze ronde: `colors.css` en `fonts.css` ingeladen, de
grayscale-ramp uit `styles.css` verwijderd, `wdth` vervangen door gewicht, het
logo in header en footer, favicon, en het gebrande beeldvlak. Alle pagina's zijn
gecontroleerd met een toegankelijkheidsaudit en komen schoon door.

Wat nog open staat:

- **Schaduwloze vectorbadges** — vier badge-SVG's bevatten nog een
  rasterschaduw (§4.4). Die kleuren zijn niet met een tekstvervanging te
  corrigeren; die bestanden moeten opnieuw uit Illustrator komen.
  `assets/logo/favicon.svg` en `Logo-Mark.svg` zijn wél schone vectors — ze zijn
  afgeleid van `Logo-Icon_pink.svg`.
- **`Vertical-pattern.svg` en `Logo-pattern.svg` worden nog nergens toegepast.**
  Het streeppatroon is een logische achtergrond voor de categoriehero, het
  logopatroon voor een verpakkings- of footervlak. Zie §5 voor de regels.
  Het schuine streepeffect draait al in de hero.
- **WOFF2** — de fonts zijn TTF zoals aangeleverd (167 KB tegenover ± 60 KB).
  Voor het prototype geen blokker, voor de echte bouw wel.
- **Fotografie** — één categorie volledig afwerken, advies `chocolade-pralines`
  (§10.3 overdrachtsdocument). Zonder beeld leest een productraster nu als een
  vlak van roze tegels.
- **Testimonials** — quotes nog te verzamelen bij de klant; structuurplek ligt
  vast (nu de saliegroene sectie op Home).
- **Repo-omvang** — `assets/belgosweet-source.ai` is 29 MB. Overweeg Git LFS als
  er meer bronbestanden bijkomen.
