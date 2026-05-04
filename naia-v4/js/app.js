// Naia v4 — integrated app mockup shell
// One sidebar driving the whole experience: Production / Revenue / Community /
// Paramètres top-level entries, each foldable to per-centrale (or per-topic) sub-items.
// Profile area at the bottom hosts subscription user surfaces + theme toggle.

const CENTRALES = [
  { slug: "moulins",  label: "Centrale des Moulins", capacity: "450 kW", country: "FR" },
  { slug: "bocq",     label: "Moulin du Bocq",       capacity: "210 kW", country: "BE" },
  { slug: "ariege",   label: "Centrale d'Ariège",    capacity: "780 kW", country: "FR" },
  { slug: "lesse",    label: "Moulin de la Lesse",   capacity: "320 kW", country: "BE" },
];

const COMMUNITY_TOPICS = [
  { slug: "earn",         label: "Gagner des points",    icon: "zap",         href: "community-earn.html",      tier: "v1" },
  { slug: "rewards",      label: "Récompenses",          icon: "gift",        href: "community-rewards.html",   tier: "v1" },
  { slug: "intelligence", label: "Intelligence",         icon: "lightbulb",   href: "community-intelligence.html", tier: "v1" },
  { slug: "market",       label: "Mises à jour marché",  icon: "trending-up", href: "community-market.html",    tier: "v1" },
  { slug: "agenda",       label: "Agenda",               icon: "calendar",    href: "community-agenda.html",    tier: "v1" },
  { slug: "leaderboard",  label: "Classement",           icon: "trophy",      href: "#",                        tier: "v2" },
  { slug: "visits",       label: "Visites de centrales", icon: "map-pin",     href: "#",                        tier: "v2" },
  { slug: "opportunities",label: "Opportunités",         icon: "rocket",      href: "#",                        tier: "v2" },
  { slug: "forum",        label: "Forum & annuaire",     icon: "users",       href: "#",                        tier: "v2" },
];

