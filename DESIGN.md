# Design System: Portfolio Agent — AI Cockpit Terminal

## 1. Visual Theme & Atmosphere
A high-density, military-grade AI interface. The atmosphere reads like a classified intelligence terminal — dark void backgrounds, surgical grid overlays, and a single electric accent cutting through the noise. Variance: 7. Motion: 6. Density: 8.

Think: Bloomberg terminal fused with a spacecraft operations panel. Every element earns its place. No decoration for its own sake.

## 2. Color Palette & Roles
- **Deep Void** (#09090B) — Primary page background. Near-black, not pure.
- **Terminal Surface** (#0F0F14) — Widget/card primary surface
- **Raised Layer** (#16161E) — Elevated containers, input backgrounds
- **Steel Partition** (#1E1E28) — Borders, dividers, grid lines
- **Ghost Steel** (#3F3F50) — Muted borders, secondary structural lines
- **Dim Text** (#52525B) — Metadata, timestamps, labels
- **Mid Text** (#A1A1AA) — Secondary body text
- **Signal White** (#F4F4F5) — Primary text, headlines
- **Cyber Cyan** (#00D9FF) — SINGLE accent. CTAs, active states, focus rings, highlights. MAX saturation 80%.
- **System Green** (#10B981) — Online status, success states only
- **Caution Amber** (#F59E0B) — Warning states only

## 3. Typography Rules
- **All UI:** Geist Mono — the entire interface uses monospace. This IS the aesthetic.
- **Scale:** 10px labels → 12px body → 14px chat text → 16px UI text → 24px section headers
- **Tracking:** +0.05em on labels. Tight on headers.
- **Banned:** Inter, sans-serif for this project. No serifs. No system fonts.

## 4. Component Stylings
- **Buttons:** Dark surface fill, 1px cyan border, no outer glow. `box-shadow: inset 0 0 0 1px #00D9FF` on hover. Active: -1px translate Y, slight opacity drop.
- **Chat Widget:** `border: 1px solid #1E1E28`. Backdrop-blur on open. Scanline pseudo-element overlay at 2% opacity.
- **Messages (User):** Right-aligned. `background: rgba(0,217,255,0.08)`. `border: 1px solid rgba(0,217,255,0.2)`. Monospace.
- **Messages (Assistant):** Left-aligned. `background: #16161E`. `border: 1px solid #1E1E28`. Mono.
- **Input:** `background: #16161E`. `border: 1px solid #3F3F50`. Focus: cyan 1px border + subtle inner glow.
- **Typing indicator:** Blinking cursor `_` in cyan, not bubble dots.

## 5. Layout Principles
- Chat widget: fixed bottom-right. 400px wide, 560px tall.
- Grid overlay on page background: 40px cells, `rgba(255,255,255,0.02)` lines.
- No card shadows — depth through background color steps only.
- All text left-aligned. No centered body content.

## 6. Motion & Interaction
- Widget open: slide up + fade. `transform: translateY(8px) → 0`. 200ms ease-out.
- Messages: fade in from bottom, 120ms, staggered +40ms per message.
- Typing cursor: blink at 1s interval, `opacity: 1 → 0`, step function.
- Send button: subtle scale 0.97 on active.
- Floating button: cyan pulse ring at 3s interval (perpetual micro-loop).

## 7. Anti-Patterns (Banned)
- No purple or neon gradients
- No pure black (#000000) — use Deep Void (#09090B)
- No white backgrounds
- No rounded pill buttons (use 6px max radius for this aesthetic)
- No bubble chat dots (use cursor blink instead)
- No Inter font
- No emojis anywhere
- No shadow box-glows
- No centered hero layout
- No AI copywriting: "Elevate", "Seamless", "Next-Gen"
