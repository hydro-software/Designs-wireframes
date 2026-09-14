// Naia v5 — integrated app mockup shell
// Sidebar uses a flat structure per the May 2026 team-meeting review:
//   - "Pilotage" section groups Tableau de bord / Production / Revenus / Paramètres
//     (no per-centrale fold — centrales appear as tabs at the top of each page)
//   - "Communauté" section groups Inbox + the V1 community topics
//   - No more "Rapports" entry — the generator lives on the Tableau de bord

const CENTRALES = [
  // v6.8 maquette : `access` = rôle de Marc Dupont sur la centrale (voir PLANT_ROLES).
  // Bocq porte le libellé le plus long du catalogue, pour éprouver la mise en page.
  { slug: "moulins",  label: "Centrale des Moulins", capacity: "450 kW", country: "FR", access: { role: "PLANT_ADMIN" } },
  { slug: "bocq",     label: "Moulin du Bocq",       capacity: "210 kW", country: "BE", access: { role: "VIEWER", viewLevel: 3 } },
  { slug: "ariege",   label: "Centrale d'Ariège",    capacity: "780 kW", country: "FR", access: { role: "EDITOR" } },
  { slug: "lesse",    label: "Moulin de la Lesse",   capacity: "320 kW", country: "BE", access: { role: "FINANCE" } },
];

const COMMUNITY_TOPICS = [
  { slug: "earn",         label: "Gagner des points",    icon: "zap",         href: "community-earn.html",      tier: "v1" },
  { slug: "rewards",      label: "Récompenses",          icon: "gift",        href: "community-rewards.html",   tier: "v1" },
  { slug: "intelligence", label: "Intelligence",         icon: "lightbulb",   href: "community-intelligence.html", tier: "v1" },
  { slug: "market",       label: "Mises à jour marché",  icon: "trending-up", href: "community-market.html",    tier: "v1" },
  // 2026-05-27 PO descope for the 10-11 June conference V1: Agenda (D6)
  // is deferred to V2 along with Surveys (D5) and the F3 LinkedIn module.
  // The page itself stays for V2 demo via the "Voir V2 (mockup)" toggle.
  { slug: "agenda",       label: "Agenda",               icon: "calendar",    href: "community-agenda.html",    tier: "v2" },
  { slug: "leaderboard",  label: "Classement",           icon: "trophy",      href: "#",                        tier: "v2" },
  { slug: "visits",       label: "Visites de centrales", icon: "map-pin",     href: "#",                        tier: "v2" },
  { slug: "opportunities",label: "Opportunités",         icon: "rocket",      href: "#",                        tier: "v2" },
  { slug: "forum",        label: "Forum & annuaire",     icon: "users",       href: "#",                        tier: "v2" },
];

// 2026-08-21 (v6.5) — "Administration" is a fold again, same idiom as
// Communauté (chevron + .subnav). The 2026-05-25 flat-link decision held
// while admin covered a single surface (Community + Subscription on one
// dashboard); v6.5 adds a second, unrelated surface — Naia (Core), the
// admin dashboard for the dashboard module itself — so the two need to be
// separable from the sidebar. Two entries only:
//   - Naia (Core)   -> admin-core.html   (sources publiques, accès, support, logs)
//   - Subscription  -> admin.html        (the existing cross-module dashboard)
const ADMIN_ITEMS = [
  { slug: "admin-core", label: "Naia (Core)",  href: "admin-core.html" },
  { slug: "admin-sub",  label: "Subscription", href: "admin.html" },
];

// ---- THEME ----
function getTheme() { return localStorage.getItem("naia-theme") || "dark"; }
function setTheme(t) { localStorage.setItem("naia-theme", t); document.documentElement.setAttribute("data-theme", t); refreshThemeButtons(); }
function refreshThemeButtons() {
  const t = getTheme();
  document.querySelectorAll("[data-theme-btn]").forEach(btn => {
    btn.classList.toggle("on", btn.dataset.themeBtn === t);
  });
}

// ---- V2 toggle ----
function getShowV2() { return localStorage.getItem("naia-show-v2") === "true"; }
function setShowV2(v) { localStorage.setItem("naia-show-v2", v ? "true" : "false"); document.body.dataset.showV2 = v ? "true" : "false"; }

// ---- ACCESS-persona toggle (v5 add — funnel decision 2026-05-31, platform#647) ----
// "lead"      = logged-in conference lead: has community points, but NO connected plant
//               and NO subscription. Insight pages (Production/Revenus) show a locked
//               overlay with a "Connectez votre centrale" CTA → plaquette.
// "connected" = paying customer with a connected plant and real data (the normal view).
// Only injected on pages that carry a .lock-overlay element, so it doesn't appear
// everywhere.
function getAccess() { return localStorage.getItem("naia-access") || "lead"; }
function setAccess(a) {
  localStorage.setItem("naia-access", a);
  document.body.dataset.access = a;
  refreshAccessButtons();
}
function refreshAccessButtons() {
  const a = getAccess();
  document.querySelectorAll("[data-access-btn]").forEach(btn => {
    btn.classList.toggle("on", btn.dataset.accessBtn === a);
  });
}
function injectAccessToggle() {
  // Only relevant on pages that declare a lockable region.
  if (!document.querySelector(".lock-overlay")) return;
  if (document.getElementById("access-toggle")) return;
  const wrap = document.createElement("div");
  wrap.id = "access-toggle";
  wrap.className = "access-toggle";
  wrap.innerHTML = `
    <span class="access-label">Accès</span>
    <span class="access-seg">
      <button data-access-btn="lead"      onclick="setAccess('lead')">Prospect</button>
      <button data-access-btn="connected" onclick="setAccess('connected')">Abonné</button>
    </span>
  `;
  document.body.appendChild(wrap);
  refreshAccessButtons();
}

