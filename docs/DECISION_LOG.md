# Decision Log — Wedding RSVP

Record key technical and product decisions here so future contributors
(and future you) understand why things are the way they are.

---

## When to log a decision

- Choosing between two or more technical approaches
- Adopting or dropping a dependency, library, or tool
- Changing the data model or an API contract
- Deferring something intentionally (with a reason)
- Anything that prompted discussion before committing to an approach

---

## Format

### YYYY-MM-DD — Title of the decision

**Context:** Why this decision was needed. What problem were we solving?

**Decision:** What was decided and why.

**Alternatives considered:** What else was on the table and why it was not chosen.

**Consequences:** What this means going forward. Trade-offs accepted.

---

## Log

### 2026-04-03 — Smash state driven by GSAP ticker, not R3F useFrame

**Context:**
Scroll-up was not restoring the cake. `smashed` state was being toggled via `setSmashed` called inside R3F's `useFrame`. React 18's concurrent scheduler batches and defers state updates from outside event handlers, making the toggle unreliable.

**Decision:**
Lift `smashed` state to `CakeSection` (outside the Canvas) and drive it from a `gsap.ticker` callback. GSAP's ticker runs in the same rAF loop as the scroll animation, and state updates from there are processed reliably by React.

**Alternatives considered:**
`flushSync` around `setSmashed` inside `useFrame` — would force synchronous updates but is discouraged in concurrent mode and adds complexity.

**Consequences:**
`CakeCanvas` accepts `smashed` as a prop rather than managing it internally. All animation-driven state changes now live in `CakeSection` alongside the GSAP timeline.

---

### 2026-04-03 — Left-edge pivot via Box3 offset

**Context:**
Cake was rotating around its centre (default Three.js behaviour). The desired effect is rotating around the left edge, like a real object tipping over.

**Decision:**
Two-group structure: outer `pivotRef` group handles rotation and position (driven by GSAP/animRef), inner `contentRef` group holds the scaled model. On mount, `Box3.setFromObject` measures the content bounding box and sets `contentRef.position.x = -box.min.x` so the left edge aligns with the pivot origin.

**Alternatives considered:**
Manual fixed offset — rejected because it requires knowing the model dimensions ahead of time and would break if the model changes.

**Consequences:**
Pivot offset is computed from the actual loaded model, so it works regardless of model dimensions. Re-runs if the `scene` reference changes.

---

### 2026-04-02 — Project initialised with next-supabase template

**Context:**
Wedding RSVP project created. Needed a starting point for a Next.js + Supabase application.

**Decision:**
Use next-supabase as the base template.

**Alternatives considered:**
Starting from scratch without a template; other templates.

**Consequences:**
Committed to Next.js App Router conventions and Supabase client patterns from the template.

---

### 2026-04-02 — GSAP as sole animation library (no Framer Motion)

**Context:**
The prompt specifies GSAP ScrollTrigger for scroll-driven Three.js animations and the map reveal. The taste-skill defaults to Framer Motion for UI micro-interactions, but explicitly bans mixing GSAP/Three.js with Framer Motion in the same component tree.

**Decision:**
GSAP is the sole animation library throughout the project. Framer Motion must not be introduced.

**Alternatives considered:**
Framer Motion for UI interactions alongside GSAP for scroll/Three.js — rejected because taste-skill explicitly forbids this combination and the prompt has no UI interactions that require Framer Motion's specific features.

**Consequences:**
All scroll animations, Three.js animation driving, and any UI motion effects must be implemented with GSAP or plain CSS transitions. Taste-skill micro-interaction patterns that depend on Framer Motion (`useMotionValue`, spring physics) are not available.

---

### 2026-04-02 — Keep emojis in RSVP success copy (taste-skill override)

**Context:**
The prompt specifies emoji in the RSVP success messages ("You're on the list. See you there 🎉" / "We'll miss you. Thanks for letting us know 💛"). The taste-skill has an explicit ANTI-EMOJI policy banning emojis from all text content.

**Decision:**
Keep the emojis. The taste-skill ANTI-EMOJI rule targets AI-generated decorative filler. These are deliberate product copy choices with specific tone and warmth. Owner confirmed.

**Alternatives considered:**
Replacing with text or icons for taste-skill compliance — rejected.

**Consequences:**
Emojis are permitted in `src/constants/strings.ts` for these two specific success messages only. The taste-skill ban still applies to everything else.

---

### 2026-04-02 — Hero section uses centred layout (taste-skill override)

**Context:**
The taste-skill sets DESIGN_VARIANCE: 8 and bans centred hero sections at that level. A wedding invitation is a context where centred, symmetrical layout is the established cultural convention and the deliberate aesthetic.

**Decision:**
Override the taste-skill anti-centre-bias rule for the hero section only. Use a centred layout. All other taste-skill rules apply.

**Alternatives considered:**
Asymmetric/left-aligned per taste-skill default — rejected as wrong for the context.

**Consequences:**
The hero will be centred. All other sections follow taste-skill layout guidance.

---

### 2026-04-02 — Design direction: bold and memorable, not safe

**Context:**
No design brief was provided beyond the prompt. A direction was needed before writing the first component (frontend skill requirement).

**Decision:**
Bold and memorable. Do not default to safe, generic wedding aesthetics (pale blush, script fonts, standard card layouts). The design should have a strong point of view — high contrast, deliberate typography, unexpected choices where appropriate.

**Alternatives considered:**
Traditional wedding aesthetic (soft, romantic, minimal) — explicitly rejected by owner.

**Consequences:**
Typography, colour, and layout choices should lean toward striking over safe. Still wedding-appropriate in tone, but not generic. Specific tokens to be defined in Phase 1 theme setup.
