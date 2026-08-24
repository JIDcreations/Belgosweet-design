#!/bin/bash
# ============================================================
#  Belgosweet — bronbeelden klaarmaken voor het web
# ------------------------------------------------------------
#  assets/images/  = BRON. Onaangeraakt, zoals aangeleverd:
#                    PNG's van 1–8 MB met spaties, haakjes en
#                    zelfs een '#' in de bestandsnaam. Die '#'
#                    kapt een URL af — zo'n bestand is via het
#                    web simpelweg niet op te halen.
#  assets/img/     = AFGELEID. Wat de site echt laadt: JPEG,
#                    kleingerekend, kebab-case namen.
#
#  Opnieuw draaien mag altijd; het overschrijft de afgeleide map.
#  Voeg een regel toe aan de tabel onderaan om een beeld mee te
#  nemen. sips zit in macOS zelf, er is geen extra tool nodig.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="assets/images"
OUT="assets/img"
mkdir -p "$OUT"

# maak <naam> <bron> [maxpx] [kwaliteit]
maak() {
  local naam="$1" bron="$SRC/$2" max="${3:-1200}" kw="${4:-70}"
  if [ ! -f "$bron" ]; then echo "  ONTBREEKT: $2" >&2; return 1; fi
  sips -s format jpeg -s formatOptions "$kw" -Z "$max" \
       "$bron" --out "$OUT/$naam.jpg" >/dev/null
  printf "  %-34s %s\n" "$naam.jpg" "$(du -h "$OUT/$naam.jpg" | cut -f1)"
}

echo "Producten en categorieën"
maak pralines-stapel        "ChatGPT Image 17 aug 2026, 14_41_56.png"
maak pralines-blik          "belgosweet_ChatGPT Images 2.0 Edit_2026-08-18_07-30-16.png"
maak pralines-doos-groen    "belgosweet_ChatGPT Images 2.0 Edit_2026-08-17_14-03-12.png"
maak pralines-blik-bordeaux "ChatGPT Image 18 aug 2026, 09_53_42.png"
maak koekjes-boter          "_ - 2026-07-27T152457.525.jpeg"
maak koekjes-stroopwafels   "product shots/ChatGPT Images 2.0 Edit_0008.png"
maak koekjes-geluk          "product shots/ChatGPT Images 2.0 Edit_0012.png"
maak macarons-roze          "_ - 2026-07-28T140500.176.jpeg"
maak macarons-bordeaux      "_ - 2026-07-28T191956.919.jpeg"
maak snoep-honing           "product shots/ChatGPT Images 2.0 Edit_0002 kopie.png"
maak snoep-kegels           "product shots/ChatGPT Images 2.0 Edit_0003 kopie.png"
maak snoep-fruitgom         "product shots/ChatGPT Images 2.0 Edit_0006.png"
maak noten-chocolade        "product shots/ChatGPT Images 2.0 Edit_0009.png"
maak granola-breuk          "product shots/ChatGPT Images 2.0 Edit_0007.png"
maak nougat-rollen          "product shots/ChatGPT Images 2.0 Edit_0005.png"
maak witte-chocolade        "_ - 2026-07-27T234746.058.jpeg"
maak geschenk-assortiment   "ChatGPT Image 18 aug 2026, 14_54_39 (1).png"
maak geschenk-lint          "belgosweet_ChatGPT Images 2.0 Edit_2026-08-18_08-45-25.png"

# NIET meenemen — er staat een merk van een ander op, leesbaar in beeld:
#   0001.png  Lindt, Sarotti, Hershey's, share   (mini-repen)
#   0002.png  Ritter Sport                       (mini-repen)
#   0003.png  Lindt / Lindor                     (eindejaarsfiguren)
#   0004.png  Napoleon                           (gewikkelde snoepjes)
# Belgosweet voert die merken niet (zie BRANDS in data.js) en het is
# andermans handelsmerk. De "kopie"-varianten van 0002 en 0003 zijn
# dezelfde opnames zonder merk; die gebruiken we wel.

echo "Hero"
# De twee donkere panelen naast elkaar. Elk paneel is een halve hero, dus
# ~1200px breed volstaat ruim; ze zijn bovendien donker en fijn van
# textuur, waar JPEG efficient mee omgaat.
maak hero-links             "Explore the rich landscape of our cocoa powder, where soft curves mingle to create a sensory delight ✨__#Nouga_#Kuwait #ArtisanChocolatier.jpeg" 1400 78
maak hero-rechts            "_ - 2026-07-28T192003.818.jpeg" 1400 78
# Blijft beschikbaar voor andere secties.
maak hero-verpakking        "hero/1.png" 2400 76

echo "Sfeer en verpakking"
maak sfeer-pralines-cacao   "1712.webp" 1800 74
maak sfeer-geschenkdozen    "belgosweet_ChatGPT Images 2.0 Edit_2026-08-24_09-30-46.png" 1800 74
maak sfeer-geschenkdozen-2  "belgosweet_ChatGPT Images 2.0 Edit_2026-08-24_09-48-18.png" 1800 74
maak sfeer-cacaopoeder      "Explore the rich landscape of our cocoa powder, where soft curves mingle to create a sensory delight ✨__#Nouga_#Kuwait #ArtisanChocolatier.jpeg" 1600 74
maak verpakking-repen       "Belgosweet - Art de Praslin (Nathalie)_ChatGPT Images 2.0 Edit_2026-08-17_15-02-11.png"
maak verpakking-display     "Belgosweet - Art de Praslin (Nathalie)_ChatGPT Images 2.0 Edit_2026-08-18_09-31-46.png"
maak verpakking-koker       "Belgosweet - Art de Praslin (Nathalie)_ChatGPT Images 2.0 Edit_2026-08-18_10-11-44.png"
maak verpakking-stickers    "ChatGPT Image 18 aug 2026, 10_33_57.png"
maak verpakking-blik-zwart  "belgosweet_ChatGPT Images 2.0 Edit_2026-08-18_08-17-20.png"
maak verpakking-doos-wit    "belgosweet_ChatGPT Images 2.0 Edit_2026-08-18_07-38-58.png"

echo
echo "Totaal: $(du -sh "$OUT" | cut -f1) in $(ls -1 "$OUT" | wc -l | tr -d ' ') bestanden"