const ADMIN_TOPICS = [
  { slug: "admin-dashboard", label: "Tableau de bord", icon: "layout-dashboard", href: "admin.html" },
  { slug: "admin-programme", label: "Programme communauté", icon: "zap",         href: "admin-programme.html" },
  { slug: "admin-membres",   label: "Membres",             icon: "users",        href: "admin-membres.html" },
  { slug: "admin-abonnements", label: "Abonnements",       icon: "credit-card",  href: "admin-abonnements.html" },
  { slug: "admin-pricing",   label: "Pricing schedules",   icon: "list-ordered", href: "admin-pricing.html" },
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

// ---- SIDEBAR BUILD ----
function buildSidebar() {
  const aside = document.querySelector("aside.sidebar");
  if (!aside) return;
  const page = document.body.dataset.page || "";
  const section = document.body.dataset.section || ""; // production / revenue / community / parametres / admin
  const centrale = document.body.dataset.centrale || "all";

  // Determine which fold-outs default to open:
  const open = {
    production: section === "production",
    revenue:    section === "revenue",
    community:  section === "community",
    parametres: section === "parametres",
    admin:      section === "admin",
  };

  // All sections — production / revenue / parametres — now use hash-based tabs on
  // a single page per section. Sidebar centrale items deep-link to those hashes.
  const centraleItems = (sectionSlug) => {
    return CENTRALES.map(c => {
      const isActive = sectionSlug === section && centrale === c.slug;
      return `<a href="${sectionSlug}.html#${c.slug}" class="subnav-item ${isActive ? 'active' : ''}">
        <span>${c.label}</span>
      </a>`;
    }).join("");
  };

  // "All" / "General" first item per section.
  // - production / revenue: aggregated view across centrales (Tous · agrégé)
  // - parametres: organisation-wide settings (Général)
  const allItem = (sectionSlug) => {
    if (sectionSlug === "parametres") {
      const isActive = section === "parametres" && centrale === "all";
      return `<a href="parametres.html#general" class="subnav-item ${isActive ? 'active' : ''}" style="font-weight:600">
        <span>Général · org.</span>
      </a>`;
    }
    const isActive = section === sectionSlug && centrale === "all";
    return `<a href="${sectionSlug}.html#all" class="subnav-item ${isActive ? 'active' : ''}" style="font-weight:600">
      <span>Tous · agrégé</span>
    </a>`;
  };

  const communityItems = COMMUNITY_TOPICS.map(t => {
    const activeClass = (page === t.slug) ? "active" : "";
    const v2Class = t.tier === "v2" ? "v2" : "";
    const v2Pill = t.tier === "v2" ? `<span class="v2-pill">V2</span>` : "";
    const onclick = t.href === "#" ? `onclick="event.preventDefault(); alert('${t.label} — V2 (mockée)')"` : "";
    return `<a href="${t.href}" class="subnav-item ${activeClass} ${v2Class}" ${onclick}>
      <span>${t.label}</span>
      ${v2Pill}
    </a>`;
  }).join("");

  const adminItems = ADMIN_TOPICS.map(t => {
    const activeClass = (page === t.slug) ? "active" : "";
    return `<a href="${t.href}" class="subnav-item ${activeClass}">
      <span>${t.label}</span>
    </a>`;
  }).join("");

  aside.innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-logo"><i data-lucide="waves"></i></div>
      <div>
        <div class="sidebar-brand-name">Naia</div>
        <div class="sidebar-brand-sub">Hydroélectricité</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <a href="index.html" class="sidebar-item ${section === '' && page === 'home' ? 'active' : ''}">
        <i data-lucide="layout-dashboard"></i>
        <span>Tableau de bord</span>
      </a>

      <div class="sidebar-section-title">Pilotage</div>

      <a href="production.html" class="sidebar-item ${section === 'production' ? 'active' : ''}" aria-expanded="${open.production}">
        <i data-lucide="zap"></i>
        <span>Production</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.production}">
        ${allItem('production')}
        ${centraleItems('production')}
      </div>

      <a href="revenue.html" class="sidebar-item ${section === 'revenue' ? 'active' : ''}" aria-expanded="${open.revenue}">
        <i data-lucide="euro"></i>
        <span>Revenus</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.revenue}">
        ${allItem('revenue')}
        ${centraleItems('revenue')}
      </div>

      <a href="data.html" class="sidebar-item ${section === 'data' ? 'active' : ''}">
        <i data-lucide="upload"></i>
        <span>Données</span>
      </a>

      <a href="reports.html" class="sidebar-item ${section === 'reports' ? 'active' : ''}">
        <i data-lucide="file-text"></i>
        <span>Rapports</span>
      </a>

      <a href="simulateur.html" class="sidebar-item ${section === 'simulateur' ? 'active' : ''}">
        <i data-lucide="cpu"></i>
        <span>Simulateur</span>
        <span class="badge-mini" style="background:rgba(217,119,6,0.3); color:#fcd34d; border:1px solid rgba(251,191,36,0.4)">V2</span>
      </a>

      <a href="inbox.html" class="sidebar-item ${section === 'inbox' ? 'active' : ''}">
        <i data-lucide="inbox"></i>
        <span>Inbox</span>
        <span class="badge-mini">3</span>
      </a>

      <div class="sidebar-section-title">Communauté</div>

      <a href="community-earn.html" class="sidebar-item ${section === 'community' ? 'active' : ''}" aria-expanded="${open.community}">
        <i data-lucide="users"></i>
        <span>Communauté</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.community}">
        ${communityItems}
      </div>

      <div class="sidebar-section-title">Configuration</div>

      <a href="parametres.html" class="sidebar-item ${section === 'parametres' ? 'active' : ''}" aria-expanded="${open.parametres}">
        <i data-lucide="settings"></i>
        <span>Paramètres</span>
        <i data-lucide="chevron-right" class="chev" onclick="event.preventDefault(); event.stopPropagation(); toggleFoldByLink(this)"></i>
      </a>
      <div class="subnav" data-open="${open.parametres}">
        ${allItem('parametres')}
        ${centraleItems('parametres')}
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

    <div id="profile-container" style="position:relative">
      <button id="profile-trigger" class="profile-trigger" onclick="toggleProfileDropdown()" data-open="false">
        <div class="avatar" style="width:30px; height:30px; font-size:11px">MD</div>
        <div style="flex:1; min-width:0">
          <div style="color:white; font-size:13px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">Marc Dupont</div>
          <div style="color:rgba(255,255,255,0.55); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">Moulin du Bocq · BE</div>
        </div>
        <i data-lucide="chevron-up" class="chev-up" style="width:14px; height:14px"></i>
      </button>
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

