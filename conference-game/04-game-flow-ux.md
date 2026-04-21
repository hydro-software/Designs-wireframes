# 04 - Game Flow & UX

> **All screens are in French.** The target audience is French-speaking hydropower operators. All UI labels, buttons, and messages shown below are in French.

## Screen Flow

```
[Bienvenue] → [Alias] → [Vidéo intro] → [Pratique 30s] → [GO!] → [Jeu] → [Résumé]
                                                                              │
                                   ┌──────────────────────────────────────────┘
                                   ▼
                          [Saisir email] → [Écran score : reel Naia ↔ Classement en boucle]
                                   ▲                                          │
                                   └─── [Nouvelle partie] ←───────────────────┘
```

**Key changes vs. classic arcade flow**:
- **Alias first**: Player creates a pseudonym before the game for the leaderboard (privacy-friendly)
- **30s practice**: Guided tutorial before the timed round — ensures fair competition and teaches the mechanics
- **Registration (email) happens after the game**, not before — player is hooked first, then motivated to leave their email
- **Score screen loops** between a Naia reel video and the Classement, driven by the conference app (TV display). Detailed results are only sent by email (not shown on screen), keeping the arcade flow fast for the next player

## Screen 1: Bienvenue (Welcome)

**Purpose**: Attract passers-by.

```
┌──────────────────────────────────────────────┐
│                                              │
│          [Logo Naia]                         │
│                                              │
│   Détectez les pertes cachées !              │
│                                              │
│   Les exploitants hydroélectriques perdent   │
│   des milliers d'euros sans le savoir.       │
│   Saurez-vous trouver et diagnostiquer      │
│   les pertes de production ?                 │
│                                              │
│          [ JOUER ]                           │
│                                              │
│   ──── Classement ────                       │
│   1. Pierre M.  ·····  142 pts              │
│   2. Sophie L.  ·····  128 pts              │
│   3. Marc D.    ·····  115 pts              │
│                                              │
│   Aujourd'hui : 47 joueurs | Moy. : 89     │
│                                              │
└──────────────────────────────────────────────┘
```

- Auto-returns here after 60s of inactivity
- Top 5 visible for competitive pull

## Screen 1.5: Saisir un alias (Alias Entry)

**Purpose**: Let the player choose a pseudonym for the leaderboard before playing.

```
┌──────────────────────────────────────────────┐
│                                              │
│   Choisissez votre pseudo                    │
│                                              │
│   ┌────────────────────────────────────┐     │
│   │ HydroPro42                        │     │
│   └────────────────────────────────────┘     │
│                                              │
│   3-20 caractères                            │
│                                              │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐ │
│   │ A │ Z │ E │ R │ T │ Y │ U │ I │ O │ P │ │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤ │
│   │ Q │ S │ D │ F │ G │ H │ J │ K │ L │ M │ │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤ │
│   │ W │ X │ C │ V │ B │ N │ 0-9 │ ⌫ │     │ │
│   └───────────────────────────────────────┘ │
│                                              │
│          [ CONTINUER → ]                     │
│                                              │
└──────────────────────────────────────────────┘
```

- AZERTY virtual keyboard
- 3-20 characters, alphanumeric + `_` `-`
- Shown on the leaderboard — no real name required at this stage
- If alias already exists in today's session: append a number suffix
- Real name + email captured AFTER the game (Screen 6)

## Screen 2: Vidéo d'introduction

```
┌──────────────────────────────────────────────┐
│                                              │
│   ┌──────────────────────────────────────┐   │
│   │                                      │   │
│   │     [Vidéo de la centrale]           │   │
│   │                                      │   │
│   │     Centrale de Moulins              │   │
│   │     450 kW — La Dordogne, France     │   │
│   │                                      │   │
│   └──────────────────────────────────────┘   │
│                                              │
│   Découvrez cette centrale avant de jouer.   │
│                                              │
│          [ C'EST PARTI ! ]  (ou attendre)    │
│                                              │
└──────────────────────────────────────────────┘
```

- **Video**: Local MP4/WebM file, configured per scenario
- Player can press **C'EST PARTI !** anytime (even during video) to skip ahead
- If no button pressed, game starts automatically when video ends
- Plant name, capacity, and river shown as overlay text on the video or below it
- Purpose: Gives the player context about the plant they're about to analyze

## Screen 2.5: Mode Pratique (30-second Guided Tutorial)

**Purpose**: Teach the mechanics before the competitive round. Mandatory — the 5-minute timer does NOT start until practice ends.

