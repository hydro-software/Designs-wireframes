# 07 - Conference Setup

## Hardware

### Game Station (Single PC Setup)

| Item | Spec | Notes |
|------|------|-------|
| Screen (game) | 27" monitor, 1920x1080, IPS | Large enough for spectators. IPS for viewing angles |
| Screen (scoreboard) | 40-55" TV | Connected as extended display to same PC |
| Mouse | Wired USB | Wireless = battery risk. For drawing + clicking |
| Computer | Laptop or mini-PC, 8GB+ RAM | Game runs locally — needs Node.js installed |
| HDMI cable | **5 meters** | Long enough to reach the TV from the arcade cabinet |
| HDMI adapter | USB-C → HDMI (if needed) | Depends on mini-PC/laptop ports |
| Power | 4 outlets | PC + monitor + TV + LED transformer, use surge-protected strip |

**No separate computer for scoreboard.** Both the game and scoreboard run on the same machine — game on the primary screen, scoreboard in a second browser window on the TV.

**No keyboard needed.** All text input (email, name) uses an on-screen virtual keyboard operated by mouse. This keeps the arcade cabinet clean and prevents theft/damage.

### Internet (Optional)

| Situation | What works |
|-----------|-----------|
| Good WiFi | Google Sheets sync + results email work |
| Spotty WiFi | Game works perfectly, sync catches up when connection returns |
| No internet | Game works 100%. Export CSV from admin panel at end of day |

Internet is **nice-to-have** for a single console, but **required for 2 consoles** (to sync the shared leaderboard via Google Sheets). Each console works 100% offline for gameplay — only the combined Classement needs WiFi. If WiFi drops, each console falls back to its own local leaderboard.

### Multi-Console Setup (2 Arcade Cabinets)

When running 2 consoles at the same booth:
1. Both PCs connect to conference WiFi
2. Both run the same Nuxt app with different `CONSOLE_ID` (`C1` and `C2`) in `.env`
3. Both write scores to the same Google Sheet (with write verification)
4. The Classement on each TV shows the **combined** leaderboard from both consoles
5. If WiFi drops: gameplay continues, each console shows its local leaderboard with "⚠ Mode local"
6. When WiFi returns: unsynced scores sync automatically, combined leaderboard rebuilds

## Software Setup

### Pre-Install on Game PC

```bash
# 1. Install Node.js (v20+)
# 2. Copy the game folder to the PC
# 3. Build (one-time)
cd naia-conference-game
npm install
npm run build

# 4. Test
node .output/server/index.mjs
# → open http://localhost:3000
```

### Game Day Startup

**Windows** — double-click `start.bat`:
```batch
@echo off
echo Starting Naia Conference Game...
cd /d "%~dp0"
start "" "http://localhost:3000"
timeout /t 2 >nul
start "" "http://localhost:3000/classement"
node .output/server/index.mjs
```

**Manual startup**:
```bash
# Terminal
cd naia-conference-game
node .output/server/index.mjs

# Then open:
# Primary screen: http://localhost:3000
# TV (drag to second screen): http://localhost:3000/classement → F11 for fullscreen
```

### Kiosk Mode (Optional)

```bash
# Chrome kiosk — game (primary screen)
chrome --kiosk --disable-session-crashed-bubble \
  --disable-infobars --noerrdialogs \
  --app="http://localhost:3000"

# Chrome kiosk — scoreboard (TV)
chrome --kiosk \
  --app="http://localhost:3000/classement?conference=hydro-2025"
```

## Staffing

### Game Host (1 person, always at booth)
- Invites visitors: "Can you spot why this plant lost EUR 11,000?"
- Explains drawing mechanic quickly: "Tracez où la production aurait dû être"
- Manages queue (switch to Quick Play if >3 waiting)
- Resets game if needed (F5 to refresh)

### Sales Person (1 person, during busy times)
- Engages players after results: "You found EUR 8,000 — imagine Naia doing this for YOUR plant"
- Books demos, captures leads
- Handles deeper product questions

