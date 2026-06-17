// Naia Points v1 — shared interactions & UI injection
// Portal: "member" or "admin" (set via <body data-portal="...">)
// Page: slug of current page (set via <body data-page="...">)

// ---- Navigation data ----
const MEMBER_NAV = [
  { section: "Principal" },
  { slug: "dashboard",     label: "Tableau de bord",       icon: "layout-dashboard", href: "index.html" },
  { slug: "earn",          label: "Gagner des points",     icon: "zap",              href: "earn.html" },
  { slug: "rewards",       label: "Récompenses",           icon: "gift",             href: "rewards.html" },
  { slug: "leaderboard",   label: "Classement",            icon: "trophy",           href: "leaderboard.html" },
  { section: "Communauté" },
  { slug: "community",     label: "Communauté",            icon: "users",            href: "community.html" },
  { slug: "visits",        label: "Visites de centrales",  icon: "map-pin",          href: "visits.html" },
  { slug: "market",        label: "Intelligence de marché",icon: "newspaper",        href: "market.html" },
  { slug: "opportunities", label: "Opportunités",          icon: "trending-up",      href: "opportunities.html" },
  { section: "Mon compte" },
  { slug: "profile",       label: "Profil",                icon: "user",             href: "profile.html" },
];

const ADMIN_NAV = [
  { section: "Pilotage" },
  { slug: "dashboard",     label: "Tableau de bord",        icon: "layout-dashboard", href: "index.html" },
  { slug: "members",       label: "Membres",                icon: "users",            href: "members.html" },
  { section: "Programme" },
  { slug: "activities",    label: "Activités",              icon: "zap",              href: "activities.html" },
  { slug: "benefits",      label: "Avantages",              icon: "gift",             href: "benefits.html", count: 4 },
  { slug: "visits",        label: "Visites de centrales",   icon: "map-pin",          href: "visits.html" },
  { slug: "content",       label: "Contenu",                icon: "newspaper",        href: "content.html" },
  { slug: "opportunities", label: "Opportunités",           icon: "trending-up",      href: "opportunities.html" },
  { section: "Configuration" },
  { slug: "settings",      label: "Paramètres",             icon: "settings",         href: "settings.html" },
];

