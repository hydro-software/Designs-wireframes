# naia-v4 mockup coverage audit (Subscription PRD v1.22 + Community PRD)

**Audited:** 2026-05-25
**Auditor:** Claude (general-purpose agent), reviewed by Jan Dheedene (PO)
**Mockup set:** `Designs-wireframes/naia-v4/` (31 HTML pages)
**Subscription PRD:** `hydro-software/subscription-system/product-requirements.md` (v1.22)
**Community PRD:** `hydro-software/naia-community/input/product-requirements.md`

---

## 1. Mockup inventory

| File | Side | One-line purpose |
|---|---|---|
| `index.html` | customer | App home / tableau de bord — entry surface after login. |
| `inbox.html` | customer | Notifications + alerts inbox (cross-app messages). |
| `reports.html` | customer | Insight reports / exports list. |
| `production.html` | customer | Production view (Insight module surface, per-plant KPI). |
| `revenue.html` | customer | Revenue view (Valorise / energy-market surface). |
| `data.html` | customer | Raw-data viewer / CSV ingestion / time-series. |
| `simulateur.html` | customer | Simulator (Insight or BTM simulation, token-consuming). |
| `plant-detail.html` | customer | Stub — redirects to `parametres.html`. |
| `parametres.html` | customer | Settings: plants, organisation, users, preferences. |
| `profil.html` | customer | "Mon profil" — user-level profile + badges. |
| `profil-abonnement.html` | customer | Subscription viewer + plan / cancel / upgrade CTAs. |
| `profil-factures.html` | customer | Invoice list with PDF download. |
| `profil-jetons.html` | customer | Token balance + history + top-up flow. |
| `community-earn.html` | customer | "Gagner des points" — earn page (ledger, activities). |
| `community-rewards.html` | customer | Rewards catalogue + redemption. |
| `community-intelligence.html` | customer | Articles, newsletters, surveys. |
| `community-market.html` | customer | Market-data aggregator charts (prices, rainfall). |
| `community-agenda.html` | customer | Agenda — events, conferences, webinars. |
| `plaquette.html` | public | Personalised one-pager (FR-PLQ-5 — print-styled, A4). |
| `admin.html` | admin | Subscription admin dashboard (MRR, funnel, blocks). |
| `admin-abonnements.html` | admin | Customer list + dunning + pending/dropped sub-tabs. |
| `admin-customer.html` | admin | Customer detail (subscription, usage, audit, actions). |
| `admin-leads.html` | admin | Leads list (CSV import, Odoo sync, promote actions). |
| `admin-lead.html` | admin | Lead detail — incl. plaquette section (FR-PAD-14). |
| `admin-pricing.html` | admin | Pricing-schedule mgmt (versioning, diff, migrate). |
| `admin-promotions.html` | admin | Promotion codes CRUD + analytics. |
| `admin-dso.html` | admin | DSO registry + mandates queue + region mapping. |
| `admin-onboarding.html` | admin | J+0/J+3/J+10 sequence editor + in-flight queue. |
| `admin-audit.html` | admin | Subscription audit log surface. |
| `admin-membres.html` | admin | Community admin — member view (tier, points, parrainage). |
| `admin-programme.html` | admin | Community admin — activities/rewards/articles/surveys/agenda. |

---

## 2. Coverage matrix — Subscription PRD (v1.22)

