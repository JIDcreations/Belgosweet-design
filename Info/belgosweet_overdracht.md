# Belgosweet — Overdrachtsdocument redesign

Verzameling van alle input, analyse en beslissingen uit de structuurfase, bedoeld als volledige context voor verder werk in Claude Code / VS Code. Bevat: klantcontext, ruwe input (excel + meeting notes), audit-bevindingen (belgosweet.be + meurisse.com), alle beslissingen met motivatie, en de definitieve structuur.

Bijhorende MidFi-code (HTML/CSS/JS, grayscale, geen kleur/fotografie) staat in de map `belgosweet-midfi/` — dit document is de onderbouwing erachter.

---

## 1. Kerncontext klant

- **Bedrijf**: Belgosweet — B2B-verkoper van snoep/sweets/promotionele gifting voor bedrijven
- **Geen webshop** — enkel offerte-aanvragen, geen checkout/betaling, geen prijzen zichtbaar ("Prix sur demande" / "op aanvraag" op elk product)
- **Grootste angst van de klant**: ze heeft grote, vaste klanten die nu al via de (slechte) huidige site bestellen. Bij een herstructurering mogen die klanten hun weg niet kwijtraken — UX moet "straight to the point" zijn
- **Scope van deze fase**: uitsluitend structuur/layout. Geen kleuren, geen fotografie, geen finale copy. Later wordt dit in Claude Code gecodeerd tot een klikbaar MidFi-bestand voor klantpresentatie
- **Referentie voor UX-kwaliteit genoemd door klant**: meurisse.com (chocolatier, UX-designer van dat project als voorbeeld genomen)
- **Extra layout-referentie (later toegevoegd)**: porta-nyc.com (editorial/magazine-ritme, afwisselende image+tekst-secties)

---

## 2. Ruwe input van de klant

### 2.1 Sitemap-excel van de klant (`website_sitemap_Belgosweet.xlsx`)

Dit is het **doel-categorieschema** zoals de klant het zelf aanleverde — niet per se wat nu al live staat.

**Voorgestelde hoofdmenu (klant) — later herzien, zie sectie 4**
Home / Products / Occasions / Brands / HoReCa / About Us / Contact & Catalogue

**Products (categorieën)**
All, Chocolate & Pralines (met sub: Metal box, Plastic box, Brands, Occasions), Biscuits, Macarons, Mellow Cakes, Candy & Lollipops, Peppermint & Chewing gum, Advent Calendars, Nuts and salty snacks, Healthy snacks & Granola, Coffee/tea/sugar, Drinks, Olive Oil, Salt & Pepper Grinder, Gourmet gift basket, Drinking bottles, Umbrellas

**Occasions**
Halloween, Saint-Nicholas, Christmas, Easter, Onboarding, Board Room, Summer, Company party, Compliments Day, Customers Day

**Brands**
Galler, Jules Destrooper, Leonidas, Mentos, Tic Tac, Generous, Joris

**HoReCa**
Front Desk, Coffee Corner

### 2.2 Meeting notes van de klant (ruw, ongefilterd)

- Referentie: meurisse.com — UX-designer van dat project genoemd als goed voorbeeld, klant/Claude-oordeel nog niet bevestigd
- Idee: bestelknop in de nav voor terugkerende klanten die snel hetzelfde willen herbestellen (B2B-klanten die gewoon zijn van hun snoep te bestellen)
- Grootste angst herhaald: klanten mogen niet verloren geraken in de site
- Belangrijk: **testimonials, USP's**
- Interactiepatroon genoemd: shop → product → hover → verpakking (card)
- **Home** moet bevatten: categorieën, merken, CTA's, USP's/testimonials, promo-toestanden (indien actief), producten in de kijker, seasonal producten, laatst bekeken. Expliciet herhaald: **het is geen webshop, puur voor offertes**
- **Over ons** moet een WOW-effect geven: 1 foto van de eigenaar, leuke kleuren/patronen, design-pagina, animaties, "hip" gevoel. Nieuwsbrief-inschrijving hoort hier
- **Categorie-pagina** (shop-pagina met alle categorieën): pagina per categorie
- **Productdetailpagina**: moet alle info hebben, maar ook opties tot aanpassing

