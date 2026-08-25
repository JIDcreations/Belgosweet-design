# Belgosweet — gedeelde regels voor alle sectie-agents

Dit bestand is naslag. Het wordt niet automatisch geladen; de vier
agentdefinities dragen de regels zelf. Lees het als je twijfelt over een regel
die in jouw definitie te kort staat.

## Het project

`belgosweet.be` in herstructurering. Dit is het **HiFi-prototype**: statisch,
geen build, geen framework, geen dependencies. Openen met een statische server
(`file://` blokkeert localStorage en dan valt de offertelijst weg):

```bash
python3 -m http.server 8000    # → http://localhost:8000
```

Publiek: B2B. Bedrijven die relatiegeschenken met hun logo laten maken, vanaf
250 stuks. De bezoeker is een office manager of aankoper met een deadline, geen
consument die komt snoepen. Toon: zakelijk, warm, concreet. Nederlands.

Onderbouwing van elke structuurbeslissing: `Info/belgosweet_overdracht.md`.
Het visuele systeem: `BRANDING.md`. Dat document wint altijd van jouw smaak.

## De harde regels

**Kleur — zes, geen zevende.** `assets/css/colors.css` bevat precies zeven
hexwaarden (de zes + wit als paginagrond). Alles daarbuiten is een `var()` die
daarheen wijst. Geen `color-mix()`, geen `rgba()` op een merkkleur, geen
lichtere of donkerdere tint, geen verloop. Zet je een kleur, dan is het een
bestaand token.

| Token | Kleur | Voor |
|---|---|---|
| `--paper` | wit | de paginagrond |
| `--surface` | crème `#F9F8ED` | beeldvlak, het vlak waar een product op staat |
| `--band-pink` `--accent` `--rule` | roze `#E4C8CA` | zachte vlakken, decoratieve lijnen |
| `--band-sage` | salie `#B8C298` | tweede zacht vlak |
| `--ink` `--control` | donkerrood `#44171B` | **alle** tekst op licht, randen van bedienbare elementen |
| `--void` `--on-void` `--on-void-2` | donkergroen / crème / salie | donkere secties |
| `--cta` `--on-cta` | magenta `#D33168` / wit | **uitsluitend** de CTA |

**De magenta-regel.** Magenta is 2.9× zo verzadigd als de op één na sterkste
kleur en haalt nergens 4.5:1. Het draagt precies één ding: het volvlak van de
primaire knop en de omtrek van de secundaire. Geen koppen, geen prijzen, geen
badges, geen lijnen, geen vinkjes, geen sectievlak. Eén kleur die alleen op
"hier klik je" staat, blijft dat betekenen.

**Er is geen grijs.** Op wit en crème haalt alleen donkerrood de norm. Roze
haalt 1.40:1 en is dus onleesbaar als tekst. Er bestaat geen zachtere trap voor
bijschriften of tellers — `--ink-2` en `--ink-3` wijzen allemaal naar dezelfde
donkerrode kleur. **Rangorde loopt via grootte en gewicht, nooit via kleur.**
Alleen op donkergroen bestaat de trap wél: crème primair, salie secundair.

**Ritme van de vlakken.** Nooit twee gekleurde secties direct na elkaar. Wit
staat ertussen; dat is wat de kleur laat werken. Tekst staat nooit rechtstreeks
op een patroon — er komt een volvlak overheen.

**Typografie.** Eén familie: Manrope variable, `wght` 200–800, zwaartepunt aan
de lichte kant. Koppen staan op 200; alleen `h1.display` op 700. `styles.css`
bevat **geen enkele losse `font-size`** — elke grootte komt uit een token in
`assets/css/type.css`. Mis je een stap, voeg hem dáár toe met een reden in het
commentaar. Onder 1.15rem draagt gewicht 200 niet meer; zakt de grootte, dan
moet het gewicht mee omhoog.

**Kwaliteitsvloer.** Responsive tot 375px. Zichtbare focus op alles wat
bedienbaar is. `prefers-reduced-motion` gerespecteerd — geen animatie die
alleen via JS aan gaat en in een verborgen tab de inhoud leeg laat.

## Hoe deze codebase geschreven is

Het commentaar in `styles.css`, `app.js` en de HTML legt **uit waarom**, niet
wat. Het bevat gemeten waarden, afgewogen alternatieven en de reden waarom iets
níét gedaan is. Dat is het waardevolste deel van dit prototype: het externe team
dat de echte site bouwt leest die redenering.

Schrijf in dezelfde stijl. Verwijder geen commentaar dat nog klopt. Verandert je
wijziging de reden achter een keuze, herschrijf dan de toelichting — laat er
geen staan die de nieuwe code tegenspreekt. Nederlands, dezelfde toon.

## Werkwijze

1. **Lees eerst.** Je sectie in de HTML, in `styles.css`, in `app.js`. Ook het
   commentaar — daar staat waarom het is zoals het is, en soms is de feedback al
   eens overwogen en verworpen.
2. **Is de feedback klein en duidelijk** (een maat, een kleur, een woord), voer
   ze uit.
3. **Is ze richtinggevend** ("dit voelt te druk", "de hero moet sterker"), stel
   dan eerst in drie tot vijf regels je aanpak voor, wacht op akkoord, en bouw
   dan pas.
4. **Botst de feedback met een regel uit `BRANDING.md`**, zeg dat in één zin met
   de sectie erbij — en doe het daarna toch, als de gebruiker het herhaalt. Het
   is zijn merk.
5. **Verifieer.** Start de server, bekijk de pagina, controleer 375px / 1000px /
   1440px, en test met de toetsenbordfocus.
6. **Rapporteer** wat je veranderde en waarom. Geen samenvatting van je proces.

## Wat je nooit doet

- Een bestand aanraken dat niet in jouw eigendomslijst staat. Andere agents
  werken in dezelfde twee bestanden.
- Een gedeelde klasse herdefiniëren zonder te controleren wie hem nog gebruikt.
  `grep -rn "\.klasse" *.html app.js` kost twee seconden.
- Een build, een dependency of een framework introduceren.
- Een kleurwaarde in `styles.css` zetten. Dat bestand bevat er nul.
