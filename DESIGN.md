---
name: GINKTIK.OS — Desir Lloyd Barry Johanson Portfolio
description: Cyber-technologist portfolio featuring HUD biometric telemetry, phosphor-accented dark surfaces, and dense technical precision
colors:
  primary: "#B7FF5A"
  secondary: "#FFB454"
  tertiary: "#7DE8FF"
  neutral-bg: "#080B0A"
  surface-dark: "#101613"
  surface-subtle: "#141D19"
  surface-elevated: "#18241E"
  surface-hover: "#1D2C24"
  text-primary: "#F0F4EF"
  text-secondary: "rgba(240, 244, 239, 0.72)"
  text-muted: "rgba(240, 244, 239, 0.58)"
typography:
  display:
    fontFamily: "'Syne', 'Space Grotesk', sans-serif"
    fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Space Grotesk', -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Space Grotesk', -apple-system, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Sora', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "-0.012em"
  label:
    fontFamily: "'JetBrains Mono', 'Space Mono', monospace"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  frame: "18px"
spacing:
  xs: "0.4rem"
  sm: "0.8rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1.8rem"
  button-secondary:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1.8rem"
  button-tertiary:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1.8rem"
  card-project:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "1.6rem"
  chip-tag:
    backgroundColor: "rgba(183, 255, 90, 0.06)"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.28rem 0.65rem"
---

# Design System: GINKTIK.OS

## Overview

**Creative North Star: "The Cybernetic Diagnostic Console"**

GINKTIK.OS is a high-density, technical portfolio interface conceived as an operational diagnostic workstation. The visual world balances terminal precision with purposeful cybernetic telemetry: HUD reticles, scanning beams, optical calibration overlays, and floating network topologies. Instead of decorative sci-fi pastiche, every visual cue suggests calibrated hardware telemetry, telemetry coordinates, and verified system states.

The tone is rigorous, confident, and unapologetically dark-mode native. Surfaces are composed of deep Obsidian and carbon tiers, elevated by surgical phosphor green (`#B7FF5A`) and warm warning amber (`#FFB454`) accents. Contrast is uncompromisingly sharp to provide immediate readability across multi-viewport devices.

**Key Characteristics:**
- Deep Obsidian terminal background (`#080B0A`) with subtle 44px coordinate grid texture.
- Phosphor green primary accent (`#B7FF5A`) delivering AAA contrast ratio (>15:1) against dark surfaces.
- Tri-font typographic system: Syne for impactful branding, Space Grotesk for technical headings, Sora for editorial bio body, and JetBrains Mono for telemetry metrics and controls.
- Full motion respect: hardware-accelerated animations gracefully settle into static composed layouts under `prefers-reduced-motion: reduce`.
- Resilient multi-language support (French, English, Haitian Creole) with persistent client-side state.

## Colors

The palette draws from CRT phosphors, dark-room diagnostic monitors, and aerospace telemetry equipment.

### Primary
- **Phosphor Green** (`#B7FF5A`): Primary active interactive state, brand emphasis, call-to-action buttons, verified status dots, and scanner beams. Represents system readiness.

### Secondary
- **Amber Warning** (`#FFB454`): Secondary accent used for pending calibration states, system warnings, AI taxonomy tags, and highlight accents.

### Tertiary
- **Cyan Signal** (`#7DE8FF`): Diagnostic telemetry and infrastructure badge borders.

### Neutral
- **Obsidian Base** (`#080B0A`): Canvas background color, terminal viewport base, and high-contrast button text.
- **Surface Dark** (`#101613`): Primary card containers, modals, and navigation background.
- **Surface Subtle** (`#141D19`): Elevated hover states and input background tiers.
- **Surface Elevated** (`#18241E`): Active state highlights and dialog panels.
- **Text Primary** (`#F0F4EF`): High-legibility crisp off-white for headings and primary content.
- **Text Secondary** (`rgba(240, 244, 239, 0.72)`): Body prose and metadata with 8:1 contrast.
- **Text Muted** (`rgba(240, 244, 239, 0.58)`): Captions, HUD telemetry labels, and subtle metadata with 5.8:1 contrast.

