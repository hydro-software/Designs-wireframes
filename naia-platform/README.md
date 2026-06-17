# Naia platform — wireframes

Interactive HTML wireframes of the **Naia integrated application** (one app, three modules: Insight / Pilotage · Community · Subscription, per [ADR-001](https://github.com/hydro-software/platform/blob/dev/product-system/architecture-decisions/001-one-integrated-app.md)).

**Current version — v6.2 (live): https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.2/**

This is the single changelog for the whole platform lineage. Each version folder is a frozen snapshot kept for comparison; older folders are not edited further. (Per-version READMEs were consolidated into this file; their original text remains in git history.)

## Versions

| Version | Status | Live URL |
|---|---|---|
| **v6.2** | **Active** | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.2/ |
| v6.1 | Superseded (pre-descope reference) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.1/ |
| v5 | Reference (conference scope) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v5/ |
| v4 | Reference (first integrated mockup) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v4/ |
| v3 | Reference (settings redesign prototype) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v3/ |

The standalone community/loyalty wireframes that predate integration live under [`../naia-community/`](../naia-community/); the conference game lives under [`../conference-game/`](../conference-game/).

## Tech stack (shared across versions)

Static multi-page site, no build step: Tailwind (Play CDN), Inter, Lucide icons, Chart.js, one shared `css/style.css` (dark + light tokens), one shared `js/app.js` (sidebar, centrale tabs, theme/access toggles, chart helpers). Dark theme primary (`#0a1326` navy, `#38bdf8` cyan, `#a3e635` lime), light theme available. Public sign-up / thank-you pages are standalone (no sidebar/app.js) by design.

---

# Changelog

## v6.2 — Subscription descoped to PRD v2.0 *(current)*

`v6.2` is `v6.1` with the **Subscription module reworked to [Subscription PRD v2.0](https://github.com/hydro-software/subscription-system/blob/main/product-requirements.md)** (the post-conference descope re-baseline). Insight (Pilotage) and Communauté are unchanged from v6.1. Subscription V1 is now the **entitlement + billing-state record of truth**; acquisition, contract signing, dunning and onboarding move to **Odoo** or are deferred. PII lives in Odoo (Naia links to the Odoo contact); invoices are issued by Odoo; DSO mandates are signed in Odoo and Naia stores only a **kDrive link**.

**Removed (descope, PRD v2.0 §6):** `admin-leads`, `admin-lead`, `admin-lead-create`, `admin-campaigns`, `admin-promotions`, `admin-onboarding`, `admin-contracts`, `admin-dso`, `admin-game-codes`, `admin-plaquette`, `inscription-abonnement`, `inscription-erreur`, `plaquette`.

**Added:** `admin-customer-create.html` — the single "Ajouter un client" form (FR-CUS-2 / FR-PAD-7) replacing the multi-step sign-up wizard (Odoo contact link, applicable price, start date, term, cadence, PO, plants with kDrive DSO-mandate links, primary contact, locale, test-subscriber flag, notes).

**Reworked:** `admin.html` (trimmed to kept Subscription surfaces + Communauté card; Odoo-descope note) · `admin-abonnements.html` (lean state machine Actif/En retard/Annulé; per-row Odoo link) · `admin-customer.html` (thin-PII Odoo-source-of-truth detail; per-plant kDrive mandate links) · `admin-audit.html` Abonnements panel (rebased on v2.0 webhook transitions) · `inscription.html` (public sign-up notification form, nothing persisted) · `merci.html` (simplified) · `profil-abonnement.html` (cancellation request kept; invoices link to Odoo) · `profil-factures.html` (Odoo-hosted PDFs) · `profil.html` (org legal details mirror Odoo; multi-user mgmt) · `profil-jetons.html` (token ledger only) · `production.html`/`revenue.html` (lock-overlay CTA → `inscription.html`; access toggle reads Prospect/Abonné).

**Later edits (within v6.2):**
- **2026-06-17** — Removed the **MVP 0.9 / MVP 1 conference toggle** and all the 0.9-hiding machinery (`data-mvp` attributes, the `body[data-mvp=…]` CSS hide rules, the `.mvp09-fallback` banner on `index.html`, and the forced 0.9 view on `parametres.html`). MVP 0.9 is implemented in the platform, so the demo switch is gone and every page shows the full surface; the Prospect/Abonné access toggle moved into the top-right slot the MVP toggle vacated.
- **2026-06-17** — Added **`admin-pricing-create.html`** — a full-page editor for a new pricing version (clone source / version / effective date / notes + inline-editable per-plant brackets, Enterprise tiers + add-on, hardware, points→jetons conversion). The "Cloner et créer une nouvelle version" modal on `admin-pricing.html` now opens it; its primary button is **"Créer nouveau pricing"** (was "Créer le brouillon").

## v6.1 — Bernard's Paramètres rework *(superseded by v6.2)*

Only `parametres.html` changes vs. v6; everything else is identical. (v5b/v5c/v6 intermediates were collapsed into this version.)

- **Dev-annotation layer** — floating "Annotations dev" toggle reveals in-page markers (👤 rôle / 💡 conseil / 🟡! attention) with hover bubbles.
- **Compteurs — Enedis validation flow** (`compteur-verif` modal); status column rebranded `Validé / —`; `Status`→`Statut` fix.
- **Utilisateurs & rôles** — 5 roles (Administrateur · Opérateur · Éditeur · Lecteur · Finance) with functional `invite-user` / `edit-user` modals.
- **Topbar actions wired** — `supprimer-centrale`, `ajouter-centrale` modals; "Partager l'accès" removed.
- **Tarifs** — renamed from "Tarification"; rows reshaped (OA + complément → Manuel; Prix Spot EPEX → Automatique).
- **Partage de données** — renamed from "Partage d'accès"; replaced by a "Fonction à venir" interest-capture teaser.

Carried in from **v6** (changes vs v5, all in `parametres.html`/`data.html` + the `production.html` chart-config overlay): new section order; new **Flux de revenus** section; composite indicators gain a leading constant; Comparateur "Vue revenus" filled in; Catégories de pertes simplified to 2 radio + 1 checkbox columns; Données "Compteur"→"Source de données" with read-only inline unit, default mode Évènementiel; the `#chart-config` overlay rebuilt into the *Configuration du panneau* structure (per-resolution axis grids, inverted-histogram + curve slot tables, comparator slot).

## v5 — post May-2026 team review *(reference)*

Iteration of v4 after the May 2026 review with Bernard, Ugo and Paul.

- **Sidebar flattened under "Pilotage"** (Tableau de bord · Production · Revenus · Données · Paramètres); no per-centrale fold-outs (centrales via top tabs); **Rapports removed** (now a CTA on the dashboard); **Inbox moved under Communauté**.
- **Tableau de bord** — centrales tabs on top ("Tous" first); KPI tiles live ONLY here; "Générer un rapport" CTA with a new "Pertes détectées · top 5" report type.
- **Production / Revenus** — graph-first (no KPI tiles); breadcrumbs + time-granularity pills (Intraday · 30 jours · 12 mois · Années); indicateur arrow-cycler; floating right-axis toggle; discrete config (wrench/sliders) + export icons; restored left **Indicateurs** + right **Légende** side panels (collapse to vertical strips); WhatsApp maintenance event strip/dots on Production ([platform#229](https://github.com/hydro-software/platform/issues/229)).
- **Données** — pills "Électricité" / "Indicateur-Comparateur" / "Prix d'Électricité"; compteur under pills; unit as text; Évènementiel/Fréquentiel toggle; post-upload preview (horodatage · valeur · statut).
- **Paramètres** — top-tabs only (per-centrale user mgmt); new Code postal field + mandatory asterisks; new "Informations détaillées" and "Flux de production" sections; "Compteurs Électriques" redesigned.
- **Profil** — Sécurité + Mes badges tabs removed; new "Paramètres utilisateur" tile (MFA · Langue · Thème); bottom-left profile button navigates straight to `profil.html` (no popup).
- Introduced the **MVP 0.9 / MVP 1** conference toggle (later removed in v6.2).

## v4 — first integrated app mockup *(reference)*

The canonical mockup after the April 2026 review and ADR-001 (one integrated app, three modules), in the actual dark theme. Replaced the standalone `naia-points-v1/v2` community mockups and the `naia-v3` settings prototype. Foldable per-centrale sidebar; profile dropdown bottom-left. Covered Naia core (dashboard, production, revenue, data, settings, reports, inbox), the profile/subscription surface, the Community module (earn / rewards / intelligence / market / agenda), Administration (programme / membres / abonnements / pricing / audit), and lead-facing pages (plaquette, inscription, merci). Established the **2026-05-27 V1 conference descope** (F3 LinkedIn, D5 Surveys, D6 Agenda deferred to V2 behind a toggle).

## v3 — settings redesign prototype *(reference)*

First working HTML prototype, for the settings redesign ([platform#261](https://github.com/hydro-software/platform/issues/261) v3): dashboard with KPIs + 30-day chart + **configuration panel drawer**, plant list, plant detail with indicator/comparator modals (type-aware button logic), and the data-import picker + CSV drop zone.

---

## Iteration

Feedback lands as commit-by-commit edits to the **current** version folder. Each push to `main` auto-rebuilds GitHub Pages within ~60 seconds. Old version folders are frozen references and are not edited.

## Related

- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app
- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD v2.0
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD
- [`../naia-community/`](../naia-community/) — standalone community/loyalty wireframes (pre-integration) · [`../bl_draft/`](../bl_draft/) — Bernard's original Paramètres drafts (depend on v5 assets)