---

## 3. Audit-bevindingen belgosweet.be (huidige site)

Uitgevoerd via Claude for Chrome, live op de site.

### 3.1 Sitemap — huidige structuur (samengevat)

- **Homepage** (/fr, /nl, /en): hero, categorie-tegels, bestsellers, CTA "Envoyez-nous votre demande", "Pourquoi nous choisir?", merkenoverzicht
  - UX-probleem: CTA-knop oogt inactief/grijzig zolang de offerte-lijst leeg is
  - UX-probleem: geen cookie-consentbanner verschenen, ondanks uitgebreide cookiepagina
- **Chocolats**: merktegels Leonidas/Choclair/Dolfin/Callebaut/M&Ms, filter "Disponibilité du stock", dubbele paginering (knop + cijfers, verwarrend), onderaan elke pagina hetzelfde ongelabelde blok van 3 niet-chocolade producten
- **Calendriers de l'avent**: extra hiërarchisch niveau ("Calendriers et agendas") niet zichtbaar in hoofdmenu — inconsistent
- **Biscuits**: submerken Jules Destrooper / Generous
- **Macarons**: geen submerken, geen breadcrumbs, geen sorteeropties
- **Confiserie**: 8 subcategorieën (Cuberdons, Mentos, Lollipops, Joris, Bonbons emballés, Tic tac, Candy Blisters & Mints, Glass Jars); niet-Confiserie producten verschijnen soms tussen de resultaten
- **Organic & FairTrade**, **Paniers Gourmands** (slechts 2 producten)
- **Info-pagina's**: À propos de nous, Contacts (geen contactformulier, enkel gegevens+kaart), Notre histoire, Termes et conditions, Technologies d'impression (generiek Engelstalig sjabloon, weinig chocolade-specifiek), Politique de confidentialité, Politique de cookies
- **Votre compte**: login + "Créer un compte", geen sociale login
- **Technisch**: trailing-slash-URL geeft 404 (`/fr/` werkt niet, `/fr` wel), geen breadcrumbs nergens, geen sorteeropties nergens, dubbele "fr" in een URL (`/fr/fr/termes-conditions`)

### 3.2 Productcategorieën — geschatte omvang

- Chocolats: 5 submerken, 30+ producten
- Calendriers de l'avent: 3 paginering-pagina's, 40+ producten geschat
- Confiserie: 8 subcategorieën
- Exacte totaalaantallen nergens vermeld op de site (geen productteller)

### 3.3 Productpagina's — patroon over 8 bezochte producten

- **Nergens een zichtbare prijs** — steeds "Prix sur demande"
- **Geen enkele functionele configurator**, ondanks dat teksten personalisatie beloven ("vous pouvez faire imprimer votre logo"). Voorbeeld: kleurcirkels bij een M&M's-product bleken enkel een fotolightbox te openen, geen functionele kleurkeuze
- Bestelflow steeds: aantal invullen → "Ajouter à la liste" (offertelijst) óf "Nous contacter"
- Minimumbestelhoeveelheid varieert sterk (1 tot 1000 stuks), altijd als rode waarschuwing getoond
- Sommige producten hebben een downloadbare "fiche produit" (PDF)
- **Contentkwaliteit inconsistent**: sommige producten volledig uitgewerkt (beschrijving + downloads), andere volledig leeg of met placeholder-tekst ("x" als volledige beschrijving)

### 3.4 Algemene site-info

- **Contact**: +32 2 351 55 55, info@belgosweet.be, Boulevard de l'Europe 123, 1300 Wavre (spelling wisselt tussen "Wavre"/"Waver" op verschillende pagina's)
- **Talen**: Frans (standaard), Nederlands, Engels — vertaling inconsistent (sommige teksten blijven Frans of Engels in de NL-versie)
- **Trust-signalen**: "27 ans d'expérience", "500+ entreprises nous font confiance" (Notre histoire), leveranciersmerklogo's (geen klantlogo's)
- **Geen testimonials, quotes of reviews gevonden** op enige pagina
- Samenwerking met ASBL Axedis (sociale inschakelingsonderneming) vermeld als sociaal engagement — sterk punt, weinig uitgelicht

