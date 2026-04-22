# 09 - Conference Reel (Remotion)

The **reel** is the branded video that plays on the big-screen TV next to the arcade cabinet, in rotation with the live Classement. It introduces Naia to hydropower plant operators visiting the booth and showcases the platform's core value: detecting production losses and correlating them with rain, flow, and price data.

Built with [Remotion](https://www.remotion.dev/) so the same composition can be used for both **the conference live display** (via `@remotion/player` in the browser, data-driven) and **share-able content** (future: render to MP4 for social media).

> **Live preview**: [open the reel viewer](https://hydro-software.github.io/Designs-wireframes/conference-game/reel/) — runs directly in the browser.
>
> **Source**: [`naia-conference-game/remotion/`](https://github.com/hydro-software/platform/tree/main/naia-conference-game/remotion) in the platform repo (spec + code).

## Design principles

- **French, operator-facing** — all copy is in French and speaks directly to plant operators ("Votre centrale", "Ne ratez plus une perte"). No generic marketing language.
- **Screenshot-based** — uses real screenshots of the Naia dashboard (intraday, intraday + rain, monthly aggregate) so visitors see the actual product, not a rendered approximation.
- **Loop-friendly** — 55 seconds total. No hard ending: the CTA scene transitions back into the logo intro naturally.
- **Data-driven** — when embedded in the conference app, the Victory and Classement scenes can accept live data (current record, top-10 aliases) as props.
- **No MP4 rendering required** — the reel runs live in the browser via `@remotion/player`. Rendering to MP4 is optional for social-media clips.

## Timeline (55 seconds at 30 fps = 1650 frames)

| Start | Duration | Scene | Content |
|------:|---------:|-------|---------|
| 0s | 3s | **Logo intro** | Naia logo fade-in with spring animation + tagline "L'œil expert pour votre centrale hydroélectrique" |
| 3s | 8s | **Problème** | Four challenges faced by hydropower operators, in card layout: "Fin des tarifs de rachat", "Prix dynamiques et négatifs", "Variabilité climatique", "Pas d'accès aux services système" |
| 11s | 8s | **Dashboard** | Intraday view screenshot — "Votre centrale, à la minute près · Suivez votre production en temps réel" |
| 19s | 8s | **Détection de perte** | Red highlight box over a production drop + popup: "⚠ Perte détectée · Arrêt turbine · 25-26 février · −12 400 kWh · ≈ −2 480 €" |
| 27s | 8s | **Corrélation** | Screenshot with rain bars + flow line overlaid. Chips for Pluviométrie, Débit rivière, Prix spot, Comparateur plante — "Croisez toutes vos données au même endroit" |
| 35s | 6s | **Vue agrégée** | Monthly screenshot with range toggle highlight (Intraday · 30 jours · 12 mois · Années) — "Zoomez du jour à l'année" |
| 41s | 5s | **Victoire** | Celebration animation for the arcade game: confetti + "🏆 Nouveau record ! · HydroPro42 · 142 pts" |
| 46s | 8s | **Classement** | Top-10 leaderboard with alias + `(N parties)` count, podium colors, current-game indicator |
| 54s | 1s | **CTA** | "Détectez vos pertes. Optimisez votre centrale. · naia.energy" |

Then loops back to **Logo intro**.

## File structure

```
remotion/
├── package.json              # Remotion 4.0, React 19, Vite 5
├── vite.config.ts            # bundles viewer/ for static hosting
├── remotion.config.ts
├── tsconfig.json
├── public/                   # assets served by Remotion staticFile()
│   ├── naia-logo.png
│   ├── concerns.png          # source slide (reproduced as cards in Probleme.tsx)
│   ├── intraday.png
│   ├── intraday-with-rain.png
│   └── month.png
├── src/
│   ├── index.ts              # Remotion entry — registers the Root composition
│   ├── Root.tsx              # composition: 1650 frames, 30fps, 1920×1080
│   ├── NaiaReel.tsx          # master sequencer
│   ├── theme.ts              # brand palette + typography
│   ├── components/
│   │   └── Caption.tsx       # reusable caption with spring animation
│   └── scenes/
│       ├── LogoIntro.tsx
│       ├── Probleme.tsx
│       ├── DashboardIntro.tsx
│       ├── LossDetection.tsx
│       ├── Correlation.tsx
│       ├── AggregatedView.tsx
│       ├── Victory.tsx
│       ├── Classement.tsx
│       └── CTA.tsx
└── viewer/                   # lightweight web wrapper
    ├── index.html
    ├── main.tsx
    └── App.tsx               # embeds <Player> from @remotion/player
```

## Scripts

```bash
# Launch Remotion Studio locally (live composition editing, scrubbable timeline)
npm run dev
#   → http://localhost:3000

# Build the viewer for static hosting (GitHub Pages)
npm run viewer:build
#   → outputs to ./dist/ — copy into conference-game/reel/ in the
#     Designs-wireframes repo to deploy
```

## Integration with the conference app

The conference app (not yet built — runs on the same PC as the game, drives the TV display) will embed the reel via `@remotion/player` and pass live data as `inputProps`:

```tsx
import {Player} from '@remotion/player';
import {NaiaReel} from './remotion/src/NaiaReel';

function ConferenceDisplay() {
  const {leaderboard, latestRecord, currentGame} = useScoreboard();
  // useScoreboard() polls localhost:3000/api/scoreboard every 3s

  return (
    <Player
      component={NaiaReel}
      durationInFrames={1650}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{width: '100%', height: '100%'}}
      loop
      autoPlay
      controls={false}         // kiosk mode — no user UI
      inputProps={{
        victoryAlias: latestRecord?.alias,
        victoryScore: latestRecord?.score,
        leaderboard,             // passed into Classement scene
        currentGame,             // passed into Classement scene
      }}
    />
  );
}
```

Each scene accepts optional props and falls back to demo data when running standalone — so the viewer URL works without any backend running.

## What's next

| Item | Priority | Notes |
|------|----------|-------|
| Replace placeholder screenshots | High | Current screenshots are from `naia-app/figma-*.png` or dev env. Take fresh ones from `app.naiahydro.com` with a real plant + real data before the conference. |
| Validate French copy with Ugo | High | Native-speaker review of every caption — terminology must match what operators actually say in French. |
| Audio / voice-over | Medium | Currently silent — the booth has headphones for the game's intro video, so reel audio may be distracting. Decide per venue. |
| Render to MP4 for social | Low | `npx remotion render` can produce 4K MP4 for LinkedIn, YouTube Shorts. Phase 2 after the first conference. |
| Swap demo leaderboard with live data | Medium | Requires the conference app to be built (Issue TBD). Until then the reel shows hardcoded demo aliases. |
| Per-conference customization | Low | Different tagline, color, or sponsor slot per event — drive via `inputProps` from the conference app. |