// ---- SIDEBAR BUILD ----
function buildSidebar() {
  const aside = document.querySelector("aside.sidebar");
  if (!aside) return;
  const page = document.body.dataset.page || "";
  const section = document.body.dataset.section || ""; // production / revenue / community / parametres / admin
  const centrale = document.body.dataset.centrale || "all";

  // Determine which fold-outs default to open. v5: only Communauté still folds —
  // the Pilotage block (Production / Revenus / Paramètres) is flat now since
  // per-centrale views are reached via top tabs on each page.
  const open = {
    community: section === "community" || section === "inbox",
    admin:     section === "admin",
  };

  // Inbox sits under Communauté now (v5 team-meeting move). It's still its own
  // page but folded into the community group rather than the Pilotage group.
  const communityItems = `
    <a href="inbox.html" class="subnav-item ${section === 'inbox' ? 'active' : ''}">
      <span>Inbox</span>
      <span class="badge-mini" style="margin-left:auto">3</span>
    </a>
    ${COMMUNITY_TOPICS.map(t => {
      const activeClass = (page === t.slug) ? "active" : "";
      const v2Class = t.tier === "v2" ? "v2" : "";
      const v2Pill = t.tier === "v2" ? `<span class="v2-pill">V2</span>` : "";
      const onclick = t.href === "#" ? `onclick="event.preventDefault(); alert('${t.label} — V2 (mockée)')"` : "";
      return `<a href="${t.href}" class="subnav-item ${activeClass} ${v2Class}" ${onclick}>
        <span>${t.label}</span>
        ${v2Pill}
      </a>`;
    }).join("")}
  `;

  // Admin sub-entries. "Naia (Core)" is its own page; "Subscription" is the
  // historical admin.html dashboard, so anything under section=admin that is
  // not the core page lights up the Subscription entry.
  const adminItems = ADMIN_ITEMS.map(a => {
    const isCore = a.slug === "admin-core";
    const active = section === "admin" && (isCore ? page === "admin-core" : page !== "admin-core");
    return `<a href="${a.href}" class="subnav-item ${active ? "active" : ""}">
      <span>${a.label}</span>
    </a>`;
  }).join("");

  aside.innerHTML = `
    <a href="index.html" class="sidebar-brand" style="text-decoration:none">
      <img src="img/logo.png" alt="Naia hydro" style="width:100%; max-width:184px; height:auto; display:block">
    </a>

    <nav class="sidebar-nav">

      <div class="sidebar-section-title">Pilotage</div>

      <a href="index.html" class="sidebar-item ${section === '' && page === 'home' ? 'active' : ''}">
        <i data-lucide="layout-dashboard"></i>
        <span>Tableau de bord</span>
      </a>

      <a href="production.html" class="sidebar-item ${section === 'production' ? 'active' : ''}">
        <i data-lucide="zap"></i>
        <span>Production</span>
      </a>

      <a href="revenue.html" class="sidebar-item ${section === 'revenue' ? 'active' : ''}">
        <i data-lucide="euro"></i>
        <span>Revenus</span>
      </a>

      <a href="data.html" class="sidebar-item ${section === 'data' ? 'active' : ''}">
        <i data-lucide="upload"></i>
        <span>Données</span>
      </a>

      <a href="parametres.html" class="sidebar-item ${section === 'parametres' ? 'active' : ''}">
        <i data-lucide="settings"></i>
        <span>Paramètres</span>
      </a>

      <a href="simulateur.html" class="sidebar-item ${section === 'simulateur' ? 'active' : ''}">
        <i data-lucide="cpu"></i>
        <span>Simulateur</span>
        <span class="badge-mini" style="background:rgba(217,119,6,0.3); color:#fcd34d; border:1px solid rgba(251,191,36,0.4)">V2</span>
      </a>

      <div class="sidebar-section-title">Communauté</div>

      <a href="community-earn.html" class="sidebar-item ${section === 'community' || section === 'inbox' ? 'active' : ''}" aria-expanded="${open.community}">
        <i data-lucide="users"></i>
        <span>Communauté</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.community}">
        ${communityItems}
      </div>

      <a href="admin.html" class="sidebar-item ${section === 'admin' ? 'active' : ''}" aria-expanded="${open.admin}">
        <i data-lucide="shield"></i>
        <span>Administration</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.admin}">
        ${adminItems}
      </div>
    </nav>

    <div class="sidebar-foot">
      <a class="sidebar-item" href="#" onclick="event.preventDefault(); openHelp()">
        <i data-lucide="life-buoy"></i>
        <span>Aide &amp; support</span>
      </a>
    </div>

    <div id="profile-container">
      <!-- v5 update: this button no longer opens a dropdown — it navigates directly to
           profil.html where Mon profil / Mon abonnement / Mes factures sit
           as tabs and a User Settings tile hosts language, theme and security. -->
      <a id="profile-trigger" class="profile-trigger" href="profil.html">
        <div class="avatar" style="width:30px; height:30px; font-size:11px">MD</div>
        <div class="profile-id" style="flex:1; min-width:0">
          <div style="color:white; font-size:13px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">Marc Dupont</div>
          <div data-org-foot style="color:rgba(255,255,255,0.55); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${orgFootLine()}</div>
        </div>
        <i data-lucide="chevron-right" class="profile-chev" style="width:14px; height:14px; color:rgba(255,255,255,0.55)"></i>
      </a>
      <!-- v6.8 maquette : rappel de l'accès sous l'avatar, rempli par refreshSidebarAccess(). -->
      <div id="sidebar-access" class="sb-access" tabindex="0" aria-describedby="sb-access-pop" hidden></div>
    </div>
  `;
}

function sectionLabel(slug) {
  return ({production: "Production", revenue: "Revenus", parametres: "Paramètres"})[slug] || slug;
}

// Toggle fold state when clicking the chevron on a sidebar parent <a>
// (the <a> itself navigates; chevron just expands without navigating)
function toggleFoldByLink(chevEl) {
  const link = chevEl.closest(".sidebar-item");
  if (!link) return;
  const subnav = link.nextElementSibling;
  if (!subnav || !subnav.classList.contains("subnav")) return;
  const open = subnav.dataset.open === "true";
  subnav.dataset.open = open ? "false" : "true";
  link.setAttribute("aria-expanded", open ? "false" : "true");
}

// ---- PROFILE BUTTON ----
// v5 update: the bottom-left profile button no longer opens a dropdown.
// It navigates directly to profil.html, where:
//   - Identité tab hosts user identity, badges, and a User Settings tile
//     (Sécurité / MFA, Langue, Thème)
//   - Mon abonnement / Mes factures are the other tabs
// The Sécurité and Mes badges tabs are removed (badges sit on Identité; security
// moved into the settings tile).

// V2-content visibility helper kept for any future toggle surface (e.g. an
// admin power-user pref). Currently no UI control flips it — call setShowV2(true)
// from the console to preview V2 community items.
function refreshV2Buttons() {
  const v = getShowV2();
  document.querySelectorAll("[data-v2-btn]").forEach(b => b.classList.toggle("on", b.dataset.v2Btn === String(v)));
}

