# Designs-wireframes

Interactive HTML wireframes / clickable prototypes for **Naia** (hydro-software). Static sites, no build step — published via GitHub Pages. This README is the index **and** the changelog.

## Wireframes

| Area | Version | Status | Live URL |
|---|---|---|---|
| **Platform** (integrated app) | **v6.7** | **Active** | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.7/ |
| | v6.6 | Reference (interventions WhatsApp) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.6/ |
| | v6.5 | Reference (Liste des événements · console Core) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.5/ |
| | v6.4 | Reference (Subscription PRD v2.6) | https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.4/ |
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
├── naia-platform/        integrated app: v0 v3 v4 v5 v6.1 v6.2 v6.3 v6.4 v6.5 v6.6 v6.7  (v6.7 = current)
│   ├── v0/               first wireframe document (2025, static screenshots)
│   └── v5/bl_draft/      Bernard's original Paramètres drafts
├── naia-community/        standalone community/loyalty wireframes (archived): v1 v2
└── conference-game/       separate game artifact
```

`naia-platform/` and `naia-community/` each have an `index.html` that redirects to the current version.

## Tech stack (shared across versions)

Static multi-page site, no build step: Tailwind (Play CDN), Inter, Lucide icons, Chart.js, one shared `css/style.css` (dark + light tokens), one shared `js/app.js` (sidebar, centrale tabs, theme/access toggles, chart helpers). Dark theme primary (`#0a1326` navy, `#38bdf8` cyan, `#a3e635` lime), light theme available. Public sign-up / thank-you pages are standalone by design.

## Iteration

Edit the **current** version folder (`naia-platform/v6.7/`), commit, and push to `main` — GitHub Pages auto-rebuilds in ~60 s. Older version folders are frozen comparison references and are not edited.

---

# Changelog

## v6.7 — Prompt d'import assisté · aperçu détaillé des catégories *(current)*

`v6.7` est `v6.6` plus **deux ajouts** et **un alignement de vocabulaire**. Aucun
renommage « perte » → « événement » : ce balayage est réservé à une v6.8 dédiée.

### « Générer un prompt » sur la page Données (`data.html`)

L'utilisateur dont le fichier est refusé n'a pas besoin qu'on lui explique le format
attendu : il a besoin qu'on le fasse pour lui. Un bouton dans l'**en-tête de la carte
« Charger un fichier »** ouvre une modale contenant un prompt prêt à coller dans
l'assistant IA de son choix, avec son CSV ou son XLSX en pièce jointe. Il est dans
l'en-tête et non dans la zone de dépôt : c'est une aide à la préparation du fichier,
pas une deuxième façon de le déposer.

- Le prompt est **générique**, il ne reprend pas les sélections de la page. C'est
  volontaire : c'est le LLM qui, en lisant le fichier, dira à l'utilisateur quoi
  choisir ici. Un prompt pré-rempli à partir de sélections que l'utilisateur a
  justement du mal à poser tournerait en rond.
- Il **pose son propre contexte**. Le modèle qui le reçoit n'a jamais entendu parler
  de Naia : le prompt commence donc par expliquer ce qu'est la plateforme, ce qu'elle
  stocke, ce que l'écran d'import attend, et lui interdit d'aller chercher une
  documentation qui n'existe pas.
- Il fait **deux choses** : convertir le fichier au format Naia (CSV UTF-8, deux
  colonnes, `;`, ISO 8601, point décimal, trous laissés vides), et **rendre un
  récapitulatif de ce qu'il faut sélectionner** — format d'horodatage, fréquentiel /
  évènementiel, unité, avec les libellés exacts des options de l'écran.
- **Le fuseau horaire y a sa propre section.** Naia stocke en UTC mais son import
  attend l'**heure locale de la centrale**, écrite sans décalage ni `Z` (cf.
  `product-system/features/timezone-storage-strategy/`). Le prompt fait détecter la
  convention du fichier, interdit toute conversion vers UTC, impose de demander le
  fuseau plutôt que de le supposer, et traite les deux cas de changement d'heure :
  l'heure doublée d'octobre — à conserver en double, ce ne sont pas des doublons —
  et l'heure manquante de mars, qu'il ne faut pas combler.