### Named Rules
**The Rarity of Phosphor Rule.** Phosphor green (`#B7FF5A`) covers less than 8% of the surface area at any time. Its power stems from selective contrast against deep obsidian.
**The Ghost Token Prohibition.** Never use raw hex codes directly in component rules; all color references resolve to CSS custom properties declared on `:root`.

## Typography

**Display Font:** Syne (fallback: 'Space Grotesk', sans-serif)  
**Heading Font:** Space Grotesk (fallback: -apple-system, BlinkMacSystemFont, sans-serif)  
**Body Font:** Sora (fallback: -apple-system, BlinkMacSystemFont, sans-serif)  
**Label/Mono Font:** JetBrains Mono (fallback: 'Space Mono', monospace)

**Character:** The pairing merges the expressive structural cuts of Space Grotesk with the human warmth of Sora and the algorithmic precision of JetBrains Mono.

### Hierarchy
- **Display** (800 weight, `clamp(2.4rem, 5.5vw, 4.5rem)`, line-height 1.05, tracking -0.035em): Used for the Hero personal name and signature branding.
- **Headline** (700 weight, `clamp(2rem, 3.8vw, 3rem)`, line-height 1.2, tracking -0.025em): Used for major section titles accompanied by typewriter lines.
- **Title** (700 weight, `1.3rem`, line-height 1.35, tracking -0.015em): Used for project titles, modal headings, and card headers.
- **Body** (400 weight, `1.02rem`, line-height 1.75, tracking -0.012em): Used for bio paragraphs and descriptions. Max measure constrained to 65ch (`max-width: 640px`).
- **Label** (600 weight, `0.78rem` to `0.85rem`, line-height 1.4, tracking 0.04em, uppercase): Used for HUD telemetry, navigation links, buttons, and skill tags.

### Named Rules
**The 65-Character Ceiling.** Body prose never spans wider than 640px (approximately 65 characters in Sora) to preserve effortless reading scanning.
**The Mono Affirmation.** JetBrains Mono is strictly reserved for data, coordinates, status markers, tags, and navigation anchors—never for narrative body copy.

## Layout

The spatial model uses a centralized fluid container with a maximum width of 1200px and responsive horizontal padding (`1.5rem` on mobile, `2rem` on desktop). Vertical section spacing follows a rhythmic cadence of `6rem` to `7rem`.

On mobile viewports (under 768px), side-by-side splits collapse into single-column vertical stacks. Viewport safe area insets (`env(safe-area-inset-*)`) are respected across top bars and bottom footers to prevent notch and home indicator clipping. Container containment (`contain: layout paint` and `contain: strict`) is applied to intensive animated surfaces.

## Elevation & Depth

The system uses tonal layering combined with crisp phosphor rim lighting rather than heavy generic drop shadows. Surfaces elevate by stepping up in luminance from `#080B0A` to `#101613` and `#141D19`, bounded by 1px glass borders.

### Shadow Vocabulary
- **Card Rest** (`0 12px 30px rgba(0, 0, 0, 0.5)`): Subtle grounded separation for project and content cards.
- **Card Hover** (`0 20px 45px rgba(0, 0, 0, 0.8), 0 0 24px rgba(183, 255, 90, 0.2)`): Elevated interaction state featuring ambient phosphor green back-glow.
- **Active Phosphor Glow** (`0 0 20px rgba(183, 255, 90, 0.35)`): Applied to primary buttons and active HUD reticles.
- **Modal Depth** (`0 24px 70px rgba(0, 0, 0, 0.9), 0 0 30px rgba(183, 255, 90, 0.15)`): Deep scrim elevation for dialog modals.

### Named Rules
**The Luminous Border Doctrine.** Depth is defined primarily by 1px subtle borders (`rgba(183, 255, 90, 0.14)`) and background value steps, never by diffuse opaque drop shadows.

## Shapes