// ---- CENTRALE TABS (top of page when applicable) ----
// Tabs use URL hash (#all, #moulins, #bocq, ...). Clicking a tab updates
// the hash, the active tab, and the page contents that depend on the
// selected centrale (title, KPIs, chart). One page handles all centrales.
function buildCentraleTabs() {
  const host = document.getElementById("centrale-tabs");
  if (!host) return;
  const section = document.body.dataset.section || "";
  const active = currentCentrale();

  const items = [
    { slug: "all", label: "Tous", capacity: "1.76 MW · 4 centrales" },
    ...CENTRALES.map(c => ({ slug: c.slug, label: c.label, capacity: c.capacity })),
  ];

  host.innerHTML = items.map(c => {
    const activeClass = active === c.slug ? "active" : "";
    const allClass = c.slug === "all" ? "all" : "";
    return `<a href="#${c.slug}" data-centrale="${c.slug}" class="centrale-tab ${activeClass} ${allClass}" onclick="onCentraleTabClick(event, '${c.slug}')">
      <span>${c.label}</span>
      <span class="cap">${c.capacity}</span>
    </a>`;
  }).join("");
}
function currentCentrale() {
  const hash = (window.location.hash || "").replace("#", "").trim();
  if (!hash) return document.body.dataset.centrale || "all";
  return hash;
}
function onCentraleTabClick(e, slug) {
  e.preventDefault();
  window.location.hash = "#" + slug;
  applyCentrale(slug);
}
function applyCentrale(slug) {
  document.body.dataset.centrale = slug;
  // Update active class on tabs.
  // Scope to tabs that actually carry data-centrale so we don't fight other
  // .centrale-tab consumers (e.g. admin-audit.html reuses the visual class
  // but uses data-audit-tab — its active state is owned by selectAuditScope).
  document.querySelectorAll(".centrale-tab[data-centrale]").forEach(t => t.classList.toggle("active", t.dataset.centrale === slug));
  // Update centrale-aware texts in the page
  const c = CENTRALES.find(x => x.slug === slug);
  document.querySelectorAll("[data-centrale-name]").forEach(el => {
    el.textContent = slug === "all" ? "Vue agrégée · 4 centrales" : (c ? c.label : "—");
  });
  document.querySelectorAll("[data-centrale-capacity]").forEach(el => {
    el.textContent = slug === "all" ? "Total · 1 760 kW" : (c ? c.capacity : "—");
  });
  // Centrale-scoped notes: show an element only when the active tab matches its
  // data-centrale-note value (e.g. the dashboard "centrale non connectée" notices).
  document.querySelectorAll("[data-centrale-note]").forEach(el => {
    el.classList.toggle("show", el.dataset.centraleNote === slug);
  });
  // Refresh chart with the right scaling factor
  if (typeof rebuildProductionChart === "function") rebuildProductionChart();
}
window.addEventListener("hashchange", () => applyCentrale(currentCentrale()));

// ---- MODAL ----
function openOverlay(id) { const el = document.getElementById(id); if (el) { el.classList.add("open"); document.body.style.overflow = "hidden"; } }
function closeOverlay(id) { const el = document.getElementById(id); if (el) { el.classList.remove("open"); document.body.style.overflow = ""; } }
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".overlay.open").forEach(el => el.classList.remove("open"));
    document.body.style.overflow = "";
  }
});

// ---- ICONS ----
function initIcons() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  }
}

// ---- CHART (Naia-style) ----
const NAIA_CHART_PALETTE = {
  // v6.8: `theo` = production théoriquement atteignable (jumeau numérique). Teinte
  // volontairement distincte du cyan (mesure) et du lime (cumul) — un violet non
  // utilisé ailleurs dans la légende, et rendu en barre creuse : c'est un modèle,
  // pas une mesure, et la forme doit le dire avant la couleur.
  dark:  { bar: "#38bdf8", bar2: "#6ee7b7", line: "#a3e635", theo: "#a78bfa", theoFill: "rgba(167,139,250,0.16)", grid: "rgba(255,255,255,0.05)", axis: "rgba(255,255,255,0.45)", tooltipBg: "#0f1a32", tooltipFg: "#e2e8f0" },
  light: { bar: "#2563eb", bar2: "#16a34a", line: "#65a30d", theo: "#7c3aed", theoFill: "rgba(124,58,237,0.12)", grid: "#eef1f6",                  axis: "#5c6b85",                tooltipBg: "#0f172a", tooltipFg: "#f8fafc" },
};
function chartColors() { return NAIA_CHART_PALETTE[getTheme()] || NAIA_CHART_PALETTE.dark; }

// ---- v6.8 : données du tableau de bord (production réelle / théorique / pertes) ----
// Un seul jeu de chiffres pour le graphique ET la tuile « Disponibilité énergétique »
// d'index.html — le PRD Tableau de bord (critère d'acceptation 2) exige qu'un même
// chiffre soit identique partout où il apparaît. La tuile lit donc ceci, elle ne
// recopie rien à la main.
const HOME_MONTHS = ["Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc","Jan","Fév","Mars","Avr"];
const HOME_DATA = {
  months: HOME_MONTHS,
  // Production mesurée au compteur.
  real:        [142, 168, 159, 124, 110,  92,  88, 124, 198, 215, 245, 196],
  // Ce que la centrale aurait produit au débit réellement disponible dans la rivière,
  // si l'outil avait fonctionné sans défaut (jumeau numérique — platform#232).
  theoretical: [150, 176, 165, 131, 118, 108,  93, 131, 208, 238, 258, 212],
  // Part de l'écart NON imputable à la centrale (délestage réseau, consigne de débit
  // réservé, travaux tiers, effacement volontaire sur prix négatif) : réintégrée au
  // numérateur de la disponibilité.
  nonImputable:[  2,   3,   1,   2,   2,   3,   1,   2,   3,   4,   4,   5],
  // Écart non encore classé par l'exploitant. Compté CONTRE la centrale par défaut :
  // c'est ce qui rend la catégorisation payante.
  uncategorised:[ 1,   1,   1,   1,   1,   2,   1,   1,   1,   3,   2,   2],
};
// Disponibilité énergétique corrigée = (réel + pertes non imputables) / théorique.
function homeAvailability(i) {
  const t = HOME_DATA.theoretical[i];
  if (!t) return null;
  return (HOME_DATA.real[i] + HOME_DATA.nonImputable[i]) / t * 100;
}
// Agrégat de période : somme des numérateurs / somme des dénominateurs, jamais une
// moyenne des taux mensuels — sinon un mois d'étiage pèserait autant qu'un mois de crue.
function homeAvailabilityRange(from, to) {
  let num = 0, den = 0;
  for (let i = from; i <= to; i++) { num += HOME_DATA.real[i] + HOME_DATA.nonImputable[i]; den += HOME_DATA.theoretical[i]; }
  return den ? num / den * 100 : null;
}
function fmtPct(v) { return v == null ? "—" : v.toFixed(1).replace(".", ",") + " %"; }

