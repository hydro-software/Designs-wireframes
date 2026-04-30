// Naia Points v2 — Community as integrated module within Naia
// Builds the shared sidebar, top tabs, and V2 toggle for every page.

// Community navigation config (V1 + V2)
const COMMUNITY_NAV = [
  { slug: "earn",          label: "Gagner des points",      icon: "zap",         href: "index.html",         tier: "v1" },
  { slug: "rewards",       label: "Récompenses",            icon: "gift",        href: "rewards.html",       tier: "v1" },
  { slug: "intelligence",  label: "Intelligence",           icon: "lightbulb",   href: "intelligence.html",  tier: "v1" },
  { slug: "market",        label: "Mises à jour marché",    icon: "trending-up", href: "market.html",        tier: "v1" },
  { slug: "agenda",        label: "Agenda",                 icon: "calendar",    href: "agenda.html",        tier: "v1" },
  { slug: "leaderboard",   label: "Classement",             icon: "trophy",      href: "#",                  tier: "v2" },
  { slug: "visits",        label: "Visites de centrales",   icon: "map-pin",     href: "#",                  tier: "v2" },
  { slug: "opportunities", label: "Opportunités",           icon: "rocket",      href: "#",                  tier: "v2" },
  { slug: "community",     label: "Forum & annuaire",       icon: "users",       href: "#",                  tier: "v2" },
];

// ---- V2 toggle ----
function getShowV2() {
  return localStorage.getItem("naia-show-v2") === "true";
}
function setShowV2(v) {
  localStorage.setItem("naia-show-v2", v ? "true" : "false");
  document.body.dataset.showV2 = v ? "true" : "false";
}
function toggleV2() {
  setShowV2(!getShowV2());
  initIcons();
}

// ---- Sidebar build ----
function buildSidebar() {
  const aside = document.querySelector("aside.sidebar");
  if (!aside) return;
  const activePage = document.body.dataset.page || "";

  // Top-level nav (Naia main app, Community section visible & expanded)
  aside.innerHTML = `
    <div class="p-5 flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
        <i data-lucide="waves" class="text-blue-300"></i>
      </div>
      <div>
        <div class="text-white font-semibold text-sm">Naia</div>
        <div class="text-slate-400 text-xs">Hydroélectricité</div>
      </div>
    </div>

    <nav class="px-3 flex-1 flex flex-col gap-1 mt-2 overflow-y-auto">
      <a href="../naia-v3/index.html" class="sidebar-item">
        <i data-lucide="layout-dashboard"></i> Tableau de bord
      </a>
      <a href="../naia-v3/data-import.html" class="sidebar-item">
        <i data-lucide="upload"></i> Données
      </a>

      <div class="sidebar-section-title">Communauté</div>
      <div class="subnav-wrap" id="community-subnav"></div>

      <a href="../naia-v3/settings.html" class="sidebar-item" style="margin-top:6px">
        <i data-lucide="settings"></i> Paramètres
      </a>
    </nav>

    <div id="profile-container" class="relative">
      <button id="profile-trigger" class="profile-trigger" onclick="toggleProfileDropdown()" data-open="false">
        <div class="w-9 h-9 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">MD</div>
        <div class="min-w-0 flex-1">
          <div class="text-white text-sm font-medium truncate">Marc Dupont</div>
          <div class="text-slate-400 text-xs truncate">Moulin du Bocq · BE</div>
        </div>
        <i data-lucide="chevron-up" class="chevron-up" style="width:16px;height:16px"></i>
      </button>
    </div>
  `;

  // Community sub-nav
  const subnav = document.getElementById("community-subnav");
  subnav.innerHTML = COMMUNITY_NAV.map(item => {
    const activeClass = (item.slug === activePage) ? "active" : "";
    const v2Class = item.tier === "v2" ? "v2" : "";
    const v2Pill = item.tier === "v2" ? `<span class="v2-pill">V2</span>` : "";
    const onclick = (item.href === "#") ? `onclick="event.preventDefault(); alert('${item.label} — fonctionnalité V2 (mockée pour validation)')"` : "";
    return `<a href="${item.href}" class="subnav-item ${activeClass} ${v2Class}" ${onclick}>
      <i data-lucide="${item.icon}" style="width:14px; height:14px"></i>
      <span>${item.label}</span>
      ${v2Pill}
    </a>`;
  }).join("");
}