### 3.5 Technisch

- Alle geobserveerde requests (64) gaven status 200, geen gebroken links behalve de trailing-slash-404
- Site draait op extern platform (PromoTron/TronShop-CDN's), jQuery/Bootstrap/Slick-slider — gedateerde maar functionele stack
- Geen consolefouten gedetecteerd
- Mobiele weergave kon niet betrouwbaar visueel getest worden binnen de auditsessie

---

## 4. Meurisse.com — analyse (referentiesite)

### 4.1 Navigatiestructuur

- Hoofdnav: SHOP (dropdown: Gourmet Tablets, Choconuts, Spreads, Mini Tablets, Baking, Gifting), ABOUT (dropdown: Our Story, Manifesto, Archives, Manufacture, Partners), RECIPES (directe link)
- Rechts in header: taal/valuta, zoek, account/login-icoon, cart-icoon
- Footer (3 kolommen): SHOP / LEARN / SUPPORT (Contact us, Wholesale, FAQs, Terms, Privacy)
- **Login staat enkel als icoon in de header**, niet als tekstitem in nav of footer
- **Wholesale staat uitsluitend in de footer**, verwijst door naar een volledig apart platform: `pro.meurisse.com`

### 4.2 Categorie-/shooppagina

- Grid van 2 kolommen (desktop), volle breedte, grote productfoto's
- **Geen filters, geen sorteeropties** — logisch bij hun kleine catalogus (5-6 collecties), **niet toepasbaar als referentie voor Belgosweet** (17+ categorieën + merken + gelegenheden)
- Productkaarten: grote foto, naam + prijs, "Sold out"-badge waar relevant
- Hover-effect: rond "tas+"-icoon rechtsonder op de foto voor quick-add — consumentenshop-mechaniek, niet toepasbaar zonder checkout

### 4.3 Productdetailpagina

- Meerdere grote foto's (verticaal scrollend), titel, prijs, korte beschrijving, uitklapbare accordions (Ingredients, Certifications, Tasting Notes, Pairing Tips, Manufacturing, Nutrition Facts), aantal-stepper, "Add to cart", trust-icoontjes (gratis levering vanaf €50, veilige betaling, gemaakt in België)
- **Variant-interactie is klik, niet hover**: hoveren over een swatch geeft enkel een visuele highlight (rand); klikken wisselt de productfoto direct (AJAX, geen page reload), update URL met variant-parameter, en werkt prijs/voorraad live bij
- Geen aparte hover-preview of popup — alles inline in het rechterpaneel

### 4.4 Wholesale/B2B-flow (`pro.meurisse.com`)

- Volledig losstaand domein/platform, eigen minimalistische structuur
- Geen zichtbare catalogus/filters zonder in te loggen
- Hamburgermenu i.p.v. horizontale nav: enkel "Home" + "Contact us", telefoon/e-mail direct zichtbaar
- Homepage = 1 hero-sectie ("Meurisse Wholesale Platform") met 2 CTA's: "Shop now" / "Contact us"
- Login: eenvoudig formulier (e-mail/wachtwoord, reset-link), **geen zelfregistratie** — nieuwe klanten worden via "Contact us" doorverwezen, niet via een aanmeldformulier

### 4.5 Belangrijke correctie tijdens het proces: B2C vs. B2B

Meurisse is B2C met een kleine wholesale-uitzondering erachter. Belgosweet is **volledig B2B** — er is geen consumentenlaag ernaast. Gevolgen:
- Het "apart portaal"-model van meurisse is geen 1-op-1 te kopiëren oplossing — bij Belgosweet is er niets om van te scheiden, alles is al B2B
- Minimumaantallen en "prijs op aanvraag" zijn bij meurisse de uitzondering, bij Belgosweet de **norm op elk product**
- Winkelmandje/checkout-patronen van meurisse zijn niet bruikbaar; enkel het "Ajouter à la liste"-offertepatroon (dat overigens al op belgosweet.be zelf bestaat) is relevant
- Trust-icoontjes van meurisse (levering/betaling) moeten vertaald worden naar B2B-equivalenten (bv. "Belgisch gemaakt", "eigen logo mogelijk", levertermijn) — niet letterlijk overnemen

---

## 5. Porta-nyc.com — layout-referentie (aanvullend, later toegevoegd)

Gebruikt uitsluitend voor **layout-ritme**, niet voor stijl/kleur:
- Homepage wisselt af tussen productgrid-secties en volle-breedte editorial blokken (grote afbeelding + tekst naast elkaar, alternerend links/rechts)
- Dit "magazine"-ritme is toegepast op de Home- en Over ons-pagina van Belgosweet, voor de USP/testimonial/WOW-secties — zodat de site niet aanvoelt als een kale productcatalogus

---

## 6. Beslissingen — met motivatie

### 6.1 Navigatie: van 7 hoofdmenu-items naar 3

**Verworpen**: klant-excel stelde voor: Home / Products / Occasions / Brands / HoReCa / About Us / Contact & Catalogue

**Gekozen structuur**:
```
Home
Shop
  └─ Categorie-overzicht (filters: Categorie / Merk / Gelegenheid & toepassing incl. HoReCa / Beschikbaarheid)
       └─ Categoriepagina (productlijst)
            └─ Productdetail
Over ons (incl. contactgegevens + contactformulier)
Vaste CTA-knop, los van nav-items: "Offerte aanvragen"
```

**Motivatie**:
- Occasions, Brands en HoReCa worden **filters binnen Shop**, geen aparte top-nav-items — ze zijn inhoudelijk gebruikscontext (waar/wanneer wordt het ingezet), geen apart producttype. Een minder brede nav met filters eronder is beter tegen de angst van de klant (klanten verdwalen) dan 7 gelijkwaardige nav-items
- **HoReCa** (Front Desk, Coffee Corner): te smal (2 sub-items) voor een eigen hoofdcategorie, wordt filterwaarde. Als de klant hier toch een aparte ingang voor wil (horeca als aparte doelgroep met eigen aanpak/prijzen), is een landingspagina-link vanaf Home/footer een marketingbeslissing, geen structuurbeslissing — apart te behandelen
- **Contact**: niet als los hoofdmenu-item, maar opgenomen in Over ons — mét de nuance dat de conversie-actie zelf (offerte aanvragen) als **vaste, aparte CTA-knop** blijft bestaan, los van waar iemand in de nav zit. Bevestigd door meurisse's patroon (Contact zit ook niet prominent in hun hoofdnav)

### 6.2 Reorder/snel opnieuw bestellen voor terugkerende klanten

- Aanvankelijk geparkeerd als open functioneel vraagstuk (account/login-systeem, niet zuiver structureel)
- **Audit toonde aan dat belgosweet.be al een account-systeem heeft** ("Votre compte", met zelfregistratie) — dit hoeft dus niet nieuw gebouwd te worden
- Meurisse's wholesale-portaal (optionele, niet-verplichte login, geen zelfregistratie-nadruk) bevestigt het patroon: een lichte, optionele login is voldoende, geen zwaar accountsysteem nodig
- **Eindbeslissing**: bestaand account-systeem herpositioneren en beter zichtbaar maken voor "snel opnieuw aanvragen" — geen nieuwe structuur nodig

### 6.3 Variant-/verpakkingskeuze op productdetail: klik, niet hover

- Meeting-notes van de klant spraken over "hover → verpakking (card)"
- Meurisse's eigen site toont dat hover bij hen geen functie heeft (enkel visuele highlight) — de eigenlijke wissel gebeurt via klik, met live update van foto/prijs/voorraad
- **Eindbeslissing**: klik i.p.v. hover — ook beter voor B2B-gebruikers op tablet, waar hover niet werkt. Het "card"-idee van de klant blijft overeind (visuele swatch per optie), enkel het trigger-mechanisme verandert

### 6.4 Personalisatie/configurator

- Aanvankelijke aanname: "hebben ze al" — **audit weerlegde dit expliciet**: de tekst op productpagina's belooft personalisatie, maar nergens bestaat een functioneel veld ervoor (kleurcirkels bij M&M's = fotolightbox, geen configurator)
- **Eindbeslissing**: bewust **geschrapt** uit deze structuurronde (niet eens als placeholder meegenomen) — te vroeg om als klein op te vatten aangezien het van nul moet komen. Blijft kandidaat voor een latere fase/dev-scope-gesprek

