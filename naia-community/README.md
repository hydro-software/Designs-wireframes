# Naia community — wireframes (archived)

The standalone **"Naia Points"** community / loyalty wireframes, built when Naia Community was being scoped as a stand-alone-feeling experience.

> **Folded into the platform.** After the team review and [ADR-001](https://github.com/hydro-software/platform/blob/dev/product-system/architecture-decisions/001-one-integrated-app.md), the Community module became part of the integrated app — see the `community-*.html` pages under [`../naia-platform/`](../naia-platform/) (current: [v6.2](https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.2/)). These folders are retained for reference of the original community UI patterns (token-conversion modal, articles, surveys, market-data cards, leaderboard, visits) and are **not edited further**.

## Versions

| Version | Status | Live URL |
|---|---|---|
| v1 | Full member + admin portal (17 pages) | https://hydro-software.github.io/Designs-wireframes/naia-community/v1/ |
| v2 | Partial (5 of 9 pages), superseded | https://hydro-software.github.io/Designs-wireframes/naia-community/v2/ |

### v1 — Naia Points (full prototype)

Member portal (`/v1/`): Tableau de bord, Gagner des points (incl. parrainage), Récompenses, Classement, Profil, Communauté (forum / annuaire / base de connaissances), Visites de centrales, Intelligence de marché, Opportunités. Admin portal (`/v1/admin/`, orange banner): dashboard, membres (with member drawer), activités, avantages, visites, contenu, opportunités, paramètres. Cross-portal switch bottom-left; profile dropdown; Esc closes modals/drawers. Tailwind v4 CDN, Inter, Lucide, Chart.js. Replaced the Figma Make v20 project for day-to-day iteration.

### v2 — Naia Points (partial)

5 of 9 planned community pages (index / rewards / intelligence / market / agenda), built before the integrated-app decision. Superseded by the integrated mockup (now `naia-platform/v4` and later). Kept for visual reference of Community-specific patterns.

## Related

- [`../naia-platform/`](../naia-platform/) — the integrated app (where Community now lives)
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD (specification)
