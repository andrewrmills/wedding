# Session Log

Brief notes from each working session. Keep entries short — a few bullet points is enough.

---

## Format

### YYYY-MM-DD

**Worked on:** _[Feature or task name]_

**Completed:**
- _[Thing 1 finished]_

**Blockers / open questions:**
- _[Anything unresolved]_

**Next session:**
- _[The single most important thing to pick up next]_

---

## Log

### 2026-04-03

**Worked on:** Phase 4 cake animation refinements, GitHub setup

**Completed:**
- Fixed scroll-up reversal: lifted `smashed` state to `CakeSection`, driven by GSAP ticker instead of R3F `useFrame` (React 18 batching was deferring state updates unreliably)
- Left-edge pivot: two-group structure in `CakeModel` — `Box3` measures bounding box after load, offsets content so left edge aligns with pivot origin
- Reduced section height from 400vh → 250vh; tipping now starts almost immediately
- Replaced scroll-percentage smash trigger with position-based trigger (`posY < -3.5`)
- Fragment explosion: `InstancedMesh` with gravity physics, 3 colour groups (cream/clay/chocolate)
- Connected GitHub remote (`andrewrmills/wedding`), pushed to `master`
- Updated README to reflect actual project

**Blockers / open questions:**
- Scroll-reversal and left-edge pivot need browser verification
- Google Maps API key still not provisioned — Phase 5 blocked
- Real `.glb` model not yet placed — camera/fov tuning deferred

**Next session:**
- Verify cake animation in browser, tweak if needed
- Begin Phase 5 once Google Maps API key is available

---

### 2026-04-02

**Worked on:** Project setup, documentation rewrite, Phase 0 decisions, Phase 1 scaffolding

**Completed:**
- Reviewed `prompt/prompt.md` in full
- Rewrote all `docs/` files for the Wedding RSVP project (were for wrong project)
- Updated `CLAUDE.md` Overview, Goal, and Stack sections
- Resolved all Phase 0 decisions (emojis kept, GSAP-only, hero centred, design direction confirmed)
- Installed `server-only` and `@types/google.maps`
- Renamed project to `wedding-rsvp` in `package.json`
- Replaced cookie-auth middleware with passthrough (Supabase Auth not used)
- Created `lib/supabase/service.ts` — service role client (server-only guarded)
- Created `lib/types/invitee.ts` — typed Invitee interface
- Created `theme/` — colors, typography, spacing tokens (near-black, cream, terracotta clay, Playfair Display + Outfit)
- Created `constants/strings.ts` — all copy centralised
- Created `app/rsvp/page.tsx` — Server Component, token lookup
- Created `app/rsvp/loading.tsx` — skeleton loading state
- Created `app/rsvp/_components/ErrorState.tsx`
- Created `app/rsvp/_components/RsvpPageContent.tsx` — placeholder
- Created `supabase/schema.sql` — table, RLS policies, seed rows
- Fixed two pre-existing strict TypeScript errors in template files
- Build passes clean: `npm run build`

**Blockers / open questions:**
- Supabase project not yet created — 4 tasks in Phase 1 blocked on this
- Google Maps API key not yet provisioned — Phase 5 blocked
- Real venue names, addresses, date/time still TBD

**Next session:**
- Create Supabase project, fill in `.env.local`, run `supabase/schema.sql`, verify token lookup end-to-end
- Then begin Phase 2: Hero section
