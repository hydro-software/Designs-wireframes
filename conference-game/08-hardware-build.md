# 08 - Hardware Build: Tabletop Arcade Cabinet

## Overview

A custom tabletop arcade cabinet houses the game screen and provides a comfortable, eye-catching setup for conference play. It sits on a standard table (90cm height) and is designed for a standing player of average height (180cm).

The cabinet is built from **poplar plywood 15mm** panels, with a slot for the Acer monitor, a flat mouse shelf, and a Naia-branded illuminated logo panel (lightbox).

> **Interactive panel drawings**: See [`cabinet-panels.html`](cabinet-panels.html) ([open live preview](https://hydro-software.github.io/Designs-wireframes/conference-game/cabinet-panels.html)) for detailed SVG diagrams of all panels with exact dimensions, assembled front/perspective views, cut list with weights, and transport crate packing layout.

---

## 1. Screen Specifications

### Acer B226WL Monitor (Already Owned)

| Property | Value |
|----------|-------|
| Model | Acer B226WL |
| Display area | 47.7 cm wide × 30.0 cm high |
| Bezel — left | 1.4 cm |
| Bezel — right | 1.4 cm |
| Bezel — top | 1.4 cm |
| Bezel — bottom | 1.8 cm |
| **Total outer dimensions** | **50.5 cm wide × 33.2 cm high** |
| Panel depth (thickest) | ~5.5 cm (at hump on back) |
| Stand height range | 5 cm to 20 cm (from tabletop to bottom of screen) |
| Inputs | HDMI, VGA, DVI |
| Power | IEC C14 (standard PC power cable), EU plug |

**Photos of the actual monitor used for this build**:

![Acer B226WL front view](20260420_113506.jpg)
![Acer B226WL side view](20260420_113519.jpg)

Front and side views show the stand profile and how the cables (HDMI + power) route at the back. The stand base footprint and the panel depth inform the monitor shelf dimensions (30 cm deep × 55 cm wide).

**For the cabinet**: The monitor **keeps its stand** (non-removable). It sits on an internal shelf inside the cabinet, with the screen visible through a window cutout. The stand's built-in height adjustment (5-20cm) and tilt (~20°) are used to position the screen correctly.

### Screen Window Dimensions

The cabinet's front panel has a **window opening** sized to the visible display area only. The monitor bezels sit **behind** the plywood front panel (the panel overlaps the bezels, framing the screen cleanly).

| Dimension | Value |
|-----------|-------|
| Window width | 48.7 cm (display 47.7 + 0.5 cm each side) |
| Window height | 31.0 cm (display 30.0 + 0.5 cm each side) |

---

## 2. Ergonomic Calculations

### Standing Player — 180cm Height

| Parameter | Value | Source |
|-----------|-------|--------|
| Player height | 180 cm | Given (average) |
| Eye height | ~168 cm | ~93% of height |
| Table height | 90 cm | Given |
| Comfortable viewing angle | 15-20° below horizontal | Ergonomic standard |
| **Screen center above table** | **~65 cm** | Target |

---

## 3. Cabinet Design

### Material: Poplar Plywood 15mm

| Property | Value |
|----------|-------|
| Material | Poplar plywood |
| Thickness | 15mm (1.5cm) |
| Weight | ~6 kg/m² |
| Finish | Paint Naia Blue (#1A5F7A) + vinyl |

**Why poplar plywood over MDF?** ~50% lighter (6 kg/m² vs. 12 kg/m² for 18mm MDF) at equivalent structural strength. Easier to transport. Screws hold better than in MDF.

### Overall Dimensions

| Dimension | Value |
|-----------|-------|
| Cabinet width | 58 cm |
| Inner width (between side panels) | 55 cm (58 - 2×1.5) |
| Height at front | 95 cm |
| Height at back | 88 cm |
| Depth | 50 cm |
| Front panel tilt | 20° backward from vertical |
| Front panel surface length | 82 cm |
| Roof slope | ~8° (gentle, less dominant silhouette) |
| Mouse shelf total width | 108 cm (58 + 2×25 overhang) |
| Back | **Open** (no back panel) |

### Design Note: Roof Slope Reduced

The roof slope was reduced from the original 16.7° (15 cm drop over 50 cm) to **~8° (7 cm drop over 50 cm)**, following a design review:
- **Problem**: A steeply inclined roof made the cabinet silhouette feel top-heavy and could block viewing angles for taller spectators standing behind the player
- **Solution**: Flatten the slope while keeping the logo panel at the same front height (95 cm). Back height raised from 80 cm to 88 cm
- **Impact**: Small increase in back-of-cabinet height (~8 cm), slightly longer roof panel (~51 cm vs. 52.2 cm), otherwise unchanged

### Key Geometry

The front panel is tilted 20° backward — bottom at the front edge, top receding 28cm into the cabinet. A horizontal **soffit panel** (G) bridges the gap between the front panel top and the logo panel, blocking lightbox light from shining downward and supporting the lightbox assembly. Above the soffit, a vertical logo panel faces the player directly. The roof slopes gently from 95cm (front) to 88cm (back).

```
Side profile points (depth, height in cm):
A (0, 0)      — front bottom
B (28.0, 77.1) — top of front panel (tilted)
C (0, 77.1)    — logo panel bottom / front edge at that height
D (0, 95)      — logo panel top / roof front
E (50, 88)     — roof back / back top  (gentle ~8° slope)
F (50, 0)      — back bottom
```

### Assembled Views

See [`cabinet-panels.html`](cabinet-panels.html) for interactive SVG views:
- **Front view**: Shows the cabinet as the player sees it — logo lightbox panel at top, front panel with screen window, mouse shelf with overhangs
- **45° perspective view**: Shows the tilted front panel receding backward, side panel profile, angled roof, and the screen visible through the window cutout

---

## 4. Panel Cut List

All panels cut from **poplar plywood 15mm**. See [`cabinet-panels.html`](cabinet-panels.html) for detailed drawings with exact dimensions per panel.

### Panel A: Side Panels (×2, mirrored)

Complex 6-point shape defining the cabinet profile.

| Edge | From → To | Length |
|------|-----------|--------|
| Front bottom → Front panel top | A→B | 82 cm (along 20° tilt) |
| Front panel top → Logo bottom | B→C | 28.0 cm (horizontal — soffit panel G sits here) |
| Logo bottom → Logo top | C→D | 17.9 cm (vertical, front edge) |
| Logo top → Roof back | D→E | 50.5 cm (gentle ~8° roof slope) |
| Back edge | E→F | 88 cm (vertical) |
| Bottom | F→A | 50 cm (horizontal) |

Features:
- Slot markers at 8, 12, and 16cm height for adjustable mouse shelf position
- Monitor shelf support at Y=38cm
- Area: ~0.36 m² each
- Weight: ~2.2 kg each

### Panel D: Front Panel (×1)

| Dimension | Value |
|-----------|-------|
| Width | 55 cm (inner width) |
| Height | 82 cm (surface length along 20° tilt) |
| Screen window cutout | 48.7 × 31.0 cm |
| Material | Poplar plywood 15mm |
| Weight | ~2.3 kg |

Tilted 20° backward. The bottom edge sits at the front, the top edge recedes 28cm into the cabinet.

### Panel E: Roof Panel (×1)

| Dimension | Value |
|-----------|-------|
| Width | 55 cm |
| Length | 50.5 cm (slope: √(50² + 7²)) |
| Angle | ~8° from horizontal |
| Weight | ~1.7 kg |

Angled panel spanning from front top (95cm) to back top (80cm).

### Panel F: Logo Panel — Illuminated Lightbox (×1)

| Dimension | Value |
|-----------|-------|
| Width | 55 cm |
| Height | 17.9 cm |
| Construction | Lightbox (see below) |
| Weight | ~0.6 kg |

Vertical panel at the front of the cabinet, above the tilted front panel. This is the main branding surface — the first thing visitors see. **Built as an illuminated lightbox** with backlit Naia logo.

#### Lightbox Construction (2 layers + soffit)

```
┌──────────────────────────────────────┐
│  Front: 3mm opal acrylic             │  ← diffuses LED light evenly
│  ──────────────────────────────────  │
│  Back: 3mm white foamboard + LED     │  ← LED strip in zigzag pattern
│  ──────────────────────────────────  │
│  Bottom: Soffit panel (plywood 15mm) │  ← blocks light downward, supports lightbox
└──────────────────────────────────────┘
```

The logo panel lightbox rests on the **soffit panel** (Panel G) which closes the gap between the logo panel and the top of the tilted front panel. The soffit:
- **Supports the lightbox**: acrylic + foamboard sandwich sits on top of the soffit
- **Blocks downward light**: prevents LED light from shining into the player's face
- **Adds structural rigidity**: connects logo panel area to front panel top

No aluminum U-channel needed — the foamboard strip spacers (2cm wide, cut from the same foamboard sheet) create the gap between acrylic and LED backing. These are glued around the perimeter edges.

| Component | Spec | Source (Belgium) |
|-----------|------|-----------------|
| Opal acrylic XT 3mm | 55 × 17.9 cm, cut to size | [Kunststofplaten.be — Plexiglas opaalwit XT 3mm](https://kunststofplaten.be/product/plexiglas-opaalwit-xt-3-mm/) — free custom cutting |
| White foamboard 3mm | 55 × 17.9 cm (×2: one for back, one cut into 2cm spacer strips) | Any craft store (Action, Pipoos, Ava) — ~€3 each |
| LED strip 24V | 120 LEDs/m, 4000K neutral white, ~1.2m needed | [Leds-store.be — LED strip 120 LEDs 4000K](https://leds-store.be/led-strip-120-leds-4000k-neutraal-wit-ip20) |
| 24V 60W transformer | Powers the LED strip, plugs into power strip in cabinet | [Leds-store.be — transformator 24V 60W](https://leds-store.be/led-strip-transformators-24v-60w) |
| Vinyl decal | Naia logo + wave design, 55×17.9cm | [Drukland.be — vinyl sticker op maat](https://www.drukland.be/ProductController/calc/groot-formaat-vinyl-stickers?product_id=996114&width=55&height=17.9&qty=3) — 3 stuks bestellen (1 + reserve) |

#### Vinyl Decal Design

![Logo panel design](naia-arcade-panel-2165x705-300dpi%20(2).png)

Retro arcade-style design with the Naia logo centered on a dark background with radial glow. Key elements:
- **Center**: Naia logo (blue-cyan-purple gradient) with bright radial glow behind it
- **Background**: Dark with subtle grid lines and colored particle dots (arcade aesthetic)
- **Border**: Neon magenta/pink frame with cyan outer edge
- **Backlight effect**: The bright glow zone around the logo lets LED light through the opal acrylic, creating a halo effect. Dark areas block the light, providing contrast

The vinyl decal is applied on the *inside* of the opal acrylic (protected from scratches, backlit evenly by LED).

**Assembly**: Mount LED strip on foamboard in zigzag pattern. Glue 2cm foamboard spacer strips around the perimeter. Sandwich acrylic (front) onto spacers. Place the assembly on the soffit panel. Connect to 24V supply.

**Total lightbox cost: ~€20-35** (no aluminum U-channel needed)

### Panel G: Soffit Panel (×1)

| Dimension | Value |
|-----------|-------|
| Width | 55 cm |
| Depth | 28.0 cm |
| Weight | ~0.9 kg |

Horizontal panel at Y=77.1cm (top of front panel / bottom of logo panel). Closes the gap between the vertical logo panel (front) and the top of the tilted front panel (rear). Functions:
- Supports the lightbox assembly (acrylic + foamboard rest on top)
- Blocks LED light from shining downward into the cabinet / player's face
- Adds structural connection between logo panel and front panel

### Panel H: Monitor Shelf (×1)

| Dimension | Value |
|-----------|-------|
| Width | 55 cm |
| Depth | 30 cm |
| Height (mounted at) | 38 cm |
| Weight | ~1.0 kg |

Structural shelf — supports the monitor on its stand (~5 kg). Must be sturdy.

### Panel M: Mouse Shelf (×1)

| Dimension | Value |
|-----------|-------|
| Total width | 108 cm (25 + 58 + 25) |
| Depth | 25 cm |
| Weight | ~1.6 kg |

Single wide panel that slides through slots in both side panels. The center section passes through the cabinet, the 25cm overhangs on each side provide mouse areas. Three slot height options: 8, 12, or 16cm above table. Mouse pads placed on each overhang.

### Cut List Summary

| ID | Panel | Qty | Dimensions | Weight | Material |
|----|-------|-----|-----------|--------|----------|
| A | Side panel | 2 | Complex 6-point shape | 2×2.2 = 4.4 kg | Poplar ply 15mm |
| D | Front panel | 1 | 55 × 82 cm (window cutout) | 2.3 kg | Poplar ply 15mm |
| E | Roof panel | 1 | 55 × 52.2 cm | 1.7 kg | Poplar ply 15mm |
| F | Logo panel (lightbox) | 1 | 55 × 17.9 cm | 0.6 kg | Acrylic + foamboard + LED |
| G | Soffit panel | 1 | 55 × 28.0 cm | 0.9 kg | Poplar ply 15mm |
| H | Monitor shelf | 1 | 55 × 30 cm | 1.0 kg | Poplar ply 15mm |
| M | Mouse shelf | 1 | 108 × 25 cm | 1.6 kg | Poplar ply 15mm |
| | **Total cabinet** | **8 panels** | | **~12 kg** | |

No base panel — the structure is stable enough with the roof panel, soffit, monitor shelf, front panel, logo panel, and mouse shelf providing 6 connection points between the side panels.

---

## 5. Assembly Order

1. **Glue + screw** side panels (A) to roof panel (E) — establishes the cabinet profile
2. **Install** monitor shelf (H) at 38cm height — sturdy, load-bearing
3. **Attach** front panel (D) to the inner face of side panels at the tilted angle
4. **Install** soffit panel (G) horizontally at Y=77.1cm — connects front panel top to logo panel area
5. **Place** logo panel lightbox (F) on top of the soffit — the acrylic/foamboard sandwich rests on the soffit surface
6. **Insert** mouse shelf (M) through the slots in side panels at chosen height (8/12/16cm)
7. **Finish**: Sand, prime, paint Naia Blue (#1A5F7A), apply vinyl on side panels
8. **Connect** lightbox LED strip to 24V power supply
9. **Place** monitor on shelf (on its stand), adjust stand height + tilt to align with window
10. **Route** cables: HDMI + power through the body, out the open back

No back panel — the open back provides easy access at all times.

---

## 6. Transport Crate

All panels pack flat in a custom crate for transport. The crate is optimized for minimal volume.

| Property | Value |
|----------|-------|
| Crate interior | 108 × 54.4 × 9.3 cm |
| Crate exterior | 111 × 57.4 × 12.3 cm |
| Crate material | Pine plywood 9mm (4.5 kg/m²) |
| Packing | 5 layers, protective textile (3mm felt) between each |

### Layer Packing

| Layer | Contents | Panel thickness |
|-------|----------|----------------|
| 1 | Side panel L (95×50) | 1.5 cm |
| 2 | Side panel R (95×50) | 1.5 cm |
| 3 | Front panel (82×55) + Logo panel (17.9×55) | 1.5 cm |
| 4 | Roof panel (52.2×55) + Soffit panel (28×55) | 1.5 cm |
| 5 | Monitor shelf (55×30) + Mouse shelf (108×25) | 1.5 cm |

### Weight Breakdown

| Item | Weight |
|------|--------|
| Cabinet panels | ~12 kg |
| Crate (pine plywood 9mm) | ~7 kg |
| Textile padding | ~0.5 kg |
| **Total transport weight** | **~20 kg** |

See [`cabinet-panels.html`](cabinet-panels.html) for detailed crate packing diagrams (top view per layer + side view of stack).

---

## 7. Hardware Shopping List

### Cabinet Build

| Item | Cost | Notes |
|------|------|-------|
| Poplar plywood 15mm sheet (122×244 cm) | ~€30-40 | One sheet is enough |
| Carpenter labor (cut + assemble) | ~€150-250 | Side panels most complex |
| Paint (Naia Blue spray) | ~€15-20 | 2 cans |
| Lightbox components (see §4 above) | ~€20-35 | Acrylic + LED + foamboard + vinyl (no U-channel) |
| Vinyl side panels (printed) | ~€30-50 | Optional branding |
| Mouse pads (×2) | ~€15 | For left + right overhangs |
| **Total cabinet build** | **~€265-415** | |

### Electronics & Cables

| Item | Cost | Notes |
|------|------|-------|
| HDMI cable **5 meters** | ~€15 | Long run from cabinet to scoreboard TV |
| HDMI adapter (USB-C → HDMI) | ~€10 | If needed for mini-PC/laptop |
| USB hub (4-port) | ~€10 | Mouse + peripherals |
| Wired USB mouse (×2) | ~€20 | One spare |
| Power strip (4-outlet, short cable) | ~€10 | Inside cabinet |
| **Total electronics** | **~€65** | |

### Transport

| Item | Cost | Notes |
|------|------|-------|
| Pine plywood 9mm for crate | ~€15 | Cut to crate dimensions |
| Protective felt/textile | ~€10 | Between panels |
| Crate hinges + clasps | ~€15 | For reusable crate |
| **Total transport** | **~€40** | |

### What You Already Have
- Acer monitor (from photos)
- Wired mouse
- Laptop or mini-PC (for running the game)

### What You Might Add
- Mini-PC (Intel NUC or similar): ~€200-400 (if not using a laptop)
- Scoreboard TV (40-55"): ~€300 (or rent from venue)
- TV stand: ~€50-100

---

## 8. Monitor Placement

The monitor **stays on its stand** — no VESA mount, no brackets. It sits on shelf H inside the cabinet.

### Setup Steps

1. Place the monitor (on its stand) on shelf H
2. Center it so the screen aligns with the window cutout in front panel D
3. Adjust the stand height to ~10 cm (screen bottom at window bottom edge)
4. Tilt the screen back ~20° using the stand's tilt mechanism
5. Plug in HDMI + power cables, route through cabinet interior, out the open back

---

## 9. Branding & Finish

### Color Scheme
- **Cabinet body**: Naia Blue (#1A5F7A) — spray painted or vinyl wrapped
- **Logo panel**: Illuminated lightbox with Naia logo in retro arcade style (blue/purple gradient logo with radial glow on dark background, neon pink border, backlit with LED through opal acrylic)
- **Side panels**: Printed vinyl with Naia branding / hydro imagery
- **Mouse shelves**: Black or dark gray accent

---

## 10. Scoreboard TV

The scoreboard TV (40-55") is separate from the arcade cabinet.

| Option | Notes |
|--------|-------|
| TV on a stand behind/beside the cabinet | Simple, portable |
| Wall-mounted (if venue allows) | Visible from distance |

Connected to the same mini-PC via **5m HDMI cable** (or second HDMI output), showing `localhost:3000/classement` in Chrome fullscreen.
