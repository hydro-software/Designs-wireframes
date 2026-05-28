# Naia v5 — integrated app mockup (post May 2026 team review)

**Live prototype: https://hydro-software.github.io/Designs-wireframes/naia-platform-v5/**

Iteration of [`naia-v4/`](../naia-v4/) after the **May 2026 team review** of the v4 wireframes
with Bernard, Ugo and Paul. v4 is kept untouched as the comparison reference.

## Changelog · v4 → v5

The May 2026 review produced the following targeted changes. Each is annotated
with the page(s) it affects.

### Round 2 polish (post-review iteration)

These applied to both MVP 0.9 and MVP 1 after a second pass with the team:

- **Légende expandable** on Production + Revenus — chevron-collapsed by default; expands to one row per "slot" (Comparateur · Pluie · Débit, or Comparateur · Prix · Débit on Revenus). Each row has ← → arrows to cycle through the alternatives in its slot, swatch + active name in the middle.
- **Right-axis toggle moved out of the toolbar** — now a small floating pill positioned **above** the chart's right-axis label, swaps the axis between Pluie/Débit (Production) or Prix/Débit (Revenus).
- **Données upload preview** confirmed: 3 columns (Horodatage · Valeur · Statut), no "Unité de Valeur" column (the unit is inferred from the compteur).
- **Paramètres** — all references to issue #591 removed (the redesigned sections are now the canonical spec).
- **Paramètres → Catégories de pertes** — table redesign: each row is a category (click to expand its loss types as indented sub-rows). Columns: Libellé · Type (par défaut) · Affichage (checkbox). Removed the "Reset" button and the standalone "Default loss type" column.
- **Paramètres → Tarification** — replaced the fixed Tarif d'achat / Prix moyen rows with an editable list of tariffs. "Ajouter un tarif" opens a modal with: Nom · Type (manuel | automatique) · Source (free text if manuel, spot dropdown if automatique) · Unité · Note (free text).
- **Paramètres → Partage d'accès** — each row now has a "Retirer l'accès" icon button (user-minus icon, red).
- **Profil** — Sécurité and Mes badges tabs removed (badges live on the Identité page; security moved into a new "Paramètres utilisateur" tile on Identité). The new tile hosts MFA · Langue · Thème · Se déconnecter.
- **Sidebar profile button → direct navigation**: the bottom-left profile button no longer opens a popup dropdown. It navigates straight to `profil.html` where all the items that used to live in the dropdown now sit as tabs (Mon abonnement / Mes factures / Mes jetons) or in the new Paramètres utilisateur tile (Thème / Langue / Sécurité).


### Sidebar — flattened "Pilotage" block
- **All sections regrouped under "Pilotage"**: Tableau de bord · Production · Revenus · Données · Paramètres.
- **No more per-centrale fold-outs** under Production / Revenus / Paramètres — centrales are reached via top tabs on each page (one less layer of navigation).
- **"Rapports" removed from the sidebar** — report generation is now a CTA on the Tableau de bord (cf. below).
- **Inbox moved under "Communauté"** (it sits between the community group title and the topic entries).

### Tableau de bord (`index.html`)
- **Centrales tabs at the top**, with "Tous" (sum) first — same pattern as Production.
- **KPI tiles live ONLY here** (Production and Revenus drop theirs to focus on the chart).
- **Bottom "Par centrale · ce mois" table removed** — that role is fulfilled by the centrales tabs at the top.
- **"Générer un rapport" CTA** card promoted to the dashboard, with a wizard that includes the new **"Pertes détectées · top 5"** report type.

