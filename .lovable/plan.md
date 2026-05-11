# Aung Zeya Guest House — Single-Page Site Plan

## Deliverable
A single self-contained `index.html` file (HTML + embedded CSS + vanilla JS) saved to `/mnt/documents/index.html` and offered for download. No React, no build step — this is a static artifact, not a feature added to the TanStack project.

## Why a standalone file (not a project route)
Your spec says "Deliver a self-contained index.html with embedded style and JavaScript." That's a downloadable artifact, so I'll generate it directly rather than adding it to the app's route tree.

## Page structure (mobile-first, max-width 1280px on desktop)

1. **Header / identity card**
   - English + Burmese name, 4.0 star row (filled + half-star icons), "(117 reviews)", "Guest house" badge.

2. **Action bar (tabs + quick actions)**
   - Overview · Reviews · Directions — scroll-to-section + active state.
   - Save · Nearby · Send to phone · Share — icon buttons, each triggers the specified `alert(...)`.

3. **Main info block**
   - Address row → link to `https://www.google.com/maps/search/?api=1&query=R5MF%2BCMR+Yangon`.
   - Phone row → `tel:+959968913363`.
   - Static map placeholder: OpenStreetMap iframe centered on Yangon with a "Directions" link fallback.
   - Secondary links: Claim this business, Your Maps history, Add a label, Suggest an edit, Add missing information, Add website — each with the exact alert text from the spec.

4. **Updates from customers** — single card: "Breakfast @room clean · a year ago" with an icon.

5. **Photos & videos**
   - Category chips: All / Rooms / Videos / Exterior / Food & drink / From visitors (active state on click).
   - Horizontal scroll strip on mobile, CSS grid on tablet/desktop. Placeholders use Font Awesome icons (camera / video) over tinted backgrounds.
   - "Add photos & videos" button → alert.

6. **Review summary**
   - Large 4.0, star row, "117 reviews".
   - Distribution bars for 5→1 stars (70/20/5/3/2 %).
   - "Write a review" button → alert.

7. **Reviews list** — 3 cards exactly as specified (waiwai soe, min min, Zaw Min Oo) with avatars (initials), star rows, timestamps, body text, Like/Share buttons (alerts). min min card shows "+4 photos" chip and "28" like count; Zaw Min Oo shows "2" like count.
   - "More reviews (114)" link → alert.

8. **People also search for** — 3 cards (Aung Zay Ya, Motel Waizayantar, Kan Yar Zar Guest House) with rating, count, type.

9. **Web results** — small footer line placeholder.

## Design & technical details

- **Typography:** Google Fonts — Inter (Latin) + Padauk (Burmese) via CDN `<link>`.
- **Icons:** Font Awesome 6 free via CDN.
- **Layout:** mobile-first; breakpoints at 640px (tablet 2-col where appropriate) and 1024px (desktop, max-width 1280px centered).
- **Color system:** light neutral surface, Google-Maps-style blue accent (#1a73e8), star gold (#f9ab00), subtle card shadows, 12px radius.
- **Accessibility:** ≥44px touch targets, visible `:focus-visible` outlines, semantic landmarks (`<header>`, `<main>`, `<section>`, `<nav>`), `aria-label` on icon-only buttons, color contrast AA.
- **JS:** small inline script for (a) tab/section scroll + active state, (b) chip active state, (c) generic `alert()` wiring via `data-alert` attributes — no external JS deps.
- **Links:** real `tel:` and Google Maps URL; OSM iframe for the map.

## Output
- Write file to `/mnt/documents/index.html`.
- QA: open the file headless, screenshot mobile (390px) and desktop (1280px) widths, verify no overflow / clipped text / missing icons, then surface via `<lov-artifact>` so you can preview and download.
