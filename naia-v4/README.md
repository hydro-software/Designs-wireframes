# Naia v4 — integrated app mockup

**Live prototype: https://hydro-software.github.io/Designs-wireframes/naia-v4/**

The canonical mockup of the Naia integrated application after the team review (April 2026) and [ADR-001](https://github.com/hydro-software/platform/blob/dev/product-system/architecture-decisions/001-one-integrated-app.md) (one integrated app, three modules: Naia / Community / Subscription).

Replaces:
- `naia-points-v1/` — deprecated (kept for reference)
- `naia-points-v2/` — superseded (kept for Community-pattern reference)
- `naia-v3/` — earlier in-flight settings mockup; v4 supersedes it visually

## V1 descope for the 10-11 June 2026 conference (2026-05-27)

The PO is reducing the Community surface for the conference V1 so the
shipped product is tighter and fully validated. The following are deferred
to **V2**, with the V2 toggle in the profile dropdown bringing them back
for previews:

- **F3 LinkedIn amplification** (member submit tile + admin pending-queue row) — backend kill-switch lives at `COMMUNITY_LINKEDIN_ENABLED` ([platform#535](https://github.com/hydro-software/platform/pull/535))
- **D5 Surveys** (member earn tile + admin catalogue row + recent-activity entry)
- **D6 Agenda** sidebar entry — the `community-agenda.html` page itself stays for V2 demo

The seed activity rows (`community.linkedin.shared`, survey activity) remain in the DB so past awards keep resolving; the V2 restore is a single env-var flip plus re-adding the descoped tiles.

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
  └ V2 stubs (behind toggle: Agenda, Classement, Visites, Opportunités, Forum)
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
- `community-earn.html` — Gagner des points (org-level balance, game promo, activity catalogue grouped by category). LinkedIn + survey tiles V2-deferred (2026-05-27 descope).
- `community-rewards.html` — Récompenses (token conversion modal, reward catalogue, V2 visit reward grayed)
- `community-intelligence.html` — Articles (6 cards across the editorial programmes) + webinars. Survey card V2-deferred (2026-05-27 descope).
- `community-market.html` — Mises à jour marché (Belpex chart, source health table, region selector)
- `community-agenda.html` — Events list (upcoming / past). **V2-deferred** (2026-05-27 descope) — page stays for V2 demo via the toggle.

### Administration (admin-only)
- `admin.html` — Cross-module dashboard with shortcuts to programme communauté + abonnements
- `admin-programme.html` — Activity catalogue (org-level points, in-process triggers, frequency caps) + approval queue
- `admin-membres.html` — Community-scoped member view (tier, points, conversions, activity, badges, parrainage)
- `admin-abonnements.html` — Customer table (plan, status, MRR, health, dunning) — owned by Subscription module
- `admin-pricing.html` — Pricing schedule v01 with brackets, conversion rate, version history
- `admin-audit.html` — single page reachable from the sidebar entry **"Audit log"** (last item under Administration). Two tabs at the top — **Communauté** (default, reads `community.audit_log`) and **Abonnements** (reads `subscription.audit_log`) — switch between two `<div data-audit-panel="…">` blocks via `selectAuditScope(scope)`. Tab state is mirrored in the URL hash (`#communaute` / `#abonnements`) so the active tab is bookmarkable.

### Audit log architecture (PRD v1.9 FR-PAD-6)
Per-app audit logs, no unified cross-app feed. The two tabs are two views over two distinct database tables (`community.audit_log`, `subscription.audit_log`); the page only consolidates the **navigation**, not the underlying data. Auth and infra events live in a separate `platform.audit_log` (page TBD if/when platform admin surfaces are mockup'd).

### Lead-facing (public, no login)
- `plaquette.html` — the real Naia **plaquette** (bilingual FR/EN, 2-page A4, annotated product screenshots + case study + pricing) sent as a post-demo follow-up (subscription PRD §FR-PLAQUETTE). Self-contained, downloadable as PDF, reached through a per-lead tracked link; personalised via `?id=` — the "Préparé pour" addressee in the header (try `?id=pyrenees`, `?id=vhg`). The admin side — generate, copy the tracked link, view tracking, Odoo sync — lives in the **Plaquette de suivi** section of `admin-lead.html`.
- `inscription.html` — **Public sign-up form** (Sub.A8b · subscription PRD §FR-LEAD-2(b-bis)). Standalone landing-style layout (no app shell), captures lead identity + GDPR consent + parrainage code from `?p=<code>`. Honeypot + Cloudflare Turnstile widget (placeholder in the mockup). The form POSTs to `/api/v1/subscription/public/leads` and redirects to `merci.html`.
- `merci.html` — **Thank-you confirmation** after a successful sign-up. Echoes the parrain code if the URL still carries `?p=`, sets expectation for the 24h follow-up + the confirmation email (sent best-effort via Celery + Odoo per Sub.A8b PO decision).
- `inscription-erreur.html` — **Invalid parrain code** soft-error state. Shown when the prospect lands with a `?p=<code>` that doesn't resolve. The form still works (continue without a code), the page explains the likely causes (link truncation, expired code).

## What to click for review

For Bernard / Ugo / Paul:

1. **Theme** — open the profile dropdown bottom-left, switch sombre / clair to validate the dark-first aesthetic + light fallback.
2. **Sidebar fold** — click Production, expand and pick a centrale, see the per-centrale path activate.
3. **Settings rework lead-in** — `parametres.html` shows current state; the orange banner flags the planned #261 evolution.
4. **Profile → Subscription** — open the dropdown, walk Mon abonnement → Mes factures → Mes jetons. Note the bracket comparison and the conversion deep-link.
5. **Community growth loop** — `community-earn.html` → click any "tester" tile → arrive at `community-rewards.html` → "Convertir" modal → confirm flow.
6. **Editorial programmes** — `community-intelligence.html` shows the programmes (Julien quarterly + comptable / climatologie / risques / Tendances Naia). The in-flight survey card and the LinkedIn submit tile are V2-deferred (see top-of-file descope note).
7. **Market data** — `community-market.html` for Belpex + source health.
8. **Administration** — `admin.html` → `admin-programme.html` for the activity catalogue + approvals queue, then `admin-abonnements.html` for the customer table.
9. **Plaquette** — open `admin-lead.html`, scroll to **Plaquette de suivi**: copy the tracked link, click **Aperçu** to open the personalised one-pager (`plaquette.html`), try **Télécharger en PDF**. Open `admin-lead.html?id=aveyron` to see the "not generated yet" state and the **Générer** action.
10. **Public sign-up (Sub.A8b)** — open `inscription.html?p=ABCD123` to see the parrainage banner state. Fill in the fields, submit → `merci.html?p=ABCD123` displays the echo. Open `inscription-erreur.html?p=WXYZ999` to review the invalid-code soft error state.

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
