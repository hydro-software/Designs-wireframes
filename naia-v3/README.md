# Naia v3 — Interactive Prototype

Working HTML prototype of the settings redesign (issue [#261](https://github.com/hydro-software/platform/issues/261) v3).

**Live URL:** https://hydro-software.github.io/Wireframe-captures/naia-v3/

## Pages

| Page | Purpose |
|---|---|
| `index.html` | **Dashboard** — KPIs, 30-day production chart, **Configuration panel drawer** (wrench icon bottom-right) |
| `settings.html` | Plant list (Mes centrales) — click a plant to open detail |
| `plant-detail.html` | Plant detail with 6 sections + 3 modals (**Nouvel indicateur**, **Nouveau comparateur**, **Gérer la sélection**) |
| `data-import.html` | Données page — Centrale / Type / Entity picker + CSV drop zone |

## What to exercise

- **Dashboard drawer** — click the blue circular button at the bottom-right of the chart card. All 3 sections (Axes / Slots & étiquettes / Visibilité) are functional. Escape or click outside to close.
- **Plant detail modals** — scroll to section 6 "Indicateurs contextuels" and click the action buttons.
- **Button logic — indicator modal:** toggle "Simple" vs "Composé (moyenne pondérée)" — the submit button text changes ("Créer et importer les données" → "Créer") and the source + weight sliders appear for Composé.
- **Button logic — comparator modal:** toggle the 4 types — button text and conditional fields (Centrale source / Sans dimension toggle / Code région / Décalage) change per type. Only Simulation triggers "Créer et importer les données".
- **Dual-panel** — "Gérer la sélection" button opens the preselection UI.
- **Data import** — change the Type de données dropdown to see the entity picker appear for Indicateurs / Comparateurs.

## Tech

- Static HTML + Tailwind CDN + custom CSS
- Lucide icons, Inter font
- Chart.js for the dashboard chart (realistic fake data, 30 days)
- No build step — just open the files

## Iteration

Source under `C:\Dev\Wireframe-captures\naia-v3\` on Jan's machine. Changes pushed to `main`; GitHub Pages auto-rebuilds.
