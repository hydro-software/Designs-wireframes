// Naia v3 prototype — shared interactions

// ---- Modal / Drawer helpers ----
function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}
function openDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(id + '-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
}
function closeDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(id + '-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ESC closes drawer/modal
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.overlay.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.drawer.open, .drawer-overlay.open').forEach(el => el.classList.remove('open'));
  document.body.style.overflow = '';
});

// ---- Collapsible sections ----
document.addEventListener('click', (e) => {
  const head = e.target.closest('.collapsible-head');
  if (!head) return;
  const section = head.closest('.collapsible');
  const isOpen = section.dataset.open === 'true';
  section.dataset.open = isOpen ? 'false' : 'true';
});

// ---- Toggle (switch) ----
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.toggle');
  if (!toggle) return;
  toggle.classList.toggle('on');
  const event = new CustomEvent('toggle-change', {
    detail: { on: toggle.classList.contains('on') },
    bubbles: true
  });
  toggle.dispatchEvent(event);
});

// ---- Init Lucide icons globally ----
function initIcons() {
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

// ---- Chart.js helpers (dashboard) ----
function buildDashboardChart() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return null;

  // 30-day realistic-ish fake data for Centrale de la Dordogne
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(2026, 3, i + 1); // April 2026
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  });
  const production = [5.1, 4.8, 5.4, 5.9, 6.2, 6.0, 5.7, 5.2, 4.9, 4.6, 4.3, 4.1, 4.5, 5.0, 5.6, 6.1, 6.4, 6.3, 6.0, 5.5, 5.1, 4.8, 4.7, 4.9, 5.3, 5.8, 6.2, 6.4, 6.1, 5.7];
  const dailyMda = [4.8, 4.5, 5.0, 5.4, 5.6, 5.4, 5.2, 4.9, 4.6, 4.3, 4.1, 3.9, 4.2, 4.7, 5.1, 5.5, 5.7, 5.6, 5.4, 5.0, 4.8, 4.5, 4.4, 4.6, 5.0, 5.3, 5.6, 5.7, 5.5, 5.2];
  const rain = [0, 2, 8, 14, 6, 0, 0, 0, 0, 0, 0, 1, 3, 9, 15, 11, 5, 1, 0, 0, 0, 2, 5, 3, 0, 0, 0, 0, 1, 3];
  const flow = [3.1, 3.2, 3.5, 4.1, 4.5, 4.2, 3.8, 3.5, 3.2, 3.0, 2.8, 2.6, 2.9, 3.4, 4.0, 4.4, 4.3, 4.0, 3.7, 3.4, 3.2, 3.1, 3.3, 3.2, 3.0, 3.2, 3.5, 3.6, 3.4, 3.2];

  const ctx = canvas.getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Production',
          type: 'bar',
          data: production,
          backgroundColor: '#2563eb',
          borderRadius: 3,
          categoryPercentage: 0.85,
          barPercentage: 0.9,
          yAxisID: 'y',
          order: 2
        },
        {
          label: 'DAILY MDA',
          type: 'bar',
          data: dailyMda,
          backgroundColor: '#a78bfa',
          borderRadius: 3,
          categoryPercentage: 0.85,
          barPercentage: 0.9,
          yAxisID: 'y',
          order: 2
        },
        {
          label: 'Débit',
          type: 'line',
          data: flow,
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 4,
          yAxisID: 'y2',
          order: 1
        },
        {
          label: 'Météo (pluie)',
          type: 'bar',
          data: rain.map(v => -v),
          backgroundColor: '#60a5fa',
          borderRadius: 2,
          categoryPercentage: 0.85,
          barPercentage: 0.5,
          yAxisID: 'y3',
          order: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#5c6b85', font: { size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 10 }
        },
        y: {
          position: 'left',
          title: { display: true, text: 'MWh', color: '#5c6b85', font: { size: 11 } },
          beginAtZero: true,
          max: 9,
          grid: { color: '#eef1f6' },
          ticks: { color: '#5c6b85', font: { size: 11 } }
        },
        y2: {
          position: 'right',
          title: { display: true, text: 'm³/s', color: '#5c6b85', font: { size: 11 } },
          beginAtZero: true,
          max: 6,
          grid: { display: false },
          ticks: { color: '#5c6b85', font: { size: 11 } }
        },
        y3: {
          display: false,
          min: -50,
          max: 50
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#f8fafc',
          bodyColor: '#e2e8f0',
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (ctx) => {
              let v = ctx.parsed.y;
              const label = ctx.dataset.label;
              if (label === 'Météo (pluie)') v = Math.abs(v) + ' mm';
              else if (label === 'Débit') v = v.toFixed(1) + ' m³/s';
              else v = v.toFixed(2) + ' MWh';
              return `${label}: ${v}`;
            }
          }
        }
      }
    }
  });
}