### 6.5 Testimonials

- Meeting-notes: expliciete prioriteit ("Testimonials, USP's!!!")
- Audit bevestigt: **volledig afwezig** op de huidige site — geen quotes, reviews, of klantlogo's gevonden
- **Eindbeslissing**: structuurplek ligt vast (Home, als editorial split-sectie), content/quotes zelf volgen later (random/placeholder content in de MidFi)

---

## 7. Definitieve structuur (diff t.o.v. huidige site)

```
Home
  Categorie-tegels                               [BEHOUDEN]
  Bestsellers/producten in de kijker              [BEHOUDEN]
  CTA "offerte aanvragen"                         [HERZIEN — moet altijd actief ogen, ook bij lege lijst]
  "Pourquoi nous choisir" / USP's                  [BEHOUDEN, herschreven — nu tekst-only, moet visueel sterker]
  Testimonials / klantreferenties                  [TOEGEVOEGD — ontbreekt volledig]
  Merkenoverzicht                                  [BEHOUDEN]
  Promo-sectie (conditioneel)                      [TOEGEVOEGD]
  Seasonal producten                               [TOEGEVOEGD]
  "Laatst bekeken"                                 [HERZIEN — was ongelabeld blok, wordt benoemde sectie]

Shop (was: 7 aparte hoofdmenu-items)
  Categorie-overzicht                              [SAMENGEVOEGD — categorieën/merken/gelegenheden/HoReCa worden filters]
    Filters: Categorie / Merk / Gelegenheid & toepassing (incl. HoReCa) / Beschikbaarheid  [HERZIEN — consistente filterset i.p.v. wisselend per categorie]
    Sortering                                      [TOEGEVOEGD — bestond nergens]
    Breadcrumbs                                    [TOEGEVOEGD — bestonden nergens]
    Eén paginering-methode                         [HERZIEN — was dubbel]
    Categoriepagina
      Subcategorie-/merkpagina                     [BEHOUDEN, vlakker — max. 1 niveau diep i.p.v. 3-4 geneste niveaus]
      Productdetail
        Variant: inhoud/smaak                      [TOEGEVOEGD — functioneel, was enkel tekst]
        Variant: verpakking/kleur (klik, geen hover) [TOEGEVOEGD — functioneel, was decoratief/lightbox]
        Minimumaantal + veelvoud                    [BEHOUDEN]
        Beschikbaarheid (tabel)                      [BEHOUDEN]
        Beschrijving + downloadbare fiche produit    [BEHOUDEN, verplicht veld i.p.v. optioneel]
        CTA: "Toevoegen aan lijst" / "Contacteer ons" [BEHOUDEN]
        (Personalisatie/configurator bewust geschrapt uit deze ronde — zie 6.4)

Over ons
  Verhaal/geschiedenis                             [SAMENGEVOEGD — "À propos" + "Notre histoire" worden 1]
  WOW-sectie (foto eigenaar, design, animatie)      [TOEGEVOEGD]
  Contactgegevens + kaart                           [VERPLAATST — was aparte "Contacts"-pagina zonder formulier]
  Contactformulier                                  [TOEGEVOEGD — bestond nergens]
  Nieuwsbrief-inschrijving                          [TOEGEVOEGD]
  ASBL Axedis / sociaal engagement                  [BEHOUDEN]

Vaste CTA-knop (los van nav): "Offerte aanvragen"    [TOEGEVOEGD als persistent element]

Account/inloggen (icoon, geen nav-tekst)
  Login + snel opnieuw aanvragen                    [HERZIEN — bestond al, herpositioneren i.p.v. nieuw bouwen]

Footer
  Voorwaarden, privacybeleid, cookiebeleid          [BEHOUDEN]
  Technologies d'impression                          [HERZIEN — huidige inhoud generiek Engelstalig sjabloon, content herschrijven]
  Taalkeuze FR/NL/EN                                 [BEHOUDEN, consistentie-fix nodig]

Verwijderd
  "Créer un compte" als aparte publieke stap          [WEG — bestaat nog, maar niet prominent gepromoot; B2B-relaties starten via offerte/contact]
```

