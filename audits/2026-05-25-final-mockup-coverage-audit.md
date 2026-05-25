# Final audit — naia-v4 mockup × PRDs (EoD 2026-05-25)

**Audited:** 2026-05-25 (end-of-day refresh)
**Supersedes:** `2026-05-25-mockup-coverage-audit.md` (morning audit, same date)
**Purpose:** Closure-tracker view after today's interventions on the morning audit's findings.

This file is **shorter and complementary** to the morning audit — it does not repeat the mockup inventory or the per-FR-family coverage matrices (those are stable; consult the morning audit for that detail). What's new here:

1. What changed today
2. Gap-closure tracker (every morning-audit gap × today's status)
3. Orphan status (no change)
4. Truly-open items remaining
5. Recommendations going forward

---

## 1. What changed today

| Action | Repo / file | Commit | Effect |
|---|---|---|---|
| **PRD v1.23** — corrected stale FR-PLAQUETTE / FR-PAD-14 mockup notes | `hydro-software/subscription-system/product-requirements.md` + `drafts/Sub.A19-post-demo-plaquette.md` | `c139e3e` | The "mockup follow-up" wording was stale — `plaquette.html` + `admin-lead.html` plaquette section already exist. PRD now correctly says only **FR-PLQ-1 master content editor** remains. |
| **Community PRD** — added naia-v4 mockup cross-reference table | `hydro-software/naia-community/input/product-requirements.md` | `0e3906f` | Community PRD now has the same explicit page↔FR table that Subscription has (lines 702-716). Three sub-tables: member-facing + admin-facing + flagged follow-ups. Future audits will be cheaper. |
| **Sub.A20 implementation spec** — FR-CONTRACT (CTR-1..11) | `hydro-software/subscription-system/drafts/Sub.A20-contract-versions.md` | `f709fcc` | 326-line spec for the post-M1 contract-version entity, rich-text editor, 4-tuple resolver, legacy-template seed. **The implementation gap on FR-CTR is now spec-closed.** |
| **Sub.B1 v0.2 deep-dive** — mockup-independent layers | `hydro-software/subscription-system/drafts/Sub.B1-v02-frontend-deep-dive.md` | `dfb8acb` | Pinia store shape + `/portail/dashboard` API contract + WCAG 2.2 AA baseline + auth integration. Tangential to mockup coverage but shows portal-side spec depth has advanced. |
| **Designer brief** — `admin-contracts.html` | `hydro-software/Designs-wireframes/briefs/2026-05-25-admin-contracts-html.md` | `05456cc` | The brief for the highest-priority missing mockup. Hands off to whoever owns naia-v4 design. |

---

## 2. Gap-closure tracker

Status legend: **CLOSED** = no further action needed · **SPEC-CLOSED** = implementation spec / brief now exists, awaiting designer / engineer · **STILL OPEN** = no action yet today · **DEFERRED** = explicitly post-M1 or low-priority.

### Subscription gaps from the morning audit

| # | Gap | Morning status | Action today | EoD status |
|---|---|---|---|---|
| 1 | **FR-CONTRACT (CTR-1..11)** mockup | H priority, missing | Sub.A20 spec drafted (326 lines) + designer brief for `admin-contracts.html` written + committed to Designs-wireframes | **SPEC-CLOSED.** Awaiting designer to draft `admin-contracts.html`. |
| 2 | **FR-PLAQUETTE / FR-PAD-14** stale PRD note | Morning audit's discovery | PRD v1.23 corrected both stale notes; Sub.A19 draft updated | **CLOSED.** |
| 3 | **FR-PLQ-1** plaquette content editor (admin authoring of master) | M priority, missing | None | **STILL OPEN.** Designer follow-up to draft an admin master-content editor (similar shape to FR-CTR-5 editor). |
| 4 | **FR-PROD-3 + FR-HW** catalogue editor | M, missing | None | **STILL OPEN.** Designer follow-up to add a visible product/hardware catalogue surface distinct from pricing schedules. |
| 5 | **FR-USE-5** event-schema registration | L | None | **STILL OPEN.** Low priority — schema-registration UI for consuming apps. Could fit under `parametres.html` admin (which itself is an orphan, see §3). |
| 6 | **FR-CMP-3** VAT-export CTA | L | None | **STILL OPEN.** Low priority. |
| 7 | **FR-WHK-3/4** webhook-delivery dashboard | L (deferred) | None | **DEFERRED** until first external integrator. |
| 8 | **FR-GAMECODE-1/9** code generation + lifecycle list | M | None | **STILL OPEN.** Designer brief #3 not yet written (PO paused on it). Sub-surface needed inside `admin-leads.html` for code-issuance flow + per-rep metrics. |
| 9 | **FR-AUT-4** admin role-mgmt UI | L (post-M1) | None | **DEFERRED** until platform #315 role enum lands. |

### Community gaps from the morning audit

| # | Gap | Morning status | Action today | EoD status |
|---|---|---|---|---|
| 10 | **FR-PARRAINAGE-5** public association dashboard | M, missing | Documented in Community PRD's new mockup-follow-up table | **SPEC-CLOSED.** PRD declares the gap; designer follow-up to draft `/association/:code` page. |
| 11 | **FR-TB-1..6** dedicated points→tokens conversion UI | M | Documented in Community PRD's new mockup-follow-up table | **SPEC-CLOSED.** PRD declares the gap; designer follow-up to add explicit conversion-modal treatment in or adjacent to `community-earn.html`. |
| 12 | **FR-MD-5** admin ingestion-health view | L | Documented in Community PRD's new mockup-follow-up table | **SPEC-CLOSED.** PRD declares the gap; low priority. |
| 13 | **FR-FU-5** feature-usage rule preview | L | Documented in Community PRD's new mockup-follow-up table | **SPEC-CLOSED.** PRD declares the gap; low priority. |
| 14 | Community PRD lacks mockup cross-references | Workflow gap | Added the page↔FR table at §FR-ADMIN | **CLOSED.** |

### Stale notes / hygiene

| # | Item | Morning status | Action today | EoD status |
|---|---|---|---|---|
| 15 | Sub.A19 draft says "Naia-v4 mockup: none yet" | Stale (was true when drafted; mockup landed since) | Sub.A19 Refs section updated to reflect actual mockup coverage | **CLOSED.** |

**Summary by status:**
- **CLOSED** (3): stale PRD note (#2), Community PRD cross-references (#14), Sub.A19 mockup-status text (#15).
- **SPEC-CLOSED** (5): #1 FR-CONTRACT, #10 FR-PARRAINAGE-5, #11 FR-TB, #12 FR-MD-5, #13 FR-FU-5. All have a written PRD anchor or designer brief; awaiting designer to draft mockup pages.
- **STILL OPEN** (5): #3 FR-PLQ-1 editor, #4 FR-PROD-3/HW catalogue, #5 FR-USE-5, #6 FR-CMP-3, #8 FR-GAMECODE-1/9. Of these, **only #8 is medium-priority**; the rest are low.
- **DEFERRED** (2): #7 FR-WHK-3/4, #9 FR-AUT-4.

---

## 3. Orphan status — no change since morning

The 2 PRD-side spec gaps from the morning audit (mockup pages with no clear FR anchor) **remain unchanged**:

- **`inbox.html`** — cross-app notifications inbox. Not covered by Subscription or Community PRDs. Needs either FR-NOTIFICATIONS family or fold into platform-level PRD.
- **`parametres.html`** — settings page (plants, org, users, preferences). Partial anchors (FR-LIC-6, FR-SIGNUP) but no single owning FR family. Needs FR-SETTINGS family or platform-PRD scope decision.

Plus the legacy stub:

- **`plant-detail.html`** — redirects to `parametres.html`. Recommended: delete or stop linking.

Insight / Valorise / Simulate mockup pages remain out-of-scope for this audit (they belong to module-specific PRDs we did not audit).

---

## 4. Truly-open items remaining (post-EoD)

Ordered by realistic effort + priority. **Only 3 items need active follow-up by someone other than the PO.**

| # | Item | Owner | Effort |
|---|---|---|---|
| **A** | **Designer drafts `admin-contracts.html`** per the brief in `briefs/2026-05-25-admin-contracts-html.md`. | Designer (Bernard or whoever owns naia-v4) | Several hours design work |
| **B** | **Designer drafts the 5 community-side follow-ups** that are now declared in the Community PRD (public `/association/:code` page, dedicated points→tokens conversion modal, admin ingestion-health view, feature-usage rule preview, FR-PLQ-1 plaquette master-content editor as a sub-surface or `admin-plaquette.html`). | Designer | Mid-size each |
| **C** | **PO + Bernard decide scope** for `inbox.html` and `parametres.html` — either fold into the platform PRD (and reference from Subscription/Community PRDs) or define `FR-SETTINGS` / `FR-NOTIFICATIONS` families. | PO + Bernard | One scope-decision call |
| **D** | **GAMECODE designer brief** — if PO wants to action gap #8 like we did for FR-CONTRACT, the brief would describe a code-generation form + per-rep lifecycle list inside `admin-leads.html`. Same shape as today's `admin-contracts.html` brief. | PO requests; I can write the brief | ~30 min to draft brief; designer drafts mockup |
| **E** | **Cleanup `plant-detail.html`** — delete the file or stop linking to it. | Designer / Jan | 5 min |

**Items NOT requiring immediate action** (deferred or low-priority):
- FR-PROD-3 + FR-HW catalogue editor — low-medium, can wait until first inventory friction
- FR-USE-5, FR-CMP-3 — low priority
- FR-WHK-3/4 — deferred to first external integrator
- FR-AUT-4 — deferred to platform role enum landing

---

## 5. Recommendations going forward

1. **Send the `admin-contracts.html` designer brief to whoever owns naia-v4.** The brief is at `briefs/2026-05-25-admin-contracts-html.md`. Largest unbacked surface; designer pass unblocks frontend work on Sub.A20.

2. **Schedule a 30-min PO+Bernard call to scope `inbox.html` and `parametres.html`.** Both are cross-cutting orphans that don't fit cleanly in Subscription or Community PRDs. Decide platform PRD vs new FR families.

3. **Consider commissioning the GAMECODE designer brief** (gap #8). Code generation + per-rep lifecycle list inside `admin-leads.html`. The Sub.A18 backend spec is already drafted + audited; only the mockup is missing.

4. **Run a quarterly mockup-audit** (next: 2026-08-25). Now that both PRDs have cross-reference tables, a recurring audit takes ~30 min agent-spawn vs ~3h cold. Catch drift early before stale notes accumulate.

5. **Don't open new spec work today.** Today's spec output is already substantial (PRD v1.20→v1.23, A19 + A20 + B1 v0.2 drafts, 2 audits, designer brief, Community PRD table, 4 forward-compat annotations). The bottleneck has moved off the PO and onto: (a) Ugo's review of #478 + the 13 community PRs, (b) the designer's work on `admin-contracts.html` + 4 community follow-ups.

---

## Confidence notes

- Coverage matrices from the morning audit remain valid; this final audit incorporates today's deltas without re-running the full cross-reference. Spot-checked the FR-PLAQUETTE + FR-CTR + FR-PARRAINAGE + FR-TB + FR-MD + FR-FU paths explicitly.
- No new gaps surfaced between the morning audit and this EoD refresh — the day's work was closure, not discovery.
- The 5 **SPEC-CLOSED** items count as "audit-closed for PO purposes" — the gap is documented in the PRD or in a designer brief; further movement depends on the designer's calendar, not the PO's.