### Staff Quick Reference

```
NAIA GAME - RÉFÉRENCE RAPIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lancer le jeu :   Cliquer « JOUER »
Réinitialiser :   F5 pour rafraîchir le navigateur
Admin :           http://localhost:3000/admin?key=XXX
Export données :  Admin → Export CSV
Forcer sync :     Admin → Forcer sync Google Sheets
Redémarrer :      Fermer terminal, double-clic start.bat
Écran bloqué :    Ctrl+Shift+Esc → redémarrer Chrome
```

## Pre-Conference Checklist

### 1 Week Before
- [ ] All scenarios loaded and tested end-to-end
- [ ] Intro videos for each scenario recorded and tested
- [ ] Game PC prepared: Node.js installed, game built, tested locally
- [ ] Google Sheets sync tested (if using)
- [ ] Email sending verified with test emails (if using)
- [ ] Admin panel accessible to booth staff
- [ ] Hardware packed (cables, adapters, spare mouse)

### Day Before
- [ ] Set up booth: monitor, TV, PC
- [ ] Connect TV as extended display, verify resolution
- [ ] Run `start.bat` — verify game on primary screen
- [ ] Drag scoreboard window to TV, press F11
- [ ] Run a full test game on actual hardware
- [ ] Test drawing mechanic with mouse
- [ ] Verify intro video plays for each scenario
- [ ] Check Google Sheets sync (if WiFi available)
- [ ] Print staff reference cards
- [ ] Print QR codes for Naia signup CTA

### Morning Of
- [ ] Power on PC, monitor, TV
- [ ] Run `start.bat`
- [ ] Drag scoreboard to TV, F11
- [ ] Run one staff test game → verify full flow (video → draw → score → results)
- [ ] Clear test data from admin panel
- [ ] Confirm admin panel works on staff phones (over WiFi or localhost)

### End of Day
- [ ] Export participant CSV from admin
- [ ] Screenshot the final scoreboard
- [ ] Check Google Sheets for completeness
- [ ] Keep everything connected for next day

### After Conference
- [ ] Import leads into CRM (within 2 days)
- [ ] Send follow-up email to marketing-consented participants (within 3 days)
- [ ] Share leaderboard on LinkedIn (within 1 day)
- [ ] Internal debrief
- [ ] Delete participant data after 90 days

## Budget & Shopping List