function buildHomeChart() {
  const c = document.getElementById("home-chart");
  if (!c || !window.Chart) return;
  const colors = chartColors();
  const months = HOME_DATA.months;
  const monthlyMWh = HOME_DATA.real;
  const theoreticalMWh = HOME_DATA.theoretical;
  const cumulative = monthlyMWh.reduce((a, v, i) => { a.push((i ? a[i-1] : 0) + v); return a; }, []);
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        { label: "Production réelle (MWh)", data: monthlyMWh, backgroundColor: colors.bar, borderRadius: 4, categoryPercentage: 0.78, barPercentage: 0.9, order: 2 },
        { label: "Production théoriquement atteignable (MWh)", data: theoreticalMWh, backgroundColor: colors.theoFill, borderColor: colors.theo, borderWidth: 1.5, borderRadius: 4, categoryPercentage: 0.78, barPercentage: 0.9, order: 2 },
        { label: "Production cumulée (MWh)", type: "line", data: cumulative, borderColor: colors.line, backgroundColor: "transparent", borderWidth: 2.5, tension: 0.3, pointRadius: 3, pointBackgroundColor: colors.line, yAxisID: "y2", order: 1 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.axis, font: { size: 11 } }, title: { display: true, text: "MWh / mois", color: colors.axis } },
        y2: { position: "right", grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } }, title: { display: true, text: "Cumulé MWh", color: colors.axis } }
      },
      plugins: {
        legend: { display: true, position: "bottom", labels: { color: colors.axis, font: { size: 11 }, boxWidth: 12 } },
        tooltip: {
          backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg,
          footerColor: colors.tooltipFg, padding: 10, cornerRadius: 8,
          callbacks: {
            // Le mois survolé porte sa propre disponibilité : c'est là qu'on lit
            // pourquoi un barreau creux dépasse nettement le barreau plein.
            footer: (items) => {
              const i = items[0]?.dataIndex;
              if (i == null) return "";
              const lines = ["Disponibilité énergétique : " + fmtPct(homeAvailability(i))];
              const u = HOME_DATA.uncategorised[i];
              if (u) lines.push(u + " MWh non catégorisés");
              return lines;
            }
          }
        }
      }
    }
  });
}

// ---- PRODUCTION CHART (Naia platform style: rain bars hanging from top, production
// bars from bottom with optional MDA comparator overlay, flow line in the middle)
// Inspired by hydro-software/game/.screenshots/a4-chart.png + indicateurs.png.
let _productionChartInstance = null;

function rebuildProductionChart() {
  if (_productionChartInstance) {
    _productionChartInstance.destroy();
    _productionChartInstance = null;
  }
  buildProductionChart();
}

function centraleScale() {
  const slug = currentCentrale();
  // Roughly proportional to the centrale's installed capacity (kW)
  const scale = ({ all: 1.0, moulins: 0.26, bocq: 0.12, ariege: 0.44, lesse: 0.18 })[slug] || 1.0;
  return scale;
}

function buildProductionChart() {
  const c = document.getElementById("production-chart");
  if (!c || !window.Chart) return;
  // v6.6 : applyCentrale() construit déjà le graphique au premier rendu, et le
  // setTimeout du DOMContentLoaded rappelait buildProductionChart() derrière —
  // Chart.js refusait le second passage ("Canvas is already in use") et jetait.
  // Sans effet visible en v6.5, mais l'erreur masquait les vraies dans la
  // console. Le rebuild explicite passe toujours : il remet l'instance à null.
  if (_productionChartInstance) return;
  const colors = chartColors();
  const scale = centraleScale();

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  // Production (dark blue bars, primary value, kWh/day)
  const production = days.map((_, i) => {
    const seasonal = 1100 + Math.sin(i / 6) * 300;
    const noise = (Math.sin(i * 0.7) + Math.cos(i * 0.3)) * 80;
    let v = seasonal + noise;
    if (i === 12 || i === 13) v *= 0.55;
    return Math.round(Math.max(80, v) * scale);
  });
  // Comparator AGG DAILY MDA (lighter blue overlay on top of production)
  const compMda = production.map(v => Math.round(v * 0.85 + 60));
  // Flow / débit (m³/s) — green line, middle
  const flow = days.map((_, i) => 3.2 + Math.sin(i / 9) * 1.0 + (Math.cos(i * 0.4) * 0.25) + (i === 12 ? 1.6 : 0) + (i === 13 ? 1.4 : 0));
  // Rain (mm/day) — bars hanging from top: render as negative on a rain-only axis
  const rain = days.map((_, i) => {
    let r = 0;
    if (i === 9 || i === 10) r = 12 + Math.random() * 4;
    if (i === 11) r = 28 + Math.random() * 4;
    if ([21, 24, 25, 26, 28, 29, 30].includes(i)) r = 6 + Math.random() * 6;
    return r;
  });

  // Visual layering per Jan's preference (different from the game's "rain + flow share
  // upper band" pattern — Jan wants the flow line in the middle band, not at the top):
  //
  //   top of canvas ────────────────────────
  //                 ╔═╗   ╔═╗   ╔═╗            ← rain bars      (top ~25%)
  //                 ╚═╝   ╚═╝   ╚═╝
  //                 ─── flow line ───              ← flow line   (middle ~30-50%)
  //                 ┌─┐ ┌─┐ ┌─┐                ← production    (bottom ~33%)
  //                 │ │ │ │ │ │
  //   bottom ──────┴─┴─┴─┴─┴─┴───────────
  //
  // Three separate axes, NO axis-stacking conflict:
  //   - kwh    (left, normal)              → max = peak × 3 → bottom ~33%
  //   - yFlow  (right inner, NORMAL)       → max = peak × 2 → values land in middle
  //   - yRain  (right outer, reversed)     → max = peak × 4 → bars hang from top
  //
  // The flow axis is normal direction (NOT reversed). Setting max ≈ 2×peak parks the
  // peak value at 50% canvas height — middle band. This avoids the Chart.js "two
  // reversed y-axes on same side" rendering quirk that scrambled the previous
  // attempts.
  //
  // Both peaks closed over before chart construction. Skill's gotcha #1.

  const productionPeak = Math.max(1, ...compMda, ...production);
  const rainPeak = Math.max(1, ...rain);
  const flowPeak = Math.max(1, ...flow);

  const kwhMax = Math.ceil((productionPeak * 3) / 500) * 500;

  _productionChartInstance = new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        { label: "AGG DAILY MDA",      data: compMda,    backgroundColor: "#7dd3fc", borderRadius: 2, categoryPercentage: 0.85, barPercentage: 0.92, order: 4, yAxisID: "y" },
        { label: "Production (kWh)",   data: production, backgroundColor: "#1d4ed8", borderRadius: 2, categoryPercentage: 0.85, barPercentage: 0.46, order: 3, yAxisID: "y" },
        { label: "Débit (m³/s)",       data: flow,       type: "line", borderColor: colors.line, borderWidth: 2.2, tension: 0.35, pointRadius: 0, pointHoverRadius: 4, yAxisID: "yFlow", fill: false, order: 1 },
        { label: "Météo · pluie (mm)", data: rain,       backgroundColor: "#60a5fa", borderRadius: 2, categoryPercentage: 0.85, barPercentage: 0.55, yAxisID: "yRain", order: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.axis, font: { size: 10 }, maxTicksLimit: 31 } },

        // Production axis (left, normal). Max = peak × 3 → bars fill bottom ~33%.
        y: {
          position: "left",
          min: 0,
          max: kwhMax,
          grid: { color: colors.grid, drawTicks: false },
          ticks: {
            color: colors.axis, font: { size: 11 },
            callback: function(v) { return v <= productionPeak * 1.05 ? v : ""; }
          },
          title: { display: true, text: "kWh", color: colors.axis }
        },

        // Flow axis (right inner, NORMAL direction). Max = peak × 2 → line peaks at
        // 50% canvas height. Values 3–5 land between 30% and 50% from bottom — i.e.
        // immediately above the production band, in the middle of the canvas.
        yFlow: {
          position: "right",
          min: 0,
          max: flowPeak * 2,
          grid: { display: false },
          ticks: {
            color: colors.axis, font: { size: 11 },
            // Show ticks only within the realistic flow range (0..1.1×peak)
            callback: function(v) { return v <= flowPeak * 1.1 ? v : ""; }
          },
          title: { display: true, text: "m³/s", color: colors.axis }
        },

        // Rain axis (right outer, REVERSED). 0 at top of canvas, max at bottom →
        // bars hang from top edge. Max = peak × 4 → bars peak at ~25% from top.
        yRain: {
          position: "right",
          reverse: true,
          min: 0,
          max: rainPeak * 4,
          grid: { display: false },
          ticks: {
            color: "#60a5fa", font: { size: 10 },
            callback: function(v) { return v <= rainPeak * 1.1 ? v : ""; }
          },
          title: { display: true, text: "mm", color: "#60a5fa" }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg, padding: 10, cornerRadius: 8,
          callbacks: {
            label: function(ctx) {
              const ds = ctx.dataset.label;
              if (ds === "Météo · pluie (mm)") return `Pluie : ${ctx.parsed.y.toFixed(1)} mm`;
              if (ds === "Débit (m³/s)")       return `Débit : ${ctx.parsed.y.toFixed(2)} m³/s`;
              if (ds === "AGG DAILY MDA")       return `MDA : ${ctx.parsed.y} kWh`;
              return `${ds} : ${ctx.parsed.y} kWh`;
            }
          }
        }
      }
    }
  });
  return _productionChartInstance;
}