// ---- Profile dropdown ----
function toggleProfileDropdown() {
  const trigger = document.getElementById('profile-trigger');
  const dropdown = document.getElementById('profile-dropdown');
  if (!trigger || !dropdown) return;
  const isOpen = dropdown.classList.toggle('open');
  trigger.setAttribute('data-open', isOpen ? 'true' : 'false');
}
document.addEventListener('click', (e) => {
  const container = document.getElementById('profile-container');
  if (!container || container.contains(e.target)) return;
  const dropdown = document.getElementById('profile-dropdown');
  const trigger = document.getElementById('profile-trigger');
  if (dropdown && dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
    if (trigger) trigger.setAttribute('data-open', 'false');
  }
});

function openProfile() {
  toggleProfileDropdown();
  openOverlay('profile-modal');
}

function handleLogout() {
  toggleProfileDropdown();
  alert('Déconnexion (démo — la vraie déconnexion sera implémentée)');
}

// ---- Inject shared profile UI into every page ----
function injectProfileUI() {
  const existing = document.getElementById('profile-container');
  if (!existing) return;
  // Add dropdown if not already there
  if (!document.getElementById('profile-dropdown')) {
    const dd = document.createElement('div');
    dd.id = 'profile-dropdown';
    dd.className = 'profile-dropdown';
    dd.innerHTML = `
      <button onclick="openProfile()">
        <i data-lucide="user" style="width:16px;height:16px"></i> Mon profil
      </button>
      <button onclick="toggleProfileDropdown(); alert('Paramètres linguistiques (à venir)')">
        <i data-lucide="globe" style="width:16px;height:16px"></i> Langue
      </button>
      <div class="divider"></div>
      <button class="danger" onclick="handleLogout()">
        <i data-lucide="log-out" style="width:16px;height:16px"></i> Se déconnecter
      </button>
    `;
    existing.appendChild(dd);
  }
  // Add profile modal to body if not there
  if (!document.getElementById('profile-modal')) {
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'overlay';
    modal.setAttribute('onclick', "if(event.target===this)closeOverlay('profile-modal')");
    modal.innerHTML = `
      <div class="modal">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="modal-title">Mon profil</h3>
            <p class="modal-subtitle">Informations personnelles et préférences</p>
          </div>
          <button class="btn-ghost p-1" onclick="closeOverlay('profile-modal')"><i data-lucide="x"></i></button>
        </div>

        <div class="flex items-center gap-4 mb-6 pb-5 border-b border-slate-200">
          <div class="w-14 h-14 rounded-full bg-blue-600 text-white font-semibold text-lg flex items-center justify-center">JD</div>
          <div>
            <div class="font-semibold text-base">Jean Dupont</div>
            <div class="text-sm muted">jean@example.com</div>
          </div>
        </div>

        <div>
          <div class="info-row">
            <span class="info-row-label">Prénom</span>
            <span class="info-row-value">Jean</span>
          </div>
          <div class="info-row">
            <span class="info-row-label">Nom</span>
            <span class="info-row-value">Dupont</span>
          </div>
          <div class="info-row">
            <span class="info-row-label">Email</span>
            <span class="info-row-value">jean@example.com</span>
          </div>
          <div class="info-row">
            <span class="info-row-label">Langue</span>
            <span class="info-row-value">Français</span>
          </div>
          <div class="info-row">
            <span class="info-row-label">Type d'utilisateur</span>
            <span class="info-row-value"><span class="badge badge-comp">Administrateur</span></span>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button class="btn btn-secondary">
            <i data-lucide="key" style="width:14px;height:14px"></i> Modifier le mot de passe
          </button>
          <div class="flex gap-2">
            <button class="btn btn-secondary" onclick="closeOverlay('profile-modal')">Fermer</button>
            <button class="btn btn-primary">
              <i data-lucide="edit-3" style="width:14px;height:14px"></i> Modifier
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  // Re-run icon init
  initIcons();
}

// ---- Page init ----
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  injectProfileUI();
  if (document.getElementById('main-chart')) {
    // Defer to next tick so Chart.js has loaded from CDN
    setTimeout(buildDashboardChart, 0);
  }
});