| FR family | FRs in scope | Mockup page(s) | Coverage |
|---|---|---|---|
| FR-CUSTOMER | CUS-1..7 | `admin-customer.html` | Full |
| FR-PRODUCT | PROD-1..3 | `admin-pricing.html` (product catalogue editor lives inside pricing) | Partial — FR-PROD-3 admin-configurable catalogue not visibly distinct |
| FR-LICENSE | LIC-1..6 | `admin-customer.html` + `admin-abonnements.html` + sign-up wizard CTA | Full (read/admin); customer-facing license switcher in `profil-abonnement.html` |
| FR-B2B | B2B-1..2 | — | N/A (pricing TBD, post-M1 placeholder) |
| FR-TOKEN | TOK-1..10 | `profil-jetons.html` (customer); admin token grant in `admin-customer.html` | Full |
| FR-TOKEN-EXCHANGE | EXC-1..9 | `profil-jetons.html` (read-only reference) + Community `community-earn.html` (initiation, FR-EXC-7) | Full |
| FR-HARDWARE | HW-1..4 | `admin-customer.html` (hardware unit list); `admin-abonnements.html` sign-up wizard | Partial — billing-side covered; no dedicated catalogue editor visible |
| FR-REVSHARE | RS-1..2 | — | N/A (deferred post-M3) |
| FR-PRICING | PRC-1..13 | `admin-pricing.html` | Full |
| FR-PROMOTION | PROMO-1..10 | `admin-promotions.html` | Full |
| FR-SUB | SUB-1..12 | `admin-abonnements.html` (admin); `profil-abonnement.html` (customer) | Full |
| FR-LEAD | LEAD-1..8 | `admin-leads.html` + `admin-lead.html` | Full |
| FR-GAMECODE | GAMECODE-1..10 | `admin-leads.html` (where codes appear) + `admin-lead.html` (linkage view) | **Partial** — code generation/list UI not clearly surfaced; redeemed leads appear but the sales-rep code-issuance flow + lifecycle view (FR-GAMECODE-1/9) lack a dedicated section. Game itself lives in the separate hydro-software/game repo. |
| FR-CONTRACT | CTR-1..11 | — | **Missing** — no contract-version editor / segment-assignment surface yet (Sub.A20 spec exists, mockup TBD) |
| FR-SIGNUP | SIGNUP-1..11 | `admin-abonnements.html` "Add customer" CTA → wizard; pending/dropped sub-tabs (FR-PAD-8/9) | Full |
| FR-DSO | DSO-1..5 | `admin-dso.html` | Full |
| FR-ONBOARDING | ONBOARD-1..7 | `admin-onboarding.html` + per-customer pause in `admin-customer.html` | Full |
| FR-DEMO | DEMO-1..9 | `admin-customer.html` (status flag + lifecycle); `profil-abonnement.html` "Activate my centrale" CTA (FR-DEMO-7) | Full |
| FR-PLAQUETTE | PLQ-1..10 | `plaquette.html` (public one-pager, FR-PLQ-5) + `admin-lead.html` "Plaquette de suivi" section (FR-PAD-14) | **Full** — PRD v1.22 still flags this as a mockup follow-up, but `admin-lead.html` already has the generate / preview / view-tracking section, and `plaquette.html` is the rendered one-pager. **PRD note is stale.** Admin-side content editor for FR-PLQ-1 (the master plaquette body) is the only piece not yet visible. |
| FR-BILLING | BIL-1..5 | `profil-factures.html` (customer); `admin-customer.html` financial section (admin) | Full |
| FR-DUNNING | DUN-1..8 | `admin-abonnements.html` dunning-queue tab; `profil-abonnement.html` past-due banner (FR-DUN-5) | Full |
| FR-USAGE | USE-1..5 | `admin-customer.html` usage section | Partial — admin view present; no event-schema registration UI (FR-USE-5) |
| FR-HEALTH | HLT-1..5 | `admin-customer.html` (health score breakdown + override) | Full |
| FR-MRR | MRR-1..10 | `admin.html` revenue block | Full |
| FR-PORTAL-CUSTOMER | PCU-1..10 | `profil*.html` family + `index.html` (landing) | Full |
| FR-PORTAL-ADMIN | PAD-1..14 | per the PRD's own mockup table (lines 702–716) + `admin-lead.html` plaquette section | Full |
| FR-API | API-1..8 | — | N/A (backend / external integrators) |
| FR-WEBHOOK | WHK-1..4 | `admin-audit.html` (event-feed view, FR-WHK-4) | Partial — audit log covers it; no separate webhook-delivery dashboard |
| FR-AUTH (authz) | AUT-1..5 | — | N/A (platform-owned, no v1 admin role-mgmt UI) |
| FR-I18N | I18N-1..3 | language selector in user surfaces | Partial — i18n is a cross-cutting concern; no dedicated screen |
| FR-COMPLIANCE | CMP-1..7 | `admin-customer.html` (GDPR delete action) + `admin-audit.html` | Partial — VAT export (CMP-3) has no visible CTA |

---

## 3. Coverage matrix — Community PRD

| FR family | FRs in scope | Mockup page(s) | Coverage |
|---|---|---|---|
| FR-AUTH | AUTH-1..3 | — | N/A (platform-owned; FR-AUTH-3 community_admin role is data, not a screen) |
| FR-POINTS | POINTS-1..6 | `community-earn.html` (ledger / feed, FR-POINTS-4/6); `admin-membres.html` (admin adjust, FR-POINTS-5) | Full |
| FR-EARN | EARN-1..5 | `community-earn.html` (member view); `admin-programme.html` (activities catalogue admin, FR-EARN-1/2/4) | Full |
| FR-FEATURE-USAGE | FU-1..5 | `admin-programme.html` (feature-code config + preview, FR-FU-3/5) | Partial — admin-programme covers it but the preview/dry-run surface (FU-5) may need explicit treatment |
| FR-GAME | GAME-1..4 | — | N/A (separate hydro-software/game app); Community side just receives the post-conversion welcome bonus — no Community-side game UI by design |
| FR-SURVEY | SURVEY-1..5 | `community-intelligence.html` (member view); `admin-programme.html` (compose + results, FR-SURVEY-1/4/5) | Full |
| FR-ARTICLES | ARTICLES-1..8 | `community-intelligence.html` (member read + comment); `admin-programme.html` (Tiptap compose, FR-ARTICLES-1/4) | Full |
| FR-MARKET-DATA | MD-1..6 | `community-market.html` (member); `admin-programme.html` ingestion-health surface (FR-MD-5) | Partial — member side full; admin ingestion-health dashboard not visibly distinct |
| FR-AGENDA | AGENDA-1..3 | `community-agenda.html` (member); `admin-programme.html` (CRUD, FR-AGENDA-1) | Full |
| FR-REWARDS | REWARDS-1..5 | `community-rewards.html` (member); `admin-programme.html` (catalogue + approval queue, FR-REWARDS-3) | Full |
| FR-BADGES | BADGES-1..4 | `profil.html` (display, FR-BADGES-3); `admin-programme.html` (badge criteria, FR-BADGES-2) | Full |
| FR-TIER | TIER-1..4 | `community-earn.html` (member progression); `admin-programme.html` (thresholds editor, FR-TIER-2) | Full |
| FR-TOKEN-BRIDGE | TB-1..6 | `community-earn.html` or `community-rewards.html` (conversion CTA per FR-TB-1; reuses FR-EXC-7 wiring) | **Partial** — points→tokens initiation should live in Community per FR-EXC-7 / FR-TB-1; the dedicated conversion modal + history surface is not visibly distinct in either page. |
| FR-PARRAINAGE | PARRAINAGE-1..6 | `profil.html` (parrain code surface); `admin-membres.html` (parrainage analytics, FR-PARRAINAGE-6) | **Partial** — referral admin analytics partially in `admin-membres.html`; public association dashboard at `/association/:code` (FR-PARRAINAGE-5) has no mockup |
| FR-ADMIN | ADMIN-1..8 | `admin-membres.html` + `admin-programme.html` | Full (community KPIs in admin-membres dashboard tile; content admin in admin-programme) |
| FR-I18N | I18N-1..4 | cross-cutting | Partial — no dedicated screen |
| FR-RICHTEXT | RT-1..3 | `admin-programme.html` (Tiptap editor surface) | Full |
| FR-SUBSCRIPTION (viewer) | SUB-1..9 | `profil-abonnement.html` (lapsed banner, FR-SUB-9) | Full — the Community side deep-links to Subscription, by design |

---

## 4. Gap list — FRs missing a mockup

Ranked by PO-priority. **H** = highest, M1 conference path. **M** = post-M1 / portal-customer polish. **L** = niche / deferred.