// ---- POINTS CHART (community) ----
function buildPointsChart() {
  const c = document.getElementById("points-chart");
  if (!c || !window.Chart) return;
  const colors = chartColors();
  const labels = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8","Sem 9","Sem 10","Sem 11","Sem 12"];
  const earned = [80, 120, 100, 220, 140, 280, 180, 200, 250, 320, 240, 380];
  const spent = [0, 0, 100, 0, 0, 250, 0, 200, 0, 0, 250, 0];
  const balance = earned.reduce((acc, v, i) => { acc.push((i ? acc[i-1] : 1800) + v - spent[i]); return acc; }, []);
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Gagnés", data: earned, backgroundColor: "#84cc16", borderRadius: 4, categoryPercentage: 0.75 },
        { label: "Dépensés", data: spent.map(v => -v), backgroundColor: "#fbbf24", borderRadius: 4, categoryPercentage: 0.75 },
        { label: "Solde", type: "line", data: balance, borderColor: "#38bdf8", borderWidth: 2.5, tension: 0.3, pointRadius: 3, pointBackgroundColor: "#38bdf8", yAxisID: "y2", fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.axis, font: { size: 11 } } },
        y2: { position: "right", grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg, padding: 10, cornerRadius: 8 }
      }
    }
  });
}

// ---- BELPEX CHART ----
function buildBelpexChart() {
  const c = document.getElementById("belpex-chart");
  if (!c || !window.Chart) return;
  const colors = chartColors();
  const days = Array.from({ length: 14 }, (_, i) => `${i + 17}/04`);
  const baseload = [78, 85, 92, 88, 75, 70, 68, 82, 90, 105, 115, 95, 88, 92];
  const peakload = [110, 125, 140, 130, 105, 95, 90, 120, 135, 165, 180, 145, 130, 138];
  return new Chart(c.getContext("2d"), {
    type: "line",
    data: {
      labels: days,
      datasets: [
        { label: "Base load (€/MWh)", data: baseload, borderColor: "#38bdf8", backgroundColor: "rgba(56,189,248,0.10)", borderWidth: 2, tension: 0.35, pointRadius: 0, fill: true },
        { label: "Peak load (€/MWh)", data: peakload, borderColor: "#f87171", borderWidth: 2, tension: 0.35, pointRadius: 0, borderDash: [4, 4], fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.axis, font: { size: 11 } }, title: { display: true, text: "€/MWh", color: colors.axis } }
      },
      plugins: {
        legend: { display: true, position: "bottom", labels: { color: colors.axis, font: { size: 11 } } },
        tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg, padding: 10, cornerRadius: 8 }
      }
    }
  });
}