// ---- PROFILE DROPDOWN ----
function toggleProfileDropdown() {
  let dd = document.getElementById("profile-dropdown");
  const trigger = document.getElementById("profile-trigger");
  if (!dd) {
    dd = document.createElement("div");
    dd.id = "profile-dropdown";
    dd.className = "profile-dropdown";
    dd.innerHTML = `
      <a href="profil.html"><i data-lucide="user" style="width:14px;height:14px"></i> Mon profil</a>
      <a href="profil-abonnement.html"><i data-lucide="credit-card" style="width:14px;height:14px"></i> Mon abonnement</a>
      <a href="profil-factures.html"><i data-lucide="file-text" style="width:14px;height:14px"></i> Mes factures</a>
      <a href="profil-jetons.html"><i data-lucide="coins" style="width:14px;height:14px"></i> Mes jetons</a>
      <button onclick="alert('Mes badges — par utilisateur (Marc et Sophie ont chacun les leurs).')"><i data-lucide="award" style="width:14px;height:14px"></i> Mes badges</button>
      <button onclick="openHelp()"><i data-lucide="life-buoy" style="width:14px;height:14px"></i> Aide &amp; support</button>
      <div class="divider"></div>
      <div class="theme-row">
        <span style="display:inline-flex; align-items:center; gap:8px"><i data-lucide="palette" style="width:14px;height:14px"></i> Thème</span>
        <span class="seg">
          <button data-theme-btn="dark" onclick="setTheme('dark')"><i data-lucide="moon"></i> Sombre</button>
          <button data-theme-btn="light" onclick="setTheme('light')"><i data-lucide="sun"></i> Clair</button>
        </span>
      </div>
      <div class="theme-row" style="padding-top:0">
        <span style="display:inline-flex; align-items:center; gap:8px"><i data-lucide="flask-conical" style="width:14px;height:14px"></i> Voir V2 (mockup)</span>
        <span class="seg">
          <button data-v2-btn="false" onclick="setShowV2(false); refreshV2Buttons()">Off</button>
          <button data-v2-btn="true" onclick="setShowV2(true); refreshV2Buttons()">On</button>
        </span>
      </div>
      <button onclick="alert('Langue — FR / DE / EN (à venir)')"><i data-lucide="globe" style="width:14px;height:14px"></i> Langue</button>
      <a href="admin.html"><i data-lucide="shield" style="width:14px;height:14px"></i> Administration</a>
      <div class="divider"></div>
      <button class="danger" onclick="alert('Déconnexion (démo)')"><i data-lucide="log-out" style="width:14px;height:14px"></i> Se déconnecter</button>
    `;
    document.getElementById("profile-container").appendChild(dd);
    initIcons();
    refreshThemeButtons();
    refreshV2Buttons();
  }
  const isOpen = dd.classList.toggle("open");
  if (trigger) trigger.setAttribute("data-open", isOpen ? "true" : "false");
}

function refreshV2Buttons() {
  const v = getShowV2();
  document.querySelectorAll("[data-v2-btn]").forEach(b => b.classList.toggle("on", b.dataset.v2Btn === String(v)));
}

