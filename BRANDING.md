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
| Donkerrood / Kastanjebruin | `#44171B` | 68, 23, 27 | 0/66/60/73 | Primaire inkt, woordmerk, alles wat gezien moet worden |
| Donkergroen / Zwartgroen | `#1C2518` | 28, 37, 24 | 24/0/35/85 | Volvlak donkere secties (`--void`) |
| Saliegroen / Olijfgroen | `#B8C298` | 184, 194, 152 | 5/0/22/24 | Tweede zacht sectievlak, tegenwicht voor roze |
| Felroze / Magenta | `#D33168` | 211, 49, 104 | 0/77/51/17 | **Uitsluitend de CTA** — zie §2.3 |

### 2.2 Contrastmatrix (WCAG 2.1, verhouding tegen achtergrond)

Berekend, niet geschat. Vet = voldoet aan AA voor lopende tekst (≥ 4.5:1).

| Tekst ↓ / Achtergrond → | Wit | Crème | Lichtroze | Salie | Donkerrood | Donkergroen | Magenta |
|---|---|---|---|---|---|---|---|
| Donkerrood `#44171B` | **15.17** | **14.22** | **9.69** | **8.10** | — | — | 3.19 |
| Donkergroen `#1C2518` | **15.82** | **14.83** | **10.11** | **8.45** | — | — | 3.32 |
| Wit `#FFFFFF` | — | — | — | — | **15.17** | **15.82** | **4.76** |
| Crème `#F9F8ED` | — | — | — | — | **14.22** | **14.83** | 4.46 |
| Lichtroze `#E4C8CA` | 1.40 | 1.47 | — | — | **9.69** | **10.11** | 3.04 |
| Salie `#B8C298` | 1.68 | 1.76 | 1.20 | — | **8.10** | **8.45** | 2.54 |
| Magenta `#D33168` | 4.76 | 4.46 | 3.04 | 2.54 | 3.19 | 3.32 | — |

Let op de regel voor **wit op magenta: 4.76**. Dat is de enige reden dat een
knoplabel op een vol magenta vlak mag staan — crème haalt er 4.46 en zakt
daarmee net onder de norm. Zie §2.3.

Let ook op **roze op wit: 1.40**, iets lager nog dan de 1.47 op crème. Roze
scheidingslijnen fluisteren op een witte pagina dus nóg zachter. Dat is de
bedoeling voor decoratie, maar het is precies waarom alles wat gezien MOET
worden — een onderstreping, een badge, de rand van een bedienbaar element —
in donkerrood staat en niet in roze.

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

Magenta hoort dus klein te blijven. Het draagt op dit moment precies één ding:
**de CTA**. Verder niets — geen koppen, geen prijzen, geen vinkjes, geen
scheidingslijnen, geen badges. Dat is de juiste schaal, en het is ook de reden
dat de kleur werkt: één kleur die alleen op "hier klik je" staat, blijft dat
betekenen. Dezelfde kleur op koppen, prijzen én lijnen betekent niets meer, en
dan is de knop juist moeilijker te vinden dan wanneer hij donkerrood was
geweest.

De site draait op crème en roze. Magenta is het enige punt waar dat wordt
doorbroken, en dat punt is altijd een actie.

Daarbovenop komt de contrastbeperking:

**Magenta haalt nergens 4.5:1.** Op crème komt het op 4.46:1, net onder de
grens; crème op magenta geeft dezelfde 4.46:1. Dat is geen afrondingskwestie
die je kunt negeren — het is een zakelijke B2B-site waar mensen door filters en
formulieren lezen.

Daarom:

- Magenta draagt **nooit** lopende tekst, labels, filternamen of formuliertekst.
- Magenta staat uitsluitend op de **CTA**: het volvlak van de primaire knop en
  de omtrek van de secundaire. Nergens anders.
