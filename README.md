# Designs-wireframes

Interactive HTML wireframes / clickable prototypes for **Naia** (hydro-software). Static sites, no build step — published via GitHub Pages. This README is the index **and** the changelog.

## Wireframes

| Area | Version | Status | Live URL |
|---|---|---|---|
| **Platform** (integrated app) | **v6.4** | **Active** | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.4/ |
| | v6.3 | Reference (Paramètres versioning) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.3/ |
| | v6.2 | Reference (pre-Paramètres iter) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.2/ |
| | v6.1 | Reference (pre-descope) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.1/ |
| | v5 | Reference (conference scope) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v5/ |
| | v4 | Reference (first integrated) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v4/ |
| | v3 | Reference (settings redesign) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v3/ |
| | v0 | Archive (first wireframe doc, 2025) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v0/ |
| **Community** (standalone, archived) | v1 | Archived — folded into platform | https://hydro-software.github.io/Designs-wireframes/naia-community/v1/ |
| | v2 | Archived (partial) | https://hydro-software.github.io/Designs-wireframes/naia-community/v2/ |
| **Conference game** | — | Separate artifact | https://hydro-software.github.io/Designs-wireframes/conference-game/ |

The integrated app is the **`naia-platform/`** lineage (Insight / Pilotage · Community · Subscription, per [ADR-001](https://github.com/hydro-software/platform/blob/dev/product-system/architecture-decisions/001-one-integrated-app.md)). The standalone **`naia-community/`** ("Naia Points") wireframes predate integration and are kept for reference only; the community module now lives inside the platform (`community-*.html`). Bernard's original Paramètres draft standalones live under [`naia-platform/v5/bl_draft/`](naia-platform/v5/bl_draft/).

## Structure

```
Designs-wireframes/
├── README.md             this file — index + changelog
├── naia-platform/        integrated app: v0 v3 v4 v5 v6.1 v6.2 v6.3 v6.4  (v6.4 = current)
│   ├── v0/               first wireframe document (2025, static screenshots)
│   └── v5/bl_draft/      Bernard's original Paramètres drafts
├── naia-community/        standalone community/loyalty wireframes (archived): v1 v2
└── conference-game/       separate game artifact
```

`naia-platform/` and `naia-community/` each have an `index.html` that redirects to the current version.

## Tech stack (shared across versions)

Static multi-page site, no build step: Tailwind (Play CDN), Inter, Lucide icons, Chart.js, one shared `css/style.css` (dark + light tokens), one shared `js/app.js` (sidebar, centrale tabs, theme/access toggles, chart helpers). Dark theme primary (`#0a1326` navy, `#38bdf8` cyan, `#a3e635` lime), light theme available. Public sign-up / thank-you pages are standalone by design.

## Iteration

Edit the **current** version folder (`naia-platform/v6.4/`), commit, and push to `main` — GitHub Pages auto-rebuilds in ~60 s. Older version folders are frozen comparison references and are not edited.

---

# Changelog

## v6.4 — Subscription PRD v2.6 (team-review re-baseline) *(current)*

`v6.4` is `v6.3` with the **Subscription / admin surfaces reworked to [Subscription PRD v2.6](https://github.com/hydro-software/subscription-system/blob/main/product-requirements.md)** (the 2026-06-17 team-review re-baseline; triage in the subscription repo's `review-feedback-triage.md`). Insight (Pilotage) and Communauté surfaces are unchanged from v6.3.

- **`admin-customer.html` (fiche organisation)** — reframed as an **organisation** with its reference number (`NAIA-00042`); new read-only **Contrats** card sourced from Odoo (FR-CUS-6); the Centrales block now embeds a read-only **centrales + compteurs** view with per-compteur **validation state** (« En validation » / « Validé »), the signed-DSO-mandate **kDrive link** (or « Lien manquant ») and a **Valider** action, plus a missing-mandate alert — replacing the old jump to Paramètres (FR-DSL-3/4/5); per-centrale **blocage / déblocage** for non-paiement (FR-SUB-5); **santé par centrale** breakdown (FR-USE-6 / FR-HLT-1); **utilisateurs de l'organisation** list made read-only — management is done by the client org-admin (FR-AUT-3).
- **`parametres.html`** — « Ajouter une centrale » now states it **crée un ticket** pour l'équipe Naia (FR-PLT-1 / FR-SUPPORT); « Ajouter un compteur » is client-created in état **« En validation »** (production data shown only once the signed DSO mandate is checked and the compteur validated by Naia, FR-PLT-2 / FR-DSL-3); per-compteur validation badges; « Ajouter une source » requests note the ticket.
- **`index.html`** — example **« Abonnement non actif »** blocked-centrale panel (FR-SUB-5).
- **`profil.html`** — the community **Naia points** pill is **kept** on « Mon organisation » (community points stay; the jetons/token surfaces are removed per the v2.7 token descope below).
- **Tokens (jetons) descoped from V1** per [Subscription PRD v2.7](https://github.com/hydro-software/subscription-system/blob/main/product-requirements.md) (the platform is not ready for tokens) — removed the « Mes jetons » tab from the customer profile, deleted `profil-jetons.html`, and removed the **points → jetons** token-exchange / conversion block from `admin-pricing.html` + `admin-pricing-create.html` (plus the token KPI/audit lines on `admin.html`, `admin-customer.html`, `admin-audit.html`). Community **points** are unaffected.

## v6.3 — Paramètres : versioning des caractéristiques + itérations *(reference)*

`v6.3` is `v6.2` with a round of **Paramètres (`parametres.html`) iterations** — porting the platform's plant-characteristics versioning into the wireframe and polishing the form. Insight (Pilotage), Communauté and Subscription surfaces are unchanged from v6.2; only `parametres.html` differs.

- **Versioning des caractéristiques** — version-selector bar above *Informations détaillées* (dropdown of dated versions, "Nouvelle version" modal, "Modifier ▾" → edit validity dates / delete version, validity hint + active-version warning). Ports `PlantDetailsPanel.vue`.
- **Puissance nominale du site** moved up into *Informations générales* (below *Alias court*) with its "i" tooltip; the right column is now Pays / Code postal / Fuseau horaire.
- **Form polish** — single grid so rows stay aligned when a label wraps (any DPI); "i" tooltips show on hover **and** click (styled bubble instead of the native `title`); `<select>` fields normalised to match the text inputs (custom chevron, same box).
- **Catégories de pertes — "Remplir automatiquement" wizard** — pick a predefined model (template dropdown) or copy another plant's categories (plant dropdown), with a live **Aperçu** of the categories as coloured badges.

## v6.2 — Subscription descoped to PRD v2.0 *(reference)*

`v6.2` is `v6.1` with the **Subscription module reworked to [Subscription PRD v2.0](https://github.com/hydro-software/subscription-system/blob/main/product-requirements.md)** (the post-conference descope re-baseline). Insight (Pilotage) and Communauté are unchanged from v6.1. Subscription V1 is now the **entitlement + billing-state record of truth**; acquisition, contract signing, dunning and onboarding move to **Odoo** or are deferred. PII lives in Odoo (Naia links to the Odoo contact); invoices are issued by Odoo; DSO mandates are signed in Odoo and Naia stores only a **kDrive link**.

**Removed (descope, PRD v2.0 §6):** `admin-leads`, `admin-lead`, `admin-lead-create`, `admin-campaigns`, `admin-promotions`, `admin-onboarding`, `admin-contracts`, `admin-dso`, `admin-game-codes`, `admin-plaquette`, `inscription-abonnement`, `inscription-erreur`, `plaquette`.

**Added:** `admin-customer-create.html` — the single "Ajouter un client" form (FR-CUS-2 / FR-PAD-7) replacing the multi-step sign-up wizard.

**Reworked:** `admin.html` (trimmed to kept Subscription surfaces + Communauté card) · `admin-abonnements.html` (lean state machine Actif/En retard/Annulé; per-row Odoo link) · `admin-customer.html` (thin-PII Odoo-source-of-truth detail; per-plant kDrive mandate links) · `admin-audit.html` Abonnements panel (rebased on v2.0 webhook transitions) · `inscription.html` (public sign-up notification form, nothing persisted) · `merci.html` (simplified) · `profil-abonnement.html` (cancellation request kept; invoices link to Odoo) · `profil-factures.html` (Odoo-hosted PDFs) · `profil.html` (org legal details mirror Odoo; multi-user mgmt) · `profil-jetons.html` (token ledger only) · `production.html`/`revenue.html` (lock-overlay CTA → `inscription.html`; access toggle reads Prospect/Abonné).

**Later edits (within v6.2):**
- **2026-06-17** — Removed the **MVP 0.9 / MVP 1 conference toggle** and all the 0.9-hiding machinery (`data-mvp` attributes, the `body[data-mvp=…]` CSS hide rules, the `.mvp09-fallback` banner on `index.html`, the forced 0.9 view on `parametres.html`). MVP 0.9 is implemented in the platform, so every page shows the full surface; the Prospect/Abonné access toggle moved into the top-right slot the MVP toggle vacated.
- **2026-06-17** — Added **`admin-pricing-create.html`** — a full-page editor for a new pricing version. The "Cloner et créer une nouvelle version" modal on `admin-pricing.html` opens it; primary button **"Créer nouveau pricing"**. Removed the redundant "Cloner et créer v02" topbar button (the active-card "Cloner pour modifier" is the single entry point).

## v6.1 — Bernard's Paramètres rework *(reference)*

Only `parametres.html` changes vs. v6 (v5b/v5c/v6 intermediates were collapsed here): dev-annotation layer; Enedis validation flow (`compteur-verif`); 5 roles with `invite-user`/`edit-user` modals; `supprimer-centrale`/`ajouter-centrale` modals; "Tarifs" rename; "Partage de données" teaser. Carried in from **v6**: new section order; new **Flux de revenus** section; composite indicators gain a leading constant; Comparateur "Vue revenus" filled in; Catégories de pertes simplified to 2 radio + 1 checkbox columns; Données "Compteur"→"Source de données"; the `#chart-config` overlay rebuilt into the *Configuration du panneau* structure. (Original Paramètres drafts: [`v5/bl_draft/`](naia-platform/v5/bl_draft/).)

## v5 — post May-2026 team review *(reference)*

- **Sidebar flattened under "Pilotage"**; no per-centrale fold-outs (centrales via top tabs); **Rapports removed** (now a dashboard CTA); **Inbox under Communauté**.
- **Tableau de bord** — centrales tabs on top ("Tous" first); KPI tiles live ONLY here; "Générer un rapport" CTA with a "Pertes détectées · top 5" report type.
- **Production / Revenus** — graph-first (no KPI tiles); breadcrumbs + time-granularity pills (Intraday · 30 jours · 12 mois · Années); indicateur arrow-cycler; floating right-axis toggle; discrete config + export icons; left **Indicateurs** + right **Légende** side panels (collapse to vertical strips); WhatsApp maintenance strip/dots on Production ([platform#229](https://github.com/hydro-software/platform/issues/229)).
- **Données** — pills Électricité / Indicateur-Comparateur / Prix d'Électricité; unit as text; Évènementiel/Fréquentiel toggle; post-upload preview.
- **Paramètres** — top-tabs only; new Code postal field + mandatory asterisks; new "Informations détaillées" and "Flux de production" sections; "Compteurs Électriques" redesigned.
- **Profil** — Sécurité + Mes badges tabs removed; new "Paramètres utilisateur" tile; profile button navigates straight to `profil.html`.
- Introduced the **MVP 0.9 / MVP 1** conference toggle (later removed in v6.2).

## v4 — first integrated app mockup *(reference)*

Canonical mockup after the April 2026 review and ADR-001 (one integrated app, three modules), in the dark theme. Replaced the standalone `naia-points` community mockups and the `naia-v3` settings prototype. Foldable per-centrale sidebar; profile dropdown. Covered Naia core, the profile/subscription surface, the Community module, Administration, and lead-facing pages. Established the 2026-05-27 V1 conference descope (F3 LinkedIn, D5 Surveys, D6 Agenda deferred to V2 behind a toggle).

## v3 — settings redesign prototype *(reference)*

First working HTML prototype, for the settings redesign ([platform#261](https://github.com/hydro-software/platform/issues/261) v3): dashboard with KPIs + 30-day chart + configuration panel drawer, plant list, plant detail with type-aware indicator/comparator modals, and the data-import picker + CSV drop zone.

## v0 — first wireframe document *(archive, 2025)*

The original 2025 wireframe document — **static screenshots** (not interactive HTML) of the very first Naia home views: day / intraday / month charts, legends, loss details & interpretation, indicator editing, and statistics. Kept as the historical starting point of the design; viewable as a gallery at [`naia-platform/v0/`](https://hydro-software.github.io/Designs-wireframes/naia-platform/v0/).

---

## Community wireframes (archived)

The standalone **"Naia Points"** community/loyalty prototypes, built before the integrated-app decision and now **folded into the platform** (see `community-*.html` under `naia-platform/`). Kept for reference of community UI patterns.

- **v1** — full member + admin portal (17 pages): dashboard, earn (incl. parrainage), rewards, leaderboard, profile, community (forum/annuaire/KB), visits, market intelligence, opportunities; admin portal with member drawer.
- **v2** — partial (5 of 9 pages), superseded by the integrated mockup.

## Related

- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app
- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD
