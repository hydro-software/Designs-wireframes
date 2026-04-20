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

// ---- Page init ----
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  if (document.getElementById('main-chart')) {
    // Defer to next tick so Chart.js has loaded from CDN
    setTimeout(buildDashboardChart, 0);
  }
});