- Het label op een vol magenta knop is **wit**, niet crème. Crème op magenta is
  4.46:1 en zakt daarmee onder de 4.5:1 die een knoplabel van 13 px vraagt; wit
  op magenta is **4.76:1** en haalt het wel. Dat verschil van 0.3 is de hele
  reden dat `--on-cta` bestaat.
- De omtrek van de secundaire knop is magenta met het woord in donkerrood.
  Magenta op wit is 4.46:1 en op roze 3.04:1 — allebei boven de 3:1 die voor de
  rand van een bedienbaar element geldt. Een rand is geen tekst.
- Op donkergroen haalt de magenta knopvorm 3.32:1. Ook dat is boven de grens,
  en het is de achtergrond waarop de knop het hardst werkt — zie de afsluiter
  op Home.

Uit de audit (§3.1 van het overdrachtsdocument): de huidige CTA oogt inactief
zolang de offertelijst leeg is. Een volvlak in de enige signaalkleur van het
palet lost dat definitief op — die knop ziet er altijd actief uit, en hij is de
enige plek op de pagina die er zo uitziet.

### 2.4 Geen varianten

Er worden **geen tussentinten gemaakt**. Geen lichtere of donkerdere versie van
een basiskleur, geen `color-mix()`, geen verloop tussen twee kleuren. Wat de
site tekent staat letterlijk in de tabel van §2.1.

**Eén uitzondering, en alleen deze:** het achtergrondpatroon in de hero mag
dekking gebruiken (§5). Dat is bewust vrijgegeven. De regel blijft wél dat de
dekking op de *laag* zit en niet in de kleurwaarde — in de CSS staat gewoon
`var(--pink)`, met `opacity` op het element eromheen. Zo blijft de kleur
aanwijsbaar een van de zes, ook al is de weergave lichter.

Deze uitzondering geldt **niet** voor tekst. Dekking op tekst verlaagt het
contrast zonder dat je het aan de kleurwaarde ziet, en dat is precies hoe een
ontoegankelijke tint binnensluipt.

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
| `--accent` `--accent-on` | roze / donkerrood | decoratief accent: scheidingen, sectieranden |
| `--cta` `--on-cta` | magenta / wit | uitsluitend de CTA — zie §2.3 |

`styles.css` bevat zelf geen enkele kleurwaarde; alles loopt via deze namen.

### 2.6 Kleurverdeling

Kleur wordt in **grote vlakken** gebruikt, niet in kleine versieringen — de
richting van porta-nyc, meurisse en muuto. Een sectie krijgt een kleur, of hij
krijgt er geen. Zo ziet de verdeling op Home eruit:

| Sectie | Vlak |
|---|---|
| Hero | twee donkere opnames naast elkaar onder een donkergroene sluier |
| Merkenband | wit, roze scheidingen |
| Catalogus | wit, kop donkerrood, beeldvlakken crème |
| Seizoen | wit, kop donkerrood |
| In de kijker | wit, kop donkerrood, beeldvlakken crème |
| Bewijsband | streepveld, **roze blok** over de volle breedte: cijfers \| citaat |
| Afsluiter | zelfde streepveld, **crème blok** gecentreerd, twee CTA's |
| Footer | roze, woordmerk en tekst in donkerrood |

De paginagrond is wit (§1b); crème is daarmee opgeschoven van "de grond" naar
"het vlak waar een product op staat".

De warme familie (crème, roze, donkerrood) draagt de pagina — het is een
chocolade- en snoepmerk. Donkergroen verankert boven- en onderaan. Magenta is
weer wat het hoort te zijn: de vonk, en niets anders. Het staat op de CTA en
verder nergens.

Dat betekent dat de rangorde nu volledig via **maat, gewicht en vlak** loopt en
niet via kleur — precies zoals §2.4 dat voor tekst al voorschreef. Een sectiekop
is groot en vet, geen kop is magenta. Een prijs is groot, geen prijs is magenta.
Wat gezien MOET worden om te wérken — een onderstreping, een badge, de rand van
een bedienbaar element — staat in donkerrood, want roze haalt op wit maar
1.40:1.