// ---- Top tabs (community 2nd-level when on a community page) ----
function buildCommunityTabs() {
  const tabsHost = document.getElementById("community-tabs");
  if (!tabsHost) return;
  const activePage = document.body.dataset.page || "";

  tabsHost.innerHTML = COMMUNITY_NAV.map(item => {
    const activeClass = item.slug === activePage ? "active" : "";
    const v2Class = item.tier === "v2" ? "v2" : "";
    const v2Pill = item.tier === "v2" ? `<span class="v2-pill">V2</span>` : "";
    const onclick = item.href === "#" ? `onclick="event.preventDefault(); alert('${item.label} — V2 (mockée)')"` : "";
    return `<a href="${item.href}" class="community-tab ${activeClass} ${v2Class}" ${onclick}>
      <i data-lucide="${item.icon}" style="width:13px; height:13px"></i>
      ${item.label}
      ${v2Pill}
    </a>`;
  }).join("");
}

// ---- V2 toggle markup ----
function buildV2Toggle() {
  const host = document.getElementById("v2-toggle");
  if (!host) return;
  host.innerHTML = `
    <span class="v2-slider-wrap" onclick="toggleV2()">
      <span class="toggle"><span class="knob"></span></span>
      <span class="label-wrap">
        <span style="font-weight:500">Afficher V2</span>
        <span class="hint">Mockup uniquement</span>
      </span>
    </span>
  `;
}

// ---- Profile dropdown ----
function toggleProfileDropdown() {
  let dd = document.getElementById("profile-dropdown");
  const trigger = document.getElementById("profile-trigger");
  if (!dd) {
    dd = document.createElement("div");
    dd.id = "profile-dropdown";
    dd.className = "profile-dropdown";
    dd.innerHTML = `
      <a href="profil.html"><button><i data-lucide="user" style="width:16px;height:16px"></i> Mon profil</button></a>
      <a href="profil-abonnement.html"><button><i data-lucide="credit-card" style="width:16px;height:16px"></i> Mon abonnement</button></a>
      <a href="profil-factures.html"><button><i data-lucide="file-text" style="width:16px;height:16px"></i> Mes factures</button></a>
      <a href="profil-jetons.html"><button><i data-lucide="coins" style="width:16px;height:16px"></i> Mes jetons</button></a>
      <div class="divider"></div>
      <button onclick="alert('Mes badges — visibles sur votre profil. Les points sont au niveau de l\\'organisation; les badges sont par utilisateur.')"><i data-lucide="award" style="width:16px;height:16px"></i> Mes badges</button>
      <button onclick="alert('Langue — FR / DE / EN (à venir)')"><i data-lucide="globe" style="width:16px;height:16px"></i> Langue</button>
      <a href="admin.html"><button><i data-lucide="shield" style="width:16px;height:16px"></i> Administration</button></a>
      <div class="divider"></div>
      <button onclick="alert('Déconnexion (démo)')" style="color: var(--naia-danger)"><i data-lucide="log-out" style="width:16px;height:16px"></i> Se déconnecter</button>
    `;
    // Make the wrapping <a> visually transparent (use button styles)
    dd.querySelectorAll('a').forEach(a => {
      a.style.textDecoration = 'none';
      a.style.color = 'inherit';
      a.style.display = 'block';
    });
    document.getElementById("profile-container").appendChild(dd);
    initIcons();
  }
  const isOpen = dd.classList.toggle("open");
  if (trigger) trigger.setAttribute("data-open", isOpen ? "true" : "false");
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

// ---- Modal helpers ----
function openOverlay(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add("open"); document.body.style.overflow = "hidden"; }
}
function closeOverlay(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove("open"); document.body.style.overflow = ""; }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".overlay.open").forEach(el => el.classList.remove("open"));
    document.body.style.overflow = "";
  }
});

// ---- Icons ----
function initIcons() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  }
}

