# Designs-wireframes

Interactive HTML wireframes / clickable prototypes for **Naia** (hydro-software). Static sites, no build step — published via GitHub Pages.

**Landing page: https://hydro-software.github.io/Designs-wireframes/**

## Contents

| Area | What it is | Current live URL |
|---|---|---|
| [`naia-platform/`](naia-platform/) | The integrated Naia app mockup (Insight · Community · Subscription). Versioned `v3 → v6.2`; **v6.2 is current**. See [naia-platform/README.md](naia-platform/README.md) for the full all-versions changelog. | [naia-platform/v6.2/](https://hydro-software.github.io/Designs-wireframes/naia-platform/v6.2/) |
| [`naia-community/`](naia-community/) | The standalone "Naia Points" community/loyalty wireframes (pre-integration). **Archived** — now folded into the platform. | [naia-community/v1/](https://hydro-software.github.io/Designs-wireframes/naia-community/v1/) |
| [`conference-game/`](conference-game/) | The conference game — a separate artifact, not part of the platform app. | [conference-game/](https://hydro-software.github.io/Designs-wireframes/conference-game/) |

Supporting material: `bl_draft/` (Bernard's original Paramètres drafts, depend on `naia-platform/v5` assets) · `briefs/` · `audits/` · `wireframe-img/`.

## Structure

```
Designs-wireframes/
├── index.html            landing page (links every prototype)
├── naia-platform/        integrated app — vN folders + the consolidated changelog
│   ├── v3/ v4/ v5/ v6.1/ v6.2/      (v6.2 = current)
│   └── README.md         ← single changelog for all platform versions
├── naia-community/        standalone community/loyalty wireframes (archived)
│   └── v1/ v2/
├── conference-game/       separate game artifact
└── bl_draft/ briefs/ audits/ wireframe-img/    supporting material
```

> **Note (June 2026 restructure):** version folders were regrouped under `naia-platform/` and `naia-community/` (previously `naia-vN` / `naia-platform-vN` / `naia-points-vN` at the repo root). GitHub Pages does not redirect old sub-paths, so the old **version-landing** URLs are preserved by small redirect stubs; deep links into old paths (e.g. a specific `…/admin-pricing.html`) will not redirect — use the new `naia-platform/vN/…` paths.

## Iteration

Edit files under the relevant folder, commit, and push to `main` — GitHub Pages auto-rebuilds in ~60 seconds. Only the **current** platform version (`naia-platform/v6.2/`) is actively edited; older folders are frozen comparison references.

## Related

- [`hydro-software/platform`](https://github.com/hydro-software/platform) — code home for the integrated app
- [`hydro-software/subscription-system`](https://github.com/hydro-software/subscription-system) — Subscription PRD
- [`hydro-software/naia-community`](https://github.com/hydro-software/naia-community) — Community PRD
