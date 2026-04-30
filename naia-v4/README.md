# Naia v4 — integrated app mockup

**Live prototype: https://hydro-software.github.io/Designs-wireframes/naia-v4/**

The canonical mockup of the Naia integrated application after the team review (April 2026) and [ADR-001](https://github.com/hydro-software/platform/blob/dev/product-system/architecture-decisions/001-one-integrated-app.md) (one integrated app, three modules: Naia / Community / Subscription).

Replaces:
- `naia-points-v1/` — deprecated (kept for reference)
- `naia-points-v2/` — superseded (kept for Community-pattern reference)
- `naia-v3/` — earlier in-flight settings mockup; v4 supersedes it visually

## Visual language

- **Dark theme primary**, matching the actual Naia platform (cf. screenshots in `hydro-software/game/.screenshots/`).
- **Light theme available** via the profile dropdown (bottom-left). Stored in `localStorage`.
- Brand: navy (`#0a1326`) base, cyan (`#38bdf8`) accent, lime (`#a3e635`) for chart line, amber for warnings, soft slate text.
- Typography: Inter, with `cv11` + `ss01` features and `tabular-nums` on numbers.
- Charts: Chart.js with tokens that follow the active theme.

## Sidebar pattern (per [#327 comment](https://github.com/hydro-software/platform/issues/327#issuecomment-4353857794))

Top-level items fold open to per-centrale (Production / Revenus / Paramètres) or per-topic (Communauté) children. Clicking a parent opens the aggregated view; clicking a child scopes to that centrale.

```
Tableau de bord
Production              ← click = aggregated, fold = per-centrale tabs
  ├ Tous · agrégé
  ├ Centrale des Moulins
  ├ Moulin du Bocq
  ├ Centrale d'Ariège
  └ Moulin de la Lesse
Revenus                 (same pattern)
Données
Rapports
Inbox
Communauté              ← folds to topics
  ├ Gagner des points
  ├ Récompenses
  ├ Intelligence
  ├ Mises à jour marché
  ├ Agenda
  └ V2 stubs (behind toggle)
Paramètres              (per-centrale)
Administration          (admin-only — folds to programme / membres / abonnements / pricing)
```

Profile area at bottom-left → opens dropdown with Mon profil, Mon abonnement, Mes factures, Mes jetons, Mes badges, theme toggle (sombre / clair), V2 toggle, Langue, Administration, Se déconnecter.

## Pages

### Naia core (existing app, replicated)
- `index.html` — Tableau de bord (KPIs ce mois / YTD / facteur de charge / revenus, monthly chart with cumulative line, per-centrale snapshot, report wizard CTA — addresses #261)
- `production.html` — Production agrégée + centrale tabs + 60-day chart (Naia-style) + losses table
- `revenue.html` — Revenus agrégés + per-centrale breakdown + V2 simulator banner
- `data.html` — Données (centrales as tabs, upload area, recent imports, indicators relegated to settings — addresses #261)
- `parametres.html` — Paramètres (current-state, with #261 evolution flagged in banner)
- `reports.html` — Rapports list
- `inbox.html` — Notifications

### Profile (subscription user surface)
- `profil.html` — Identity + organization summary + badges (per-user, not per-org)
- `profil-abonnement.html` — Plan detail with bracket breakdown + comparison enterprise/per-plant + pricing schedule v01 reference
- `profil-factures.html` — Invoice list with download
- `profil-jetons.html` — Token balance with three sources (purchase / inclusion / conversion) + history + deep-link to community-rewards for conversion

### Community module (V1)
- `community-earn.html` — Gagner des points (org-level balance, game promo, activity catalogue grouped by category)
- `community-rewards.html` — Récompenses (token conversion modal, reward catalogue, V2 visit reward grayed)
- `community-intelligence.html` — Articles (6 cards across the editorial programmes) + survey card + webinars
- `community-market.html` — Mises à jour marché (Belpex chart, source health table, region selector)
- `community-agenda.html` — Events list (upcoming / past)

### Administration (admin-only)
- `admin.html` — Cross-module dashboard with shortcuts to programme communauté + abonnements
- `admin-programme.html` — Activity catalogue (org-level points, in-process triggers, frequency caps) + approval queue
- `admin-membres.html` — Community-scoped member view (tier, points, conversions, activity, badges, parrainage)
- `admin-abonnements.html` — Customer table (plan, status, MRR, health, dunning) — owned by Subscription module
- `admin-pricing.html` — Pricing schedule v01 with brackets, conversion rate, version history

## What to click for review

For Bernard / Ugo / Paul:

1. **Theme** — open the profile dropdown bottom-left, switch sombre / clair to validate the dark-first aesthetic + light fallback.
2. **Sidebar fold** — click Production, expand and pick a centrale, see the per-centrale path activate.
3. **Settings rework lead-in** — `parametres.html` shows current state; the orange banner flags the planned #261 evolution.
4. **Profile → Subscription** — open the dropdown, walk Mon abonnement → Mes factures → Mes jetons. Note the bracket comparison and the conversion deep-link.
5. **Community growth loop** — `community-earn.html` → click any "tester" tile → arrive at `community-rewards.html` → "Convertir" modal → confirm flow.
6. **Article + survey** — `community-intelligence.html` shows the editorial programmes (Julien quarterly + comptable / climatologie / risques / Tendances Naia) and the in-flight survey.
7. **Market data** — `community-market.html` for Belpex + source health.
8. **Administration** — `admin.html` → `admin-programme.html` for the activity catalogue + approvals queue, then `admin-abonnements.html` for the customer table.

## Tech stack

- Tailwind CSS via CDN (no build step).
- Inter from Google Fonts.
- Lucide icons via CDN.
- Chart.js via CDN with theme-aware palette.
- One shared `css/style.css` with both `[data-theme="dark"]` (default) and `[data-theme="light"]` token sets.
- One shared `js/app.js` building the sidebar, profile dropdown, V2 toggle, theme toggle, and chart helpers.

## Iteration

Feedback lands as commit-by-commit edits on this folder. Each push auto-rebuilds GitHub Pages within ~60 seconds.

## Related

- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app per ADR-001.
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD (specification only).
- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD (specification only).
- [`hydro-software/game`](https://github.com/hydro-software/game) — conference game (separate app); its `.screenshots/` are the visual reference for v4's dark theme.