Vaste regels:

- **Nooit twee gekleurde secties direct na elkaar** die dezelfde kleur dragen.
  Wit staat er tussen; dat is wat de kleur laat werken. Let op de afsluiter: de
  testimonial ervóór is roze, en "Laatst bekeken" ertussen verdwijnt bij een
  eerste bezoek. Daarom is het blok in de afsluiter crème en niet roze.
- **Magenta draagt geen sectie.** Dat mocht vroeger; nu niet meer. Een volle
  magenta band maakt zichzelf het luidste element van de pagina en neemt die rol
  af van de knop. Wil je een band die opvalt, gebruik dan het patroon met een
  volvlak erop — zie de USP-band.
- **Tekst gaat nooit rechtstreeks over een patroon.** Er komt een volvlak
  overheen: crème, donkergroen of roze. Op roze is donkerrood 9.69:1, dus daar
  geldt geen ondergrens voor de tekengrootte.
- **Geen twee verwante kleuren op elkaar.** Donkergroen en salie zijn allebei
  groen; ze horen niet aan elkaar te grenzen.

## 3. Typografie

### 3.1 Manrope

Eén familie voor de hele interface: **Manrope**, variable, as `wght` **200–800**
(defaultinstantie 200). De schaal gebruikt daarvan 200, 300, 400, 500, 600 en
700 — de hele bandbreedte, met het zwaartepunt aan de lichte kant. Licentie SIL OFL 1.1 — vrij te gebruiken, ook
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

**Eén zwaar element per pagina, en dat is de H1.** Alles daaronder staat licht.
Dat is de kern van deze schaal: de hero drukt door, en vanaf daar laat de
typografie los. Twee zware niveaus maken er een wedstrijd van, en dan wordt de
pagina luid zonder dat iets belangrijker wordt.

De rangorde komt dus van **grootte**, niet van gewicht. Een sectiekop van 50 px
extra light staat boven lopende tekst van 16 px regular; het formaatverschil
doet het werk dat vroeger het gewichtsverschil deed.

| Rol | Klasse | Grootte | Gewicht |
|---|---|---|---|
| Display (hero) | `h1.display` | `clamp(2.7rem, 6.6vw, 5.6rem)` | **700** — de enige |
| Display (niet-H1) | `.display` op h2 | idem | **200** |
| Paginakop | `.cat-hero-title` / `.page-title` | `clamp(2.5rem, 5.4vw, 4.4rem)` | **200** |
| Productnaam (PDP) | `.pdp-title` | `clamp(1.9rem, 3vw, 2.7rem)` | **200** |
| Sectiekop | `.h-lg` / `.section-title` | `clamp(2rem, 3.6vw, 3.1rem)` | **200** |
| Subkop | `.h-md` | `clamp(1.5rem, 2.2vw, 2.1rem)` | **200** |
| Statement (over ons) | `.ab-statement p` | `clamp(1.6rem, 3.6vw, 3rem)` | **200** |
| Lede | `.lede` | `clamp(1.15rem, 1.4vw, 1.35rem)` | **200** |
| Registergetal | `.ledger-n`, `.usp-n` | `clamp(1.9rem, 2.6vw, 2.5rem)` | 300 |
| Prijsuitspraak | `.pdp-price-v` | `clamp(1.6rem, 2.4vw, 2.1rem)` | **200** |
| Citaat | `.ts-body blockquote` | `clamp(1.05rem, 1.5vw, 1.35rem)` | 300 |
| Jaartal, kleine kop | `.tl-year`, `.tl-text h3` | 17–26px | 300 / 500 |
| Lopende tekst | `body` | 16px | 400 |
| Details, meta | `.card-meta`, `.meta`, `.pdp-sku` | 13px | 300 |
| Labels, units | `.label`, `.eyebrow`, `.ledger-u` | 11px kapitalen | 600 |

