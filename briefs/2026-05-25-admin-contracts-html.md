# Designer brief — `admin-contracts.html`

**Date:** 2026-05-25
**Author:** Jan Dheedene (PO)
**Audience:** Mockup designer (Bernard or whoever owns the naia-v4 set)
**Why:** The 2026-05-25 mockup-coverage audit identified `admin-contracts.html` as the **largest single missing surface** in the naia-v4 set. FR-CONTRACT (FR-CTR-1..11) is fully specced — Sub.A20 implementation draft is ready — but no mockup page exists yet. This blocks the frontend implementation work.

---

## What this page is for

The admin surface for managing the **Naia subscription contract content** as a database-backed versioned entity. Replaces the current single Git-tracked Jinja template (`backend/templates/pdf/naia_contract_fr.html`) with multiple versioned rows in `subscription.contract_versions`, each scoped to a resolution tuple, with a publish-with-immutable-changelog flow.

**Who uses it:** Subscription admin (small set — Jan, Bernard, possibly counsel). Frequency: low (contract content rarely changes once published — maybe a few times per year), but stakes are high (legally-binding content).

## Anchoring PRD requirements

- **PRD §FR-CTR-1..11** (subscription-system PRD v1.22+) — full requirement set: segments, versioned entity, country/language variants, segment-to-version assignment, rich-text editor with named tokens, publish-with-changelog, signed-contracts frozen, render at signing, legacy migration seed, invoicing-entity variant, meter-box variant.
- **PRD §FR-PAD-6 + NFR-AUD-1** — every contract-edit / publish / archive is audit-logged.
- **Sub.A20 implementation spec** (`hydro-software/subscription-system/drafts/Sub.A20-contract-versions.md`) — the full implementation design, including schema + entry points + workflows + test cases. Read this for the engineer-facing detail.

## Key sections the mockup should cover

### Section 1 — Matrix / list view (default landing)

A grid or table showing the **resolution-tuple coverage**: which combinations of `(segment, country, language, invoicing_entity, meter_box_included)` currently have a `published` contract version, and which are uncovered.

At v1.22, the dimensions are:
- **Segments:** 1 row (`default`) — but design for ≥2 segments visible in the future.
- **Countries:** FR, BE (model accommodates more — show the structure that scales).
- **Languages:** fr at v1 (NL deferred per PRD OQ-4) — but design for ≥2 languages per country.
- **Invoicing entity:** 2 values — `fr` (MDA SAS) / `be` (Hydro Software Services SRL).
- **Meter box:** 2 values — included / not included.

Total at full coverage: 1 × 2 × 1 × 2 × 2 = **8 quadrants**.

Each cell shows: status badge (`published` / `uncovered` / `draft pending`), the published version's `change_summary` excerpt, last-published date, "Edit" + "View signed contracts" actions. Uncovered cells show "Author this variant" CTA.

**Reference look:** the matrix concept resembles `admin-promotions.html`'s eligibility grid — but with 5 dimensions instead of 2. Pragmatic suggestion: collapse the matrix to **2D primary view (country × invoicing_entity)** with the other axes as filters/toggles at the top. Most variants will be authored by editing one cell at a time anyway.

### Section 2 — Version detail / editor

When admin clicks a cell or "Author this variant", open the rich-text editor view.

**Editor:** **Tiptap** (reuse the same component from `admin-programme.html` rewards/articles editor — Community already shipped this).