This is the **full shopping list for the conference** (excluding cabinet construction). For the list of materials to build the arcade cabinet itself, see [08-hardware-build.md § Cabinet Build Shopping List](08-hardware-build.md#7-cabinet-build-shopping-list).

### Game Station — Electronics & Cables

| Item | Cost | Provided by | Supplier | Notes |
|------|------|-------------|----------|-------|
| Acer B226WL monitor (game) | — | Already owned | — | 22", 1920×1080, detachable stand (see hardware build spec) |
| Mini-PC or laptop | — (or ~EUR 200-400) | Already owned / Buy | [Coolblue](https://www.coolblue.be), [MediaMarkt](https://www.mediamarkt.be), [Azerty](https://www.azerty.be) | Runs the game locally. Intel NUC or similar if new |
| Wired USB mouse (×2) | ~EUR 20 | Buy | [Coolblue](https://www.coolblue.be), [MediaMarkt](https://www.mediamarkt.be) | One spare |
| USB hub (4-port) | ~EUR 10 | Buy | [Coolblue](https://www.coolblue.be), [Amazon.be](https://www.amazon.com.be) | Mouse + peripherals |
| HDMI cable 5 m | ~EUR 15 | Buy | [Coolblue](https://www.coolblue.be), [Krëfel](https://www.krefel.be) | Long run from arcade cabinet to scoreboard TV |
| HDMI adapter (USB-C → HDMI) | ~EUR 10 | Buy | [Coolblue](https://www.coolblue.be), [MediaMarkt](https://www.mediamarkt.be) | If needed for mini-PC / laptop ports |
| Power strip (4-outlet, short cable) | ~EUR 10 | Buy | [Brico](https://www.brico.be), [Hubo](https://www.hubo.be), [Coolblue](https://www.coolblue.be) | Inside the cabinet: PC + monitor + lightbox transformer |

### Scoreboard / Reel Display

| Item | Cost | Provided by | Supplier | Notes |
|------|------|-------------|----------|-------|
| Large screen / TV | — | **Jan** | — | 40-55", HDMI input, used for Naia reel + Classement loop |
| TV stand | ~EUR 50-100 | Buy | [Coolblue](https://www.coolblue.be), [MediaMarkt](https://www.mediamarkt.be) | Foldable, adjustable |
| Headphones | — | **Jan** | — | For intro video audio during gameplay |

### Services

| Item | Cost | Supplier | Notes |
|------|------|----------|-------|
| Infomaniak email (SMTP) | Included | [Infomaniak](https://www.infomaniak.com) | Already in naia.energy hosting |
| Google Sheets | Free | [Google Workspace](https://workspace.google.com) | Shared leaderboard backend |

### Branding & Giveaways

| Item | Cost | Supplier | Notes |
|------|------|----------|-------|
| **Naia branded badges** | ~EUR 3-5 each | [Pins Factory](https://www.pinsfactory.be) or [Epinglesbadges.be](https://www.epinglesbadges.be) | Retro-style analog badge with a gauge needle (as on old meters). Visitors who play the game get one. Strong keepsake + conversation starter at the booth |
| **Naia logo stickers** | ~EUR 0.50 each | [Drukland.be](https://www.drukland.be) | Die-cut vinyl stickers of the Naia logo. Given to all visitors. Low cost, high reach (laptops, notebooks) |
| Printed staff reference cards | ~EUR 5 | [Drukland.be](https://www.drukland.be), local print shop | See Staff Quick Reference section |
| QR code prints (Naia signup CTA) | ~EUR 5 | [Drukland.be](https://www.drukland.be), local print shop | Displayed on booth + given to players |
| **Total branding (per 100 visitors)** | **~EUR 400-600** | | Scale with expected attendance |

### Summary

| Section | Estimated cost |
|---------|----------------|
| Game station electronics & cables | ~EUR 65 (+ ~EUR 200-400 if buying a mini-PC) |
| Scoreboard / reel display stand | ~EUR 50-100 (screen + headphones provided by Jan) |
| Branding & giveaways (100 visitors) | ~EUR 400-600 |
| **Cabinet build** (in 08-hardware-build.md) | **~EUR 300-455** |
| **Transport crate** (in 08-hardware-build.md) | **~EUR 40** |
| **Grand total (per conference)** | **~EUR 855-1,600** |

**Savings vs. previous spec**: No separate computer for scoreboard (saves ~EUR 100-200). No cloud hosting costs. No HDMI stick needed. Large screen + headphones provided by Jan.

## Metrics

### During Conference
- Total games played
- Average score
- Completion rate (finished vs. abandoned)
- Queue length (observed)
- Most common false loss areas (players misidentifying normal production as losses)

### Post-Conference
- Email open rate (if emails sent)
- CTA click-through rate
- Demo bookings from game leads
- Trial signups attributed to game
- Social media mentions

## Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| PC failure | Low | High | Backup laptop with game pre-installed |
| TV failure | Low | Medium | Game works without scoreboard TV |
| Drawing mechanic confusing | Medium | Medium | Game host explains; simplified drawing mode available |
| Nobody plays | Low | Medium | Game host actively invites; scoreboard attracts |
| Long queue | Medium | Low | Switch to Quick Play mode (3 min) |
| Bug during game | Medium | Low | F5 reset; admin panel for fixes |
| Data loss | Low | High | SQLite file backed up + Google Sheets sync |
| Internet unavailable | High | Low | Game is 100% local. Export CSV at end of day |