```
┌──────────────────────────────────────────────────────────────────┐
│ 🎓 MODE PRATIQUE — 0:22 restantes           [J'AI COMPRIS →]    │
│──────────────────────────────────────────────────────────────────│
│        │                                                         │
│ PANEL  │  ZONE GRAPHIQUE (exemple guidé)                         │
│        │                                                         │
│ Indica-│  ▼▼  ▼▼▼  ▼    ▼▼▼▼  ▼▼   ▼▼  ▼▼▼   ← Pluie          │
│ teurs  │  ─────────────────────────────────────                  │
│        │                                                         │
│        │  ██ ██ ██ ░░ ██ ██ ░▓ ██ ██ ██ ░░ ██  ← Production    │
│        │            ↑                                            │
│        │        ┌───────────────────────────┐                   │
│        │        │ 💡 Ici, la production est │                   │
│        │        │ anormalement basse.       │                   │
│        │        │ Tracez la ligne attendue! │                   │
│        │        └───────────────────────────┘                   │
│        │                                                         │
│        │  Étape 1/4 : Repérer la perte                          │
│        │  Étape 2/4 : Tracer la ligne attendue                  │
│        │  Étape 3/4 : Choisir la catégorie                      │
│        │  Étape 4/4 : Choisir la sous-catégorie                 │
│        │                                                         │
└──────────────────────────────────────────────────────────────────┘
```

**Flow**:
1. **30-second countdown** in top bar (not the game timer — this is practice time)
2. **Animated tooltips** guide the player through each interaction
3. **Pre-filled example**: a sample loss area is shown, the draw mechanic is demonstrated visually
4. **Try it yourself prompts**: player practices drawing/classifying once before the real round
5. **J'AI COMPRIS button**: skip the tutorial early if confident
6. At end: "Prêt ? La vraie partie commence !" → Screen 3 (countdown)

**Purpose**:
- Fair competition: every player starts with the same baseline understanding
- Reduces the "host has to explain the mechanic" burden
- First-time players aren't disadvantaged vs. repeat players
- Even non-hydro experts understand the UI before the timer starts

## Screen 3: Décompte (Countdown)

```
        3... 2... 1... C'EST PARTI !
```

Full-screen, 3 seconds. Builds anticipation. The real 5-minute timer starts when "C'EST PARTI !" disappears.

## Screen 4: Jeu (Gameplay — Core)

**This screen is 100% identical to the real Naia platform dashboard.** The game doubles as a live product demo — what the player sees IS Naia. The only addition is a **chronometer** (countdown timer) displayed at the top.

The player must: (1) draw expected production lines to identify losses, (2) classify each loss by category and subcategory.

```
┌──────────────────────────────────────────────────────────────────┐
│ ⏱ 4:32          Score : 35           Pertes trouvées : 2        │
│──────────────────────────────────────────────────────────────────│
│        │                                                         │
│ PANEL  │  ZONE GRAPHIQUE                                         │
│        │                                                         │
│ Indica-│  ▼▼  ▼▼▼  ▼    ▼▼▼▼  ▼▼   ▼▼  ▼▼▼     ← Pluie       │
│ teurs  │  ─────────────────────────────────────                  │
│        │  ~~  ~~~  ~~~~  ~~  ~~~  ~~~~  ~~  ~     ← Débit       │
│ ☐ Débit│  ─────────────────────────────────────                  │
│   stn  │  ██ ██ ██ ░░ ██ ██ ░▓ ██ ██ ██ ░░ ██    ← Production  │
│   B    │          • ← point maintenance                          │
│ ☐ Débit│           ╌╌╌ ← ligne tracée par le joueur              │
│   stn  │                                                         │
│   C    │  [ MODE DESSIN : Cliquez pour tracer la production     │
│        │    attendue ]                                            │
│ ☐ Comp-│  ── Vos pertes ──                                      │
│   ara- │  • Perte 1 : Panne > Défaillance turbine  [35 pts]    │
│   teur │  • Perte 2 : [en cours...] cliquez pour définir        │
│   (CHE │                                                         │
│   aval)│                                                         │
│        │              [ VALIDER ]                                │
│        │                                                         │
└──────────────────────────────────────────────────────────────────┘
```

### Chronometer (Top Bar)
- **Timer**: Counts down from 5:00. Orange at 1:00, red + pulse at 0:15
- **Score**: Running total (updates after each loss is classified)
- **Progress**: "Pertes trouvées : 2" — how many losses the player has identified
- This is the ONLY element not present in the real Naia dashboard

