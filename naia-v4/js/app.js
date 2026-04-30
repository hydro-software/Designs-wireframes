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

  const centraleItems = (sectionSlug) => CENTRALES.map(c =>
    `<a href="${sectionSlug}-${c.slug}.html" class="subnav-item ${centrale === c.slug && section === sectionSlug ? 'active' : ''}"
        onclick="if(!document.querySelector('a[href=&quot;${sectionSlug}-${c.slug}.html&quot;]')?.getAttribute('data-real')) { event.preventDefault(); alert('Mockup: ${c.label} — ${sectionLabel(sectionSlug)} (page de détail à venir).'); }">
      <span>${c.label}</span>
    </a>`
  ).join("");

  const allItem = (sectionSlug, label, currentSection) => `<a href="${sectionSlug}.html" class="subnav-item ${centrale === 'all' && section === sectionSlug ? 'active' : ''}"
        style="font-weight:600">
      <span>Tous · agrégé</span>
    </a>`;

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

      <div class="sidebar-item ${section === 'production' ? 'active' : ''}" onclick="toggleFold(this)" aria-expanded="${open.production}">
        <i data-lucide="zap"></i>
        <span>Production</span>
        <i data-lucide="chevron-right" class="chev"></i>
      </div>
      <div class="subnav" data-open="${open.production}">
        ${allItem('production')}
        ${centraleItems('production')}
      </div>

      <div class="sidebar-item ${section === 'revenue' ? 'active' : ''}" onclick="toggleFold(this)" aria-expanded="${open.revenue}">
        <i data-lucide="euro"></i>
        <span>Revenus</span>
        <i data-lucide="chevron-right" class="chev"></i>
      </div>
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

      <a href="inbox.html" class="sidebar-item ${section === 'inbox' ? 'active' : ''}">
        <i data-lucide="inbox"></i>
        <span>Inbox</span>
        <span class="badge-mini">3</span>
      </a>

      <div class="sidebar-section-title">Communauté</div>

      <div class="sidebar-item ${section === 'community' ? 'active' : ''}" onclick="toggleFold(this)" aria-expanded="${open.community}">
        <i data-lucide="users"></i>
        <span>Communauté</span>
        <i data-lucide="chevron-right" class="chev"></i>
      </div>
      <div class="subnav" data-open="${open.community}">
        ${communityItems}
      </div>

      <div class="sidebar-section-title">Configuration</div>

      <div class="sidebar-item ${section === 'parametres' ? 'active' : ''}" onclick="toggleFold(this)" aria-expanded="${open.parametres}">
        <i data-lucide="settings"></i>
        <span>Paramètres</span>
        <i data-lucide="chevron-right" class="chev"></i>
      </div>
      <div class="subnav" data-open="${open.parametres}">
        <a href="parametres.html" class="subnav-item ${centrale === 'all' && section === 'parametres' ? 'active' : ''}" style="font-weight:600">
          <span>Vue d'ensemble</span>
        </a>
        ${centraleItems('parametres')}
      </div>

      <div class="sidebar-item ${section === 'admin' ? 'active' : ''}" onclick="toggleFold(this)" aria-expanded="${open.admin}">
        <i data-lucide="shield"></i>
        <span>Administration</span>
        <i data-lucide="chevron-right" class="chev"></i>
      </div>
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

// Toggle fold state for a sidebar parent item
function toggleFold(el) {
  const subnav = el.nextElementSibling;
  if (!subnav || !subnav.classList.contains("subnav")) return;
  const open = subnav.dataset.open === "true";
  subnav.dataset.open = open ? "false" : "true";
  el.setAttribute("aria-expanded", open ? "false" : "true");
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
function buildCentraleTabs() {
  const host = document.getElementById("centrale-tabs");
  if (!host) return;
  const section = document.body.dataset.section || "";
  const active = document.body.dataset.centrale || "all";

  const items = [
    { slug: "all", label: "Tous", capacity: "1.76 MW · 4 centrales" },
    ...CENTRALES.map(c => ({ slug: c.slug, label: c.label, capacity: c.capacity })),
  ];

  host.innerHTML = items.map(c => {
    const activeClass = active === c.slug ? "active" : "";
    const allClass = c.slug === "all" ? "all" : "";
    const href = c.slug === "all" ? `${section}.html` : `${section}-${c.slug}.html`;
    return `<a href="${href}" class="centrale-tab ${activeClass} ${allClass}"
              onclick="${href.includes('-') && c.slug !== 'all' ? `if(!confirmReal(this)) { event.preventDefault(); alert('${c.label} — page de détail à venir dans le mockup. Le tab change l\\'URL et l\\'état actif comme prévu.'); }` : ''}">
      <span>${c.label}</span>
      <span class="cap">${c.capacity}</span>
    </a>`;
  }).join("");
}
function confirmReal() { return false; } // placeholder; per-centrale pages aren't built individually

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

// ---- PRODUCTION CHART (Naia-style daily bars + flow line) ----
function buildProductionChart() {
  const c = document.getElementById("production-chart");
  if (!c || !window.Chart) return;
  const colors = chartColors();
  const days = Array.from({ length: 60 }, (_, i) => {
    const d = new Date(2026, 1, 1); d.setDate(d.getDate() + i);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  });
  const production = days.map((_, i) => {
    const seasonal = 8500 + Math.sin(i / 8) * 2000;
    const noise = (Math.sin(i * 0.7) + Math.cos(i * 0.3)) * 400;
    let v = seasonal + noise;
    if (i === 30 || i === 31 || i === 32) v = 100;
    if (i === 11 || i === 12 || i === 13) v = 50;
    return Math.max(0, Math.round(v));
  });
  const flow = days.map((_, i) => 4 + Math.sin(i / 9) * 1.4 + (Math.cos(i * 0.5) * 0.3));
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        { label: "Production (kWh/jour)", data: production, backgroundColor: colors.bar, borderRadius: 2, categoryPercentage: 0.85, barPercentage: 0.95 },
        { label: "Débit (m³/s)", type: "line", data: flow, borderColor: colors.line, borderWidth: 2, tension: 0.35, pointRadius: 0, pointHoverRadius: 4, yAxisID: "y2", fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.axis, font: { size: 10 }, maxTicksLimit: 14 } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.axis, font: { size: 11 } }, title: { display: true, text: "kWh", color: colors.axis } },
        y2: { position: "right", grid: { display: false }, ticks: { color: colors.axis, font: { size: 11 } }, title: { display: true, text: "Débit m³/s", color: colors.axis } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: colors.tooltipBg, titleColor: colors.tooltipFg, bodyColor: colors.tooltipFg, padding: 10, cornerRadius: 8 }
      }
    }
  });
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

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", getTheme());
  setShowV2(getShowV2());
  buildSidebar();
  buildCentraleTabs();
  initIcons();
  setTimeout(() => {
    buildHomeChart();
    buildProductionChart();
    buildPointsChart();
    buildBelpexChart();
  }, 0);
});
