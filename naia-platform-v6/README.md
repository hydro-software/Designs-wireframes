# Naia v6 — post-Bernard integrated mockup

**Live prototype: https://hydro-software.github.io/Designs-wireframes/naia-platform-v6/**

Iteration of [`naia-platform-v5/`](../naia-platform-v5/) that folds in Bernard's full design rework documented in [Designs-wireframes#1](https://github.com/hydro-software/Designs-wireframes/issues/1) (originally drafted under `bl_draft/`).

`naia-platform-v5/` is kept untouched as the comparison reference for the conference-scope discussion in [platform#599](https://github.com/hydro-software/platform/issues/599).

## Changelog · v5 → v6

Three pages changed vs. v5: `parametres.html`, `data.html`, and the chart-config overlay in `production.html`. Everything else (sidebar, Tableau de bord, Production chart body, Revenus, Profil, MVP 0.9 toggle, Légende side panels…) is identical to v5.

### Paramètres (`parametres.html`)

- **New section order**: Infos générales → Infos détaillées → Catégories de pertes → Compteurs → Tarification → Indicateurs → Comparateur → Flux de production → Flux de revenus → Partage d'accès → Utilisateurs & rôles.
- **New section "Flux de revenus"** — multiple revenue streams **cumulate** to form the global revenue. **Validity belongs to the whole period**, not to each individual flux. A history selector switches between periods (e.g. a supplier change in 2023 creates a new period / new stack). Cliquable demo.
- **Composite indicators** — every composite formula now has a **constant** in 1st position, shown as `constante + a · data_A + b · data_B`. Help text: *"set the coefficient to 0 if the composite depends on only one data point"*.
- **Catégories de pertes — simplified to 2 radio columns + 1 checkbox column**: *Défaut type* (radio — 1 of 6 categories), *Défaut sous-type* (radio — 1 per type), *Affichage* (checkbox). The old free-text/dropdown defaults are gone.
- **Partage d'accès** — the "Retirer" icon button becomes a **Modifier** link that opens a modal where the role can be changed *or* the access removed.
- **Rename**: "Indicateurs contextuels" → "Indicateurs" throughout the page.

### Données (`data.html`)

- **"Compteur" → "Source de données"** — generic label that works for the three pill types (Électricité · Indicateur · Prix d'Électricité).
- **Unit shown as read-only inline text** (e.g. *"kWh · définie dans Paramètres → Compteurs · non modifiable"*) — no more unit dropdown. The unit is the one bound to the selected source in Paramètres.
- **Format timestamp + Mode d'enregistrement (Fréquentiel | Évènementiel) moved up** into the "Type de données" card on a common row, so all the import-shape choices live together. The upload card is just the file drop.
- **Default mode flipped to Évènementiel**.
- **"?" help tip on the Mode row** — hover/focus reveals a popover explaining: *Fréquentielle* → régulier (5 min, 15 min, …) · *Événementielle* → variable, nouveau point quand la valeur change. Inter-point behaviour: linear interpolation for électricité/indicateurs, staircase (constant) for prix.
- **"Imports récents" column** renamed `Compteur / Indicateur` → `Source de données`.

### Production — `#chart-config` overlay (reached from the sliders icon + the bottom-right wrench)

Replaced the v5 2-column checkbox + axis-dropdown overlay with the *Configuration du panneau* structure:

- **Axe** section — three collapsible axis blocks: *Axe gauche* (Puissance / Énergie), *Axe droit 1* (Pluie), *Axe droit 2* (indicator chosen inline via a small select in the title). Each block holds a 4-column grid (Intraday / 30 jours / 12 mois / Années) with a per-resolution **unit selector + Min + Max** field, plus a per-axis **Réinitialiser** button.
- **Indicateurs contextuels** — two collapsible slot tables: *Histogramme inversé* (2 slots — étiquette + source) and *Indicateurs courbes* (3 slots — étiquette + source + visible range with optional "Rogner" clamp + Réinit.).
- **Comparateur** — one slot table with étiquette + source + visible range as **% of axis** + scale factor.
- **Message WhatsApp** — placeholder block, section collapsed by default.
- Modal widened to 920 px (`.modal-cfg`) to fit the per-resolution grids.

CSS additions live inline in `production.html` (scoped to `#chart-config`) so they don't leak into the rest of the app.

## Carried forward from v5

The May 2026 team-review changes are unchanged in v6 — see [`naia-platform-v5/README.md`](../naia-platform-v5/README.md) for the full v4 → v5 changelog. Highlights:

- Sidebar restructured under **Pilotage** (no per-centrale fold-outs; centrales reached via top tabs on each page); **Rapports** removed (CTA on the Tableau de bord); **Inbox** under Communauté.
- Tableau de bord: centrales tabs on top with "Tous"; KPI tiles live ONLY here.
- Production + Revenus: graph-first (no KPI tiles), breadcrumbs + Intraday / 30 j / 12 m / Années time pills, left Indicateurs + right Légende side panels (collapse into thin vertical strips with rotated label + chevron), bottom-left quick comparator pills + bottom-right wrench config icon, right-axis toggle floating pill above the right axis, WhatsApp maintenance event strip on Production intraday (ref [platform#229](https://github.com/hydro-software/platform/issues/229)).
- Profil: top tabs only, Sécurité + Mes badges removed, new Paramètres utilisateur tile on Identité (MFA · Langue · Thème · Se déconnecter). The bottom-left sidebar profile button navigates directly to `profil.html` — no popup.
- **MVP 0.9 conference toggle** top-right ("Vue conférence"): hides MVP1-only items via `body[data-mvp="0.9"] [data-mvp="1"] { display: none }`. MVP 0.9 surface = Production · Revenus · Données · Paramètres · Profil (identity only).

## Tech stack

Static multi-page site, no build step:

- Tailwind CSS via Play CDN
- Inter from Google Fonts
- Lucide icons via CDN
- Chart.js via CDN with theme-aware palette
- One shared `css/style.css` (dark + light token sets)
- One shared `js/app.js` (sidebar, centrale tabs, theme/MVP toggles, chart helpers)

## Iteration

Feedback lands as commit-by-commit edits on this folder. Each push auto-rebuilds GitHub Pages within ~60 seconds.

## Related

- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD (specification only)
- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD (specification only)
- Earlier versions kept for comparison: [`naia-v4/`](../naia-v4/) · [`naia-platform-v5/`](../naia-platform-v5/)
- Bernard's original drafts (superseded by v6, kept for history): [`bl_draft/`](../bl_draft/)