### Production (`production.html`)
- **Top header rewritten**: breadcrumbs `Pilotage → Production` on the left, **time-granularity pills** on the right (Intraday · 30 jours · 12 mois · Années). Old left-title and right total/dates are gone.
- **KPI tiles removed** — only the graph remains.
- **Centrales tabs immediately below the header** (carry the contextual info that the title used to).
- **"Indicateurs" button replaced by left/right arrows** that cycle through the available indicateurs/comparateurs.
- **Right-axis toggle arrow** — small button that swaps the outer right axis between *Pluie (mm)* and *Débit (m³/s)*.
- **Configuration is a discrete sliders icon** (replaces the old "Configuration" button). The icon's tooltip and the resulting overlay make it explicit that this configures **this chart for this user only** (per-user view).
- **Export is a discrete download icon** (replaces the secondary button).
- **"Pertes détectées · top 5" table removed from this page** — it is now one of the report types in the "Générer un rapport" wizard on the Tableau de bord. A small notice on the page points users to the new location.
- **WhatsApp maintenance integration** (cf. [platform#229](https://github.com/hydro-software/platform/issues/229)):
  - Green dot on the **Années** / **12 mois** / **30 jours** time pills indicates that maintenance events were logged in that window.
  - **Intraday dot is clickable** — opens an overlay listing today's WhatsApp events with **edit** buttons per event.
  - On the Intraday view, a green WhatsApp strip above the chart summarises today's events with a direct "Voir / éditer" link.

### Revenus (`revenue.html`)
- **Same layout as Production** — breadcrumbs + time pills, centrales tabs below, no KPI tiles, indicateur arrow-cycler, axis toggle, discrete icon actions.
- Per-centrale breakdown table at the bottom removed (same rule as Production — centrales info is in the tabs).

### Données (`data.html`)
- **"Production" pill renamed "Électricité"**.
- **3rd pill added: "Prix d'Électricité"** (EPEX SPOT, Belpex, tarif OA).
- **"Indicateurs" + "Comparateurs" merged into a single "Indicateur / Comparateur" pill** (2 pills → 1).
- **Compteur dropdown moves underneath the pills** (no longer to the right).
- **Unité dropdown removed** — the unit is now shown as **text** (e.g. *kWh*), read from the compteur's definition in Paramètres.
- **Évènementiel | Fréquentiel toggle** added to the right of "Charger un fichier" — controls how the uploaded series is interpreted.
- **Post-upload prévisualisation** (CSV / XLSX) shows the first rows with horodatage + valeur + statut. Per the team meeting, **no "unité de Valeur" column** — the unit is inferred from the compteur.

### Rapports
- **Removed from the left menu**. The generator is reached via the **"Générer un rapport"** CTA on the Tableau de bord. The historical list page (`reports.html`) still exists and is linked from that CTA.

### Inbox
- **Moved under "Communauté"** in the sidebar (no longer in the Pilotage group).

### Paramètres (`parametres.html`)
- **No items in the left menu, only top tabs** — one tab per centrale (no fold-out).
- **"Général · org." tab removed**. Pure organisation-wide preferences move into the profile dropdown; **user management is now per-centrale** (each centrale tab now has its own Utilisateurs section).
- **Informations générales**:
  - **New field: Code postal** (mandatory).
  - **Mandatory asterisks** on all fields except *Type de turbine* and *Mise en service*.
  - **Puissance max** carries an info tooltip and splits into two values: *turbine* and *injection*.
- **New section: "Informations détaillées"** — hauteur de chute brut, débit nominal, débit réservé, rendement, catégorie, statut administratif.
- **Compteurs section redesigned**:
  - Title becomes **"Compteurs Électriques"**.
  - Columns: **Compteur | Origine des données (GDR / Naia Box / Manuel) | Code compteur (PRM pour GDR, autre numéro pour Naia Box, vide pour Manuel) | Remarques**.
  - **Removed**: *Source*, *Couverture 30j*, the "Charger des données" button, the "Voir l'historique d'imports" link.
- **New section: "Flux de production"**.
  - List view: *Nom | date début | date fin | formule | edit icon*.
  - "Ajouter un flux" opens a modal with: *Nom | De [date] à [date] | Puissance produite (formule, ex. `A + B`) | variables A, B, C…* (each variable picks a compteur, a unit, a coefficient). A **"Ajouter compteur"** button appends a new variable.
- **Indicateurs contextuels & comparateurs**: no change (kept the v4 category cards).
- **Catégories de pertes / Tarification / Partage d'accès**: labels updated to reference [platform#591](https://github.com/hydro-software/platform/issues/591).

### Profil (`profil.html` + siblings)
- **No items in the left menu, only top tabs** — already the case in v4 (Profil is only accessible from the profile dropdown, not the sidebar). v5 confirms this pattern.

## MVP 0.9 toggle (June 2026 conference demo)

A small **MVP 0.9 | MVP 1** segmented switch sits **fixed in the top-right** corner of every page (labelled *Vue conférence*). It persists in `localStorage` (`naia-mvp-tier`) and drives a `body[data-mvp="…"]` attribute.

**MVP 0.9 hides** (via the CSS rule `body[data-mvp="0.9"] [data-mvp="1"] { display: none }`):
- **Sidebar**: Tableau de bord · Simulateur · the entire Communauté group (title + link + Inbox sub-item) · Administration.
- **Profile dropdown**: Mon abonnement · Mes factures · Mes jetons · Voir V2 (mockup) · Administration.
- **Profil page tabs**: Mon abonnement · Mes factures · Mes jetons · Mes badges. The "Mon organisation" card, the badge chips on the identity row, the dedicated "Mes badges" grid and the "Code parrainage org." row are also hidden.
- **Index (Tableau de bord)** page: the actual content cards are hidden and replaced by a friendly *"This page is MVP 1"* fallback banner with a one-click link back to Production.

**What stays visible in MVP 0.9**: Production · Revenus · Données · Paramètres · Profil (identity only) · the Aide & support sidebar entry · the profile dropdown items that are not subscription-related (Mon profil, Thème, Langue, Se déconnecter).

To extend the descope, tag any element with `data-mvp="1"` and it disappears in MVP 0.9. Inverse: tag with `data-mvp="0.9"` to show something *only* in MVP 0.9 (used by the fallback banners).

## Visual language

Identical to v4 — dark theme primary (`#0a1326` navy, `#38bdf8` cyan, `#a3e635` lime),
Inter font, Chart.js theme-aware palette. The v5 additions are CSS-only:
`.time-pills`, `.crumbs`, `.icon-action`, `.axis-toggle`, `.ind-cycler`,
`.wa-dot` / `.wa-strip`, `.preview-card`, `.freq-toggle`, `.flux-formula`,
`.flux-row`, `.req`, `.info-i`.

## What to click for review

1. **Sidebar shape** — Pilotage block is now flat (no fold), Communauté still folds and now hosts Inbox, no Rapports entry.
2. **Tableau de bord** — centrales tabs at the top, KPI tiles, big chart, "Générer un rapport" CTA at the bottom → opens the wizard with the new "Pertes détectées · top 5" report tile.
3. **Production** — breadcrumbs + time-pills at the top with green WhatsApp dots; click the intraday dot to open the editable events overlay; chart toolbar shows the indicateur arrows, axis-toggle, discrete config + export icons; configuration overlay states "for Marc Dupont only".
4. **Revenus** — verifies the same layout works for the revenue chart.
5. **Données** — Électricité / Indicateur-Comparateur / Prix d'Électricité pills; compteur dropdown shows unit as text; Évènementiel|Fréquentiel toggle on the upload row; click the dropzone to see the post-upload prévisualisation.
6. **Paramètres** — open the Moulins tab → expand *Informations générales* (note the asterisks and the puissance-max tooltip), *Informations détaillées*, *Compteurs Électriques* (new columns), *Flux de production* (click "Ajouter un flux" for the modal with the formula).
7. **Profil** — confirms top-tabs only (sidebar items absent).

## Tech stack

Unchanged from v4: Tailwind Play CDN, Inter, Lucide, Chart.js, shared `css/style.css`,
shared `js/app.js` (sidebar builder, centrale tabs, profile dropdown, theme + V2 toggles).

## Related

- [`naia-v4/`](../naia-v4/) — previous iteration, kept for diffing.
- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app.
- [issue #229](https://github.com/hydro-software/platform/issues/229) — WhatsApp maintenance integration.
- [issue #591](https://github.com/hydro-software/platform/issues/591) — loss categories / tariffs / access sharing.