- Il interdit au modèle de convertir des unités, de recalculer une valeur ou de
  combler un trou par interpolation. Un import silencieusement « corrigé » est pire
  qu'un import refusé.
- Il ne demande pas au modèle de deviner le **type de données** : l'utilisateur sait
  ce qu'il importe.
- La modale **affiche le prompt en entier** avant de le copier : l'utilisateur doit
  pouvoir le lire, et l'adapter à son cas.
- Wireframe uniquement à ce stade — la version applicative viendra ensuite.

### Aperçu détaillé du wizard « Remplir automatiquement » (`parametres.html`)

Le wizard proposait déjà les bons choix, mais son aperçu était un encart passif qui
ne listait que les catégories de tête. Or « Remplir automatiquement » **écrase** le
tableau existant : avant de cliquer Appliquer, on doit pouvoir lire ce qu'on va perdre
et ce qu'on va gagner.

- Un bouton **« Aperçu détaillé »** franc dans l'encart ouvre une modale (croix,
  clic hors zone, `Fermer`) montrant l'**arbre entier** : catégorie → sous-types,
  avec `Défaut type`, `Défaut sous-type` et `Affichage`.
- Le tableau reprend exactement les colonnes du tableau « Catégories de pertes » de
  la page, mais en **lecture seule** : ici on regarde ce qu'on s'apprête à appliquer,
  on l'ajuste après, dans le vrai tableau.
- `AUTOFILL_SETS` porte désormais les sous-types et les défauts pour les 2 templates
  et les 3 centrales — il n'y avait que des catégories à plat.
- Le compteur de l'encart annonce catégories **et** sous-types.

### Bascule des deux registres alignée sur le menu

