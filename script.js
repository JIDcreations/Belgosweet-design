// Belgosweet MidFi — gedeelde interacties
// Puur structureel: toont HOE onderdelen zich gedragen, geen final content.

document.addEventListener("DOMContentLoaded", () => {

  // Mobiel: filterpaneel in-/uitschuiven (consistent op elke categoriepagina)
  const filtersToggle = document.querySelector(".filters-toggle");
  const filters = document.querySelector(".filters");
  if (filtersToggle && filters) {
    filtersToggle.addEventListener("click", () => {
      filters.classList.toggle("open");
      const open = filters.classList.contains("open");
      filtersToggle.textContent = open ? "Filters sluiten" : "Filters (" + filters.querySelectorAll("input:checked").length + ")";
    });
  }

  // Productdetail: variant-keuze via klik, geen hover — wisselt actieve status
  // en de hoofdvisual inline, geen page reload (zie meurisse-analyse).
  document.querySelectorAll(".variant-options").forEach((group) => {
    group.querySelectorAll(".variant-opt").forEach((opt) => {
      opt.addEventListener("click", () => {
        group.querySelectorAll(".variant-opt").forEach((o) => o.classList.remove("active"));
        opt.classList.add("active");

        // demonstreert dat de hoofdfoto zou meewisselen bij een echte implementatie
        const gallery = document.querySelector(".pdp-gallery .ph.tall");
        if (gallery) {
          gallery.textContent = "[ hoofdfoto — variant: " + opt.textContent.trim() + " ]";
        }
      });
    });
  });

  // Mobiele hoofdnav toggle (eenvoudig, enkel structuur)
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex";
    });
  }
});
