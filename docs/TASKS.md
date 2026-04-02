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
- [x] Confirm: Google Maps API key — **needs provisioning** (Phase 5 blocked)
- [x] Confirm: wedding cake `.glb` model — **place at `/public/models/wedding-cake.glb`**
- [x] Confirm: real coordinates — ceremony: `-43.48750040243022, 172.724813561856` / reception: `-43.4884779500395, 172.72101031898032`
- [ ] Confirm: venue names, address strings, date, and time — **still needed**
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
- [x] Render heading with guest's first name in subtitle
- [x] Scroll prompt at bottom (animated bounce chevron)
- [x] Hero overlaid on cake canvas (absolute position, z-index 10)
- [x] Text shadows for readability over 3D background
- [ ] Verify mobile layout

---

## Phase 3 — RSVP form ✅

- [x] Attending radio ("Nah, yeah" / "Yeah, nah") — `RadioCard` component
- [x] Pom-specific inline translation labels (bold, right-aligned) and note (italic)
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

## Phase 4 — Three.js cake animation ✅

- [x] Set up `@react-three/fiber`, `@react-three/drei`, `gsap`
- [x] `CakeCanvas` client component — transparent background, dynamic import (SSR disabled)
- [x] Load `.glb` model with `useGLTF` and `<Center>` for auto-centering
- [x] Warm ambient + directional lighting
- [x] GSAP ScrollTrigger — scrub timeline drives `animRef` (rotZ + posY)
- [x] Cake tips left (Z rotation) then drops off bottom
- [x] Left-edge pivot — `Box3` offset so cake rotates around its left edge
- [x] CSS `cake-shake` screen shake on container at smash point
- [x] Fragment explosion on smash — `InstancedMesh` with gravity physics
- [x] Scroll reversal — cake restores on scroll up (smash state driven by GSAP ticker)
- [x] Section height 250vh — tight scroll, tipping starts early
- [ ] Verify canvas resizes correctly on mobile / viewport change
- [ ] Tune camera / fov once real `.glb` is in place

---

## Phase 5 — Google Maps ceremony & reception

- [ ] **[BLOCKED — needs Google Maps API key]**
- [ ] Load Google Maps JS API
- [ ] Greyscale non-interactive map with ceremony "X" marker
- [ ] GSAP ScrollTrigger: trigger reception route reveal on scroll
- [ ] Animate polyline from ceremony to reception
- [ ] Drop reception "X" marker on polyline completion
- [ ] Display ceremony and reception details (venue names, date, time — TBD)

---

## Phase 6 — Polish and ship

- [ ] Full mobile pass: all sections, all states, all guest types
- [ ] Verify token is never stored in localStorage or sessionStorage
- [ ] Verify service role key does not appear in client bundle
- [ ] Review all `// TODO:` comments — fill in real values once available
- [ ] Cross-browser: Chrome, Safari, Firefox (mobile and desktop)
- [ ] Confirm all docs are current
- [ ] Distribute magic links to guests

---

## Backlog

- Admin view for hosts to see RSVP responses (currently: direct Supabase access)
- Sending magic links (currently: manual distribution)
