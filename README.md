# Belgosweet — HiFi

Klikbaar prototype voor de herstructurering van belgosweet.be. De structuur uit
de MidFi-fase, nu uitgevoerd in het merk: kleur, typografie, logo en patroon.

Nog niet ingevuld: **fotografie** (het merendeel van de catalogus staat op een
gebrand leeg beeldvlak) en de **finale copy**. De taalschakelaar is bewust
niet-werkend — die toont enkel waar de keuze komt te staan.

De onderbouwing (klantcontext, audit, alle beslissingen met motivatie) staat in
[`Info/belgosweet_overdracht.md`](Info/belgosweet_overdracht.md). Het visuele
systeem voor de HiFi-fase — kleur, typografie, logo, patroon — staat in
[`BRANDING.md`](BRANDING.md).

## Starten

Een statische server is nodig (`file://` blokkeert localStorage, waardoor de
offertelijst niet blijft staan tussen pagina's):

```bash
python3 -m http.server 8000
```

Daarna → <http://localhost:8000>

## Pagina's

| Bestand | Rol |
|---|---|
| `index.html` | Home — categorieën, bestsellers, USP's, testimonials, promo/seizoen (conditioneel), merken, laatst bekeken |
| `shop.html` | Categorie-overzicht — alle producten met de volledige filterset |
| `categorie.html?cat=…` | Categoriepagina — één categorie, zelfde filterset |
| `product.html?id=…` | Productdetail — varianten, minimumafname, offerte-CTA |
| `offerte.html` | Offertelijst + aanvraagformulier *(vervangt het winkelmandje)* |
| `account.html` | Login + snel opnieuw aanvragen |
| `over-ons.html` | Verhaal, tijdlijn in verpakkingen, team, sociaal engagement, contact + formulier |
| `info.html?p=…` | Voorwaarden / privacy / cookies / printtechnologie |

## Wat er écht werkt

Dit is geen klikdummy — het volgende is functioneel, zodat de structuur getest
kan worden en niet alleen bekeken:

- **Filteren** op categorie, merk, gelegenheid & toepassing (incl. HoReCa),
  verpakking en beschikbaarheid — met live tellers die rekening houden met de
  andere actieve filters
- **Sorteren**, **pagineren** (één methode) en **zoeken** vanuit de header
- **Filterstaat in de URL** — een gefilterde selectie is deelbaar en de
  terug-knop werkt
- **Varianten via klik** (niet hover — werkt niet op tablet): hoofdbeeld wisselt
  inline mee
- **Minimumafname en veelvoud** worden afgedwongen, niet enkel gemeld
- **Offertelijst** blijft bewaard over pagina's heen, met aantallen aanpassen en
  verwijderen
- **Snel opnieuw aanvragen** vanuit een vorige aanvraag
- **Laatst bekeken** vult zich op basis van echt bezochte producten
- **Annotaties aan/uit** via de knop in de zwarte balk — zo kan de wireframe ook
  kaal getoond worden, zonder de toelichting bij elke structuurbeslissing

## Layout van shop & categorie

Beide pagina's delen dezelfde componenten (herbruikbare CSS-classes, geen
inline styling):

- `.cat-hero` — split hero: beeld links, eyebrow + grote titel + intro rechts
  (`.compact` voor het overzichtsniveau)
- `.quick-filters` — snelfilters als tekstlinks met dunne scheidingslijnen,
  actieve item onderlijnd, "Toon meer +"
- `.filter-toggle` — tekstlink die het filterpaneel in-/uitklapt; ingeklapt
  loopt het grid door over vier kolommen
- `.grid-editorial` + `.ed-tile` — asymmetrisch grid: tussen de producttegels
  staan editorial-tegels die 2 kolommen en/of 2 rijen beslaan (`.span-2x2`,
  `.span-1x2`, `.span-2x1`)

## Bestanden

- `data.js` — dummy catalogus (155 producten) op basis van de categorieën,
  merken en gelegenheden uit `Info/website_sitemap_Belgosweet.xlsx`.
  Vaste seed: elke lading geeft dezelfde catalogus.
- `app.js` — gedeelde header/footer, offertelijst-state, catalogus-engine
  (filters/sortering/paginering) en de pagina-controllers
- `styles.css` — stylesheet; bevat zelf geen enkele kleurwaarde
- `assets/css/colors.css` — de zes merkkleuren en alle afgeleide tokens
- `assets/css/fonts.css` — Manrope (variable, `wght` 200–800)
- `assets/logo/`, `assets/pattern/` — logo- en patroonbestanden
# Belgosweet-design