---

## 8. Openstaande punten (nog niet beslist)

- **Personalisatie/configurator**: geschrapt uit deze structuurronde, dev-scope voor latere fase — nog te bespreken hoe/wanneer dit wordt opgepakt
- **Testimonials**: content/quotes moeten nog verzameld worden bij de klant — structuurplek ligt al vast
- **HoReCa als aparte landingspagina**: indien de klant hier toch op aandringt als eigen doelgroep-ingang (i.p.v. filter), is dit een marketingbeslissing die apart van de structuur bekeken moet worden
- **Technologies d'impression-pagina**: huidige content is een generiek, niet-chocoladespecifiek sjabloon — moet herschreven worden, geen structuurwijziging nodig
- **Content-consistentie**: sommige producten op de huidige site missen volledig beschrijving/downloads — dit moet als contentwerk meegenomen worden, los van de structuur zelf

---

## 9. Geleverde bestanden

- `belgosweet_midfi_structuur.md` — eerdere tekstuele MidFi-structuur (voorloper van dit document, per pagina uitgeschreven met layout-blokken)
- `belgosweet_midfi.html` — eerste, verkennende single-page wireframe-versie (verouderd, vervangen door onderstaande gecodeerde versie)
- `belgosweet-midfi/` — definitieve gecodeerde MidFi: `index.html`, `shop.html`, `categorie.html`, `product.html`, `over-ons.html`, gedeelde `styles.css` en `script.js`. Grayscale, geen fotografie/kleur, functionele navigatie en variant-klikinteractie op productdetail, responsive filterpaneel op mobiel