- **Corners:** 6px radius (`--rounded-md`) for buttons and interactive controls; 8px (`--rounded-lg`) for stat containers and icon wrappers; 12px (`--rounded-xl`) for content cards and modals; 18px (`--rounded-frame`) for HUD photo viewports.
- **HUD Reticles:** 14px L-shaped corner brackets in phosphor green (`2px solid var(--accent-green)`) offset by -6px to -7px outside framed viewports.
- **Dividers:** 1px hairline gradients fading smoothly into transparent boundaries (`linear-gradient(90deg, rgba(183, 255, 90, 0.35), transparent)`).

## Components

### Buttons
- **Shape:** 6px border radius (`border-radius: 6px`).
- **Primary:** Background in Phosphor Green (`#B7FF5A`), text in Obsidian (`#080B0A`), font JetBrains Mono 600 uppercase with 0.04em tracking. Padding `0.8rem 1.8rem`. On hover, lifts -2px with intense 35px glow.
- **Secondary:** Surface Dark background (`#101613`), 1px Phosphor border (`rgba(183, 255, 90, 0.45)`), Phosphor Green text. On hover, background shifts to 10% phosphor green.
- **Tertiary:** Surface Dark background, subtle glass border, text in secondary off-white. On hover, shifts to Amber accent.

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** Surface Dark (`#101613`) with 1px glass border (`rgba(183, 255, 90, 0.14)`).
- **Behavior:** 3D perspective tilt on desktop pointer hover, automatically flattened to static composite cards under `prefers-reduced-motion` or touch interfaces.

### Inputs / Fields
- **Style:** Obsidian black background (`#080B0A`), 1px phosphor-tinted border (`rgba(183, 255, 90, 0.14)`), 6px radius, JetBrains Mono font.
- **Focus:** Sharp phosphor border shift (`#B7FF5A`) accompanied by 16px soft glow and `#0b100d` background.
- **Mobile Guard:** Minimum 16px font-size on mobile viewports to prevent iOS Safari viewport auto-zoom.

### Navigation
- **Header:** Fixed blur bar (`backdrop-filter: blur(16px)`), Obsidian 88% alpha, safe-area inset top padding.
- **Desktop Links:** JetBrains Mono 500, uppercase letter-spacing, animated phosphor bottom bar on hover and active state.
- **Mobile Drawer:** Fullscreen slide-in panel with 20px blur, locked body scroll on activation, and Escape key dismissal.
- **Language Switcher:** Accessible WAI-ARIA menu with keyboard ArrowDown/ArrowUp navigation and Escape handling.

### Signature Component: Biometric & Holographic HUD Photo
- Framed within 18px rounded viewports guarded by L-shaped HUD brackets, top telemetry status (`SYS.BIO // SCAN: 01`, `STATUS: VERIFIED`), and coordinates.
- Features continuous smooth vertical beam scanning and progressive optical stabilization, settling into crisp static displays under motion reduction.

## Do's and Don'ts

### Do:
- **Do** wrap every interactive button and link with explicit 44x44px minimum touch target dimensions on touch and coarse-pointer devices.
- **Do** test all copy against all three supported languages (French, English, Haitian Creole) to ensure flex and grid containers accommodate text expansion without layout breaking.
- **Do** preserve the settled static state for all animations when `prefers-reduced-motion: reduce` is active.
- **Do** route all new colors through CSS variables defined on `:root`.

### Don't:
- **Don't** use pure saturated blues or purples; the system palette is anchored strictly in Phosphor Green (`#B7FF5A`), Amber Warning (`#FFB454`), and Cyan Signal (`#7DE8FF`).
- **Don't** set `white-space: nowrap` on responsive section headings or card titles; use `text-wrap: balance` and `overflow-wrap: break-word`.
- **Don't** use heavy drop shadows on flat surfaces; elevation is conveyed through luminance tiering and 1px border definition.
- **Don't** allow form input font sizes below 16px on mobile viewports to avoid triggering iOS Safari auto-zooming.