### Left Panel: Sélecteur d'indicateurs

The left panel lists **additional data sources** the player can toggle on/off to overlay on the chart. This mirrors the real Naia dashboard where operators configure which context indicators to display.

**Default (always visible):**
- Pluie (station principale) — inverted bars
- Débit (station principale) — line
- Points maintenance — always shown

**Available to add (checkboxes):**
- Additional flow stations (e.g., "Station B — amont", "Station C — affluent")
- Comparator: production of another plant (e.g., "CHE Le Moulin — aval")
- Comparator: production of the same plant in a previous year
- Additional rain station

**How this helps the player:**
- If a loss area shows low production but the primary flow station looks normal, adding a **second flow station upstream** might reveal that the water was diverted
- A **comparator plant** showing normal production on the same day proves the water was there → the loss is plant-specific (breakdown, not environmental)
- A **previous year comparator** helps distinguish seasonal patterns from real losses

**Strategic value:**
- Players who use additional indicators can make better diagnoses
- This mirrors exactly how the real Naia tool works → strongest possible product demo
- Time spent adding indicators = time not spent finding losses → risk/reward tradeoff

### Points maintenance

Visible as small dots on the production line at specific dates:
- **Hover** or **click** a dot → popup with the maintenance label
- Example: "Redémarrage turbine après déclenchement", "Nettoyage grille", "Remplacement capteur de débit"
- These give strong contextual clues for diagnosis
- Some dots are near loss areas (helpful), some are routine operations (not near losses)

```
┌──────────────────────────────┐
│  🔵 5 jan.                    │
│  "Redémarrage turbine après   │
│   déclenchement"              │
└──────────────────────────────┘
```

### Drawing Interaction

The player draws expected production lines on the chart to mark loss areas:

1. **Enter draw mode**: Click the "Dessiner" button or click directly on the chart
2. **Click on start date**: First click sets the start of the loss area
3. **Click on end date**: Second click sets the end of the loss area
4. **Draw expected line**: Between start and end, the player clicks/drags to set the expected production level for each day (or a single flat line)
5. **Loss area appears**: The gap between the drawn line and actual production is shaded — this is the loss the player identified
6. **Cause selector opens**: Player picks category + subcategory

**Simplified drawing option**: For speed, the player can:
- Click a start date and end date
- The system draws a flat line at the average of surrounding normal days
- Player adjusts the line height if needed (drag up/down)

### Sélection de cause (After Drawing a Loss Area)

When the player finishes drawing a loss area:

```
┌─────────────────────────────────────┐
│  Perte 3 : 15-16 jan.               │
│  Perte estimée : 15 200 kWh         │
│                                      │
│  Quelle est la cause ?              │
│                                      │
│  Catégorie :                        │
│  ○ 🔧 Panne                        │
│  ○ 📅 Maintenance                   │
│  ○ 🍃 Environnement                │
│  ○ ⚙  Exploitation                  │
│  ○ ⚡ Réseau / Contrainte           │
│  ○ ⚠  Problème données             │
│                                      │
│  Sous-catégorie :                   │
│  [▼ Choisir la sous-catégorie...]   │
│  (apparaît après le choix)          │
│                                      │
│  [ CONFIRMER ]    [ SUPPRIMER ]     │
└─────────────────────────────────────┘
```

**Flow**:
1. Player selects a **category** (6 radio buttons)
2. **Subcategory dropdown** appears with 3-5 options for that category
3. Player selects subcategory
4. **CONFIRMER** → score updates immediately:
   - Category: green flash (+10) or red flash (-5)
   - Subcategory: green flash (+5) or red flash (-2)
   - Size accuracy: shown as a bar (0-10 pts) — "Taille : 92% précision → 6 pts"
5. **SUPPRIMER** → removes the drawn area (if player changes their mind)

**Changing an answer**: Click an existing loss area on the chart → reopens the selector. Previous points reversed, new points applied.

### Liste des pertes (Bottom of Chart Area)

Shows all losses the player has identified:
```
• Perte 1 : ✅ Panne > Défaillance turbine — 10 + 5 + 8 = 23 pts
• Perte 2 : ❌ Environnement > Crue — 10 + (-2) + 6 = 14 pts
• Perte 3 : [dessin en cours...]
```

Clicking a row highlights the corresponding area on the chart.

### Valider (Submit)