// ---- HELP PANEL (#8) ----
// Reachable from two places (no floating button — Jan rejected that):
//   1. Sidebar item "Aide & support" just above the profile area
//   2. Profile dropdown entry "Aide & support"
// Both call openHelp() which shows the help modal.
function injectHelpModal() {
  if (document.getElementById("help-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "help-overlay";
  overlay.className = "overlay";
  overlay.onclick = (e) => { if (e.target === overlay) closeOverlay("help-overlay"); };
  overlay.innerHTML = `
    <div class="modal modal-lg">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px">
        <div>
          <div class="modal-title">Aide &amp; support</div>
          <div class="modal-subtitle">Documentation, raccourcis et contact direct avec l'équipe Naia.</div>
        </div>
        <button class="btn btn-ghost" onclick="closeOverlay('help-overlay')"><i data-lucide="x"></i></button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
        <a class="tile" href="#" onclick="event.preventDefault(); alert('Manuels Naia — à lier (PDF / wiki interne)')"><div class="tile-head"><span class="badge badge-blue"><i data-lucide="book-open"></i> Documentation</span></div><div class="tile-title">Manuels &amp; guides</div><div class="tile-desc">Premiers pas, ingestion, indicateurs, comparateurs, pertes, rapports.</div></a>
        <a class="tile" href="#" onclick="event.preventDefault(); alert('Lien vers la formation vidéo — à venir')"><div class="tile-head"><span class="badge badge-purple"><i data-lucide="video"></i> Formation</span></div><div class="tile-title">Vidéos &amp; webinaires</div><div class="tile-desc">Capsules courtes pour découvrir une fonctionnalité.</div></a>
        <a class="tile" href="#" onclick="event.preventDefault(); alert('Mailto support@naia.energy avec contexte préempli (page courante, version, organisation)')"><div class="tile-head"><span class="badge badge-green"><i data-lucide="message-circle"></i> Contact</span></div><div class="tile-title">Envoyer un message</div><div class="tile-desc">Direct à l'équipe Naia. Réponse sous 24 h ouvrées.</div></a>
        <a class="tile" href="#" onclick="event.preventDefault(); alert('Raccourcis clavier — à documenter')"><div class="tile-head"><span class="badge badge-slate"><i data-lucide="keyboard"></i> Raccourcis</span></div><div class="tile-title">Raccourcis clavier</div><div class="tile-desc">Naviguer plus vite : ?, /, g d, g p, g r…</div></a>
      </div>
      <div class="muted" style="font-size:11px; margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle)">
        Naia v0.9 · build 2026-05-03 · <a href="#" class="link">notes de version</a> · <a href="#" class="link">statut de la plateforme</a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function openHelp() {
  // Close profile dropdown if open
  const dd = document.getElementById("profile-dropdown");
  if (dd && dd.classList.contains("open")) {
    dd.classList.remove("open");
    const trigger = document.getElementById("profile-trigger");
    if (trigger) trigger.setAttribute("data-open", "false");
  }
  openOverlay("help-overlay");
  initIcons();
}

// ---- PORTAIL CLIENT : SELECTEUR D'ORGANISATION (v6.8, platform#1581) ----
// Un utilisateur appartient a 0, 1 ou plusieurs organisations. L'appartenance est
// optionnelle, multiple et TYPEE. L'utilisateur designe lui-meme son organisation
// « principale » : preference stockee, pas regle automatique ; c'est elle qui decide
// sur quelle organisation le portail s'ouvre a chaque connexion.
//
// REGLE DURE : rien n'est rendu en dessous de deux appartenances (garde-fou dans
// buildOrgSwitcher). Un utilisateur mono-organisation ne doit jamais voir de
// selecteur d'organisation.
//
// Le code vit ici et pas dans les trois pages du portail : les trois onglets
// partagent le meme controle. Meme idiome que buildCentraleTabs(), qui cherche son
// div hote et sort s'il n'existe pas.
//
// Vocabulaire d'appartenance : a valider par le PO. « Membre » est declare ci-dessous
// mais volontairement absent des donnees de demo, parce que le mot est deja pris sur
// profil.html, dans « Utilisateurs de l'organisation », ou il designe un NIVEAU DE
// DROITS et non un type d'appartenance.
const ORG_TYPES = {
  signataire:  { label: "Signataire",  badge: "badge-cyan",   gloss: "Signe le contrat et recoit les factures." },
  membre:      { label: "Membre",      badge: "badge-slate",  gloss: "Consulte et utilise les donnees de l'organisation." },
  mandataire:  { label: "Mandataire",  badge: "badge-purple", gloss: "Mandate par l'organisation (mainteneur, comptable) ; aucun droit sur la facturation." },
  ambassadeur: { label: "Ambassadeur", badge: "badge-green",  gloss: "Represente l'organisation dans la communaute Naia." },
};

// Donnees de demo. Moulin du Bocq reste l'organisation d'ouverture : c'est celle que
// tout le reste de la maquette nomme (barre laterale, plan d'abonnement, factures).
// Rwaza et Mairie d'Avaux sont les deux autres appartenances. TVA, adresses et emails
// sont fictifs.
const ORG_MEMBERSHIPS = [
  {
    slug: "bocq", name: "Moulin du Bocq", initials: "MB", type: "signataire",
    country: "Belgique", code: "BE", meta: "2 utilisateurs · 1 centrale",
    legal: "Moulin du Bocq SRL", vat: "BE0123.456.789",
    address: "Rue du Bocq 12<br>5530 Yvoir, Belgique", billing: "compta@moulin.be",
    ref: "MB-2026", plan: "Per-plant · 210 kW", points: "3 450",
  },
  {
    slug: "rwaza", name: "Rwaza", initials: "RW", type: "mandataire",
    country: "Rwanda", code: "RW", meta: "4 utilisateurs · 2 centrales",
    legal: "Rwaza Hydro Ltd", vat: "RW 102 938 471",
    address: "Rwaza, district de Musanze<br>Province du Nord, Rwanda", billing: "finance@rwaza.rw",
    ref: "RW-2026", plan: "Per-plant · 2 centrales", points: "1 120",
  },
  {
    slug: "avaux", name: "Mairie d'Avaux", initials: "MA", type: "ambassadeur",
    country: "France", code: "FR", meta: "3 utilisateurs · 1 centrale",
    legal: "Commune d'Avaux", vat: "FR 12 345 678 901",
    address: "Place de la Mairie 1<br>08190 Avaux, France", billing: "compta@avaux.fr",
    ref: "MA-2026", plan: "Per-plant · 90 kW", points: "260",
  },
];

// Levier de demo : nombre d'appartenances effectivement rendues.
//   3 = cas multi-organisations, le selecteur est visible ;
//   1 = mono-organisation, le selecteur disparait entierement de la barre du haut et
//       le marqueur « principale » disparait de la page d'accueil du portail ;
//   0 = aucune organisation, idem, et le pied de la barre laterale affiche
//       « Aucune organisation ».
// Passer la valeur a 1 ou a 0 puis recharger suffit a montrer la regle au PO.
const ORG_DEMO_COUNT = 3;

function orgList() { return ORG_MEMBERSHIPS.slice(0, ORG_DEMO_COUNT); }

// L'organisation principale decide sur quelle organisation le portail s'ouvre ;
// l'organisation consultee peut ensuite en differer, le temps de la session.
function getMainOrgSlug() {
  const orgs = orgList();
  if (!orgs.length) return "";
  const stored = localStorage.getItem("naia-org-main");
  return orgs.some(o => o.slug === stored) ? stored : orgs[0].slug;
}
function getCurrentOrgSlug() {
  const orgs = orgList();
  if (!orgs.length) return "";
  const stored = localStorage.getItem("naia-org");
  return orgs.some(o => o.slug === stored) ? stored : getMainOrgSlug();
}
function currentOrg() { return orgList().find(o => o.slug === getCurrentOrgSlug()) || null; }
function orgFootLine() {
  const org = currentOrg();
  return org ? org.name + " · " + org.code : "Aucune organisation";
}

// ---- Rendu du selecteur ----
function buildOrgSwitcher() {
  const host = document.getElementById("org-switcher");
  if (!host) return; // page hors portail : rien a faire
  const orgs = orgList();

  // REGLE DURE : a 0 ou 1 appartenance, pas de selecteur du tout.
  if (orgs.length < 2) { host.innerHTML = ""; host.hidden = true; return; }
  host.hidden = false;

  const prev = document.getElementById("org-switch");
  const wasOpen = !!prev && prev.dataset.open === "true";
  const cur = currentOrg();
  const mainSlug = getMainOrgSlug();

  const rows = orgs.map(o => {
    const t = ORG_TYPES[o.type];
    const isCur = o.slug === cur.slug;
    const isMain = o.slug === mainSlug;
    const marker = isMain
      ? `<span class="badge badge-amber" title="Le portail s'ouvre sur cette organisation."><i data-lucide="home"></i> Principale</span>`
      : `<button class="org-row-main" type="button" aria-label="Définir ${o.name} comme organisation principale" title="Le portail s'ouvrira sur cette organisation." onclick="setMainOrg('${o.slug}')"><i data-lucide="home"></i> Définir comme principale</button>`;
    return `
        <div class="org-row ${isCur ? "is-current" : ""}">
          <button class="org-row-pick" type="button" ${isCur ? 'aria-current="true"' : ""}
                  title="${isCur ? "Organisation affichée" : "Afficher cette organisation"}"
                  onclick="setCurrentOrg('${o.slug}')">
            <span class="avatar" aria-hidden="true">${o.initials}</span>
            <span class="org-row-txt">
              <span class="org-row-name">
                <span class="org-row-label">${o.name}</span>
                ${isCur ? `<i data-lucide="check" class="org-check"></i>` : ""}
              </span>
              <span class="org-row-meta">
                <span class="badge ${t.badge}" title="${t.gloss}">${t.label}</span>
                <span>${o.meta}</span>
              </span>
            </span>
          </button>
          ${marker}
        </div>`;
  }).join("");

  host.innerHTML = `
      <div class="tb-menu org-switch" id="org-switch" data-open="${wasOpen}">
        <button class="org-pill" type="button" id="org-switch-trigger"
                aria-haspopup="true" aria-expanded="${wasOpen}" aria-controls="org-switch-menu"
                aria-label="Organisation affichée : ${cur.name}. Changer d'organisation"
                title="Changer d'organisation" onclick="toggleOrgMenu()">
          <span class="avatar" aria-hidden="true">${cur.initials}</span>
          <span class="org-pill-name">${cur.name}</span>
          <i data-lucide="chevron-down" class="org-chev"></i>
        </button>
        <div class="org-menu" id="org-switch-menu" role="group" aria-label="Vos organisations">
          <div class="org-menu-head">Vos organisations (${orgs.length})</div>
          ${rows}
          <div class="org-menu-foot">Votre organisation principale est celle sur laquelle le portail s'ouvre à chaque connexion.</div>
        </div>
      </div>`;

  // Les <i data-lucide> qui viennent d'etre crees sont posterieurs a l'initIcons()
  // du demarrage : il faut redemander le rendu, comme le fait openHelp().
  initIcons();
}

// ---- Ouverture / fermeture ----
function setOrgMenuOpen(open) {
  const el = document.getElementById("org-switch");
  if (!el) return;
  el.dataset.open = open ? "true" : "false";
  const trigger = document.getElementById("org-switch-trigger");
  if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
}
function toggleOrgMenu() {
  const el = document.getElementById("org-switch");
  if (el) setOrgMenuOpen(el.dataset.open !== "true");
}
function closeOrgMenu() { setOrgMenuOpen(false); }

// Clic en dehors : on ne ferme que ce menu. Les menus de la barre d'outils de
// production.html ont leur propre fermeture, locale a la page.
document.addEventListener("click", e => { if (!e.target.closest("#org-switch")) closeOrgMenu(); });
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const el = document.getElementById("org-switch");
  if (!el || el.dataset.open !== "true") return;
  closeOrgMenu();
  const trigger = document.getElementById("org-switch-trigger");
  if (trigger) trigger.focus();
});

// ---- Actions ----
// Basculer vers une organisation : la maquette ne recharge pas la page, elle rejoue
// les surfaces qui portent un data-org-*.
function setCurrentOrg(slug) {
  localStorage.setItem("naia-org", slug);
  closeOrgMenu();
  buildOrgSwitcher();
  applyOrgIdentity();
  refreshSidebarOrg();
}
// Definir l'organisation principale : le menu reste ouvert, pour que le deplacement
// du marqueur soit visible sans avoir a rouvrir le panneau.
function setMainOrg(slug) {
  localStorage.setItem("naia-org-main", slug);
  buildOrgSwitcher();
  applyOrgIdentity();
}

// ---- Surfaces qui suivent l'organisation consultee ----
function refreshSidebarOrg() {
  const line = document.querySelector("[data-org-foot]");
  if (line) line.textContent = orgFootLine();
}
function applyOrgIdentity() {
  const org = currentOrg();
  const many = orgList().length > 1;
  const isMain = !!org && org.slug === getMainOrgSlug();

  // Marqueur « principale » en lecture seule : visible seulement en multi-appartenance,
  // et seulement quand l'organisation consultee est bien la principale.
  document.querySelectorAll("[data-org-main-marker]").forEach(el => { el.hidden = !(many && isMain); });
  if (!org) return;

  const put = (attr, value) => document.querySelectorAll("[" + attr + "]").forEach(el => { el.textContent = value; });
  put("data-org-name", org.name);
  put("data-org-initials", org.initials);
  put("data-org-meta", org.meta);
  put("data-org-country", org.country);
  put("data-org-legal", org.legal);
  put("data-org-vat", org.vat);
  put("data-org-billing", org.billing);
  put("data-org-ref", org.ref);
  put("data-org-plan", org.plan);
  put("data-org-points", org.points);
  document.querySelectorAll("[data-org-address]").forEach(el => { el.innerHTML = org.address; });

  const t = ORG_TYPES[org.type];
  document.querySelectorAll("[data-org-type]").forEach(el => {
    el.className = "badge " + t.badge;
    el.title = t.gloss;
    el.textContent = t.label;
  });
}

// ---- V6.8 MAQUETTE : BARRE LATÉRALE REPLIABLE · ACCÈS SOUS L'AVATAR ----
// Proposition à trancher (README, v6.8). Dans l'app, le rappel « Accès : <rôle> » est
// une ligne en tête de chaque écran de centrale (platform#1604). Ici il vit sous
// l'avatar, dans la barre étendue comme dans le rail replié.
//
// Libellés, phrases et teintes repris tels quels de l'app (PlantAccessBadge.vue,
// useAccessCopy, dashboard.access.* en FR) : deux vocabulaires pour un même accès
// finissent toujours par se contredire.
const PLANT_ROLES = {
  PLANT_ADMIN: { label: "Administrateur", short: "Admin",   hue: "#3b6fd4", help: "Accès complet : production, revenus, pertes détaillées, création et édition des pertes, ingestion de données, paramètres de la centrale et gestion des accès. Configuration de son panneau." },
  EDITOR:      { label: "Éditeur",        short: "Éditeur", hue: "#fb923c", help: "Accès : production et pertes détaillées, création et édition des pertes, ingestion de données. Sans les revenus. Configuration de son panneau." },
  VIEWER:      { label: "Lecteur",        short: "Lecteur", hue: "#60a5fa", help: "" },
  FINANCE:     { label: "Finance",        short: "Finance", hue: "#4ade80", help: "Accès restreint en lecture : production et revenus, sans aucune perte. Configuration de son panneau." },
};
// Le Lecteur tire son étendue et sa phrase du niveau de vue : « Lecteur » seul ne dit
// pas ce qui est retenu.
const VIEW_LEVELS = {
  1: { label: "Production seule",                help: "Accès restreint en lecture : production, sans les pertes ni les revenus. Configuration de son panneau." },
  2: { label: "Production et pertes totales",    help: "Accès restreint en lecture : production et total des pertes, sans les revenus. Configuration de son panneau." },
  3: { label: "Production et pertes détaillées", help: "Accès restreint en lecture : production et pertes par catégorie, sans les revenus. Configuration de son panneau." },
};
// Onglet « Tous » quand les rôles diffèrent. Gris proche de celui du rôle Support de
// l'app : c'est le texte (« Mixte ») qui les distingue, jamais la teinte seule.
const MIXED_ACCESS = { key: "MIXED", label: "Selon la centrale", short: "Mixte", hue: "#94a3b8", scope: "", help: "" };

function accessView(access) {
  const role = PLANT_ROLES[access.role];
  const level = access.role === "VIEWER" ? VIEW_LEVELS[access.viewLevel] : null;
  return {
    key: access.role + (level ? ":" + access.viewLevel : ""),
    label: role.label,
    short: role.short,
    hue: role.hue,
    scope: level ? level.label : "",
    help: level ? level.help : role.help,
  };
}

// Pastille du rôle (+ étendue du Lecteur). `withShort` ajoute le libellé court du rail.
function accessLineHTML(v, withShort = false) {
  const short = withShort ? `<span class="sb-role-short">${v.short}</span>` : "";
  const scope = v.scope ? `<span class="sb-access-scope">${v.scope}</span>` : "";
  return `<div class="sb-access-line"><span class="sb-role" style="--hue:${v.hue}"><span class="sb-role-full">${v.label}</span>${short}</span>${scope}</div>`;
}

// Un accès appartient à une centrale, pas à la personne : sans onglets de centrale
// (Profil, Communauté, Administration), le bloc disparaît.
function sidebarPlantSlug() {
  if (!document.querySelector("#centrale-tabs, #parametres-tabs, .centrale-tab[data-centrale]")) return null;
  return document.body.dataset.centrale || "all";
}

function refreshSidebarAccess() {
  const host = document.getElementById("sidebar-access");
  if (!host) return;
  const avatar = document.querySelector("#profile-trigger .avatar");
  const slug = sidebarPlantSlug();
  if (!slug) {
    host.hidden = true;
    host.innerHTML = "";
    if (avatar) avatar.style.boxShadow = "";
    return;
  }
  const one = CENTRALES.find(c => c.slug === slug);
  const plants = one ? [one] : CENTRALES;
  const views = plants.map(c => accessView(c.access));
  const head = views.every(v => v.key === views[0].key) ? views[0] : MIXED_ACCESS;
  const where = one ? one.label : "les " + plants.length + " centrales";

  const detail = head === MIXED_ACCESS
    ? `<div class="sb-pop-rows">${plants.map((c, i) => `<div><div class="sb-pop-plant">${c.label}</div>${accessLineHTML(views[i])}</div>`).join("")}</div>`
    : `${accessLineHTML(head)}<p class="sb-pop-help">${head.help}</p>`;

  host.hidden = false;
  // Anneau à la teinte du rôle : le seul signal qui survit au rail replié sans survol.
  if (avatar) avatar.style.boxShadow = `0 0 0 2px #070e20, 0 0 0 4px ${head.hue}`;
  host.innerHTML = `
    <div class="sb-access-cap">Accès sur ${where}</div>
    ${accessLineHTML(head, true)}
    <div class="sb-access-pop" id="sb-access-pop" role="tooltip">
      <div class="sb-pop-title">Votre accès sur ${where}</div>
      ${detail}
    </div>`;
}

// Rail replié, mémorisé dans le navigateur. Le bouton est en tête de la barre du haut,
// là où l'app place UDashboardSidebarCollapse.
function isSidebarCollapsed() { return localStorage.getItem("naia-sidebar") === "collapsed"; }
function setSidebarCollapsed(collapsed) {
  localStorage.setItem("naia-sidebar", collapsed ? "collapsed" : "expanded");
  applySidebarState();
}
function applySidebarState() {
  const collapsed = isSidebarCollapsed();
  document.body.dataset.sidebar = collapsed ? "collapsed" : "expanded";
  // Libellés masqués dans le rail : l'infobulle native les rend au survol.
  document.querySelectorAll("aside.sidebar .sidebar-item, #profile-trigger").forEach(el => {
    const label = (el.querySelector(".profile-id > div, span")?.textContent || "").trim();
    if (collapsed) el.title = label;
    else el.removeAttribute("title");
  });
  const btn = document.getElementById("sidebar-toggle");
  if (!btn) return;
  const text = collapsed ? "Déployer la barre latérale" : "Réduire la barre latérale";
  btn.title = text;
  btn.setAttribute("aria-label", text);
  btn.setAttribute("aria-expanded", String(!collapsed));
}
function injectSidebarToggle() {
  const bar = document.querySelector("header.topbar");
  if (!bar || document.getElementById("sidebar-toggle")) return;
  const first = bar.firstElementChild;
  const lead = document.createElement("div");
  lead.className = "topbar-lead";
  lead.innerHTML = `<button id="sidebar-toggle" class="sidebar-toggle" type="button" onclick="setSidebarCollapsed(!isSidebarCollapsed())"><i data-lucide="panel-left"></i></button>`;
  bar.insertBefore(lead, first);
  if (first) lead.appendChild(first);
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", getTheme());
  setShowV2(getShowV2());
  document.body.dataset.access = getAccess();
  buildSidebar();
  buildCentraleTabs();
  // Apply current centrale (from hash if present) on first paint so titles + chart match
  applyCentrale(currentCentrale());
  injectHelpModal();
  injectAccessToggle();
  buildOrgSwitcher();
  applyOrgIdentity();
  injectSidebarToggle();
  applySidebarState();
  refreshSidebarAccess();
  // app.js, data.html et parametres.html écrivent tous body[data-centrale] au changement
  // d'onglet : observer l'attribut évite de brancher chaque page.
  new MutationObserver(refreshSidebarAccess).observe(document.body, { attributes: true, attributeFilter: ["data-centrale"] });
  initIcons();
  setTimeout(() => {
    buildHomeChart();
    buildProductionChart();
    buildPointsChart();
    buildBelpexChart();
  }, 0);
});