---

## 10. HiFi-fase — scope (afgesproken 24 augustus 2026)

De MidFi wordt gekopieerd naar een aparte repo (`Belgosweet-Design`) en daar uitgewerkt tot HiFi. Wat die fase wél en niet is, ligt hiermee vast.

### 10.1 Dit is een prototype, geen bouw

De HiFi is uitsluitend een **klikbaar frontend-prototype voor klantpresentatie**. De eigenlijke site wordt elders gebouwd, op een andere stack. Deze fase levert dus geen productiecode — ze levert het ontwerp, en dient tegelijk als referentie voor het externe ontwikkelteam dat de echte site maakt.

Gevolg: prototype-compromissen moeten als compromis leesbaar zijn, niet als bedoeling. Wie dit later openslaat, moet kunnen zien wat een ontwerpkeuze was en wat een beperking van de demo.

### 10.2 Focus ligt volledig op design

Alles wat niet visueel is, valt buiten scope:

- **Talen** — de NL/FR/EN-schakelaar blijft bewust niet-werkend. Ze toont enkel wáár de taalkeuze komt te staan. Geen vertaallaag, geen dubbele pagina's per taal. De vertaalinconsistentie uit §3.4 blijft een aandachtspunt voor de echte bouw, niet voor deze fase.
- **Backend** — geen CMS, geen database, geen echte productdata. De catalogus blijft draaien op de gegenereerde dummydata uit `data.js`.
- **Formulieren** — contact, nieuwsbrief en offerteaanvraag blijven demo-bevestigingen. Er wordt niets echt verstuurd, er komt niets in een echte mailbox terecht.
- **Techniek** — blijft statische HTML/CSS/JS, zonder framework of buildstap. URL's blijven op `.html`. Geen SEO-, performance- of hostingoptimalisatie: dat hoort bij de echte bouw.