- Available anytime — player decides when they're done
- Shows time comparison: "Temps utilisé : 2:47. Temps normal : 3:00 → 13 secondes plus rapide = +13 points bonus"
- Confirmation required

### Timer Expiry

- At 0:00, game ends automatically
- All drawn losses are scored; unfinished drawing is discarded
- Transition to results

## Screen 5: Résumé (Summary Result)

A quick score overview — shown immediately after gameplay ends. Keeps the energy up.

```
┌──────────────────────────────────────────────┐
│                                              │
│   🎯 Votre score : 142 points               │
│   📊 Classement : #7 sur 42 joueurs         │
│                                              │
│   Pertes trouvées : 5/7                      │
│   Bonus temps : +30 pts                      │
│                                              │
│   Voulez-vous recevoir vos résultats         │
│   détaillés par email ?                      │
│                                              │
│          [ OUI, VOIR MES RÉSULTATS → ]       │
│                                              │
│          [ NON, VOIR LE CLASSEMENT ]         │
│                                              │
└──────────────────────────────────────────────┘
```

If player clicks "NON" → skip to Classement screen. If "OUI" → go to email input.

## Screen 6: Saisir email (Email Input)

**On-screen keyboard** — there is no physical keyboard at the arcade cabinet. The player uses the mouse to type their email on a virtual keyboard.

```
┌──────────────────────────────────────────────┐
│                                              │
│   Entrez votre adresse email                 │
│                                              │
│   ┌────────────────────────────────────┐     │
│   │ pierre.martin@edf.fr              │     │
│   └────────────────────────────────────┘     │
│                                              │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐ │
│   │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤ │
│   │ a │ z │ e │ r │ t │ y │ u │ i │ o │ p │ │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤ │
│   │ q │ s │ d │ f │ g │ h │ j │ k │ l │ m │ │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤ │
│   │ w │ x │ c │ v │ b │ n │ . │ - │ _ │ ⌫ │ │
│   ├───┴───┴───┼───┴───┴───┼───┴───┴───┴───┤ │
│   │    @      │   .com    │   .fr         │ │
│   └───────────┴───────────┴───────────────┘ │
│                                              │
│   ☐ J'accepte de recevoir mes résultats     │
│     par email                                │
│   ☐ Je souhaite en savoir plus sur Naia     │
│                                              │
│   Prénom *  [________________]               │
│   Nom *     [________________]               │
│   Entreprise [________________]              │
│                                              │
│          [ ENVOYER ET VOIR LE CLASSEMENT → ]  │
│                                              │
└──────────────────────────────────────────────┘
```

**On-screen keyboard features:**
- AZERTY layout (French keyboard)
- Quick-insert buttons for `@`, `.com`, `.fr` (most common email domains)
- Backspace key (`⌫`)
- Large click targets (44px+ for mouse precision)
- Email validation: check format before proceeding
- Basic name fields (first name, last name) also use on-screen keyboard
- Optional company field

After submitting, the detailed results are **sent by email only** (not shown on screen). This keeps the flow fast — the screen transitions directly to the Classement. The email includes the full score breakdown, CTA to naia.energy/signup, and revenue impact figures.

## Screen 7: Écran Score (Conference App Display — Second Screen/TV)

The second screen / TV next to the arcade cabinet shows a **looping sequence driven by a separate conference app**, not the game itself. This keeps the game console free for the next player while the big screen continues to attract attention.

### Display Loop

```
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│                                  │        │                                  │
│  🎬 REEL NAIA                   │  -->   │  🏆 CLASSEMENT                  │
│  (branded video, 30-45s)         │        │  (top 10 + current game)         │
│                                  │        │                                  │
└──────────────────────────────────┘        └──────────────────────────────────┘
         ▲                                                   │
         └───────────────────────────────────────────────────┘
```

**Cycle**:
1. **Naia reel video** (30-45s) — branded marketing clip showing the real Naia platform, customer testimonials, key features. Auto-plays, loops
2. **Classement** (30-45s) — live leaderboard with top 10 and the current player (if any)
3. Repeat

**Driven by a separate conference app**:
- The game console runs the game (foreground on the arcade monitor)
- The **conference app** runs on the same PC but displays on the TV via the extended monitor. It fetches scoreboard data from the game's local API (`localhost:3000/api/scoreboard`) AND plays the reel video(s) in rotation
- This separation means the game and the display can evolve independently
- The conference app is also where reel videos, branding overlays, and cycle timing are configured