document.addEventListener("click", (e) => {
  const container = document.getElementById("profile-container");
  if (!container || container.contains(e.target)) return;
  const dd = document.getElementById("profile-dropdown");
  const trigger = document.getElementById("profile-trigger");
  if (dd && dd.classList.contains("open")) {
    dd.classList.remove("open");
    if (trigger) trigger.setAttribute("data-open", "false");
  }
});

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
  // Update active class on tabs
  document.querySelectorAll(".centrale-tab").forEach(t => t.classList.toggle("active", t.dataset.centrale === slug));
  // Update centrale-aware texts in the page
  const c = CENTRALES.find(x => x.slug === slug);
  document.querySelectorAll("[data-centrale-name]").forEach(el => {
    el.textContent = slug === "all" ? "Vue agrégée · 4 centrales" : (c ? c.label : "—");
  });
  document.querySelectorAll("[data-centrale-capacity]").forEach(el => {
    el.textContent = slug === "all" ? "Total · 1 760 kW" : (c ? c.capacity : "—");
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
  dark:  { bar: "#38bdf8", bar2: "#6ee7b7", line: "#a3e635", grid: "rgba(255,255,255,0.05)", axis: "rgba(255,255,255,0.45)", tooltipBg: "#0f1a32", tooltipFg: "#e2e8f0" },
  light: { bar: "#2563eb", bar2: "#16a34a", line: "#65a30d", grid: "#eef1f6",                  axis: "#5c6b85",                tooltipBg: "#0f172a", tooltipFg: "#f8fafc" },
};
function chartColors() { return NAIA_CHART_PALETTE[getTheme()] || NAIA_CHART_PALETTE.dark; }

function buildHomeChart() {
  const c = document.getElementById("home-chart");
  if (!c || !window.Chart) return;
  const colors = chartColors();
  const months = ["Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc","Jan","Fév","Mars","Avr"];
  const monthlyMWh = [142, 168, 159, 124, 110, 92, 88, 124, 198, 215, 245, 196];
  const cumulative = monthlyMWh.reduce((a, v, i) => { a.push((i ? a[i-1] : 0) + v); return a; }, []);
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        { label: "Production mensuelle (MWh)", data: monthlyMWh, backgroundColor: colors.bar, borderRadius: 4, categoryPercentage: 0.78, barPercentage: 0.86 },
        { label: "Production cumulée (MWh)", type: "line", data: cumulative, borderColor: colors.line, backgroundColor: "transparent", borderWidth: 2.5, tension: 0.3, pointRadius: 3, pointBackgroundColor: colors.line, yAxisID: "y2" }
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
        legend: { display: true, position: "bottom", labels: { color: colors.axis, font: { size: 11 } } },
        tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg, padding: 10, cornerRadius: 8 }
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

// ---- HELP BUTTON & PANEL (#8) ----
// Floating "?" icon at bottom-right of every page; clicking opens a help drawer
// with manuals + "Send message to support" CTA. Also reachable from the profile dropdown.
function injectHelpButton() {
  if (document.getElementById("help-fab")) return;
  const fab = document.createElement("button");
  fab.id = "help-fab";
  fab.title = "Aide & support";
  fab.setAttribute("aria-label", "Aide & support");
  fab.innerHTML = `<i data-lucide="life-buoy"></i>`;
  fab.style.cssText = `
    position: fixed; bottom: 22px; right: 22px;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--brand-blue-strong);
    color: white;
    border: 1px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 24px -6px rgba(0,0,0,0.5);
    cursor: pointer;
    z-index: 40;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.18s, background 0.18s;
  `;
  fab.onmouseenter = () => { fab.style.transform = "translateY(-2px)"; fab.style.background = "var(--brand-blue)"; };
  fab.onmouseleave = () => { fab.style.transform = "none"; fab.style.background = "var(--brand-blue-strong)"; };
  fab.onclick = openHelp;
  document.body.appendChild(fab);

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

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", getTheme());
  setShowV2(getShowV2());
  buildSidebar();
  buildCentraleTabs();
  // Apply current centrale (from hash if present) on first paint so titles + chart match
  applyCentrale(currentCentrale());
  injectHelpButton();
  initIcons();
  setTimeout(() => {
    buildHomeChart();
    buildProductionChart();
    buildPointsChart();
    buildBelpexChart();
  }, 0);
});
