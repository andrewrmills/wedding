# Technical Spec — Wedding RSVP

**Status:** Draft
**Last updated:** 2026-04-02

---

## Stack

**Base template:** next-supabase

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), deployed on Vercel |
| Backend / DB | Supabase — Postgres database, service role client for all writes |
| 3D / WebGL | Three.js via `@react-three/fiber` and `@react-three/drei` |
| Map | Google Maps JavaScript API (Polyline, custom SVG markers) |
| Scroll animation | GSAP ScrollTrigger — drives Three.js timeline and map route reveal |
| Styling | Tailwind CSS |
| Animation library | GSAP only — do not introduce Framer Motion (conflicts with GSAP/Three.js) |

---

## Architecture overview

```
[Guest browser]
      |
  [Next.js — App Router — Vercel]
      |                    |
  [Client components]   [Server Actions / API routes]
  (scroll, canvas,          |
   form state)         [Supabase — service role client]
                            |
                       [Postgres — invitees table]
```

**Key architectural rules:**
- Token is read from the URL query param on every page load — never stored client-side
- All Supabase writes go through Server Actions or API routes using the service role key
- The service role key is never passed to or used in client components
- RLS is enforced on the `invitees` table — see Security section below

---

## Key components

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| `/app/rsvp/page.tsx` | Route entry — reads token, fetches invitee server-side, passes data to client | Next.js Server Component |
| `HeroSection` | Personalised welcome heading and subtitle, scroll prompt | React client component |
| `CakeScene` | Three.js canvas with GSAP-driven tip and smash animation | `@react-three/fiber`, GSAP ScrollTrigger |
| `CeremonySection` | Venue details, Google Maps embed, ceremony marker | React client component, Maps JS API |
| `ReceptionReveal` | Scroll-triggered polyline animation, reception marker, reception details | React client component, Maps JS API, GSAP ScrollTrigger |
| `RsvpForm` | Attending radio, conditional dietary/beer fields, submit, success state | React client component |
| `submitRsvp` | Server Action — validates token, updates invitee row via service role | Next.js Server Action |

---

## Data model

### `invitees` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key |
| `token` | uuid | Unique token used in the magic link |
| `name` | text | Full name of invitee |
| `type` | text | One of: `"Aus"`, `"Pom"`, `"Kiwi"` |
| `welcome_message` | text | Optional override; if null, derive from `type` |
| `rsvp_attending` | boolean | `true` = attending, `false` = not attending, `null` = not yet responded |
| `dietary_requirements` | text | Free text, nullable |
| `beer_choice` | text | One of the beer options, nullable |
| `beer_other_details` | text | Free text if `beer_choice` is `"Other"`, nullable |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto-updated on every write |

### Welcome message derivation

| `type` | Derived heading |
|--------|----------------|
| `"Aus"` | "Chut and Gabbi's Wedding" |
| `"Pom"` | "Gabbi and Andrew's Wedding" |
| `"Kiwi"` | "Andrew and Gabbi's Wedding" |

If `welcome_message` is non-null, use it instead of the derived value.

---

## Security

### Row Level Security

RLS must be enabled on the `invitees` table. Two policies are required:

**SELECT policy:**
```sql
CREATE POLICY "select_by_token" ON invitees
  FOR SELECT USING (token = current_setting('app.token')::uuid);
```

**UPDATE policy:**
```sql
CREATE POLICY "update_by_token" ON invitees
  FOR UPDATE USING (token = current_setting('app.token')::uuid);
```

Before each query in a Server Action, set the token in the session:
```sql
SET LOCAL app.token = '<token-value>';
```

This must use the **service role client** — the anon client cannot bypass RLS in this pattern.

### Token handling rules
- Token is read from `searchParams` in the Server Component on every request
- Token is passed as a prop to the Server Action — never stored in state, localStorage, or cookies
- The service role key (`SUPABASE_SERVICE_ROLE_KEY`) is only used server-side and must never appear in any client bundle

---

## API / Interface contracts

### Server Action: `submitRsvp`

**Input:**
```typescript
{
  token: string
  rsvp_attending: boolean
  dietary_requirements: string | null
  beer_choice: string | null
  beer_other_details: string | null
}
```

**Behaviour:**
1. Set `app.token` in the Supabase session
2. UPDATE `invitees` WHERE `token = $1`
3. Update `rsvp_attending`, `dietary_requirements`, `beer_choice`, `beer_other_details`, `updated_at`
4. Return success or a typed error

**Error cases:**
- Token not found → return error (should not happen if page load succeeded, but handle defensively)
- Supabase write failure → return error, display inline to user

---

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

The Google Maps API key must be restricted to the Vercel deployment domain in Google Cloud Console.

---

## Placeholder locations

The following require real values before launch — all are marked with `// TODO:` comments in the code:

- `/public/models/wedding-cake.glb` — wedding cake 3D model (developer to supply)
- `CEREMONY_LAT = -43.48750040243022`, `CEREMONY_LNG = 172.724813561856` — confirmed
- `RECEPTION_LAT = -43.4884779500395`, `RECEPTION_LNG = 172.72101031898032` — confirmed
- Ceremony venue name, address, date, time
- Reception venue name, address, time

---

## Non-functional requirements

| Concern | Target | Approach |
|---------|--------|----------|
| Mobile responsiveness | All breakpoints | Three.js canvas resizes on viewport change; form uses thumb-friendly tap targets |
| Performance | Smooth scroll animations on mobile | Animate only `transform` and `opacity`; never `top`/`left`/`width`/`height` |
| Security | Service role key never client-side | Server Actions only; validated at module boundary |
| Reliability | Graceful degradation | Loading and error states for token lookup; inline errors on form submission |

---

## Key decisions

See docs/DECISION_LOG.md for full decision history with context and rationale.