**Spatiëring gaat mee omhoog.** Een vette kop mag krap staan — dikke stokken
onderscheiden zich toch wel. Bij 200 lopen dunne stokken op krappe afstand
optisch in elkaar over. Daarom staat de display op `-0.042em` en alles wat licht
is op ongeveer `-0.02em`. Wie het gewicht verlaagt zonder de spatiëring mee te
nemen, krijgt een kop die van een afstand als een grijze streep leest.

**Waar de grens ligt.** Gewicht 200 heeft formaat nodig. Boven ± 18px draagt
het; daaronder worden de stokken te dun, zeker op een scherm zonder hoge
pixeldichtheid. Daarom:

- lopende tekst blijft **400**. Op 16px is 200 in ideale omstandigheden nog
  leesbaar, maar het verliest te veel op gewone schermen en over langere stukken.
- kleine kapitalen blijven **600**. Uppercase op klein formaat heeft gewicht
  nodig, geen elegantie.
- de lede staat op 200 **omdat de ondergrens op 1.15rem (18.4px) ligt**. Verlaag
  je die, dan moet het gewicht mee omhoog.
- een kop die kleiner is dan de tekst eronder zwaar is, moet **omhoog** in
  gewicht en niet omlaag. `.tl-text h3` is 17–20px boven lopende tekst van 400;
  op 200 zou de kop lichter zijn dan zijn eigen alinea en draait de rangorde om.
  Vandaar 500 daar.
- `h1,h2,h3` staat als basis op **200**. Een kop zonder klasse erft dat, dus een
  kleine kop moet zijn gewicht expliciet zetten. Twee deden dat niet en waren
  na de omzetting te ijl; dat is de valkuil van deze regel.
- Het vet van de display hangt aan het **element** (`h1.display`), niet aan de
  klasse. `.display` staat op drie plekken en maar twee daarvan zijn een H1 —
  de afsluiter op Home gebruikt dezelfde maat voor een H2. Hing het vet aan de
  klasse, dan was die afsluiter net zo zwaar als de hero en had de pagina twee
  zware elementen.

**De statische fallbacks moeten meegroeien.** `fonts.css` levert nu ook
ExtraLight (200) en Light (300). Zonder die twee valt een browser zonder
variable-font-ondersteuning terug op het dichtstbijzijnde gewicht dat hij kent —
400 — en dan verdwijnt het verschil tussen kop en lopende tekst volledig.

> Let op: een contrastcontrole vangt dit **niet**. WCAG rekent op kleur, niet op
> streekdikte — extra light in donkerrood haalt dezelfde 14.22:1 als bold. Dit is
> een leesbaarheidsgrens die je zelf moet bewaken.

Het woordmerk is handgetekend en wordt nooit nagezet in Manrope (§3.4).

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

- **Eén patroon per scherm.** Twee verschíllende patronen naast elkaar maken
  het rommelig. Hetzelfde patroon twee keer op één pagina mag wél, en doet de
  home ook: de USP-band en de afsluiter dragen allebei de streepband. Het werkt
  omdat het volvlak erop verschilt — roze links op de ene, crème gecentreerd op
  de andere — en omdat de testimonial ertussen staat.
