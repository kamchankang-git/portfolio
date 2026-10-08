# Portfolio site — working notes for Claude

Live at https://kamchankang-git.github.io/portfolio/ (GitHub Pages, `main` / root). Static HTML, no build step in this repo.

## Files
| File | Editable here? | Notes |
|---|---|---|
| `index.html` | Yes | Landing: hanging badge, per-company panels, Next panel, resume request modal |
| `work.html` | Yes | Projects list |
| `site.css` | Yes | Loaded **last** on every page, including the four case pages after unlock. Put site-wide style overrides here. |
| `site.js` | Yes | Runs **last** on every page, including unlocked case pages. Put site-wide behavior (nav labels, shared tweaks) here. |
| `work_case_*.html` | **No** | Encrypted with StatiCrypt. Editing them breaks decryption. Content changes are made by the owner offline and re-uploaded. |
| `assets/`, `logos/` | Yes | Images |

To change anything that appears on case pages (nav labels, button styles, fonts, colors), do it through `site.css` / `site.js`, not by editing the case files.

## Shared conventions
- Language: `body[data-lang="ko"|"en"]`; bilingual elements use `data-l="ko"` / `data-l="en"`. The chosen language is stored in `localStorage` key `lang` and carried across pages.
- Nav: brand (→ `index.html`), `Projects` (→ `work.html`), `Resume` button (`.rbtn`, opens the resume modal on the landing; other pages link to `index.html?cv=1`), language toggle (`.lang`).
- Korean and English copy are written separately for each language, never translated 1:1. Final Korean wording is the owner's call — propose, don't silently rewrite.
- Korean copy: no em dashes (—); use commas, colons or conjunctions. Avoid metaphors where a plain word works.
- Don't overclaim: research informed decisions, it didn't make them.
- Keep the design system: ink `#111214`, muted `#6E7076`, accent `#2443B8`; Instrument Sans + IBM Plex Sans KR / Noto Sans KR; buttons scale to `.97` on `:active`; respect `prefers-reduced-motion`.
- Check every change at 375px wide (mobile) as well as desktop. No horizontal scroll.
- Never add analytics, trackers, or third-party scripts without asking.