Wat er **wel** gebeurt: kleur, logo, typografie, fotografie en de visuele afwerking van de structuur die in dit document is vastgelegd. De structuur zelf ligt vast en gaat niet opnieuw open — dat was het hele doel van de MidFi-fase.

### 10.3 Fotografie

Het merendeel van de producten blijft grijs, simpelweg omdat er niet genoeg fotografie is om de volledige catalogus te vullen. Dat is een **praktische beperking van het prototype, geen ontwerpkeuze** — bij de echte bouw hoort elk product zijn eigen beeld te krijgen. Een beperkt aantal producten wordt in deze fase wel volledig uitgewerkt met echt beeld, zodat te zien is waar het naartoe gaat.

- **Advies:** één categorie van begin tot eind afwerken (categoriehero → productraster → productdetail → offertelijst) in plaats van losse foto's over de hele catalogus te verspreiden. Verspreide foto's maken elk raster vlekkerig en de klant beoordeelt de hele catalogus dan op twee tegels. `chocolade-pralines` is de logische keuze: vlaggenschipcategorie, en één van slechts twee categorieën met twee variantassen, dus de klik-interactie uit §6.3 valt er echt te tonen.
- Omdat die grijze vlakken er in de demo nu eenmaal staan, moeten ze er wel verzorgd uitzien: het beeldvlak (`.ph`) wordt heropgetekend als **gebrand leeg element** — een mark of monogram in een merkgebonden neutrale toon. Zuiver grijs naast echte fotografie leest als kapot in plaats van als nog-niet-ingevuld.
- **Let op:** bij grijze producten is het bijschrift van het beeldvlak het enige zichtbare bewijs dat de variantkeuze werkt. Wordt dat bijschrift stil gezet, dan doet een swatch zichtbaar niets — precies het probleem dat in §3.3 op de huidige site is vastgesteld bij de M&M's-kleurcirkels.
- Als er geen echte productfotografie komt, wordt met stockbeeld gewerkt. Geen beeld van leveranciers- of concurrentmerken (Leonidas, Galler, Jules Destrooper): generiek beeld wel.

### 10.4 Annotaties

De onderbouwing blijft in de **code staan als commentaar**, zoals nu al het geval is in `styles.css` en `app.js`. Er komt géén annotatielaag terug in de pagina zelf — die knop is er in commit `07fafed` bewust uitgehaald, zodat de wireframe kaal aan de klant getoond kan worden. Voor het externe ontwikkelteam vormen de code-commentaar en dit document samen de overdracht.

### 10.5 Wat nodig is om te starten

Blokkerend voor de gebrande ronde:

1. **Kleuren** — hexwaarden. Hieruit worden de dertien tokens in `styles.css` afgeleid (ink ×4, rules ×2, paper ×2, surface, void, on-void ×2), met contrast gecontroleerd op ≥4.5:1.
2. **Logo als SVG** — woordmerk in een lichte en een donkere versie (er zijn volvlak donkere secties), plus een mark of monogram voor het beeldvlak en de favicon.
3. **Typografie** — fontbestanden of naam + licentie, en of het één familie is of twee. Dat bepaalt of de huidige hiërarchie via de breedte-as (`wdth`) blijft of vervangen wordt.

Daarna, zonder tijdsdruk: keuze van de uit te werken categorie, fotografie, finale NL-copy, en minstens één echte testimonial (§8 — nog steeds open).

De openstaande punten uit §8 blijven open. Deze fase lost ze niet op: de personalisatie-configurator blijft geschrapt, de HoReCa-landingspagina blijft een marketingbeslissing, en de content-consistentie blijft contentwerk voor de echte bouw.
