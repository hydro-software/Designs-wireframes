# Naia v6.2 — Subscription descoped to PRD v2.0

**Live prototype: https://hydro-software.github.io/Designs-wireframes/naia-platform-v6.2/**

`v6.2` is `v6.1` with the **Subscription module reworked to [Subscription PRD v2.0](https://github.com/hydro-software/subscription-system/blob/main/product-requirements.md)** (the post-conference descope re-baseline). The **Insight (Pilotage)** and **Communauté** modules are unchanged from v6.1.

`naia-platform-v6.1/` is kept untouched as the **pre-descope comparison reference**. `naia-platform-v5/` remains the earlier conference-scope reference.

## What the descope means for the wireframe

Subscription V1 is now the **entitlement + billing-state record of truth** — who is a paying customer, on what plan, from when, and what they owe. Acquisition, contract signing, dunning, and onboarding move to **Odoo** or are deferred. PII lives in Odoo (the Naia record links to the Odoo contact); invoices are issued by Odoo; DSO mandates are signed in Odoo and Naia stores only a **kDrive link**.

## Changelog · v6.1 → v6.2

### Removed (descoped — PRD v2.0 §6)

Deleted pages: `admin-leads`, `admin-lead`, `admin-lead-create` (leads pipeline), `admin-campaigns` (campaigns), `admin-promotions` (promotions), `admin-onboarding` (onboarding sequence), `admin-contracts` (contract authoring), `admin-dso` (DSO mandate admin/rendering), `admin-game-codes` (game codes), `admin-plaquette` (plaquette), `inscription-abonnement` (multi-step sign-up wizard / stage-2), `inscription-erreur`, `plaquette` (commercial brochure).

### Added

- **`admin-customer-create.html`** — the single "Ajouter un client" form (PRD FR-CUS-2 / FR-PAD-7) replacing the old multi-step sign-up wizard: Odoo contact link, applicable price (pricing version + mode/bracket), start date, term, cadence, customer PO, plants (each with a kDrive DSO-mandate-link field), primary contact, locale, test-subscriber flag, notes.

### Reworked

- **`admin.html`** — hub trimmed to the kept Subscription surfaces (Clients, Nouveau client, Pricing schedules, Audit log) + the Communauté card; removed the entire Acquisition card and the acquisition-funnel KPIs; added a "handled in Odoo (descope V2.0)" note.
- **`admin-abonnements.html`** — customer list on the lean state machine (Actif / En retard / Annulé); removed the demo / pending-signature / dunning tabs, health/churn columns, the Leads button, and the 4-step wizard modal; "Nouveau client" now links to `admin-customer-create.html`; per-row Odoo contact link.
- **`admin-customer.html`** — thin-PII / Odoo-source-of-truth detail: prominent Odoo contact link, operational fields (price, dates, term, cadence, PO), per-plant **kDrive DSO-mandate links**, Odoo-hosted invoice links, multi-user management, audit timeline; removed dunning, churn/health, contract/signature, and DSO rendering.
- **`admin-audit.html`** (Abonnements panel) — events/filters rebased on v2.0: customer-created-active, `active → past_due → cancelled` transitions from Odoo webhooks, kDrive mandate links, token-ledger adjustments, cancellation requests; removed Yousign, PayPlug-invoice-generation, promotions, onboarding emails, DSO signing, and health scoring. (Communauté panel unchanged.)
- **`inscription.html`** — now the **public sign-up notification form** (FR-SIGNUP-FORM): name / organisation / email / optional message → notifies the team + a confirmation to the prospect (Infomaniak); nothing persisted, no CRM lead. Removed parrainage, stage-2, Turnstile-heavy widgets.
- **`merci.html`** — simplified confirmation (no parrain echo, no demo-trial timeline).
- **`profil-abonnement.html`** — plan view; removed self-serve upgrade/payment-method changes; kept the cancellation request (FR-PCU-2); invoices link to Odoo.
- **`profil-factures.html`** — invoice rows link to the **Odoo-hosted PDF** (Naia generates/stores none).
- **`profil.html`** — org legal details shown as a read-only mirror of Odoo; multi-user / primary-contact management surfaced (FR-CUS-3).
- **`profil-jetons.html`** — token **ledger only** (balance + history + points→tokens bridge); removed the token catalogue / gifting / campaign UI.
- **`production.html` / `revenue.html`** — the "Connectez votre centrale" lock-overlay CTA repoints to `inscription.html`; the access toggle reads **Prospect / Abonné**.

### Unchanged from v6.1

All Insight pages (Tableau de bord, Production, Revenus, Données, Paramètres, Simulateur, plant detail, Reports), all Communauté pages, and the Subscription pages already in scope (`admin-pricing.html`, the `admin-audit.html` Communauté panel, `admin-membres.html`, `admin-programme.html`).

### Later edits (within v6.2)

- **2026-06-17** — Removed the **MVP 0.9 / MVP 1 conference toggle** and all the 0.9-hiding machinery: the `data-mvp` attributes, the `body[data-mvp=…]` CSS hide rules, the `.mvp09-fallback` "Tableau de bord — MVP 1" banner on `index.html`, and the forced 0.9 view on `parametres.html`. MVP 0.9 is now implemented in the platform, so the demo switch is no longer needed and every page shows the full surface. The Prospect / Abonné access toggle moves up into the top-right slot the MVP toggle vacated.

## Tech stack

Static multi-page site, no build step: Tailwind (Play CDN), Inter, Lucide icons, Chart.js, one shared `css/style.css` (dark + light tokens), one shared `js/app.js` (sidebar, centrale tabs, theme/access toggles, chart helpers). The public sign-up + thank-you pages are standalone (no sidebar/app.js) by design.

## Iteration

Feedback lands as commit-by-commit edits on this folder. Each push auto-rebuilds GitHub Pages within ~60 seconds.

## Related

- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD v2.0 (the spec this wireframe implements) + archived v1.37
- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD
- Earlier versions kept for comparison: [`naia-platform-v6.1/`](../naia-platform-v6.1/) (pre-descope) · [`naia-platform-v5/`](../naia-platform-v5/)
