# Project Stage

Track the current phase of the project and what has been completed.
Update this at the end of each phase or when something significant shifts.

---

## Current stage: Core build — Phase 5 blocked

**Started:** 2026-04-02
**Last updated:** 2026-04-03

---

## What has been done

- All docs rewritten for Wedding RSVP project
- Phase 0 — all pre-build decisions resolved
- Phase 1 — scaffolding complete: Supabase connected, schema deployed, token lookup verified end-to-end
- Phase 2 — hero section complete: personalised by guest type, scroll chevron, overlaid on cake canvas
- Phase 3 — RSVP form complete: attending/dietary/beer, Pom translations, server action, success state, pre-population
- Phase 4 — cake animation complete: Three.js via R3F, GSAP scrub, left-edge pivot, fragment explosion, scroll reversal

## In progress

- Cake animation tweaks being verified in browser (scroll reversal, left-edge pivot)

## Up next

- Phase 5: Google Maps — blocked on API key being provisioned
- Phase 6: Polish — mobile pass, security checks, cross-browser

## Blockers

- Google Maps API key not provisioned — Phase 5 cannot start
- Venue names, addresses, date and time still TBD — placeholders in `constants/strings.ts`
- Real `.glb` model must be placed at `public/models/wedding-cake.glb`

---

## Stage reference

| Stage | What it means |
|-------|---------------|
| Planning | Understanding the problem, defining requirements, setting up docs |
| Scaffolding | Setting up the codebase, dev tooling, environment, database |
| Core build | Implementing the primary features phase by phase |
| Debugging | Fixing issues found during development |
| Testing | Verifying the product meets its requirements |
| Polishing | UX improvements, performance, responsiveness |
| Shipped | Live on Vercel, magic links distributable |