**Custom feature:** **named-token chips.** A toolbar button labelled "Insérer un champ" opens a dropdown with the closed token list:
- `customer_org_name`
- `customer_country`
- `customer_vat_number`
- `signatory_name`
- `signatory_role`
- `plants_table` (renders as a styled table of the customer's plants)
- `pricing_table` (renders as the monthly fee breakdown)
- `signing_date`
- `effective_date`

When picked, the token inserts into the document as a **visually-distinct pill / chip** (different background colour, non-editable as text, clickable to remove). Saves to the DB as `{{token_name}}` markers in the HTML body.

**Tuple readout sidebar** (always visible): the selected `segment, country, language, invoicing_entity, meter_box_included` displayed prominently so the admin always knows which variant they're editing. Editable only on a fresh draft, locked once saved.

**Save / Preview / Publish actions** (bottom of editor):
- "Save draft" — keeps the row in `status='draft'`.
- "Preview" — opens a modal showing the rendered HTML + PDF with sample customer data (use the same lead/customer used in the existing `plaquette.html` preview pattern).
- "Publish" — opens the publish modal (Section 3).

### Section 3 — Publish modal

Triggered from the editor's "Publish" button. Modal contents:

- Tuple confirmation (the 5-axis variant being published — read-only).
- Diff vs the currently-published version for this tuple (if any) — side-by-side or unified-diff styled, similar to git-diff. Highlights changed paragraphs.
- **Mandatory `change_summary` text field** — labelled "Résumé de la modification (publication)" — minimum 20 chars, maximum 500.
- Warning callout: "La publication rend cette version immuable. Toute modification future nécessitera une nouvelle version brouillon."
- "Annuler" + "Publier" buttons.

On publish, the row's `status` flips to `published` (irreversible content-wise), any previously-`published` row for the same tuple atomically flips to `archived`.

### Section 4 — Archive modal (rarely used)

Triggered when admin manually archives a published version without publishing a replacement. The system **rejects** the archive if any active customer is signed against this version AND there's no replacement published.

The modal shows:
- Tuple readout.
- Blocker list (if any): "X customers still reference this version: [customer-id-1, customer-id-2, ...] and no replacement is published for `(default, FR, fr, fr, false)`."
- If blocked: "Annuler" button only, with explanation.
- If unblocked: "Annuler" + "Archiver" buttons, with confirmation text.

### Section 5 — Signed contracts list (read-only admin view)

A second top-level tab or section. Lists all customers who have signed a contract, with columns:
- Customer name + ID
- Signed version ID + label ("v3 — Naia FR — sans boîtier — 2026-04-12")
- Signing date
- Link to download the frozen signed PDF (the immutable copy attached at sign-time)

Filterable by version, date range, country. Each row deep-links to `admin-customer.html` for the full customer context. Read-only — there's no edit affordance here, by design (FR-CTR-7 says signed contracts are frozen).

### Section 6 — Publish changelog (per-version history)

When viewing a published version's detail (Section 2 but in read-only mode for `status='published'`), show a "Changelog" tab listing every prior publish for the same tuple:

- v3 — published 2026-04-12 by Jan — "Updated NET-14 invoice wording per legal review"
- v2 — published 2026-02-08 by Bernard — "Clarified single-customer-contract clause"
- v1 — published 2026-01-15 by Jan — "Seeded from legacy filesystem template"

Each row is read-only (the versions themselves are archived; the changelog is the audit-trail surface, satisfying FR-CTR-6).

## Reference mockups to align style with

- **`admin-pricing.html`** — closest existing precedent for a versioned-entity admin surface (pricing schedules have similar publish/archive semantics).
- **`admin-promotions.html`** — for the CRUD + eligibility-matrix pattern.
- **`admin-onboarding.html`** — for the rich-text editor + variable insertion pattern (the J+0/J+3/J+10 email templates use named tokens in the same shape).
- **`admin-lead.html` "Plaquette de suivi" section** — for the per-record preview + change_summary modal pattern.

## Out of scope (don't add to this mockup)

- **Segment management UI** — Sub.A20 Q2 resolved to "single default at v1". No segment-CRUD surface needed in this mockup; the segment dropdown in the editor shows the default and nothing else.
- **Token registry admin UI** — Sub.A20 Q4 resolved to "hardcoded at v1". The token list is fixed; no admin-editing of the list itself.
- **Approval gates / second-reviewer** — FR-CTR-6 explicitly accepted "no second-person approval gate". Don't add a 4-eyes flow.
- **DSO mandate contracts** — different surface, FR-DSO-3 keeps DSO mandates as filesystem templates. Already in `admin-dso.html`.
- **Customer-facing contract preview** — admins only. No prospect-facing contract preview from this surface.

## Questions designer may want to confirm before drafting

- Matrix visualisation: 2D primary + filters/toggles for the other 3 axes, OR full 5D matrix? (Recommendation: 2D primary.)
- Token-chip visual: how distinct should the chips be from running text? (Suggest: subtle pill with brand-blue background, non-text-editable.)
- Mobile / responsive priority: admin-only surface, desktop-first is fine.
- Where does this page sit in the admin nav? Suggest under "Subscription → Contrats" (new top-level sub-nav item, or under existing "Pricing").

## Acceptance criteria for the mockup

- [ ] All 6 sections above are visible (matrix view + editor + publish modal + archive modal + signed-contracts list + changelog).
- [ ] Tuple-coverage state is clear: an admin can see at a glance which variants are published, drafts pending, or uncovered.
- [ ] The 5 resolution axes are visible (segment, country, language, invoicing_entity, meter_box_included) but the UI doesn't drown in them — sensible default views with filters.
- [ ] The rich-text editor visually distinguishes named tokens from prose.
- [ ] The publish modal makes the immutability + mandatory-summary clear.
- [ ] The signed-contracts list deep-links to `admin-customer.html`.
- [ ] Visual style aligns with `admin-pricing.html` + `admin-promotions.html` + `admin-onboarding.html` (same colour palette, typography, button shapes).
- [ ] Page filename: `admin-contracts.html` in the naia-v4 set.

## Cross-references

- 2026-05-25 mockup-coverage audit: `hydro-software/Designs-wireframes/audits/2026-05-25-mockup-coverage-audit.md` (gap #1)
- Sub.A20 implementation spec: `hydro-software/subscription-system/drafts/Sub.A20-contract-versions.md`
- Subscription PRD §FR-CTR-1..11 (v1.22+): `hydro-software/subscription-system/product-requirements.md`
- Sister admin pages: `admin-pricing.html`, `admin-promotions.html`, `admin-onboarding.html`, `admin-lead.html` (plaquette section)
