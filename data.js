/* ============================================================
   Belgosweet — MidFi — dummy catalogus
   ------------------------------------------------------------
   Bron: website_sitemap_Belgosweet.xlsx (categorieën, merken,
   gelegenheden, HoReCa) + audit-bevindingen belgosweet.be
   (minimumaantallen, "prijs op aanvraag", fiche produit).

   Dit is GEEN echte productdata. Het bestaat enkel zodat de
   structuur écht werkt: filteren, sorteren, pagineren en de
   offertelijst draaien op deze lijst.
   ============================================================ */

const BS_DATA = (() => {

  /* ---------- facetten ---------- */

  /* Twee soorten beeld, bewust gescheiden:

       tile  — het CATEGORIEBEELD (tegel, carrousel, categoriehero).
       imgs  — de PRODUCTBEELDEN, waar de tegels van de catalogus over
               rouleren.

     Voor ALLEBEI geldt dezelfde regel: er komt alleen een opname van een
     los object op een egale crèmegrond in — de PNG's uit de aanlevering.
     Die grond is #F9F9F0, praktisch identiek aan --cream, dus het product
     lijkt vrij op de pagina te staan in plaats van in een dichtgeplakt
     fotokadertje. Een vollevlaks textuurfoto — een macaronmuur, een
     koekjesstapel — doet het omgekeerde: dan zie je een reeks
     verschillende kadertjes in plaats van een reeks producten. Die
     opnames (de .jpeg-bronnen) zijn sfeerbeeld en horen in een band of
     een hero, nooit in een houder waar een product hoort te staan.

     Ontbreekt een van de twee, dan blijft daar de patroon-placeholder
     staan. Voor macarons en mellow cakes is er geen losse productopname
     aangeleverd — van macarons bestaat alleen een vollevlaks textuurfoto,
     en die valt onder de regel hierboven. Bij mellow cakes en
     adventskalenders wás er wel een opname, maar met het merk van een
     ander erop (Ritter Sport, Lindt) — zie tools/build-images.sh. */
  const CATEGORIES = [
    { slug: "chocolade-pralines",     name: "Chocolade & pralines",   count: 32,
      tile: "pralines-stapel",
      imgs: ["pralines-stapel", "pralines-blik", "pralines-doos-groen",
             "pralines-blik-bordeaux"] },
    { slug: "koekjes",                name: "Koekjes",                count: 14,
      tile: "koekjes-stroopwafels",
      imgs: ["koekjes-stroopwafels", "koekjes-geluk"] },
    { slug: "macarons",               name: "Macarons",               count: 6  },
    { slug: "mellow-cakes",           name: "Mellow cakes",           count: 6  },
    { slug: "snoep-lollys",           name: "Snoep & lolly's",        count: 18,
      tile: "snoep-honing",
      imgs: ["snoep-honing", "snoep-kegels", "nougat-rollen"] },
    { slug: "pepermunt-kauwgom",      name: "Pepermunt & kauwgom",    count: 10,
      tile: "snoep-fruitgom",
      imgs: ["snoep-fruitgom"] },
    { slug: "adventskalenders",       name: "Adventskalenders",       count: 16 },
    { slug: "noten-zoute-snacks",     name: "Noten & zoute snacks",   count: 8,
      tile: "noten-chocolade",
      imgs: ["noten-chocolade"] },
    { slug: "gezonde-snacks-granola", name: "Gezonde snacks & granola", count: 8,
      tile: "granola-breuk",
      imgs: ["granola-breuk"] },
    { slug: "koffie-thee-suiker",     name: "Koffie, thee & suiker",  count: 9  },
    { slug: "dranken",                name: "Dranken",                count: 6  },
    { slug: "olijfolie",              name: "Olijfolie",              count: 4  },
    { slug: "zout-pepermolen",        name: "Zout- & pepermolen",     count: 4  },
    { slug: "gourmet-geschenkmand",   name: "Gourmet geschenkmand",   count: 5,
      tile: "geschenk-assortiment",
      imgs: ["geschenk-assortiment", "geschenk-lint"] },
    { slug: "drinkflessen",           name: "Drinkflessen",           count: 5  },
    { slug: "paraplus",               name: "Paraplu's",              count: 4  }
  ];

  /* Families: hoe een aankoper het aanbod indeelt, niet hoe een
     magazijn het indeelt. Adventskalenders staan daarom bij de
     geschenken en niet bij chocolade — ze worden gekocht als
     eindejaarsgeschenk, niet als "iets van chocolade".
     Vier groepen i.p.v. zestien losse items scheelt echt denkwerk. */
  const FAMILIES = [
    { slug: "zoet",     name: "Chocolade & koek",     cats: ["chocolade-pralines", "koekjes", "macarons", "mellow-cakes"] },
    { slug: "snoep",    name: "Snoep & mint",         cats: ["snoep-lollys", "pepermunt-kauwgom"] },
    { slug: "snacks",   name: "Snacks & drank",       cats: ["noten-zoute-snacks", "gezonde-snacks-granola", "koffie-thee-suiker", "dranken", "olijfolie", "zout-pepermolen"] },
    { slug: "geschenk", name: "Geschenken & non-food", cats: ["adventskalenders", "gourmet-geschenkmand", "drinkflessen", "paraplus"] }
  ];

  const BRANDS = [
    { slug: "galler",           name: "Galler" },
    { slug: "jules-destrooper", name: "Jules Destrooper" },
    { slug: "leonidas",         name: "Leonidas" },
    { slug: "mentos",           name: "Mentos" },
    { slug: "tic-tac",          name: "Tic Tac" },
    { slug: "generous",         name: "Generous" },
    { slug: "joris",            name: "Joris" },
    { slug: "huismerk",         name: "Zonder merk / huismerk" }
  ];

  // Gelegenheden en HoReCa-toepassingen zitten bewust in één facet.
  // Zie overdrachtsdocument §6.1: HoReCa is te smal (2 waarden) voor
  // een eigen hoofdcategorie en wordt filterwaarde.
  // Volgorde is functioneel: gelijke groepen moeten aaneensluiten,
  // anders herhaalt het subkopje zich in het filterpaneel.
  const OCCASIONS = [
    { slug: "halloween",       name: "Halloween",       group: "Gelegenheid" },
    { slug: "sinterklaas",     name: "Sinterklaas",     group: "Gelegenheid" },
    { slug: "kerst",           name: "Kerst",           group: "Gelegenheid" },
    { slug: "pasen",           name: "Pasen",           group: "Gelegenheid" },
    { slug: "zomer",           name: "Zomer",           group: "Gelegenheid" },
    { slug: "complimentendag", name: "Complimentendag", group: "Gelegenheid" },
    { slug: "klantendag",      name: "Klantendag",      group: "Gelegenheid" },
    { slug: "onboarding",      name: "Onboarding",      group: "Toepassing"  },
    { slug: "board-room",      name: "Board room",      group: "Toepassing"  },
    { slug: "bedrijfsfeest",   name: "Bedrijfsfeest",   group: "Toepassing"  },
    { slug: "front-desk",      name: "Front desk",      group: "HoReCa"      },
    { slug: "coffee-corner",   name: "Coffee corner",   group: "HoReCa"      }
  ];

  const PACKAGING = [
    { slug: "metalen-doos",  name: "Metalen doos" },
    { slug: "plastic-doos",  name: "Plastic doos" },
    { slug: "kartonnen-doos", name: "Kartonnen doos" },
    { slug: "zak",           name: "Zak" },
    { slug: "los",           name: "Los / per stuk" }
  ];

  const AVAILABILITY = [
    { slug: "voorraad", name: "Op voorraad" },
    { slug: "aanvraag", name: "Op aanvraag" }
  ];

  /* ---------- deterministische generator ----------
     Vaste seed: elke paginalading geeft exact dezelfde catalogus,
     zodat aantallen in filters en breadcrumbs kloppen tussen pagina's. */

  let seed = 20260730;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const pickSome = (arr, min, max) => {
    const n = min + Math.floor(rnd() * (max - min + 1));
    const pool = arr.slice();
    const out = [];
    for (let i = 0; i < n && pool.length; i++) {
      out.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
    }
    return out;
  };

  /* Per categorie: hoe een productnaam eruitziet, welke merken plausibel
     zijn, welke verpakkingen en welke variantassen bestaan.
     Namen zijn generiek-beschrijvend, geen finale copy. */
  const RECIPE = {
    "chocolade-pralines": {
      nouns: ["Pralinedoos", "Assortiment pralines", "Chocoladetablet", "Mendiants", "Chocolade batons", "Truffels"],
      sizes: ["125 g", "250 g", "375 g", "500 g", "12 st", "24 st"],
      brands: ["galler", "leonidas", "joris", "huismerk"],
      packaging: ["metalen-doos", "plastic-doos", "kartonnen-doos"],
      variants: [
        { label: "Inhoud / smaak", options: ["Melk", "Puur 72%", "Wit", "Gemengd"] },
        { label: "Verpakking / kleur", options: ["Wit", "Zilver", "Mat-zilver", "Goud"] }
      ]
    },
    "koekjes": {
      nouns: ["Koekjesdoos", "Speculoos", "Butter crisp", "Koekjesassortiment", "Wafeltjes"],
      sizes: ["100 g", "200 g", "350 g", "8 st", "16 st"],
      brands: ["jules-destrooper", "generous", "huismerk"],
      packaging: ["metalen-doos", "kartonnen-doos", "zak"],
      variants: [{ label: "Inhoud / smaak", options: ["Naturel", "Amandel", "Kaneel"] }]
    },
    "macarons": {
      nouns: ["Macarons doos", "Macarons assortiment"],
      sizes: ["6 st", "12 st", "24 st"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "plastic-doos"],
      variants: [{ label: "Inhoud / smaak", options: ["Gemengd", "Framboos", "Pistache", "Vanille"] }]
    },
    "mellow-cakes": {
      nouns: ["Mellow cakes", "Marshmallow cakes", "Chocolate mellows"],
      sizes: ["150 g", "300 g", "12 st"],
      brands: ["huismerk", "joris"],
      packaging: ["kartonnen-doos", "zak"],
      variants: [{ label: "Inhoud / smaak", options: ["Melk", "Puur"] }]
    },
    "snoep-lollys": {
      nouns: ["Snoepmix", "Lolly's", "Cuberdons", "Zure matten", "Winegums", "Snoepblik"],
      sizes: ["100 g", "250 g", "500 g", "1 kg", "50 st"],
      brands: ["joris", "huismerk"],
      packaging: ["zak", "plastic-doos", "metalen-doos"],
      variants: [{ label: "Inhoud / smaak", options: ["Fruitmix", "Cola", "Zuur"] }]
    },
    "pepermunt-kauwgom": {
      nouns: ["Pepermunt blikje", "Kauwgom display", "Mints", "Mint rolls"],
      sizes: ["18 g", "50 g", "24 st", "100 st"],
      brands: ["mentos", "tic-tac", "huismerk"],
      packaging: ["metalen-doos", "plastic-doos", "los"],
      variants: [{ label: "Inhoud / smaak", options: ["Pepermunt", "Munt", "Fruit"] }]
    },
    "adventskalenders": {
      nouns: ["Adventskalender", "Adventskalender met logo", "Adventskalender deluxe"],
      sizes: ["24 vakjes", "24 vakjes XL", "12 vakjes"],
      brands: ["huismerk", "leonidas", "galler"],
      packaging: ["kartonnen-doos"],
      variants: [
        { label: "Inhoud / smaak", options: ["Melkchocolade", "Gemengd", "Snoep"] },
        { label: "Verpakking / kleur", options: ["Wit", "Kraft", "Zwart"] }
      ]
    },
    "noten-zoute-snacks": {
      nouns: ["Notenmix", "Cashewnoten", "Zoute snackmix", "Borrelnoten"],
      sizes: ["150 g", "300 g", "500 g"],
      brands: ["huismerk", "generous"],
      packaging: ["zak", "metalen-doos"],
      variants: [{ label: "Inhoud / smaak", options: ["Gezouten", "Ongezouten", "Gemengd"] }]
    },
    "gezonde-snacks-granola": {
      nouns: ["Granolareep", "Fruitmix", "Gedroogd fruit", "Notenreep"],
      sizes: ["40 g", "100 g", "12 st", "24 st"],
      brands: ["generous", "huismerk"],
      packaging: ["zak", "kartonnen-doos"],
      variants: [{ label: "Inhoud / smaak", options: ["Bio", "Fairtrade", "Suikervrij"] }]
    },
    "koffie-thee-suiker": {
      nouns: ["Koffiepads", "Theeassortiment", "Suikersticks", "Koffiebonen"],
      sizes: ["250 g", "500 g", "100 st", "200 st"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "zak", "los"],
      variants: [{ label: "Inhoud / smaak", options: ["Bio", "Fairtrade", "Standaard"] }]
    },
    "dranken": {
      nouns: ["Fruitsap", "Bruiswater", "Streekbier", "Limonade"],
      sizes: ["25 cl", "33 cl", "75 cl", "6 st"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "los"],
      variants: [{ label: "Inhoud / smaak", options: ["Appel", "Sinaas", "Neutraal"] }]
    },
    "olijfolie": {
      nouns: ["Olijfolie extra vierge", "Olijfolie geschenkfles"],
      sizes: ["100 ml", "250 ml", "500 ml"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "los"],
      variants: [{ label: "Verpakking / kleur", options: ["Klare fles", "Donkere fles"] }]
    },
    "zout-pepermolen": {
      nouns: ["Zout- & pepermolen set", "Pepermolen", "Zoutmolen"],
      sizes: ["set van 2", "per stuk"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "los"],
      variants: [{ label: "Verpakking / kleur", options: ["Hout", "Zwart", "Transparant"] }]
    },
    "gourmet-geschenkmand": {
      nouns: ["Gourmet geschenkmand", "Geschenkbox samengesteld", "Kerstpakket"],
      sizes: ["klein", "medium", "groot"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos"],
      variants: [{ label: "Inhoud / smaak", options: ["Zoet", "Zoet & hartig", "Bio"] }]
    },
    "drinkflessen": {
      nouns: ["Drinkfles RVS", "Drinkfles glas", "Thermosfles"],
      sizes: ["350 ml", "500 ml", "750 ml"],
      brands: ["huismerk"],
      packaging: ["kartonnen-doos", "los"],
      variants: [{ label: "Verpakking / kleur", options: ["Wit", "Zwart", "RVS"] }]
    },
    "paraplus": {
      nouns: ["Paraplu", "Opvouwbare paraplu", "Golfparaplu"],
      sizes: ["Ø 100 cm", "Ø 120 cm", "compact"],
      brands: ["huismerk"],
      packaging: ["los", "kartonnen-doos"],
      variants: [{ label: "Verpakking / kleur", options: ["Zwart", "Wit", "Grijs"] }]
    }
  };

  const MIN_QTY = [1, 6, 12, 24, 50, 100, 250, 500, 1000];

  const PRODUCTS = [];
  let n = 0;

  CATEGORIES.forEach((cat) => {
    const r = RECIPE[cat.slug];
    const usedNames = new Set();

    for (let i = 0; i < cat.count; i++) {
      n++;
      let name = pick(r.nouns) + " " + pick(r.sizes);
      let guard = 0;
      while (usedNames.has(name) && guard++ < 12) {
        name = pick(r.nouns) + " " + pick(r.sizes);
      }
      if (usedNames.has(name)) name += " · var. " + i;
      usedNames.add(name);

      const min = pick(MIN_QTY);
      const occ = pickSome(OCCASIONS.map((o) => o.slug), 1, 3);

      PRODUCTS.push({
        id: "P" + String(1000 + n),
        sku: "BS-" + String(10000 + n),
        name: name,
        cat: cat.slug,
        // Rouleert over de beelden van de categorie (zie CATEGORIES.imgs).
        // Deterministisch op de index, dus een product houdt zijn beeld
        // bij elke render — anders springt het raster bij elk filter.
        img: cat.imgs ? cat.imgs[i % cat.imgs.length] : null,
        brand: pick(r.brands),
        packaging: pick(r.packaging),
        occasions: occ,
        availability: rnd() < 0.55 ? "voorraad" : "aanvraag",
        minQty: min,
        multiple: min >= 100 ? min / 2 : min,
        variants: r.variants,
        hasFiche: rnd() < 0.6,
        // vlaggen die homepage-secties voeden
        bestseller: rnd() < 0.12,
        seasonal: occ.some((o) => ["kerst", "pasen", "halloween", "sinterklaas"].includes(o)) && rnd() < 0.4,
        promo: rnd() < 0.07,
        newness: n // hoger = recenter, voor sortering "Nieuwste"
      });
    }
  });

  /* ---------- afgeleide tellers ---------- */

  const countBy = (key) => {
    const map = {};
    PRODUCTS.forEach((p) => {
      const v = p[key];
      (Array.isArray(v) ? v : [v]).forEach((x) => { map[x] = (map[x] || 0) + 1; });
    });
    return map;
  };

  const catCounts = countBy("cat");
  CATEGORIES.forEach((c) => { c.count = catCounts[c.slug] || 0; });
  BRANDS.forEach((b) => { b.count = countBy("brand")[b.slug] || 0; });
  OCCASIONS.forEach((o) => { o.count = countBy("occasions")[o.slug] || 0; });
  PACKAGING.forEach((p) => { p.count = countBy("packaging")[p.slug] || 0; });
  AVAILABILITY.forEach((a) => { a.count = countBy("availability")[a.slug] || 0; });

  /* ---------- lookups ---------- */

  // Families krijgen hun categorie-objecten en een totaal, zodat het
  // overzicht nergens handmatig bijgehouden hoeft te worden.
  FAMILIES.forEach((f) => {
    f.categories = f.cats.map((s) => CATEGORIES.find((c) => c.slug === s)).filter(Boolean);
    f.count = f.categories.reduce((n, c) => n + c.count, 0);
  });

  const byId = (id) => PRODUCTS.find((p) => p.id === id) || null;
  const label = (list, slug) => {
    const hit = list.find((x) => x.slug === slug);
    return hit ? hit.name : slug;
  };

  return {
    CATEGORIES, FAMILIES, BRANDS, OCCASIONS, PACKAGING, AVAILABILITY, PRODUCTS,
    byId,
    catName:  (s) => label(CATEGORIES, s),
    brandName: (s) => label(BRANDS, s),
    occName:  (s) => label(OCCASIONS, s),
    packName: (s) => label(PACKAGING, s),
    availName: (s) => label(AVAILABILITY, s)
  };
})();