// ---- Charts ----
function buildPointsChart() {
  const c = document.getElementById("points-chart");
  if (!c || !window.Chart) return;
  const labels = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8","Sem 9","Sem 10","Sem 11","Sem 12"];
  const earned = [80, 120, 100, 220, 140, 280, 180, 200, 250, 320, 240, 380];
  const spent = [0,0,100,0,0,250,0,200,0,0,250,0];
  const balance = earned.reduce((acc, v, i) => { acc.push((i ? acc[i-1] : 1800) + v - spent[i]); return acc; }, []);
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Gagnés", data: earned, backgroundColor: "#16a34a", borderRadius: 4, categoryPercentage: 0.7 },
        { label: "Dépensés", data: spent.map(v => -v), backgroundColor: "#d97706", borderRadius: 4, categoryPercentage: 0.7 },
        { label: "Solde", type: "line", data: balance, borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.1)", borderWidth: 2.5, tension: 0.3, pointRadius: 3, pointBackgroundColor: "#2563eb", fill: true, yAxisID: "y2" }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } } },
        y: { grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } }, title: { display: true, text: "Points (sem.)", color: "#5c6b85" } },
        y2: { position: "right", grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } }, title: { display: true, text: "Solde", color: "#5c6b85" } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function buildBelpexChart() {
  const c = document.getElementById("belpex-chart");
  if (!c || !window.Chart) return;
  const days = Array.from({length: 14}, (_, i) => `${i + 10}/04`);
  const baseload = [78, 85, 92, 88, 75, 70, 68, 82, 90, 105, 115, 95, 88, 92];
  const peakload = [110, 125, 140, 130, 105, 95, 90, 120, 135, 165, 180, 145, 130, 138];
  return new Chart(c.getContext("2d"), {
    type: "line",
    data: {
      labels: days,
      datasets: [
        { label: "Base load (€/MWh)", data: baseload, borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.08)", borderWidth: 2, tension: 0.35, pointRadius: 0, pointHoverRadius: 4, fill: true },
        { label: "Peak load (€/MWh)", data: peakload, borderColor: "#dc2626", backgroundColor: "rgba(220,38,38,0.04)", borderWidth: 2, tension: 0.35, pointRadius: 0, pointHoverRadius: 4, fill: false, borderDash: [4, 4] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } } },
        y: { grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } }, title: { display: true, text: "€/MWh", color: "#5c6b85" } }
      },
      plugins: { legend: { display: true, position: "bottom", labels: { color: "#5c6b85", font: { size: 12 } } } }
    }
  });
}

function buildRainChart() {
  const c = document.getElementById("rain-chart");
  if (!c || !window.Chart) return;
  const days = Array.from({length: 30}, (_, i) => `${i + 1}`);
  const rain = [0, 2, 6, 14, 9, 0, 0, 0, 1, 3, 5, 8, 12, 7, 2, 0, 0, 0, 0, 1, 4, 9, 11, 6, 2, 0, 0, 1, 3, 5];
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: { labels: days, datasets: [{ label: "Pluie (mm)", data: rain, backgroundColor: "#0891b2", borderRadius: 3 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 10 }, maxTicksLimit: 10 } },
        y: { grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } }, title: { display: true, text: "mm/jour", color: "#5c6b85" } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function buildMixChart() {
  const c = document.getElementById("mix-chart");
  if (!c || !window.Chart) return;
  return new Chart(c.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["Nucléaire", "Hydraulique", "Éolien", "Solaire", "Gaz", "Autres"],
      datasets: [{
        data: [62, 11, 14, 6, 4, 3],
        backgroundColor: ["#475569", "#0891b2", "#16a34a", "#fbbf24", "#dc2626", "#94a3b8"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: "right", labels: { color: "#5c6b85", font: { size: 12 }, padding: 14 } } }
    }
  });
}

function buildCapacityChart() {
  const c = document.getElementById("capacity-chart");
  if (!c || !window.Chart) return;
  const months = ["Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc","Jan","Fév","Mars","Avr"];
  return new Chart(c.getContext("2d"), {
    type: "line",
    data: {
      labels: months,
      datasets: [
        { label: "Éolien (GW)", data: [21,21,21,22,22,22,23,23,23,24,24,24], borderColor: "#16a34a", borderWidth: 2, tension: 0.3, pointRadius: 0, fill: false },
        { label: "Solaire (GW)", data: [16,17,18,18,19,19,19,19,20,20,21,22], borderColor: "#fbbf24", borderWidth: 2, tension: 0.3, pointRadius: 0, fill: false },
        { label: "Hydraulique (GW)", data: [25.5,25.5,25.5,25.5,25.6,25.6,25.6,25.6,25.6,25.6,25.7,25.7], borderColor: "#0891b2", borderWidth: 2, tension: 0.3, pointRadius: 0, fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } } },
        y: { grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } } }
      },
      plugins: { legend: { display: true, position: "bottom", labels: { color: "#5c6b85", font: { size: 11 } } } }
    }
  });
}

function buildSurveyChart() {
  const c = document.getElementById("survey-chart");
  if (!c || !window.Chart) return;
  return new Chart(c.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["< 1 500 €", "1 500 – 2 500 €", "2 500 – 4 000 €", "4 000 – 6 000 €", "> 6 000 €"],
      datasets: [{ data: [12, 28, 32, 18, 10], backgroundColor: "#2563eb", borderRadius: 4 }]
    },
    options: {
      indexAxis: "y", responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } }, title: { display: true, text: "% des répondants", color: "#5c6b85" } },
        y: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 12 } } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  setShowV2(getShowV2());
  buildSidebar();
  buildCommunityTabs();
  buildV2Toggle();
  initIcons();
  setTimeout(() => {
    buildPointsChart();
    buildBelpexChart();
    buildRainChart();
    buildMixChart();
    buildCapacityChart();
    buildSurveyChart();
  }, 0);
});
