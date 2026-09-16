# Coco AI — Product Requirements & Progress

## Original problem statement
User cloned `https://github.com/alifnewone7-create/c-run.git` (Coco AI trading-signals app: Next.js 16 App Router frontend + FastAPI backend + Firebase auth) and requested a series of frontend UI refinements. Language of the user: **Bengali** (always reply in Bengali).

Design system: "cosmic purple" — background `#0b0618`, iris `#6d3bff` / `#8b5cff` / `#b48cff`, soft violet borders, glass-morphism, display font `--font-display`, mono `--font-tech`. No white borders / pure white blocks / generic AI-slop.

## Architecture
- `frontend/` Next.js 16 (production `next start` via supervisor → **must `yarn build` + `sudo supervisorctl restart frontend` after code changes**).
- `frontend/components/coco/` theme shell, navbar, bottom nav, loading.
- `frontend/components/signal-kit.tsx` shared signal-tool pieces (BrokerBar, SegTabs, SearchBox, **MarketSections**, results).
- `frontend/lib/markets.ts` pairs + `category` (major/minor/exotic), `groupMarkets()`, `flagUrl()` (EU flag self-hosted at `/public/flags/eu.svg`).
- CSS: `app/coco.css` (shell/nav/sheets), `app/injector.css` (inj-*), `app/signals.css` (sig-*, fs-*, mk-*), `app/admin.css`.
- Backend FastAPI `/api/signals/*`; Mongo via MONGO_URL.

## Implemented (chronological)
- 2026-09 (earlier sessions): localStorage base64 asset cache; flat `#0b0618` loader; candles only on `/` and `/dashboard`; borderless admin panel; desktop top-nav consolidation with single "Analyze" button; lucide icon refresh; OTC/Real analyzer removed from mobile More menu.
- 2026-09-16 (this session):
  - Mobile bottom-nav sheets (Analyzer + More) now blur the page (`.coco-sheet-backdrop`, blur 16px).
  - "More" sheet redesigned: profile card (avatar, name, email, plan pill), 3 quick tiles, structured Log out button.
  - Market pickers grouped into **Major / Minor / Exotic** sections with sticky section headers (`MarketSections`), three distinct card styles: Live = list rows with live pulse, Injector = pill chips with accent rail, Future = multi-select tickets with check.
  - Future Signals: new setup panel (Selected markets + How many signals) and an action dock holding Generate (fixed above bottom nav on mobile, inline bar on desktop) — fixes the mobile button issue.
  - Fixed production CSS bug: lightningcss drops unprefixed `backdrop-filter` when `-webkit-backdrop-filter` follows it → all CSS now lists the `-webkit-` prefix first. (Keep this order for any new backdrop-filter rules!)
  - Fixed flagcdn CORS console noise (eu.svg served without ACAO) by self-hosting `/flags/eu.svg`; `<img crossOrigin="anonymous">` on flags.
  - Tested: testing agent iteration_9 (frontend) ~95% → remaining blur issue fixed & self-verified.

## Backlog
- P1: none pending from user.
- P2: Consider self-hosting all flag SVGs to remove the external CDN dependency entirely.
- P2: Presets + stepper on desktop Future setup wrap vertically in the narrower column (acceptable, could be a single row).

## Test credentials
See `/app/memory/test_credentials.md`.