### Classement View (part of the loop)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   [Logo Naia]    DÉFI DÉTECTION DE PERTES                │
│                                                          │
│   🏆 CLASSEMENT                                         │
│   ─────────────────────────────────────────────          │
│   #1  HydroPro42     EDF Hydro             142          │
│   #2  SophieH2O      CNR                   128          │
│   #3  TurbineMax     Hydrovolt             115          │
│   ...                                                    │
│   #10 Débutant77     Indépendant            72          │
│   ─────────────────────────────────────────────          │
│                                                          │
│   Aujourd'hui : 47 joueurs | Moy. : 89 | Record : 142  │
│                                                          │
│   🎮 En jeu : Marie42 — 3:42 restantes                 │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- Leaderboard shows **aliases** (from Screen 1.5), not real names (privacy)
- Top 10 displayed
- Updates automatically (polling `localhost` — no SSE needed since it's local)
- Highlights new entries (animated push if a player just made the top 10)

### Reel Video Configuration

The conference app reads a list of videos from its config:
- `/videos/naia-reel-01.mp4` — main product reel
- `/videos/naia-reel-02.mp4` — customer testimonial
- `/videos/naia-reel-03.mp4` — short teaser

Admin can reorder or disable videos via the admin panel.

## Naia Signup Page (naia.energy/signup)

This page is part of this project's scope and lives on the naia.energy website. It is the landing page for the CTA button shown in game results and in the results email.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   [Logo Naia]                                            │
│                                                          │
│   Vous avez détecté des pertes comme un pro.             │
│   Naia le fait automatiquement pour votre centrale.      │
│                                                          │
│   ── Ce que Naia fait pour vous ──                       │
│   ✅ Détection automatique des pertes de production      │
│   ✅ Classification par catégorie et cause               │
│   ✅ Estimation du manque à gagner en €                  │
│   ✅ Alertes en temps réel                               │
│                                                          │
│   ── Essayez gratuitement ──                             │
│                                                          │
│   Prénom *     [________________]                        │
│   Nom *        [________________]                        │
│   Email *      [________________]                        │
│   Entreprise   [________________]                        │
│   Téléphone    [________________]                        │
│                                                          │
│          [ CRÉER MON COMPTE GRATUIT ]                    │
│                                                          │
│   Déjà client ? Se connecter                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- **URL**: `https://naia.energy/signup` (or `/inscription`)
- **UTM tracking**: Links from the game include `?utm_source=conference-game&utm_campaign={conference_id}` to track conversions
- **Pre-fill**: If the player clicked the CTA from the results email, pre-fill email from the link parameter
- **Design**: Same Naia branding, responsive, works on mobile (players may scan a QR code from the email)
- **Backend**: Creates a lead in the Naia platform (or CRM)

## Interaction Design

### Mouse-Only — No Keyboard

The game runs on an arcade cabinet without a physical keyboard. All interaction is mouse-based:
- **Drawing**: Click to set points, drag optional for fine-tuning
- **Text input**: On-screen virtual keyboard (AZERTY) for email and name entry
- **Large click targets**: 44px+ for all interactive elements
- **Hover states**: Maintenance dots, chart bars, panel checkboxes
- **Clear cursor changes**: Crosshair in draw mode, pointer on interactive elements

### Drawing UX Details
- Visual feedback: as the player draws, the loss area fills with a semi-transparent color
- The estimated loss size (kWh) updates in real-time as the line is adjusted
- Undo: click "Supprimer" in the cause selector, or right-click on a drawn area
- Maximum ~12 loss areas per game (prevent spam-drawing)

### Panel Indicator Toggling
- Click checkbox → indicator appears/disappears on chart with smooth transition
- Each indicator has a color legend entry
- Maximum 3 additional indicators visible at once (chart readability)

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Player walks away mid-game | Auto-timeout after 30s no interaction → save partial score → bienvenue |
| Player draws overlapping loss areas | Merge into one, or reject and show "Chevauchement avec Perte 2" |
| Player draws a loss where there isn't one | -5 points (false loss) — shown in results |
| Timer expires during drawing | Unfinished drawing discarded, completed losses scored |
| Timer expires during popup | Popup closes, current selection NOT saved, game ends |
| Player wants to replay | Gets a different scenario. Best score counts for leaderboard |
| Player skips intro video | Allowed — press C'EST PARTI ! anytime |
| Intro video file missing | Skip video screen, go straight to countdown |
| Internet unavailable | Game works 100% locally. Email queued, sent when connection returns |
| Player skips email input | Score still saved in leaderboard. No email sent. |