- Tekst gaat er nooit direct overheen. Wil je tekst, leg dan een volvlak
  (crème, roze of donkergroen) over het patroon en zet de tekst daarop. Een
  crème volvlak is exact de tussenruimte van het patroon: de banen stoppen
  gewoon, wat leest als een etiket op inpakpapier. Een roze volvlak is voller
  dan de banen (die op 55% staan) en leest daardoor als een eigen vlak.
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
.pattern-band::before{
  --stripe:40px;                 /* baanbreedte; periode is dus 80px */
  background:repeating-linear-gradient(90deg,
    var(--pink) 0 var(--stripe),
    transparent var(--stripe) calc(var(--stripe) * 2));
  opacity:.55;
}
```

De baanbreedte staat op **40px**, dus een periode van 80px. Brede banen lezen
als inpakpapier; op 20px werd het een fijne streping die eerder als textuur dan
als patroon overkwam. Eén getal verandert de hele look.

Het bronbestand `Vertical-pattern.svg` heeft acht brede banen over de
artwork-breedte; op het scherm staan ze op een vaste **40px**, wat het dichtst
bij het bronbestand en bij inpakpapier blijft.

Als achtergrond hoort het patroon te fluisteren. Kleur en dekking horen daarom
bij elkaar — hoe donkerder de kleur, hoe lager het getal:

Het patroon tekent met **crème en donkerrood**, en donkerrood staat op **15%**.

| Baankleur | Dekking | Waar |
|---|---|---|
| `var(--ink)` | **15%** | het streepveld op Home — bewijsband én afsluiter |
| `var(--pink)` | 55% | alternatief, nergens in gebruik |
| `var(--sage)` | 40% | alternatief, nergens in gebruik |

Die 15% is beproefd en met opzet laag. Sterkere versies zijn geprobeerd en
afgevallen:

- Op **100%** is het onmiskenbaar crème-en-donkerrood, maar dan is de band het
  zwaarste beeldelement van de pagina en trekt hij de aandacht weg van het enige
  wat er telt — het blok met de knop erop.
- Op **30%** komt het uit op een warme taupe die nog steeds aandringt.
- Op **15%** zakt het naar een bleke warme greige en doet het patroon wat een
  patroon hoort te doen: de bladspiegel breken zonder zelf gelezen te worden.

Donkerrood is bijna zwart (L\* ≈ 15) en rekent daardoor veel sneller aan dan
roze of salie. Dat is de reden dat de dekking hier zoveel lager ligt dan de 55%
van roze: kleur en dekking horen bij elkaar, en wie de kleur wisselt zonder de
dekking mee te nemen krijgt geen patroon maar een gordijn.

**Eén veld, niet twee banden.** De bewijsband en de afsluiter staan pal op
elkaar, want "Laatst bekeken" ertussen verdwijnt bij een eerste bezoek. Kregen
ze elk een eigen baankleur, dan botsten er twee verschillende patronen tegen
elkaar en las de staart van de pagina als rommel. Ze delen daarom hetzelfde
veld; het onderscheid zit in het BLOK dat erop ligt — eerst een roze, dan een
crème. Dat is één idee met twee toepassingen in plaats van twee ideeën.

Waarom donkerrood op 15% en niet roze: het roze blok moet erop kunnen liggen
zonder te verdwijnen, en het veld eindigt tegen de roze footer. Roze banen
zouden allebei die grenzen laten verwateren. Donkerrood op 15% zakt naar een
warme greige — een andere waarde én een andere kleurfamilie dan het roze dat
eroverheen en eronder ligt.

Let op het verschil met donkergroen. Groen weggedimd leest als vuilgrijs (zie
hieronder); donkerrood zakt naar taupe, en dat staat naast chocolade juist goed.
Het is dezelfde constructie in allebei de gevallen — de kleurwaarde blijft een
van de zes, alleen de laag is lichter — maar de uitkomst verschilt per kleur, en
dat moet je op het scherm beoordelen en niet op de rekenmachine. Let op hoe dat is opgebouwd: de kleur in de CSS is
een van de zes, en de `opacity` staat op de laag eromheen. De kleurwaarde
blijft dus aanwijsbaar uit het palet; alleen de weergave is lichter. Eén getal
aanpassen maakt het patroon sterker of zwakker.

Waarom roze en niet donkergroen: sinds de home-hero de kop rechtstreeks op het
patroon zet, is de baan de achtergrond van lopende tekst. Donkergroen moet je
dan wegdimmen tot **12%** voor het fluistert, en op dat punt leest het als
vuilgrijs. Roze is zélf licht, dus de baan blijft dicht bij crème: het verschil
tussen baan en tussenruimte is kléiner (1,23:1 tegenover 1,27:1) terwijl de
kleur juist duidelijker uit het palet komt. Minder ruis achter de tekst, meer
merk. Salie op **40%** doet hetzelfde en is het alternatief.

  Het bronbestand blijft in `assets/pattern/` staan als referentie voor print.

Het streeppatroon is als CSS te herbouwen zonder asset, wat scherper en lichter
is dan een SVG-achtergrond:

```css
.stripes{
  background:repeating-linear-gradient(
    90deg,
    var(--cream) 0 40px,
    var(--pink) 40px 80px
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
donkerrood. De CTA "Offerte aanvragen" is een vol magenta vlak met wit label en
blijft altijd volledig actief ogen, ook bij een lege offertelijst.

**Knoppen** — de knop ziet er overal op de site hetzelfde uit. Dat is het punt
van magenta terugbrengen tot de CTA: je herkent hem overal, ook op een vlak dat
je nog niet eerder zag. Er zijn dus geen sectie-uitzonderingen meer, op één na
(zie de laatste rij).

| Type | Vlak | Tekst | Contrast |
|---|---|---|---|
| Primair | magenta | wit | 4.76 ✅ |
| Primair, hover | donkerrood | wit | 15.30 ✅ |
| Secundair | transparant, rand magenta | `--ink` | 14.22 ✅ (rand 4.46 op wit) |
| Secundair, hover | magenta | wit | 4.76 ✅ |
| Secundair op donkere sectie | transparant, rand magenta | crème | 14.83 ✅ (rand 3.32) |

**Filters en formulieren** — crème vlak, `--control` randen op alles wat
bedienbaar is (§8.4), roze scheidingslijnen tussen filtergroepen. Alle tekst in
donkerrood; tellers en hulptekst verschillen in grootte, niet in kleur (§2.4).
Actieve filter: donkerrood vinkje en donkerrode chip. Magenta komt hier niet
voor — en sinds §2.3 komt magenta nergens voor behalve op de CTA.

**Focus** — zichtbare focus is niet onderhandelbaar; B2B-gebruikers tabben door
filters en formulieren. Blijft `2px solid var(--ink)` met 3px offset. Op donkere
secties `var(--on-void)`.

**Donkere secties** — donkergroen vlak, crème tekst, `--on-void-2` voor
secundaire tekst. Woordmerk in de crème-versie. Op de home is dit nog uitsluitend
de hero; de afsluiter en de footer zijn eruit gehaald ten gunste van roze en het
streeppatroon. Donkergroen is daarmee de kleur van de opening, niet van de
afsluiting.

**Roze secties, en wat dat kost** — op donkergroen bestaat een tekstrap (crème
14.83:1 voor primair, salie 8.45:1 voor secundair). Op roze bestaat die niet:
donkerrood haalt er 9.69:1 en is de enige kleur die de norm haalt. Zet je een
donkergroene sectie om naar roze, dan valt de secundaire tekstkleur dus weg en
moet de rangorde over op maat, gewicht en spatiëring — precies zoals §2.4 dat
voor lichte vlakken voorschrijft. De footer is daar het voorbeeld van: kolomkop
11 px kapitalen met 0.14em spatiëring tegenover een link van 15 px in normale
zetting, allebei in dezelfde kleur.

Let ook op het woordmerk: de crème-versie haalt op roze 1.47:1 en verdwijnt
daar. Een roze vlak krijgt `Logo-Dark.svg`, niet `Logo-Light.svg`.

**Zachte secties** — lichtroze of salie volvlak met donkerrode tekst. Bedoeld
om ritme te breken tussen twee crème-secties, niet om een kaart in te vullen.

**Patroonsecties** — crème grond met het streeppatroon (§5) en de tekst op een
volvlak erop. De USP-band is hiervan het voorbeeld: banen van 20px in roze op
55% dekking, met de zin op een vol roze blok. Het blok leest omdat het VOL roze
is en de banen eronder roze op 55% zijn — het is merkbaar donkerder dan zowel de
baan als de tussenruimte. Eén patroon per scherm.

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