Le menu « Générer une liste » de `production.html` propose « Liste des événements » et
« Registre de maintenance », et ce sont exactement les titres des deux pages. Seule la
bascule en haut de ces pages disait autre chose (« Pertes d'énergie » / « Maintenance »).
Elle dit maintenant la même chose que le menu et que les titres.

Effet de bord utile pour la v6.8 : « événement » n'est donc pas le terme parapluie des
deux registres, c'est le nom du registre des pertes. Le renommage à venir a déjà sa place.

## v6.6 — Interventions déclarées par WhatsApp

`v6.6` is `v6.5` plus **one feature**: les exploitants déclarent leurs
interventions par WhatsApp, et Naia les rend visibles. Tout le reste est
inchangé. Cette version sert de support à la décision produit demandée par
Bernard sur [platform#229](https://github.com/hydro-software/platform/issues/229)
(commentaire du 2026-04-01) avant qu'une issue ne soit ouverte.

### Deux registres, pas un

Bernard distingue deux natures de message, et le wireframe les sépare :

- **Opérations** — « j'ai ouvert la vanne ». Aide à la lecture, non structurée,
  visible **uniquement sur le graphique**. Pas de tableau : c'est une note de
  contexte pour celui qui qualifie les pertes, pas un objet de gestion.
- **Maintenance** — structurée, classée, exportable. Elle alimente le nouveau
  **`maintenance.html`** (registre filtrable + export Excel).

### Marqueurs sur le graphique de production (`production.html`)

- Une **bulle de parole neutre** au-dessus des barres du jour concerné.
  Volontairement **pas** le logo WhatsApp (marque déposée, illisible à 12 px,
  et faux le jour où un deuxième canal arrive) et volontairement **pas** un
  point rouge comme le demandait le briefing initial : dans cette légende le
  rouge est déjà pris par « Pannes » et « Données manquantes ».
- La **forme** dit « un humain a déclaré ceci » ; la **couleur** dit lequel des
  deux registres — cyan pour les opérations, vert pour la maintenance.
- Plusieurs messages le même jour = **une bulle + un compteur**.
- **Survol** pour lire, **clic** pour épingler (la photo mérite un arrêt).
- La légende gagne une section « Messages WhatsApp » avec **deux cases à
  cocher indépendantes**, pour afficher les opérations sans la maintenance.

### Registre de maintenance (`maintenance.html`, nouveau)

- Colonnes d'après le commentaire de Bernard : nature + objet issus d'un
  **catalogue à codes** (et non une chaîne libre), **auteur du message brut**
  et **auteur de la dernière correction**, pièce jointe.
- Le clic sur une ligne ouvre un tiroir montrant le **message d'origine tel
  qu'il est arrivé**, à côté du message retenu. Une correction sans son
  original serait une réécriture de l'histoire.
- La recherche porte sur les deux textes : chercher « huile » retrouve
  l'intervention même si le message retenu dit « graissage ».
- Onglet « Toutes » → colonne Centrale + tout le parc ; une centrale précise →
  colonne masquée et périmètre réduit.

### Pourquoi une page séparée de « Liste des événements »

La liste des événements est adossée aux **pertes d'énergie** : chaque ligne
porte un `loss_id`, des kWh et une durée, et se découpe par jour (livré par
[platform#1375](https://github.com/hydro-software/platform/pull/1375)). Une
intervention déclarée n'a rien de tout ça. Les deux registres partagent donc la
**surface** — même entrée « Générer une liste », même mécanique de tri / filtre
/ export, une bascule en haut de page — mais **pas la table**.

### Divers

- « Générer une liste » devient un **menu à deux entrées** plutôt qu'un
  deuxième bouton dans la barre d'outils.
- Correction héritée de v6.5 : `buildProductionChart()` était appelé deux fois
  au chargement (une fois par `applyCentrale()`, une fois par le `setTimeout`
  du `DOMContentLoaded`), et Chart.js jetait un « Canvas is already in use »
  qui polluait la console. Un garde-fou d'une ligne dans `js/app.js`.

## v6.5 — Production réalignée sur l'app en production · console Naia (Core)

`v6.5` is `v6.4` with **two independent changes**, drawn in parallel and merged into the same folder: `production.html` realigned on the live app (plus the new *Liste des événements* page it leads to), and a **new admin console for the Naia (Core) module**. Everything else (Pilotage, Communauté, Subscription) is unchanged from v6.4.

### Production réalignée sur l'app en production

**`production.html` brought back in line with what actually ships on `app.naiahydro.com`** (screenshot review with Bernard, 2026-08-21), plus the new **Liste des événements** page it leads to.

- **Time-granularity pills moved out of the topbar** into their own centred row **below the centrale tabs**, as in the live app. The topbar keeps only the breadcrumbs. (The v5 CSS hack that centred the pills inside the topbar is now scoped to `revenue.html` only.)
- **New Production toolbar** between the pills and the chart, matching the live layout: **Exporter ▾** (left) · **Retour à &lt;période parente&gt;** drill-up link, hidden on the widest granularity (centre) · **Générer une liste** (right).
- **Side panels collapsed by default** — the live app opens with both *Données contextuelles* and *Légende* reduced to their vertical strips.
- **`evenements.html` — new page: Liste des événements.** *Générer une liste* is a plain link straight to it, no dropdown. Dynamic spreadsheet-style table — sortable columns, free-text search on the remarks, type / sous-type filters, running totals — plus an **Exporter en Excel** button (the point of the page — the operator comes here to leave with a file; the export carries what is displayed, filters and sort included). Columns: index · date · **tranche** · temps début · temps fin · durée · kWh · type · sous-type · remarques.
  - **One row = one day**, not one event (Bernard, 2026-08-21): a loss spanning 3 days shows as 3 rows, as if 3 events — the way hydro operators read it. This maps 1:1 onto the backend's `energy_loss_daily` table (PK `loss_id` + `date`, `energy_kWh` per plant-local calendar day; `production_flux_id` and `loss_type_code` are already denormalised onto it, so no join is needed).
  - The **« Tranche » column** (`2/3`) warns that a row is one day of a multi-day event — the rows stay independent, but without a marker three consecutive *Prise d'eau* rows read as three separate incidents. Blank for single-day events.
  - The per-day **start / end times are clipped to the day** (a fully-covered day reads `00:00 → 24:00`). ⚠ Those two times are **not stored** in `energy_loss_daily` today — they have to be derived from the parent `energy_losses.start_time` / `end_time`. Same for the remark, which lives on the parent row.
  - *Type* and *sous-type* are the two halves of the backend's self-describing 3-digit `loss_type_code` (hundreds = category, units = subtype; `101` = category 1 subtype 1). Missing data is **already** part of that taxonomy — `901` *Correction / Données manquantes*, `902` *Correction / Données erronées* — so « événement = écart de production **ou** donnée manquante » needs no new model, just no filter.
- **WhatsApp removed from Production** — the intraday event strip, the status dots on the time pills, the *Événements WhatsApp* overlay and the *Message WhatsApp* section of the chart-config popup are gone.
- **« Top 5 des pertes détectées » note removed** from the bottom of the page.

**Vocabulary:** the UI says **« événement »**, never **« perte »** — an event is either a production shortfall or a missing-data gap. Applied to the new page; the older wording elsewhere in the wireframe is untouched for now.

### Administration : console Naia (Core)

The **Administration surface is split in two**, with a **new admin console for the Naia (Core) module**.

**Why.** The Naia-module admin operations (installing a public source, creating a user, granting plant access) are done today **through the public Swagger**. `/docs` and `/openapi.json` are exposed in production, which the pre-launch security audit has to close — and closing them requires the operations to exist in the UI first. This console is that prerequisite, alongside admin 2FA.

- **Sidebar** — « Administration » is a **fold** again (same idiom as Communauté), with two entries: **Naia (Core)** (`admin-core.html`) and **Subscription** (`admin.html`, the existing dashboard). This reverses the 2026-05-25 flat-link decision, which held while admin covered a single surface.
- **`admin-core.html` (new)** — four sections as top tabs, hash-routed (`#sources-publiques`, `#acces`, `#support`, `#logs`), gated to the **superadmin** (a future `is_naia_superadmin` column will allow several).
  - **Sources publiques · Sources actives** — table of installed sources + a detail sheet: identity (provider, station code, river, coordinates, in-service), Naia state (**vérifiée / non vérifiée** and **active / dormante**), collection health (last run, last point, 7/30-day volume, gaps) and **who selected it** (the lazy-activation gate: a source nobody selected does not collect **by design**, and the sheet says so).
  - **Sources publiques · Ajouter une source** — a **single two-step flow**: *Vérifier la station* (provider + station code) then, only once the station checks out, *Installer la source* (domain pre-filled from the provider). Both API responses are transcribed into plain French, with the four verification outcomes (found / out of service / unknown code / provider unreachable) previewable from a wireframe scenario picker.
  - **Sources publiques · Ingestion de données** — reached **from a source**, not from the sub-nav: the detail sheet's « Ingérer des données » button (next to « Forcer une collecte ») opens the import screen already scoped to that source, with a « Retour à la source » link. It is the « Données » import flow minus the centrale tabs and the data-type pills (a public source is GLOBAL and its type follows the source): sensor unit vs file unit (file units offered per domain), timestamp format, file timezone, declared granularity, separators, frequential/eventual, drag-and-drop zone, preview before confirmation, and that source's own manual-import history.
  - **Accès utilisateurs** — *Créer un utilisateur* and *Donner un accès à une centrale* drawn in full, plus the existing-access table; **« Se connecter à la place d'un utilisateur » is marked En construction**.
  - **Support** and **Logs** — **En construction**. The Naia audit data already exists in the `naia` schema; the note flags the open choice between this section and a third tab on `admin-audit.html`.

## v6.4 — Subscription PRD v2.6 (team-review re-baseline) *(reference)*

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