// ---- Shell injection ----
function injectShell() {
  const body = document.body;
  const portal = body.dataset.portal || "member";
  const page = body.dataset.page || "";
  const pageTitle = body.dataset.title || "";
  const pageSub = body.dataset.subtitle || "";

  const navItems = portal === "admin" ? ADMIN_NAV : MEMBER_NAV;
  // Admin pages live in admin/; member pages live in root
  const hrefPrefix = portal === "admin" ? "" : "";
  // link from member -> admin portal, or admin -> member home
  const crossPortalHref = portal === "admin" ? "../index.html" : "admin/index.html";
  const crossPortalLabel = portal === "admin" ? "← Portail membre" : "Portail admin →";

  // Build sidebar HTML
  const navHtml = navItems.map(item => {
    if (item.section) {
      return `<div class="sidebar-section-title">${item.section}</div>`;
    }
    const activeClass = item.slug === page ? "active" : "";
    const countHtml = item.count ? `<span class="count">${item.count}</span>` : "";
    return `<a href="${item.href}" class="sidebar-item ${activeClass}">
      <i data-lucide="${item.icon}"></i>
      <span>${item.label}</span>
      ${countHtml}
    </a>`;
  }).join("");

  const brandSub = portal === "admin" ? "Administration" : "Communauté";

  const sidebarHtml = `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-logo">N</div>
        <div>
          <div class="sidebar-brand-name">Naia Points</div>
          <div class="sidebar-brand-sub">${brandSub}</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${navHtml}
        <div class="sidebar-section-title" style="margin-top:14px">${portal === "admin" ? "Accès" : "Raccourci"}</div>
        <a href="${crossPortalHref}" class="sidebar-item">
          <i data-lucide="${portal === "admin" ? "arrow-left" : "shield"}"></i>
          <span>${crossPortalLabel}</span>
        </a>
      </nav>
      <div id="profile-container" style="position:relative">
        <button id="profile-trigger" class="profile-trigger" onclick="toggleProfileDropdown()" data-open="false">
          <div class="avatar avatar-sm">${portal === "admin" ? "AD" : "MD"}</div>
          <div style="flex:1; min-width:0">
            <div style="font-size:13px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">
              ${portal === "admin" ? "Admin Naia" : "Marc Dupont"}
            </div>
            <div style="font-size:11px; color:rgba(255,255,255,0.55); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">
              ${portal === "admin" ? "admin@naia.energy" : "marc.dupont@moulin.be"}
            </div>
          </div>
          <i data-lucide="chevron-up" class="chevron-up" style="width:14px; height:14px"></i>
        </button>
      </div>
    </aside>
  `;

  // Build topbar HTML (page header row)
  const memberTopbarRight = `
    <div class="points-pill">
      <i data-lucide="sparkles"></i>
      <span class="tabular">3 450 pts</span>
    </div>
    <span class="tier-pill tier-gold"><i data-lucide="award" style="width:12px;height:12px"></i> Argent</span>
    <button class="lang-switcher" onclick="alert('Changement de langue — FR / DE / EN (à venir)')">
      <i data-lucide="globe"></i> FR
    </button>
    <button class="btn-ghost" onclick="alert('Notifications (à venir)')" style="position:relative; padding:8px; border-radius:8px">
      <i data-lucide="bell" style="width:18px; height:18px"></i>
      <span style="position:absolute; top:4px; right:4px; width:8px; height:8px; background:var(--naia-danger); border-radius:50%; border:2px solid white"></span>
    </button>
  `;
  const adminTopbarRight = `
    <button class="lang-switcher" onclick="alert('Changement de langue — FR / DE / EN (à venir)')">
      <i data-lucide="globe"></i> FR
    </button>
    <button class="btn btn-secondary btn-sm" onclick="alert('Centre de notifications (à venir)')">
      <i data-lucide="bell"></i> 4 notifications
    </button>
  `;

  const topbarHtml = `
    ${portal === "admin" ? `<div class="admin-banner"><i data-lucide="shield"></i> Portail d'administration — Naia Points</div>` : ""}
    <header class="topbar">
      <div>
        <div class="page-title font-display">${pageTitle}</div>
        ${pageSub ? `<div class="page-sub">${pageSub}</div>` : ""}
      </div>
      <div style="display:flex; align-items:center; gap:10px">
        ${portal === "admin" ? adminTopbarRight : memberTopbarRight}
      </div>
    </header>
  `;

  // Wrap existing content in shell
  const existingMain = document.getElementById("page-content");
  if (!existingMain) return;

  // Build full shell
  const shell = document.createElement("div");
  shell.className = "app-shell";
  shell.innerHTML = sidebarHtml + `<div class="main-area">${topbarHtml}<div class="content" id="content-wrapper"></div></div>`;

  // Move existing content into the wrapper
  const mainWrapper = shell.querySelector("#content-wrapper");
  mainWrapper.appendChild(existingMain);

  body.insertBefore(shell, body.firstChild);
}

// ---- Modal / Drawer helpers ----
function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("open");
  document.body.style.overflow = "";
}
function openDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(id + "-overlay");
  if (drawer) drawer.classList.add("open");
  if (overlay) overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(id + "-overlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ESC closes whatever's open
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".overlay.open").forEach(el => el.classList.remove("open"));
  document.querySelectorAll(".drawer.open, .drawer-overlay.open").forEach(el => el.classList.remove("open"));
  document.body.style.overflow = "";
});

// ---- Toggle switches ----
document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".toggle");
  if (!toggle) return;
  toggle.classList.toggle("on");
});

// ---- Tabs ----
document.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  const group = tab.closest(".tabs");
  if (!group) return;
  group.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  // Show corresponding panel if data-tab-target is used
  const target = tab.dataset.tabTarget;
  if (target) {
    const scope = group.parentElement;
    scope.querySelectorAll("[data-tab-panel]").forEach(p => {
      p.style.display = p.dataset.tabPanel === target ? "" : "none";
    });
  }
});

// ---- Profile dropdown ----
function toggleProfileDropdown() {
  const trigger = document.getElementById("profile-trigger");
  const dropdown = document.getElementById("profile-dropdown");
  if (!trigger || !dropdown) return;
  const isOpen = dropdown.classList.toggle("open");
  trigger.setAttribute("data-open", isOpen ? "true" : "false");
}
document.addEventListener("click", (e) => {
  const container = document.getElementById("profile-container");
  if (!container || container.contains(e.target)) return;
  const dropdown = document.getElementById("profile-dropdown");
  const trigger = document.getElementById("profile-trigger");
  if (dropdown && dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    if (trigger) trigger.setAttribute("data-open", "false");
  }
});

function openProfile() {
  toggleProfileDropdown();
  const portal = document.body.dataset.portal || "member";
  // Member portal has a dedicated /profile page — navigate there
  if (portal === "member") {
    window.location.href = "profile.html";
  } else {
    alert("Gestion du profil admin (à venir)");
  }
}

function handleLogout() {
  toggleProfileDropdown();
  alert("Déconnexion (démo — la vraie déconnexion sera implémentée)");
}

// ---- Inject profile dropdown ----
function injectProfileDropdown() {
  if (!document.getElementById("profile-container")) return;
  if (document.getElementById("profile-dropdown")) return;
  const portal = document.body.dataset.portal || "member";
  const dd = document.createElement("div");
  dd.id = "profile-dropdown";
  dd.className = "profile-dropdown";
  dd.innerHTML = `
    <button onclick="openProfile()">
      <i data-lucide="user" style="width:16px;height:16px"></i> ${portal === "admin" ? "Mon profil" : "Mon profil"}
    </button>
    <button onclick="toggleProfileDropdown(); alert('Paramètres linguistiques (à venir)')">
      <i data-lucide="globe" style="width:16px;height:16px"></i> Langue
    </button>
    <button onclick="toggleProfileDropdown(); alert('Aide et support (à venir)')">
      <i data-lucide="help-circle" style="width:16px;height:16px"></i> Aide
    </button>
    <div class="divider"></div>
    <button class="danger" onclick="handleLogout()">
      <i data-lucide="log-out" style="width:16px;height:16px"></i> Se déconnecter
    </button>
  `;
  document.getElementById("profile-container").appendChild(dd);
}

// ---- Icons ----
function initIcons() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  }
}

// ---- Dashboard chart (points over time) ----
function buildPointsChart() {
  const canvas = document.getElementById("points-chart");
  if (!canvas || !window.Chart) return;

  const labels = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8", "Sem 9", "Sem 10", "Sem 11", "Sem 12"];
  const earned    = [120, 180, 90, 250, 140, 320, 210, 180, 290, 340, 260, 380];
  const redeemed  = [0,   0,   100, 0,   250, 0,   0,   300, 0,   0,   250, 0];
  const cumulative = earned.reduce((acc, v, i) => {
    const prev = i === 0 ? 2100 : acc[i - 1];
    acc.push(prev + v - redeemed[i]);
    return acc;
  }, []);

  return new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Points gagnés", type: "bar", data: earned, backgroundColor: "#8DC63F", borderRadius: 4, categoryPercentage: 0.7, yAxisID: "y" },
        { label: "Points dépensés", type: "bar", data: redeemed.map(v => -v), backgroundColor: "#f59e0b", borderRadius: 4, categoryPercentage: 0.7, yAxisID: "y" },
        { label: "Solde cumulé", type: "line", data: cumulative, borderColor: "#00B4D8", backgroundColor: "rgba(0,180,216,0.1)", borderWidth: 2.5, tension: 0.3, pointRadius: 3, pointBackgroundColor: "#00B4D8", fill: true, yAxisID: "y2" }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } } },
        y: { position: "left", title: { display: true, text: "Points (sem.)", color: "#5c6b85", font: { size: 11 } }, grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85", font: { size: 11 } } },
        y2: { position: "right", title: { display: true, text: "Solde", color: "#5c6b85", font: { size: 11 } }, grid: { display: false }, ticks: { color: "#5c6b85", font: { size: 11 } } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: "#0f172a", titleColor: "#f8fafc", bodyColor: "#e2e8f0", padding: 12, cornerRadius: 8 }
      }
    }
  });
}

// ---- Admin dashboard chart (points issued/redeemed, member growth) ----
function buildAdminPointsChart() {
  const canvas = document.getElementById("admin-points-chart");
  if (!canvas || !window.Chart) return;

  const labels = Array.from({ length: 12 }, (_, i) => {
    const months = ["Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc","Jan","Fév","Mars","Avr"];
    return months[i];
  });
  const issued    = [1200, 1650, 1800, 2100, 2400, 2800, 3100, 2900, 3400, 3800, 4200, 4600];
  const redeemed  = [400, 600, 750, 900, 1100, 1300, 1500, 1400, 1700, 1900, 2200, 2500];

  return new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Points émis", data: issued, backgroundColor: "#8DC63F", borderRadius: 4, categoryPercentage: 0.8, barPercentage: 0.45 },
        { label: "Points échangés", data: redeemed, backgroundColor: "#00B4D8", borderRadius: 4, categoryPercentage: 0.8, barPercentage: 0.45 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#5c6b85" } },
        y: { beginAtZero: true, grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85" } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function buildMemberGrowthChart() {
  const canvas = document.getElementById("member-growth-chart");
  if (!canvas || !window.Chart) return;
  const labels = ["Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc","Jan","Fév","Mars","Avr"];
  const data = [18, 24, 31, 38, 46, 55, 62, 68, 78, 85, 94, 112];
  return new Chart(canvas.getContext("2d"), {
    type: "line",
    data: { labels, datasets: [{ label: "Membres", data, borderColor: "#1A2B4A", backgroundColor: "rgba(0,180,216,0.15)", borderWidth: 2.5, tension: 0.35, pointRadius: 3, pointBackgroundColor: "#00B4D8", fill: true }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { x: { grid: { display: false }, ticks: { color: "#5c6b85" } }, y: { beginAtZero: true, grid: { color: "#eef1f6" }, ticks: { color: "#5c6b85" } } },
      plugins: { legend: { display: false } }
    }
  });
}

// ---- Redeem helper (rewards page) ----
function redeem(name, cost) {
  if (confirm(`Échanger ${cost} points contre « ${name} » ?`)) {
    alert(`Demande envoyée. L'équipe Naia vous contactera sous 48 h pour organiser la suite.`);
  }
}

// ---- Page init ----
document.addEventListener("DOMContentLoaded", () => {
  injectShell();
  injectProfileDropdown();
  initIcons();
  setTimeout(() => {
    buildPointsChart();
    buildAdminPointsChart();
    buildMemberGrowthChart();
  }, 0);
});
