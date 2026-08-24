/* ============================================================
   Belgosweet — HiFi — gedeelde shell & interacties
   ------------------------------------------------------------
   Alles wat de structuur écht laat werken:
   - gedeelde header/footer (één bron, geen kopieerwerk per pagina)
   - offertelijst-state (er is geen webshop: enkel een offertelijst)
   - werkende filters, sortering, paginering, zoek
   - variantkeuze via klik (geen hover — zie overdracht §6.3)

   Bewust geen framework, geen build. Open de map met een
   statische server en het werkt.
   ============================================================ */

const BS = (() => {
  const D = BS_DATA;

  // Meteen zetten, niet in DOMContentLoaded: de CSS verbergt
  // reveal-elementen alléén als deze vlag er staat. Draait er geen
  // JavaScript, dan blijft de pagina gewoon zichtbaar.
  document.documentElement.classList.add("js");

  /* ---------- helpers ---------- */

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* Opslag. Op file:// kan localStorage geblokkeerd zijn — dan valt
     alles terug op geheugen, zodat de prototype niet stukloopt. */
  const memory = {};
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return key in memory ? memory[key] : fallback;
      }
    },
    set(key, value) {
      memory[key] = value;
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* geheugen volstaat */ }
    }
  };

  /* ---------- offertelijst ----------
     Geen winkelmandje, geen checkout, geen prijzen.
     Enkel een lijst die uiteindelijk een offerte-aanvraag wordt. */

  const QUOTE_KEY = "bs-midfi-quote";
  const QUOTE_SENT_KEY = "bs-midfi-quote-sent";

  const quote = {
    items() { return store.get(QUOTE_KEY, []); },
    count() { return quote.items().reduce((n, it) => n + 1, 0); },
    units() { return quote.items().reduce((n, it) => n + it.qty, 0); },
    add(id, qty, variants) {
      const items = quote.items();
      const key = JSON.stringify(variants || {});
      const hit = items.find((it) => it.id === id && JSON.stringify(it.variants || {}) === key);
      if (hit) hit.qty += qty; else items.push({ id, qty, variants: variants || {} });
      store.set(QUOTE_KEY, items);
      quote.sync();
    },
    setQty(index, qty) {
      const items = quote.items();
      if (!items[index]) return;
      items[index].qty = Math.max(1, qty);
      store.set(QUOTE_KEY, items);
      quote.sync();
    },
    remove(index) {
      const items = quote.items();
      items.splice(index, 1);
      store.set(QUOTE_KEY, items);
      quote.sync();
    },
    clear() { store.set(QUOTE_KEY, []); quote.sync(); },
    sync() {
      const n = quote.count();
      $$("[data-quote-count]").forEach((el) => {
        el.textContent = n;
        // De tas toont pas een teller als er iets in zit; de knop zelf
        // blijft altijd actief — een lege lijst is geen foutstaat.
        if (el.hasAttribute("data-empty")) el.setAttribute("data-empty", String(n === 0));
      });
      document.dispatchEvent(new CustomEvent("bs:quote"));
    }
  };

  /* ---------- laatst bekeken ---------- */

  const RECENT_KEY = "bs-midfi-recent";
  const recent = {
    list() { return store.get(RECENT_KEY, []).map(D.byId).filter(Boolean); },
    push(id) {
      const ids = store.get(RECENT_KEY, []).filter((x) => x !== id);
      ids.unshift(id);
      store.set(RECENT_KEY, ids.slice(0, 8));
    }
  };

  /* ============================================================
     Header & footer — één definitie voor alle pagina's
     ============================================================ */

  // "Home" staat bewust niet in de navigatie — het woordmerk is de
  // weg terug. Twee items houden de balk leesbaar; alles wat de
  // klant-excel als hoofdmenu voorstelde, zit als filter onder Shop.
  const NAV = [
    { href: "shop.html",     label: "Shop",     page: "shop" },
    { href: "over-ons.html", label: "Over ons", page: "over-ons" }
  ];
  const NAV_PARENT = { categorie: "shop", product: "shop" };

  const ICON = {
    search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="9" cy="9" r="6"/><path d="m13.5 13.5 3.5 3.5"/></svg>',
    account: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="6.6" r="3.4"/><path d="M3.6 17.2c.6-3.4 3.2-5.2 6.4-5.2s5.8 1.8 6.4 5.2"/></svg>',
    bag: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M3.6 6.4h12.8l-1 10.2H4.6z"/><path d="M7.2 8.2V5.6a2.8 2.8 0 0 1 5.6 0v2.6"/></svg>',
    menu: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 6.5h14M3 13.5h14"/></svg>',
    close: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="m5 5 10 10M15 5 5 15"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h11M9.5 4l4 4-4 4"/></svg>'
  };

  function renderHeader(page) {
    const active = NAV_PARENT[page] || page;

    return `
<header class="site-header" data-header>
  <div class="wrap-wide header-grid">
    <nav class="nav-left" aria-label="Hoofdnavigatie">
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="Menu openen">${ICON.menu}</button>
      ${NAV.map((n) => `<a href="${n.href}"${n.page === active ? ' class="active" aria-current="page"' : ""}${
        n.page === "shop" ? ' data-mega-trigger aria-expanded="false"' : ""
      }>${n.label}</a>`).join("")}
    </nav>

    <a class="wordmark" href="index.html" aria-label="Belgosweet — naar de startpagina">
      <img src="assets/logo/Logo-Dark.svg" alt="Belgosweet" width="294" height="63">
    </a>

    <div class="nav-right">
      <div class="lang-switch">
        <a href="#" class="active" aria-current="true">NL</a><span class="div">/</span><a href="#">FR</a><span class="div">/</span><a href="#">EN</a>
      </div>
      <button class="icon-btn search-toggle" type="button" data-search-toggle aria-expanded="false" aria-label="Zoeken">${ICON.search}</button>
      <a class="icon-btn account" href="account.html" aria-label="Account">${ICON.account}</a>
      <a class="icon-btn bag" href="offerte.html" aria-label="Offertelijst">
        ${ICON.bag}<span class="count" data-quote-count data-empty="true">0</span>
      </a>
    </div>
  </div>

  <div class="mega" data-mega>
    <div><div class="wrap-wide">
      <div class="mega-inner">
        ${D.FAMILIES.map((f) => `
        <div class="mega-col">
          <a class="mega-col-title" href="shop.html?cat=${f.cats.join(",")}">${esc(f.name)}</a>
          ${f.categories.map((c) => `
          <a href="categorie.html?cat=${c.slug}">${esc(c.name)}<span>${c.count}</span></a>`).join("")}
        </div>`).join("")}
      </div>
      <div class="mega-foot">
        <span>${D.PRODUCTS.length} producten · prijs steeds op aanvraag</span>
        <a class="ulink" href="shop.html">Alle 16 categorieën met filters</a>
      </div>
    </div></div>
  </div>

  <div class="search-panel" data-search-panel>
    <div><div class="wrap-wide">
      <form role="search" action="shop.html" method="get">
        <input type="search" name="q" placeholder="Zoek een product, merk of categorie" aria-label="Zoekterm" data-search-input>
        <span class="hint">Enter om te zoeken</span>
      </form>
    </div></div>
  </div>
</header>

<div class="mobile-drawer" data-drawer>
  <div>
    ${NAV.map((n) => `<a href="${n.href}">${n.label}${ICON.arrow}</a>`).join("")}
    <a href="account.html">Account${ICON.arrow}</a>
    <a href="offerte.html">Offertelijst<span class="quote-count" data-quote-count>0</span></a>
    <div class="drawer-foot">
      <form role="search" action="shop.html" method="get" style="display:flex;gap:10px;">
        <input type="search" name="q" placeholder="Zoeken" aria-label="Zoekterm"
               style="flex:1;border:1px solid var(--rule-2);padding:13px 15px;border-radius:100px;font-size:0.9375rem;">
      </form>
      <div class="lang-switch" style="font-size:0.8125rem;">
        <a href="#" class="active">NL</a><span class="div">/</span><a href="#">FR</a><span class="div">/</span><a href="#">EN</a>
      </div>
    </div>
  </div>
</div>`;
  }

  function renderFooter() {
    const cats = D.CATEGORIES.slice(0, 5)
      .map((c) => `<a href="categorie.html?cat=${c.slug}">${esc(c.name)}</a>`).join("");

    return `
<footer class="site-footer">
  <div class="wrap-wide">
    <div class="footer-brand">
      <!-- Crème-versie: de footer is een donkergroen vlak. -->
      <img src="assets/logo/Logo-Light.svg" alt="Belgosweet" width="294" height="63">
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <div class="footer-col-title">Shop</div>
        ${cats}
        <a href="shop.html">Alle categorieën</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Info</div>
        <a href="over-ons.html">Over ons</a>
        <a href="over-ons.html#engagement">Sociaal engagement</a>
        <a href="info.html?p=printtechnologie">Printtechnologie</a>
        <a href="account.html">Account</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Support</div>
        <a href="over-ons.html#contact">Contact</a>
        <a href="offerte.html">Offerte aanvragen</a>
        <a href="info.html?p=voorwaarden">Voorwaarden</a>
        <a href="info.html?p=privacy">Privacybeleid</a>
        <a href="info.html?p=cookies">Cookiebeleid</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Contact</div>
        <p>Boulevard de l'Europe 123<br>1300 Waver<br>+32 2 351 55 55<br>info@belgosweet.be</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="lang-switch"><a href="#" class="active">NL</a><a href="#">FR</a><a href="#">EN</a></span>
      <span>© Belgosweet — HiFi prototype</span>
    </div>
  </div>
</footer>`;
  }

  /* ---------- shell mounten ---------- */

  function mountShell() {
    const page = document.body.dataset.page || "";
    const head = $("#shell-header");
    const foot = $("#shell-footer");
    if (head) head.innerHTML = renderHeader(page);
    if (foot) foot.innerHTML = renderFooter();

    // mobiel menu
    const toggle = $("[data-nav-toggle]");
    const drawer = $("[data-drawer]");
    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        const open = drawer.classList.toggle("open");
        toggle.innerHTML = open ? ICON.close : ICON.menu;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
        document.body.style.overflow = open ? "hidden" : "";
      });
    }

    /* Shop-dropdown. Opent op hover én op toetsenbordfocus, sluit
       zodra de muis de hele header verlaat — niet al bij het verlaten
       van het linkje zelf, want dan valt hij dicht terwijl je ernaartoe
       beweegt. De korte vertraging vangt het diagonaal wegschieten op. */
    const mega = $("[data-mega]");
    const megaTrigger = $("[data-mega-trigger]");
    const header = $("[data-header]");
    if (mega && megaTrigger && header) {
      let closeTimer;
      // Na Escape mag het terugzetten van de focus het paneel niet
      // meteen heropenen. De onderdrukking vervalt zodra je de knop
      // echt verlaat, zodat hover daarna gewoon weer werkt.
      let suppress = false;
      const openMega = () => {
        if (suppress) return;
        clearTimeout(closeTimer);
        mega.classList.add("open");
        megaTrigger.setAttribute("aria-expanded", "true");
      };
      const closeMega = (delay) => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          mega.classList.remove("open");
          megaTrigger.setAttribute("aria-expanded", "false");
        }, delay || 0);
      };

      megaTrigger.addEventListener("mouseenter", openMega);
      megaTrigger.addEventListener("focus", openMega);
      megaTrigger.addEventListener("mouseleave", () => { suppress = false; });
      megaTrigger.addEventListener("blur", () => { suppress = false; });
      mega.addEventListener("mouseenter", () => clearTimeout(closeTimer));
      header.addEventListener("mouseleave", () => closeMega(120));

      // sluit zodra de focus de header verlaat (tabben)
      header.addEventListener("focusout", (e) => {
        if (!header.contains(e.relatedTarget)) closeMega();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mega.classList.contains("open")) {
          suppress = true;
          closeMega();
          megaTrigger.focus();
        }
      });
    }

    // zoekpaneel
    const sTog = $("[data-search-toggle]");
    const sPanel = $("[data-search-panel]");
    if (sTog && sPanel) {
      sTog.addEventListener("click", () => {
        const open = sPanel.classList.toggle("open");
        sTog.setAttribute("aria-expanded", String(open));
        sTog.innerHTML = open ? ICON.close : ICON.search;
        if (open) setTimeout(() => { const i = $("[data-search-input]"); if (i) i.focus(); }, 60);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sPanel.classList.contains("open")) {
          sPanel.classList.remove("open");
          sTog.setAttribute("aria-expanded", "false");
          sTog.innerHTML = ICON.search;
          sTog.focus();
        }
      });
    }

    // zoekveld vooraf invullen met de actieve zoekterm
    const q = new URLSearchParams(location.search).get("q");
    if (q) $$(".header-search input").forEach((i) => { i.value = q; });

    quote.sync();
  }

  /* ============================================================
     Herbruikbare renders
     ============================================================ */

  function badges(p) {
    const out = [];
    if (p.promo) out.push('<span class="badge promo">Promo</span>');
    if (p.bestseller) out.push('<span class="badge">Bestseller</span>');
    if (p.seasonal) out.push('<span class="badge">Seizoen</span>');
    if (p.availability === "voorraad") out.push('<span class="badge">Op voorraad</span>');
    return out.length ? `<div class="badges">${out.join("")}</div>` : "";
  }

  function productCard(p) {
    return `
<a class="card" href="product.html?id=${p.id}">
  <div class="ph square"></div>
  ${badges(p)}
  <div class="card-title">${esc(p.name)}</div>
  <div class="card-meta">${esc(D.brandName(p.brand))}</div>
  <div class="ledger">
    <span class="ledger-n">${p.minQty}</span>
    <span class="ledger-u">stuks min.</span>
  </div>
</a>`;
  }

  /* Beschrijvende tekst uit de productdata. De definitieve copy komt van de
     klant (overdracht §8); tot dan leest dit als een echte productbeschrijving
     in plaats van als vulbalken. */
  function productBlurb(p) {
    const merk = p.brand === "huismerk" ? "onder eigen label" : "van " + D.brandName(p.brand);
    const occ = (p.occasions || []).slice(0, 3).map((o) => D.occName(o).toLowerCase());
    const occZin = occ.length
      ? ` Vaak gevraagd voor ${occ.length > 1 ? occ.slice(0, -1).join(", ") + " en " + occ.slice(-1) : occ[0]}.`
      : "";
    const voorraad = p.availability === "voorraad"
      ? "Doorgaans uit voorraad leverbaar."
      : "Op aanvraag — levertermijn stemmen we af bij de offerte.";
    return `
<p>${esc(p.name)} ${esc(merk)}, geleverd in ${esc(D.packName(p.packaging).toLowerCase())}.
Afname vanaf ${p.minQty} stuks, per veelvoud van ${p.multiple}.${esc(occZin)}</p>
<p>Te personaliseren met je eigen logo op sleeve of verpakking. ${voorraad}
Prijs volgt uit de offerte en hangt af van je oplage.</p>`;
  }

  /* Rustige tegel voor de catalogus-grids: beeld + naam, verder niets.
     Merk, prijsregel en minimumafname staan op de productpagina. */
  function productCardQuiet(p) {
    return `
<a class="card quiet" href="product.html?id=${p.id}">
  <div class="ph square"></div>
  <div class="card-title">${esc(p.name)}</div>
  <div class="ledger">
    <span class="ledger-n">${p.minQty}</span>
    <span class="ledger-u">stuks min.</span>
  </div>
</a>`;
  }

  /* Markeringen liggen ÓP het beeld, niet erboven. Zo verschilt een tegel
     mét markering niet in hoogte van een tegel zonder, en blijft elke rij
     van het raster op dezelfde lijn beginnen. Twee stuks is het maximum:
     wat de klant hier moet zien is "scherp geprijsd" en "snel leverbaar". */
  function cardMarks(p) {
    const out = [];
    if (p.promo) out.push('<span class="mk mk-promo">Promo</span>');
    if (p.availability === "voorraad") out.push('<span class="mk">Op voorraad</span>');
    return out.length ? `<div class="card-marks">${out.join("")}</div>` : "";
  }

  /* De catalogustegel: de rustige tegel plus die markeringen. */
  function productCardCatalog(p) {
    return `
<a class="card quiet" href="product.html?id=${p.id}">
  <div class="card-media">
    <div class="ph square"></div>
    ${cardMarks(p)}
  </div>
  <div class="card-title">${esc(p.name)}</div>
  <div class="ledger">
    <span class="ledger-n">${p.minQty}</span>
    <span class="ledger-u">stuks min.</span>
  </div>
</a>`;
  }

  function productGrid(list, cols) {
    return `<div class="grid cols-${cols || 4}">${list.map(productCard).join("")}</div>`;
  }

  /* Eén gelijkmatig raster. Eerder stonden hier grote editorial-tegels
     tussen de producten; in een lijst waarin je vergelijkt en filtert
     breken die het scanritme — elke rij begint dan op een andere hoogte. */
  function catalogGrid(list, wide) {
    return `<div class="catalog-grid${wide ? " wide" : ""}">${
      list.map(productCardCatalog).join("")
    }</div>`;
  }

  function categoryTile(c) {
    return `
<a class="tile" href="categorie.html?cat=${c.slug}">
  <div class="ph square"></div>
  <div class="tile-body">
    <span class="tile-name">${esc(c.name)}</span>
    <span class="tile-count">${c.count}</span>
  </div>
</a>`;
  }

  /* Offerteflow: één pagina per stap. Afgelegde stappen blijven
     klikbaar zodat je je lijst kunt bijstellen zonder opnieuw te
     beginnen; de stap die nog moet komen is dat niet. */
  const QUOTE_STEPS = [
    { n: 1, label: "Je lijst samenstellen", href: "offerte.html" },
    { n: 2, label: "Je gegevens",           href: "offerte-gegevens.html" },
    { n: 3, label: "Bevestiging",           href: null }
  ];

  function renderSteps(active) {
    return `<nav class="steps" aria-label="Voortgang offerteaanvraag">${
      QUOTE_STEPS.map((s) => {
        const inner = `<b>Stap ${s.n}</b>${esc(s.label)}`;
        if (s.n === active) return `<span class="step active" aria-current="step">${inner}</span>`;
        if (s.n < active && s.href) return `<a class="step done" href="${s.href}">${inner}</a>`;
        return `<span class="step">${inner}</span>`;
      }).join("")
    }</nav>`;
  }

  function crumbs(parts) {
    return parts.map((p, i) => {
      const last = i === parts.length - 1;
      const sep = i ? '<span class="sep">/</span>' : "";
      return sep + (last || !p.href
        ? `<span>${esc(p.label)}</span>`
        : `<a href="${p.href}">${esc(p.label)}</a>`);
    }).join("");
  }

  /* ============================================================
     Catalogus-engine — gedeeld door shop.html en categorie.html
     ============================================================ */

  // Elk facet toont standaard zes waarden; de rest komt achter
  // "toon alle". Vijf volledig uitgeklapte lijsten maken van het
  // paneel een muur van vinkjes.
  const FACETS = [
    { key: "cat",   title: "Categorie",                 list: () => D.CATEGORIES,   field: "cat",          limit: 6 },
    { key: "brand", title: "Merk",                      list: () => D.BRANDS,       field: "brand",        limit: 6 },
    { key: "occ",   title: "Gelegenheid &amp; toepassing", list: () => D.OCCASIONS, field: "occasions",    grouped: true, note: "incl. HoReCa", limit: 6 },
    { key: "pack",  title: "Verpakking",                list: () => D.PACKAGING,    field: "packaging" },
    { key: "avail", title: "Beschikbaarheid",           list: () => D.AVAILABILITY, field: "availability" }
  ];

  const SORTS = [
    { key: "relevantie", label: "Relevantie",        fn: null },
    { key: "naam-az",    label: "Naam A–Z",          fn: (a, b) => a.name.localeCompare(b.name, "nl") },
    { key: "naam-za",    label: "Naam Z–A",          fn: (a, b) => b.name.localeCompare(a.name, "nl") },
    { key: "nieuwste",   label: "Nieuwste eerst",    fn: (a, b) => b.newness - a.newness },
    { key: "voorraad",   label: "Op voorraad eerst", fn: (a, b) => (a.availability === "voorraad" ? 0 : 1) - (b.availability === "voorraad" ? 0 : 1) }
  ];

  const PER_PAGE = 12;

  function matches(p, sel, skipKey) {
    for (const f of FACETS) {
      if (f.key === skipKey) continue;
      const chosen = sel[f.key];
      if (!chosen || !chosen.length) continue;
      const val = p[f.field];
      const ok = Array.isArray(val) ? val.some((v) => chosen.includes(v)) : chosen.includes(val);
      if (!ok) return false;
    }
    if (sel.q) {
      const hay = (p.name + " " + p.sku + " " + D.brandName(p.brand) + " " + D.catName(p.cat)).toLowerCase();
      if (!hay.includes(sel.q.toLowerCase())) return false;
    }
    return true;
  }

  const FILTERS_KEY = "bs-midfi-filters-open";

  function makeCatalog(opts) {
    const root      = $(opts.root);
    const lockedCat = opts.lockedCat || null;      // categoriepagina: categorie ligt vast
    const hideCat   = !!lockedCat;
    const state = {
      sel: {}, sort: "relevantie", page: 1, expanded: {},
      // filterpaneel staat standaard open op desktop, dicht op smal scherm
      filtersOpen: store.get(FILTERS_KEY, window.innerWidth > 900)
    };

    /* --- URL lezen --- */
    function readURL() {
      const q = new URLSearchParams(location.search);
      FACETS.forEach((f) => {
        const raw = q.get(f.key);
        state.sel[f.key] = raw ? raw.split(",").filter(Boolean) : [];
      });
      if (lockedCat) state.sel.cat = [lockedCat];
      state.sel.q = q.get("q") || "";
      state.sort = SORTS.some((s) => s.key === q.get("sort")) ? q.get("sort") : "relevantie";
      state.page = Math.max(1, parseInt(q.get("page"), 10) || 1);
    }

    /* --- URL schrijven (deelbare, terug-knop-vriendelijke filterstaat) --- */
    function writeURL() {
      const q = new URLSearchParams();
      FACETS.forEach((f) => {
        if (f.key === "cat" && lockedCat) return;
        if (state.sel[f.key] && state.sel[f.key].length) q.set(f.key, state.sel[f.key].join(","));
      });
      if (lockedCat) q.set("cat", lockedCat);
      if (state.sel.q) q.set("q", state.sel.q);
      if (state.sort !== "relevantie") q.set("sort", state.sort);
      if (state.page > 1) q.set("page", state.page);
      const url = location.pathname + (q.toString() ? "?" + q : "");
      try { history.replaceState(null, "", url); } catch (e) { /* file:// — niet kritiek */ }
    }

    function results() {
      let list = D.PRODUCTS.filter((p) => matches(p, state.sel));
      const sort = SORTS.find((s) => s.key === state.sort);
      if (sort && sort.fn) list = list.slice().sort(sort.fn);
      return list;
    }

    /* --- filterpaneel --- */
    function renderFilters(list) {
      const activeCount = FACETS.reduce((n, f) =>
        n + ((f.key === "cat" && lockedCat) ? 0 : (state.sel[f.key] || []).length), 0);

      const groups = FACETS.filter((f) => !(f.key === "cat" && hideCat)).map((f) => {
        const items = f.list();
        const chosen = state.sel[f.key] || [];

        // Tellers houden rekening met de ándere actieve filters,
        // zodat je ziet wat een extra vinkje nog zou opleveren.
        const pool = D.PRODUCTS.filter((p) => matches(p, state.sel, f.key));
        const countFor = (slug) => pool.filter((p) => {
          const v = p[f.field];
          return Array.isArray(v) ? v.includes(slug) : v === slug;
        }).length;

        const expanded = state.expanded[f.key];
        const limit = f.limit && !expanded ? f.limit : items.length;

        let body = "";
        let lastGroup = null;
        items.slice(0, limit).forEach((it) => {
          if (f.grouped && it.group !== lastGroup) {
            lastGroup = it.group;
            body += `<div class="filter-sub">${esc(it.group)}</div>`;
          }
          const n = countFor(it.slug);
          const on = chosen.includes(it.slug);
          body += `
<label class="filter-opt${on ? " is-on" : ""}${n === 0 && !on ? " is-empty" : ""}">
  <input type="checkbox" data-facet="${f.key}" value="${it.slug}"${on ? " checked" : ""}${n === 0 && !on ? " disabled" : ""}>
  <span>${esc(it.name)}</span><span class="n">${n}</span>
</label>`;
        });

        const more = f.limit && items.length > f.limit
          ? `<button type="button" class="filter-more" data-expand="${f.key}">${expanded ? "Toon minder" : "Toon alle " + items.length}</button>`
          : "";

        return `
<div class="filter-group${chosen.length ? " is-on" : ""}">
  <div class="filter-title">
    <span>${f.title}</span>
    ${chosen.length ? `<span class="on-n">${chosen.length}</span>` : ""}
  </div>
  ${body}${more}
</div>`;
      }).join("");

      return `
<aside class="filters" data-filters>
  <div class="filters-head">
    <strong>Verfijnen</strong>
    ${activeCount ? '<button type="button" class="filters-clear" data-clear>Wis alles</button>' : ''}
  </div>
  <div class="filters-body">${groups}</div>
</aside>`;
    }

    /* --- balk met filter-toggle, telling en sortering --- */
    function renderBar(total, from, to) {
      const icon = `<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true">
        <line x1="0" y1="4.5" x2="16" y2="4.5"/><line x1="0" y1="11.5" x2="16" y2="11.5"/>
        <rect x="3.5" y="2" width="5" height="5" fill="var(--paper)"/><rect x="8" y="9" width="5" height="5" fill="var(--paper)"/></svg>`;

      const activeCount = FACETS.reduce((n, f) =>
        n + ((f.key === "cat" && lockedCat) ? 0 : (state.sel[f.key] || []).length), 0);

      return `
<div class="catalog-bar">
  <button type="button" class="filter-toggle" data-filters-toggle>
    ${icon}<span class="label">${state.filtersOpen ? "Filter verbergen" : "Filter tonen"}${activeCount ? " (" + activeCount + ")" : ""}</span>
  </button>
  <div class="catalog-bar-right">
    <span class="result-n">${total ? `${from}–${to} van <b>${total}</b> producten` : "<b>0</b> producten"}</span>
    <label>Sorteren
      <select class="sort-select" data-sort>
        ${SORTS.map((s) => `<option value="${s.key}"${s.key === state.sort ? " selected" : ""}>${s.label}</option>`).join("")}
      </select>
    </label>
  </div>
</div>`;
    }

    /* --- actieve filters als chips --- */
    function renderChips() {
      const chips = [];
      FACETS.forEach((f) => {
        if (f.key === "cat" && lockedCat) return;
        (state.sel[f.key] || []).forEach((slug) => {
          const item = f.list().find((x) => x.slug === slug);
          chips.push(`<button class="chip" type="button" data-unset="${f.key}" data-value="${slug}"><b>${f.title.replace("&amp;", "&")}:</b> ${esc(item ? item.name : slug)} <span class="x">×</span></button>`);
        });
      });
      if (state.sel.q) {
        chips.push(`<button class="chip" type="button" data-unset="q"><b>Zoek:</b> ${esc(state.sel.q)} <span class="x">×</span></button>`);
      }
      return chips.length ? `<div class="chips">${chips.join("")}</div>` : "";
    }

    /* --- paginering: één methode, niet twee zoals nu --- */
    function renderPagination(total) {
      const pages = Math.ceil(total / PER_PAGE);
      if (pages <= 1) return "";
      const btns = [];
      const add = (n) => btns.push(`<button type="button" data-page="${n}"${n === state.page ? ' class="active"' : ""}>${n}</button>`);

      btns.push(`<button type="button" data-page="${state.page - 1}"${state.page === 1 ? " disabled" : ""}>← Vorige</button>`);
      for (let n = 1; n <= pages; n++) {
        if (n === 1 || n === pages || Math.abs(n - state.page) <= 1) add(n);
        else if (Math.abs(n - state.page) === 2) btns.push('<span class="dots">…</span>');
      }
      btns.push(`<button type="button" data-page="${state.page + 1}"${state.page === pages ? " disabled" : ""}>Volgende →</button>`);
      return `<div class="pagination">${btns.join("")}</div>`;
    }

    function render() {
      const list = results();
      const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (state.page > pages) state.page = pages;
      const slice = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

      const from = list.length ? (state.page - 1) * PER_PAGE + 1 : 0;
      const to = Math.min(state.page * PER_PAGE, list.length);

      // Zonder filterpaneel is er ruimte voor een vierde kolom.
      const wide = !state.filtersOpen;

      root.innerHTML = `
${renderBar(list.length, from, to)}
<div class="shop-layout${state.filtersOpen ? "" : " filters-hidden"}">
  ${renderFilters(list)}
  <div>
    ${renderChips()}
    ${slice.length
      ? catalogGrid(slice, wide)
      : `<div class="empty-state"><strong>Geen producten binnen deze selectie</strong>Verfijn of wis een filter. <button type="button" class="filters-clear" data-clear>Wis alle filters</button></div>`}
    ${renderPagination(list.length)}
  </div>
</div>`;

      bind();
      writeURL();
    }

    function bind() {
      $$("[data-facet]", root).forEach((cb) => {
        cb.addEventListener("change", () => {
          const key = cb.dataset.facet;
          const set = new Set(state.sel[key] || []);
          cb.checked ? set.add(cb.value) : set.delete(cb.value);
          state.sel[key] = Array.from(set);
          state.page = 1;
          render();
        });
      });

      $$("[data-expand]", root).forEach((b) => b.addEventListener("click", () => {
        state.expanded[b.dataset.expand] = !state.expanded[b.dataset.expand];
        render();
      }));

      $$("[data-unset]", root).forEach((b) => b.addEventListener("click", () => {
        const key = b.dataset.unset;
        if (key === "q") state.sel.q = "";
        else state.sel[key] = (state.sel[key] || []).filter((v) => v !== b.dataset.value);
        state.page = 1;
        render();
      }));

      $$("[data-clear]", root).forEach((b) => b.addEventListener("click", () => {
        FACETS.forEach((f) => { state.sel[f.key] = (f.key === "cat" && lockedCat) ? [lockedCat] : []; });
        state.sel.q = "";
        state.page = 1;
        render();
      }));

      const sort = $("[data-sort]", root);
      if (sort) sort.addEventListener("change", () => { state.sort = sort.value; state.page = 1; render(); });

      $$("[data-page]", root).forEach((b) => b.addEventListener("click", () => {
        state.page = parseInt(b.dataset.page, 10);
        render();
        window.scrollTo({ top: root.offsetTop - 90, behavior: "smooth" });
      }));

      const ft = $("[data-filters-toggle]", root);
      if (ft) ft.addEventListener("click", () => {
        state.filtersOpen = !state.filtersOpen;
        store.set(FILTERS_KEY, state.filtersOpen);
        render();
      });
    }

    readURL();
    render();
    return { state, render, results };
  }

  /* ============================================================
     Pagina-controllers
     ============================================================ */

  const pages = {};

  /* ---------- Home ---------- */
  pages.home = () => {
    const P = D.PRODUCTS;
    const mount = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

    /* --- Catalogus: vier familieblokken in een carrousel ---
       Slides zijn families, geen losse categorieën: zestien blokken
       vegen is werk, vier is een blik. Elk blok draagt zijn eigen
       categorieën, dus het overzicht blijft compleet.
       Beeld en familienaam openen de shop met die categorieën al
       aangevinkt — de filterengine leest een komma-lijst. */
    const track = $("#cat-carousel");
    if (track) {
      track.innerHTML = D.CATEGORIES.map((c) => `
<a class="cc-slide" href="categorie.html?cat=${c.slug}">
  <div class="ph"></div>
  <div class="cc-body">
    <span class="cc-name">${esc(c.name)}</span>
    <span class="cc-n">${c.count}</span>
  </div>
</a>`).join("");

      $$(".cc-nav").forEach((b) => {
        b.innerHTML = ICON.arrow;
        if (b.dataset.cc === "-1") b.style.transform = "scaleX(-1)";
      });

      // Verschuift precies één blok per klik. Vegen werkt sowieso al
      // via native scroll — de pijlen zijn de muis-equivalent.
      // Eén scherm per klik, niet één blok. Bij zestien categorieën is
      // blok-voor-blok schuiven vijftien klikken; per scherm ben je er
      // in drie. De laatste kolom blijft net in beeld als ankerpunt.
      const slideW = () => {
        const slide = $(".cc-slide", track);
        return slide ? slide.getBoundingClientRect().width + 16 : 320;
      };
      const page = () => {
        const perView = Math.max(1, Math.floor(track.clientWidth / slideW()));
        return Math.max(1, perView - 1) * slideW();
      };
      $$("[data-cc]").forEach((b) => b.addEventListener("click", () => {
        const max = track.scrollWidth - track.clientWidth;
        let target = track.scrollLeft + parseInt(b.dataset.cc, 10) * page();
        // Uiteinden vastklemmen: anders blijf je een paar pixels voor het
        // einde hangen en staat er een pijl die niets meer doet.
        if (target > max - slideW() * 0.5) target = max;
        if (target < slideW() * 0.5) target = 0;
        track.scrollTo({ left: target, behavior: "smooth" });
      }));

      // Pijlen verdwijnen aan de uiteinden i.p.v. dood te klikken.
      const sync = () => {
        const max = track.scrollWidth - track.clientWidth;
        const prev = $(".cc-prev"), next = $(".cc-next");
        if (prev) prev.disabled = track.scrollLeft <= 4;
        if (next) next.disabled = track.scrollLeft >= max - 4;
      };
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
    }

    /* --- Seizoen: editorial blok + vier producten op volle breedte --- */
    const seasonal = P.filter((p) => p.seasonal);
    const seasonSection = $("#home-seasonal");
    if (seasonal.length) {
      mount("#home-seasonal-strip", seasonal.slice(0, 4).map(productCardQuiet).join(""));
      const n = $("#home-seasonal-count");
      if (n) n.textContent = `${seasonal.length} producten in de selectie`;
    } else if (seasonSection) {
      seasonSection.classList.add("hidden");
    }

    /* --- In de kijker --- */
    mount("#home-featured", `<div class="grid-editorial wide">${
      P.filter((p) => p.bestseller).slice(0, 4).map(productCardQuiet).join("")
    }</div>`);

    /* --- Merken --- */
    mount("#home-brands", D.BRANDS.filter((b) => b.slug !== "huismerk").map((b) =>
      `<a href="shop.html?brand=${b.slug}">${esc(b.name)}</a>`).join(""));

    /* --- Laatst bekeken: echte state, conditioneel --- */
    const rec = recent.list();
    const recSection = $("#home-recent-section");
    if (rec.length >= 2) {
      mount("#home-recent", `<div class="grid-editorial wide">${
        rec.slice(0, 4).map(productCardQuiet).join("")
      }</div>`);
    } else if (recSection) {
      recSection.classList.add("hidden");
    }

    heroWordmarkDock();
  };

  /* ---------- Woordmerk dat in de header dokt ----------
     Twee exemplaren van hetzelfde woordmerk, niet één element dat
     verhuist:

       1. het grote exemplaar staat onderaan de hero vastgeprikt
          (bottom:30px, left/right:5%) en krimpt met transform:scale(),
          transform-origin onder-midden. Er zit geen verticale translate
          in — de pagina zelf voert het omhoog;
       2. het exemplaar in de header staat gecentreerd op vaste breedte
          en begint op opacity:0.

     Op het moment dat de schaal zo ver is dat het grote exemplaar exact
     even breed is als het kleine, staan ze op dezelfde plek. In datzelfde
     frame gaat de een naar 0 en de ander naar 1. De knip is niet te zien,
     dus het leest als één logo dat de balk in schuift. Terugscrollen
     draait het gewoon om.

     De eindmaat wordt GEMETEN, niet aangenomen: als de header ooit een
     ander formaat logo krijgt, klopt de landing nog steeds. */
  function heroWordmarkDock() {
    const big = $("[data-hero-wordmark]");
    const img = big && $("img", big);
    const small = $(".site-header .wordmark img");
    if (!big || !img || !small) return;

    // Zonder animatie is de hero gewoon een hoge sectie met een groot
    // woordmerk erin, en staat het headerlogo er van meet af aan.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let end = 0;        // scrollpositie waarop het gedokt is
    let scale = 1;      // schaal op dat punt
    let shift = 0;      // horizontale correctie (normaal 0, zie hieronder)
    let live = false;
    let last = -1;
    let docked = null;

    /* Meten gebeurt met transform uitgezet. Het herstel staat in hetzelfde
       synchrone blok, dus de browser krijgt de ongeschaalde staat nooit te
       zien. */
    const measure = () => {
      big.style.transform = "none";

      const b = big.getBoundingClientRect();
      const s = small.getBoundingClientRect();

      // Beide zijn in het document gecentreerd, dus dit is in de praktijk 0.
      // Het staat er voor het geval een scrollbalk of een gutter de twee
      // middens uit elkaar duwt: dan blijft de wissel alsnog naadloos.
      shift = (s.left + s.width / 2) - (b.left + b.width / 2);

      scale = s.width / b.width;
      // Onderrand van het grote exemplaar in documentcoördinaten, minus de
      // onderrand van het kleine in schermcoördinaten (de header plakt op
      // top:0, dus die tweede waarde is constant).
      end = (b.bottom + window.scrollY) - s.bottom;

      live = end > 40 && b.width > 0 && s.width > 0 && scale < 1;
      document.body.classList.toggle("wm-dock", live);
      if (!live) {
        big.style.transform = "";
        document.body.classList.remove("wm-docked");
        docked = null;
        return;
      }
      last = -1;
      apply();
    };

    const apply = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / end));
      if (p === last) return;
      last = p;

      const k = 1 + p * (scale - 1);
      big.style.transform = `translateX(${(shift * p).toFixed(3)}px) scale(${k.toFixed(6)})`;

      // De wissel valt in hetzelfde frame als het bereiken van p = 1.
      const now = p >= 1;
      if (now !== docked) {
        docked = now;
        document.body.classList.toggle("wm-docked", now);
      }
    };

    // Elke frame kijken, niet per scroll-event: op momentum-scroll en bij
    // smooth-scroll lopen die events achter, en dan valt de wissel een paar
    // pixels naast het punt waarop de twee elkaar dekken.
    const frame = () => {
      if (live) apply();
      requestAnimationFrame(frame);
    };

    measure();
    requestAnimationFrame(frame);

    window.addEventListener("resize", measure);
    if (!img.complete) img.addEventListener("load", measure, { once: true });
    if (!small.complete) small.addEventListener("load", measure, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  /* ---------- Shop ---------- */
  pages.shop = () => {
    const el = $("#shop-crumbs");
    if (el) el.innerHTML = crumbs([{ label: "Home", href: "index.html" }, { label: "Shop" }]);

    const meta = $("#shop-hero-meta");
    if (meta) meta.innerHTML = `
<span><b>${D.PRODUCTS.length}</b> producten</span>
<span><b>${D.CATEGORIES.length}</b> categorieën</span>
<span><b>${D.BRANDS.length - 1}</b> merken</span>
<span>Prijs steeds <b>op aanvraag</b></span>`;

    makeCatalog({ root: "#shop-catalog" });
  };

  /* ---------- Categoriepagina ---------- */
  pages.categorie = () => {
    const slug = new URLSearchParams(location.search).get("cat") || D.CATEGORIES[0].slug;
    const cat = D.CATEGORIES.find((c) => c.slug === slug) || D.CATEGORIES[0];

    document.title = `Belgosweet — HiFi — ${cat.name}`;

    const c = $("#cat-crumbs");
    if (c) c.innerHTML = crumbs([
      { label: "Home", href: "index.html" },
      { label: "Shop", href: "shop.html" },
      { label: cat.name }
    ]);

    // Hero: beeld links, kop + feiten rechts. De feiten komen uit de
    // catalogus zelf — geen copy die nog geschreven moet worden.
    const t = $("#cat-hero-title"); if (t) t.textContent = cat.name;

    const m = $("#cat-hero-facts");
    if (m) {
      const inCat = D.PRODUCTS.filter((p) => p.cat === cat.slug);
      const mins = inCat.map((p) => p.minQty);
      const lo = Math.min.apply(null, mins);
      const hi = Math.max.apply(null, mins);
      const opVoorraad = inCat.filter((p) => p.availability === "voorraad").length;
      m.innerHTML = `
<span><b>${cat.count}</b> producten</span>
<span>Minimumafname <b>${lo === hi ? lo : lo + "–" + hi}</b> st.</span>
<span><b>${opVoorraad}</b> uit voorraad</span>
<span>Prijs steeds <b>op aanvraag</b></span>`;
    }

    makeCatalog({ root: "#cat-catalog", lockedCat: cat.slug });
  };

  /* ---------- Productdetail ---------- */
  pages.product = () => {
    const id = new URLSearchParams(location.search).get("id");
    const p = D.byId(id) || D.PRODUCTS[0];
    recent.push(p.id);

    document.title = `Belgosweet — HiFi — ${p.name}`;

    const c = $("#pdp-crumbs");
    if (c) c.innerHTML = crumbs([
      { label: "Home", href: "index.html" },
      { label: "Shop", href: "shop.html" },
      { label: D.catName(p.cat), href: `categorie.html?cat=${p.cat}` },
      { label: p.name }
    ]);

    const chosen = {};
    p.variants.forEach((v) => { chosen[v.label] = v.options[0]; });

    const gallery = $("#pdp-gallery");
    if (gallery) gallery.innerHTML = `
<div class="ph tall" data-main></div>
<figcaption class="pdp-caption" data-main-caption>${esc(p.variants.length ? p.variants[0].options[0] : "Standaard")}</figcaption>
<div class="pdp-thumbs">
  ${[1, 2, 3, 4, 5].map((n) => `<div class="ph${n === 1 ? " active" : ""}" data-thumb="${n}"></div>`).join("")}
</div>`;

    const info = $("#pdp-info");
    if (info) info.innerHTML = `
<p class="eyebrow"><a href="categorie.html?cat=${p.cat}">${esc(D.catName(p.cat))}</a> · ${esc(D.brandName(p.brand))}</p>
<h1 class="pdp-title">${esc(p.name)}</h1>
<div class="pdp-sku">Artikelnummer ${esc(p.sku)} · ${esc(D.packName(p.packaging))}</div>

<div class="pdp-price">
  <span class="pdp-price-k">Prijs</span>
  <span class="pdp-price-v">op aanvraag</span>
  <p class="pdp-price-note">Je prijs hangt af van je oplage en personalisatie. Zet dit artikel op je lijst; je krijgt een offerte binnen 48 uur.</p>
</div>

${p.variants.map((v, i) => `
<div class="variant-block" data-variant="${i}">
  <div class="variant-label">${esc(v.label)} <span class="chosen" data-chosen>${esc(v.options[0])}</span></div>
  <div class="variant-options">
    ${v.options.map((o, j) => `<button type="button" class="variant-opt${j === 0 ? " active" : ""}" data-opt="${esc(o)}">${esc(o)}</button>`).join("")}
  </div>
</div>`).join("")}

<div class="ledger-pair">
  <div class="ledger-col">
    <span class="ledger-k">Minimumafname</span>
    <span class="ledger-n">${p.minQty}<span class="ledger-u"> stuks</span></span>
  </div>
  <div class="ledger-col">
    <span class="ledger-k">Per veelvoud van</span>
    <span class="ledger-n">${p.multiple}</span>
  </div>
</div>

<div class="qty-row">
  <div class="qty-field">
    <label for="qty">Aantal</label>
    <div class="qty-input">
      <button type="button" data-step="-1">−</button>
      <input id="qty" type="number" value="${p.minQty}" min="${p.minQty}" step="${p.multiple}">
      <button type="button" data-step="1">+</button>
    </div>
  </div>
</div>
<div class="field-error hidden" data-qty-error></div>

<table class="stock-table">
  <tr><th>Beschikbaarheid</th><td>${esc(D.availName(p.availability))}</td></tr>
  <tr><th>Levertermijn</th><td>${p.availability === "voorraad" ? "3–5 werkdagen" : "in overleg, na offerte"}</td></tr>
  <tr><th>Verpakking</th><td>${esc(D.packName(p.packaging))}</td></tr>
</table>

<div class="cta-row">
  <button type="button" class="cta-btn primary" data-add>Toevoegen aan offertelijst</button>
  <a class="cta-btn" href="over-ons.html#contact">Contacteer ons</a>
  <span class="cta-feedback" data-feedback></span>
</div>

<div class="trust-row">
  <span>Belgisch product</span><span>Eigen logo mogelijk</span><span>B2B-levering</span><span>Offerte binnen 48 u</span>
</div>`;

    const acc = $("#pdp-accordion");
    if (acc) acc.innerHTML = `
<div class="acc">
  ${[
    ["Beschrijving", productBlurb(p), true],
    ["Specificaties", '<table class="stock-table" style="margin:0;"><tr><th>Categorie</th><td>' + esc(D.catName(p.cat)) + "</td></tr><tr><th>Merk</th><td>" + esc(D.brandName(p.brand)) + "</td></tr><tr><th>Minimumafname</th><td>" + p.minQty + " st. (veelvoud " + p.multiple + ")</td></tr></table>", false],
    ["Personalisatie", '<p>Sleeve, doosbedrukking of een eigen lint — wat mogelijk is hangt af van de verpakking en de oplage. Stuur je logo mee bij de offerteaanvraag; je krijgt een digitale proef voordat we in productie gaan.</p>', false],
    ["Downloads", p.hasFiche
      ? '<p><a href="#" style="border-bottom:1px solid var(--ink);">Fiche produit (PDF)</a></p>'
      : '<p>Geen fiche beschikbaar voor dit artikel.</p>', false]
  ].map(([title, body, open]) => `
  <div class="acc-item${open ? " open" : ""}">
    <button type="button" class="acc-head">${title}<span class="sign">${open ? "−" : "+"}</span></button>
    <div class="acc-body">${body}</div>
  </div>`).join("")}
</div>`;

    // Gerelateerd: écht uit dezelfde categorie — de huidige site toont
    // onderaan elke pagina hetzelfde ongelabelde, onverwante blok.
    const rel = $("#pdp-related");
    if (rel) {
      const related = D.PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
      rel.innerHTML = productGrid(related, 4);
    }

    /* --- interacties --- */

    const main = $("[data-main]");
    const mainCaption = $("[data-main-caption]");
    let thumbNr = 1;
    const setCaption = () => {
      if (!mainCaption) return;
      const v = Object.values(chosen).join(" · ");
      mainCaption.textContent = thumbNr > 1 ? `${v} — beeld ${thumbNr}` : v;
    };
    $$("[data-variant]").forEach((block) => {
      const idx = parseInt(block.dataset.variant, 10);
      const label = p.variants[idx].label;
      $$(".variant-opt", block).forEach((btn) => {
        btn.addEventListener("click", () => {
          $$(".variant-opt", block).forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          chosen[label] = btn.dataset.opt;
          $("[data-chosen]", block).textContent = btn.dataset.opt;
          setCaption();
        });
      });
    });

    $$("[data-thumb]").forEach((t) => t.addEventListener("click", () => {
      $$("[data-thumb]").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      thumbNr = parseInt(t.dataset.thumb, 10);
      setCaption();
    }));

    $$(".acc-head").forEach((h) => h.addEventListener("click", () => {
      const item = h.parentElement;
      item.classList.toggle("open");
      $(".sign", h).textContent = item.classList.contains("open") ? "−" : "+";
    }));

    // Aantal: minimum en veelvoud worden echt afgedwongen — op de huidige
    // site is dit enkel een rode waarschuwing zonder gevolg.
    const qty = $("#qty");
    const err = $("[data-qty-error]");
    const validate = () => {
      const v = parseInt(qty.value, 10);
      if (isNaN(v) || v < p.minQty) {
        err.textContent = `Minimum ${p.minQty} stuks voor dit artikel.`;
        err.classList.remove("hidden");
        return false;
      }
      if ((v - p.minQty) % p.multiple !== 0) {
        err.textContent = `Enkel per veelvoud van ${p.multiple} — dichtstbijzijnde: ${p.minQty + Math.round((v - p.minQty) / p.multiple) * p.multiple}.`;
        err.classList.remove("hidden");
        return false;
      }
      err.classList.add("hidden");
      return true;
    };
    if (qty) {
      qty.addEventListener("input", validate);
      $$("[data-step]").forEach((b) => b.addEventListener("click", () => {
        const d = parseInt(b.dataset.step, 10) * p.multiple;
        qty.value = Math.max(p.minQty, (parseInt(qty.value, 10) || p.minQty) + d);
        validate();
      }));
    }

    const addBtn = $("[data-add]");
    if (addBtn) addBtn.addEventListener("click", () => {
      if (!validate()) return;
      quote.add(p.id, parseInt(qty.value, 10), Object.assign({}, chosen));
      const fb = $("[data-feedback]");
      fb.innerHTML = `Toegevoegd — <a href="offerte.html" style="border-bottom:1px solid var(--ink);">bekijk offertelijst</a>`;
    });
  };

  /* ---------- Offerte, stap 1: je lijst ---------- */
  pages.offerte = () => {
    const stepsEl = $("#quote-steps");
    if (stepsEl) stepsEl.innerHTML = renderSteps(1);

    const list = $("#quote-list");
    const side = $("#quote-side");

    function render() {
      const items = quote.items();

      if (!items.length) {
        list.innerHTML = `
<div class="empty-state">
  <strong>Je offertelijst is leeg</strong>
  Zet de artikelen die je overweegt op één lijst. Aantallen pas je later nog aan —
  je vraagt pas een prijs wanneer de lijst compleet is.
  <div style="margin-top:22px;"><a class="cta-btn primary" href="shop.html">Naar de catalogus</a></div>
</div>`;
        side.innerHTML = "";
        return;
      }

      list.innerHTML = `
<table class="quote-table">
  <thead><tr><th colspan="2">Artikel</th><th>Aantal</th><th></th></tr></thead>
  <tbody>
    ${items.map((it, i) => {
      const p = D.byId(it.id);
      if (!p) return "";
      const vars = Object.entries(it.variants || {}).map(([k, v]) => `${k}: ${v}`).join(" · ");
      return `
    <tr>
      <td class="thumb"><div class="ph"></div></td>
      <td>
        <a class="quote-item-name" href="product.html?id=${p.id}">${esc(p.name)}</a>
        <div class="quote-item-meta">${esc(D.brandName(p.brand))} · ${esc(p.sku)}</div>
        ${vars ? `<div class="quote-item-meta">${esc(vars)}</div>` : ""}
        <div class="quote-item-meta">Min. ${p.minQty} st. · veelvoud ${p.multiple}</div>
      </td>
      <td>
        <div class="qty-input" style="width:118px;">
          <button type="button" data-q="-1" data-i="${i}">−</button>
          <input type="number" value="${it.qty}" min="${p.minQty}" step="${p.multiple}" data-qty-i="${i}">
          <button type="button" data-q="1" data-i="${i}">+</button>
        </div>
      </td>
      <td><button class="quote-remove" type="button" data-remove="${i}">Verwijderen</button></td>
    </tr>`;
    }).join("")}
  </tbody>
</table>`;

      side.innerHTML = `
<div class="quote-side">
  <h3>Samenvatting</h3>
  <div class="row"><span>Artikelen</span><span>${items.length}</span></div>
  <div class="row"><span>Totaal stuks</span><span>${quote.units()}</span></div>
  <div class="row"><span>Prijs</span><span>op aanvraag</span></div>
  <a class="cta-btn primary" href="offerte-gegevens.html">Verder naar je gegevens</a>
  <button class="filters-clear" type="button" data-clear-all style="margin-top:14px;">Lijst leegmaken</button>
</div>`;

      bind();
    }

    function bind() {
      $$("[data-remove]").forEach((b) => b.addEventListener("click", () => {
        quote.remove(parseInt(b.dataset.remove, 10)); render();
      }));
      $$("[data-q]").forEach((b) => b.addEventListener("click", () => {
        const i = parseInt(b.dataset.i, 10);
        const it = quote.items()[i];
        const p = D.byId(it.id);
        const next = it.qty + parseInt(b.dataset.q, 10) * p.multiple;
        quote.setQty(i, Math.max(p.minQty, next)); render();
      }));
      $$("[data-qty-i]").forEach((inp) => inp.addEventListener("change", () => {
        const i = parseInt(inp.dataset.qtyI, 10);
        const p = D.byId(quote.items()[i].id);
        quote.setQty(i, Math.max(p.minQty, parseInt(inp.value, 10) || p.minQty));
        render();
      }));
      const clr = $("[data-clear-all]");
      if (clr) clr.addEventListener("click", () => { quote.clear(); render(); });
    }

    render();
  };

  /* ---------- Offerte, stap 2: je gegevens ---------- */
  pages["offerte-gegevens"] = () => {
    const stepsEl = $("#quote-steps");
    if (stepsEl) stepsEl.innerHTML = renderSteps(2);

    const items = quote.items();
    const recap = $("#quote-recap");
    const form = $("#quote-form");

    // Zonder lijst valt er niets aan te vragen: dan stuurt deze stap
    // terug in plaats van een leeg formulier te tonen.
    if (!items.length) {
      if (recap) recap.innerHTML = `
<div class="empty-state">
  <strong>Je lijst is nog leeg</strong>
  Zet eerst producten op je offertelijst; daarna vragen we je gegevens.
  <div style="margin-top:18px;"><a class="cta-btn primary" href="shop.html">Naar de shop</a></div>
</div>`;
      if (form) form.classList.add("hidden");
      return;
    }

    if (recap) recap.innerHTML = `
<div class="quote-recap">
  <div>
    <strong>${items.length} artikelen · ${quote.units()} stuks</strong>
    <span>${items.map((it) => esc((D.byId(it.id) || {}).name || "")).filter(Boolean).slice(0, 3).join(" · ")}${items.length > 3 ? " …" : ""}</span>
  </div>
  <a class="ulink" href="offerte.html">Lijst aanpassen</a>
</div>`;

    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      store.set(QUOTE_SENT_KEY, {
        items: items.length,
        units: quote.units(),
        bedrijf: (($("#q-bedrijf") || {}).value || "").trim()
      });
      quote.clear();
      location.href = "offerte-verzonden.html";
    });
  };

  /* ---------- Offerte, stap 3: bevestiging ---------- */
  pages["offerte-verzonden"] = () => {
    const stepsEl = $("#quote-steps");
    if (stepsEl) stepsEl.innerHTML = renderSteps(3);

    const sent = store.get(QUOTE_SENT_KEY, null);
    const sum = $("#quote-sent-summary");
    if (sum) {
      sum.innerHTML = sent
        ? `<div class="row"><span>Artikelen</span><span>${sent.items}</span></div>
           <div class="row"><span>Totaal stuks</span><span>${sent.units}</span></div>
           ${sent.bedrijf ? `<div class="row"><span>Bedrijf</span><span>${esc(sent.bedrijf)}</span></div>` : ""}
           <div class="row"><span>Referentie</span><span>OFF-2026-0517</span></div>`
        : `<div class="row"><span>Referentie</span><span>OFF-2026-0517</span></div>`;
    }
  };

  /* ---------- Account ---------- */
  pages.account = () => {
    // Zes willekeurige-maar-vaste artikelen als "vorige aanvraag".
    // Toont het patroon 'snel opnieuw aanvragen' zonder echt accountsysteem.
    const previous = [
      { ref: "OFF-2026-0412", date: "12 juni 2026", items: D.PRODUCTS.slice(0, 3) },
      { ref: "OFF-2026-0388", date: "3 april 2026", items: D.PRODUCTS.slice(40, 43) },
      { ref: "OFF-2025-0291", date: "18 december 2025", items: D.PRODUCTS.slice(80, 82) }
    ];

    const el = $("#account-reorder");
    if (el) el.innerHTML = previous.map((o, i) => `
<div style="margin-bottom:26px;">
  <div class="section-head" style="margin-bottom:10px;">
    <div><strong style="font-size:13px;">${o.ref}</strong><div class="card-meta">${o.date} · ${o.items.length} artikelen</div></div>
    <button class="cta-btn small" type="button" data-reorder="${i}">Alles opnieuw aanvragen</button>
  </div>
  ${o.items.map((p) => `
  <div class="reorder-item">
    <div class="ph"></div>
    <div class="meta"><strong>${esc(p.name)}</strong><span>${esc(D.brandName(p.brand))} · min. ${p.minQty} st.</span></div>
    <button class="cta-btn small" type="button" data-readd="${p.id}">Toevoegen</button>
  </div>`).join("")}
</div>`).join("");

    const feedback = $("#account-feedback");
    const say = (msg) => { if (feedback) feedback.textContent = msg; };

    $$("[data-reorder]").forEach((b) => b.addEventListener("click", () => {
      const o = previous[parseInt(b.dataset.reorder, 10)];
      o.items.forEach((p) => quote.add(p.id, p.minQty, {}));
      say(`${o.items.length} artikelen uit ${o.ref} toegevoegd aan je offertelijst.`);
    }));
    $$("[data-readd]").forEach((b) => b.addEventListener("click", () => {
      const p = D.byId(b.dataset.readd);
      quote.add(p.id, p.minQty, {});
      say(`"${p.name}" toegevoegd aan je offertelijst.`);
    }));

    const login = $("#login-form");
    if (login) login.addEventListener("submit", (e) => {
      e.preventDefault();
      const s = $("#login-state");
      if (s) s.classList.remove("hidden");
    });
  };

  /* ---------- Over ons ---------- */
  pages["over-ons"] = () => {
    $$("form[data-demo-form]").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = $("[data-success]", f.parentElement);
      if (ok) ok.classList.remove("hidden");
      f.reset();
    }));

    const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = $$("[data-reveal]");

    /* --- Opklaren bij in beeld komen ---
       Valt de observer weg, dan wordt alles meteen getoond. Een reveal
       die niet afvuurt mag nooit inhoud verbergen. */
    if (stil || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);   // eenmalig: niet opnieuw bij terugscrollen
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
      reveals.forEach((el) => io.observe(el));

      // vangnet: wat na 3 s nog verborgen is, tonen we alsnog
      setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 3000);
    }

    if (stil) return;

    /* --- Parallax op het portret + tijdlijn die zich vult ---
       Eén scroll-handler voor beide, via requestAnimationFrame. */
    const media = $("[data-parallax]");
    const tl = $("[data-timeline]");
    const fill = $("[data-tl-fill]");
    const items = $$(".tl-item");
    if (!media && !tl) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      if (media) {
        const hero = media.parentElement.getBoundingClientRect();
        if (hero.bottom > 0 && hero.top < vh) {
          // beeld beweegt trager dan de pagina; de bak is 12% overhoog
          // gezet zodat er nooit een rand in beeld komt
          media.style.transform = `translate3d(0, ${(-hero.top * 0.14).toFixed(1)}px, 0)`;
        }
      }

      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        const anker = vh * 0.55;                       // meetlijn iets onder het midden
        const done = Math.min(1, Math.max(0, (anker - r.top) / r.height));
        fill.style.height = (done * 100).toFixed(2) + "%";
        items.forEach((it) => {
          const d = it.querySelector(".tl-dot");
          if (!d) return;
          it.classList.toggle("passed", d.getBoundingClientRect().top < anker);
        });
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  };

  /* ---------- Info-pagina's ---------- */
  pages.info = () => {
    const DOCS = {
      voorwaarden: {
        title: "Algemene voorwaarden",
        body: `<h2>1. Toepassing</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>2. Offertes en bestellingen</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>3. Minimumafname</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>4. Levering</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               `
      },
      privacy: {
        title: "Privacybeleid",
        body: `<h2>Welke gegevens</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>Bewaartermijn</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>Je rechten</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               `
      },
      cookies: {
        title: "Cookiebeleid",
        body: `<h2>Welke cookies</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>Beheer je voorkeuren</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               `
      },
      printtechnologie: {
        title: "Printtechnologie",
        body: `<h2>Zeefdruk</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>Digitale druk</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               <h2>Reliëfdruk</h2><p class="copy-pending">Tekst wordt aangeleverd door Belgosweet.</p>
               `
      }
    };

    const key = new URLSearchParams(location.search).get("p") || "voorwaarden";
    const doc = DOCS[key] || DOCS.voorwaarden;

    document.title = `Belgosweet — HiFi — ${doc.title}`;
    const t = $("#info-title"); if (t) t.textContent = doc.title;
    const b = $("#info-body"); if (b) b.innerHTML = doc.body;
    const c = $("#info-crumbs");
    if (c) c.innerHTML = crumbs([{ label: "Home", href: "index.html" }, { label: doc.title }]);

    const nav = $("#info-nav");
    if (nav) nav.innerHTML = Object.entries(DOCS).map(([k, d]) =>
      `<a href="info.html?p=${k}"${k === key ? ' class="active"' : ""}>${esc(d.title)}</a>`).join("");
  };

  /* ============================================================
     Boot
     ============================================================ */

  document.addEventListener("DOMContentLoaded", () => {
    mountShell();
    const page = document.body.dataset.page;
    if (pages[page]) pages[page]();
    quote.sync();
  });

  return { quote, recent, productGrid, productCard, esc };
})();