| # | FR | Repo | Priority | What's needed | PRD-flagged? |
|---|---|---|---|---|---|
| 1 | **FR-CONTRACT (CTR-1..11)** | subscription | **H** | A new admin page (`admin-contracts.html` or similar) — rich-text editor for contract versions, segment / country / language / invoicing-entity / meter-box variant matrix, publish + immutable changelog, signed-contract list. Sub.A20 spec exists. | Implicit — Sub.A20 spec acknowledges the surface is new. |
| 2 | **FR-PLQ-1 (plaquette content editor)** | subscription | M | An admin authoring surface for the master plaquette body (similar to FR-CTR-5 named-token editor). Distinct from `admin-lead.html` (per-lead generate). Could fit inside `admin-programme.html` for community or a new `admin-plaquette.html`. | Yes — PRD §FR-PLQ-1 / §FR-PLAQUETTE implementation-impact paragraph notes a mockup follow-up. |
| 3 | **FR-PROD-3 + FR-HW catalogue editor** | subscription | M | Visible product/hardware-catalogue admin editor distinct from pricing-schedule editor (pricing is *prices*, catalogue is *what exists*). | No |
| 4 | **FR-USE-5 event-schema registration** | subscription | L | Admin surface where consuming apps register their `event_type` list. Likely a sub-tab under `admin-audit.html` or `parametres.html` admin. | No |
| 5 | **FR-CMP-3 VAT-export CTA** | subscription | L | Belgian-accountant CSV export button. Could live in `admin-audit.html` or `admin.html` revenue block. | No |
| 6 | **FR-WHK-3/4 webhook-delivery dashboard** | subscription | L | Outbound-webhook delivery health view (deferred until first external integrator). | No (deferred) |
| 7 | **FR-GAMECODE-1/9 code generation + lifecycle list** | subscription | M | Dedicated sub-surface in `admin-leads.html` for generating prospect codes, list with status (`generated → sent → redeemed → played → converted`), conversion metrics per sales rep. | No |
| 8 | **FR-PARRAINAGE-5 public association dashboard** | community | M | Public `/association/:code` page — invited / activated counts, org list, CSV export. No login. | No |
| 9 | **FR-TB-1..6 dedicated points→tokens conversion UI** | community | M | An explicit conversion modal + history surface in Community (per FR-EXC-7: customers won't naturally look for it in the billing portal). May exist inline in `community-earn.html` but needs explicit treatment. | No |
| 10 | **FR-MD-5 admin ingestion-health view** | community | L | Source-by-source last-success-timestamp + error log for market-data feeds. Could fit `admin-programme.html` sub-tab. | No |
| 11 | **FR-FU-5 feature-usage rule preview** | community | L | "Preview impact" simulation on a new earning rule before activation. Could live inline in `admin-programme.html`. | No |
| 12 | **FR-AUT-4 admin role-mgmt UI** | subscription | L (post-M1) | Role assignment surface — deferred until platform #315 role enum lands. | Yes (post-M1 per FR-AUT-2) |

**Expected gaps** (deferred, not bugs): FR-B2B, FR-REVSHARE, FR-WHK-3 external webhooks, FR-AUT-4 finance-role split. All M3+ or post-V1.

---

## 5. Orphans — mockup pages with no clear PRD anchor

| Page | Likely classification | Notes |
|---|---|---|
| `index.html` | Cross-cutting | App-shell landing / tableau-de-bord — sits above the FR taxonomy. No single FR maps to it; aggregates from Insight + Subscription + Community. Keep. |
| `inbox.html` | **PRD-side spec gap** | Cross-app notifications inbox. Not covered by Subscription FR-NOTIF/ONBOARDING (those are outbound emails) nor Community FR-ADMIN. Either platform-owned notification centre or a missing FR family. Worth documenting. |
| `reports.html` | Insight-side (not in scope of this audit) | Insight module surface — not Subscription or Community. Out of scope here, but not an orphan if the Insight PRD covers it. |
| `production.html` / `revenue.html` / `data.html` | Insight / Valorise (out of scope) | Same as `reports.html` — these are product-module surfaces, expected to anchor in module PRDs we did not audit. |
| `simulateur.html` | Insight / Simulate (out of scope) | Token-consuming feature site — anchors FR-TOK-6 consumption but the simulator itself is Insight/Simulate-owned. |
| `plant-detail.html` | Legacy stub | Redirects to `parametres.html`. **Either delete or stop linking.** |
| `parametres.html` | Cross-cutting + spec gap | Plants / org / users / preferences settings. Plants editing partially anchored in FR-LIC-6 + FR-SIGNUP plant model, but the full settings page (user prefs, language, etc.) has no single FR family. PRD-side spec gap — define a FR-SETTINGS family or scope each block. |
| `profil.html` | Cross-cutting | User-level profile + badges. Badges anchor in Community FR-BADGES-3; the rest (avatar, name, email, language) is platform user-profile, no Subscription/Community FR. |

Insight-side product pages (`reports`, `production`, `revenue`, `data`, `simulateur`, `plant-detail`) are **not** subscription/community orphans — they belong to the Insight/Simulate/Valorise PRDs which were not part of this audit.

---

## 6. Top recommendations (next steps for Jan)

1. **Update the Subscription PRD §FR-PLAQUETTE mockup-follow-up note** (around line 589 + line 754) — it is **stale**. `plaquette.html` (the public one-pager, FR-PLQ-5) and the "Plaquette de suivi" section in `admin-lead.html` (FR-PAD-14) already exist. The only remaining plaquette gap is the **master content editor** for FR-PLQ-1, which is the real follow-up.

2. **Designer follow-up: produce `admin-contracts.html` per FR-CONTRACT (CTR-1..11)** — the largest single missing surface. Sub.A20 spec is drafted; the mockup needs to land before frontend work. Cover: contract-version list, rich-text editor with named-token chooser, the (segment × country × language × invoicing_entity × meter_box) variant matrix, publish-with-changelog, signed-contracts list.

3. **Designer follow-up: add a GAMECODE management sub-surface to `admin-leads.html`** — code generation form, code-lifecycle list (`generated → sent → redeemed → played → converted`), per-rep conversion metrics. FR-GAMECODE-1/9 are partially served by the existing leads list but need an explicit code-issuance flow.

4. **Spec gap: write a FR for `parametres.html` and `inbox.html`** — both are cross-cutting and currently have no PRD anchor. Either fold them into the platform PRD (auth/notifications/settings as platform concerns) or add FR-SETTINGS / FR-NOTIFICATIONS families. Until then they are orphans in both subscription and community audits.

5. **Designer follow-up (community side): explicit `community-earn.html` conversion-modal treatment** for points→tokens (FR-TB-1..6 / FR-EXC-7) and a **public `/association/:code` page** for FR-PARRAINAGE-5. The Community PRD does not cross-reference mockup filenames anywhere — adopt the Subscription PRD's table pattern (lines 702–716) in the Community PRD to make ongoing audits cheaper.

---

## Audit confidence notes

- Mockup purpose inferred from `<title>` + filename + the existing PRD cross-references; not from full DOM read.
- Subscription PRD has 12 explicit mockup ↔ FR-PAD anchors (lines 702–716) plus inline filename mentions for `admin-promotions.html`, `admin-dso.html`, `admin-onboarding.html`, `admin-lead.html` — **high confidence** on subscription side.
- Community PRD makes **zero mockup-filename cross-references** — all community-side mapping is inferred from FR purpose. Coverage status may shift after Bernard / designer walkthrough. **Recommendation 5** addresses this gap.
- One stale PRD claim identified in the Subscription PRD (FR-PLAQUETTE follow-up note — the mockup work has actually landed). **Recommendation 1** fixes it.
- "Insight" / "Simulate" / "Valorise" PRDs were not part of this audit's scope — their corresponding mockup pages (`reports`, `production`, `revenue`, `data`, `simulateur`, `plant-detail`) are flagged as cross-module but not adjudicated.
