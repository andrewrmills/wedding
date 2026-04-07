# Tasks — Wedding RSVP

This is the living task list. Keep it current as work progresses.

**Status legend:**
- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[-]` Skipped or will not do

---

## Phase 0 — Pre-build decisions

- [x] Resolve: keep emojis in RSVP success copy — **keep them**
- [x] Resolve: confirm GSAP-only animation approach — **confirmed, no Framer Motion**
- [x] Resolve: hero section alignment — **centred override**
- [x] Confirm: Supabase project — **created and connected**
- [x] Confirm: Google Maps API key — **provisioned, in `.env.local`**
- [-] Confirm: wedding cake `.glb` model — **Three.js removed; not needed**
- [x] Confirm: real coordinates — ceremony: `-43.48750040243022, 172.724813561856` / reception: `-43.4884779500395, 172.72101031898032`
- [x] Confirm: venue names, address strings, date, and time — **The Beach / Our House / 13th Feb 2027 / 2pm**
- [x] Confirm: design direction — **bold and memorable, do not play it safe**

---

## Phase 1 — Scaffolding ✅

- [x] Verify next-supabase template builds and runs cleanly
- [x] Configure environment variables (`.env.local`)
- [x] Create `invitees` table in Supabase — `supabase/schema.sql` run in Supabase SQL editor
- [x] Enable RLS; create SELECT and UPDATE policies
- [x] Build loading state (skeleton) — `app/rsvp/loading.tsx`
- [x] Build error state for invalid / missing token — `app/rsvp/_components/ErrorState.tsx`
- [x] Set up theme tokens — `theme/colors.ts`, Tailwind CSS v4 `@theme` block
- [x] Set up `constants/strings.ts` for all copy
- [x] Confirm token lookup works end-to-end — verified in browser

---

## Phase 2 — Hero section ✅

- [x] Personalised welcome message from `type` field (Aus / Pom / Kiwi)
- [x] Handle `welcome_message` override when non-null
- [x] Scroll prompt at bottom (animated bounce chevron)
- [x] Photo collage background — randomised subset of `/public/img/`, Aus-only images gated by guest type
- [-] Hero overlaid on cake canvas — **Three.js removed; replaced with photo collage**
- [-] Text shadows for readability over 3D background — **removed with Three.js**
- [ ] Verify mobile layout

---

## Phase 3 — RSVP form ✅

- [x] Attending radio ("Nah, yeah" / "Yeah, nah") — `RadioCard` component
- [x] Pom-specific inline translation labels (Yes / No, bold right-aligned)
- [x] Conditional dietary requirements textarea (shown when attending)
- [x] Conditional beer vote radio with 5 options + "Other" text reveal
- [x] Form validation: attending required; beer is optional
- [x] Server Action: `submitRsvp` with service role client
- [x] Success state with attending vs not-attending messages
- [x] "Change my answer" link re-shows pre-populated form
- [x] Pre-populate form on load from existing Supabase record
- [x] End-to-end test: submit, check Supabase, return and update — verified
- [ ] Verify mobile layout

---

## Phase 4 — Three.js cake animation

- [-] All Phase 4 tasks — **Three.js removed from project; replaced with photo collage hero**

---

## Phase 5 — Google Maps ceremony & reception ✅

- [x] Google Maps API key provisioned
- [x] Load Google Maps JS API dynamically
- [x] Light green non-interactive map with ceremony "X" marker
- [x] Animate polyline from ceremony to reception (looping GSAP tween, not ScrollTrigger)
- [x] Drop reception "X" marker on polyline completion
- [x] Display ceremony and reception details (venue names, date, time, addresses)

---

## Phase 6 — Polish and ship

- [ ] Full mobile pass: all sections, all states, all guest types
- [x] Verify token is never stored in localStorage or sessionStorage
- [x] Verify service role key does not appear in client bundle
- [ ] Review all `// TODO:` comments — fill in real values once available
- [ ] Cross-browser: Chrome, Safari, Firefox (mobile and desktop)
- [ ] Confirm all docs are current
- [ ] Distribute magic links to guests

---

## Backlog

- Admin view for hosts to see RSVP responses (currently: direct Supabase access)
- Sending magic links (currently: manual distribution)
